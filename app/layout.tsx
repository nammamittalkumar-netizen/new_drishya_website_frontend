import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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
      <body className={`${inter.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
