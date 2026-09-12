"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { auth } from "@/lib/firebase";

import {
  getNotifications,
  markNotificationAsRead,
} from "@/lib/notificationService";

import { Notification } from "@/types/notification";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  const loadNotifications = async (
    user: typeof auth.currentUser
  ) => {
    if (!user) {
      setNotifications([]);
      return;
    }

    try {
      const data = await getNotifications(user.uid);
      setNotifications(data);
    } catch (error) {
      console.error(
        "Unable to load notifications:",
        error
      );
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setCurrentUser(user);

        if (user) {
          loadNotifications(user);
        } else {
          setNotifications([]);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const handleRead = async (id: string) => {
    try {
      await markNotificationAsRead(id);

      if (currentUser) {
        await loadNotifications(currentUser);
      }
    } catch (error) {
      console.error(
        "Unable to mark notification as read:",
        error
      );
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <DashboardLayout>
      {/* Header */}
      <header className="bg-[#0D2B4D] text-white rounded-3xl shadow-lg p-8">
        <p className="text-[#D6F1F1] text-sm font-semibold uppercase tracking-wide">
          Updates & Alerts
        </p>

        <h1 className="text-4xl font-bold mt-2">
          🔔 Notifications
        </h1>

        <p className="text-slate-300 mt-2 text-lg">
          Stay updated on your applications, messages, and shifts.
        </p>
      </header>

      {/* Notification Content */}
      <section className="mt-8">
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          {/* Section heading */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#0FA3A3]">
                Notification Center
              </p>

              <h2 className="text-2xl font-bold text-[#0D2B4D] mt-1">
                Your Updates
              </h2>

              <p className="text-gray-600 mt-1">
                Review important updates about your Kivara activity.
              </p>
            </div>

            {notifications.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#D6F1F1] px-4 py-2 text-sm font-semibold text-[#0D2B4D]">
                  {notifications.length}{" "}
                  {notifications.length === 1
                    ? "notification"
                    : "notifications"}
                </span>

                {unreadCount > 0 && (
                  <span className="rounded-full bg-[#0FA3A3] px-4 py-2 text-sm font-bold text-white">
                    {unreadCount} unread
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Empty State */}
          {notifications.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-[#F2F4F7] p-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#D6F1F1] text-3xl">
                🔔
              </div>

              <h3 className="text-xl font-bold text-[#0D2B4D] mt-5">
                No notifications yet
              </h3>

              <p className="text-gray-600 mt-2 max-w-md mx-auto">
                Updates about applications, messages, and scheduled shifts
                will appear here.
              </p>
            </div>
          ) : (
            /* Notification List */
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`rounded-2xl border p-5 transition ${
                    notification.read
                      ? "bg-white border-slate-200"
                      : "bg-[#D6F1F1] border-[#0FA3A3] shadow-sm"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                    {/* Notification information */}
                    <div className="flex gap-4">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg ${
                          notification.read
                            ? "bg-[#F2F4F7]"
                            : "bg-[#0FA3A3] text-white"
                        }`}
                      >
                        {notification.read ? "✓" : "!"}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-bold text-[#0D2B4D]">
                            {notification.title}
                          </h3>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              notification.read
                                ? "bg-[#F2F4F7] text-gray-600"
                                : "bg-white text-[#0FA3A3]"
                            }`}
                          >
                            {notification.read
                              ? "Read"
                              : "Unread"}
                          </span>
                        </div>

                        <p className="text-gray-600 mt-2 leading-relaxed">
                          {notification.message}
                        </p>
                      </div>
                    </div>

                    {/* Mark as read */}
                    {!notification.read && (
                      <button
                        onClick={() =>
                          handleRead(notification.id)
                        }
                        className="shrink-0 rounded-lg bg-[#0D2B4D] px-4 py-2.5 font-semibold text-white hover:bg-[#123B66] transition focus:outline-none focus:ring-2 focus:ring-[#0FA3A3] focus:ring-offset-2"
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
}