import Pagination from "@/app/ui/dashboard/common/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/dashboard/food/table";
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchFoodPages as fetchFoodPages } from "@/app/lib/data";
import { Metadata } from "next";
import { CreateButton } from "@/app/ui/dashboard/common/buttons";
import { Box, Grid, Typography } from "@mui/material";

export const metadata: Metadata = {
  title: "Essen und Trinken"
};

export default async function Page({
  searchParams
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <Typography variant="h4" component="div">
        Essen und Trinken
      </Typography>

      <CreateButton type="food" />

      <Box paddingBottom="1rem">
        <Search placeholder="Durchsuche Essen und Trinken..." />
      </Box>

      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
    </>
  );
}
