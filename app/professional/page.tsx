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
        setJobs([]);
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
        console.error(
          "Unable to load professional dashboard:",
          error
        );
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
        {/* ------------------------------------------------ */}
        {/* Welcome Header */}
        {/* ------------------------------------------------ */}

        <header className="bg-[#0D2B4D] text-white rounded-3xl shadow-lg p-8">
          <p className="text-[#D6F1F1] text-sm font-semibold uppercase tracking-wide">
            Professional Dashboard
          </p>

          <h1 className="text-4xl font-bold mt-2">
            Welcome back, {fullName || "Professional"}
          </h1>

          <p className="text-slate-300 mt-3 text-lg">
            Stay ready for your next healthcare opportunity.
          </p>
        </header>

        {/* ------------------------------------------------ */}
        {/* Work Ready */}
        {/* ------------------------------------------------ */}

        <section className="mt-8">
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">
                    ✓
                  </span>

                  <div>
                    <h2 className="text-2xl font-bold text-[#0D2B4D]">
                      Work Ready
                    </h2>

                    <p className="text-gray-600 mt-1">
                      Your profile is ready for healthcare opportunities.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/professional/profile"
                className="inline-flex items-center justify-center rounded-lg bg-[#0FA3A3] px-5 py-3 font-semibold text-white hover:bg-[#0c8f8f] transition"
              >
                View Profile
              </Link>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="rounded-xl bg-[#D6F1F1] p-4">
                <p className="font-semibold text-[#0D2B4D]">
                  ✓ Profile Complete
                </p>
              </div>

              <div className="rounded-xl bg-[#D6F1F1] p-4">
                <p className="font-semibold text-[#0D2B4D]">
                  ✓ Resume Uploaded
                </p>
              </div>

              <div className="rounded-xl bg-[#D6F1F1] p-4">
                <p className="font-semibold text-[#0D2B4D]">
                  ✓ License Verified
                </p>
              </div>

              <div className="rounded-xl bg-[#D6F1F1] p-4">
                <p className="font-semibold text-[#0D2B4D]">
                  ✓ Background Check
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-4">
              <p className="font-semibold text-amber-800">
                ⚠ BLS Renewal Due in 30 Days
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ */}
        {/* Action Needed */}
        {/* ------------------------------------------------ */}

        <section className="mt-6">
          <Link href="/notifications">
            <div
              className={`rounded-2xl shadow-md p-6 border transition hover:shadow-lg ${
                unreadNotifications > 0
                  ? "bg-[#D6F1F1] border-[#0FA3A3]"
                  : "bg-white border-slate-100"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-[#0FA3A3]">
                    Action Needed
                  </p>

                  <h2 className="text-2xl font-bold text-[#0D2B4D] mt-1">
                    {unreadNotifications > 0
                      ? `You have ${unreadNotifications} unread ${
                          unreadNotifications === 1
                            ? "notification"
                            : "notifications"
                        }`
                      : "You're all caught up"}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    {unreadNotifications > 0
                      ? "Review your latest application, message, or shift updates."
                      : "There are no new notifications requiring your attention."}
                  </p>
                </div>

                <span className="inline-flex items-center justify-center rounded-lg bg-[#0D2B4D] text-white px-5 py-3 font-semibold">
                  View Notifications →
                </span>
              </div>
            </div>
          </Link>
        </section>

        {/* ------------------------------------------------ */}
        {/* Upcoming Shift + Available Shifts */}
        {/* ------------------------------------------------ */}

        <section className="mt-6 grid lg:grid-cols-2 gap-6">
          {/* Upcoming Shift */}

          <Link href="/professional/shifts">
            <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 h-full hover:shadow-lg transition">
              <p className="text-sm font-semibold uppercase tracking-wide text-[#0FA3A3]">
                Upcoming Shift
              </p>

              <h2 className="text-2xl font-bold text-[#0D2B4D] mt-2">
                📅 Scheduled Shifts
              </h2>

              <p className="text-gray-600 mt-3">
                View your upcoming healthcare shifts and schedule.
              </p>

              <div className="mt-6 rounded-xl bg-[#D6F1F1] p-5">
                <p className="font-semibold text-[#0D2B4D]">
                  View your schedule
                </p>

                <p className="text-gray-600 mt-1">
                  Check dates, times, departments, and shift details.
                </p>
              </div>

              <p className="mt-5 text-[#0FA3A3] font-bold">
                View Shifts →
              </p>
            </div>
          </Link>

          {/* Available Shifts / Jobs */}

          <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#0FA3A3]">
              Available Shifts
            </p>

            <h2 className="text-2xl font-bold text-[#0D2B4D] mt-2">
              📋 Available Opportunities
            </h2>

            <p className="text-gray-600 mt-2 mb-6">
              Find healthcare opportunities that match your availability.
            </p>

            {jobs.length === 0 ? (
              <div className="rounded-xl bg-[#F2F4F7] p-5">
                <p className="font-semibold text-[#0D2B4D]">
                  No jobs available right now.
                </p>

                <p className="text-gray-600 mt-1">
                  Check back soon for new opportunities.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.slice(0, 3).map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                  />
                ))}

                {jobs.length > 3 && (
                  <p className="text-sm text-gray-500 pt-2">
                    Showing the latest 3 opportunities.
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ------------------------------------------------ */}
        {/* Hours & Pay */}
        {/* ------------------------------------------------ */}

        <section className="mt-6">
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#0FA3A3]">
              Hours & Pay
            </p>

            <h2 className="text-2xl font-bold text-[#0D2B4D] mt-2">
              💰 Track Your Work
            </h2>

            <p className="text-gray-600 mt-2">
              Your hours and earnings summary will appear here as shift
              and pay tracking is added to your account.
            </p>

            <div className="mt-5 rounded-xl bg-[#F2F4F7] p-5">
              <p className="font-semibold text-[#0D2B4D]">
                Hours & earnings tracking
              </p>

              <p className="text-gray-600 mt-1">
                No earnings data is available yet.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ */}
        {/* Quick Actions */}
        {/* ------------------------------------------------ */}

        <section className="mt-6 pb-8">
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#0FA3A3]">
              Quick Actions
            </p>

            <h2 className="text-2xl font-bold text-[#0D2B4D] mt-2 mb-6">
              Get Where You Need to Go
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/professional/applications"
                className="rounded-xl border border-slate-200 p-5 hover:border-[#0FA3A3] hover:bg-[#D6F1F1] transition"
              >
                <div className="text-2xl">📄</div>

                <h3 className="font-bold text-[#0D2B4D] mt-3">
                  Applications
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  Track your submitted applications.
                </p>
              </Link>

              <Link
                href="/messages"
                className="rounded-xl border border-slate-200 p-5 hover:border-[#0FA3A3] hover:bg-[#D6F1F1] transition"
              >
                <div className="text-2xl">💬</div>

                <h3 className="font-bold text-[#0D2B4D] mt-3">
                  Messages
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  Communicate with healthcare facilities.
                </p>
              </Link>

              <Link
                href="/professional/profile"
                className="rounded-xl border border-slate-200 p-5 hover:border-[#0FA3A3] hover:bg-[#D6F1F1] transition"
              >
                <div className="text-2xl">👤</div>

                <h3 className="font-bold text-[#0D2B4D] mt-3">
                  My Profile
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  Update your profile and credentials.
                </p>
              </Link>

              <Link
                href="/notifications"
                className="rounded-xl border border-slate-200 p-5 hover:border-[#0FA3A3] hover:bg-[#D6F1F1] transition"
              >
                <div className="text-2xl">🔔</div>

                <h3 className="font-bold text-[#0D2B4D] mt-3">
                  Notifications
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  {unreadNotifications > 0
                    ? `${unreadNotifications} unread notification${
                        unreadNotifications > 1 ? "s" : ""
                      }`
                    : "You're all caught up."}
                </p>
              </Link>
            </div>
          </div>
        </section>
      </DashboardLayout>
    </ProtectedRoute>
  );
}