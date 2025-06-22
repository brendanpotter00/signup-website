import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DEFAULT_SITE_TITLE, DEFAULT_SITE_DESCRIPTION } from "@/config";
import Analytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: DEFAULT_SITE_TITLE,
  description: DEFAULT_SITE_DESCRIPTION,
  icons: {
    icon: "/icon.svg",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: "#000000",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
