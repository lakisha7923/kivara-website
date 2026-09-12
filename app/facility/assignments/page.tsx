"use client";

import Link from "next/link";

import FacilityShell from "@/components/facility/FacilityShell";
import {
  HandoffNotifications,
  HandoffRail,
} from "@/components/handoffs/HandoffChrome";
import { useHandoffs } from "@/components/handoffs/HandoffProvider";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { CONFIRMED_FACILITY_COPY, mockAssignments } from "@/lib/mock/v1-data";

export default function FacilityAssignmentsPage() {
  const { record, copy, hydrated } = useHandoffs();
  const confirmed = hydrated && record.confirmed;

  return (
    <FacilityShell title="Active Assignments">
      <HandoffRail portal="facility" />
      <HandoffNotifications portal="facility" />
      <PageHeader
        eyebrow="Confirmed coverage"
        title="Active Assignments"
        subtitle="Assignment Detail → CNA work-status → Contact Kivara / Emergency Change"
      />

      <div className="space-y-3">
        {confirmed ? (
          <Link href="/facility/assignments/asg-handoff">
            <ScreenCard className="transition hover:border-[#0FA3A3]">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-teal-800">
                {copy.facilityConfirmed}
              </p>
              <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-[#0D2B4D]">
                    {record.cnaName}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {record.date} · {record.startTime}–{record.endTime}
                  </p>
                  <p className="text-sm text-slate-600">
                    {record.unit} · {record.locationName}
                  </p>
                </div>
                <StatusBadge
                  label={record.clocked ? "Clocked Out" : "Scheduled"}
                  tone={record.clocked ? "info" : "success"}
                />
              </div>
            </ScreenCard>
          </Link>
        ) : (
          <ScreenCard>
            <p className="text-sm text-slate-600">
              No handoff assignment confirmed yet. After Admin confirms, you will
              see {CONFIRMED_FACILITY_COPY} here.
            </p>
          </ScreenCard>
        )}

        {mockAssignments.map((assignment) => (
          <Link key={assignment.id} href={`/facility/assignments/${assignment.id}`}>
            <ScreenCard className="transition hover:border-[#0FA3A3]">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-teal-800">
                {CONFIRMED_FACILITY_COPY}
              </p>
              <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-[#0D2B4D]">
                    {assignment.cnaName}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {assignment.date} · {assignment.startTime}–{assignment.endTime}
                  </p>
                  <p className="text-sm text-slate-600">
                    {assignment.unit} · work status: {assignment.attendanceStatus}
                  </p>
                </div>
                <StatusBadge label={assignment.status} tone="success" />
              </div>
            </ScreenCard>
          </Link>
        ))}
      </div>
    </FacilityShell>
  );
}
