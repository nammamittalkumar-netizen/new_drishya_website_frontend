import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "Drishya — AI Surveillance Detection System",
    template: "%s · Drishya",
  },
  description:
    "AI video security, NVR and CCTV monitoring by Namma CCTV Private Limited.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/drishya-icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/drishya-icon-16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1868D8",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
