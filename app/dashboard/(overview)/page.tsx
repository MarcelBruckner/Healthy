import EntryChart from "@/app/ui/dashboard/entry-chart";
import LatestEntries from "@/app/ui/dashboard/latest-entries";
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import {
  EntryChartSkeleton,
  LatestEntriesSkeleton,
  CardsSkeleton
} from "@/app/ui/skeletons";
import CardWrapper from "@/app/ui/dashboard/cards";

export default async function Page() {
  console.log(process.env);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<EntryChartSkeleton />}>
          <EntryChart />
        </Suspense>
        <Suspense fallback={<LatestEntriesSkeleton />}>
          <LatestEntries />
        </Suspense>
      </div>
    </main>
  );
}
