import Form from "@/app/ui/dashboard/food/create-form";
import Breadcrumbs from "@/app/ui/dashboard/common/breadcrumbs";
import { fetchFoodById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eintrag kopieren"
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const food = await fetchFoodById(id);
  if (!food) {
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
      <Form food={food} />
    </main>
  );
}
