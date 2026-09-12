import type { Metadata, Viewport } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";

import { HandoffProvider } from "@/components/handoffs/HandoffProvider";

import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kivara Healthcare",
  description:
    "Empowering healthcare through exceptional staffing. Kivara connects facilities and CNAs through credentialing, confirmed assignments, GPS timekeeping, timesheets, and billing.",
  applicationName: "Kivara Healthcare",
  icons: {
    icon: "/brand/favicon.png",
    apple: "/brand/apple-touch-icon.png",
  },
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
      className={`${montserrat.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--kivara-offwhite)] text-[var(--kivara-navy)] font-[family-name:var(--font-montserrat)]">
        <HandoffProvider>{children}</HandoffProvider>
      </body>
    </html>
  );
}
