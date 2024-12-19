import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { ExperimentTemplateInterface } from "back-end/types/experiment";
import { FormProvider, useForm } from "react-hook-form";
import { validateAndFixCondition } from "shared/util";
import { kebabCase } from "lodash";
import { useDefinitions } from "@/services/DefinitionsContext";
import { useAttributeSchema, useEnvironments } from "@/services/features";
import { useAuth } from "@/services/auth";
import { validateSavedGroupTargeting } from "@/components/Features/SavedGroupTargetingField";
import track from "@/services/track";
import { SingleValue, GroupedValue } from "@/components/Forms/SelectField";
import { useDemoDataSourceProject } from "@/hooks/useDemoDataSourceProject";
import useOrgSettings from "@/hooks/useOrgSettings";
import { useIncrementer } from "@/hooks/useIncrementer";
import usePermissionsUtil from "@/hooks/usePermissionsUtils";
import PagedModal from "@/components/Modal/PagedModal";
import Page from "@/components/Modal/Page";
import Field from "@/components/Forms/Field";
import MultiSelectField from "@/components/Forms/MultiSelectField";
import TagsInput from "@/components/Tags/TagsInput";
import ExperimentRefNewFields from "@/components/Features/RuleModal/ExperimentRefNewFields";
import { useTemplates } from "@/hooks/useTemplates";

type Props = {
  initialValue?: Partial<ExperimentTemplateInterface>;
  duplicate?: boolean;
  source: string;
  msg?: string;
  onClose?: () => void;
  onCreate?: (id: string) => void;
  isNewTemplate?: boolean;
};

