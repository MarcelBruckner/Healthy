import { StateFood, StatePoop } from "@/app/lib/actions";
import { Alert } from "@mui/material";

export default async function Errors({ state }: { state: StateFood | StatePoop }) {
    return (
        <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.message && (
                <Alert severity="error">{state.message}</Alert>
            )}
        </div>
    );
}