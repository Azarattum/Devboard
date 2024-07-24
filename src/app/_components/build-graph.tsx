"use client";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart";
import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";
import type { StagingBuild } from "~/types/structures";

export function BuildGraph({
  data,
  className,
}: {
  data: StagingBuild[];
  className: string;
}) {
  const sum = data.map((item) => item.duration).reduce((a, b) => a + b, 0);
  const avg = sum / data.length;
  const max = Math.max(...data.map((item) => item.duration));
  const high = (max + avg) / 2;

  const color = (duration: number) => {
    if (duration > avg && duration < high) return "var(--warning-200)";
    else if (duration > high) return "var(--attention-200)";
    else return "var(--ok-200)";
  };

  const stroke = (duration: number) => {
    if (duration > avg && duration < high) return "var(--warning-500)";
    else if (duration > high) return "var(--attention-500)";
    else return "var(--ok-500)";
  };

  return (
    <ChartContainer config={{}} className={className}>
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        maxBarSize={20}
      >
        <XAxis type="number" dataKey="duration" hide />
        <YAxis type="category" dataKey="time" hide />
        <ChartTooltip
          cursor={false}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
          formatter={(_1, _2, props) => props.payload.branch}
          content={<ChartTooltipContent hideIndicator />}
        />
        <Bar dataKey={"duration"} fill="var(--color-duration)" radius={5}>
          {data.map((entry, index) => (
            <Cell
              key={index}
              strokeWidth={2}
              stroke={stroke(entry.duration)}
              fill={color(entry.duration)}
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
