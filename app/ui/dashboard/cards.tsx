import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
  ClipboardDocumentIcon,
  CakeIcon,
  BeakerIcon,
  ExclamationTriangleIcon,
  ChevronDoubleDownIcon
} from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { fetchCardData } from "@/app/lib/data";

const iconMap = {
  entries: ClipboardDocumentIcon,
  foods: CakeIcon,
  illness: BeakerIcon,
  toilets: ChevronDoubleDownIcon
};

export default async function CardWrapper() {
  const {
    totalNumberOfEntries,
    numberOfFoods,
    numberOfDrinks,
    numberOfPoops
  } = await fetchCardData();

  return (
    <>
      <Card title="Einträge" value={totalNumberOfEntries} type="entries" />
      <Card title="Essen" value={numberOfFoods} type="foods" />
      <Card
        title="Stuhlgänge"
        value={numberOfPoops}
        type="toilets"
      />
      <Card title="Erkrankungen" value={numberOfDrinks} type="illness" />
    </>
  );
}

export function Card({
  title,
  value,
  type
}: {
  title: string;
  value: number | string;
  type: "entries" | "foods" | "illness" | "toilets";
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
