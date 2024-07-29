import type { Database } from ".";
import { statistics, activity, builds } from "./schema";
import { events } from "../jobs/watcher";
import { formatTime } from "~/lib/utils";

export function attach(db: Database) {
  events.on("build", async (environment, status, duration) => {
    await db
      .insert(builds)
      .values({ environment, duration, status })
      .onConflictDoNothing();
    console.info(
      ` \x1b[1mi\x1b[0m ${status} ${environment} build (${formatTime(duration * 1000)})`,
    );
  });

  events.on("statistics", async (label, value, day) => {
    await db
      .insert(statistics)
      .values({ label, value, day })
      .onConflictDoUpdate({
        target: [statistics.day, statistics.label],
        set: { value },
      });
    console.info(` \x1b[1mi\x1b[0m "${label}" updated to ${value}`);
  });

  events.on("activity", async (value, event) => {
    await db.insert(activity).values({ value, event }).onConflictDoNothing();
    console.info(
      ` \x1b[1mi\x1b[0m Activity: ${value}` + (event ? ` (${event})` : ""),
    );
  });
}
