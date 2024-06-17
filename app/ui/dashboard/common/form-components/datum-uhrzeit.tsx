import { StateFood } from "@/app/lib/actions";
import {
    CalendarIcon,
    ClockIcon
} from "@heroicons/react/24/outline";
import moment from "moment";

export default async function DatumUhrzeit({ state, datetime }: { state: StateFood, datetime?: Date }) {
    if (!datetime) {
        datetime = new Date();
    }

    const datum = moment(datetime).format("YYYY-MM-DD");
    const uhrzeit = moment(datetime).format("HH:mm:ss");

    function DatumForm() {
        return (
            <div className="md:w-44">
                <label htmlFor="datum" className="mb-2 w-full md:block text-sm font-medium">
                    Datum
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                            id="datum"
                            name="datum"
                            type="date"
                            placeholder="Datum"
                            className="peer w-full md:block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            aria-describedby="datum-error"
                            defaultValue={datum}
                            max={moment(new Date()).format("YYYY-MM-DD")}
                        />
                        <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
                <div id="datum-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.datum &&
                        state.errors.datum.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                </div>
            </div>
        );
    }

    function UhrzeitForm() {
        return (
            <div className="md:w-44">
                <label htmlFor="uhrzeit" className="mb-2 w-full md:block text-sm font-medium">
                    Uhrzeit
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                            id="uhrzeit"
                            name="uhrzeit"
                            type="time"
                            step="1"
                            placeholder="Uhrzeit"
                            className="peer w-full md:block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            aria-describedby="uhrzeit-error"
                            defaultValue={uhrzeit}
                        />
                        <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
                <div id="uhrzeit-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.uhrzeit &&
                        state.errors.uhrzeit.map((error: string) => (
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
            <div className="mb-4 md:flex md:flex-row">
                <div className="md:mr-4 mb-4 md:mb-0">
                    <DatumForm />
                </div>

                <UhrzeitForm />
            </div >
        </div >
    );
} 