import Form from "@/app/ui/dashboard/toilet/create-form";
import Breadcrumbs from "@/app/ui/dashboard/common/breadcrumbs";
import { fetchFoodById, fetchPoopById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toilette kopieren"
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const toilet = await fetchPoopById(id);
  if (!toilet) {
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
      <Form toilet={toilet} />
    </main>
  );
}
