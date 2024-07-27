import type { StagingStatus, StagingBuild } from "~/types/structures";
import { createTRPCRouter, publicProcedure } from "../../api/trpc";

export const stagingRouter = createTRPCRouter({
  statistics: publicProcedure.query(async () => {
    return {
      preproduction: [
        { time: Date.now() - 4, branch: "master", duration: 60_000 },
        { branch: "something-3", time: Date.now() - 3, duration: 20_000 },
        { time: Date.now() - 2, branch: "feature-1", duration: 30_000 },
        { time: Date.now() - 1, branch: "feature-2", duration: 10_000 },
        { branch: "feature-3", time: Date.now(), duration: 5_000 },
        { branch: "feature-4", time: Date.now(), duration: 20_000 },
        { branch: "feature-4", time: Date.now(), duration: 20_000 },
        { branch: "feature-4", time: Date.now(), duration: 20_000 },
        { branch: "feature-4", time: Date.now(), duration: 70_000 },
        { branch: "feature-4", time: Date.now(), duration: 10_000 },
        { branch: "feature-4", time: Date.now(), duration: 20_000 },
        { time: Date.now() - 4, branch: "master", duration: 60_000 },
        { time: Date.now() - 4, branch: "master", duration: 60_000 },
        { time: Date.now() - 3, branch: "feature-1", duration: 30_000 },
        { time: Date.now() - 2, branch: "feature-2", duration: 10_000 },
        { time: Date.now() - 1, branch: "feature-3", duration: 5_000 },
        { branch: "feature-4", time: Date.now(), duration: 20_000 },
        { branch: "something-3", time: Date.now() - 3, duration: 20_000 },
        { time: Date.now() - 2, branch: "feature-1", duration: 30_000 },
        { time: Date.now() - 1, branch: "feature-2", duration: 10_000 },
      ],
      development: [
        { time: Date.now() - 4, branch: "master", duration: 60_000 },
        { time: Date.now() - 3, branch: "feature-1", duration: 30_000 },
        { time: Date.now() - 2, branch: "feature-2", duration: 10_000 },
        { time: Date.now() - 1, branch: "feature-3", duration: 5_000 },
        { branch: "feature-4", time: Date.now(), duration: 20_000 },
        { branch: "feature-4", time: Date.now(), duration: 20_000 },
        { branch: "feature-4", time: Date.now(), duration: 20_000 },
        { branch: "feature-4", time: Date.now(), duration: 20_000 },
        { branch: "feature-4", time: Date.now(), duration: 20_000 },
        { branch: "feature-4", time: Date.now(), duration: 20_000 },
        { time: Date.now() - 4, branch: "master", duration: 60_000 },
        { time: Date.now() - 4, branch: "master", duration: 60_000 },
        { time: Date.now() - 3, branch: "feature-1", duration: 30_000 },
        { time: Date.now() - 2, branch: "feature-2", duration: 10_000 },
        { time: Date.now() - 1, branch: "feature-3", duration: 5_000 },
        { branch: "feature-4", time: Date.now(), duration: 20_000 },
        { time: Date.now() - 3, branch: "feature-1", duration: 30_000 },
        { time: Date.now() - 2, branch: "feature-2", duration: 10_000 },
        { time: Date.now() - 1, branch: "feature-3", duration: 5_000 },
        { branch: "feature-4", time: Date.now(), duration: 20_000 },
      ],
    } satisfies Record<string, StagingBuild[]>;
  }),
  status: publicProcedure.query(() => {
    return {
      development: {
        since: Date.now(),
        type: "pending",
      },
      preproduction: {
        since: Date.now(),
        type: "fail",
      },
    } satisfies Record<string, StagingStatus>;
  }),
});
