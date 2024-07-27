"use client";

import { ChartTooltipContent, ChartContainer, ChartTooltip } from "./chart";
import { BarChart, XAxis, YAxis, Cell, Bar } from "recharts";
import { type Build } from "~/server/db/schema";

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
          content={<ChartTooltipContent hideIndicator />}
          cursor={false}
        />
        <Bar
          fill="var(--color-duration)"
          dataKey={"duration"}
          stackId={"a"}
          radius={5}
        >
          {passed.map((entry, index) => (
            <Cell
              stroke={stroke(entry)}
              fill={color(entry)}
              strokeWidth={2}
              key={index}
            />
          ))}
        </Bar>
        <Bar fill="transparent" dataKey={"users"} stackId={"a"} radius={5} />
      </BarChart>
    </ChartContainer>
  );
}

type PassedBuild = { duration: NonNullable<Build["duration"]> } & Build;
