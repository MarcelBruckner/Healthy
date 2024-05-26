import Form from "@/app/ui/entries/copy-form";
import Breadcrumbs from "@/app/ui/entries/breadcrumbs";
import { fetchEntryById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eintrag kopieren"
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
            href: `/dashboard/entries/copy`,
            active: true
          }
        ]}
      />
      <Form entry={entry} />
    </main>
  );
}
