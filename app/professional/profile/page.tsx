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

export default function ProfessionalProfile() {
  const [profile, setProfile] = useState<Profile>({
    fullName: "",
    title: "",
    phone: "",
    email: "",
    location: "",
    specialty: "",
    licenseNumber: "",
    experience: "",
    summary: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      const user = auth.currentUser;

      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setProfile({
          fullName: userSnap.data().fullName || "",
          title: userSnap.data().title || "",
          phone: userSnap.data().phone || "",
          email: user.email || "",
          location: userSnap.data().location || "",
          specialty: userSnap.data().specialty || "",
          licenseNumber: userSnap.data().licenseNumber || "",
          experience: userSnap.data().experience || "",
          summary: userSnap.data().summary || "",
        });
      }
    };

    loadProfile();
  }, []);

  const saveProfile = async () => {
    const user = auth.currentUser;

    if (!user) return;

    try {
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
      console.error(error);
      alert("Unable to save profile.");
    }
  };

  return (
    <DashboardLayout>
      <header className="bg-[#0D2B4D] text-white rounded-3xl shadow-lg p-8">
        <h1 className="text-4xl font-bold">
          My Professional Profile
        </h1>

        <p className="text-slate-300 mt-2">
          Keep your healthcare profile up to date.
        </p>
      </header>

      <section className="mt-8 grid lg:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl shadow p-6">

          <div className="w-32 h-32 rounded-full bg-slate-200 mx-auto"></div>

          <h2 className="text-2xl font-bold text-center mt-6">
            {profile.fullName || "Your Name"}
          </h2>

          <p className="text-center text-gray-500">
            {profile.title || "Healthcare Professional"}
          </p>

        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">

          <h2 className="text-2xl font-bold mb-6">
            Professional Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              value={profile.fullName}
              onChange={(e) =>
                setProfile({ ...profile, fullName: e.target.value })
              }
              placeholder="Full Name"
              className="border rounded-lg p-3"
            />

            <input
              value={profile.title}
              onChange={(e) =>
                setProfile({ ...profile, title: e.target.value })
              }
              placeholder="Professional Title"
              className="border rounded-lg p-3"
            />

            <input
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
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
                setProfile({ ...profile, location: e.target.value })
              }
              placeholder="Location"
              className="border rounded-lg p-3"
            />

            <input
              value={profile.specialty}
              onChange={(e) =>
                setProfile({ ...profile, specialty: e.target.value })
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

          <button
            onClick={saveProfile}
            className="mt-6 bg-[#0D2B4D] text-white px-8 py-3 rounded-xl hover:bg-[#133b68]"
          >
            Save Profile
          </button>

          <div className="mt-8">
  <ResumeUpload />
</div>

        </div>

      </section>
    </DashboardLayout>
  );
}