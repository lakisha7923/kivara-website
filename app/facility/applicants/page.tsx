"use client";
import { auth } from "@/lib/firebase";
import { createOrGetConversation } from "@/lib/conversationService";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { getApplications } from "@/lib/applicationService";
import { Application } from "@/types/application";

import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function ApplicantsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
const router = useRouter();
  // Load all applications
  const loadApplications = async () => {
    const data = await getApplications();
    setApplications(data);
  };

  useEffect(() => {
    loadApplications();
  }, []);

  // Update application status
  const startConversation = async (application: Application) => {
  try {
    const user = auth.currentUser;

    if (!user) return;

    const conversationId = await createOrGetConversation(
      user.uid,
      application.professionalId,
      "Facility",
      application.professionalName
    );

    router.push(`/messages/${conversationId}`);
  } catch (error) {
    console.error(error);
    alert("Unable to start conversation.");
  }
};
  const updateStatus = async (
    applicationId: string,
    status: "Accepted" | "Declined"
  ) => {
    try {
      await updateDoc(doc(db, "applications", applicationId), {
        status,
      });

      alert(`Application ${status}!`);

      // Refresh the list
      await loadApplications();
    } catch (error) {
      console.error(error);
      alert("Unable to update application.");
    }
  };

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
            <div className="space-y-6">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="border rounded-xl p-6 bg-slate-50"
                >
                  <h3 className="text-2xl font-bold text-[#0D2B4D]">
                    👤 {application.professionalName || "Unknown Applicant"}
                  </h3>

                  <p className="mt-3">
                    📧 {application.professionalEmail || "No email"}
                  </p>

                  <p>
                    💼 {application.jobTitle}
                  </p>

                  <p>
                    🏥 {application.facilityName}
                  </p>

                  <div className="mt-4">
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

                  <div className="mt-6 flex gap-3">
                    <Link
                      href={`/facility/applicants/${application.professionalId}`}
                      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                    >
                      View Profile
                    </Link>

                    <button
                      onClick={() =>
                        updateStatus(application.id, "Accepted")
                      }
                      className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
                    >
                      Accept
                    </button>
<button
  onClick={() => startConversation(application)}
  className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
>
  💬 Message
</button>
                    <button
                      onClick={() =>
                        updateStatus(application.id, "Declined")
                      }
                      className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
                    >
                      Decline
                    </button>
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