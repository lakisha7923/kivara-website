import Link from "next/link";

import CnaShell from "@/components/cna/CnaShell";
import { cnaActiveClockShift } from "@/lib/mock/attendance";
import { CONFIRMED_CNA_COPY, mockAssignments } from "@/lib/mock/v1-data";

export default function CnaClockIndexPage() {
  const upcoming = [
    cnaActiveClockShift,
    ...mockAssignments.filter((a) => a.status === "Confirmed"),
  ];

  return (
    <CnaShell>
      <div className="mb-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0FA3A3]">
          GPS time clock
        </p>
        <h1 className="mt-1 font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#0D2B4D]">
          Upcoming shifts
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Clock in only on confirmed assignments. Geofence checks apply at punch
          time.
        </p>
      </div>

      <div className="space-y-3">
        {upcoming.map((shift) => (
          <article
            key={shift.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-teal-800">
                  {CONFIRMED_CNA_COPY}
                </p>
                <h2 className="mt-1 text-lg font-bold text-[#0D2B4D]">
                  {shift.facilityName}
                </h2>
                <p className="text-sm text-slate-600">
                  {"date" in shift ? shift.date : ""} · {shift.startTime} –{" "}
                  {shift.endTime}
                </p>
                <p className="text-sm text-slate-600">
                  {"role" in shift && shift.role
                    ? shift.role
                    : `${"unit" in shift ? shift.unit : ""} · CNA`}
                </p>
              </div>
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-800">
                CONFIRMED
              </span>
            </div>
            <Link
              href={`/cna/clock/${shift.id}`}
              className="mt-4 flex w-full items-center justify-center rounded-full bg-[#0D2B4D] py-2.5 text-sm font-semibold text-white"
            >
              Open time clock
            </Link>
          </article>
        ))}
      </div>
    </CnaShell>
  );
}
