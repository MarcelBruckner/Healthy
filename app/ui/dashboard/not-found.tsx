import { SentimentDissatisfiedOutlined } from '@mui/icons-material';
import { Box, Typography, Button } from "@mui/material";

export default function NotFoundBase({ message, href }: { message: string, href: string }) {
  return (
    <main >
      <Box height="70vh" width="100%" display="flex" justifyContent="center" alignItems="center">
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            <SentimentDissatisfiedOutlined sx={{ color: 'action.active', mr: 1, fontSize: '40' }} />
            404 Not Found!</Typography>
          <Typography variant="body1" fontWeight="bold" gutterBottom>{message}</Typography>
          <Button variant="contained" href={href}          >
            Zurück
          </Button>
        </Box>
      </Box>
    </main>
  );
}
