"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

export default function Sidebar() {
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState(0);
  const [isFacility, setIsFacility] = useState(
    pathname.startsWith("/facility") || pathname === "/post-job"
  );

  useEffect(() => {
    let unsubscribeNotifications = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      unsubscribeNotifications();

      if (!user) {
        setUnreadCount(0);
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
        }
      } catch {
        setIsFacility(
          pathname.startsWith("/facility") || pathname === "/post-job"
        );
      }

      const notificationsQuery = query(
        collection(db, "notifications"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      unsubscribeNotifications = onSnapshot(
        notificationsQuery,
        (snapshot) => {
          const unread = snapshot.docs.filter(
            (notification) => notification.data().read === false
          ).length;

          setUnreadCount(unread);
        },
        (error) => {
          console.error("Unable to listen for notifications:", error);
        }
      );
    });

    return () => {
      unsubscribeNotifications();
      unsubscribeAuth();
    };
  }, [pathname]);

  const linkClass = (active: boolean) =>
    `block rounded-xl px-3 py-2.5 transition ${
      active
        ? "bg-white/10 text-teal-300"
        : "text-white/90 hover:bg-white/5 hover:text-teal-300"
    }`;

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col bg-[#0D2B4D] text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10 tracking-tight">Kivara</h1>

      <nav className="space-y-2">
        <Link
          href={isFacility ? "/facility" : "/professional"}
          className={linkClass(
            pathname === (isFacility ? "/facility" : "/professional")
          )}
        >
          🏠 Dashboard
        </Link>

        <Link
          href={isFacility ? "/facility/jobs" : "/professional"}
          className={linkClass(
            isFacility
              ? pathname.startsWith("/facility/jobs") ||
                  pathname === "/post-job"
              : pathname === "/professional"
          )}
        >
          💼 {isFacility ? "Open Shifts" : "Find Shifts"}
        </Link>

        <Link
          href={
            isFacility
              ? "/facility/applicants"
              : "/professional/applications"
          }
          className={linkClass(
            isFacility
              ? pathname.startsWith("/facility/applicants")
              : pathname.startsWith("/professional/applications")
          )}
        >
          📄 {isFacility ? "Applicants" : "Applications"}
        </Link>

        {!isFacility && (
          <Link
            href="/professional/shifts"
            className={linkClass(
              pathname.startsWith("/professional/shifts")
            )}
          >
            📅 My Shifts
          </Link>
        )}

        <Link
          href="/messages"
          className={linkClass(pathname.startsWith("/messages"))}
        >
          💬 Messages
        </Link>

        <Link
          href="/notifications"
          className={`${linkClass(
            pathname.startsWith("/notifications")
          )} flex items-center justify-between`}
        >
          <span>🔔 Notifications</span>

          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold min-w-6 h-6 px-2 rounded-full flex items-center justify-center">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Link>

        {!isFacility && (
          <Link
            href="/professional/profile"
            className={linkClass(
              pathname.startsWith("/professional/profile")
            )}
          >
            👤 Profile
          </Link>
        )}

        {isFacility && (
          <Link
            href="/post-job"
            className={linkClass(pathname === "/post-job")}
          >
            ➕ Post a Shift
          </Link>
        )}
      </nav>
    </aside>
  );
}
