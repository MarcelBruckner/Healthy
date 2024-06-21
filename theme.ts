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
      dark: "#233744",
      light: "#60829a",
      contrastText: "#e6f1fb"
    },
    secondary: {
      main: "#5c4535",
      dark: "#3f2b21",
      light: "#8b7361",
      contrastText: "#efece9"
    }
  }
});

export default theme;
