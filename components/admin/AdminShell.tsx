import Link from "next/link";
import type { ReactNode } from "react";

import KivaraLogo from "@/components/brand/KivaraLogo";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/cnas", label: "CNAs" },
  { href: "/admin/requests", label: "Requests" },
  { href: "/admin/assignments", label: "Assignments" },
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
    <div className="min-h-screen bg-[var(--kivara-offwhite)]">
      <header className="border-b border-slate-200 bg-[var(--kivara-navy)] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div className="flex items-center gap-3">
            <KivaraLogo size={52} className="rounded-full bg-white p-0.5" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--kivara-aqua)]">
                Kivara Master Admin
              </p>
              <h1 className="font-display text-xl font-bold">{title}</h1>
            </div>
          </div>
          <Link href="/" className="rounded-full bg-white/10 px-4 py-2 text-sm">
            Exit to site
          </Link>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 pb-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-full bg-white/10 px-3 py-1.5 text-sm hover:bg-[var(--kivara-teal)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
    </div>
  );
}
