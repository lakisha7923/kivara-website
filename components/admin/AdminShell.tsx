"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "▦", exact: true },
  { href: "/admin/cnas", label: "CNAs", icon: "👤" },
  { href: "/admin/facilities", label: "Facilities", icon: "🏛" },
  { href: "/admin/requests", label: "Staffing Requests", icon: "＋" },
  { href: "/admin/shift-requests", label: "Shift Requests", icon: "⇄" },
  { href: "/admin/assignments", label: "Assignments", icon: "✓" },
  { href: "/admin/attendance", label: "Time & Attendance", icon: "⏱" },
  { href: "/admin/timesheets", label: "Timesheets", icon: "▤" },
  { href: "/admin/payroll", label: "Payroll", icon: "₴" },
  { href: "/admin/invoices", label: "Invoices", icon: "$" },
  { href: "/admin/messages", label: "Messages", icon: "💬", badge: 4 },
  { href: "/admin/alerts", label: "Alerts", icon: "⚠", badge: 3 },
  { href: "/admin/reports", label: "Reports", icon: "▤" },
  { href: "/admin/documents", label: "Documents", icon: "📄" },
  { href: "/admin/settings", label: "Settings", icon: "⚙" },
  { href: "/admin/audit", label: "Audit History", icon: "◎" },
];

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div className="flex items-center gap-2.5 border-b border-white/10 px-4 py-4 sm:gap-3 sm:px-5 sm:py-5">
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
            Master Admin
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-3 sm:px-3 sm:py-4">
        {navItems.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center justify-between rounded-xl px-2.5 py-2 text-[13px] font-medium transition sm:px-3 sm:text-sm ${
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
                <span className="ml-1 shrink-0 rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-bold">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3 sm:p-4">
        <div className="rounded-2xl bg-white/10 p-3">
          <p className="text-sm font-semibold">Ops Support</p>
          <p className="mt-1 text-[11px] text-white/75">24/7 command desk</p>
          <p className="mt-2 text-sm font-semibold text-[#D6F1F1]">
            (800) 555-0199
          </p>
        </div>
        <Link
          href="/"
          onClick={onNavigate}
          className="mt-3 block text-center text-xs font-semibold text-white/70 hover:text-white"
        >
          ← Back to website
        </Link>
      </div>
    </>
  );
}

function MobileDrawer({
  open,
  onClose,
  titleId,
}: {
  open: boolean;
  onClose: () => void;
  titleId: string;
}) {
  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/45"
        aria-label="Close menu"
        onClick={onClose}
      />
      <aside className="absolute inset-y-0 left-0 flex w-[min(18rem,88vw)] flex-col bg-[#0D2B4D] text-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <p id={titleId} className="text-sm font-semibold">
            Master Admin menu
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/20 px-3 py-1.5 text-sm font-semibold"
          >
            Close
          </button>
        </div>
        <SidebarNav onNavigate={onClose} />
      </aside>
    </div>,
    document.body,
  );
}

export default function AdminShell({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  const pathname = usePathname();
  const titleId = useId();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => setMounted(true), []);
  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-[#F2F4F7] text-[#0D2B4D]">
      <div className="flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col bg-[#0D2B4D] text-white lg:flex lg:w-64">
          <SidebarNav />
        </aside>

        {mounted ? (
          <MobileDrawer open={menuOpen} onClose={closeMenu} titleId={titleId} />
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-2 px-3 py-2.5 sm:px-6 sm:py-3">
              <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold shadow-sm lg:hidden"
                  aria-label="Open admin menu"
                  aria-expanded={menuOpen}
                  onClick={openMenu}
                >
                  <span aria-hidden>☰</span>
                  <span>Menu</span>
                </button>
                <div className="min-w-0">
                  <p className="truncate font-[family-name:var(--font-playfair)] text-base font-semibold sm:text-xl">
                    {title || "Master Admin"}
                  </p>
                  <p className="truncate text-[11px] text-slate-500 sm:text-xs">
                    Kivara command center
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href="/admin/alerts"
                  className="relative flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-sm"
                  aria-label="Alerts"
                >
                  🔔
                  <span className="absolute -right-0.5 -top-0.5 rounded-full bg-[#0FA3A3] px-1.5 text-[10px] font-bold text-white">
                    3
                  </span>
                </Link>
                <div className="flex items-center gap-2 rounded-full border border-slate-200 py-1 pl-1 pr-1 sm:pr-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D6F1F1] text-xs font-bold">
                    SR
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold leading-none">
                      Sam Rivera
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">Ops Manager</p>
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
