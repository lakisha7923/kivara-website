"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ResumeUpload from "@/components/profile/ResumeUpload";

import { auth, db } from "@/lib/firebase";

type Profile = {
  fullName: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  specialty: string;
  licenseNumber: string;
  experience: string;
  summary: string;
};

const emptyProfile: Profile = {
  fullName: "",
  title: "",
  phone: "",
  email: "",
  location: "",
  specialty: "",
  licenseNumber: "",
  experience: "",
  summary: "",
};

export default function ProfessionalProfile() {
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (!user) {
          setProfile(emptyProfile);
          return;
        }

        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const data = userSnap.data();

            setProfile({
              fullName: data.fullName || "",
              title: data.title || "",
              phone: data.phone || "",
              email: user.email || "",
              location: data.location || "",
              specialty: data.specialty || "",
              licenseNumber: data.licenseNumber || "",
              experience: data.experience || "",
              summary: data.summary || "",
            });
          } else {
            setProfile({
              ...emptyProfile,
              email: user.email || "",
            });
          }
        } catch (error) {
          console.error(
            "Unable to load professional profile:",
            error
          );
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const updateField = (
    field: keyof Profile,
    value: string
  ) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const saveProfile = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in.");
      return;
    }

    try {
      setSaving(true);

      await updateDoc(doc(db, "users", user.uid), {
        fullName: profile.fullName,
        title: profile.title,
        phone: profile.phone,
        location: profile.location,
        specialty: profile.specialty,
        licenseNumber: profile.licenseNumber,
        experience: profile.experience,
        summary: profile.summary,
      });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error(
        "Unable to save professional profile:",
        error
      );

      alert("Unable to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const profileFields = [
    profile.fullName,
    profile.title,
    profile.phone,
    profile.location,
    profile.specialty,
    profile.licenseNumber,
    profile.experience,
    profile.summary,
  ];

  const completedFields = profileFields.filter(
    (field) => field.trim() !== ""
  ).length;

  const completionPercentage = Math.round(
    (completedFields / profileFields.length) * 100
  );

  return (
    <DashboardLayout>
      {/* Header */}
      <header className="bg-[#0D2B4D] text-white rounded-3xl shadow-lg p-8">
        <p className="text-[#D6F1F1] text-sm font-semibold uppercase tracking-wide">
          Professional Profile
        </p>

        <h1 className="text-4xl font-bold mt-2">
          My Professional Profile
        </h1>

        <p className="text-slate-300 mt-2 text-lg">
          Keep your healthcare profile up to date.
        </p>
      </header>

      {/* Profile Overview */}
      <section className="mt-8 grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-28 h-28 rounded-full bg-[#D6F1F1] flex items-center justify-center text-4xl text-[#0D2B4D] font-bold">
              {profile.fullName
                ? profile.fullName.charAt(0).toUpperCase()
                : "P"}
            </div>

            <h2 className="text-2xl font-bold text-[#0D2B4D] mt-5">
              {profile.fullName || "Your Name"}
            </h2>

            <p className="text-gray-500 mt-1">
              {profile.title ||
                "Healthcare Professional"}
            </p>

            {profile.specialty && (
              <span className="mt-4 rounded-full bg-[#D6F1F1] px-4 py-2 text-sm font-semibold text-[#0D2B4D]">
                {profile.specialty}
              </span>
            )}
          </div>

          {/* Completion */}
          <div className="mt-8 border-t border-slate-200 pt-6">
            <div className="flex items-center justify-between">
              <p className="font-bold text-[#0D2B4D]">
                Profile Completion
              </p>

              <span className="font-bold text-[#0FA3A3]">
                {completionPercentage}%
              </span>
            </div>

            <div className="mt-3 h-3 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full bg-[#0FA3A3] transition-all"
                style={{
                  width: `${completionPercentage}%`,
                }}
              />
            </div>

            <p className="text-sm text-gray-500 mt-3">
              Complete your profile so facilities can better understand your qualifications.
            </p>
          </div>

          {/* Work Ready */}
          <div className="mt-6 rounded-xl bg-[#D6F1F1] p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#0FA3A3]">
              Work Ready
            </p>

            <h3 className="text-xl font-bold text-[#0D2B4D] mt-1">
              Keep your credentials current
            </h3>

            <p className="text-gray-600 mt-2 text-sm">
              Your profile information and resume help facilities review your qualifications.
            </p>
          </div>
        </div>

        {/* Professional Information */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#0FA3A3]">
              Professional Information
            </p>

            <h2 className="text-2xl font-bold text-[#0D2B4D] mt-1">
              Your Details
            </h2>

            <p className="text-gray-600 mt-1">
              Update the information facilities will use when reviewing your profile.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-[#0D2B4D] mb-2">
                Full Name
              </label>

              <input
                value={profile.fullName}
                onChange={(e) =>
                  updateField(
                    "fullName",
                    e.target.value
                  )
                }
                placeholder="Full Name"
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-[#0FA3A3] focus:ring-2 focus:ring-[#D6F1F1]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0D2B4D] mb-2">
                Professional Title
              </label>

              <input
                value={profile.title}
                onChange={(e) =>
                  updateField(
                    "title",
                    e.target.value
                  )
                }
                placeholder="Professional Title"
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-[#0FA3A3] focus:ring-2 focus:ring-[#D6F1F1]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0D2B4D] mb-2">
                Phone Number
              </label>

              <input
                value={profile.phone}
                onChange={(e) =>
                  updateField(
                    "phone",
                    e.target.value
                  )
                }
                placeholder="Phone Number"
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-[#0FA3A3] focus:ring-2 focus:ring-[#D6F1F1]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0D2B4D] mb-2">
                Email
              </label>

              <input
                value={profile.email}
                disabled
                className="w-full rounded-xl border border-slate-200 p-3 bg-slate-100 text-gray-500 cursor-not-allowed"
              />

              <p className="text-xs text-gray-500 mt-1">
                Email is managed through your account.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0D2B4D] mb-2">
                Location
              </label>

              <input
                value={profile.location}
                onChange={(e) =>
                  updateField(
                    "location",
                    e.target.value
                  )
                }
                placeholder="City, State"
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-[#0FA3A3] focus:ring-2 focus:ring-[#D6F1F1]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0D2B4D] mb-2">
                Specialty
              </label>

              <input
                value={profile.specialty}
                onChange={(e) =>
                  updateField(
                    "specialty",
                    e.target.value
                  )
                }
                placeholder="Specialty"
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-[#0FA3A3] focus:ring-2 focus:ring-[#D6F1F1]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0D2B4D] mb-2">
                License Number
              </label>

              <input
                value={profile.licenseNumber}
                onChange={(e) =>
                  updateField(
                    "licenseNumber",
                    e.target.value
                  )
                }
                placeholder="License Number"
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-[#0FA3A3] focus:ring-2 focus:ring-[#D6F1F1]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0D2B4D] mb-2">
                Years of Experience
              </label>

              <input
                value={profile.experience}
                onChange={(e) =>
                  updateField(
                    "experience",
                    e.target.value
                  )
                }
                placeholder="Years of Experience"
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-[#0FA3A3] focus:ring-2 focus:ring-[#D6F1F1]"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="block text-sm font-semibold text-[#0D2B4D] mb-2">
              Professional Summary
            </label>

            <textarea
              value={profile.summary}
              onChange={(e) =>
                updateField(
                  "summary",
                  e.target.value
                )
              }
              placeholder="Tell healthcare facilities about your professional experience, strengths, and qualifications."
              className="w-full rounded-xl border border-slate-300 p-3 h-40 resize-y outline-none focus:border-[#0FA3A3] focus:ring-2 focus:ring-[#D6F1F1]"
            />
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={saveProfile}
              disabled={saving}
              className="rounded-xl bg-[#0D2B4D] px-8 py-3 font-semibold text-white hover:bg-[#123B66] transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : "Save Profile"}
            </button>
          </div>
        </div>
      </section>

      {/* Resume */}
      <section className="mt-6 pb-8">
        <ResumeUpload />
      </section>
    </DashboardLayout>
  );
}