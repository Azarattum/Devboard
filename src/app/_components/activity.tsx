"use client";

import {
  CartesianGrid,
  AreaChart,
  LabelList,
  XAxis,
  Area,
  Dot,
} from "recharts";
import { ChartTooltipContent, ChartContainer, ChartTooltip } from "./chart";
import { type Activity as ActivityType } from "~/server/db/schema";
import { type HTMLAttributes, Fragment, useState } from "react";
import { cn } from "~/lib/utils";
import { api } from "~/lib/trpc";

export function Activity({
  activity: initialActivity,
  className,
  ...props
}: HTMLAttributes<HTMLSelectElement> & { activity: ActivityType[] }) {
  const [activity, setActivity] = useState(initialActivity);
  api.realtime.activity.useSubscription(undefined, {
    onData: (entry) => setActivity((before) => [...before, entry]),
  });

  return (
    <section
      className={cn(
        "h-0 grow rounded-lg border border-teal-50 bg-teal-50/50 p-2 shadow-lg shadow-teal-500/10 duration-500 animate-in fade-in",
        className,
      )}
      {...props}
    >
      <ChartContainer className="size-full" config={{}}>
        <AreaChart margin={{ top: 16 }} accessibilityLayer data={activity}>
          <CartesianGrid strokeOpacity={0.3} vertical={false} />
          <XAxis
            tickFormatter={(value) =>
              new Date(+value).toTimeString().slice(0, 5)
            }
            dataKey={(x: ActivityType) => +x.timestamp}
            domain={["dataMin", "dataMax"]}
            stroke="var(--ok-900)"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            type="number"
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
