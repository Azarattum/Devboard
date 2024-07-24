import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { ActivityOnline } from "~/types/structures";

export const activityRouter = createTRPCRouter({
  online: publicProcedure.query(() => {
    return [
      { time: Date.now(), online: 67834 },
      { time: Date.now() + 10000, online: 74558 },
      { time: Date.now() + 20000, online: 23456 },
      { time: Date.now() + 30000, online: 283189 },
      { time: Date.now() + 40000, online: 234333 },
      { time: Date.now() + 50000, online: 62554 },
      { time: Date.now() + 60000, online: 546546 },
      { time: Date.now() + 70000, online: 445445 },
      { time: Date.now() + 80000, online: 344334 },
      { time: Date.now() + 90000, online: 43344 },
      { time: Date.now() + 100000, online: 23532 },
    ] satisfies ActivityOnline[];
  }),
});
