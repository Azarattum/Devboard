import type { Statistic, Activity, Build } from "../../../server/db/schema";
import { type Events, events } from "../../../server/jobs/watcher";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { observable } from "@trpc/server/observable";

export const realtimeRouter = createTRPCRouter({
  builds: publicProcedure.subscription(() => {
    return observable<Build>((emit) => {
      const handle: Handle<"build"> = (
        environment,
        status,
        duration,
        extra: string | null = null,
      ) => {
        const timestamp = new Date();
        emit.next({ environment, timestamp, duration, status, extra });
      };

      events.on("build", handle);
      return () => events.off("build", handle);
    });
  }),
  activity: publicProcedure.subscription(() => {
    return observable<Activity>((emit) => {
      const handle: Handle<"activity"> = (value, event) => {
        emit.next({ timestamp: new Date(), event: event ?? null, value });
      };

      events.on("activity", handle);
      return () => events.off("activity", handle);
    });
  }),
  statistics: publicProcedure.subscription(() => {
    return observable<Statistic>((emit) => {
      const handle: Handle<"statistics"> = (label, value, day) => {
        emit.next({ label, value, day });
      };

      events.on("statistics", handle);
      return () => events.off("statistics", handle);
    });
  }),
});

type Handle<T extends keyof Events> = (..._: Events[T]) => void;
