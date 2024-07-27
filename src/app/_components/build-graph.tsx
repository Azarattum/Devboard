"use client";
import { BarChart, XAxis, YAxis, Cell, Bar } from "recharts";
import type { StagingBuild } from "~/types/structures";
import { ChartTooltipContent, ChartContainer, ChartTooltip } from "./chart";

export function BuildGraph({
  className,
  data,
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
    <ChartContainer className={className} config={{}}>
      <BarChart
        accessibilityLayer
        layout="vertical"
        maxBarSize={20}
        data={data}
      >
        <XAxis dataKey="duration" type="number" hide />
        <YAxis type="category" dataKey="time" hide />
        <ChartTooltip
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
          formatter={(_1, _2, props) => props.payload.branch}
          content={<ChartTooltipContent hideIndicator />}
          cursor={false}
        />
        <Bar fill="var(--color-duration)" dataKey={"duration"} radius={5}>
          {data.map((entry, index) => (
            <Cell
              stroke={stroke(entry.duration)}
              fill={color(entry.duration)}
              strokeWidth={2}
              key={index}
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
