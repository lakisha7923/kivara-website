"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import CnaShell from "@/components/cna/CnaShell";
import { useHandoffs } from "@/components/handoffs/HandoffProvider";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockAvailableShifts, mockShiftRequests } from "@/lib/mock/v1-data";

export default function CnaShiftRequestStatusPage() {
  const params = useParams<{ id: string }>();
  const { record, hydrated } = useHandoffs();

  const shift =
    mockAvailableShifts.find((item) => item.id === params.id) ??
    (params.id === record.shiftId
      ? {
          id: record.shiftId,
          facilityName: record.facilityName,
          locationName: record.locationName,
          date: record.date,
          startTime: record.startTime,
          endTime: record.endTime,
        }
      : null);

  const request = mockShiftRequests.find((item) => item.shiftId === params.id);
  const handoffRequested =
    hydrated && params.id === record.shiftId && record.cnaRequested;
  const handoffConfirmed =
    hydrated && params.id === record.shiftId && record.confirmed;

  const status = handoffConfirmed
    ? "Confirmed"
    : handoffRequested
      ? "Under Review"
      : request?.status ?? "Requested";

  return (
    <CnaShell>
      <PageHeader
        eyebrow="Request status"
        title={shift?.facilityName ?? "Shift request"}
        subtitle="A request is not a schedule until Kivara confirms the assignment."
      />

      <div className="space-y-4">
        <ScreenCard>
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold text-[#0D2B4D]">Current status</p>
            <StatusBadge
              label={status}
              tone={
                status === "Confirmed"
                  ? "success"
                  : status === "Under Review" || status === "Requested"
                    ? "warning"
                    : "neutral"
              }
            />
          </div>
          {shift ? (
            <p className="mt-3 text-sm text-slate-600">
              {shift.date} · {shift.startTime}–{shift.endTime}
              {"locationName" in shift && shift.locationName
                ? ` · ${shift.locationName}`
                : ""}
            </p>
          ) : null}
          {request ? (
            <p className="mt-2 text-sm text-slate-500">
              Submitted {request.requestedAt}
            </p>
          ) : null}
        </ScreenCard>

        <ScreenCard>
          <h2 className="font-bold text-[#0D2B4D]">What happens next</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
            <li>Kivara reviews eligibility and open positions.</li>
            <li>If selected, your schedule shows CONFIRMED.</li>
            <li>If not selected, you can request another eligible shift.</li>
          </ol>
        </ScreenCard>

        <div className="flex flex-wrap gap-2">
          <Link
            href={`/cna/shifts/${params.id}`}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-[#0D2B4D]"
          >
            Back to shift details
          </Link>
          {status === "Confirmed" ? (
            <Link
              href="/cna/schedule"
              className="rounded-full bg-[#0D2B4D] px-4 py-2 text-sm font-semibold text-white"
            >
              Open schedule
            </Link>
          ) : (
            <Link
              href="/cna/shifts"
              className="rounded-full bg-[#0D2B4D] px-4 py-2 text-sm font-semibold text-white"
            >
              Browse shifts
            </Link>
          )}
        </div>
      </div>
    </CnaShell>
  );
}
