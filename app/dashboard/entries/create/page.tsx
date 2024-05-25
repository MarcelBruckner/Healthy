import { fetchCustomers } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/entries/breadcrumbs";
import Form from "@/app/ui/entries/create-form";
import { Metadata } from "next";

export const METADATA: Metadata = {
    title: "Create Invoice",
};

export default async function Page() {
    const customers = await fetchCustomers();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Einträge", href: "/dashboard/entries" },
                    {
                        label: "Eintrag anlegen",
                        href: "/dashboard/entries/create",
                        active: true,
                    }
                ]}
            />
            <Form />
        </main>
    );
}