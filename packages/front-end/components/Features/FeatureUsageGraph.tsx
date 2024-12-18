import { Bar } from "@visx/shape";
import { scaleBand, scaleLinear } from "@visx/scale";
import { ParentSizeModern } from "@visx/responsive";
import { Group } from "@visx/group";
import React, { createContext, ReactNode, useContext, useEffect } from "react";
import {
  FeatureUsageData,
  FeatureUsageTimeSeries,
} from "back-end/types/feature";
import { FeatureUsageLookback } from "back-end/src/types/Integration";
import useApi from "@/hooks/useApi";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { growthbook } from "@/services/utils";

const formatter = Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const featureUsageContext = createContext<{
  lookback: FeatureUsageLookback;
  setLookback: (lookback: FeatureUsageLookback) => void;
  featureUsage: FeatureUsageData | undefined;
  mutateFeatureUsage: () => void;
}>({
  lookback: "15minute",
  setLookback: () => {},
  featureUsage: undefined,
  mutateFeatureUsage: () => {},
});

export function FeatureUsageProvider({
  featureId,
  children,
}: {
  featureId: string;
  children: ReactNode;
}) {
  const [lookback, setLookback] = useLocalStorage<FeatureUsageLookback>(
    "featureUsageLookback",
    "15minute"
  );

  const useFeatureUsage = growthbook.isOn("feature-usage");

  const { data: featureUsage, mutate: mutateFeatureUsage } = useApi<{
    usage: FeatureUsageData;
  }>(`/feature/${featureId}/usage?lookback=${lookback}`, {
    shouldRun: () => useFeatureUsage,
  });

  useEffect(() => {
    if (!featureUsage) return;
    if (lookback !== "15minute") return;
    const timer = setInterval(
      () => {
        mutateFeatureUsage();
      },
      // Update slower when there's no data yet
      featureUsage.usage?.overall?.total ? 2000 : 5000
    );
    return () => clearInterval(timer);
  }, [lookback, featureUsage, mutateFeatureUsage]);

  return (
    <featureUsageContext.Provider
      value={{
        lookback,
        setLookback,
        featureUsage: featureUsage?.usage,
        mutateFeatureUsage,
      }}
    >
      {children}
    </featureUsageContext.Provider>
  );
}

export function useFeatureUsage() {
  return useContext(featureUsageContext);
}

export default function FeatureUsageGraph({
  data,
  width = "150px",
  height = 20,
  showLabel = true,
}: {
  data: FeatureUsageTimeSeries | undefined;
  width?: "auto" | string;
  height?: number;
  showLabel?: boolean;
}) {
  const margin = [3, 3, 0, 3];
  const yDomain = data ? [0, Math.max(...data.ts.map((d) => d.v))] : [];
  const xDomain = data?.ts.map((d) => d.t);

  return (
    <div style={{ marginBottom: -10 }}>
      {data && data.total > 0 && (
        <div style={{ width: width }}>
          <ParentSizeModern style={{ position: "relative" }}>
            {({ width }) => {
              const yMax = height - margin[0] - margin[2];
              const xMax = width - margin[1] - margin[3];
              const graphHeight = yMax;

              const xScale = scaleBand({
                domain: xDomain,
                range: [0, xMax],
                round: true,
                padding: 0.1,
              });
              const yScale = scaleLinear<number>({
                domain: yDomain,
                range: [graphHeight, 0],
                round: true,
              });

              return (
                <div className="bg-light border">
                  <svg width={width} height={height}>
                    <Group left={margin[3]} top={margin[0]}>
                      {data.ts.map(({ t, v }) => {
                        const barHeight = yMax - (yScale(v) ?? 0);
                        const barWidth = xScale.bandwidth();
                        const barX = xScale(t);
                        const barY = yMax - barHeight;
                        return (
                          <Bar
                            key={`bar-${t}`}
                            x={barX}
                            y={barY}
                            width={barWidth}
                            height={barHeight}
                            fill="#a44afe"
                            opacity={0.5}
                          />
                        );
                      })}
                    </Group>
                  </svg>
                </div>
              );
            }}
          </ParentSizeModern>
        </div>
      )}
      {showLabel && (
        <div className="d-flex text-secondary">
          <div>
            <small></small>
          </div>
          <div className="ml-auto">
            <small>
              used <strong>{formatter.format(data?.total || 0)}</strong> times
            </small>
          </div>
        </div>
      )}
    </div>
  );
}