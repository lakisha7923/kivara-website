"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

export default function Sidebar() {
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState(0);

  const isFacility = pathname.startsWith("/facility");

  useEffect(() => {
    let unsubscribeNotifications = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      unsubscribeNotifications();

      if (!user) {
        setUnreadCount(0);
        return;
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
            (notification) =>
              notification.data().read === false
          ).length;

          setUnreadCount(unread);
        },
        (error) => {
          console.error(
            "Unable to listen for notifications:",
            error
          );
        }
      );
    });

    return () => {
      unsubscribeNotifications();
      unsubscribeAuth();
    };
  }, []);

  return (
    <aside className="w-64 bg-[#0D2B4D] text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">
        Kivara
      </h1>

      <nav className="space-y-4">
        {/* Dashboard */}
        <Link
          href={isFacility ? "/facility" : "/professional"}
          className="block hover:text-teal-300"
        >
          🏠 Dashboard
        </Link>

        {/* Jobs */}
        {!isFacility && (
          <Link
            href="/post-job"
            className="block hover:text-teal-300"
          >
            💼 Jobs
          </Link>
        )}

        {/* Applications / Applicants */}
        <Link
          href={
            isFacility
              ? "/facility/applicants"
              : "/professional/applications"
          }
          className="block hover:text-teal-300"
        >
          📄 {isFacility ? "Applicants" : "Applications"}
        </Link>

        {/* Messages */}
        <Link
          href="/messages"
          className="block hover:text-teal-300"
        >
          💬 Messages
        </Link>

        {/* Notifications */}
        <Link
          href="/notifications"
          className="flex items-center justify-between hover:text-teal-300"
        >
          <span>🔔 Notifications</span>

          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold min-w-6 h-6 px-2 rounded-full flex items-center justify-center">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Link>

        {/* Professional Profile */}
        {!isFacility && (
          <Link
            href="/professional/profile"
            className="block hover:text-teal-300"
          >
            👤 Profile
          </Link>
        )}

        {/* Settings remains a placeholder until the page exists */}
        <Link
          href="#"
          className="block hover:text-teal-300"
        >
          ⚙️ Settings
        </Link>
      </nav>
    </aside>
  );
}