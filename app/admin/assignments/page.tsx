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
  mockAssignments,
} from "@/lib/mock/v1-data";

export default function AdminAssignmentsPage() {
  const { record, hydrated } = useHandoffs();
  const confirmed = hydrated && record.confirmed;

  return (
    <AdminShell title="Assignments">
      <HandoffRail portal="admin" />
      <HandoffNotifications portal="admin" />
      <PageHeader
        eyebrow="Coverage"
        title="Assignments"
        subtitle="Confirmed coverage only changes through Call-Out / No-Show / Emergency Exception → Replacement. No casual Cancel CNA."
      />

      <p className="mb-4 text-sm text-slate-600">
        Confirm new coverage from{" "}
        <Link href="/admin/shift-requests" className="font-semibold text-teal-700">
          Shift Requests
        </Link>{" "}
        using {CONFIRM_ADMIN_ACTION}.
      </p>

      <div className="space-y-3">
        {confirmed ? (
          <ScreenCard>
            <StatusBadge label="Confirmed" tone="success" />
            <p className="mt-2 font-bold text-[#0D2B4D]">{record.cnaName}</p>
            <p className="text-sm text-slate-600">
              {record.facilityName} · {record.date} · {record.startTime}–
              {record.endTime}
            </p>
            <p className="mt-2 text-xs text-emerald-700">
              CNA: {CONFIRMED_CNA_COPY} · Facility: {CONFIRMED_FACILITY_COPY}
            </p>
          </ScreenCard>
        ) : null}

        {mockAssignments.map((assignment) => (
          <Link key={assignment.id} href={`/admin/assignments/${assignment.id}`}>
            <ScreenCard className="transition hover:border-[#0FA3A3]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold text-[#0D2B4D]">{assignment.cnaName}</h2>
                  <p className="text-sm text-slate-600">
                    {assignment.facilityName} · {assignment.unit}
                  </p>
                  <p className="text-sm text-slate-600">
                    {assignment.date} · {assignment.startTime}–{assignment.endTime}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusBadge label={assignment.status} tone="success" />
                  <StatusBadge
                    label={assignment.attendanceStatus}
                    tone="brand"
                  />
                </div>
              </div>
              <p className="mt-3 text-sm font-semibold text-teal-700">
                Open exceptions / replacement →
              </p>
            </ScreenCard>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
