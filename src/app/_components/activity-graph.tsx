"use client";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import type { ActivityOnline } from "~/types/structures";

export function ActivityGraph({ data }: { data: ActivityOnline[] }) {
  return (
    <ChartContainer config={{}} className="size-full">
      <AreaChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} strokeOpacity={0.3} />
        <XAxis
          dataKey="time"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          stroke="var(--ok-900)"
          tickFormatter={(value) => new Date(+value).toTimeString().slice(0, 5)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideIndicator />}
        />
        <defs>
          <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="15%" stopColor="var(--ok-200)" stopOpacity={0.9} />
            <stop offset="95%" stopColor="var(--ok-200)" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <Area
          dataKey="online"
          type="natural"
          fill="url(#fill)"
          fillOpacity={0.4}
          strokeWidth={2}
          stroke="var(--ok-500)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