const TemplateForm: FC<Props> = ({
  initialValue = {
    type: "standard",
  },
  onClose,
  onCreate = null,
  duplicate,
  source,
  msg,
  isNewTemplate,
}) => {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const {
    getDatasourceById,
    refreshTags,
    project,
    projects,
  } = useDefinitions();

  const environments = useEnvironments();
  const envs = environments.map((e) => e.id);

  const [
    prerequisiteTargetingSdkIssues,
    setPrerequisiteTargetingSdkIssues,
  ] = useState(false);
  const canSubmit = !prerequisiteTargetingSdkIssues;

  const { useStickyBucketing, statsEngine: orgStatsEngine } = useOrgSettings();
  const permissionsUtils = usePermissionsUtil();
  const { mutateTemplates } = useTemplates();

  const [conditionKey, forceConditionRender] = useIncrementer();

  const attributeSchema = useAttributeSchema(false, project);
  const hashAttributes =
    attributeSchema?.filter((a) => a.hashAttribute)?.map((a) => a.property) ||
    [];
  const hashAttribute = hashAttributes.includes("id")
    ? "id"
    : hashAttributes[0] || "id";

  const orgStickyBucketing = !!useStickyBucketing;

  const form = useForm<Partial<ExperimentTemplateInterface>>({
    defaultValues: {
      projects: initialValue?.projects || (project ? [project] : []),
      templateMetadata: {
        name: initialValue?.templateMetadata?.name || "",
        description: initialValue?.templateMetadata?.description || "",
        tags: initialValue?.templateMetadata?.tags || [],
      },
      type: initialValue?.type ?? "standard",
      hypothesis: initialValue?.hypothesis || "",
      description: initialValue?.description || "",
      tags: initialValue?.tags || [],
      datasource: initialValue?.datasource || "",
      userIdType: initialValue?.userIdType || undefined,
      exposureQueryId: initialValue?.exposureQueryId || "",
      activationMetric: initialValue?.activationMetric || "",
      hashAttribute: initialValue?.hashAttribute || hashAttribute,
      disableStickyBucketing: initialValue?.disableStickyBucketing ?? false,
      goalMetrics: initialValue?.goalMetrics || [],
      secondaryMetrics: initialValue?.secondaryMetrics || [],
      guardrailMetrics: initialValue?.guardrailMetrics || [],
      statsEngine: initialValue?.statsEngine || orgStatsEngine,
      targeting: {
        coverage: initialValue.targeting?.coverage || 1,
        savedGroups: initialValue.targeting?.savedGroups || [],
        prerequisites: initialValue.targeting?.prerequisites || [],
        condition: initialValue.targeting?.condition || "",
      },
    },
  });

  const datasource = form.watch("datasource")
    ? getDatasourceById(form.watch("datasource") ?? "")
    : null;

  const { apiCall } = useAuth();

  const onSubmit = form.handleSubmit(async (value) => {
    // const value = {
    //   ...rawValue,
    //   name: rawValue.templateMetadata?.name?.trim(),
    // };

    // Make sure there's an experiment name
    if ((value.templateMetadata?.name?.length ?? 0) < 1) {
      setStep(0);
      throw new Error("Template Name must not be empty");
    }

    const data = { ...value };

    // Turn phase dates into proper UTC timestamps
    validateSavedGroupTargeting(data.targeting?.savedGroups);

    validateAndFixCondition(data.targeting?.condition, (condition) => {
      form.setValue("targeting.condition", condition);
      forceConditionRender();
    });

    if (prerequisiteTargetingSdkIssues) {
      throw new Error("Prerequisite targeting issues must be resolved");
    }

    const body = JSON.stringify(data);

    const res = await apiCall<{ template: ExperimentTemplateInterface }>(
      "/templates",
      {
        method: "POST",
        body,
      }
    );

    track("Create Experiment Template", {
      source,
      numTags: data.tags?.length || 0,
      numMetrics:
        (data.goalMetrics?.length || 0) + (data.secondaryMetrics?.length || 0),
    });

    data.tags && refreshTags(data.tags);
    mutateTemplates();
    if (onCreate) {
      onCreate(res.template.id);
    } else {
      router.push(`/experiments#templates`);
    }
  });

  const availableProjects: (SingleValue | GroupedValue)[] = projects
    .slice()
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .filter((p) => permissionsUtils.canViewExperimentModal(p.id))
    .map((p) => ({ value: p.id, label: p.name }));

  const allowAllProjects = permissionsUtils.canViewExperimentModal();

  const exposureQueries = datasource?.settings?.queries?.exposure || [];
  const exposureQueryId = form.getValues("exposureQueryId");

  const { currentProjectIsDemo } = useDemoDataSourceProject();

  useEffect(() => {
    if (!exposureQueries.find((q) => q.id === exposureQueryId)) {
      form.setValue("exposureQueryId", exposureQueries?.[0]?.id ?? "");
    }
  }, [form, exposureQueries, exposureQueryId]);

  let header = isNewTemplate
    ? "Create Experiment Template"
    : "Edit Experiment Template";
  if (duplicate) {
    header = "Duplicate Experiment Template";
  }
  const trackingEventModalType = kebabCase(header);

  const nameFieldHandlers = form.register("templateMetadata.name", {
    setValueAs: (s) => s?.trim(),
  });

  return (
    <FormProvider {...form}>
      <PagedModal
        trackingEventModalType={trackingEventModalType}
        trackingEventModalSource={source}
        header={header}
        close={onClose}
        submit={onSubmit}
        cta={"Save"}
        ctaEnabled={canSubmit}
        closeCta="Cancel"
        size="lg"
        step={step}
        setStep={setStep}
        backButton={true}
        bodyClassName="px-4"
        navFill
      >
        <Page display="Overview">
          <div>
            {msg && <div className="alert alert-info">{msg}</div>}

            {currentProjectIsDemo && (
              <div className="alert alert-warning">
                You are creating a template under the demo datasource project.
                This template will be deleted when the demo datasource project
                is deleted.
              </div>
            )}

            <h4>Template Details</h4>

            <Field
              label="Template Name"
              required
              minLength={2}
              {...nameFieldHandlers}
            />

            {projects.length >= 1 && (
              <div className="form-group">
                <label>Available in Project(s)</label>
                <MultiSelectField
                  value={form.watch("projects") ?? []}
                  onChange={(p) => {
                    form.setValue("projects", p);
                  }}
                  name="projects"
                  initialOption={allowAllProjects ? "All Projects" : undefined}
                  options={availableProjects}
                />
              </div>
            )}

            <Field
              label="Template Description"
              textarea
              minRows={1}
              {...form.register("templateMetadata.description")}
              placeholder={"Short human-readable description of the template"}
            />
            <div className="form-group">
              <label>Template Tags</label>
              <TagsInput
                value={form.watch("templateMetadata.tags") ?? []}
                onChange={(tags) =>
                  form.setValue("templateMetadata.tags", tags)
                }
              />
            </div>

            <hr />

            <h4>Experiment Details</h4>

            <Field
              label="Experiment Hypothesis"
              textarea
              minRows={1}
              placeholder="e.g. Making the signup button bigger will increase clicks and ultimately improve revenue"
              {...form.register("hypothesis")}
            />

            <Field
              label="Experiment Description"
              textarea
              minRows={1}
              {...form.register("description")}
              placeholder={"Short human-readable description of the experiment"}
            />

            <div className="form-group">
              <label>Experiment Tags</label>
              <TagsInput
                value={form.watch("tags") ?? []}
                onChange={(tags) => form.setValue("tags", tags)}
              />
            </div>
          </div>
        </Page>

        {["Overview", "Traffic", "Targeting", "Metrics"].map((p, i) => {
          // skip, custom overview page above
          if (i === 0) return null;
          return (
            <Page display={p} key={i}>
              <ExperimentRefNewFields
                step={i}
                source="experiment"
                project={project}
                environments={envs}
                noSchedule={true}
                prerequisiteValue={form.watch("targeting.prerequisites") || []}
                setPrerequisiteValue={(prerequisites) =>
                  form.setValue("targeting.prerequisites", prerequisites)
                }
                setPrerequisiteTargetingSdkIssues={
                  setPrerequisiteTargetingSdkIssues
                }
                savedGroupValue={form.watch("targeting.savedGroups") || []}
                setSavedGroupValue={(savedGroups) =>
                  form.setValue("targeting.savedGroups", savedGroups)
                }
                defaultConditionValue={form.watch("targeting.condition") || ""}
                setConditionValue={(value) =>
                  form.setValue("targeting.condition", value)
                }
                conditionKey={conditionKey}
                namespaceFormPrefix={"targeting."}
                coverage={form.watch("targeting.coverage")}
                setCoverage={(coverage) =>
                  form.setValue("targeting.coverage", coverage)
                }
                variationValuesAsIds={true}
                hideVariationIds={true}
                orgStickyBucketing={orgStickyBucketing}
                isTemplate
              />
            </Page>
          );
        })}
      </PagedModal>
    </FormProvider>
  );
};

export default TemplateForm;
