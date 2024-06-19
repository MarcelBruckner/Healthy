import { fetchFilteredPoops } from "@/app/lib/data";
import { PoopDB } from "@/app/lib/definitions";
import { ChartBarIcon, EyeDropperIcon } from "@heroicons/react/24/outline";
import { formatDatetime } from "@/app/lib/utils";
import { CopyButton, DeleteButton, EditButton } from "../common/buttons";
import { deleteFood, deletePoop } from "@/app/lib/actions";

export default async function FoodsTable({
  query,
  currentPage
}: {
  query: string;
  currentPage: number;
}) {
  const entries: PoopDB[] = await fetchFilteredPoops(query, currentPage);

  function SmallEntry({ type, value }: {
    type: "stuhlverhalten" | "therapie", value: string
  }) {
    if (value === "") {
      return <></>;
    }

    const className = "pointer-events-none left-3 top-1/2 h-[22px] w-[22px] mr-4 text-gray-500 peer-focus:text-gray-900 content-center"

    const MAPPING = {
      stuhlverhalten: ChartBarIcon,
      therapie: EyeDropperIcon
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
    <div id="toilet-table" className="file:mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 xl:pt-0">
          <div className="xl:hidden">
            {entries?.map(entry => (
              <div
                key={entry.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className=" text-gray-500">
                      {formatDatetime(entry.datetime)}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <EditButton type="toilet" id={entry.id!} />
                    <CopyButton type="toilet" id={entry.id} />
                    <DeleteButton type="toilet" id={entry.id!} deleteFunc={deletePoop} />
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <SmallEntry type="stuhlverhalten" value=
                      {entry.stuhltyp > 0
                        ? `Typ ${entry.stuhltyp}: ${entry.stuhlverhalten}`
                        : ""}
                    />
                    <SmallEntry type="therapie" value={entry.therapie} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 xl:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Datum
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Stuhlverhalten
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Therapie
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
                  <td className="whitespace-nowrap px-3 py-3">
                    {entry.stuhltyp > 0 ? `Typ ${entry.stuhltyp}` : ""}
                    {entry.stuhltyp > 0 && entry.stuhlverhalten ? ": " : ""}
                    {entry.stuhlverhalten ? entry.stuhlverhalten : ""}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {entry.therapie}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <EditButton type="toilet" id={entry.id!} />
                      <CopyButton type="toilet" id={entry.id} />
                      <DeleteButton type="toilet" id={entry.id!} deleteFunc={deletePoop} />
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
