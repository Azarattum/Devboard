import { HydrateClient } from "~/trpc/server";
import { Production } from "./_components/production";
import { Staging } from "./_components/staging";
import { Stats } from "./_components/stats";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="to-emerald-50-50 flex h-dvh w-dvw gap-16 p-8">
        <Staging className="col-start-1 row-span-2" />
        <div className="flex grow flex-col justify-between gap-16">
          <Stats className="col-start-2" />
          <Production className="col-start-2" />
        </div>
      </main>
    </HydrateClient>
  );
}
