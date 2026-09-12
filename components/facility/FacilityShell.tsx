"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const navItems = [
  { href: "/facility", label: "Dashboard", icon: "▦", exact: true },
  { href: "/facility/requests", label: "Request Staff", icon: "＋" },
  { href: "/facility/assignments", label: "Shifts", icon: "📅" },
  { href: "/facility/assignments", label: "My Assignments", icon: "✓" },
  { href: "/facility/attendance", label: "Today's Attendance", icon: "⏱" },
  { href: "/facility/timesheets", label: "Timesheets", icon: "▤" },
  { href: "/facility/invoices", label: "Invoices & Billing", icon: "$" },
  { href: "/facility/settings", label: "Documents", icon: "📄" },
  { href: "/facility/messages", label: "Messages", icon: "💬", badge: 3 },
  { href: "/facility/settings", label: "Reports", icon: "📊" },
  { href: "/facility/settings", label: "Facility Settings", icon: "⚙" },
];

export default function FacilityShell({
  children,
}: {
  children: ReactNode;
  title?: string;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#F2F4F7] text-[#0D2B4D]">
      <div className="flex min-h-screen">
        {/* Left sidebar — matches approved mockup */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-[#0D2B4D] text-white lg:flex">
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
            <Image
              src="/logo/kivara-logo.png"
              alt="Kivara Healthcare"
              width={42}
              height={42}
              className="rounded-full bg-white p-0.5"
              priority
            />
            <div>
              <p className="font-[family-name:var(--font-playfair)] text-lg font-semibold leading-none">
                KIVARA
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0FA3A3]">
                Healthcare
              </p>
            </div>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            {navItems.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-[#0FA3A3] text-white"
                      : "text-white/85 hover:bg-white/10"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-5 text-center text-base leading-none">
                      {item.icon}
                    </span>
                    {item.label}
                  </span>
                  {item.badge ? (
                    <span className="rounded-full bg-[#0FA3A3] px-2 py-0.5 text-[11px] font-bold">
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-white/10 p-4">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm font-semibold">Need help?</p>
              <p className="mt-1 text-xs text-white/75">
                24/7 Facility Support
              </p>
              <p className="mt-2 text-sm font-semibold text-[#D6F1F1]">
                (800) 555-0147
              </p>
            </div>
            <Link
              href="/"
              className="mt-3 block text-center text-xs font-semibold text-white/70 hover:text-white"
            >
              ← Back to website
            </Link>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top header */}
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
              <div className="flex min-w-0 flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 lg:hidden">
                  <Image
                    src="/logo/kivara-logo.png"
                    alt="Kivara"
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <p className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#0D2B4D] sm:text-xl">
                    Kivara Facility Portal
                  </p>
                  <div className="mt-1 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-[#F2F4F7] px-3 py-1 text-xs font-semibold text-[#0D2B4D]">
                    Memorial Care Center
                    <span className="text-slate-400">▾</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="relative rounded-full border border-slate-200 p-2 text-sm"
                  aria-label="Notifications"
                >
                  🔔
                  <span className="absolute -right-1 -top-1 rounded-full bg-[#0FA3A3] px-1.5 text-[10px] font-bold text-white">
                    12
                  </span>
                </button>
                <div className="flex items-center gap-2 rounded-full border border-slate-200 py-1 pl-1 pr-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D6F1F1] text-xs font-bold text-[#0D2B4D]">
                    SJ
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold leading-none">
                      Sarah Johnson
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">DON</p>
                  </div>
                </div>
                <Link
                  href="/"
                  className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold lg:hidden"
                >
                  Website
                </Link>
              </div>
            </div>

            {/* Mobile nav */}
            <nav className="flex gap-2 overflow-x-auto border-t border-slate-100 px-4 py-2 lg:hidden">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="whitespace-nowrap rounded-full bg-[#D6F1F1] px-3 py-1.5 text-xs font-semibold text-[#0D2B4D]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>

          <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
