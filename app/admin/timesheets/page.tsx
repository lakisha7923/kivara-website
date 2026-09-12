"use client";

import Link from "next/link";

import AdminShell from "@/components/admin/AdminShell";
import {
  HandoffNotifications,
  HandoffRail,
} from "@/components/handoffs/HandoffChrome";
import { useHandoffs } from "@/components/handoffs/HandoffProvider";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockTimesheets } from "@/lib/mock/v1-data";

export default function AdminTimesheetsPage() {
  const { record, adminLockHours, hydrated } = useHandoffs();
  const canLock =
    hydrated &&
    record.completedSteps.includes("timesheet_reviewed") &&
    !record.completedSteps.includes("hours_locked");
  const locked = hydrated && record.hoursLocked;

  return (
    <AdminShell title="Timesheets">
      <HandoffRail portal="admin" />
      <HandoffNotifications portal="admin" />
      <PageHeader
        eyebrow="Time & money"
        title="Timesheets"
        subtitle="Review → Correct with Audit → Approve → Lock"
      />

      <div className="space-y-3">
        {hydrated && record.facilityReviewed ? (
          <Link href="/admin/timesheets/ts-handoff">
            <ScreenCard className="transition hover:border-[#0FA3A3]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[#0FA3A3]">
                    Handoff · needs lock
                  </p>
                  <h2 className="font-bold text-[#0D2B4D]">{record.cnaName}</h2>
                  <p className="text-sm text-slate-600">
                    {record.facilityName} · {record.date} · {record.actualHours}{" "}
                    hrs
                  </p>
                </div>
                <StatusBadge
                  label={locked ? "Locked" : "Facility Reviewed"}
                  tone={locked ? "success" : "warning"}
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={!canLock}
                  className="rounded-full bg-[#0FA3A3] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                  onClick={(e) => {
                    e.preventDefault();
                    adminLockHours();
                  }}
                >
                  Approve & lock
                </button>
                <span className="rounded-full border px-4 py-2 text-sm font-semibold">
                  Open full review →
                </span>
              </div>
            </ScreenCard>
          </Link>
        ) : null}

        {mockTimesheets.map((sheet) => (
          <Link key={sheet.id} href={`/admin/timesheets/${sheet.id}`}>
            <ScreenCard className="transition hover:border-[#0FA3A3]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold text-[#0D2B4D]">{sheet.cnaName}</h2>
                  <p className="text-sm text-slate-600">
                    {sheet.facilityName} · {sheet.date} · {sheet.actualHours} hrs
                  </p>
                </div>
                <StatusBadge label={sheet.status} tone="warning" />
              </div>
              <p className="mt-3 text-sm font-semibold text-teal-700">
                Review → Correct → Approve → Lock →
              </p>
            </ScreenCard>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
