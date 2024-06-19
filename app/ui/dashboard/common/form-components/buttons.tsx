import Link from "next/link";
import { Button } from "../../../button";

export default async function Buttons({ type, submit }: { type: "food" | "toilet", submit: string }) {
    return (
        <div className="mt-6 flex justify-end gap-4">
            <Link
                href={`/dashboard/${type}`}
                className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
                Abbrechen
            </Link>
            <Button type="submit">{submit}</Button>
        </div>
    );
}