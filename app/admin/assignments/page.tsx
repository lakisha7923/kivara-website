"use client";

import Link from "next/link";

import AdminShell from "@/components/admin/AdminShell";
import {
  HandoffNotifications,
  HandoffRail,
} from "@/components/handoffs/HandoffChrome";
import { useHandoffs } from "@/components/handoffs/HandoffProvider";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import {
  CONFIRM_ADMIN_ACTION,
  CONFIRMED_CNA_COPY,
  mockAssignments,
  mockShiftRequests,
} from "@/lib/mock/v1-data";

export default function AdminAssignmentsPage() {
  const { record, confirmAssignment, copy, hydrated } = useHandoffs();
  const canConfirm =
    hydrated &&
    record.completedSteps.includes("cna_requested") &&
    !record.completedSteps.includes("admin_confirmed");
  const confirmed = hydrated && record.confirmed;

  return (
    <AdminShell title="Assignments">
      <HandoffRail portal="admin" />
      <HandoffNotifications portal="admin" />
      <PageHeader
        eyebrow="Confirm Assignment"
        title="Review requests & confirm coverage"
        subtitle="Confirm Assignment schedules the CNA. Exceptions require reason + audit — no casual cancel."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <h2 className="font-semibold text-[#0D2B4D]">Incoming shift requests</h2>
          {hydrated && record.cnaRequested ? (
            <ScreenCard>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-[#0D2B4D]">{record.cnaName}</p>
                  <p className="text-sm text-slate-600">
                    {record.facilityName} · {record.date} · {record.startTime}–
                    {record.endTime}
                  </p>
                  <p className="mt-1 text-xs text-emerald-700">
                    Eligibility checks passed
                  </p>
                </div>
                <StatusBadge
                  label={confirmed ? "Confirmed" : "Under Review"}
                  tone={confirmed ? "success" : "warning"}
                />
              </div>
              <button
                type="button"
                disabled={!canConfirm}
                className="mt-4 rounded-full bg-[#0FA3A3] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                onClick={confirmAssignment}
              >
                {copy.adminConfirmAction}
              </button>
              {confirmed ? (
                <p className="mt-3 text-sm font-medium text-emerald-700">
                  Handoff 4 complete. CNA sees: {CONFIRMED_CNA_COPY}
                </p>
              ) : null}
            </ScreenCard>
          ) : (
            <ScreenCard>
              <p className="text-sm text-slate-600">
                No handoff request yet.{" "}
                <Link href="/cna/shifts/handoff-shift-1" className="text-teal-700">
                  Open CNA shift
                </Link>
              </p>
            </ScreenCard>
          )}

          {mockShiftRequests.map((request) => (
            <ScreenCard key={request.id}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-[#0D2B4D]">{request.cnaName}</p>
                  <p className="text-sm text-slate-600">
                    Shift {request.shiftId} · {request.requestedAt}
                  </p>
                </div>
                <StatusBadge label={request.status} tone="warning" />
              </div>
              <button
                type="button"
                className="mt-4 rounded-full border px-4 py-2 text-sm font-semibold"
              >
                {CONFIRM_ADMIN_ACTION}
              </button>
            </ScreenCard>
          ))}
        </div>

        <div className="space-y-3">
          <h2 className="font-semibold text-[#0D2B4D]">Confirmed assignments</h2>
          {confirmed ? (
            <ScreenCard>
              <StatusBadge label="Confirmed" tone="success" />
              <p className="mt-2 font-bold text-[#0D2B4D]">{record.cnaName}</p>
              <p className="text-sm text-slate-600">
                {record.facilityName} · {record.date} · {record.startTime}–
                {record.endTime}
              </p>
              <Link
                href={`/cna/clock/${record.assignmentId}`}
                className="mt-3 inline-flex text-sm font-semibold text-teal-700"
              >
                Next handoff: CNA GPS clock →
              </Link>
            </ScreenCard>
          ) : null}
          {mockAssignments.map((assignment) => (
            <ScreenCard key={assignment.id}>
              <StatusBadge label={assignment.status} tone="success" />
              <p className="mt-2 font-bold text-[#0D2B4D]">{assignment.cnaName}</p>
              <p className="text-sm text-slate-600">
                {assignment.facilityName} · {assignment.date} ·{" "}
                {assignment.startTime}–{assignment.endTime}
              </p>
            </ScreenCard>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
