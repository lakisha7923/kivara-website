"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { auth } from "@/lib/firebase";
import { getProfessionalShifts } from "@/lib/shiftService";
import { Shift } from "@/types/shift";

export default function ProfessionalShiftsPage() {
  const [shifts, setShifts] = useState<Shift[]>([]);

  useEffect(() => {
    const loadShifts = async () => {
      const user = auth.currentUser;

      if (!user) return;

      const data = await getProfessionalShifts(user.uid);
      setShifts(data);
    };

    loadShifts();
  }, []);

  return (
    <DashboardLayout>
      <header className="bg-[#0D2B4D] text-white rounded-3xl shadow-lg p-8">
        <h1 className="text-4xl font-bold">
          📅 Upcoming Shifts
        </h1>

        <p className="text-slate-300 mt-2">
          View your scheduled shifts.
        </p>
      </header>

      <section className="mt-8">
        <div className="bg-white rounded-2xl shadow p-6">

          {shifts.length === 0 ? (
            <p className="text-gray-600">
              No shifts assigned yet.
            </p>
          ) : (
            <div className="space-y-6">

              {shifts.map((shift) => (
                <div
                  key={shift.id}
                  className="border rounded-xl p-6 bg-slate-50"
                >
                  <h2 className="text-2xl font-bold text-[#0D2B4D]">
                    🏥 {shift.facilityName}
                  </h2>

                  <p className="mt-3">
                    📅 {shift.date}
                  </p>

                  <p>
                    🕒 {shift.startTime} - {shift.endTime}
                  </p>

                  <p>
                    🏥 Department: {shift.department}
                  </p>

                  {shift.notes && (
                    <p className="mt-2">
                      📝 {shift.notes}
                    </p>
                  )}

                  <div className="mt-4">
                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                      {shift.status}
                    </span>
                  </div>
                </div>
              ))}

            </div>
          )}

        </div>
      </section>
    </DashboardLayout>
  );
}