import { UpdateEntry, DeleteEntry } from '@/app/ui/entries/buttons';
import { fetchFilteredEntries } from '@/app/lib/data';
import { Entry } from '@/app/lib/definitions';

export default async function EntriesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const entries: Entry[] = await fetchFilteredEntries(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {entries?.map((entry, index) => (
              <div
                key={index}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{entry.datum} {entry.uhrzeit}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="font-medium">
                      {entry.ort}
                    </p>
                    <p className="font-medium">
                      {entry.motivation}
                    </p>
                    <p className="font-medium">
                      {entry.speisen}
                    </p>
                    <p className="font-medium">
                      {entry.getraenke}
                    </p>
                    <p className="font-medium">
                      {entry.beschwerden}
                    </p>
                    <p className="font-medium">
                      {entry.stuhltyp > 0 ? `Typ ${entry.stuhltyp}: ${entry.stuhlverhalten}` : ""}
                    </p>
                    <p className="font-medium">
                      {entry.therapie}
                    </p>
                    <p className="font-medium">
                      {entry.anmerkungen}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateEntry id={index.toString()} />
                    <DeleteEntry id={index.toString()} />
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
              {entries.map((entry, index) => (
                <tr
                  key={index}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {entry.datum} {entry.uhrzeit}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {entry.ort}
                  </td>
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
                    {entry.stuhltyp > 0 ? `Typ ${entry.stuhltyp}: ${entry.stuhlverhalten}` : ""}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {entry.therapie}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {entry.anmerkungen}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateEntry id={index.toString()} />
                      <DeleteEntry id={index.toString()} />
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
