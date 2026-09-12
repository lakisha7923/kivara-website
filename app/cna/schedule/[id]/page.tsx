import Link from "next/link";
import { notFound } from "next/navigation";

import CnaShell from "@/components/cna/CnaShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { CONFIRMED_CNA_COPY, mockAssignments } from "@/lib/mock/v1-data";

export default async function CnaConfirmedShiftPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const assignment = mockAssignments.find((item) => item.id === id);
  if (!assignment) notFound();

  const canClock = [
    "Confirmed",
    "Ready to Clock In",
    "Clocked In",
    "On Shift",
  ].includes(assignment.status);

  return (
    <CnaShell>
      <PageHeader
        eyebrow="Confirmed shift"
        title={assignment.facilityName}
        subtitle={`${assignment.date} · ${assignment.startTime}–${assignment.endTime}`}
      />

      <div className="space-y-4">
        <ScreenCard className="border-teal-200 bg-teal-50/70">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-teal-800">
            {CONFIRMED_CNA_COPY}
          </p>
          <div className="mt-3">
            <StatusBadge label={assignment.status} tone="success" />
          </div>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500">Location</dt>
              <dd className="font-medium text-[#0D2B4D]">
                {assignment.locationName}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500">Unit</dt>
              <dd className="font-medium text-[#0D2B4D]">{assignment.unit}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500">Address</dt>
              <dd className="text-right font-medium text-[#0D2B4D]">
                {assignment.address}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500">Pay</dt>
              <dd className="font-medium text-[#0D2B4D]">
                ${assignment.payRate.toFixed(2)}/hr
              </dd>
            </div>
          </dl>
        </ScreenCard>

        <ScreenCard>
          <h2 className="font-bold text-[#0D2B4D]">Clock flow</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
            <li>Ready to Clock In</li>
            <li>GPS Check</li>
            <li>Clocked In</li>
            <li>On Shift</li>
            <li>Clock Out</li>
            <li>Timesheet Review → Submitted</li>
          </ol>
          {canClock ? (
            <Link
              href={`/cna/clock/${assignment.id}`}
              className="mt-4 flex w-full items-center justify-center rounded-full bg-[#0FA3A3] py-3 text-sm font-semibold text-white"
            >
              Ready to Clock In
            </Link>
          ) : (
            <Link
              href="/cna/pay"
              className="mt-4 flex w-full items-center justify-center rounded-full border border-slate-300 py-3 text-sm font-semibold text-[#0D2B4D]"
            >
              View timesheet / pay status
            </Link>
          )}
        </ScreenCard>

        <Link href="/cna/schedule" className="text-sm font-semibold text-teal-700">
          ← Back to schedule
        </Link>
      </div>
    </CnaShell>
  );
}
