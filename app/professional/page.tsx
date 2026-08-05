"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import JobCard from "@/components/dashboard/JobCard";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

export default function ProfessionalDashboard() {
  const [fullName, setFullName] = useState("");
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      // Load logged-in user
      const user = auth.currentUser;

      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
          setFullName(userDoc.data().fullName);
        }
      }

      // Load jobs
      const jobsSnapshot = await getDocs(collection(db, "jobs"));

      const jobsData = jobsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setJobs(jobsData);
    };

    loadData();
  }, []);

  return (
    <DashboardLayout>
      <header className="bg-[#0D2B4D] text-white rounded-3xl shadow-lg p-8">

  <p className="text-teal-300 text-lg">
    Good Afternoon 👋
  </p>

  <h1 className="text-4xl font-bold mt-2">
    Welcome back, {fullName || "Professional"}
  </h1>

  <p className="text-slate-300 mt-3">
    Ready to find your next healthcare opportunity?
  </p>

</header>
       

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

  <div className="grid md:grid-cols-2 gap-6"></div>
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
              {jobs.map((job: any) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-2">
            📅 Upcoming Shifts
          </h2>

          <p className="text-gray-600">
            View your scheduled shifts.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-2">
            💬 Messages
          </h2>

          <p className="text-gray-600">
            Communicate with healthcare facilities.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-2">
            📄 Applications
          </h2>

          <p className="text-gray-600">
            Track your submitted applications.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-2">
            👤 My Profile
          </h2>

          <p className="text-gray-600">
            Update your profile and credentials.
          </p>
        </div>
      
      </section>
    </DashboardLayout>
  );
}