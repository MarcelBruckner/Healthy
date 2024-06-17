import SideNav from "@/app/ui/dashboard/sidenav";
import Toolbar from '@mui/material/Toolbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SideNav>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </SideNav>
  );
}
