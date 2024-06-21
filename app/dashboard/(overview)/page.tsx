import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import {
  EntryChartSkeleton,
  LatestEntriesSkeleton,
  CardsSkeleton
} from "@/app/ui/skeletons";
import CardWrapper from "@/app/ui/dashboard/cards";
import { Typography } from "@mui/material";
import Search from "@/app/ui/search";

export default async function Page() {
  return (
    <main>
      <Typography variant="h4" fontWeight='bold' gutterBottom>
        Dashboard
      </Typography>

      <Suspense fallback={<CardsSkeleton />}>
        <CardWrapper />
      </Suspense>

      <Suspense fallback={<EntryChartSkeleton />}>
        {/* <EntryChart /> */}
      </Suspense>
      <Suspense fallback={<LatestEntriesSkeleton />}>
        {/* <LatestEntries /> */}
      </Suspense>
    </main>
  );
}
