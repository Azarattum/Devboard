import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { StagingBuild, StagingStatus } from "~/types/structures";

export const stagingRouter = createTRPCRouter({
  status: publicProcedure.query(() => {
    return {
      development: {
        type: "pending",
        since: Date.now(),
      },
      preproduction: {
        type: "fail",
        since: Date.now(),
      },
    } satisfies Record<string, StagingStatus>;
  }),
  statistics: publicProcedure.query(async () => {
    return {
      development: [
        { time: Date.now() - 4, branch: "master", duration: 60_000 },
        { time: Date.now() - 3, branch: "feature-1", duration: 30_000 },
        { time: Date.now() - 2, branch: "feature-2", duration: 10_000 },
        { time: Date.now() - 1, branch: "feature-3", duration: 5_000 },
        { time: Date.now(), branch: "feature-4", duration: 20_000 },
        { time: Date.now(), branch: "feature-4", duration: 20_000 },
        { time: Date.now(), branch: "feature-4", duration: 20_000 },
        { time: Date.now(), branch: "feature-4", duration: 20_000 },
        { time: Date.now(), branch: "feature-4", duration: 20_000 },
        { time: Date.now(), branch: "feature-4", duration: 20_000 },
        { time: Date.now() - 4, branch: "master", duration: 60_000 },
        { time: Date.now() - 4, branch: "master", duration: 60_000 },
        { time: Date.now() - 3, branch: "feature-1", duration: 30_000 },
        { time: Date.now() - 2, branch: "feature-2", duration: 10_000 },
        { time: Date.now() - 1, branch: "feature-3", duration: 5_000 },
        { time: Date.now(), branch: "feature-4", duration: 20_000 },
        { time: Date.now() - 3, branch: "feature-1", duration: 30_000 },
        { time: Date.now() - 2, branch: "feature-2", duration: 10_000 },
        { time: Date.now() - 1, branch: "feature-3", duration: 5_000 },
        { time: Date.now(), branch: "feature-4", duration: 20_000 },
      ],
      preproduction: [
        { time: Date.now() - 4, branch: "master", duration: 60_000 },
        { time: Date.now() - 3, branch: "something-3", duration: 20_000 },
        { time: Date.now() - 2, branch: "feature-1", duration: 30_000 },
        { time: Date.now() - 1, branch: "feature-2", duration: 10_000 },
        { time: Date.now(), branch: "feature-3", duration: 5_000 },
        { time: Date.now(), branch: "feature-4", duration: 20_000 },
        { time: Date.now(), branch: "feature-4", duration: 20_000 },
        { time: Date.now(), branch: "feature-4", duration: 20_000 },
        { time: Date.now(), branch: "feature-4", duration: 70_000 },
        { time: Date.now(), branch: "feature-4", duration: 10_000 },
        { time: Date.now(), branch: "feature-4", duration: 20_000 },
        { time: Date.now() - 4, branch: "master", duration: 60_000 },
        { time: Date.now() - 4, branch: "master", duration: 60_000 },
        { time: Date.now() - 3, branch: "feature-1", duration: 30_000 },
        { time: Date.now() - 2, branch: "feature-2", duration: 10_000 },
        { time: Date.now() - 1, branch: "feature-3", duration: 5_000 },
        { time: Date.now(), branch: "feature-4", duration: 20_000 },
        { time: Date.now() - 3, branch: "something-3", duration: 20_000 },
        { time: Date.now() - 2, branch: "feature-1", duration: 30_000 },
        { time: Date.now() - 1, branch: "feature-2", duration: 10_000 },
      ],
    } satisfies Record<string, StagingBuild[]>;
  }),
});
