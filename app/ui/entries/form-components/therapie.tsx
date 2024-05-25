import { State } from "@/app/lib/actions";
import {
    EyeDropperIcon
} from "@heroicons/react/24/outline";

export default async function Therapie({ state, therapie }: { state: State, therapie?: string }) {
    return (
        <div className="mb-4">
            <label htmlFor="therapie" className="mb-2 block text-sm font-medium">
                Therapie
            </label>
            <div className="relative  mt-2 rounded-md">
                <div className="relative">
                    <input
                        id="therapie"
                        name="therapie"
                        type="text"
                        placeholder="Medikamente, andere Behandlungen"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        aria-describedby="therapie-error"
                        defaultValue={therapie}
                    />
                    <EyeDropperIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
            </div>
            <div id="therapie-error" aria-live="polite" aria-atomic="true">
                {state.errors?.therapie &&
                    state.errors.therapie.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
        </div>
    );
}