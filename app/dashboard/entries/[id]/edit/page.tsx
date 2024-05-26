import Form from "@/app/ui/entries/edit-form";
import Breadcrumbs from "@/app/ui/entries/breadcrumbs";
import { fetchEntryById, fetchCustomers, fetchEntries } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eintrag bearbeiten"
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const entry = await fetchEntryById(id);
  if (!entry) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Einträge", href: "/dashboard/entries" },
          {
            label: "Eintrag bearbeiten",
            href: `/dashboard/entries/${id}/edit`,
            active: true
          }
        ]}
      />
      <Form entry={entry} />
    </main>
  );
}
