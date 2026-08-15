"use client";

import Link from "next/link";
import { Job } from "@/types/job";
import { auth, db } from "@/lib/firebase";

import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";

type JobCardProps = {
  job: Job;
};

export default function JobCard({ job }: JobCardProps) {
  const isClosed = job.status === "Closed";

  const handleApply = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please log in first.");
      return;
    }

    if (isClosed) {
      alert("This job is no longer accepting applications.");
      return;
    }

    try {
      const userProfile = await getDoc(
        doc(db, "users", user.uid)
      );

      const userData = userProfile.data();

      await addDoc(collection(db, "applications"), {
        // Job
        jobId: job.id,
        jobTitle: job.jobTitle,

        // Facility
        facilityId: job.facilityId,
        facilityName: job.facilityName,

        // Professional
        professionalId: user.uid,
        professionalName: userData?.fullName || "",
        professionalEmail: user.email || "",

        // Application status
        status: "Pending",

        // Timestamp
        appliedAt: serverTimestamp(),
      });

      alert("Application submitted successfully!");
    } catch (error) {
      console.error(
        "Unable to submit application:",
        error
      );

      alert("Something went wrong.");
    }
  };

  return (
    <div className="border border-slate-100 rounded-2xl p-5 bg-white shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-[#0D2B4D]">
            {job.jobTitle}
          </h2>

          <p className="mt-2">
            🏥 {job.facilityName}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            isClosed
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {isClosed ? "Closed" : "Open"}
        </span>
      </div>

      <p className="mt-3">
        📍 {job.location}
      </p>

      <p>
        🩺 {job.specialty}
      </p>

      <p>
        🕒 {job.shift}
      </p>

      <p className="mt-2 text-teal-600 font-bold">
        💵 ${job.hourlyRate}/hr
      </p>

      <div className="mt-6 flex gap-3">
        <Link
          href={`/jobs/${job.id}`}
          className="bg-[#0D2B4D] text-white px-4 py-2 rounded-lg hover:bg-[#133b68]"
        >
          View Details
        </Link>

        {isClosed ? (
          <button
            type="button"
            disabled
            className="bg-slate-300 text-slate-600 px-4 py-2 rounded-lg cursor-not-allowed"
          >
            Applications Closed
          </button>
        ) : (
          <button
            type="button"
            onClick={handleApply}
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
          >
            Apply
          </button>
        )}
      </div>
    </div>
  );
}