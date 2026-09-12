"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import KivaraLogo from "@/components/brand/KivaraLogo";

const tabs = [
  { href: "/cna", label: "Home", icon: "🏠", exact: true },
  { href: "/cna/schedule", label: "Schedule", icon: "📅" },
  { href: "/cna/shifts", label: "Shifts", icon: "💼" },
  { href: "/cna/clock", label: "Clock", icon: "⏱️" },
  { href: "/cna/pay", label: "Pay", icon: "💵" },
  { href: "/cna/more", label: "More", icon: "•••" },
];

export default function CnaShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-[var(--kivara-offwhite)] text-[var(--kivara-navy)] shadow-xl md:border-x md:border-slate-200">
      <header className="sticky top-0 z-40 bg-[var(--kivara-navy)] px-4 py-3 text-white">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <KivaraLogo size={40} className="rounded-full bg-white p-0.5" priority />
            <div>
              <p className="font-display text-sm font-semibold tracking-wide">
                KIVARA HEALTHCARE
              </p>
              <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-[var(--kivara-aqua)]">
                Empowering healthcare through exceptional staffing
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/20"
            >
              Website
            </Link>
            <Link
              href="/cna/more"
              className="rounded-full bg-white/10 px-3 py-1.5 text-sm"
              aria-label="Notifications"
            >
              🔔
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-4 pb-28">{children}</main>

      <nav
        className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 border-t border-slate-200 bg-white/95 backdrop-blur"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="grid grid-cols-6">
          {tabs.map((tab) => {
            const active = tab.exact
              ? pathname === tab.href
              : pathname === tab.href || pathname.startsWith(`${tab.href}/`);
            return (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  className={`flex flex-col items-center gap-0.5 py-2 text-[10px] font-semibold ${
                    active ? "text-[var(--kivara-teal)]" : "text-slate-500"
                  }`}
                >
                  <span className="text-base leading-none">{tab.icon}</span>
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
