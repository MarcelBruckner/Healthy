import Search from "@/app/ui/search";
import Table from "@/app/ui/dashboard/toilet/table";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { Metadata } from "next";
import { CreateButton } from "@/app/ui/dashboard/common/buttons";
import { Box, Typography } from "@mui/material";

export const metadata: Metadata = {
  title: "Toilette"
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
      <Typography variant="h4" fontWeight='bold' gutterBottom>
        Toilette
      </Typography>

      <CreateButton type="toilet" />

      <Box paddingBottom="1rem">
        <Search placeholder="Durchsuche Toilette..." />
      </Box>

      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
    </>
  );
}
