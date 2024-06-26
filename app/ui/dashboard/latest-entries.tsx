import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { lusitana } from "@/app/ui/fonts";
import { fetchLatestFoods } from "@/app/lib/data";
import { formatDatetime } from "@/app/lib/utils";

export default async function LatestEntries() {
  const latestEntries = await fetchLatestFoods();

  function Value({ value }: { value: string }) {
    if (value === "") {
      return <></>;
    }
    return <span className="mr-2">{value}</span>;
  }

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Neueste Einträge
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestEntries.map((entry, i) => {
            return (
              <div
                key={entry.id}
                className={clsx(
                  "flex flex-row items-center justify-between py-4",
                  {
                    "border-t": i !== 0
                  }
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base flex flex-row">
                      <Value value={formatDatetime(entry.datetime)} />
                      <Value value={entry.ort} />
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block flew flex-row">
                      <Value value={entry.motivation} />
                      <Value value={entry.speisen} />
                      <Value value={entry.getraenke} />
                      <Value value={entry.beschwerden} />
                    </p>

                  </div>
                </div>
                <p className={`${lusitana.className} truncate text-sm font-medium md:text-base`}>
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
