"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { use } from "react";

export default function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [job, setJob] = useState<any>(null);
  useEffect(() => {
  const loadJob = async () => {
    const jobDoc = await getDoc(doc(db, "jobs", id));
    if (jobDoc.exists()) {
      setJob({
        id: jobDoc.id,
        ...jobDoc.data(),
      });
    }
  };

  loadJob();
}, [id]);
  if (!job) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-xl">Loading job...</p>
    </main>
  );
}
return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-[#0D2B4D]">
          Job Details
        </h1>

        <p className="mt-2 text-gray-500">
          Job ID: {id}
        </p>

        <hr className="my-8" />

        <h2 className="text-2xl font-bold">
  {job.jobTitle}
</h2>

        <p className="mt-4">
  🏥 {job.facilityName}
</p>

        <p>
  📍 {job.location}
</p>

        <p>
  🩺 {job.specialty}
</p>

        <p>
  🕒 {job.shift}
</p>

        <p className="mt-4 text-2xl font-bold text-teal-600">
  ${job.hourlyRate}/hr
</p>

        <div className="mt-8">

          <h3 className="text-xl font-bold mb-3">
            Job Description
          </h3>

          <p className="text-gray-700 leading-8">
  {job.description}
</p>

        </div>

        <button className="mt-10 bg-teal-500 text-white px-8 py-4 rounded-xl hover:bg-teal-600">
          Apply Now
        </button>

      </div>

    </main>
  );
}