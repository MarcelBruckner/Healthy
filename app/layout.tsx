import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

export const metadata: Metadata = {
  title: {
    template: "%s | Healthy",
    default: "Healthy"
  },
  description: "Healthy - A self-hosted tracker for your health, eating habits and poop behavior.",
  metadataBase: new URL("https://github.com/MarcelBruckner/Healthy")
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="light">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=optional" /> */}
      </head>
      <AppRouterCacheProvider>
        <body className={`${inter.className} antialiased`}>{children}</body>
      </AppRouterCacheProvider>
    </html>
  );
}
