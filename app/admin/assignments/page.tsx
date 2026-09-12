"use client";

import Link from "next/link";

import AdminShell from "@/components/admin/AdminShell";
import {
  HandoffNotifications,
  HandoffRail,
} from "@/components/handoffs/HandoffChrome";
import { useHandoffs } from "@/components/handoffs/HandoffProvider";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { CONFIRMED_CNA_COPY, mockAssignments } from "@/lib/mock/v1-data";

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
        subtitle="Confirmed → Call-Out / No-Show / Emergency Exception → Replacement Workflow"
      />

      <p className="mb-4 text-sm text-slate-600">
        Incoming eligibility reviews live under{" "}
        <Link href="/admin/shift-requests" className="font-semibold text-teal-700">
          Shift Requests
        </Link>
        .
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
            <p className="mt-2 text-xs text-emerald-700">{CONFIRMED_CNA_COPY}</p>
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
