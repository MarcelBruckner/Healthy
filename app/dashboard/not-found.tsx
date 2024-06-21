import NotFoundBase from "@/app/ui/dashboard/not-found";
import { Box } from "@mui/material";
import SideNav from "@/app/ui/dashboard/sidenav";

export default function NotFound() {
    return (
        <SideNav>
            <Box padding={2}>
                <NotFoundBase message="Resource nicht gefunden!" href="/dashboard" />
            </Box>
        </SideNav>
    );
}
