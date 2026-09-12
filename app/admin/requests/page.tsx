"use client";

import Link from "next/link";

import AdminShell from "@/components/admin/AdminShell";
import {
  HandoffNotifications,
  HandoffRail,
} from "@/components/handoffs/HandoffChrome";
import { useHandoffs } from "@/components/handoffs/HandoffProvider";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockStaffingRequests } from "@/lib/mock/v1-data";

export default function AdminRequestsPage() {
  const { record, publishPositions, hydrated } = useHandoffs();
  const canPublish =
    hydrated &&
    record.completedSteps.includes("facility_submitted") &&
    !record.completedSteps.includes("admin_published");
  const published =
    hydrated && record.completedSteps.includes("admin_published");

  return (
    <AdminShell title="Staffing Requests">
      <HandoffRail portal="admin" />
      <HandoffNotifications portal="admin" />
      <PageHeader
        eyebrow="Staffing"
        title="Staffing Requests"
        subtitle="Request Detail → Positions → Publish to Eligible CNAs"
      />

      <div className="space-y-3">
        {hydrated && record.completedSteps.includes("facility_submitted") ? (
          <Link href="/admin/requests/req-handoff">
            <ScreenCard className="transition hover:border-[#0FA3A3]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[#0FA3A3]">
                    Handoff queue
                  </p>
                  <h2 className="font-bold text-[#0D2B4D]">
                    {record.facilityName} · {record.unit}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {record.locationName} · {record.date} · {record.startTime}–
                    {record.endTime}
                  </p>
                </div>
                <StatusBadge
                  label={published ? "Published" : "Submitted"}
                  tone={published ? "success" : "warning"}
                />
              </div>
              <button
                type="button"
                disabled={!canPublish}
                onClick={(e) => {
                  e.preventDefault();
                  publishPositions();
                }}
                className="mt-4 rounded-full bg-[#0D2B4D] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {published
                  ? "Published to eligible CNAs"
                  : "Publish to eligible CNAs"}
              </button>
            </ScreenCard>
          </Link>
        ) : null}

        {mockStaffingRequests.map((request) => (
          <Link key={request.id} href={`/admin/requests/${request.id}`}>
            <ScreenCard className="transition hover:border-[#0FA3A3]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold text-[#0D2B4D]">
                    {request.facilityName} · {request.unit}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {request.locationName} · {request.date} · {request.startTime}
                    –{request.endTime}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Positions filled {request.filled}/{request.quantity}
                  </p>
                </div>
                <StatusBadge label={request.status} tone="brand" />
              </div>
            </ScreenCard>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
