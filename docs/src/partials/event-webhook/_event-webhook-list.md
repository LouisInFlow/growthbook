
  | Event name | Description |
  |------------|-------------|
  | **[feature.created](#feature.created)** | _Triggered when a feature is created_ |
| **[feature.updated](#feature.updated)** | _Triggered when a feature is updated_ |
| **[feature.deleted](#feature.deleted)** | _Triggered when a feature is deleted_ |
| **[experiment.created](#experiment.created)** | _Triggered when an experiment is created_ |
| **[experiment.updated](#experiment.updated)** | _Triggered when an experiment is updated_ |
| **[experiment.deleted](#experiment.deleted)** | _Triggered when an experiment is deleted_ |
| **[experiment.warning](#experiment.warning)** | _Triggered when a warning condition is detected on an experiment_ |
| **[user.login](#user.login)** | _Triggered when a user logs in_ |

  
### feature.created

Triggered when a feature is created

<details>
  <summary>Payload</summary>

```typescript
{
    event: "feature.created";
    object: "feature";
    api_version: string;
    created: number;
    data: {
        object: {
            id: string;
            dateCreated: string;
            dateUpdated: string;
            archived: boolean;
            description: string;
            owner: string;
            project: string;
            valueType: "boolean" | "string" | "number" | "json";
            defaultValue: string;
            tags: string[];
            environments: {
                [x: string]: {
                    enabled: boolean;
                    defaultValue: string;
                    rules: ({
                        description: string;
                        condition: string;
                        savedGroupTargeting?: {
                            matchType: "all" | "any" | "none";
                            savedGroups: string[];
                        }[] | undefined;
                        id: string;
                        enabled: boolean;
                        type: "force";
                        value: string;
                    } | {
                        description: string;
                        condition: string;
                        savedGroupTargeting?: {
                            matchType: "all" | "any" | "none";
                            savedGroups: string[];
                        }[] | undefined;
                        id: string;
                        enabled: boolean;
                        type: "rollout";
                        value: string;
                        coverage: number;
                        hashAttribute: string;
                    } | {
                        description: string;
                        condition: string;
                        id: string;
                        enabled: boolean;
                        type: "experiment";
                        trackingKey?: string | undefined;
                        hashAttribute?: string | undefined;
                        fallbackAttribute?: string | undefined;
                        disableStickyBucketing?: any | undefined;
                        bucketVersion?: number | undefined;
                        minBucketVersion?: number | undefined;
                        namespace?: any | undefined;
                        coverage?: number | undefined;
                        value?: {
                            value: string;
                            weight: number;
                            name?: string | undefined;
                        }[] | undefined;
                    } | {
                        description: string;
                        id: string;
                        enabled: boolean;
                        type: "experiment-ref";
                        condition?: string | undefined;
                        variations: {
                            value: string;
                            variationId: string;
                        }[];
                        experimentId: string;
                    })[];
                    /** A JSON stringified [FeatureDefinition](#tag/FeatureDefinition_model) */
                    definition?: string | undefined;
                    draft?: {
                        enabled: boolean;
                        defaultValue: string;
                        rules: ({
                            description: string;
                            condition: string;
                            savedGroupTargeting?: {
                                matchType: "all" | "any" | "none";
                                savedGroups: string[];
                            }[] | undefined;
                            id: string;
                            enabled: boolean;
                            type: "force";
                            value: string;
                        } | {
                            description: string;
                            condition: string;
                            savedGroupTargeting?: {
                                matchType: "all" | "any" | "none";
                                savedGroups: string[];
                            }[] | undefined;
                            id: string;
                            enabled: boolean;
                            type: "rollout";
                            value: string;
                            coverage: number;
                            hashAttribute: string;
                        } | {
                            description: string;
                            condition: string;
                            id: string;
                            enabled: boolean;
                            type: "experiment";
                            trackingKey?: string | undefined;
                            hashAttribute?: string | undefined;
                            fallbackAttribute?: string | undefined;
                            disableStickyBucketing?: any | undefined;
                            bucketVersion?: number | undefined;
                            minBucketVersion?: number | undefined;
                            namespace?: any | undefined;
                            coverage?: number | undefined;
                            value?: {
                                value: string;
                                weight: number;
                                name?: string | undefined;
                            }[] | undefined;
                        } | {
                            description: string;
                            id: string;
                            enabled: boolean;
                            type: "experiment-ref";
                            condition?: string | undefined;
                            variations: {
                                value: string;
                                variationId: string;
                            }[];
                            experimentId: string;
                        })[];
                        /** A JSON stringified [FeatureDefinition](#tag/FeatureDefinition_model) */
                        definition?: string | undefined;
                    } | undefined;
                };
            };
            prerequisites?: {
                parentId: string;
                parentCondition: string;
            }[] | undefined;
            revision: {
                version: number;
                comment: string;
                date: string;
                publishedBy: string;
            };
        };
    };
    user: {
        type: "dashboard";
        id: string;
        email: string;
        name: string;
    } | {
        type: "api_key";
        apiKey: string;
    } | null;
    tags: string[];
    environments: string[];
    containsSecrets: boolean;
}
```
</details>


### feature.updated

Triggered when a feature is updated

<details>
  <summary>Payload</summary>

```typescript
{
    event: "feature.updated";
    object: "feature";
    api_version: string;
    created: number;
    data: {
        object: {
            id: string;
            dateCreated: string;
            dateUpdated: string;
            archived: boolean;
            description: string;
            owner: string;
            project: string;
            valueType: "boolean" | "string" | "number" | "json";
            defaultValue: string;
            tags: string[];
            environments: {
                [x: string]: {
                    enabled: boolean;
                    defaultValue: string;
                    rules: ({
                        description: string;
                        condition: string;
                        savedGroupTargeting?: {
                            matchType: "all" | "any" | "none";
                            savedGroups: string[];
                        }[] | undefined;
                        id: string;
                        enabled: boolean;
                        type: "force";
                        value: string;
                    } | {
                        description: string;
                        condition: string;
                        savedGroupTargeting?: {
                            matchType: "all" | "any" | "none";
                            savedGroups: string[];
                        }[] | undefined;
                        id: string;
                        enabled: boolean;
                        type: "rollout";
                        value: string;
                        coverage: number;
                        hashAttribute: string;
                    } | {
                        description: string;
                        condition: string;
                        id: string;
                        enabled: boolean;
                        type: "experiment";
                        trackingKey?: string | undefined;
                        hashAttribute?: string | undefined;
                        fallbackAttribute?: string | undefined;
                        disableStickyBucketing?: any | undefined;
                        bucketVersion?: number | undefined;
                        minBucketVersion?: number | undefined;
                        namespace?: any | undefined;
                        coverage?: number | undefined;
                        value?: {
                            value: string;
                            weight: number;
                            name?: string | undefined;
                        }[] | undefined;
                    } | {
                        description: string;
                        id: string;
                        enabled: boolean;
                        type: "experiment-ref";
                        condition?: string | undefined;
                        variations: {
                            value: string;
                            variationId: string;
                        }[];
                        experimentId: string;
                    })[];
                    /** A JSON stringified [FeatureDefinition](#tag/FeatureDefinition_model) */
                    definition?: string | undefined;
                    draft?: {
                        enabled: boolean;
                        defaultValue: string;
                        rules: ({
                            description: string;
                            condition: string;
                            savedGroupTargeting?: {
                                matchType: "all" | "any" | "none";
                                savedGroups: string[];
                            }[] | undefined;
                            id: string;
                            enabled: boolean;
                            type: "force";
                            value: string;
                        } | {
                            description: string;
                            condition: string;
                            savedGroupTargeting?: {
                                matchType: "all" | "any" | "none";
                                savedGroups: string[];
                            }[] | undefined;
                            id: string;
                            enabled: boolean;
                            type: "rollout";
                            value: string;
                            coverage: number;
                            hashAttribute: string;
                        } | {
                            description: string;
                            condition: string;
                            id: string;
                            enabled: boolean;
                            type: "experiment";
                            trackingKey?: string | undefined;
                            hashAttribute?: string | undefined;
                            fallbackAttribute?: string | undefined;
                            disableStickyBucketing?: any | undefined;
                            bucketVersion?: number | undefined;
                            minBucketVersion?: number | undefined;
                            namespace?: any | undefined;
                            coverage?: number | undefined;
                            value?: {
                                value: string;
                                weight: number;
                                name?: string | undefined;
                            }[] | undefined;
                        } | {
                            description: string;
                            id: string;
                            enabled: boolean;
                            type: "experiment-ref";
                            condition?: string | undefined;
                            variations: {
                                value: string;
                                variationId: string;
                            }[];
                            experimentId: string;
                        })[];
                        /** A JSON stringified [FeatureDefinition](#tag/FeatureDefinition_model) */
                        definition?: string | undefined;
                    } | undefined;
                };
            };
            prerequisites?: {
                parentId: string;
                parentCondition: string;
            }[] | undefined;
            revision: {
                version: number;
                comment: string;
                date: string;
                publishedBy: string;
            };
        };
        previous_attributes: {
            id?: string | undefined;
            dateCreated?: string | undefined;
            dateUpdated?: string | undefined;
            archived?: boolean | undefined;
            description?: string | undefined;
            owner?: string | undefined;
            project?: string | undefined;
            valueType?: ("boolean" | "string" | "number" | "json") | undefined;
            defaultValue?: string | undefined;
            tags?: string[] | undefined;
            environments?: {
                [x: string]: {
                    enabled: boolean;
                    defaultValue: string;
                    rules: ({
                        description: string;
                        condition: string;
                        savedGroupTargeting?: {
                            matchType: "all" | "any" | "none";
                            savedGroups: string[];
                        }[] | undefined;
                        id: string;
                        enabled: boolean;
                        type: "force";
                        value: string;
                    } | {
                        description: string;
                        condition: string;
                        savedGroupTargeting?: {
                            matchType: "all" | "any" | "none";
                            savedGroups: string[];
                        }[] | undefined;
                        id: string;
                        enabled: boolean;
                        type: "rollout";
                        value: string;
                        coverage: number;
                        hashAttribute: string;
                    } | {
                        description: string;
                        condition: string;
                        id: string;
                        enabled: boolean;
                        type: "experiment";
                        trackingKey?: string | undefined;
                        hashAttribute?: string | undefined;
                        fallbackAttribute?: string | undefined;
                        disableStickyBucketing?: any | undefined;
                        bucketVersion?: number | undefined;
                        minBucketVersion?: number | undefined;
                        namespace?: any | undefined;
                        coverage?: number | undefined;
                        value?: {
                            value: string;
                            weight: number;
                            name?: string | undefined;
                        }[] | undefined;
                    } | {
                        description: string;
                        id: string;
                        enabled: boolean;
                        type: "experiment-ref";
                        condition?: string | undefined;
                        variations: {
                            value: string;
                            variationId: string;
                        }[];
                        experimentId: string;
                    })[];
                    /** A JSON stringified [FeatureDefinition](#tag/FeatureDefinition_model) */
                    definition?: string | undefined;
                    draft?: {
                        enabled: boolean;
                        defaultValue: string;
                        rules: ({
                            description: string;
                            condition: string;
                            savedGroupTargeting?: {
                                matchType: "all" | "any" | "none";
                                savedGroups: string[];
                            }[] | undefined;
                            id: string;
                            enabled: boolean;
                            type: "force";
                            value: string;
                        } | {
                            description: string;
                            condition: string;
                            savedGroupTargeting?: {
                                matchType: "all" | "any" | "none";
                                savedGroups: string[];
                            }[] | undefined;
                            id: string;
                            enabled: boolean;
                            type: "rollout";
                            value: string;
                            coverage: number;
                            hashAttribute: string;
                        } | {
                            description: string;
                            condition: string;
                            id: string;
                            enabled: boolean;
                            type: "experiment";
                            trackingKey?: string | undefined;
                            hashAttribute?: string | undefined;
                            fallbackAttribute?: string | undefined;
                            disableStickyBucketing?: any | undefined;
                            bucketVersion?: number | undefined;
                            minBucketVersion?: number | undefined;
                            namespace?: any | undefined;
                            coverage?: number | undefined;
                            value?: {
                                value: string;
                                weight: number;
                                name?: string | undefined;
                            }[] | undefined;
                        } | {
                            description: string;
                            id: string;
                            enabled: boolean;
                            type: "experiment-ref";
                            condition?: string | undefined;
                            variations: {
                                value: string;
                                variationId: string;
                            }[];
                            experimentId: string;
                        })[];
                        /** A JSON stringified [FeatureDefinition](#tag/FeatureDefinition_model) */
                        definition?: string | undefined;
                    } | undefined;
                };
            } | undefined;
            prerequisites?: ({
                parentId: string;
                parentCondition: string;
            }[] | undefined) | undefined;
            revision?: {
                version: number;
                comment: string;
                date: string;
                publishedBy: string;
            } | undefined;
        };
    };
    user: {
        type: "dashboard";
        id: string;
        email: string;
        name: string;
    } | {
        type: "api_key";
        apiKey: string;
    } | null;
    tags: string[];
    environments: string[];
    containsSecrets: boolean;
}
```
</details>


### feature.deleted

Triggered when a feature is deleted

<details>
  <summary>Payload</summary>

```typescript
{
    event: "feature.deleted";
    object: "feature";
    api_version: string;
    created: number;
    data: {
        object: {
            id: string;
            dateCreated: string;
            dateUpdated: string;
            archived: boolean;
            description: string;
            owner: string;
            project: string;
            valueType: "boolean" | "string" | "number" | "json";
            defaultValue: string;
            tags: string[];
            environments: {
                [x: string]: {
                    enabled: boolean;
                    defaultValue: string;
                    rules: ({
                        description: string;
                        condition: string;
                        savedGroupTargeting?: {
                            matchType: "all" | "any" | "none";
                            savedGroups: string[];
                        }[] | undefined;
                        id: string;
                        enabled: boolean;
                        type: "force";
                        value: string;
                    } | {
                        description: string;
                        condition: string;
                        savedGroupTargeting?: {
                            matchType: "all" | "any" | "none";
                            savedGroups: string[];
                        }[] | undefined;
                        id: string;
                        enabled: boolean;
                        type: "rollout";
                        value: string;
                        coverage: number;
                        hashAttribute: string;
                    } | {
                        description: string;
                        condition: string;
                        id: string;
                        enabled: boolean;
                        type: "experiment";
                        trackingKey?: string | undefined;
                        hashAttribute?: string | undefined;
                        fallbackAttribute?: string | undefined;
                        disableStickyBucketing?: any | undefined;
                        bucketVersion?: number | undefined;
                        minBucketVersion?: number | undefined;
                        namespace?: any | undefined;
                        coverage?: number | undefined;
                        value?: {
                            value: string;
                            weight: number;
                            name?: string | undefined;
                        }[] | undefined;
                    } | {
                        description: string;
                        id: string;
                        enabled: boolean;
                        type: "experiment-ref";
                        condition?: string | undefined;
                        variations: {
                            value: string;
                            variationId: string;
                        }[];
                        experimentId: string;
                    })[];
                    /** A JSON stringified [FeatureDefinition](#tag/FeatureDefinition_model) */
                    definition?: string | undefined;
                    draft?: {
                        enabled: boolean;
                        defaultValue: string;
                        rules: ({
                            description: string;
                            condition: string;
                            savedGroupTargeting?: {
                                matchType: "all" | "any" | "none";
                                savedGroups: string[];
                            }[] | undefined;
                            id: string;
                            enabled: boolean;
                            type: "force";
                            value: string;
                        } | {
                            description: string;
                            condition: string;
                            savedGroupTargeting?: {
                                matchType: "all" | "any" | "none";
                                savedGroups: string[];
                            }[] | undefined;
                            id: string;
                            enabled: boolean;
                            type: "rollout";
                            value: string;
                            coverage: number;
                            hashAttribute: string;
                        } | {
                            description: string;
                            condition: string;
                            id: string;
                            enabled: boolean;
                            type: "experiment";
                            trackingKey?: string | undefined;
                            hashAttribute?: string | undefined;
                            fallbackAttribute?: string | undefined;
                            disableStickyBucketing?: any | undefined;
                            bucketVersion?: number | undefined;
                            minBucketVersion?: number | undefined;
                            namespace?: any | undefined;
                            coverage?: number | undefined;
                            value?: {
                                value: string;
                                weight: number;
                                name?: string | undefined;
                            }[] | undefined;
                        } | {
                            description: string;
                            id: string;
                            enabled: boolean;
                            type: "experiment-ref";
                            condition?: string | undefined;
                            variations: {
                                value: string;
                                variationId: string;
                            }[];
                            experimentId: string;
                        })[];
                        /** A JSON stringified [FeatureDefinition](#tag/FeatureDefinition_model) */
                        definition?: string | undefined;
                    } | undefined;
                };
            };
            prerequisites?: {
                parentId: string;
                parentCondition: string;
            }[] | undefined;
            revision: {
                version: number;
                comment: string;
                date: string;
                publishedBy: string;
            };
        };
    };
    user: {
        type: "dashboard";
        id: string;
        email: string;
        name: string;
    } | {
        type: "api_key";
        apiKey: string;
    } | null;
    tags: string[];
    environments: string[];
    containsSecrets: boolean;
}
```
</details>


### experiment.created

Triggered when an experiment is created

<details>
  <summary>Payload</summary>

```typescript
{
    event: "experiment.created";
    object: "experiment";
    api_version: string;
    created: number;
    data: {
        object: {
            id: string;
            dateCreated: string;
            dateUpdated: string;
            name: string;
            project: string;
            hypothesis: string;
            description: string;
            tags: string[];
            owner: string;
            archived: boolean;
            status: string;
            autoRefresh: boolean;
            hashAttribute: string;
            fallbackAttribute?: string | undefined;
            hashVersion: 1 | 2;
            disableStickyBucketing?: any | undefined;
            bucketVersion?: number | undefined;
            minBucketVersion?: number | undefined;
            variations: {
                variationId: string;
                key: string;
                name: string;
                description: string;
                screenshots: string[];
            }[];
            phases: {
                name: string;
                dateStarted: string;
                dateEnded: string;
                reasonForStopping: string;
                seed: string;
                coverage: number;
                trafficSplit: {
                    variationId: string;
                    weight: number;
                }[];
                namespace?: {
                    namespaceId: string;
                    range: any[];
                } | undefined;
                targetingCondition: string;
                savedGroupTargeting?: {
                    matchType: "all" | "any" | "none";
                    savedGroups: string[];
                }[] | undefined;
            }[];
            settings: {
                datasourceId: string;
                assignmentQueryId: string;
                experimentId: string;
                segmentId: string;
                queryFilter: string;
                inProgressConversions: "include" | "exclude";
                attributionModel: "firstExposure" | "experimentDuration";
                statsEngine: "bayesian" | "frequentist";
                regressionAdjustmentEnabled?: boolean | undefined;
                goals: {
                    metricId: string;
                    overrides: {
                        delayHours?: number | undefined;
                        windowHours?: number | undefined;
                        window?: ("conversion" | "lookback" | "") | undefined;
                        winRiskThreshold?: number | undefined;
                        loseRiskThreshold?: number | undefined;
                    };
                }[];
                secondaryMetrics: {
                    metricId: string;
                    overrides: {
                        delayHours?: number | undefined;
                        windowHours?: number | undefined;
                        window?: ("conversion" | "lookback" | "") | undefined;
                        winRiskThreshold?: number | undefined;
                        loseRiskThreshold?: number | undefined;
                    };
                }[];
                guardrails: {
                    metricId: string;
                    overrides: {
                        delayHours?: number | undefined;
                        windowHours?: number | undefined;
                        window?: ("conversion" | "lookback" | "") | undefined;
                        winRiskThreshold?: number | undefined;
                        loseRiskThreshold?: number | undefined;
                    };
                }[];
                activationMetric?: {
                    metricId: string;
                    overrides: {
                        delayHours?: number | undefined;
                        windowHours?: number | undefined;
                        window?: ("conversion" | "lookback" | "") | undefined;
                        winRiskThreshold?: number | undefined;
                        loseRiskThreshold?: number | undefined;
                    };
                } | undefined;
            };
            resultSummary?: {
                status: string;
                winner: string;
                conclusions: string;
                releasedVariationId: string;
                excludeFromPayload: boolean;
            } | undefined;
        };
    };
    user: {
        type: "dashboard";
        id: string;
        email: string;
        name: string;
    } | {
        type: "api_key";
        apiKey: string;
    } | null;
    tags: string[];
    environments: string[];
    containsSecrets: boolean;
}
```
</details>


### experiment.updated

Triggered when an experiment is updated

<details>
  <summary>Payload</summary>

```typescript
{
    event: "experiment.updated";
    object: "experiment";
    api_version: string;
    created: number;
    data: {
        object: {
            id: string;
            dateCreated: string;
            dateUpdated: string;
            name: string;
            project: string;
            hypothesis: string;
            description: string;
            tags: string[];
            owner: string;
            archived: boolean;
            status: string;
            autoRefresh: boolean;
            hashAttribute: string;
            fallbackAttribute?: string | undefined;
            hashVersion: 1 | 2;
            disableStickyBucketing?: any | undefined;
            bucketVersion?: number | undefined;
            minBucketVersion?: number | undefined;
            variations: {
                variationId: string;
                key: string;
                name: string;
                description: string;
                screenshots: string[];
            }[];
            phases: {
                name: string;
                dateStarted: string;
                dateEnded: string;
                reasonForStopping: string;
                seed: string;
                coverage: number;
                trafficSplit: {
                    variationId: string;
                    weight: number;
                }[];
                namespace?: {
                    namespaceId: string;
                    range: any[];
                } | undefined;
                targetingCondition: string;
                savedGroupTargeting?: {
                    matchType: "all" | "any" | "none";
                    savedGroups: string[];
                }[] | undefined;
            }[];
            settings: {
                datasourceId: string;
                assignmentQueryId: string;
                experimentId: string;
                segmentId: string;
                queryFilter: string;
                inProgressConversions: "include" | "exclude";
                attributionModel: "firstExposure" | "experimentDuration";
                statsEngine: "bayesian" | "frequentist";
                regressionAdjustmentEnabled?: boolean | undefined;
                goals: {
                    metricId: string;
                    overrides: {
                        delayHours?: number | undefined;
                        windowHours?: number | undefined;
                        window?: ("conversion" | "lookback" | "") | undefined;
                        winRiskThreshold?: number | undefined;
                        loseRiskThreshold?: number | undefined;
                    };
                }[];
                secondaryMetrics: {
                    metricId: string;
                    overrides: {
                        delayHours?: number | undefined;
                        windowHours?: number | undefined;
                        window?: ("conversion" | "lookback" | "") | undefined;
                        winRiskThreshold?: number | undefined;
                        loseRiskThreshold?: number | undefined;
                    };
                }[];
                guardrails: {
                    metricId: string;
                    overrides: {
                        delayHours?: number | undefined;
                        windowHours?: number | undefined;
                        window?: ("conversion" | "lookback" | "") | undefined;
                        winRiskThreshold?: number | undefined;
                        loseRiskThreshold?: number | undefined;
                    };
                }[];
                activationMetric?: {
                    metricId: string;
                    overrides: {
                        delayHours?: number | undefined;
                        windowHours?: number | undefined;
                        window?: ("conversion" | "lookback" | "") | undefined;
                        winRiskThreshold?: number | undefined;
                        loseRiskThreshold?: number | undefined;
                    };
                } | undefined;
            };
            resultSummary?: {
                status: string;
                winner: string;
                conclusions: string;
                releasedVariationId: string;
                excludeFromPayload: boolean;
            } | undefined;
        };
        previous_attributes: {
            id?: string | undefined;
            dateCreated?: string | undefined;
            dateUpdated?: string | undefined;
            name?: string | undefined;
            project?: string | undefined;
            hypothesis?: string | undefined;
            description?: string | undefined;
            tags?: string[] | undefined;
            owner?: string | undefined;
            archived?: boolean | undefined;
            status?: string | undefined;
            autoRefresh?: boolean | undefined;
            hashAttribute?: string | undefined;
            fallbackAttribute?: (string | undefined) | undefined;
            hashVersion?: (1 | 2) | undefined;
            disableStickyBucketing?: (any | undefined) | undefined;
            bucketVersion?: (number | undefined) | undefined;
            minBucketVersion?: (number | undefined) | undefined;
            variations?: {
                variationId: string;
                key: string;
                name: string;
                description: string;
                screenshots: string[];
            }[] | undefined;
            phases?: {
                name: string;
                dateStarted: string;
                dateEnded: string;
                reasonForStopping: string;
                seed: string;
                coverage: number;
                trafficSplit: {
                    variationId: string;
                    weight: number;
                }[];
                namespace?: {
                    namespaceId: string;
                    range: any[];
                } | undefined;
                targetingCondition: string;
                savedGroupTargeting?: {
                    matchType: "all" | "any" | "none";
                    savedGroups: string[];
                }[] | undefined;
            }[] | undefined;
            settings?: {
                datasourceId: string;
                assignmentQueryId: string;
                experimentId: string;
                segmentId: string;
                queryFilter: string;
                inProgressConversions: "include" | "exclude";
                attributionModel: "firstExposure" | "experimentDuration";
                statsEngine: "bayesian" | "frequentist";
                regressionAdjustmentEnabled?: boolean | undefined;
                goals: {
                    metricId: string;
                    overrides: {
                        delayHours?: number | undefined;
                        windowHours?: number | undefined;
                        window?: ("conversion" | "lookback" | "") | undefined;
                        winRiskThreshold?: number | undefined;
                        loseRiskThreshold?: number | undefined;
                    };
                }[];
                secondaryMetrics: {
                    metricId: string;
                    overrides: {
                        delayHours?: number | undefined;
                        windowHours?: number | undefined;
                        window?: ("conversion" | "lookback" | "") | undefined;
                        winRiskThreshold?: number | undefined;
                        loseRiskThreshold?: number | undefined;
                    };
                }[];
                guardrails: {
                    metricId: string;
                    overrides: {
                        delayHours?: number | undefined;
                        windowHours?: number | undefined;
                        window?: ("conversion" | "lookback" | "") | undefined;
                        winRiskThreshold?: number | undefined;
                        loseRiskThreshold?: number | undefined;
                    };
                }[];
                activationMetric?: {
                    metricId: string;
                    overrides: {
                        delayHours?: number | undefined;
                        windowHours?: number | undefined;
                        window?: ("conversion" | "lookback" | "") | undefined;
                        winRiskThreshold?: number | undefined;
                        loseRiskThreshold?: number | undefined;
                    };
                } | undefined;
            } | undefined;
            resultSummary?: ({
                status: string;
                winner: string;
                conclusions: string;
                releasedVariationId: string;
                excludeFromPayload: boolean;
            } | undefined) | undefined;
        };
    };
    user: {
        type: "dashboard";
        id: string;
        email: string;
        name: string;
    } | {
        type: "api_key";
        apiKey: string;
    } | null;
    tags: string[];
    environments: string[];
    containsSecrets: boolean;
}
```
</details>


### experiment.deleted

Triggered when an experiment is deleted

<details>
  <summary>Payload</summary>

```typescript
{
    event: "experiment.deleted";
    object: "experiment";
    api_version: string;
    created: number;
    data: {
        object: {
            id: string;
            dateCreated: string;
            dateUpdated: string;
            name: string;
            project: string;
            hypothesis: string;
            description: string;
            tags: string[];
            owner: string;
            archived: boolean;
            status: string;
            autoRefresh: boolean;
            hashAttribute: string;
            fallbackAttribute?: string | undefined;
            hashVersion: 1 | 2;
            disableStickyBucketing?: any | undefined;
            bucketVersion?: number | undefined;
            minBucketVersion?: number | undefined;
            variations: {
                variationId: string;
                key: string;
                name: string;
                description: string;
                screenshots: string[];
            }[];
            phases: {
                name: string;
                dateStarted: string;
                dateEnded: string;
                reasonForStopping: string;
                seed: string;
                coverage: number;
                trafficSplit: {
                    variationId: string;
                    weight: number;
                }[];
                namespace?: {
                    namespaceId: string;
                    range: any[];
                } | undefined;
                targetingCondition: string;
                savedGroupTargeting?: {
                    matchType: "all" | "any" | "none";
                    savedGroups: string[];
                }[] | undefined;
            }[];
            settings: {
                datasourceId: string;
                assignmentQueryId: string;
                experimentId: string;
                segmentId: string;
                queryFilter: string;
                inProgressConversions: "include" | "exclude";
                attributionModel: "firstExposure" | "experimentDuration";
                statsEngine: "bayesian" | "frequentist";
                regressionAdjustmentEnabled?: boolean | undefined;
                goals: {
                    metricId: string;
                    overrides: {
                        delayHours?: number | undefined;
                        windowHours?: number | undefined;
                        window?: ("conversion" | "lookback" | "") | undefined;
                        winRiskThreshold?: number | undefined;
                        loseRiskThreshold?: number | undefined;
                    };
                }[];
                secondaryMetrics: {
                    metricId: string;
                    overrides: {
                        delayHours?: number | undefined;
                        windowHours?: number | undefined;
                        window?: ("conversion" | "lookback" | "") | undefined;
                        winRiskThreshold?: number | undefined;
                        loseRiskThreshold?: number | undefined;
                    };
                }[];
                guardrails: {
                    metricId: string;
                    overrides: {
                        delayHours?: number | undefined;
                        windowHours?: number | undefined;
                        window?: ("conversion" | "lookback" | "") | undefined;
                        winRiskThreshold?: number | undefined;
                        loseRiskThreshold?: number | undefined;
                    };
                }[];
                activationMetric?: {
                    metricId: string;
                    overrides: {
                        delayHours?: number | undefined;
                        windowHours?: number | undefined;
                        window?: ("conversion" | "lookback" | "") | undefined;
                        winRiskThreshold?: number | undefined;
                        loseRiskThreshold?: number | undefined;
                    };
                } | undefined;
            };
            resultSummary?: {
                status: string;
                winner: string;
                conclusions: string;
                releasedVariationId: string;
                excludeFromPayload: boolean;
            } | undefined;
        };
    };
    user: {
        type: "dashboard";
        id: string;
        email: string;
        name: string;
    } | {
        type: "api_key";
        apiKey: string;
    } | null;
    tags: string[];
    environments: string[];
    containsSecrets: boolean;
}
```
</details>


### experiment.warning

Triggered when a warning condition is detected on an experiment

<details>
  <summary>Payload</summary>

```typescript
{
    event: "experiment.warning";
    object: "experiment";
    api_version: string;
    created: number;
    data: {
        object: {
            type: "auto-update";
            success: boolean;
            experimentName: string;
            experimentId: string;
        } | {
            type: "multiple-exposures";
            experimentName: string;
            experimentId: string;
            usersCount: number;
            percent: number;
        } | {
            type: "srm";
            experimentName: string;
            experimentId: string;
            threshold: number;
        };
    };
    user: {
        type: "dashboard";
        id: string;
        email: string;
        name: string;
    } | {
        type: "api_key";
        apiKey: string;
    } | null;
    tags: string[];
    environments: string[];
    containsSecrets: boolean;
}
```
</details>


### user.login

Triggered when a user logs in

<details>
  <summary>Payload</summary>

```typescript
{
    event: "user.login";
    object: "user";
    api_version: string;
    created: number;
    data: {
        object: {
            email: string;
            id: string;
            name: string;
            ip: string;
            userAgent: string;
            os: string;
            device: string;
        };
    };
    user: {
        type: "dashboard";
        id: string;
        email: string;
        name: string;
    } | {
        type: "api_key";
        apiKey: string;
    } | null;
    tags: string[];
    environments: string[];
    containsSecrets: boolean;
}
```
</details>
