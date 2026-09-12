import Link from "next/link";
import type { ReactNode } from "react";

import KivaraLogo from "@/components/brand/KivaraLogo";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/cnas", label: "CNAs" },
  { href: "/admin/requests", label: "Requests" },
  { href: "/admin/assignments", label: "Assignments" },
  { href: "/admin/attendance", label: "Live Attendance" },
  { href: "/admin/timesheets", label: "Timesheets" },
  { href: "/admin/invoices", label: "Invoices" },
  { href: "/admin/audit", label: "Audit" },
];

export default function AdminShell({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--kivara-offwhite)]">
      <header className="border-b border-slate-200 bg-[var(--kivara-navy)] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-4 sm:py-4">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <KivaraLogo
              size={40}
              className="shrink-0 rounded-full bg-white p-0.5 sm:h-[52px] sm:w-[52px]"
            />
            <div className="min-w-0">
              <p className="text-[9px] uppercase tracking-[0.18em] text-[var(--kivara-aqua)] sm:text-[10px] sm:tracking-[0.22em]">
                Kivara Master Admin
              </p>
              <h1 className="font-display truncate text-lg font-bold sm:text-xl">
                {title}
              </h1>
            </div>
          </div>
          <Link
            href="/"
            className="shrink-0 rounded-full bg-white/10 px-3 py-2 text-xs sm:px-4 sm:text-sm"
          >
            Exit
          </Link>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-1.5 overflow-x-auto px-3 pb-3 sm:px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 whitespace-nowrap rounded-full bg-white/10 px-3.5 py-2.5 text-sm font-medium hover:bg-[var(--kivara-teal)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-3 py-4 sm:px-4 sm:py-6">{children}</main>
    </div>
  );
}
