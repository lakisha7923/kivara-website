"use client";

import Link from "next/link";
import { useState } from "react";

import KivaraLogo from "@/components/brand/KivaraLogo";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/facilities", label: "Facilities" },
  { href: "/register", label: "Join" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[var(--kivara-navy)] text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <KivaraLogo size={48} priority className="rounded-full bg-white p-0.5" />
          <div>
            <p className="font-display text-xl font-semibold leading-none tracking-wide">
              KIVARA
            </p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--kivara-teal)]">
              Healthcare
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/90 transition hover:text-[var(--kivara-aqua)]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="rounded-full bg-[var(--kivara-teal)] px-5 py-2 text-sm font-semibold transition hover:brightness-110"
          >
            Login
          </Link>
        </div>

        <button
          id="mobile-menu-button"
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="text-2xl leading-none">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-white/10 px-4 py-4 md:hidden"
      >
        <div className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-3 py-3 text-base font-medium hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="mt-2 rounded-full bg-[var(--kivara-teal)] px-5 py-3 text-center text-base font-semibold"
            onClick={() => setOpen(false)}
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
