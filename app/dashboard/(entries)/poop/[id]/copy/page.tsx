import Form from "@/app/ui/dashboard/poop/create-form";
import Breadcrumbs from "@/app/ui/dashboard/common/breadcrumbs";
import { fetchFoodById, fetchPoopById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stuhlgang kopieren"
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const poop = await fetchPoopById(id);
  if (!poop) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Essen und Trinken", href: "/dashboard/food" },
          {
            label: "Eintrag kopieren",
            href: `/dashboard/food/copy`,
            active: true
          }
        ]}
      />
      <Form poop={poop} />
    </main>
  );
}
