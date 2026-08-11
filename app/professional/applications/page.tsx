"use client";

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

type Application = {
  id: string;
  jobTitle?: string;
  facilityName?: string;
  professionalEmail?: string;
  status?: string;
};

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (!user) {
          setApplications([]);
          setLoading(false);
          return;
        }

        try {
          const q = query(
            collection(db, "applications"),
            where(
              "professionalId",
              "==",
              user.uid
            )
          );

          const snapshot = await getDocs(q);

          const data: Application[] =
            snapshot.docs.map((applicationDoc) => ({
              id: applicationDoc.id,
              ...(applicationDoc.data() as Omit<
                Application,
                "id"
              >),
            }));

          setApplications(data);
        } catch (error) {
          console.error(
            "Unable to load applications:",
            error
          );
        } finally {
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const getStatusClasses = (status?: string) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-700 border-green-200";

      case "Declined":
        return "bg-red-100 text-red-700 border-red-200";

      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <header className="bg-[#0D2B4D] text-white rounded-3xl shadow-lg p-8">
        <p className="text-[#D6F1F1] text-sm font-semibold uppercase tracking-wide">
          Career Activity
        </p>

        <h1 className="text-4xl font-bold mt-2">
          My Applications
        </h1>

        <p className="text-slate-300 mt-2 text-lg">
          Track the status of your healthcare job applications.
        </p>
      </header>

      {/* Applications */}
      <section className="mt-8">
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#0FA3A3]">
                Application Center
              </p>

              <h2 className="text-2xl font-bold text-[#0D2B4D] mt-1">
                Your Applications
              </h2>

              <p className="text-gray-600 mt-1">
                Review applications you've submitted to healthcare facilities.
              </p>
            </div>

            {applications.length > 0 && (
              <span className="rounded-full bg-[#D6F1F1] px-4 py-2 text-sm font-bold text-[#0D2B4D]">
                {applications.length}{" "}
                {applications.length === 1
                  ? "application"
                  : "applications"}
              </span>
            )}
          </div>

          {/* Loading */}
          {loading ? (
            <div className="rounded-2xl bg-[#F2F4F7] p-10 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#0FA3A3]" />

              <p className="text-gray-600 mt-4">
                Loading your applications...
              </p>
            </div>
          ) : applications.length === 0 ? (
            /* Empty State */
            <div className="rounded-2xl border border-dashed border-slate-300 bg-[#F2F4F7] p-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#D6F1F1] text-3xl">
                📄
              </div>

              <h3 className="text-xl font-bold text-[#0D2B4D] mt-5">
                No applications submitted
              </h3>

              <p className="text-gray-600 mt-2 max-w-md mx-auto">
                Apply for a healthcare job to see your applications and their status here.
              </p>
            </div>
          ) : (
            /* Application List */
            <div className="space-y-4">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-md transition"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-[#0FA3A3]">
                        Job Application
                      </p>

                      <h3 className="text-2xl font-bold text-[#0D2B4D] mt-1">
                        {application.jobTitle ||
                          "Healthcare Opportunity"}
                      </h3>

                      <div className="mt-4 space-y-2 text-gray-600">
                        <p>
                          🏥{" "}
                          <span className="font-semibold text-[#0D2B4D]">
                            Facility:
                          </span>{" "}
                          {application.facilityName ||
                            "Facility information unavailable"}
                        </p>

                        {application.professionalEmail && (
                          <p>
                            📧{" "}
                            <span className="font-semibold text-[#0D2B4D]">
                              Contact:
                            </span>{" "}
                            {application.professionalEmail}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <span
                        className={`inline-flex rounded-full border px-4 py-2 font-semibold ${getStatusClasses(
                          application.status
                        )}`}
                      >
                        {application.status ||
                          "Pending"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-200 pt-4">
                    <p className="text-sm text-gray-500">
                      Application status
                    </p>

                    <p className="font-semibold text-[#0D2B4D] mt-1">
                      {application.status ||
                        "Pending review"}
                    </p>
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