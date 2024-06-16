import Pagination from "@/app/ui/dashboard/common/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/dashboard/poop/table";
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchFoodPages as fetchFoodPages } from "@/app/lib/data";
import { Metadata } from "next";
import { CreateButton } from "@/app/ui/dashboard/common/buttons";

export const metadata: Metadata = {
  title: "Stuhlgang"
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

  const totalPages = await fetchFoodPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Stuhlgang</h1>
      </div>
      <div className="mt-4 mb-2 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Durchsuche Stuhlgänge..." />
        <CreateButton type="poop" />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
