"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import AdminShell from "@/components/admin/AdminShell";
import { useHandoffs } from "@/components/handoffs/HandoffProvider";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import {
  mockRequestPositions,
  mockStaffingRequests,
} from "@/lib/mock/v1-data";

export default function AdminRequestDetailPage() {
  const params = useParams<{ id: string }>();
  const { record, publishPositions, hydrated } = useHandoffs();
  const [publishedLocal, setPublishedLocal] = useState(false);

  const isHandoff = params.id === "req-handoff";
  const request = mockStaffingRequests.find((r) => r.id === params.id);
  const positions = mockRequestPositions.filter(
    (p) => p.requestId === (request?.id ?? "req-1001"),
  );

  const canPublishHandoff =
    isHandoff &&
    hydrated &&
    record.completedSteps.includes("facility_submitted") &&
    !record.completedSteps.includes("admin_published");
  const handoffPublished =
    isHandoff && hydrated && record.completedSteps.includes("admin_published");

  if (!request && !isHandoff) {
    return (
      <AdminShell title="Request Detail">
        <PageHeader title="Request not found" />
        <Link
          href="/admin/requests"
          className="text-sm font-semibold text-teal-700"
        >
          ← Back to Staffing Requests
        </Link>
      </AdminShell>
    );
  }

  const title = request
    ? `${request.facilityName} · ${request.unit}`
    : `${hydrated ? record.facilityName : "…"} · ${hydrated ? record.unit : "…"}`;
  const when = request
    ? `${request.date} · ${request.startTime}–${request.endTime}`
    : hydrated
      ? `${record.date} · ${record.startTime}–${record.endTime}`
      : "—";

  return (
    <AdminShell title="Request Detail">
      <PageHeader
        eyebrow="Staffing Requests"
        title={title}
        subtitle="Request Detail → Positions → Publish to Eligible CNAs"
      />

      <ScreenCard className="mb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm text-slate-600">{when}</p>
            <p className="mt-1 text-sm text-slate-600">
              {request
                ? `Filled ${request.filled}/${request.quantity}`
                : hydrated
                  ? `Needed ${record.quantity}`
                  : ""}
            </p>
          </div>
          <StatusBadge
            label={
              request?.status ??
              (handoffPublished || publishedLocal ? "Open" : "Submitted")
            }
            tone="brand"
          />
        </div>
      </ScreenCard>

      <ScreenCard className="mb-4">
        <h2 className="font-semibold text-[#0D2B4D]">Positions</h2>
        <ul className="mt-3 space-y-2">
          {(isHandoff
            ? [
                {
                  id: "pos-h-1",
                  label: "Position A",
                  status: handoffPublished || publishedLocal ? "Open" : "Draft",
                  assignee: null as string | null,
                },
              ]
            : positions
          ).map((position) => (
            <li
              key={position.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-100 px-3 py-2 text-sm"
            >
              <span className="font-medium text-[#0D2B4D]">{position.label}</span>
              <span className="text-slate-600">
                {position.assignee ?? "Unassigned"} · {position.status}
              </span>
            </li>
          ))}
        </ul>
      </ScreenCard>

      <ScreenCard>
        <h2 className="font-semibold text-[#0D2B4D]">
          Publish to Eligible CNAs
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Publishing makes open positions visible to Work Ready CNAs who match
          credentials and work areas.
        </p>
        <button
          type="button"
          disabled={
            isHandoff
              ? !canPublishHandoff
              : publishedLocal || request?.status === "Fully Staffed"
          }
          onClick={() => {
            if (isHandoff) publishPositions();
            else setPublishedLocal(true);
          }}
          className="mt-4 rounded-full bg-[#0FA3A3] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {handoffPublished || publishedLocal
            ? "Published to eligible CNAs"
            : "Publish to eligible CNAs"}
        </button>
      </ScreenCard>

      <p className="mt-5">
        <Link
          href="/admin/requests"
          className="text-sm font-semibold text-teal-700"
        >
          ← Back to Staffing Requests
        </Link>
      </p>
    </AdminShell>
  );
}
