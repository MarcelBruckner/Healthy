import { StateFood } from "@/app/lib/actions";
import {
    BeakerIcon
} from "@heroicons/react/24/outline";

export default async function Getraenke({ state, getraenke }: { state: StateFood, getraenke?: string }) {
    return (
        <div className="mb-4">
            <label htmlFor="getraenke" className="mb-2 block text-sm font-medium">
                Getränke und Menge
            </label>
            <div className="relative  mt-2 rounded-md">
                <div className="relative">
                    <textarea
                        id="getraenke"
                        name="getraenke"
                        placeholder="Getränke und Menge"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        aria-describedby="getraenke-error"
                        defaultValue={getraenke}
                    />
                    <BeakerIcon className="pointer-events-none absolute left-3 top-1 h-[18px] w-[18px] translate-y-1/3 text-gray-500 peer-focus:text-gray-900" />
                </div>
            </div>
            <div id="getraenke-error" aria-live="polite" aria-atomic="true">
                {state.errors?.getraenke &&
                    state.errors.getraenke.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
        </div>
    );
}