"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { auth, db } from "@/lib/firebase";

import { createNotification } from "@/lib/notificationService";
import { createOrGetConversation } from "@/lib/conversationService";

import { Application } from "@/types/application";

export default function ApplicantsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // --------------------------------------------------
  // Load applications belonging to this facility
  // --------------------------------------------------

  const loadApplications = async (facilityId: string) => {
    try {
      setLoading(true);

      const q = query(
        collection(db, "applications"),
        where("facilityId", "==", facilityId)
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((applicationDoc) => ({
        id: applicationDoc.id,
        ...applicationDoc.data(),
      })) as Application[];

      setApplications(data);
    } catch (error) {
      console.error(
        "Unable to load facility applications:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // Authentication
  // --------------------------------------------------

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (!user) {
          setApplications([]);
          setLoading(false);
          return;
        }

        loadApplications(user.uid);
      }
    );

    return () => unsubscribe();
  }, []);

  // --------------------------------------------------
  // Start conversation
  // --------------------------------------------------

  const startConversation = async (
    application: Application
  ) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("You must be logged in.");
        return;
      }

      const conversationId =
        await createOrGetConversation(
          user.uid,
          application.professionalId,
          "Facility",
          application.professionalName
        );

      router.push(
        `/messages/${conversationId}`
      );
    } catch (error) {
      console.error(error);
      alert("Unable to start conversation.");
    }
  };

  // --------------------------------------------------
  // Update application status
  // --------------------------------------------------

  const updateStatus = async (
    application: Application,
    status: "Accepted" | "Declined"
  ) => {
    try {
      await updateDoc(
        doc(db, "applications", application.id),
        {
          status,
        }
      );

      await createNotification({
        userId: application.professionalId,

        title:
          status === "Accepted"
            ? "Application Accepted"
            : "Application Declined",

        message:
          status === "Accepted"
            ? `${application.facilityName} accepted your application for ${application.jobTitle}.`
            : `${application.facilityName} declined your application for ${application.jobTitle}.`,

        type: "Application",

        read: false,
      });

      alert(
        `Application ${status.toLowerCase()}!`
      );

      const user = auth.currentUser;

      if (user) {
        await loadApplications(user.uid);
      }
    } catch (error) {
      console.error(
        "Unable to update application:",
        error
      );

      alert("Unable to update application.");
    }
  };

  return (
    <DashboardLayout>
      {/* ------------------------------------------------ */}
      {/* Header */}
      {/* ------------------------------------------------ */}

      <header className="bg-[#0D2B4D] text-white rounded-3xl shadow-lg p-8">
        <p className="text-[#D6F1F1] text-sm font-semibold uppercase tracking-wide">
          Candidates
        </p>

        <h1 className="text-4xl font-bold mt-2">
          Job Applicants
        </h1>

        <p className="text-slate-300 mt-3">
          Review professionals who have applied for
          your job postings.
        </p>
      </header>

      {/* ------------------------------------------------ */}
      {/* Applications */}
      {/* ------------------------------------------------ */}

      <section className="mt-8">
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#0FA3A3]">
                Applications
              </p>

              <h2 className="text-2xl font-bold text-[#0D2B4D] mt-1">
                Your Candidates
              </h2>
            </div>

            {!loading && applications.length > 0 && (
              <div className="bg-[#D6F1F1] text-[#0D2B4D] px-4 py-2 rounded-full font-semibold">
                {applications.length}{" "}
                {applications.length === 1
                  ? "Application"
                  : "Applications"}
              </div>
            )}
          </div>

          {/* Loading */}
          {loading ? (
            <div className="border border-dashed border-slate-300 rounded-xl p-10 text-center">
              <div className="text-3xl">⏳</div>

              <h3 className="text-xl font-bold text-[#0D2B4D] mt-3">
                Loading applicants...
              </h3>

              <p className="text-gray-600 mt-2">
                Retrieving applications for your facility.
              </p>
            </div>
          ) : applications.length === 0 ? (
            /* Empty state */
            <div className="border border-dashed border-slate-300 rounded-xl p-10 text-center bg-[#F2F4F7]">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#D6F1F1] text-2xl">
                👥
              </div>

              <h3 className="text-xl font-bold text-[#0D2B4D] mt-4">
                No applications yet
              </h3>

              <p className="text-gray-600 mt-2 max-w-md mx-auto">
                Applications from healthcare professionals
                will appear here when they apply to your
                job postings.
              </p>

              <Link
                href="/post-job"
                className="inline-block mt-6 bg-[#0FA3A3] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0D9292] transition"
              >
                Post a Job
              </Link>
            </div>
          ) : (
            /* Applicant list */
            <div className="space-y-5">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="border border-slate-200 rounded-2xl p-6 bg-slate-50"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                    <div>
                      <h3 className="text-2xl font-bold text-[#0D2B4D]">
                        👤{" "}
                        {application.professionalName ||
                          "Unknown Applicant"}
                      </h3>

                      <div className="mt-4 space-y-2 text-gray-700">
                        <p>
                          📧{" "}
                          {application.professionalEmail ||
                            "No email"}
                        </p>

                        <p>
                          💼 {application.jobTitle}
                        </p>

                        <p>
                          🏥 {application.facilityName}
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <span
                        className={`inline-block px-4 py-2 rounded-full font-semibold ${
                          application.status ===
                          "Accepted"
                            ? "bg-green-100 text-green-700"
                            : application.status ===
                              "Declined"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {application.status ||
                          "Pending"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap gap-3">
                    <Link
                      href={`/facility/applicants/${application.professionalId}`}
                      className="bg-[#0D2B4D] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#123B66] transition"
                    >
                      View Profile
                    </Link>

                    {application.status !==
                      "Accepted" &&
                      application.status !==
                        "Declined" && (
                        <>
                          <button
                            onClick={() =>
                              updateStatus(
                                application,
                                "Accepted"
                              )
                            }
                            className="bg-green-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-green-700 transition"
                          >
                            ✓ Accept
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(
                                application,
                                "Declined"
                              )
                            }
                            className="bg-red-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-red-700 transition"
                          >
                            Decline
                          </button>
                        </>
                      )}

                    {application.status ===
                      "Accepted" && (
                      <>
                        <button
                          onClick={() =>
                            startConversation(
                              application
                            )
                          }
                          className="bg-[#0FA3A3] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#0D9292] transition"
                        >
                          💬 Message
                        </button>

                        <Link
                          href={`/facility/shifts/${application.professionalId}`}
                          className="bg-purple-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-purple-700 transition"
                        >
                          📅 Assign Shift
                        </Link>
                      </>
                    )}

                    {application.status ===
                      "Declined" && (
                      <span className="text-sm text-gray-500 py-2.5">
                        This application has been
                        declined.
                      </span>
                    )}
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