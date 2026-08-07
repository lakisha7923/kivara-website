"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { createShift } from "@/lib/shiftService";

import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function AssignShiftPage() {
  const params = useParams();
  const router = useRouter();

  const professionalId = params.professionalId as string;

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [department, setDepartment] = useState("");
  const [notes, setNotes] = useState("");

  const [facilityName, setFacilityName] = useState("");
  const [professionalName, setProfessionalName] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const user = auth.currentUser;

      if (!user) return;

      // Load facility information
      const facilityDoc = await getDoc(doc(db, "users", user.uid));

      if (facilityDoc.exists()) {
        const data = facilityDoc.data();
        setFacilityName(
          data.facilityName || data.organizationName || data.fullName || ""
        );
      }

      // Load professional information
      const professionalDoc = await getDoc(
        doc(db, "users", professionalId)
      );

      if (professionalDoc.exists()) {
        const data = professionalDoc.data();
        setProfessionalName(data.fullName || "");
      }
    };

    loadData();
  }, [professionalId]);

  const handleAssignShift = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("You must be logged in.");
        return;
      }

      await createShift({
        facilityId: user.uid,
        facilityName,

        professionalId,
        professionalName,

        date,
        startTime,
        endTime,

        department,
        notes,

        status: "Scheduled",
      });

      alert("Shift assigned successfully!");

      router.push("/facility/applicants");
    } catch (error) {
      console.error(error);
      alert("Unable to assign shift.");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-8">

        <h1 className="text-3xl font-bold mb-8">
          📅 Assign Shift
        </h1>

        <div className="space-y-6">

          <input
            type="date"
            className="w-full border rounded-lg p-3"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="time"
            className="w-full border rounded-lg p-3"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />

          <input
            type="time"
            className="w-full border rounded-lg p-3"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />

          <input
            type="text"
            placeholder="Department"
            className="w-full border rounded-lg p-3"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />

          <textarea
            placeholder="Notes"
            rows={4}
            className="w-full border rounded-lg p-3"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <button
            onClick={handleAssignShift}
            className="w-full bg-[#0D2B4D] text-white py-3 rounded-lg hover:bg-[#123b66]"
          >
            📅 Assign Shift
          </button>

        </div>
      </div>
    </DashboardLayout>
  );
}