"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import AdminShell from "@/components/admin/AdminShell";
import { useHandoffs } from "@/components/handoffs/HandoffProvider";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockTimesheets } from "@/lib/mock/v1-data";

export default function AdminTimesheetDetailPage() {
  const params = useParams<{ id: string }>();
  const { record, adminLockHours, hydrated } = useHandoffs();
  const [corrected, setCorrected] = useState(false);
  const [approved, setApproved] = useState(false);
  const [hours, setHours] = useState<string | null>(null);

  const isHandoff = params.id === "ts-handoff";
  const sheet = mockTimesheets.find((t) => t.id === params.id);

  if (!sheet && !isHandoff) {
    return (
      <AdminShell title="Timesheet Detail">
        <PageHeader title="Timesheet not found" />
        <Link href="/admin/timesheets" className="text-sm font-semibold text-teal-700">
          ← Back to Timesheets
        </Link>
      </AdminShell>
    );
  }

  const cnaName = sheet?.cnaName ?? (hydrated ? record.cnaName : "—");
  const facility = sheet?.facilityName ?? (hydrated ? record.facilityName : "—");
  const date = sheet?.date ?? (hydrated ? record.date : "—");
  const scheduled =
    sheet?.scheduledHours ?? (hydrated ? record.scheduledHours : 0);
  const actual =
    hours !== null
      ? Number(hours)
      : (sheet?.actualHours ?? (hydrated ? record.actualHours : 0));
  const canLockHandoff =
    isHandoff &&
    hydrated &&
    record.completedSteps.includes("timesheet_reviewed") &&
    !record.completedSteps.includes("hours_locked");
  const locked = isHandoff
    ? hydrated && record.hoursLocked
    : approved && corrected;

  return (
    <AdminShell title="Timesheet Detail">
      <PageHeader
        eyebrow="Timesheets"
        title={`Review · ${cnaName}`}
        subtitle="Review → Correct with Audit → Approve → Lock"
      />

      <ScreenCard className="mb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm text-slate-600">
              {facility} · {date}
            </p>
            <p className="mt-2 text-sm text-slate-700">
              Scheduled {scheduled} hrs · Actual {actual} hrs
            </p>
          </div>
          <StatusBadge
            label={locked ? "Locked" : approved ? "Approved" : sheet?.status ?? "Submitted"}
            tone={locked ? "success" : "warning"}
          />
        </div>
      </ScreenCard>

      <ScreenCard className="mb-4">
        <h2 className="font-semibold text-[#0D2B4D]">1. Correct with Audit</h2>
        <p className="mt-2 text-sm text-slate-600">
          Adjustments require a reason and write to Audit History.
        </p>
        <label className="mt-3 block text-sm">
          <span className="mb-1 block font-medium">Actual hours</span>
          <input
            type="number"
            step="0.05"
            defaultValue={actual}
            onChange={(e) => setHours(e.target.value)}
            className="w-full max-w-xs rounded-xl border border-slate-200 px-3 py-2.5"
          />
        </label>
        <button
          type="button"
          onClick={() => setCorrected(true)}
          className="mt-3 rounded-full border px-4 py-2 text-sm font-semibold"
        >
          Save correction + audit
        </button>
        {corrected ? (
          <p className="mt-2 text-sm text-emerald-700">
            Correction logged to Audit History.
          </p>
        ) : null}
      </ScreenCard>

      <ScreenCard className="mb-4">
        <h2 className="font-semibold text-[#0D2B4D]">2. Approve</h2>
        <button
          type="button"
          onClick={() => setApproved(true)}
          className="mt-3 rounded-full bg-[#0D2B4D] px-4 py-2.5 text-sm font-semibold text-white"
        >
          Approve hours
        </button>
        {approved ? (
          <p className="mt-2 text-sm text-emerald-700">Hours approved.</p>
        ) : null}
      </ScreenCard>

      <ScreenCard>
        <h2 className="font-semibold text-[#0D2B4D]">3. Lock</h2>
        <p className="mt-2 text-sm text-slate-600">
          Locked hours feed payroll-ready totals and invoice drafts.
        </p>
        <button
          type="button"
          disabled={isHandoff ? !canLockHandoff : !approved}
          onClick={() => {
            if (isHandoff) adminLockHours();
            else setApproved(true);
          }}
          className="mt-3 rounded-full bg-[#0FA3A3] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {locked ? "Hours locked" : "Lock hours"}
        </button>
        {locked ? (
          <p className="mt-2 text-sm font-medium text-emerald-700">
            Locked. Continue to Payroll and Invoices.
          </p>
        ) : null}
      </ScreenCard>

      <p className="mt-5">
        <Link href="/admin/timesheets" className="text-sm font-semibold text-teal-700">
          ← Back to Timesheets
        </Link>
      </p>
    </AdminShell>
  );
}
