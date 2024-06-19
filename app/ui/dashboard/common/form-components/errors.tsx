import { StateFood, StatePoop } from "@/app/lib/actions";

export default async function Errors({ state }: { state: StateFood | StatePoop }) {
    return (
        <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.message && (
                <p className="mt-2 text-sm text-red-500" key={state.message}>
                    {state.message}
                </p>
            )}
        </div>
    );
}