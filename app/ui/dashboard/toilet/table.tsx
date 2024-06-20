import { fetchFilteredPoops } from "@/app/lib/data";
import { ToiletDB } from "@/app/lib/definitions";
import { ChartBarIcon, EyeDropperIcon } from "@heroicons/react/24/outline";
import { formatDatetime } from "@/app/lib/utils";
import { CopyButton, DeleteButton, EditButton } from "../common/buttons";
import { deleteFood, deleteToilet } from "@/app/lib/actions";
import DataTable from "./table-large-screen";

export default async function FoodsTable({
  query,
  currentPage
}: {
  query: string;
  currentPage: number;
}) {
  const entries: ToiletDB[] = await fetchFilteredPoops(query, currentPage);

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
                    <DeleteButton type="toilet" id={entry.id!} deleteFunc={deleteToilet} />
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
          <div className="hidden xl:block">
            <DataTable rows={entries} />
          </div>
        </div>
      </div>
    </div>
  );
}
