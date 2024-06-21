"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Box, FormControl, Input, InputAdornment, InputLabel, TextField } from "@mui/material";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(term => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <TextField sx={{ display: 'flex' }}
      id="search" label={placeholder} variant="standard"
      onChange={e => {
        handleSearch(e.target.value);
      }}
      defaultValue={searchParams.get("query")?.toString()}
    />
  );
}
