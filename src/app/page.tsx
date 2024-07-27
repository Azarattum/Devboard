import { Environments } from "./_components/environments";
import { Statistics } from "./_components/statistics";
import { Activity } from "./_components/activity";
import { builds } from "~/server/db/schema";
import { desc } from "drizzle-orm";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const environments = await db.query.environments.findMany({
    with: { builds: { orderBy: desc(builds.timestamp), limit: 20 } },
  });
  const activity = await db.query.activity.findMany();
  const statistics = await db.query.statistics.findMany();

  return (
    <main className="flex h-dvh w-dvw gap-16 p-8">
      <Environments
        className="col-start-1 row-span-2"
        environments={environments}
      />
      <div className="flex grow flex-col justify-between gap-16">
        <Statistics className="col-start-2" statistics={statistics} />
        <Activity className="col-start-2" activity={activity} />
      </div>
    </main>
  );
}
