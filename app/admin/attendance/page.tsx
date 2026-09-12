"use client";

import { useState } from "react";

import AdminShell from "@/components/admin/AdminShell";
import {
  adminAttendanceKpis,
  adminLiveAttendance,
  type LiveAttendanceRow,
} from "@/lib/mock/attendance";

function statusTone(status: string) {
  if (status === "On Shift" || status === "Clocked In") {
    return "bg-emerald-100 text-emerald-800";
  }
  if (status === "Not Clocked In") {
    return "bg-amber-100 text-amber-900";
  }
  if (status === "Clocked Out") {
    return "bg-slate-200 text-slate-700";
  }
  return "bg-slate-100 text-slate-700";
}

function LiveMap({ selected }: { selected: LiveAttendanceRow }) {
  const onShift = adminLiveAttendance.filter((r) => r.status === "On Shift");
  const positions = [
    "left-[28%] top-[30%]",
    "left-[55%] top-[42%]",
    "left-[40%] top-[58%]",
    "left-[68%] top-[28%]",
  ];

  return (
    <div className="relative h-56 overflow-hidden rounded-xl bg-gradient-to-br from-[#D6F1F1] via-[#E8F0F4] to-[#c5dde8]">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(#0D2B4D22_1px,transparent_1px),linear-gradient(90deg,#0D2B4D22_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute left-[18%] top-[22%] h-24 w-24 rounded-full border-2 border-dashed border-[#0FA3A3]/50 bg-[#0FA3A3]/10" />
      <div className="absolute right-[20%] top-[35%] h-20 w-20 rounded-full border-2 border-dashed border-[#0FA3A3]/40 bg-[#0FA3A3]/10" />
      {onShift.map((row, index) => {
        const outside = row.onSite === "Outside Area";
        return (
          <div
            key={row.id}
            title={row.cnaName}
            className={`absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[10px] font-bold text-white shadow ${
              positions[index % positions.length]
            } ${outside ? "bg-rose-500" : "bg-emerald-500"} ${
              selected.id === row.id ? "ring-2 ring-[#0D2B4D] ring-offset-2" : ""
            }`}
          >
            {row.initials}
          </div>
        );
      })}
      <div className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-[#0D2B4D] shadow">
        Live GPS · green = within · red = outside
      </div>
    </div>
  );
}

export default function AdminAttendancePage() {
  const [selected, setSelected] = useState<LiveAttendanceRow>(
    adminLiveAttendance[0]
  );

  return (
    <AdminShell title="Time & Attendance">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0FA3A3]">
            Time & Attendance
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#0D2B4D] sm:text-3xl">
            Live Status
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Live Status → GPS/Time Exception Review across facilities
          </p>
        </div>
        <button
          type="button"
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#0D2B4D]"
        >
          Filters
        </button>
      </div>

      <section className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {adminAttendanceKpis.map((kpi) => (
          <article
            key={kpi.label}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {kpi.label}
            </p>
            <p className="mt-2 text-3xl font-bold text-[#0D2B4D]">{kpi.value}</p>
            <p className="mt-1 text-sm text-slate-600">{kpi.detail}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-12">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-8">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#F2F4F7] text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">CNA</th>
                  <th className="px-4 py-3 font-semibold">Facility</th>
                  <th className="px-4 py-3 font-semibold">Shift</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Clock In</th>
                  <th className="px-4 py-3 font-semibold">On-Site</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminLiveAttendance.map((row) => (
                  <tr
                    key={row.id}
                    className={`border-t border-slate-100 ${
                      selected.id === row.id ? "bg-[#D6F1F1]/40" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D6F1F1] text-xs font-bold">
                          {row.initials}
                        </span>
                        <span className="font-semibold text-[#0D2B4D]">
                          {row.cnaName}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-[#0D2B4D]">
                        {row.facilityName}
                      </p>
                      <p className="text-xs text-slate-500">{row.facilityCity}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{row.shiftLabel}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${statusTone(
                          row.status
                        )}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {row.clockInAt
                        ? `${row.clockInAt} · ${row.punctuality}`
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            row.onSite === "Within Area"
                              ? "bg-emerald-500"
                              : row.onSite === "Outside Area"
                                ? "bg-rose-500"
                                : "bg-slate-300"
                          }`}
                        />
                        <div>
                          <p className="text-xs font-semibold text-[#0D2B4D]">
                            {row.onSite}
                          </p>
                          {row.lastSeen ? (
                            <p className="text-[11px] text-slate-500">
                              Last seen {row.lastSeen}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setSelected(row)}
                        className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-[#0D2B4D]"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="space-y-4 xl:col-span-4">
          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-[#0D2B4D]">Live Tracking</h3>
            <div className="mt-3">
              <LiveMap selected={selected} />
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Staff detail
                </p>
                <h3 className="mt-1 text-lg font-bold text-[#0D2B4D]">
                  {selected.cnaName}
                </h3>
                <p className="text-sm text-slate-600">
                  {selected.facilityName} · {selected.unit}
                </p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${statusTone(
                  selected.status
                )}`}
              >
                {selected.status}
              </span>
            </div>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Duration</dt>
                <dd className="font-semibold">{selected.duration ?? "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">GPS accuracy</dt>
                <dd className="font-semibold">
                  {selected.gpsAccuracyFt
                    ? `${selected.gpsAccuracyFt} ft`
                    : "—"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">On-site</dt>
                <dd className="font-semibold">{selected.onSite}</dd>
              </div>
            </dl>
            <button
              type="button"
              className="mt-4 w-full rounded-full border border-slate-200 py-2 text-sm font-semibold text-[#0D2B4D]"
            >
              View Location History
            </button>

            {selected.onSite === "Outside Area" ? (
              <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3">
                <p className="text-xs font-bold uppercase tracking-wide text-rose-800">
                  GPS / Time Exception Review
                </p>
                <p className="mt-1 text-sm text-rose-900">
                  Outside geofence while clocked. Capture reason and route to
                  Audit History if hours are adjusted.
                </p>
                <button
                  type="button"
                  className="mt-3 w-full rounded-full bg-rose-700 py-2 text-sm font-semibold text-white"
                >
                  Open exception review
                </button>
              </div>
            ) : null}

            <div className="mt-5 border-t border-slate-100 pt-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Today&apos;s Timeline
              </p>
              <ol className="mt-3 space-y-3">
                {[
                  ["Shift Confirmed", "done"],
                  ["Clocked In", selected.clockInAt ? "done" : "pending"],
                  [
                    "On Shift (Current)",
                    selected.status === "On Shift" ? "current" : "pending",
                  ],
                  ["Clocked Out", "pending"],
                ].map(([label, state]) => (
                  <li key={label} className="flex items-center gap-3 text-sm">
                    <span
                      className={`h-3 w-3 rounded-full ${
                        state === "done"
                          ? "bg-emerald-500"
                          : state === "current"
                            ? "bg-[#0FA3A3] ring-4 ring-[#D6F1F1]"
                            : "bg-slate-300"
                      }`}
                    />
                    <span
                      className={
                        state === "pending"
                          ? "text-slate-400"
                          : "font-medium text-[#0D2B4D]"
                      }
                    >
                      {label}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </article>
        </aside>
      </section>
    </AdminShell>
  );
}
