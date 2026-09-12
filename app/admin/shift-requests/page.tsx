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
  CONFIRMED_FACILITY_COPY,
  mockShiftRequests,
} from "@/lib/mock/v1-data";

export default function AdminShiftRequestsPage() {
  const { record, confirmAssignment, copy, hydrated } = useHandoffs();
  const canConfirm =
    hydrated &&
    record.completedSteps.includes("cna_requested") &&
    !record.completedSteps.includes("admin_confirmed");
  const confirmed = hydrated && record.confirmed;

  return (
    <AdminShell title="Shift Requests">
      <HandoffRail portal="admin" />
      <HandoffNotifications portal="admin" />
      <PageHeader
        eyebrow="Matching"
        title="Shift Requests"
        subtitle="Eligibility Review → Confirm Assignment"
      />

      <div className="space-y-3">
        {hydrated && record.cnaRequested ? (
          <ScreenCard>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-[#0FA3A3]">
                  Eligibility review
                </p>
                <h2 className="font-bold text-[#0D2B4D]">{record.cnaName}</h2>
                <p className="text-sm text-slate-600">
                  {record.facilityName} · {record.date} · {record.startTime}–
                  {record.endTime}
                </p>
                <p className="mt-1 text-xs text-emerald-700">
                  Credentials · Work Ready · No conflict · Area match
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
              onClick={confirmAssignment}
              className="mt-4 rounded-full bg-[#0FA3A3] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            >
              {copy.adminConfirmAction}
            </button>
            <p className="mt-2 text-xs text-slate-500">
              Confirm Assignment locks coverage. There is no casual Cancel CNA —
              later changes require a documented exception on the assignment.
            </p>
            {confirmed ? (
              <p className="mt-3 text-sm font-medium text-emerald-700">
                Assignment confirmed. CNA sees: {CONFIRMED_CNA_COPY}. Facility
                sees: {CONFIRMED_FACILITY_COPY}.
              </p>
            ) : null}
          </ScreenCard>
        ) : (
          <ScreenCard>
            <p className="text-sm text-slate-600">
              No handoff shift request yet.{" "}
              <Link href="/cna/shifts/handoff-shift-1" className="font-semibold text-teal-700">
                Open CNA shift
              </Link>
            </p>
          </ScreenCard>
        )}

        {mockShiftRequests.map((request) => (
          <ScreenCard key={request.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-bold text-[#0D2B4D]">{request.cnaName}</h2>
                <p className="text-sm text-slate-600">
                  Shift {request.shiftId} · {request.requestedAt}
                </p>
                <p className="mt-1 text-xs text-emerald-700">
                  Eligibility checks passed
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
    </AdminShell>
  );
}
