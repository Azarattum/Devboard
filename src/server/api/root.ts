import { createCallerFactory, createTRPCRouter } from "../api/trpc";
import { realtimeRouter } from "./routers/realtime";

export const appRouter = createTRPCRouter({ realtime: realtimeRouter });

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
