"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import ProtectedRoute from "../../components/auth/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import JobCard from "@/components/dashboard/JobCard";

import { auth, db } from "@/lib/firebase";
import { getJobs } from "@/lib/jobService";
import { getNotifications } from "@/lib/notificationService";

import { Job } from "@/types/job";
import { Notification } from "@/types/notification";

export default function ProfessionalDashboard() {
  const [fullName, setFullName] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setFullName("");
        setNotifications([]);
        return;
      }

      try {
        // Load professional profile
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFullName(userData.fullName || "");
        }

        // Load available jobs
        const jobsData = await getJobs();
        setJobs(jobsData);

        // Load notifications
        const notificationData = await getNotifications(user.uid);
        setNotifications(notificationData);
      } catch (error) {
        console.error("Unable to load professional dashboard:", error);
      }
    });

    return () => unsubscribe();
  }, []);

  const unreadNotifications = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <ProtectedRoute>
      <DashboardLayout>
        {/* Welcome Banner */}
        <header className="bg-[#0D2B4D] text-white rounded-3xl shadow-lg p-8">
          <p className="text-teal-300 text-lg">
            👋 Good Afternoon
          </p>

          <h1 className="text-4xl font-bold mt-2">
            Welcome back, {fullName || "Professional"}
          </h1>

          <p className="text-slate-300 mt-3">
            Ready to find your next healthcare opportunity?
          </p>
        </header>

        {/* Work Ready */}
        <section className="mt-8 space-y-6">
          <div className="bg-white rounded-2xl shadow p-6 border-l-8 border-green-500">
            <h2 className="text-2xl font-bold text-green-700">
              🟢 Work Ready
            </h2>

            <p className="text-gray-600 mt-2">
              Your profile is ready for healthcare opportunities.
            </p>

            <div className="mt-6 space-y-2">
              <p>✅ Profile Complete</p>
              <p>✅ Resume Uploaded</p>
              <p>✅ License Verified</p>
              <p>✅ Background Check</p>
              <p>⚠️ BLS Renewal Due in 30 Days</p>
            </div>
          </div>

          {/* Unread Notifications */}
          {unreadNotifications > 0 && (
            <Link href="/notifications">
              <div className="bg-yellow-50 border-l-8 border-yellow-500 rounded-2xl shadow p-6 hover:shadow-xl transition cursor-pointer">
                <h2 className="text-2xl font-bold text-yellow-700">
                  🔔 Notifications
                </h2>

                <p className="text-gray-700 mt-3">
                  You have{" "}
                  <span className="font-bold">
                    {unreadNotifications}
                  </span>{" "}
                  unread notification
                  {unreadNotifications > 1 ? "s" : ""}.
                </p>

                <p className="mt-4 text-[#0D2B4D] font-semibold">
                  View Notifications →
                </p>
              </div>
            </Link>
          )}

          {/* Dashboard Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Available Jobs */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-bold mb-4">
                📋 Available Jobs
              </h2>

              {jobs.length === 0 ? (
                <p className="text-gray-600">
                  No jobs available.
                </p>
              ) : (
                <div className="space-y-6">
                  {jobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Upcoming Shifts */}
            <Link href="/professional/shifts">
              <div className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition cursor-pointer h-full">
                <h2 className="text-xl font-bold mb-2">
                  📅 Upcoming Shifts
                </h2>

                <p className="text-gray-600">
                  View your scheduled shifts.
                </p>

                <p className="text-[#0D2B4D] font-semibold mt-4">
                  View Shifts →
                </p>
              </div>
            </Link>

            {/* Messages */}
            <Link href="/messages">
              <div className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition cursor-pointer h-full">
                <h2 className="text-xl font-bold mb-2">
                  💬 Messages
                </h2>

                <p className="text-gray-600">
                  Communicate with healthcare facilities.
                </p>

                <p className="text-[#0D2B4D] font-semibold mt-4">
                  Open Messages →
                </p>
              </div>
            </Link>

            {/* Applications */}
            <Link href="/professional/applications">
              <div className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition cursor-pointer h-full">
                <h2 className="text-xl font-bold mb-2">
                  📄 Applications
                </h2>

                <p className="text-gray-600">
                  Track your submitted applications.
                </p>

                <p className="text-[#0D2B4D] font-semibold mt-4">
                  View Applications →
                </p>
              </div>
            </Link>

            {/* My Profile */}
            <Link href="/professional/profile">
              <div className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition cursor-pointer h-full">
                <h2 className="text-xl font-bold mb-2">
                  👤 My Profile
                </h2>

                <p className="text-gray-600">
                  Update your profile and credentials.
                </p>

                <p className="text-[#0D2B4D] font-semibold mt-4">
                  View Profile →
                </p>
              </div>
            </Link>

            {/* Notifications */}
            <Link href="/notifications">
              <div className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition cursor-pointer h-full">
                <h2 className="text-xl font-bold mb-2">
                  🔔 Notifications
                </h2>

                {unreadNotifications > 0 ? (
                  <p className="text-gray-600">
                    You have{" "}
                    <span className="font-bold text-teal-700">
                      {unreadNotifications}
                    </span>{" "}
                    unread notification
                    {unreadNotifications > 1 ? "s" : ""}.
                  </p>
                ) : (
                  <p className="text-gray-600">
                    You're all caught up.
                  </p>
                )}

                <p className="text-[#0D2B4D] font-semibold mt-4">
                  View Notifications →
                </p>
              </div>
            </Link>
          </div>
        </section>
      </DashboardLayout>
    </ProtectedRoute>
  );
}