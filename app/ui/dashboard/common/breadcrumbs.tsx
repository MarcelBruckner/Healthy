import { clsx } from "clsx";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import { Breadcrumbs as MUIBreadcumbs, Button } from "@mui/material";

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <div role="presentation" >
      <MUIBreadcumbs aria-label="breadcrumb">
        {breadcrumbs.map((breadcrumb) => (
          <Button variant="text" href={breadcrumb.href}>{breadcrumb.label}</Button>
        ))}
      </MUIBreadcumbs>
    </div>
  );
}
