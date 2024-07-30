"use client";

import { ChartTooltipContent, ChartContainer, ChartTooltip } from "./chart";
import { BarChart, XAxis, YAxis, Cell, Bar } from "recharts";
import { type Build } from "~/server/db/schema";
import { formatTime } from "~/lib/utils";

export function Builds({
  className,
  builds,
}: {
  className: string;
  builds: Build[];
}) {
  const passed = builds.filter((x): x is PassedBuild => Boolean(x.duration));
  const sum = passed.map((item) => item.duration).reduce((a, b) => a + b, 0);
  const avg = sum / builds.length;
  const max = Math.max(...passed.map((item) => item.duration));
  const high = (max + avg) / 2;

  const color = (build: PassedBuild) => {
    if (build.status === "fail") return "var(--attention-200)";
    if (build.status === "pending") return "var(--attention-500)";
    if (build.duration > high) return "var(--warning-200)";
    return "var(--ok-200)";
  };

  const stroke = (build: PassedBuild) => {
    if (build.status === "fail") return "var(--attention-500)";
    if (build.duration > high) return "var(--warning-500)";
    return "var(--ok-500)";
  };

  return (
    <ChartContainer className={className} config={{}}>
      <BarChart
        accessibilityLayer
        layout="vertical"
        maxBarSize={20}
        data={passed}
      >
        <XAxis dataKey="duration" type="number" hide />
        <YAxis type="category" dataKey="time" hide />
        <ChartTooltip
          formatter={(_0, _1, { payload }: { payload?: PassedBuild }) =>
            payload && (
              <span className="font-bold">
                {payload?.timestamp.toTimeString().slice(0, 5)}:
                <span className="font-normal">
                  &nbsp;{formatTime(payload.duration * 1000)}
                  {payload.extra && (
                    <span className="text-neutral-600">
                      &nbsp;({payload.extra})
                    </span>
                  )}
                </span>
              </span>
            )
          }
          content={<ChartTooltipContent hideIndicator />}
          cursor={false}
        />
        <Bar
          fill="var(--color-duration)"
          dataKey={"duration"}
          stackId={"a"}
          radius={5}
        >
          {passed.map((entry) => (
            <Cell
              stroke={stroke(entry)}
              key={+entry.timestamp}
              fill={color(entry)}
              strokeWidth={2}
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}

type PassedBuild = { duration: NonNullable<Build["duration"]> } & Build;
