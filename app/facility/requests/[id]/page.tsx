"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import FacilityShell from "@/components/facility/FacilityShell";
import { useHandoffs } from "@/components/handoffs/HandoffProvider";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockAssignments, mockStaffingRequests } from "@/lib/mock/v1-data";
import type { StaffingRequestStatus } from "@/types/kivara";

const STATUS_FLOW: StaffingRequestStatus[] = [
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

export default function FacilityRequestDetailPage() {
  const params = useParams<{ id: string }>();
  const { record, hydrated } = useHandoffs();
  const id = params.id;

  const mock = mockStaffingRequests.find((r) => r.id === id);
  const isSubmitted = id === "req-submitted";

  if (!mock && !isSubmitted) {
    return (
      <FacilityShell title="Request Detail">
        <PageHeader title="Request not found" />
        <Link href="/facility/requests" className="text-sm font-semibold text-teal-700">
          ← Back to Request Staff
        </Link>
      </FacilityShell>
    );
  }

  const status: StaffingRequestStatus = mock?.status ?? "Open";
  const title = mock
    ? `${mock.unit} · ${mock.locationName}`
    : `CNA — ${hydrated ? record.unit : "…"}`;
  const date = mock?.date ?? (hydrated ? record.date : "—");
  const start = mock?.startTime ?? (hydrated ? record.startTime : "—");
  const end = mock?.endTime ?? (hydrated ? record.endTime : "—");
  const filled = mock?.filled ?? 0;
  const quantity = mock?.quantity ?? (hydrated ? record.quantity : 0);
  const instructions =
    mock?.instructions ?? (hydrated ? record.instructions : "");
  const requirements = mock?.requirements ?? ["CNA License", "CPR / BLS"];
  const contact = mock?.contactName ?? "DON — Sarah Johnson";
  const linkedAssignments = mockAssignments.filter((a) => a.requestId === id);

  return (
    <FacilityShell title="Request Detail">
      <PageHeader
        eyebrow="Request Staff"
        title={title}
        subtitle={`${date} · ${start}–${end}`}
      />

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <StatusBadge label={status} tone={statusTone(status)} />
        <span className="text-sm text-slate-600">
          Filled {filled}/{quantity}
        </span>
      </div>

      <ScreenCard className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Status path
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {STATUS_FLOW.map((s) => (
            <span
              key={s}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                s === status
                  ? "bg-[#0D2B4D] text-white"
                  : "border border-slate-200 bg-white text-slate-600"
              }`}
            >
              {s}
            </span>
          ))}
        </div>
      </ScreenCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <ScreenCard>
          <h2 className="font-semibold text-[#0D2B4D]">Request details</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-3 border-b border-slate-100 py-2">
              <dt className="text-slate-500">Contact</dt>
              <dd className="font-medium">{contact}</dd>
            </div>
            {mock ? (
              <div className="flex justify-between gap-3 border-b border-slate-100 py-2">
                <dt className="text-slate-500">Rates</dt>
                <dd className="font-medium">
                  Pay ${mock.payRate}/hr · Bill ${mock.billRate}/hr
                </dd>
              </div>
            ) : null}
            <div className="border-b border-slate-100 py-2">
              <dt className="text-slate-500">Requirements</dt>
              <dd className="mt-1 font-medium">{requirements.join(" · ")}</dd>
            </div>
            <div className="py-2">
              <dt className="text-slate-500">Instructions</dt>
              <dd className="mt-1 text-slate-800">{instructions || "—"}</dd>
            </div>
          </dl>
        </ScreenCard>

        <ScreenCard>
          <h2 className="font-semibold text-[#0D2B4D]">Linked assignments</h2>
          {linkedAssignments.length === 0 ? (
            <p className="mt-3 text-sm text-slate-600">
              No confirmed CNAs yet. When Admin confirms, assignments appear under
              Active Assignments.
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {linkedAssignments.map((a) => (
                <li key={a.id}>
                  <Link
                    href={`/facility/assignments/${a.id}`}
                    className="block rounded-xl border border-slate-100 px-3 py-2 text-sm hover:border-[#0FA3A3]"
                  >
                    <p className="font-semibold text-[#0D2B4D]">{a.cnaName}</p>
                    <p className="text-xs text-slate-600">
                      {a.status} · {a.attendanceStatus}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link
            href="/facility/assignments"
            className="mt-4 inline-block text-sm font-semibold text-teal-700"
          >
            Open Active Assignments →
          </Link>
        </ScreenCard>
      </div>

      <p className="mt-5">
        <Link href="/facility/requests" className="text-sm font-semibold text-teal-700">
          ← Back to Request Staff
        </Link>
      </p>
    </FacilityShell>
  );
}
