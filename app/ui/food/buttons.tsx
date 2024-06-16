import { DocumentDuplicateIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteInvoice as deleteEntry } from "@/app/lib/actions";

export function CreateFood() {
  return (
    <Link
      href="/dashboard/food/create"
      className="flex h-10 items-center rounded-lg bg-brand-600 px-4 text-sm font-medium text-white transition-colors hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      <span className="hidden md:block">Essen und Trinken anlegen</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function EditFood({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/food/${id}/edit`}
      className="edit-food-button rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function CopyFood({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/food/${id}/copy`}
      className="copy-food-button rounded-md border p-2 hover:bg-gray-100"
    >
      <DocumentDuplicateIcon className="w-5" />
    </Link>
  );
}

export function DeleteEntry({ id }: { id: string }) {
  const deleteEntryWithId = deleteEntry.bind(null, id);

  return (
    <form action={deleteEntryWithId}>
      <button className="delete-food-button rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
