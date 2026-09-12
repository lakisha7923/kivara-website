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
        {/* Permanent left sidebar — mockup layout on every screen size */}
        <aside className="sticky top-0 flex h-screen w-[13.5rem] shrink-0 flex-col bg-[#0D2B4D] text-white sm:w-60 lg:w-64">
          <div className="flex items-center gap-2.5 border-b border-white/10 px-3 py-4 sm:gap-3 sm:px-5 sm:py-5">
            <Image
              src="/logo/kivara-logo.png"
              alt="Kivara Healthcare"
              width={42}
              height={42}
              className="h-9 w-9 shrink-0 rounded-full bg-white p-0.5 sm:h-[42px] sm:w-[42px]"
              priority
            />
            <div className="min-w-0">
              <p className="font-[family-name:var(--font-playfair)] text-base font-semibold leading-none sm:text-lg">
                KIVARA
              </p>
              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#0FA3A3] sm:text-[10px] sm:tracking-[0.22em]">
                Healthcare
              </p>
            </div>
          </div>

          <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-3 sm:space-y-1 sm:px-3 sm:py-4">
            {navItems.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center justify-between rounded-xl px-2.5 py-2 text-[13px] font-medium transition sm:px-3 sm:py-2.5 sm:text-sm ${
                    active
                      ? "bg-[#0FA3A3] text-white"
                      : "text-white/85 hover:bg-white/10"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2 sm:gap-3">
                    <span className="w-5 shrink-0 text-center text-base leading-none">
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </span>
                  {item.badge ? (
                    <span className="ml-1 shrink-0 rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-bold sm:px-2 sm:text-[11px]">
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-white/10 p-3 sm:p-4">
            <div className="rounded-2xl bg-white/10 p-3 sm:p-4">
              <p className="text-sm font-semibold">Need Help?</p>
              <p className="mt-1 text-[11px] text-white/75 sm:text-xs">
                Contact Kivara Support
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
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
              <div className="min-w-0">
                <p className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#0D2B4D] sm:text-xl">
                  Kivara Facility Portal
                </p>
                <div className="mt-1 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-[#F2F4F7] px-3 py-1 text-xs font-semibold text-[#0D2B4D]">
                  Memorial Care Center
                  <span className="text-slate-400">▾</span>
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
              </div>
            </div>
          </header>

          <main className="flex-1 px-3 py-4 sm:px-6 sm:py-5 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
