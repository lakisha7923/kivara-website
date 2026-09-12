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
        title="Approve and lock hours"
        subtitle="Kivara final-approves timesheets. Locked hours feed payroll-ready data and facility invoices."
      />

      <div className="space-y-3">
        {hydrated && record.facilityReviewed ? (
          <ScreenCard>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-[#0FA3A3]">
                  Handoff approval
                </p>
                <h2 className="font-bold text-[#0D2B4D]">{record.cnaName}</h2>
                <p className="text-sm text-slate-600">
                  {record.facilityName} · {record.date}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Actual {record.actualHours} hrs · Scheduled{" "}
                  {record.scheduledHours} hrs
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
                onClick={adminLockHours}
              >
                Approve & lock
              </button>
              <Link
                href="/facility/invoices"
                className="rounded-full border px-4 py-2 text-sm font-semibold"
              >
                View facility invoices
              </Link>
            </div>
            {locked ? (
              <p className="mt-3 text-sm font-medium text-emerald-700">
                Handoff 7 complete. Payroll-ready hours and invoice draft{" "}
                {record.invoiceId} created from the same approved total ($
                {(record.actualHours * record.billRate).toFixed(2)}).
              </p>
            ) : null}
          </ScreenCard>
        ) : null}

        {mockTimesheets.map((sheet) => (
          <ScreenCard key={sheet.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-bold text-[#0D2B4D]">{sheet.cnaName}</h2>
                <p className="text-sm text-slate-600">
                  {sheet.facilityName} · {sheet.date}
                </p>
              </div>
              <StatusBadge label={sheet.status} tone="warning" />
            </div>
          </ScreenCard>
        ))}
      </div>
    </AdminShell>
  );
}
