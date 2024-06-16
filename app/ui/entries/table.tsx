import { UpdateEntry, DeleteEntry, CopyEntry } from "@/app/ui/entries/buttons";
import { fetchFilteredEntries } from "@/app/lib/data";
import { Entry } from "@/app/lib/definitions";
import { ReactComponentElement } from "react";
import { HomeIcon, CakeIcon, UserGroupIcon, BeakerIcon, ExclamationTriangleIcon, ChartBarIcon, EyeDropperIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { formatDatetime } from "@/app/lib/utils";

export default async function EntriesTable({
  query,
  currentPage
}: {
  query: string;
  currentPage: number;
}) {
  const entries: Entry[] = await fetchFilteredEntries(query, currentPage);

  const enum Type {
    ORT,
    MOTIVATION,
    SPEISEN,
    GETRAENKE,
    BESCHWERDEN,
    STUHLVERHALTEN,
    THEARPIE,
    ANMERKUNGEN
  }

  function getIconForType(type: Type) {
    let icon = <></>;
    const className = "pointer-events-none left-3 top-1/2 h-[22px] w-[22px] mr-4 text-gray-500 peer-focus:text-gray-900 content-center"

    switch (type) {
      case Type.ORT: icon = <HomeIcon className={className} />; break
      case Type.MOTIVATION: icon = <UserGroupIcon className={className} />; break
      case Type.SPEISEN: icon = <CakeIcon className={className} />; break
      case Type.GETRAENKE: icon = <BeakerIcon className={className} />; break
      case Type.BESCHWERDEN: icon = <ExclamationTriangleIcon className={className} />; break
      case Type.STUHLVERHALTEN: icon = <ChartBarIcon className={className} />; break
      case Type.THEARPIE: icon = <EyeDropperIcon className={className} />; break
      case Type.ANMERKUNGEN: icon = <ClipboardDocumentCheckIcon className={className} />; break
    }
    return icon;
  }

  function SmallEntry({ type, value }: { type: Type, value: string }) {
    if (value === "") {
      return <></>;
    }

    let icon = getIconForType(type);

    return (
      <div>
        <p className="font-medium flex flex-row">{icon}{value}</p>
      </div>
    );
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {entries?.map(entry => (
              <div
                key={entry.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      {formatDatetime(entry.datetime)}
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <SmallEntry type={Type.ORT} value={entry.ort} />
                    <SmallEntry type={Type.MOTIVATION} value={entry.motivation} />
                    <SmallEntry type={Type.SPEISEN} value={entry.speisen} />
                    <SmallEntry type={Type.GETRAENKE} value={entry.getraenke} />
                    <SmallEntry type={Type.BESCHWERDEN} value={entry.beschwerden} />
                    <SmallEntry type={Type.STUHLVERHALTEN} value=
                      {entry.stuhltyp > 0
                        ? `Typ ${entry.stuhltyp}: ${entry.stuhlverhalten}`
                        : ""}
                    />
                    <SmallEntry type={Type.THEARPIE} value={entry.therapie} />
                    <SmallEntry type={Type.ANMERKUNGEN} value={entry.anmerkungen} />
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateEntry id={entry.id!} />
                    <DeleteEntry id={entry.id!} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Datum
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Ort
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Motivation
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Speisen
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Getränke
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Beschwerden
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Stuhlverhalten
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Therapie
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Anmerkungen
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {entries.map(entry => (
                <tr
                  key={entry.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDatetime(entry.datetime)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{entry.ort}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {entry.motivation}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {entry.speisen}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {entry.getraenke}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {entry.beschwerden}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {entry.stuhltyp > 0
                      ? `Typ ${entry.stuhltyp}: ${entry.stuhlverhalten}`
                      : ""}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {entry.therapie}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {entry.anmerkungen}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateEntry id={entry.id!} />
                      <CopyEntry id={entry.id!} />
                      <DeleteEntry id={entry.id!} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
