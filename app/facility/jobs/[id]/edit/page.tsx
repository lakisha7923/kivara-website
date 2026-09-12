"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { auth, db } from "@/lib/firebase";
import { Job } from "@/types/job";

type EditJobPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type EditableJob = Omit<Job, "id"> & {
  status?: "Open" | "Closed";
};

export default function EditJobPage({
  params,
}: EditJobPageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [facilityName, setFacilityName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [shift, setShift] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<
    "Open" | "Closed"
  >("Open");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (!user) {
          setLoading(false);
          return;
        }

        try {
          const jobRef = doc(db, "jobs", id);
          const snapshot = await getDoc(jobRef);

          if (!snapshot.exists()) {
            alert("Job not found.");
            router.push("/facility/jobs");
            return;
          }

          const job =
            snapshot.data() as EditableJob;

          if (job.facilityId !== user.uid) {
            alert(
              "You are not authorized to edit this job."
            );

            router.push("/facility/jobs");
            return;
          }

          setFacilityName(job.facilityName || "");
          setJobTitle(job.jobTitle || "");
          setLocation(job.location || "");
          setSpecialty(job.specialty || "");
          setShift(job.shift || "");
          setHourlyRate(job.hourlyRate || "");
          setDescription(job.description || "");

          setStatus(
            job.status === "Closed"
              ? "Closed"
              : "Open"
          );

          setAuthorized(true);
        } catch (error) {
          console.error(
            "Unable to load job:",
            error
          );

          alert("Unable to load this job.");
          router.push("/facility/jobs");
        } finally {
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, [id, router]);

  const handleSaveJob = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in.");
      return;
    }

    if (!authorized) {
      alert(
        "You are not authorized to edit this job."
      );
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
      alert(
        "Please complete all fields before saving."
      );
      return;
    }

    try {
      setSaving(true);

      const jobRef = doc(db, "jobs", id);
      const snapshot = await getDoc(jobRef);

      if (!snapshot.exists()) {
        alert("Job no longer exists.");
        router.push("/facility/jobs");
        return;
      }

      const existingJob =
        snapshot.data() as EditableJob;

      if (existingJob.facilityId !== user.uid) {
        alert(
          "You are not authorized to edit this job."
        );

        router.push("/facility/jobs");
        return;
      }

      await updateDoc(jobRef, {
        facilityName: facilityName.trim(),
        jobTitle: jobTitle.trim(),
        location: location.trim(),
        specialty: specialty.trim(),
        shift: shift.trim(),
        hourlyRate: hourlyRate.trim(),
        description: description.trim(),
        status,
      });

      alert("Job updated successfully!");

      router.push("/facility/jobs");
    } catch (error) {
      console.error(
        "Unable to update job:",
        error
      );

      alert("Unable to update job.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-10 text-center">
          <div className="text-3xl">⏳</div>

          <h2 className="text-2xl font-bold text-[#0D2B4D] mt-4">
            Loading Job...
          </h2>

          <p className="text-gray-600 mt-2">
            Retrieving the job information.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  if (!authorized) {
    return (
      <DashboardLayout>
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-10 text-center">
          <div className="text-3xl">🔒</div>

          <h2 className="text-2xl font-bold text-[#0D2B4D] mt-4">
            Access Denied
          </h2>

          <p className="text-gray-600 mt-2">
            You are not authorized to edit this job.
          </p>

          <button
            type="button"
            onClick={() =>
              router.push("/facility/jobs")
            }
            className="mt-6 bg-[#0D2B4D] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#123B66] transition"
          >
            ← Back to Jobs
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <header className="bg-[#0D2B4D] text-white rounded-3xl shadow-lg p-8">
        <p className="text-[#D6F1F1] text-sm font-semibold uppercase tracking-wide">
          Staffing
        </p>

        <h1 className="text-4xl font-bold mt-2">
          Edit Job
        </h1>

        <p className="text-slate-300 mt-3">
          Update the details of your healthcare position.
        </p>
      </header>

      <section className="mt-8 pb-8">
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <h2 className="text-2xl font-bold text-[#0D2B4D] mb-6">
            Job Information
          </h2>

          <div className="space-y-6">
            <input
              type="text"
              placeholder="Facility Name"
              value={facilityName}
              onChange={(e) =>
                setFacilityName(e.target.value)
              }
              className="w-full border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#0FA3A3]"
            />

            <input
              type="text"
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) =>
                setJobTitle(e.target.value)
              }
              className="w-full border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#0FA3A3]"
            />

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              className="w-full border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#0FA3A3]"
            />

            <input
              type="text"
              placeholder="Specialty"
              value={specialty}
              onChange={(e) =>
                setSpecialty(e.target.value)
              }
              className="w-full border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#0FA3A3]"
            />

            <input
              type="text"
              placeholder="Shift"
              value={shift}
              onChange={(e) =>
                setShift(e.target.value)
              }
              className="w-full border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#0FA3A3]"
            />

            <input
              type="number"
              placeholder="Hourly Rate"
              value={hourlyRate}
              onChange={(e) =>
                setHourlyRate(e.target.value)
              }
              className="w-full border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#0FA3A3]"
            />

            <textarea
              placeholder="Job Description"
              rows={6}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#0FA3A3]"
            />

            <div>
              <label className="block text-sm font-semibold text-[#0D2B4D] mb-2">
                Job Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as
                      | "Open"
                      | "Closed"
                  )
                }
                className="w-full border border-slate-200 rounded-xl px-5 py-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#0FA3A3]"
              >
                <option value="Open">
                  Open
                </option>

                <option value="Closed">
                  Closed
                </option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleSaveJob}
                disabled={saving}
                className="flex-1 bg-[#0FA3A3] text-white py-4 rounded-xl font-semibold hover:bg-[#0D9292] transition disabled:opacity-60"
              >
                {saving
                  ? "Saving Changes..."
                  : "Save Changes"}
              </button>

              <button
                type="button"
                onClick={() =>
                  router.push("/facility/jobs")
                }
                disabled={saving}
                className="flex-1 border border-slate-300 text-[#0D2B4D] py-4 rounded-xl font-semibold hover:bg-slate-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}