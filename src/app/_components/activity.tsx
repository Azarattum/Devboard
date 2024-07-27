"use client";

import {
  CartesianGrid,
  AreaChart,
  LabelList,
  XAxis,
  Area,
  Dot,
} from "recharts";
import { type HTMLAttributes, Fragment } from "react";
import { type Activity as ActivityType } from "~/server/db/schema";
import { cn } from "~/lib/utils";
import { ChartTooltipContent, ChartContainer, ChartTooltip } from "./chart";

export function Activity({
  className,
  activity,
  ...props
}: HTMLAttributes<HTMLSelectElement> & { activity: ActivityType[] }) {
  return (
    <section
      className={cn(
        "rounded-lg border border-teal-50 bg-teal-50/50 p-2 shadow-lg shadow-teal-500/10 duration-500 animate-in fade-in",
        className,
      )}
      {...props}
    >
      <ChartContainer className="size-full" config={{}}>
        <AreaChart accessibilityLayer data={activity}>
          <CartesianGrid strokeOpacity={0.3} vertical={false} />
          <XAxis
            tickFormatter={(value) =>
              new Date(+value).toTimeString().slice(0, 5)
            }
            stroke="var(--ok-900)"
            dataKey="timestamp"
            tickLine={false}
            axisLine={false}
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
            dot={({ payload, ...props }) => {
              if (!(payload as ActivityType).event) {
                return <Fragment key={+(payload as ActivityType).timestamp} />;
              } else {
                return (
                  <Dot
                    {...props}
                    key={+(payload as ActivityType).timestamp}
                    className="animate-in fade-in"
                    fill="var(--ok-500)"
                    fillOpacity={1}
                    r={5}
                  />
                );
              }
            }}
            stroke="var(--ok-500)"
            fill="url(#fill)"
            fillOpacity={0.4}
            dataKey="value"
            strokeWidth={2}
            type="natural"
            stackId="a"
          >
            <LabelList
              dataKey={(x) =>
                x.event &&
                `${x.event} ${x.timestamp.toTimeString().slice(0, 5)}`
              }
              className="fill-foreground duration-500 animate-in fade-in slide-in-from-top-2"
              fill="var(--ok-900)"
              data={activity}
              position="top"
              offset={16}
            />
          </Area>
        </AreaChart>
      </ChartContainer>
    </section>
  );
}
