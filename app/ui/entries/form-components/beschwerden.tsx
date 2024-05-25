import { State } from "@/app/lib/actions";
import {
    ExclamationTriangleIcon
} from "@heroicons/react/24/outline";

export default async function Beschwerden({ state, beschwerden }: { state: State, beschwerden?: string }) {
    return (
        <div className="mb-4">
            <label
                htmlFor="beschwerden"
                className="mb-2 block text-sm font-medium"
            >
                Beschwerden / Symptome
            </label>
            <div className="relative  mt-2 rounded-md">
                <div className="relative">
                    <input
                        id="beschwerden"
                        name="beschwerden"
                        type="text"
                        placeholder="Wann, welche, Dauer, Schweregrad"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        aria-describedby="beschwerden-error"
                        defaultValue={beschwerden}
                    />
                    <ExclamationTriangleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
            </div>
            <div id="beschwerden-error" aria-live="polite" aria-atomic="true">
                {state.errors?.beschwerden &&
                    state.errors.beschwerden.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
        </div>
    );
}