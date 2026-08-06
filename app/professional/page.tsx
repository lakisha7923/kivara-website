"use client";
import Link from "next/link";
import ProtectedRoute from "../../components/auth/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import JobCard from "@/components/dashboard/JobCard";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { getJobs } from "@/lib/jobService";
import { Job } from "@/types/job";
import {
  doc,
  getDoc,
} from "firebase/firestore";

 

export default function ProfessionalDashboard() {
  const [fullName, setFullName] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  useEffect(() => {
    const loadData = async () => {
      const user = auth.currentUser;

      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
          setFullName(userDoc.data().fullName);
        }
      }

      const jobsData = await getJobs();
setJobs(jobsData);
    };

    loadData();
  }, []);

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

        {/* Work Ready Card */}

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

              <p>⚠ BLS Renewal Due in 30 Days</p>

            </div>

          </div>

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

  <div className="bg-white rounded-2xl shadow p-6">

    <h2 className="text-xl font-bold mb-2">
      📅 Upcoming Shifts
    </h2>

    <p className="text-gray-600">
      View your scheduled shifts.
    </p>

  </div>

  {/* Messages */}

  <div className="bg-white rounded-2xl shadow p-6">

    <h2 className="text-xl font-bold mb-2">
      💬 Messages
    </h2>

    <p className="text-gray-600">
      Communicate with healthcare facilities.
    </p>

  </div>

  {/* Applications */}

  <Link href="/professional/applications">
    <div className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition cursor-pointer">

      <h2 className="text-xl font-bold mb-2">
        📄 Applications
      </h2>

      <p className="text-gray-600">
        Track your submitted applications.
      </p>

    </div>
  </Link>

  {/* My Profile */}

  <Link href="/professional/profile">
    <div className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition cursor-pointer">

      <h2 className="text-xl font-bold mb-2">
        👤 My Profile
      </h2>

      <p className="text-gray-600">
        Update your profile and credentials.
      </p>

    </div>
  </Link>

</div>

                </section>

      </DashboardLayout>
    </ProtectedRoute>
  );
}