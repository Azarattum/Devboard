import type { Statistic, Activity, Build } from "~/server/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { type Events, events } from "~/server/jobs/watcher";
import { observable } from "@trpc/server/observable";

export const realtimeRouter = createTRPCRouter({
  builds: publicProcedure.subscription(() => {
    return observable<Build>((emit) => {
      const handle: Handle<"build"> = (environment, status, duration) => {
        const timestamp = new Date();
        const users: string[] = []; /// TODO: support users
        emit.next({ environment, timestamp, duration, status, users });
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
