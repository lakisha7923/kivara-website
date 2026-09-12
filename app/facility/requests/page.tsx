"use client";

import Link from "next/link";

import FacilityShell from "@/components/facility/FacilityShell";
import {
  HandoffNotifications,
  HandoffRail,
} from "@/components/handoffs/HandoffChrome";
import { useHandoffs } from "@/components/handoffs/HandoffProvider";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockStaffingRequests } from "@/lib/mock/v1-data";
import type { StaffingRequestStatus } from "@/types/kivara";

const STATUS_ORDER: StaffingRequestStatus[] = [
  "Open",
  "Partially Filled",
  "Fully Staffed",
  "In Progress",
  "Completed",
  "Billed",
];

function statusTone(status: string): "success" | "warning" | "info" | "neutral" | "brand" {
  if (status === "Open" || status === "Partially Filled") return "warning";
  if (status === "Fully Staffed" || status === "In Progress") return "brand";
  if (status === "Completed" || status === "Billed") return "success";
  return "neutral";
}

export default function FacilityRequestsPage() {
  const { record, hydrated } = useHandoffs();
  const submitted =
    hydrated && record.completedSteps.includes("facility_submitted");

  return (
    <FacilityShell title="Request Staff">
      <HandoffRail portal="facility" />
      <HandoffNotifications portal="facility" />
      <PageHeader
        eyebrow="Staffing requests"
        title="Request Staff"
        subtitle="New Request → Review → Submit → Request Detail. Statuses: Open through Billed."
      />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {STATUS_ORDER.map((status) => {
            const count = mockStaffingRequests.filter((r) => r.status === status).length;
            return (
              <span
                key={status}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
              >
                {status}: {count}
              </span>
            );
          })}
        </div>
        <Link
          href="/facility/requests/new"
          className="rounded-full bg-[#0FA3A3] px-4 py-2.5 text-sm font-semibold text-white"
        >
          New Request
        </Link>
      </div>

      <div className="space-y-3">
        {submitted ? (
          <Link href="/facility/requests/req-submitted">
            <ScreenCard className="transition hover:border-[#0FA3A3]">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[#0FA3A3]">
                    Just submitted
                  </p>
                  <h2 className="font-bold text-[#0D2B4D]">
                    CNA — {record.unit}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {record.date} · {record.startTime}–{record.endTime} ·{" "}
                    {record.quantity} open
                  </p>
                </div>
                <StatusBadge label="Open" tone="warning" />
              </div>
            </ScreenCard>
          </Link>
        ) : null}

        {mockStaffingRequests.map((request) => (
          <Link key={request.id} href={`/facility/requests/${request.id}`}>
            <ScreenCard className="transition hover:border-[#0FA3A3]">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="font-bold text-[#0D2B4D]">
                    {request.unit} · {request.locationName}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {request.date} · {request.startTime}–{request.endTime} · $
                    {request.billRate}/hr bill
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Filled {request.filled}/{request.quantity}
                  </p>
                </div>
                <StatusBadge
                  label={request.status}
                  tone={statusTone(request.status)}
                />
              </div>
            </ScreenCard>
          </Link>
        ))}
      </div>
    </FacilityShell>
  );
}
