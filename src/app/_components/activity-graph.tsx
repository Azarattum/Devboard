"use client";
import { CartesianGrid, AreaChart, XAxis, Area } from "recharts";
import type { ActivityOnline } from "~/types/structures";
import { ChartTooltipContent, ChartContainer, ChartTooltip } from "./chart";

export function ActivityGraph({ data }: { data: ActivityOnline[] }) {
  return (
    <ChartContainer className="size-full" config={{}}>
      <AreaChart accessibilityLayer data={data}>
        <CartesianGrid strokeOpacity={0.3} vertical={false} />
        <XAxis
          tickFormatter={(value) => new Date(+value).toTimeString().slice(0, 5)}
          stroke="var(--ok-900)"
          tickLine={false}
          axisLine={false}
          dataKey="time"
          tickMargin={8}
        />
        <ChartTooltip
          content={<ChartTooltipContent hideIndicator />}
          cursor={false}
        />
        <defs>
          <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="var(--ok-200)" stopOpacity={0.9} offset="15%" />
            <stop stopColor="var(--ok-200)" stopOpacity={0.1} offset="95%" />
          </linearGradient>
        </defs>
        <Area
          stroke="var(--ok-500)"
          fill="url(#fill)"
          fillOpacity={0.4}
          dataKey="online"
          strokeWidth={2}
          type="natural"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
