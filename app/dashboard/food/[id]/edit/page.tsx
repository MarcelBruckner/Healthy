import Form from "@/app/ui/food/edit-form";
import Breadcrumbs from "@/app/ui/food/breadcrumbs";
import { fetchFoodById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Essen und Trinken bearbeiten"
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
            label: "Eintrag bearbeiten",
            href: `/dashboard/food/${id}/edit`,
            active: true
          }
        ]}
      />
      <Form food={food} />
    </main>
  );
}
