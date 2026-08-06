"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

export default function FacilityDashboard() {
  const [jobCount, setJobCount] = useState(0);
const [applicantCount, setApplicantCount] = useState(0);
  useEffect(() => {
  const loadDashboardData = async () => {
    try {
      const jobsSnapshot = await getDocs(collection(db, "jobs"));
      setJobCount(jobsSnapshot.size);

      const applicationsSnapshot = await getDocs(
        collection(db, "applications")
      );
      setApplicantCount(applicationsSnapshot.size);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };

  loadDashboardData();
}, []);
return (
    <DashboardLayout>

      {/* Welcome Banner */}

      <header className="bg-[#0D2B4D] text-white rounded-3xl shadow-lg p-8">

        <p className="text-teal-300 text-lg">
          🏥 Welcome Back
        </p>

        <h1 className="text-4xl font-bold mt-2">
          Facility Dashboard
        </h1>

        <p className="text-slate-300 mt-3">
          Manage your healthcare staffing in one place.
        </p>

      </header>

      {/* Stats */}

<section className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

  <div className="bg-white rounded-2xl shadow p-6">
    <p className="text-gray-500">Open Jobs</p>

    <h2 className="text-4xl font-bold text-[#0D2B4D] mt-2">
      {jobCount}
    </h2>
  </div>

  <div className="bg-white rounded-2xl shadow p-6">
    <p className="text-gray-500">Applicants</p>

    <h2 className="text-4xl font-bold text-green-600 mt-2">
      {applicantCount}
    </h2>
  </div>

  <div className="bg-white rounded-2xl shadow p-6">
    <p className="text-gray-500">Messages</p>

    <h2 className="text-4xl font-bold text-blue-600 mt-2">
      4
    </h2>
  </div>

  <div className="bg-white rounded-2xl shadow p-6">
    <p className="text-gray-500">Active Staff</p>

    <h2 className="text-4xl font-bold text-purple-600 mt-2">
      36
    </h2>
  </div>

</section>

      {/* Main Dashboard */}

      <section className="grid lg:grid-cols-2 gap-6 mt-8">

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-2xl font-bold mb-6">
            ⚡ Quick Actions
          </h2>

          <div className="space-y-4">

            <Link
  href="/post-job"
  className="block w-full bg-teal-500 text-white p-4 rounded-xl rounded-xl hover:bg-teal-600 text-center"
>
  ➕ Post New Job
</Link>

            <Link
  href="/facility/applicants"
  className="block w-full bg-[#0D2B4D] text-white p-4 rounded-xl hover:bg-[#133b68] text-center"
>
  👥 View Applicants
</Link>

            <button className="w-full bg-slate-700 text-white p-4 rounded-xl hover:bg-slate-800">
              📅 Manage Shifts
            </button>

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-2xl font-bold mb-6">
            📈 Recent Activity
          </h2>

          <div className="space-y-4">

            <div className="border-l-4 border-green-500 pl-4">
              ✔ Sarah Johnson applied for ICU RN
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              ✔ Michael Brown accepted offer
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              ✔ New RN position posted
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              ✔ Two interviews scheduled
            </div>

          </div>

        </div>

      </section>

    </DashboardLayout>
  );
}