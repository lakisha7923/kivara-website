"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ProfessionalProfile } from "@/types/profile";

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

  const credentialItems = [
    hasLicense,
    hasExperience,
    hasSpecialty,
    hasResume,
  ];

  const completedCredentials =
    credentialItems.filter(Boolean).length;

  const workReady =
    hasLicense &&
    hasExperience &&
    hasSpecialty;

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
          qualifications and experience.
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
              {profile.fullName || "Healthcare Professional"}
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
  📍 {profile.location || "Location not provided"}
</p>
          </div>

          {/* Work Ready */}
          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#0FA3A3]">
              Credential Status
            </p>

            <div
              className={`mt-3 rounded-xl p-5 ${
                workReady
                  ? "bg-green-50"
                  : "bg-yellow-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {workReady ? "🟢" : "🟡"}
                </span>

                <div>
                  <h3
                    className={`text-xl font-bold ${
                      workReady
                        ? "text-green-700"
                        : "text-yellow-700"
                    }`}
                  >
                    {workReady
                      ? "Work Ready"
                      : "Profile Incomplete"}
                  </h3>

                  <p className="text-sm text-gray-600 mt-1">
                    {completedCredentials} of{" "}
                    {credentialItems.length} credential
                    items provided.
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
                  License
                </p>

                <p className="font-semibold text-[#0D2B4D] mt-1">
                  {hasLicense
                    ? profile.licenseNumber
                    : "Not provided"}
                </p>
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