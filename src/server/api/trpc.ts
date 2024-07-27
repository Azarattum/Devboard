import { initTRPC } from "@trpc/server";
import superjson from "superjson";

const t = initTRPC.context().create({ transformer: superjson });

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;
