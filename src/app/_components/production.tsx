"use client";
import type { HTMLAttributes } from "react";
import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";
import { ActivityGraph } from "./activity-graph";

export function Production({
  className,
  ...props
}: HTMLAttributes<HTMLSelectElement>) {
  const [online] = api.activity.online.useSuspenseQuery();

  return (
    <section
      className={cn(
        "rounded-lg border border-teal-50 bg-teal-50/50 p-2 shadow-lg shadow-teal-500/10 duration-500 animate-in fade-in",
        className,
      )}
      {...props}
    >
      <ActivityGraph data={online}></ActivityGraph>
    </section>
  );
}
