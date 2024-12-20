import {
  ExperimentInterfaceStringDates,
  ExperimentTemplateInterface,
} from "back-end/types/experiment";
import { useMemo } from "react";
import useApi from "./useApi";
import { useExperiments } from "./useExperiments";

export function useTemplates(project?: string) {
  const { data, error, mutate } = useApi<{
    templates: ExperimentTemplateInterface[];
  }>(`/templates?project=${project || ""}`);

  const { experiments, loading: experimentsLoading } = useExperiments(project);
  const templates = useMemo(() => data?.templates || [], [data]);

  const templatesMap = useMemo(() => new Map(templates.map((t) => [t.id, t])), [
    templates,
  ]);

  const templateExperimentMap = useMemo(() => {
    const map: Record<string, ExperimentInterfaceStringDates[]> = {};
    experiments.forEach((e) => {
      if (!e.templateId) return;
      map[e.templateId] = map[e.templateId] ? [...map[e.templateId], e] : [e];
    });
    return map;
  }, [experiments]);

  return {
    loading: !error && !data && !experimentsLoading,
    templates: templates,
    templatesMap,
    templateExperimentMap,
    error: error,
    mutateTemplates: mutate,
  };
}
