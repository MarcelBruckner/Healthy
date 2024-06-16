import Form from "@/app/ui/dashboard/poop/edit-form";
import Breadcrumbs from "@/app/ui/dashboard/common/breadcrumbs";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { fetchPoopById } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Stuhlgang bearbeiten"
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
            label: "Eintrag bearbeiten",
            href: `/dashboard/food/${id}/edit`,
            active: true
          }
        ]}
      />
      <Form poop={poop} />
    </main>
  );
}
