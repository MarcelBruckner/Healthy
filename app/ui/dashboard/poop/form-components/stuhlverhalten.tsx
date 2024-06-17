import { StateFood, StatePoop } from "@/app/lib/actions";
import {
    ChartBarIcon,
    ChevronDoubleDownIcon
} from "@heroicons/react/24/outline";

export default async function Stuhlverhalten({ state, stuhltyp, stuhlverhalten }: { state: StatePoop, stuhltyp?: number, stuhlverhalten?: string }) {
    function StuhltypForm() {
        return (
            <div className="lg:w-44">
                <label
                    htmlFor="stuhltyp"
                    className="mb-2 w-full block text-sm font-medium"
                >
                    Stuhltyp
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <select
                            id="stuhltyp"
                            name="stuhltyp"
                            placeholder="Stuhltyp"
                            className="peer w-full lg:block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            aria-describedby="stuhltyp-error"
                            defaultValue={stuhltyp}
                        >
                            {Array.from(Array(8).keys()).map(i => {
                                let text = `Typ ${i}`;
                                if (i == 0) {
                                    text = "-";
                                }
                                return (
                                    <option value={i} key={text}>
                                        {text}
                                    </option>
                                );
                            })}
                        </select>
                        <ChartBarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
                <div id="stuhltyp-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.stuhltyp &&
                        state.errors.stuhltyp.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                </div>
            </div>
        )
    }

    function StuhlverhaltenForm() {
        return (
            <div className="w-full">
                <label
                    htmlFor="stuhlverhalten"
                    className="mb-2 block text-sm font-medium"
                >
                    Stuhlverhalten
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <textarea
                            id="stuhlverhalten"
                            name="stuhlverhalten"
                            placeholder="Wann, Farbe, Menge, sonstige Auffälligkeiten"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            aria-describedby="stuhlverhalten-error"
                            defaultValue={stuhlverhalten}
                        />
                        <ChevronDoubleDownIcon className="pointer-events-none absolute left-3 top-1 h-[18px] w-[18px] translate-y-1/3 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
                <div
                    id="stuhlverhalten-error"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {state.errors?.stuhlverhalten &&
                        state.errors.stuhlverhalten.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="mb-4 lg:flex lg:flex-row">
                <div className="lg:mr-4 mb-4 lg:mb-0">
                    <StuhltypForm />
                </div>
                <StuhlverhaltenForm />
            </div >
        </div >
    );
}