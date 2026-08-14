"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
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

type ApplicantProfileProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function ApplicantProfile({
  params,
}: ApplicantProfileProps) {
  const { id } = use(params);

  const [profile, setProfile] =
    useState<ProfessionalProfile | null>(null);

  const [loading, setLoading] = useState(true);
  const [savingCredential, setSavingCredential] =
    useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const snapshot = await getDoc(
          doc(db, "users", id)
        );

        if (snapshot.exists()) {
          setProfile(
            snapshot.data() as ProfessionalProfile
          );
        }
      } catch (error) {
        console.error(
          "Unable to load professional profile:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [id]);

  const updateCredentialStatus = async (
    field:
      | "licenseStatus"
      | "backgroundCheckStatus"
      | "cprStatus",
    status: CredentialStatus
  ) => {
    if (!profile) return;

    const user = auth.currentUser;

    if (!user) {
      alert("Please log in first.");
      return;
    }

    try {
      setSavingCredential(field);

      await updateDoc(doc(db, "users", id), {
        [field]: status,
      });

      setProfile({
        ...profile,
        [field]: status,
      });

      alert(
        status === "Verified"
          ? "Credential marked as verified."
          : "Credential returned to pending."
      );
    } catch (error) {
      console.error(
        "Unable to update credential status:",
        error
      );

      alert(
        "Unable to update credential status."
      );
    } finally {
      setSavingCredential(null);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="bg-white rounded-2xl shadow-md p-10 text-center">
          <div className="text-3xl">⏳</div>

          <h2 className="text-2xl font-bold text-[#0D2B4D] mt-4">
            Loading Profile...
          </h2>

          <p className="text-gray-600 mt-2">
            Retrieving professional information.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="bg-white rounded-2xl shadow-md p-10 text-center">
          <div className="text-3xl">👤</div>

          <h2 className="text-2xl font-bold text-[#0D2B4D] mt-4">
            Profile Not Found
          </h2>

          <p className="text-gray-600 mt-2">
            This professional profile could not be found.
          </p>

          <Link
            href="/facility/applicants"
            className="inline-block mt-6 bg-[#0D2B4D] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#123B66] transition"
          >
            ← Back to Applicants
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const hasLicense =
    profile.licenseNumber?.trim() !== "";

  const hasExperience =
    profile.experience?.trim() !== "";

  const hasSpecialty =
    profile.specialty?.trim() !== "";

  const hasSummary =
    profile.summary?.trim() !== "";

  const hasResume =
    profile.resumeUrl?.trim() !== "";

  const licenseStatus =
    profile.licenseStatus || "Not Submitted";

  const backgroundCheckStatus =
    profile.backgroundCheckStatus ||
    "Not Submitted";

  const cprStatus =
    profile.cprStatus || "Not Submitted";

  const credentialStatuses = [
    licenseStatus,
    backgroundCheckStatus,
    cprStatus,
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
    licenseStatus === "Verified" &&
    backgroundCheckStatus === "Verified" &&
    cprStatus === "Verified";

  const getStatusClasses = (
    status: CredentialStatus
  ) => {
    if (status === "Verified") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Pending") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-slate-100 text-slate-600";
  };

  const getStatusIcon = (
    status: CredentialStatus
  ) => {
    if (status === "Verified") {
      return "✅";
    }

    if (status === "Pending") {
      return "⏳";
    }

    return "⚪";
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <header className="bg-[#0D2B4D] text-white rounded-3xl shadow-lg p-8">
        <p className="text-[#D6F1F1] text-sm font-semibold uppercase tracking-wide">
          Candidate Review
        </p>

        <h1 className="text-4xl font-bold mt-2">
          Professional Profile
        </h1>

        <p className="text-slate-300 mt-2 text-lg">
          Review this healthcare professional's
          qualifications and credentials.
        </p>
      </header>

      {/* Profile */}
      <section className="mt-8 grid lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-28 h-28 rounded-full bg-[#D6F1F1] flex items-center justify-center text-4xl text-[#0D2B4D] font-bold overflow-hidden">
              {profile.photoUrl ? (
                <img
                  src={profile.photoUrl}
                  alt={profile.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                profile.fullName
                  ?.charAt(0)
                  .toUpperCase() || "P"
              )}
            </div>

            <h2 className="text-2xl font-bold text-[#0D2B4D] mt-5">
              {profile.fullName ||
                "Healthcare Professional"}
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

            <p className="text-gray-500 mt-4">
              📍{" "}
              {profile.location ||
                "Location not provided"}
            </p>
          </div>

          {/* Credential Status */}
          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#0FA3A3]">
              Credential Status
            </p>

            <div
              className={`mt-3 rounded-xl p-5 ${
                workReady
                  ? "bg-green-50"
                  : pendingCredentials > 0
                  ? "bg-yellow-50"
                  : "bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {workReady
                    ? "🟢"
                    : pendingCredentials > 0
                    ? "🟡"
                    : "⚪"}
                </span>

                <div>
                  <h3
                    className={`text-xl font-bold ${
                      workReady
                        ? "text-green-700"
                        : pendingCredentials > 0
                        ? "text-yellow-700"
                        : "text-slate-600"
                    }`}
                  >
                    {workReady
                      ? "Work Ready"
                      : pendingCredentials > 0
                      ? "Verification Pending"
                      : "Credentials Not Submitted"}
                  </h3>

                  <p className="text-sm text-gray-600 mt-1">
                    {verifiedCredentials} of 3
                    credentials verified.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Resume */}
          {hasResume && (
            <div className="mt-6">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-[#0FA3A3] text-white px-5 py-3 rounded-xl font-semibold hover:bg-[#0D9292] transition"
              >
                📄 View Resume
              </a>
            </div>
          )}

          <Link
            href="/facility/applicants"
            className="block w-full text-center mt-3 border border-[#0D2B4D] text-[#0D2B4D] px-5 py-3 rounded-xl font-semibold hover:bg-slate-50 transition"
          >
            ← Back to Applicants
          </Link>
        </div>

        {/* Professional Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Professional Information */}
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#0FA3A3]">
              Professional Information
            </p>

            <h2 className="text-2xl font-bold text-[#0D2B4D] mt-1">
              Qualifications
            </h2>

            <div className="grid md:grid-cols-2 gap-5 mt-6">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-gray-500">
                  Professional Title
                </p>

                <p className="font-semibold text-[#0D2B4D] mt-1">
                  {profile.title ||
                    "Not provided"}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-gray-500">
                  Specialty
                </p>

                <p className="font-semibold text-[#0D2B4D] mt-1">
                  {profile.specialty ||
                    "Not provided"}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-gray-500">
                  Experience
                </p>

                <p className="font-semibold text-[#0D2B4D] mt-1">
                  {profile.experience ||
                    "Not provided"}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-gray-500">
                  License Number
                </p>

                <p className="font-semibold text-[#0D2B4D] mt-1">
                  {hasLicense
                    ? profile.licenseNumber
                    : "Not provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Credential Verification */}
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#0FA3A3]">
              Credential Review
            </p>

            <h2 className="text-2xl font-bold text-[#0D2B4D] mt-1">
              Verify Credentials
            </h2>

            <p className="text-gray-600 mt-2">
              Review the professional's submitted
              credentials and update their verification
              status.
            </p>

            <div className="space-y-4 mt-6">
              {/* License */}
              <div className="border rounded-xl p-5 bg-slate-50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        🪪
                      </span>

                      <div>
                        <h3 className="text-lg font-bold text-[#0D2B4D]">
                          Professional License
                        </h3>

                        <p className="text-sm text-gray-500">
                          License Number:{" "}
                          {hasLicense
                            ? profile.licenseNumber
                            : "Not provided"}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-semibold ${getStatusClasses(
                        licenseStatus
                      )}`}
                    >
                      {getStatusIcon(
                        licenseStatus
                      )}{" "}
                      {licenseStatus}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {licenseStatus !==
                      "Verified" && (
                      <button
                        onClick={() =>
                          updateCredentialStatus(
                            "licenseStatus",
                            "Verified"
                          )
                        }
                        disabled={
                          savingCredential ===
                          "licenseStatus"
                        }
                        className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-60"
                      >
                        {savingCredential ===
                        "licenseStatus"
                          ? "Saving..."
                          : "✓ Verify"}
                      </button>
                    )}

                    {licenseStatus ===
                      "Verified" && (
                      <button
                        onClick={() =>
                          updateCredentialStatus(
                            "licenseStatus",
                            "Pending"
                          )
                        }
                        disabled={
                          savingCredential ===
                          "licenseStatus"
                        }
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 disabled:opacity-60"
                      >
                        {savingCredential ===
                        "licenseStatus"
                          ? "Saving..."
                          : "Return to Pending"}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Background Check */}
              <div className="border rounded-xl p-5 bg-slate-50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        🛡️
                      </span>

                      <div>
                        <h3 className="text-lg font-bold text-[#0D2B4D]">
                          Background Check
                        </h3>

                        <p className="text-sm text-gray-500">
                          Background screening
                        </p>
                      </div>
                    </div>

                    <span
                      className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-semibold ${getStatusClasses(
                        backgroundCheckStatus
                      )}`}
                    >
                      {getStatusIcon(
                        backgroundCheckStatus
                      )}{" "}
                      {backgroundCheckStatus}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {backgroundCheckStatus !==
                      "Verified" && (
                      <button
                        onClick={() =>
                          updateCredentialStatus(
                            "backgroundCheckStatus",
                            "Verified"
                          )
                        }
                        disabled={
                          savingCredential ===
                          "backgroundCheckStatus"
                        }
                        className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-60"
                      >
                        {savingCredential ===
                        "backgroundCheckStatus"
                          ? "Saving..."
                          : "✓ Verify"}
                      </button>
                    )}

                    {backgroundCheckStatus ===
                      "Verified" && (
                      <button
                        onClick={() =>
                          updateCredentialStatus(
                            "backgroundCheckStatus",
                            "Pending"
                          )
                        }
                        disabled={
                          savingCredential ===
                          "backgroundCheckStatus"
                        }
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 disabled:opacity-60"
                      >
                        {savingCredential ===
                        "backgroundCheckStatus"
                          ? "Saving..."
                          : "Return to Pending"}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* CPR / BLS */}
              <div className="border rounded-xl p-5 bg-slate-50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        ❤️
                      </span>

                      <div>
                        <h3 className="text-lg font-bold text-[#0D2B4D]">
                          CPR / BLS
                        </h3>

                        <p className="text-sm text-gray-500">
                          CPR or BLS certification
                        </p>
                      </div>
                    </div>

                    <span
                      className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-semibold ${getStatusClasses(
                        cprStatus
                      )}`}
                    >
                      {getStatusIcon(cprStatus)}{" "}
                      {cprStatus}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {cprStatus !==
                      "Verified" && (
                      <button
                        onClick={() =>
                          updateCredentialStatus(
                            "cprStatus",
                            "Verified"
                          )
                        }
                        disabled={
                          savingCredential ===
                          "cprStatus"
                        }
                        className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-60"
                      >
                        {savingCredential ===
                        "cprStatus"
                          ? "Saving..."
                          : "✓ Verify"}
                      </button>
                    )}

                    {cprStatus ===
                      "Verified" && (
                      <button
                        onClick={() =>
                          updateCredentialStatus(
                            "cprStatus",
                            "Pending"
                          )
                        }
                        disabled={
                          savingCredential ===
                          "cprStatus"
                        }
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 disabled:opacity-60"
                      >
                        {savingCredential ===
                        "cprStatus"
                          ? "Saving..."
                          : "Return to Pending"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#0FA3A3]">
              About the Professional
            </p>

            <h2 className="text-2xl font-bold text-[#0D2B4D] mt-1">
              Professional Summary
            </h2>

            <p className="text-gray-600 leading-7 mt-5 whitespace-pre-line">
              {hasSummary
                ? profile.summary
                : "No professional summary available."}
            </p>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#0FA3A3]">
              Contact
            </p>

            <h2 className="text-2xl font-bold text-[#0D2B4D] mt-1">
              Professional Contact
            </h2>

            <div className="grid md:grid-cols-2 gap-5 mt-6">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-gray-500">
                  Email
                </p>

                <p className="font-semibold text-[#0D2B4D] mt-1 break-all">
                  {profile.email ||
                    "Not provided"}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-gray-500">
                  Phone
                </p>

                <p className="font-semibold text-[#0D2B4D] mt-1">
                  {profile.phone ||
                    "Not provided"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}