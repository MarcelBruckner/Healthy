import Form from "@/app/ui/dashboard/toilet/edit-form";
import Breadcrumbs from "@/app/ui/dashboard/common/breadcrumbs";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { fetchPoopById } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Toilette bearbeiten"
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
          { label: "Essen und Trinken", href: "/dashboard/toilet" },
          {
            label: "Eintrag bearbeiten",
            href: `/dashboard/toilet/${id}/edit`,
            active: true
          }
        ]}
      />
      <Form toilet={toilet} />
    </main>
  );
}
