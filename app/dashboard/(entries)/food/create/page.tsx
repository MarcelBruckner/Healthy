import Breadcrumbs from "@/app/ui/dashboard/common/breadcrumbs";
import CreateFoodForm from "@/app/ui/dashboard/food/create-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Eintrag anlegen"
};

export default async function Page() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Essen und Trinken", href: "/dashboard/food" },
                    {
                        label: "Eintrag anlegen",
                        href: "/dashboard/food/create",
                        active: true
                    }
                ]}
            />
            <CreateFoodForm />
        </main>
    );
}
