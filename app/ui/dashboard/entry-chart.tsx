import { generateYAxis, groupEntriesByMonth } from "@/app/lib/utils";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { fetchFilteredFoods, fetchFoods } from "@/app/lib/data";

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function EntryChart() {
  const entries = await fetchFoods(); // Fetch data inside the component

  if (!entries || entries.length === 0) {
    return <p className="mt-4 text-gray-400">Keine Einträge vorhanden.</p>;
  }

  const chartHeight = 450;

  const { yAxisLabels, topLabel } = generateYAxis(entries);


  function Bar({ month, value }: { month: string, value: number }) {
    return <div key={month} className="flex flex-col items-center gap-2">
      <div
        className="w-full rounded-md bg-brand-300"
        style={{
          height: `${(chartHeight / topLabel) * value}px`
        }}
      ></div>
      <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0 leading-3 md:leading-5 text-center">
        {month}
      </p>
    </div>
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Einträge der letzten Monate
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map(label => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {groupEntriesByMonth(entries).map((entry, index) => (
            <Bar key={index} month={entry[0]} value={entry[1].length} />
          ))}
        </div>

        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
