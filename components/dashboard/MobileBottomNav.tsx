"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

type NavItem = {
  href: string;
  label: string;
  icon: string;
  match?: (pathname: string) => boolean;
};

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [isFacility, setIsFacility] = useState(
    pathname.startsWith("/facility") || pathname === "/post-job"
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsFacility(
          pathname.startsWith("/facility") || pathname === "/post-job"
        );
        return;
      }

      try {
        const profile = await getDoc(doc(db, "users", user.uid));
        const accountType = profile.exists()
          ? profile.data().accountType
          : null;

        if (accountType === "Healthcare Facility") {
          setIsFacility(true);
        } else if (accountType === "Healthcare Professional") {
          setIsFacility(false);
        } else {
          setIsFacility(
            pathname.startsWith("/facility") || pathname === "/post-job"
          );
        }
      } catch {
        setIsFacility(
          pathname.startsWith("/facility") || pathname === "/post-job"
        );
      }
    });

    return () => unsubscribe();
  }, [pathname]);

  const facilityItems: NavItem[] = [
    {
      href: "/facility",
      label: "Home",
      icon: "🏠",
      match: (path) => path === "/facility",
    },
    {
      href: "/facility/jobs",
      label: "Shifts",
      icon: "💼",
      match: (path) =>
        path.startsWith("/facility/jobs") || path === "/post-job",
    },
    {
      href: "/facility/applicants",
      label: "People",
      icon: "👥",
      match: (path) => path.startsWith("/facility/applicants"),
    },
    {
      href: "/messages",
      label: "Chat",
      icon: "💬",
      match: (path) => path.startsWith("/messages"),
    },
    {
      href: "/notifications",
      label: "Alerts",
      icon: "🔔",
      match: (path) => path.startsWith("/notifications"),
    },
  ];

  const professionalItems: NavItem[] = [
    {
      href: "/professional",
      label: "Home",
      icon: "🏠",
      match: (path) => path === "/professional",
    },
    {
      href: "/professional/applications",
      label: "Apps",
      icon: "📄",
      match: (path) => path.startsWith("/professional/applications"),
    },
    {
      href: "/professional/shifts",
      label: "Shifts",
      icon: "📅",
      match: (path) => path.startsWith("/professional/shifts"),
    },
    {
      href: "/messages",
      label: "Chat",
      icon: "💬",
      match: (path) => path.startsWith("/messages"),
    },
    {
      href: "/professional/profile",
      label: "Profile",
      icon: "👤",
      match: (path) => path.startsWith("/professional/profile"),
    },
  ];

  const items = isFacility ? facilityItems : professionalItems;

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Primary"
    >
      <ul className="grid grid-cols-5">
        {items.map((item) => {
          const active = item.match
            ? item.match(pathname)
            : pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-semibold transition ${
                  active
                    ? "text-[#0FA3A3]"
                    : "text-slate-500 hover:text-[#0D2B4D]"
                }`}
              >
                <span className="text-lg leading-none" aria-hidden>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
