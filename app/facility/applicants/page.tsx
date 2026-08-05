"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
export default function ApplicantsPage() {
const [applications, setApplications] = useState<any[]>([]); 
  useEffect(() => {
  const loadApplications = async () => {
    const snapshot = await getDocs(collection(db, "applications"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setApplications(data);
  };

  loadApplications();
}, []);
return (
    <DashboardLayout>

      <header className="bg-[#0D2B4D] text-white rounded-3xl shadow-lg p-8">

        <h1 className="text-4xl font-bold">
          Job Applicants
        </h1>

        <p className="text-slate-300 mt-2">
          Review professionals who have applied for your job postings.
        </p>

      </header>

      <section className="mt-8">

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-2xl font-bold mb-6">
            Applications
          </h2>

          {applications.length === 0 ? (

  <div className="border rounded-xl p-6">

    <h3 className="text-xl font-bold">
      No applications yet
    </h3>

    <p className="text-gray-600 mt-2">
      Applications from healthcare professionals will appear here.
    </p>

  </div>

) : (

  <div className="space-y-4">

    {applications.map((application: any) => (

      <div
        key={application.id}
        className="border rounded-xl p-6 bg-slate-50"
      >

        <h3 className="text-xl font-bold">
          {application.jobTitle}
        </h3>

        <p className="mt-2">
          🏥 {application.facilityName}
        </p>

        <p>
          👤 Professional ID: {application.professionalId}
        </p>

        <p className="text-yellow-600 font-semibold mt-2">
          Status: {application.status}
        </p>

      </div>

    ))}

  </div>

)}
        </div>

      </section>

    </DashboardLayout>
  );
}