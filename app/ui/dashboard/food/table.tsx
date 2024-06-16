import { fetchFilteredFoods } from "@/app/lib/data";
import { FoodDB, PoopDB } from "@/app/lib/definitions";
import { HomeIcon, CakeIcon, UserGroupIcon, BeakerIcon, ExclamationTriangleIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { formatDatetime } from "@/app/lib/utils";
import { CopyButton, DeleteButton, EditButton } from "../common/buttons";
import { deleteFood } from "@/app/lib/actions";

export default async function FoodsTable({
  query,
  currentPage
}: {
  query: string;
  currentPage: number;
}) {
  const entries: FoodDB[] = await fetchFilteredFoods(query, currentPage);


  function SmallEntry({ type, value }: {
    type: "ort" | "motivation" | "speisen" | "getraenke" | "beschwerden" | "anmerkungen", value: string
  }) {
    if (value === "") {
      return <></>;
    }

    const className = "pointer-events-none left-3 top-1/2 h-[22px] w-[22px] mr-4 text-gray-500 peer-focus:text-gray-900 content-center"

    const MAPPING = {
      ort: HomeIcon,
      motivation: UserGroupIcon,
      speisen: CakeIcon,
      getraenke: BeakerIcon,
      beschwerden: ExclamationTriangleIcon,
      anmerkungen: ClipboardDocumentCheckIcon
    }
    const Icon = MAPPING[type];

    return (
      <div>
        <p className="font-medium flex flex-row">
          <Icon className={className} />
          {value}</p>
      </div>
    );
  }

  return (
    <div id="food-table" className="file:mt-6 flow-root">
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
                    <SmallEntry type="ort" value={entry.ort} />
                    <SmallEntry type="motivation" value={entry.motivation} />
                    <SmallEntry type="speisen" value={entry.speisen} />
                    <SmallEntry type="getraenke" value={entry.getraenke} />
                    <SmallEntry type="beschwerden" value={entry.beschwerden} />
                    <SmallEntry type="anmerkungen" value={entry.anmerkungen} />
                  </div>
                  <div className="flex justify-end gap-2">
                    <EditButton type="food" id={entry.id!} />
                    <CopyButton type="food" id={entry.id} />
                    <DeleteButton type="food" id={entry.id!} deleteFunc={deleteFood} />
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
                    {entry.anmerkungen}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <EditButton type="food" id={entry.id!} />
                      <CopyButton type="food" id={entry.id} />
                      <DeleteButton type="food" id={entry.id!} deleteFunc={deleteFood} />
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
