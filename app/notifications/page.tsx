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
    if (!user) return;

    console.log("Current User UID:", user.uid);

    const data = await getNotifications(user.uid);

    console.log("Notifications Returned:", data);

    setNotifications(data);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (user) {
        loadNotifications(user);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleRead = async (id: string) => {
    await markNotificationAsRead(id);

    if (currentUser) {
      await loadNotifications(currentUser);
    }
  };

  return (
    <DashboardLayout>
      <header className="bg-[#0D2B4D] text-white rounded-3xl shadow-lg p-8">
        <h1 className="text-4xl font-bold">
          🔔 Notifications
        </h1>

        <p className="text-slate-300 mt-2">
          Stay updated on your applications, messages, and shifts.
        </p>
      </header>

      <section className="mt-8">
        <div className="bg-white rounded-2xl shadow p-6">
          {notifications.length === 0 ? (
            <p className="text-gray-600">
              No notifications yet.
            </p>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`border rounded-xl p-5 ${
                    notification.read
                      ? "bg-white"
                      : "bg-teal-50"
                  }`}
                >
                  <h2 className="text-lg font-bold">
                    {notification.title}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    {notification.message}
                  </p>

                  <div className="mt-4 flex justify-between items-center">
                    <span
                      className={`text-sm font-semibold ${
                        notification.read
                          ? "text-gray-500"
                          : "text-teal-700"
                      }`}
                    >
                      {notification.read ? "Read" : "Unread"}
                    </span>

                    {!notification.read && (
                      <button
                        onClick={() =>
                          handleRead(notification.id)
                        }
                        className="bg-[#0D2B4D] text-white px-4 py-2 rounded-lg hover:bg-[#123b66]"
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