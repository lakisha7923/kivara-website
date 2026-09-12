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
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col bg-[var(--kivara-offwhite)] text-[var(--kivara-navy)] shadow-xl md:border-x md:border-slate-200">
      <header className="sticky top-0 z-40 bg-[var(--kivara-navy)] px-3 py-2 text-white safe-pt sm:px-4 sm:py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <KivaraLogo
              size={34}
              className="shrink-0 rounded-full bg-white p-0.5"
              priority
            />
            <div className="min-w-0">
              <p className="font-display truncate text-sm font-semibold tracking-wide">
                KIVARA
              </p>
              <p className="truncate text-[10px] font-medium text-[var(--kivara-aqua)]">
                CNA Mobile App
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <Link
              href="/"
              className="rounded-full bg-white/10 px-2.5 py-2 text-[11px] font-semibold hover:bg-white/20"
            >
              Site
            </Link>
            <Link
              href="/cna/more"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm hover:bg-white/20"
              aria-label="Notifications"
            >
              🔔
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-x-hidden px-3 py-3 pb-28 sm:px-4 sm:py-4">
        {children}
      </main>

      <nav
        className="fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-slate-200 bg-white/95 backdrop-blur"
        style={{ paddingBottom: "max(0.35rem, env(safe-area-inset-bottom))" }}
        aria-label="CNA primary navigation"
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
                  className={`flex min-h-14 flex-col items-center justify-center gap-0.5 px-0.5 py-1.5 text-[9px] font-semibold sm:text-[10px] ${
                    active ? "text-[var(--kivara-teal)]" : "text-slate-500"
                  }`}
                >
                  <span className="text-base leading-none">{tab.icon}</span>
                  <span className="max-w-full truncate">{tab.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
