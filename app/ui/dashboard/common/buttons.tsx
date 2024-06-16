import { DocumentDuplicateIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function CreateButton({ type }: { type: 'food' | 'poop' }) {
  const MAPPING = {
    food: "Essen und Trinken anlegen",
    poop: "Stuhlgang anlegen",
  }

  return (
    <Link
      href={`/dashboard/${type}/create`}
      className="flex h-10 items-center rounded-lg bg-brand-600 px-4 text-sm font-medium text-white transition-colors hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      <span className="hidden md:block">{MAPPING[type]}</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function EditButton({ id, type }: { id: string, type: 'food' | 'poop' }) {
  return (
    <Link
      href={`/dashboard/${type}/${id}/edit`}
      className={`edit-${type}-button rounded-md border p-2 hover:bg-gray-100`}
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function CopyButton({ id, type }: { id: string, type: 'food' | 'poop' }) {
  return (
    <Link
      href={`/dashboard/${type}/${id}/copy`}
      className={`copy-${type}-button rounded-md border p-2 hover:bg-gray-100`}
    >
      <DocumentDuplicateIcon className="w-5" />
    </Link>
  );
}

export function DeleteButton({ id, type, deleteFunc }: { id: string, type: 'food' | 'poop', deleteFunc: (id: string) => any }) {
  const deleteEntryWithId = deleteFunc.bind(null, id);

  return (
    <form action={deleteEntryWithId}>
      <button className={`delete-${type}-button rounded-md border p-2 hover:bg-gray-100`}>
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
