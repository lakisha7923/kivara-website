"use client";

import { useMemo, useState } from "react";

import FacilityShell from "@/components/facility/FacilityShell";
import { facilityTodayAttendance } from "@/lib/mock/attendance";

const tabs = [
  "Today's Roster",
  "Scheduled",
  "Arrived",
  "Clocked In",
  "On Shift",
  "Clocked Out",
] as const;

function statusTone(status: string) {
  if (status === "On Shift" || status === "Clocked In") {
    return "bg-emerald-100 text-emerald-800";
  }
  if (status === "Arrived") {
    return "bg-sky-100 text-sky-800";
  }
  if (status === "Clocked Out") {
    return "bg-slate-200 text-slate-700";
  }
  return "bg-amber-100 text-amber-900";
}

export default function FacilityAttendancePage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Today's Roster");

  const rows = useMemo(() => {
    if (tab === "Today's Roster") return facilityTodayAttendance;
    return facilityTodayAttendance.filter((r) => r.status === tab);
  }, [tab]);

  const onShiftCount = facilityTodayAttendance.filter(
    (r) => r.status === "On Shift",
  ).length;

  return (
    <FacilityShell title="Today's Attendance">
      <section className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0FA3A3]">
            Live attendance
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#0D2B4D]">
            Today&apos;s Attendance
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-[#6B7280]">
            Today&apos;s Roster → Scheduled / Arrived / Clocked In / On Shift /
            Clocked Out. Detailed GPS history stays with Kivara.
          </p>
        </div>
        <div className="rounded-2xl bg-[#0D2B4D] px-4 py-3 text-white">
          <p className="text-[11px] uppercase tracking-wide text-[#D6F1F1]">
            Currently on shift
          </p>
          <p className="text-2xl font-bold">{onShiftCount} CNAs</p>
        </div>
      </section>

      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              tab === item
                ? "bg-[#0FA3A3] text-white"
                : "border border-slate-200 bg-white text-[#0D2B4D]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <header className="flex items-center justify-between bg-[#0D2B4D] px-4 py-3 text-white">
          <div className="flex items-center gap-2">
            <span className="text-sm">⏱</span>
            <h2 className="text-sm font-semibold">Today&apos;s Roster</h2>
          </div>
          <span className="text-xs text-[#D6F1F1]">{rows.length} shown</span>
        </header>

        <ul className="divide-y divide-slate-100">
          {rows.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm text-slate-500">
              No CNAs in this status right now.
            </li>
          ) : (
            rows.map((row) => (
              <li
                key={row.id}
                className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D6F1F1] text-sm font-bold text-[#0D2B4D]">
                    {row.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-[#0D2B4D]">{row.cnaName}</p>
                    <p className="text-sm text-slate-600">
                      {row.unit} · {row.shiftLabel}
                    </p>
                    {row.clockInAt ? (
                      <p className="mt-1 text-xs text-slate-500">
                        Clock in {row.clockInAt}
                        {row.punctuality !== "—" ? ` · ${row.punctuality}` : ""}
                        {row.duration ? ` · ${row.duration}` : ""}
                      </p>
                    ) : row.status === "Arrived" ? (
                      <p className="mt-1 text-xs text-slate-500">
                        On site · awaiting clock-in
                      </p>
                    ) : (
                      <p className="mt-1 text-xs text-slate-500">
                        Scheduled · not arrived yet
                      </p>
                    )}
                  </div>
                </div>
                <span
                  className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold ${statusTone(
                    row.status,
                  )}`}
                >
                  {row.status}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </FacilityShell>
  );
}
