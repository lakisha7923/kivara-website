"use client";

import Link from "next/link";

import CnaShell from "@/components/cna/CnaShell";
import {
  HandoffNotifications,
  HandoffRail,
} from "@/components/handoffs/HandoffChrome";
import { useHandoffs } from "@/components/handoffs/HandoffProvider";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockAvailableShifts, mockShiftRequests } from "@/lib/mock/v1-data";

export default function CnaShiftsPage() {
  const { record, hydrated } = useHandoffs();
  const showHandoff = hydrated && record.published;

  return (
    <CnaShell>
      <HandoffRail portal="cna" />
      <HandoffNotifications portal="cna" />
      <PageHeader
        eyebrow="Shifts"
        title="Eligible open shifts"
        subtitle="Visibility is limited to shifts you are eligible to work."
      />

      {showHandoff ? (
        <ScreenCard className="mb-4 border-[#0FA3A3]/40">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-[#0FA3A3]">
                Handoff shift
              </p>
              <h2 className="font-bold text-[#0D2B4D]">{record.facilityName}</h2>
              <p className="text-sm text-slate-600">{record.locationName}</p>
            </div>
            <StatusBadge
              label={record.confirmed ? "Confirmed" : record.cnaRequested ? "Requested" : "Eligible"}
              tone={record.confirmed ? "success" : "brand"}
            />
          </div>
          <p className="mt-3 text-sm text-slate-700">
            {record.date} · {record.startTime}–{record.endTime} · ${record.payRate}/hr
          </p>
          <Link
            href={`/cna/shifts/${record.shiftId}`}
            className="mt-4 inline-flex rounded-full bg-[#0D2B4D] px-4 py-2 text-sm font-semibold text-white"
          >
            Open shift
          </Link>
        </ScreenCard>
      ) : null}

      {mockShiftRequests.map((request) => (
        <ScreenCard key={request.id} className="mb-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-[#0D2B4D]">Your request</p>
            <StatusBadge label={request.status} tone="info" />
          </div>
          <p className="mt-2 text-sm text-slate-600">
            A request is not a schedule. Kivara must confirm the assignment.
          </p>
        </ScreenCard>
      ))}

      <div className="space-y-3">
        {mockAvailableShifts.map((shift) => (
          <ScreenCard key={shift.id}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="font-bold text-[#0D2B4D]">{shift.facilityName}</h2>
                <p className="text-sm text-slate-600">{shift.locationName}</p>
              </div>
              <StatusBadge label="Eligible" tone="success" />
            </div>
            <p className="mt-3 text-sm text-slate-700">
              {shift.date} · {shift.startTime}–{shift.endTime}
            </p>
            <Link
              href={`/cna/shifts/${shift.id}`}
              className="mt-4 inline-flex rounded-full border px-4 py-2 text-sm font-semibold"
            >
              View details
            </Link>
          </ScreenCard>
        ))}
      </div>
    </CnaShell>
  );
}
