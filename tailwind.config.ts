import type { Config } from "tailwindcss";
const { createThemes } = require("tw-colors");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "13": "repeat(13, minmax(0, 1fr))"
      }
    },
    keyframes: {
      shimmer: {
        "100%": {
          transform: "translateX(100%)"
        }
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    createThemes({
      light: {
        primary: "#354C5C",
        secondary: "red",
        brand: "#354C5C",
        "brand-50": "#f2f8f9",
        "brand-100": "#ddebf0",
        "brand-200": "#c0d8e1",
        "brand-300": "#94bccc",
        "brand-400": "#6198af",
        "brand-500": "#457b95",
        "brand-600": "#3c667e",
        "brand-700": "#365468",
        "brand-800": "#354c5c",
        "brand-900": "#2e3e4b",
        "brand-950": "#1a2732"
      }
    })
  ]
};
export default config;
