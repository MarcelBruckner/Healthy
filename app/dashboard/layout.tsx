import SideNav from "@/app/ui/dashboard/sidenav";
import { Box } from "@mui/material";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SideNav>
      <Box padding={2}>
        {children}
      </Box>
    </SideNav>
  );
}
