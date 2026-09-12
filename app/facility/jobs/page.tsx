"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { auth, db } from "@/lib/firebase";
import { Job, JobStatus } from "@/types/job";

export default function FacilityJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingJob, setUpdatingJob] = useState<string | null>(null);

  const loadJobs = async (userId: string) => {
    try {
      const jobsQuery = query(
        collection(db, "jobs"),
        where("facilityId", "==", userId)
      );

      const snapshot = await getDocs(jobsQuery);

      const data = snapshot.docs.map((jobDoc) => ({
        id: jobDoc.id,
        ...(jobDoc.data() as Omit<Job, "id">),
      }));

      setJobs(data);
    } catch (error) {
      console.error("Unable to load facility jobs:", error);
      alert("Unable to load your jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setJobs([]);
        setLoading(false);
        return;
      }

      await loadJobs(user.uid);
    });

    return () => unsubscribe();
  }, []);

  const updateJobStatus = async (
    jobId: string,
    status: JobStatus
  ) => {
    const confirmed = window.confirm(
      status === "Closed"
        ? "Close this job posting? Professionals will no longer be able to apply."
        : "Reopen this job posting?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setUpdatingJob(jobId);

      await updateDoc(doc(db, "jobs", jobId), {
        status,
      });

      setJobs((currentJobs) =>
        currentJobs.map((job) =>
          job.id === jobId
            ? {
                ...job,
                status,
              }
            : job
        )
      );

      alert(
        status === "Closed"
          ? "Job posting closed successfully."
          : "Job posting reopened successfully."
      );
    } catch (error) {
      console.error("Unable to update job status:", error);
      alert("Unable to update job posting.");
    } finally {
      setUpdatingJob(null);
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <header className="bg-[#0D2B4D] text-white rounded-3xl shadow-lg p-8">
        <p className="text-[#D6F1F1] text-sm font-semibold uppercase tracking-wide">
          Staffing
        </p>

        <h1 className="text-4xl font-bold mt-2">
          Manage Jobs
        </h1>

        <p className="text-slate-300 mt-3 text-lg">
          Manage the healthcare positions you have posted.
        </p>
      </header>

      {/* Actions */}
      <section className="mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#0D2B4D]">
              Your Job Postings
            </h2>

            <p className="text-gray-600 mt-1">
              {jobs.length}{" "}
              {jobs.length === 1 ? "job" : "jobs"} posted
            </p>
          </div>

          <Link
            href="/post-job"
            className="inline-flex items-center justify-center bg-[#0FA3A3] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0D9292] transition"
          >
            ➕ Post New Job
          </Link>
        </div>
      </section>

      {/* Jobs */}
      <section className="mt-6 pb-8">
        {loading ? (
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-10 text-center">
            <div className="text-3xl">⏳</div>

            <h2 className="text-2xl font-bold text-[#0D2B4D] mt-4">
              Loading Jobs...
            </h2>

            <p className="text-gray-600 mt-2">
              Retrieving your job postings.
            </p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-10 text-center">
            <div className="text-4xl">💼</div>

            <h2 className="text-2xl font-bold text-[#0D2B4D] mt-4">
              No Jobs Posted Yet
            </h2>

            <p className="text-gray-600 mt-2 max-w-md mx-auto">
              Create your first healthcare position to start
              building your staffing pipeline.
            </p>

            <Link
              href="/post-job"
              className="inline-block mt-6 bg-[#0FA3A3] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0D9292] transition"
            >
              Post Your First Job
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {jobs.map((job) => {
              const isClosed = job.status === "Closed";

              return (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl shadow-md border border-slate-100 p-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    {/* Job Information */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
                            isClosed
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {isClosed ? "Closed" : "Open Position"}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-[#0D2B4D] mt-3">
                        {job.jobTitle}
                      </h3>

                      <p className="text-gray-600 mt-2">
                        🏥 {job.facilityName}
                      </p>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
                        <div className="rounded-xl bg-[#F2F4F7] p-4">
                          <p className="text-sm text-gray-500">
                            Location
                          </p>

                          <p className="font-semibold text-[#0D2B4D] mt-1">
                            📍 {job.location}
                          </p>
                        </div>

                        <div className="rounded-xl bg-[#F2F4F7] p-4">
                          <p className="text-sm text-gray-500">
                            Specialty
                          </p>

                          <p className="font-semibold text-[#0D2B4D] mt-1">
                            🩺 {job.specialty}
                          </p>
                        </div>

                        <div className="rounded-xl bg-[#F2F4F7] p-4">
                          <p className="text-sm text-gray-500">
                            Shift
                          </p>

                          <p className="font-semibold text-[#0D2B4D] mt-1">
                            🕒 {job.shift}
                          </p>
                        </div>
                      </div>

                      <p className="text-[#0FA3A3] font-bold text-lg mt-5">
                        💵 ${job.hourlyRate}/hr
                      </p>

                      <div className="mt-5">
                        <p className="text-sm font-semibold text-[#0D2B4D]">
                          Job Description
                        </p>

                        <p className="text-gray-600 mt-2 leading-6">
                          {job.description}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="lg:w-52 flex lg:flex-col gap-3">
                      <Link
                        href={`/jobs/${job.id}`}
                        className="flex-1 text-center bg-[#0D2B4D] text-white px-5 py-3 rounded-xl font-semibold hover:bg-[#123B66] transition"
                      >
                        View Details
                      </Link>

                      <Link
                        href={`/facility/jobs/${job.id}/edit`}
                        className="flex-1 text-center border border-[#0D2B4D] text-[#0D2B4D] px-5 py-3 rounded-xl font-semibold hover:bg-slate-50 transition"
                      >
                        ✏️ Edit Job
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          updateJobStatus(
                            job.id,
                            isClosed ? "Open" : "Closed"
                          )
                        }
                        disabled={updatingJob === job.id}
                        className={`flex-1 text-center text-white px-5 py-3 rounded-xl font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed ${
                          isClosed
                            ? "bg-[#0FA3A3] hover:bg-[#0D9292]"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                      >
                        {updatingJob === job.id
                          ? "Updating..."
                          : isClosed
                          ? "Reopen Job"
                          : "Close Job"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}