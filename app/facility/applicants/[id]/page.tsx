"use client";

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

  const [profile, setProfile] = useState<ProfessionalProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const snapshot = await getDoc(doc(db, "users", id));

        if (snapshot.exists()) {
          setProfile(snapshot.data() as ProfessionalProfile);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-8 text-2xl font-bold">
          Loading Profile...
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="p-8 text-2xl font-bold">
          Profile not found.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <header className="bg-[#0D2B4D] text-white rounded-3xl shadow-lg p-8">
        <h1 className="text-4xl font-bold">
          Professional Profile
        </h1>

        <p className="text-slate-300 mt-2">
          Review this healthcare professional.
        </p>
      </header>

      <section className="mt-8 grid lg:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl shadow p-6">

          <div className="w-32 h-32 rounded-full bg-slate-200 mx-auto"></div>

          <h2 className="text-2xl font-bold text-center mt-6">
            {profile.fullName}
          </h2>

          <p className="text-center text-gray-500">
            {profile.title || "Healthcare Professional"}
          </p>

        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">

          <h2 className="text-2xl font-bold mb-6">
            Professional Information
          </h2>

          <div className="space-y-4">

            <p><strong>Email:</strong> {profile.email || "Not provided"}</p>

            <p><strong>Phone:</strong> {profile.phone || "Not provided"}</p>

            <p><strong>Location:</strong> {profile.location || "Not provided"}</p>

            <p><strong>Specialty:</strong> {profile.specialty || "Not provided"}</p>

            <p><strong>License Number:</strong> {profile.licenseNumber || "Not provided"}</p>

            <p><strong>Experience:</strong> {profile.experience || "Not provided"}</p>

            <div className="pt-4">
              <h3 className="text-xl font-bold mb-2">
                Professional Summary
              </h3>

              <p>
                {profile.summary || "No professional summary available."}
              </p>
            </div>

          </div>

        </div>

      </section>
    </DashboardLayout>
  );
}