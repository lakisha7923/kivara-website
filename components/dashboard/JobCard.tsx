import Link from "next/link";
import { Job } from "@/types/job";
import { auth, db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
type JobCardProps = {
  job: Job;
};

export default function JobCard({ job }: JobCardProps) {
  const handleApply = async () => {
  const user = auth.currentUser;

  if (!user) {
    alert("Please log in first.");
    return;
  }

  try {
const userProfile = await getDoc(doc(db, "users", user.uid));
const userData = userProfile.data();


await addDoc(collection(db, "applications"), {
  jobId: job.id,
  professionalId: user.uid,

  professionalName: userData?.fullName || "",

  professionalEmail: user.email,

  facilityName: job.facilityName,

  jobTitle: job.jobTitle,

  status: "Pending",

  appliedAt: serverTimestamp(),
});

    alert("Application submitted successfully!");
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  }
};
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-xl transition">

      <h2 className="text-xl font-bold text-[#0D2B4D]">
        {job.jobTitle}
      </h2>

      <p className="mt-2">
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

      <p className="mt-2 text-teal-600 font-bold">
        💵 ${job.hourlyRate}/hr
      </p>

      <div className="mt-6 flex gap-3">

        <Link
  href={`/jobs/${job.id}`}
  className="bg-[#0D2B4D] text-white px-4 py-2 rounded-lg hover:bg-[#133b68]"
>
  View Details
</Link>

        <button
  onClick={handleApply}
  className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
>
  Apply
</button>

      </div>

    </div>
  );
}