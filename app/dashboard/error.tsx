"use client";

import { Box, Button, Paper, Typography } from "@mui/material";
import { useEffect } from "react";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <Box height="70vh" width="100%" display="flex" justifyContent="center" alignItems="center">
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>Etwas ist schiefgelaufen!</Typography>
          <Button variant="contained"
            onClick={
              // Attempt to recover by trying to re-render the invoices route
              () => reset()
            }
          >
            Nochmal versuchen
          </Button>
        </Box>
      </Box>

    </>
  );
}
