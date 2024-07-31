"use client";

import { type HTMLAttributes, useState } from "react";
import { type Statistic } from "~/server/db/schema";
import { v3 as hash } from "murmurhash";
import { cn } from "~/lib/utils";
import { api } from "~/lib/trpc";

export function Statistics({
  statistics: initialStatistics,
  className,
  ...props
}: HTMLAttributes<HTMLSelectElement> & { statistics?: Statistic[] }) {
  const [statistics, setStatistics] = useState(initialStatistics ?? []);
  api.realtime.statistics.useSubscription(undefined, {
    onData: (entry) =>
      setStatistics((before) => {
        let index = before.findIndex((x) => x.label === entry.label);
        if (index === -1) index = before.length;

        const after = [...before];
        after[index] = entry;
        return after;
      }),
  });

  if (!statistics.length) return null;
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
