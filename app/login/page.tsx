import HealthyLogo from "@/app/ui/healthy-logo";
import LoginForm from "@/app/ui/login-form";
import { Box, Divider, Paper, Typography } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login"
};

export default function LoginPage() {
  return (
    <main>
      <Box height="100vh" width="100vw" display="flex" justifyContent="center" alignItems="center">
        <Paper sx={{ marginRight: "2rem", maxWidth: 800, maxHeight: 400, minWidth: 200, width: '100%', padding: "1rem" }}>
          <Typography variant="h4" fontWeight="bold" marginBottom={2}>Welcome to Healthy</Typography>
          <Typography marginBottom={2}>Please log in below. Password was set from $PASSWORD.</Typography>
          <Divider sx={{ marginBottom: 4 }}></Divider>
          <LoginForm />
        </Paper>
      </Box>
    </main>
  );
}
