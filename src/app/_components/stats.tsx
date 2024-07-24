"use client";
import { type HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

export function Stats({
  className,
  ...props
}: HTMLAttributes<HTMLSelectElement>) {
  return (
    <section
      className={cn(
        "flex flex-col gap-2 duration-500 animate-in fade-in slide-in-from-top-3",
        className,
      )}
      {...props}
    >
      <h2 className="font-light uppercase text-gray-400">Today</h2>
      <div className="flex gap-4">
        <article className="flex w-min items-center justify-center gap-2 rounded-lg border border-sky-100 bg-sky-50 p-4 text-sky-900 shadow-lg shadow-sky-50">
          <h3 className="font-mono text-7xl font-extrabold">42</h3>
          <span className="font-light">Merged Branches</span>
        </article>
        <article className="flex w-min items-center justify-center gap-2 rounded-lg border border-violet-100 bg-violet-50 p-4 text-violet-900 shadow-lg shadow-violet-50">
          <h3 className="font-mono text-7xl font-extrabold">69</h3>
          <span className="font-light">Support Message</span>
        </article>
        <article className="flex w-min items-center justify-center gap-2 rounded-lg border border-indigo-100 bg-indigo-50 p-4 text-indigo-900 shadow-lg shadow-indigo-50">
          <h3 className="font-mono text-7xl font-extrabold">24</h3>
          <span className="font-light">Tasks Planned</span>
        </article>
        <div className="grow"></div>
      </div>
    </section>
  );
}
