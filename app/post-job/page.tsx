"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { auth, db } from "@/lib/firebase";

export default function PostJobPage() {
  const [facilityName, setFacilityName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [shift, setShift] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [description, setDescription] = useState("");
  const [posting, setPosting] = useState(false);

  const handlePostJob = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to post a job.");
      return;
    }

    if (
      !facilityName.trim() ||
      !jobTitle.trim() ||
      !location.trim() ||
      !specialty.trim() ||
      !shift.trim() ||
      !hourlyRate.trim() ||
      !description.trim()
    ) {
      alert("Please complete all fields before posting the job.");
      return;
    }

    try {
      setPosting(true);

      await addDoc(collection(db, "jobs"), {
        // Facility ownership
        facilityId: user.uid,
        facilityName: facilityName.trim(),

        // Job information
        jobTitle: jobTitle.trim(),
        location: location.trim(),
        specialty: specialty.trim(),
        shift: shift.trim(),
        hourlyRate: hourlyRate.trim(),
        description: description.trim(),

        // Timestamp
        createdAt: serverTimestamp(),
      });

      alert("Job posted successfully!");

      // Clear form
      setFacilityName("");
      setJobTitle("");
      setLocation("");
      setSpecialty("");
      setShift("");
      setHourlyRate("");
      setDescription("");
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Unable to post job.");
    } finally {
      setPosting(false);
    }
  };

  return (
    <DashboardLayout>
      <header className="bg-[#0D2B4D] text-white rounded-3xl shadow-lg p-8">
        <p className="text-[#D6F1F1] text-sm font-semibold uppercase tracking-wide">
          Staffing
        </p>

        <h1 className="text-4xl font-bold mt-2">
          Post a New Job
        </h1>

        <p className="text-slate-300 mt-3">
          Create a healthcare opportunity for qualified professionals.
        </p>
      </header>

      <section className="mt-8">
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <h2 className="text-2xl font-bold text-[#0D2B4D] mb-6">
            Job Information
          </h2>

          <div className="space-y-6">
            <input
              type="text"
              placeholder="Facility Name"
              value={facilityName}
              onChange={(e) => setFacilityName(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#0FA3A3]"
            />

            <input
              type="text"
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#0FA3A3]"
            />

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#0FA3A3]"
            />

            <input
              type="text"
              placeholder="Specialty"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#0FA3A3]"
            />

            <input
              type="text"
              placeholder="Shift (Day/Night)"
              value={shift}
              onChange={(e) => setShift(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#0FA3A3]"
            />

            <input
              type="number"
              placeholder="Hourly Rate"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#0FA3A3]"
            />

            <textarea
              placeholder="Job Description"
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#0FA3A3]"
            />

            <button
              type="button"
              onClick={handlePostJob}
              disabled={posting}
              className="w-full bg-[#0FA3A3] text-white py-4 rounded-xl font-semibold hover:bg-[#0D9292] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {posting ? "Posting Job..." : "Post Job"}
            </button>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}