"use client";

import { type HTMLAttributes } from "react";
import { v3 as hash } from "murmurhash";
import { type Statistic } from "~/server/db/schema";
import { cn } from "~/lib/utils";

export function Statistics({
  statistics,
  className,
  ...props
}: HTMLAttributes<HTMLSelectElement> & { statistics?: Statistic[] }) {
  if (!statistics) return null;
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
        {statistics?.map(({ label, value }) => (
          <article
            className="flex w-min items-center justify-center gap-2 rounded-lg border border-sky-100 bg-sky-50 p-4 text-sky-900 shadow-lg shadow-sky-50"
            style={{ filter: `hue-rotate(${hash(label) % 90}deg)` }}
            key={label}
          >
            <h3 className="font-mono text-7xl font-extrabold">{value}</h3>
            <span className="font-light">{label}</span>
          </article>
        ))}
        <div className="grow"></div>
      </div>
    </section>
  );
}
