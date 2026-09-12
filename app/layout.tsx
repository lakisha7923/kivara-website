import type { Metadata, Viewport } from "next";
import { Manrope, Fraunces } from "next/font/google";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kivara Healthcare",
  description:
    "Kivara connects healthcare facilities with licensed professionals for on-demand shifts, credentials, messaging, and payouts.",
  applicationName: "Kivara",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0D2B4D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-manrope)] bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
