import { createCallerFactory, createTRPCRouter } from "../api/trpc";
import { activityRouter } from "./routers/activity";
import { stagingRouter } from "./routers/staging";

export const appRouter = createTRPCRouter({
  activity: activityRouter,
  staging: stagingRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
