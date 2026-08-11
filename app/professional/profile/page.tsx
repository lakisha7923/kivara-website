"use client";

import ResumeUpload from "@/components/profile/ResumeUpload";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  CredentialStatus,
  ProfessionalProfile,
} from "@/types/profile";

export default function ProfessionalProfilePage() {
  const [profile, setProfile] = useState<
    ProfessionalProfile & {
      licenseStatus: CredentialStatus;
      backgroundCheckStatus: CredentialStatus;
      cprStatus: CredentialStatus;
    }
  >({
    fullName: "",
    title: "",
    phone: "",
    email: "",
    location: "",
    specialty: "",
    licenseNumber: "",
    experience: "",
    summary: "",
    resumeUrl: "",
    photoUrl: "",
    licenseStatus: "Not Submitted",
    backgroundCheckStatus: "Not Submitted",
    cprStatus: "Not Submitted",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const user = auth.currentUser;

      if (!user) return;

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();

          setProfile({
            fullName: data.fullName || "",
            title: data.title || "",
            phone: data.phone || "",
            email: user.email || data.email || "",
            location: data.location || "",
            specialty: data.specialty || "",
            licenseNumber: data.licenseNumber || "",
            experience: data.experience || "",
            summary: data.summary || "",
            resumeUrl: data.resumeUrl || "",
            photoUrl: data.photoUrl || "",

            licenseStatus:
              data.licenseStatus || "Not Submitted",

            backgroundCheckStatus:
              data.backgroundCheckStatus ||
              "Not Submitted",

            cprStatus:
              data.cprStatus || "Not Submitted",
          });
        }
      } catch (error) {
        console.error("Unable to load profile:", error);
      }
    };

    loadProfile();
  }, []);

  const saveProfile = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please log in first.");
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

        licenseStatus: profile.licenseStatus,
        backgroundCheckStatus:
          profile.backgroundCheckStatus,
        cprStatus: profile.cprStatus,
      });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
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
    (field) => field?.trim()
  ).length;

  const profileCompletion = Math.round(
    (completedFields / profileFields.length) * 100
  );

  const credentialStatuses = [
    profile.licenseStatus,
    profile.backgroundCheckStatus,
    profile.cprStatus,
  ];

  const verifiedCredentials =
    credentialStatuses.filter(
      (status) => status === "Verified"
    ).length;

  const pendingCredentials =
    credentialStatuses.filter(
      (status) => status === "Pending"
    ).length;

  const workReady =
    profile.licenseStatus === "Verified" &&
    profile.backgroundCheckStatus === "Verified" &&
    profile.cprStatus === "Verified";

  const updateCredentialStatus = (
    field:
      | "licenseStatus"
      | "backgroundCheckStatus"
      | "cprStatus",
    value: CredentialStatus
  ) => {
    setProfile({
      ...profile,
      [field]: value,
    });
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <header className="bg-[#0D2B4D] text-white rounded-3xl shadow-lg p-8">
        <p className="text-teal-300 text-sm font-semibold uppercase tracking-wide">
          Professional Profile
        </p>

        <h1 className="text-4xl font-bold mt-2">
          My Professional Profile
        </h1>

        <p className="text-slate-300 mt-2">
          Keep your healthcare profile up to date.
        </p>
      </header>

      {/* Profile Overview */}
      <section className="mt-8 grid lg:grid-cols-3 gap-6">
        {/* Left Profile Card */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="w-32 h-32 rounded-full bg-[#D6F1F1] mx-auto flex items-center justify-center overflow-hidden">
            {profile.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt={profile.fullName || "Profile"}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl font-bold text-[#0D2B4D]">
                {profile.fullName
                  ? profile.fullName
                      .charAt(0)
                      .toUpperCase()
                  : "P"}
              </span>
            )}
          </div>

          <h2 className="text-2xl font-bold text-center mt-6 text-[#0D2B4D]">
            {profile.fullName || "Your Name"}
          </h2>

          <p className="text-center text-gray-500">
            {profile.title ||
              "Healthcare Professional"}
          </p>

          {profile.specialty && (
            <div className="text-center mt-4">
              <span className="inline-block bg-[#D6F1F1] text-[#0D2B4D] px-4 py-2 rounded-full text-sm font-semibold">
                {profile.specialty}
              </span>
            </div>
          )}

          {profile.location && (
            <p className="text-center text-gray-500 mt-4">
              📍 {profile.location}
            </p>
          )}

          {/* Profile Completion */}
          <div className="mt-8 border-t pt-6">
            <div className="flex justify-between items-center">
              <p className="font-bold text-[#0D2B4D]">
                Profile Completion
              </p>

              <p className="font-bold text-teal-600">
                {profileCompletion}%
              </p>
            </div>

            <div className="w-full bg-slate-200 rounded-full h-3 mt-3">
              <div
                className="bg-teal-500 h-3 rounded-full transition-all"
                style={{
                  width: `${profileCompletion}%`,
                }}
              />
            </div>

            <p className="text-sm text-gray-500 mt-3">
              Complete your profile so facilities can
              better understand your qualifications.
            </p>
          </div>

          {/* Credential Summary */}
          <div className="mt-6 border-t pt-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">
              Credential Status
            </p>

            <div
              className={`mt-3 rounded-xl p-4 ${
                workReady
                  ? "bg-green-50"
                  : pendingCredentials > 0
                  ? "bg-yellow-50"
                  : "bg-slate-50"
              }`}
            >
              <p className="font-bold text-[#0D2B4D]">
                {workReady
                  ? "🟢 Work Ready"
                  : pendingCredentials > 0
                  ? "🟡 Verification Pending"
                  : "⚪ Credentials Not Submitted"}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                {verifiedCredentials} of 3 credentials
                verified.
              </p>
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold text-[#0D2B4D] mb-6">
            Professional Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              value={profile.fullName}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  fullName: e.target.value,
                })
              }
              placeholder="Full Name"
              className="border rounded-lg p-3"
            />

            <input
              value={profile.title}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  title: e.target.value,
                })
              }
              placeholder="Professional Title"
              className="border rounded-lg p-3"
            />

            <input
              value={profile.phone}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  phone: e.target.value,
                })
              }
              placeholder="Phone Number"
              className="border rounded-lg p-3"
            />

            <input
              value={profile.email}
              disabled
              className="border rounded-lg p-3 bg-gray-100"
            />

            <input
              value={profile.location}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  location: e.target.value,
                })
              }
              placeholder="Location"
              className="border rounded-lg p-3"
            />

            <input
              value={profile.specialty}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  specialty: e.target.value,
                })
              }
              placeholder="Specialty"
              className="border rounded-lg p-3"
            />

            <input
              value={profile.licenseNumber}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  licenseNumber: e.target.value,
                })
              }
              placeholder="License Number"
              className="border rounded-lg p-3"
            />

            <input
              value={profile.experience}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  experience: e.target.value,
                })
              }
              placeholder="Years of Experience"
              className="border rounded-lg p-3"
            />
          </div>

          <textarea
            value={profile.summary}
            onChange={(e) =>
              setProfile({
                ...profile,
                summary: e.target.value,
              })
            }
            placeholder="Professional Summary"
            className="border rounded-lg p-3 w-full mt-4 h-40"
          />

          {/* Credentials */}
          <div className="mt-8 border-t pt-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">
              Credentials
            </p>

            <h2 className="text-2xl font-bold text-[#0D2B4D] mt-1">
              Credential Verification
            </h2>

            <p className="text-gray-600 mt-2">
              Submit your credentials for review. A
              verified status will be assigned after
              Kivara verification.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              {/* License */}
              <div className="border rounded-xl p-5 bg-slate-50">
                <div className="text-2xl">
                  🪪
                </div>

                <h3 className="font-bold text-[#0D2B4D] mt-3">
                  License
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Professional license
                </p>

                <select
                  value={profile.licenseStatus}
                  onChange={(e) =>
                    updateCredentialStatus(
                      "licenseStatus",
                      e.target
                        .value as CredentialStatus
                    )
                  }
                  className="w-full border rounded-lg p-3 mt-4 bg-white"
                >
                  <option value="Not Submitted">
                    Not Submitted
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option
                    value="Verified"
                    disabled
                  >
                    Verified
                  </option>
                </select>

                {profile.licenseStatus ===
                  "Verified" && (
                  <p className="text-green-600 text-sm font-semibold mt-2">
                    ✓ Verified
                  </p>
                )}
              </div>

              {/* Background Check */}
              <div className="border rounded-xl p-5 bg-slate-50">
                <div className="text-2xl">
                  🛡️
                </div>

                <h3 className="font-bold text-[#0D2B4D] mt-3">
                  Background Check
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Background screening status
                </p>

                <select
                  value={
                    profile.backgroundCheckStatus
                  }
                  onChange={(e) =>
                    updateCredentialStatus(
                      "backgroundCheckStatus",
                      e.target
                        .value as CredentialStatus
                    )
                  }
                  className="w-full border rounded-lg p-3 mt-4 bg-white"
                >
                  <option value="Not Submitted">
                    Not Submitted
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option
                    value="Verified"
                    disabled
                  >
                    Verified
                  </option>
                </select>

                {profile.backgroundCheckStatus ===
                  "Verified" && (
                  <p className="text-green-600 text-sm font-semibold mt-2">
                    ✓ Verified
                  </p>
                )}
              </div>

              {/* CPR */}
              <div className="border rounded-xl p-5 bg-slate-50">
                <div className="text-2xl">
                  ❤️
                </div>

                <h3 className="font-bold text-[#0D2B4D] mt-3">
                  CPR / BLS
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  CPR or BLS certification
                </p>

                <select
                  value={profile.cprStatus}
                  onChange={(e) =>
                    updateCredentialStatus(
                      "cprStatus",
                      e.target
                        .value as CredentialStatus
                    )
                  }
                  className="w-full border rounded-lg p-3 mt-4 bg-white"
                >
                  <option value="Not Submitted">
                    Not Submitted
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option
                    value="Verified"
                    disabled
                  >
                    Verified
                  </option>
                </select>

                {profile.cprStatus ===
                  "Verified" && (
                  <p className="text-green-600 text-sm font-semibold mt-2">
                    ✓ Verified
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Save */}
          <button
            onClick={saveProfile}
            disabled={saving}
            className="mt-8 bg-[#0D2B4D] text-white px-8 py-3 rounded-xl hover:bg-[#133b68] disabled:opacity-60 transition"
          >
            {saving
              ? "Saving..."
              : "Save Profile"}
          </button>
        </div>
      </section>

      {/* Resume */}
      <section className="mt-8">
        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">
            Professional Documents
          </p>

          <h2 className="text-2xl font-bold text-[#0D2B4D] mt-1 mb-4">
            Resume
          </h2>

          <ResumeUpload />
        </div>
      </section>
    </DashboardLayout>
  );
}