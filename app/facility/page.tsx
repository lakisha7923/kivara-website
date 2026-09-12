"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { auth, db } from "@/lib/firebase";

export default function FacilityDashboard() {
  const [jobCount, setJobCount] = useState(0);
  const [applicantCount, setApplicantCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (!user) {
          setJobCount(0);
          setApplicantCount(0);
          setLoading(false);
          return;
        }

        try {
          // Load jobs belonging to this facility
          const jobsQuery = query(
            collection(db, "jobs"),
            where("facilityId", "==", user.uid)
          );

          const jobsSnapshot = await getDocs(
            jobsQuery
          );

          setJobCount(jobsSnapshot.size);

          // Load applications belonging to this facility
          const applicationsQuery = query(
            collection(db, "applications"),
            where("facilityId", "==", user.uid)
          );

          const applicationsSnapshot =
            await getDocs(applicationsQuery);

          setApplicantCount(
            applicationsSnapshot.size
          );
        } catch (error) {
          console.error(
            "Unable to load facility dashboard:",
            error
          );
        } finally {
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <DashboardLayout>
      {/* ------------------------------------------------ */}
      {/* Welcome Banner */}
      {/* ------------------------------------------------ */}

      <header className="bg-[#0D2B4D] text-white rounded-3xl shadow-lg p-8">
        <p className="text-[#D6F1F1] text-sm font-semibold uppercase tracking-wide">
          Facility Dashboard
        </p>

        <h1 className="text-4xl font-bold mt-2">
          Welcome Back
        </h1>

        <p className="text-slate-300 mt-3 text-lg">
          Manage your healthcare staffing in one place.
        </p>
      </header>

      {/* ------------------------------------------------ */}
      {/* Stats */}
      {/* ------------------------------------------------ */}

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        {/* Jobs */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <div className="flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D6F1F1] text-xl">
              💼
            </span>

            <span className="text-sm font-semibold text-[#0FA3A3]">
              Staffing
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-5">
            Posted Jobs
          </p>

          <h2 className="text-4xl font-bold text-[#0D2B4D] mt-1">
            {loading ? "—" : jobCount}
          </h2>

          <Link
            href="/post-job"
            className="inline-block mt-4 text-[#0FA3A3] font-semibold hover:underline"
          >
            Manage Jobs →
          </Link>
        </div>

        {/* Applicants */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <div className="flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D6F1F1] text-xl">
              👥
            </span>

            <span className="text-sm font-semibold text-[#0FA3A3]">
              Candidates
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-5">
            Applications
          </p>

          <h2 className="text-4xl font-bold text-[#0D2B4D] mt-1">
            {loading ? "—" : applicantCount}
          </h2>

          <Link
            href="/facility/applicants"
            className="inline-block mt-4 text-[#0FA3A3] font-semibold hover:underline"
          >
            View Applicants →
          </Link>
        </div>

        {/* Shifts */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <div className="flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D6F1F1] text-xl">
              📅
            </span>

            <span className="text-sm font-semibold text-[#0FA3A3]">
              Scheduling
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-5">
            Shift Management
          </p>

          <h2 className="text-xl font-bold text-[#0D2B4D] mt-2">
            Manage Schedule
          </h2>

          <Link
            href="/facility/shifts"
            className="inline-block mt-4 text-[#0FA3A3] font-semibold hover:underline"
          >
            View Shifts →
          </Link>
        </div>

        {/* Messages */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <div className="flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D6F1F1] text-xl">
              💬
            </span>

            <span className="text-sm font-semibold text-[#0FA3A3]">
              Communication
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-5">
            Messages
          </p>

          <h2 className="text-xl font-bold text-[#0D2B4D] mt-2">
            Stay Connected
          </h2>

          <Link
            href="/messages"
            className="inline-block mt-4 text-[#0FA3A3] font-semibold hover:underline"
          >
            Open Messages →
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------ */}
      {/* Main Dashboard */}
      {/* ------------------------------------------------ */}

      <section className="grid lg:grid-cols-2 gap-6 mt-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#0FA3A3]">
            Quick Actions
          </p>

          <h2 className="text-2xl font-bold text-[#0D2B4D] mt-1 mb-6">
            Manage Your Staffing
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/post-job"
              className="rounded-xl bg-[#0FA3A3] text-white p-5 text-center font-semibold hover:bg-[#0D9292] transition"
            >
              <div className="text-2xl">➕</div>

              <p className="mt-2">
                Post New Job
              </p>
            </Link>

            <Link
              href="/facility/applicants"
              className="rounded-xl bg-[#0D2B4D] text-white p-5 text-center font-semibold hover:bg-[#123B66] transition"
            >
              <div className="text-2xl">👥</div>

              <p className="mt-2">
                View Applicants
              </p>
            </Link>

            <Link
              href="/facility/shifts"
              className="rounded-xl border border-slate-200 p-5 text-center font-semibold text-[#0D2B4D] hover:border-[#0FA3A3] hover:bg-[#D6F1F1] transition"
            >
              <div className="text-2xl">📅</div>

              <p className="mt-2">
                Manage Shifts
              </p>
            </Link>

            <Link
              href="/messages"
              className="rounded-xl border border-slate-200 p-5 text-center font-semibold text-[#0D2B4D] hover:border-[#0FA3A3] hover:bg-[#D6F1F1] transition"
            >
              <div className="text-2xl">💬</div>

              <p className="mt-2">
                Messages
              </p>
            </Link>
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#0FA3A3]">
            Facility Workspace
          </p>

          <h2 className="text-2xl font-bold text-[#0D2B4D] mt-1">
            Build Your Staffing Pipeline
          </h2>

          <p className="text-gray-600 mt-2">
            Use Kivara to post positions, review applicants,
            schedule professionals, and communicate with your
            staffing team.
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex gap-4 rounded-xl bg-[#D6F1F1] p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
                1
              </span>

              <div>
                <p className="font-bold text-[#0D2B4D]">
                  Post a position
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  Create a healthcare opportunity for qualified professionals.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-xl bg-[#F2F4F7] p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
                2
              </span>

              <div>
                <p className="font-bold text-[#0D2B4D]">
                  Review applicants
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  Review professionals who apply to your positions.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-xl bg-[#F2F4F7] p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
                3
              </span>

              <div>
                <p className="font-bold text-[#0D2B4D]">
                  Schedule coverage
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  Assign qualified professionals to upcoming shifts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ */}
      {/* Current Status */}
      {/* ------------------------------------------------ */}

      <section className="mt-6 pb-8">
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#0FA3A3]">
            Current Status
          </p>

          <h2 className="text-2xl font-bold text-[#0D2B4D] mt-1">
            Staffing Overview
          </h2>

          <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-[#F2F4F7] p-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#D6F1F1] text-2xl">
              📊
            </div>

            <h3 className="text-lg font-bold text-[#0D2B4D] mt-4">
              More facility insights coming soon
            </h3>

            <p className="text-gray-600 mt-2 max-w-lg mx-auto">
              Detailed staffing trends, interview activity,
              coverage metrics, and workforce analytics will
              appear here as those features are connected.
            </p>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}