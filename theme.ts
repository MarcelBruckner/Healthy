"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap"
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily
  },
  palette: {
    primary: {
      main: "#354c5c",
      light: "#ddebf0",
      dark: "#1a2732",
      contrastText: "#fff"
    }
  }
});

export default theme;
