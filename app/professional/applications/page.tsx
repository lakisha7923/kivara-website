"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    const loadApplications = async () => {
      const user = auth.currentUser;

      if (!user) return;

      const q = query(
        collection(db, "applications"),
        where("professionalId", "==", user.uid)
      );

      const snapshot = await getDocs(q);

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
          My Applications
        </h1>

        <p className="text-slate-300 mt-2">
          Track the status of your healthcare job applications.
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
                No applications submitted
              </h3>

              <p className="text-gray-600 mt-2">
                Apply for a job to see your applications here.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {applications.map((application: any) => (

                <div
                  key={application.id}
                  className="border rounded-xl p-6 bg-slate-50"
                >

                  <h3 className="text-2xl font-bold text-[#0D2B4D]">
                    {application.jobTitle}
                  </h3>

                  <p className="mt-3">
                    🏥 {application.facilityName}
                  </p>

                  <p>
                    📧 {application.professionalEmail}
                  </p>

                  <div className="mt-5">

                    <span
                      className={`px-4 py-2 rounded-full font-semibold ${
                        application.status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : application.status === "Declined"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {application.status}
                    </span>

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