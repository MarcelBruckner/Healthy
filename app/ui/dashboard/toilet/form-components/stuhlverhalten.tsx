import { StateFood, StatePoop } from "@/app/lib/actions";
import { BRISTOl_STOOL_SCALA, capitalizeFirstLetter } from "@/app/lib/utils";
import {
    ChartBarIcon,
    ChevronDoubleDownIcon
} from "@heroicons/react/24/outline";

export default async function Stuhlverhalten({ state, stuhltyp, stuhlfarbe }: { state: StatePoop, stuhltyp?: number, stuhlfarbe?: number }) {
    function DropdownForm({ id, icon, defaultValue, errors, children }: { id: string, icon: any, defaultValue?: number, errors?: string[], children: React.ReactElement }) {
        const Icon = icon;

        return (
            <div className="mb-4">
                <label
                    htmlFor={id}
                    className="mb-2 w-full block text-sm font-medium"
                >
                    {capitalizeFirstLetter(id)}
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <select
                            id={id}
                            name={id}
                            placeholder={capitalizeFirstLetter(id)}
                            className="peer w-full block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            aria-describedby={`${id}-error`}
                            defaultValue={defaultValue}
                        >
                            {children}
                        </select>
                        <Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
                <div id={`${id}-error`} aria-live="polite" aria-atomic="true">
                    {errors &&
                        errors.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                </div>
            </div >
        )
    }

    function StuhltypForm() {
        return <DropdownForm id="stuhltyp" icon={ChartBarIcon} errors={state.errors?.stuhltyp}>
            <>
                {Array.from(Array(8).keys()).map(i => {
                    let text = ""
                    if (i == 0) {
                        text = "-";
                    } else {
                        text = `Typ ${i}: ${BRISTOl_STOOL_SCALA[i - 1]}`;
                    }
                    return (
                        <option value={i} key={text}>
                            {text}
                        </option>
                    );
                })
                }
            </>
        </DropdownForm>
    }

    const FARBEN = [
        "Braun",
        "Gelb",
        "Lehmfarben",
        "Schwarz",
        "Grün",
        "Rot"
    ]
    function StuhlfarbeForm() {
        return <DropdownForm id="stuhlfarbe" icon={ChartBarIcon} errors={state.errors?.stuhltyp}>
            <>
                {FARBEN.map((farbe, i) =>
                    <option value={i} key={farbe}>
                        {farbe}
                    </option>
                )
                }
            </>
        </DropdownForm>
    }

    return (
        <div>
            <StuhltypForm />
            <StuhlfarbeForm />
        </div >
    );
}