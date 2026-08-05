"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ProfessionalDashboard() {
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const user = auth.currentUser;

      if (!user) return;

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        setFullName(userDoc.data().fullName);
      }
    };

    loadUser();
  }, []);

  return (
    <DashboardLayout>
      <header className="bg-[#0D2B4D] text-white p-6 rounded-2xl shadow">
        <h1 className="text-3xl font-bold">
          Welcome back, {fullName || "Professional"} 👋
        </h1>

        <p className="text-slate-300 mt-1">
          Professional Dashboard
        </p>
      </header>

      <section className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-2">
            📋 Available Jobs
          </h2>

          <p className="text-gray-600">
            Browse healthcare jobs near you.
          </p>
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