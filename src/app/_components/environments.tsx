"use client";

import type { PropsWithChildren, HTMLAttributes } from "react";
import { TriangleAlert, Ellipsis, Check } from "lucide-react";
import { type EnvironmentBuilds } from "~/server/db/schema";
import { cn } from "~/lib/utils";
import { Builds } from "./builds";

export function Environments({
  environments,
  className,
  ...props
}: {
  environments?: EnvironmentBuilds[];
} & HTMLAttributes<HTMLElement>) {
  const badge = {
    pending: ({ children }: PropsWithChildren) => (
      <div className="flex size-44 flex-col items-center justify-evenly gap-2 rounded-lg border border-amber-100 bg-amber-50 shadow-lg shadow-amber-500/10">
        <Ellipsis className="box-content size-16 rounded-full border-2 border-amber-600 bg-amber-200 p-4 text-amber-600 *:animate-flow *:duration-900 [&>*:nth-child(2)]:delay-300 [&>*:nth-child(3)]:delay-600"></Ellipsis>
        <div className="truncate text-center font-light uppercase text-amber-900">
          {children}
        </div>
      </div>
    ),
    fail: ({ children }: PropsWithChildren) => (
      <div className="flex size-44 flex-col items-center justify-evenly gap-2 rounded-lg border border-rose-100 bg-rose-50 shadow-lg shadow-rose-500/10">
        <TriangleAlert className="box-content size-14 overflow-visible rounded-full border-2 border-rose-600 bg-rose-200 p-5 text-rose-600 *:origin-center *:animate-wiggle" />
        <div className="truncate text-center font-light uppercase text-rose-900">
          {children}
        </div>
      </div>
    ),
    success: ({ children }: PropsWithChildren) => (
      <div className="flex size-44 flex-col items-center justify-evenly gap-2 rounded-lg border border-teal-100 bg-teal-50 shadow-lg shadow-teal-500/10">
        <Check className="box-content size-16 rounded-full border-2 border-teal-600 bg-teal-200 p-4 text-teal-600" />
        <div className="truncate text-center font-light uppercase text-teal-900">
          {children}
        </div>
      </div>
    ),
  };

  return (
    <section
      className={cn("relative flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex gap-4 animate-in fade-in zoom-in">
        {environments?.map(({ builds, name }) => {
          const Badge = badge[builds[0]?.status ?? "pending"];
          return <Badge key={name}>{name}</Badge>;
        })}
      </div>
      <div className="grid grow grid-flow-col grid-cols-[50%_50%] border-t border-stone-100 p-4 after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:block after:h-1/6 after:w-full after:bg-gradient-to-t after:from-white">
        {environments?.map(({ builds, name }) => (
          <Builds
            className="size-full [&_svg]:odd:-scale-x-100"
            builds={builds}
            key={name}
          />
        ))}
      </div>
    </section>
  );
}