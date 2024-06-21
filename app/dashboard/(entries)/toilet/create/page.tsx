import Breadcrumbs from "@/app/ui/dashboard/common/breadcrumbs";
import CreateToiletForm from "@/app/ui/dashboard/toilet/create-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Eintrag anlegen"
};

export default async function Page() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Toilette", href: "/dashboard/toilet" },
                    {
                        label: "Eintrag anlegen",
                        href: "/dashboard/toilet/create",
                        active: true
                    }
                ]}
            />
            <CreateToiletForm />
        </main>
    );
}
