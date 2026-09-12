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
    <AdminShell title="Staffing requests">
      <HandoffRail portal="admin" />
      <HandoffNotifications portal="admin" />
      <PageHeader
        eyebrow="Requests"
        title="Facility staffing requests"
        subtitle="Review submitted needs, publish eligible positions, and track fill status."
      />

      <div className="space-y-3">
        {hydrated && record.completedSteps.includes("facility_submitted") ? (
          <ScreenCard>
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
                <p className="mt-1 text-sm text-slate-600">
                  Positions needed {record.quantity} · Pay ${record.payRate}/hr
                </p>
              </div>
              <StatusBadge
                label={published ? "Published" : "Submitted"}
                tone={published ? "success" : "warning"}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                disabled={!canPublish}
                onClick={publishPositions}
                className="rounded-full bg-[#0D2B4D] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {published
                  ? "Published to eligible CNAs"
                  : "Publish to eligible CNAs"}
              </button>
              {published ? (
                <Link
                  href={`/cna/shifts/${record.shiftId}`}
                  className="rounded-full border px-4 py-2 text-sm font-semibold"
                >
                  View as CNA →
                </Link>
              ) : null}
            </div>
            {published ? (
              <p className="mt-3 text-sm font-medium text-emerald-700">
                Handoff 2 complete. Qualified CNAs can now see this shift.
              </p>
            ) : null}
          </ScreenCard>
        ) : (
          <ScreenCard>
            <p className="text-sm text-slate-600">
              Waiting for a facility staffing request.{" "}
              <Link
                href="/facility/requests"
                className="font-semibold text-teal-700"
              >
                Open Facility Requests
              </Link>
            </p>
          </ScreenCard>
        )}

        {mockStaffingRequests.map((request) => (
          <ScreenCard key={request.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-bold text-[#0D2B4D]">
                  {request.facilityName} · {request.unit}
                </h2>
                <p className="text-sm text-slate-600">
                  {request.locationName} · {request.date} · {request.startTime}–
                  {request.endTime}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Positions filled {request.filled}/{request.quantity}
                </p>
              </div>
              <StatusBadge label={request.status} tone="brand" />
            </div>
          </ScreenCard>
        ))}
      </div>
    </AdminShell>
  );
}
