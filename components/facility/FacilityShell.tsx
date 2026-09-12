import Link from "next/link";
import type { ReactNode } from "react";

import KivaraLogo from "@/components/brand/KivaraLogo";

const links = [
  { href: "/facility", label: "Dashboard" },
  { href: "/facility/requests", label: "Request Staff" },
  { href: "/facility/assignments", label: "Assignments" },
  { href: "/facility/attendance", label: "Attendance" },
  { href: "/facility/timesheets", label: "Timesheets" },
  { href: "/facility/invoices", label: "Invoices" },
  { href: "/facility/messages", label: "Messages" },
];

export default function FacilityShell({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div className="min-h-screen bg-[var(--kivara-offwhite)]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div className="flex items-center gap-3">
            <KivaraLogo size={52} className="rounded-full" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--kivara-teal)]">
                Facility Portal
              </p>
              <h1 className="font-display text-xl font-bold text-[var(--kivara-navy)]">
                {title}
              </h1>
              <p className="text-sm text-[var(--kivara-gray)]">Sunrise Care Center</p>
            </div>
          </div>
          <Link
            href="/"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-[var(--kivara-navy)]"
          >
            Exit
          </Link>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pb-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-full bg-[var(--kivara-aqua)] px-3 py-1.5 text-sm font-medium text-[var(--kivara-navy)] hover:bg-[var(--kivara-teal)] hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 pb-16">{children}</main>
    </div>
  );
}
