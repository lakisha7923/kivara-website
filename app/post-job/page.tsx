"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function PostJobPage() {
  const [facilityName, setFacilityName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [shift, setShift] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [description, setDescription] = useState("");
const handlePostJob = async () => {
  try {
    await addDoc(collection(db, "jobs"), {
      facilityName,
      jobTitle,
      location,
      specialty,
      shift,
      hourlyRate,
      description,
      createdAt: new Date(),
    });

    alert("Job posted successfully!");

  } catch (error: any) {
    alert(error.message);
  }
};
  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8">

        <h1 className="text-3xl font-bold text-[#0D2B4D] mb-8">
          Post a New Job
        </h1>

        <form className="space-y-6">

          <input
            type="text"
            placeholder="Facility Name"
            value={facilityName}
            onChange={(e) => setFacilityName(e.target.value)}
            className="w-full border rounded-xl px-5 py-4"
          />

          <input
            type="text"
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full border rounded-xl px-5 py-4"
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded-xl px-5 py-4"
          />

          <input
            type="text"
            placeholder="Specialty"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="w-full border rounded-xl px-5 py-4"
          />

          <input
            type="text"
            placeholder="Shift (Day/Night)"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            className="w-full border rounded-xl px-5 py-4"
          />

          <input
            type="number"
            placeholder="Hourly Rate"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            className="w-full border rounded-xl px-5 py-4"
          />

          <textarea
            placeholder="Job Description"
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-xl px-5 py-4"
          />

          <button
  type="button"
  onClick={handlePostJob}
  className="w-full bg-teal-500 text-white py-4 rounded-xl hover:bg-teal-600"
>
  Post Job
</button>

        </form>

      </div>
    </main>
  );
}