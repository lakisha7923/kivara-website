import Link from "next/link";

import CnaShell from "@/components/cna/CnaShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import {
  CONFIRMED_CNA_COPY,
  mockAssignments,
  mockAvailableShifts,
  mockCna,
} from "@/lib/mock/v1-data";

export default function CnaHomePage() {
  const nextShift = mockAssignments.find((item) => item.status === "Confirmed");
  const openCount = mockAvailableShifts.filter((shift) => shift.eligible).length;

  return (
    <CnaShell>
      <PageHeader
        eyebrow="CNA Home"
        title={`Hi, ${mockCna.fullName.split(" ")[0]}`}
        subtitle="Work Ready status, next confirmed shift, and action items."
      />

      <div className="space-y-4">
        <ScreenCard>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">Work Ready</p>
              <p className="text-lg font-bold text-[#0D2B4D]">
                {mockCna.workReady ? "Ready for eligible shifts" : "Action needed"}
              </p>
            </div>
            <StatusBadge
              label={mockCna.status}
              tone={mockCna.workReady ? "success" : "warning"}
            />
          </div>
          <p className="mt-3 text-sm text-slate-600">
            You only see and can request shifts you are eligible to work.
          </p>
        </ScreenCard>

        {nextShift ? (
          <ScreenCard className="border-teal-200 bg-teal-50/70">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal-800">
              {CONFIRMED_CNA_COPY}
            </p>
            <h2 className="mt-2 text-lg font-bold text-[#0D2B4D]">
              {nextShift.facilityName}
            </h2>
            <p className="text-sm text-slate-600">
              {nextShift.date} · {nextShift.startTime}–{nextShift.endTime} ·{" "}
              {nextShift.unit}
            </p>
            <div className="mt-4 flex gap-2">
              <Link
                href={`/cna/schedule/${nextShift.id}`}
                className="rounded-full bg-[#0D2B4D] px-4 py-2 text-sm font-semibold text-white"
              >
                Open shift
              </Link>
              <Link
                href={`/cna/clock/${nextShift.id}`}
                className="rounded-full border border-[#0D2B4D] px-4 py-2 text-sm font-semibold text-[#0D2B4D]"
              >
                Time clock
              </Link>
            </div>
          </ScreenCard>
        ) : null}

        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/cna/shifts"
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <p className="text-2xl font-bold text-teal-700">{openCount}</p>
            <p className="text-sm text-slate-600">Eligible shifts</p>
          </Link>
          <Link
            href="/cna/pay"
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <p className="text-2xl font-bold text-[#0D2B4D]">
              {mockCna.approvedHoursThisPeriod}h
            </p>
            <p className="text-sm text-slate-600">Approved hours</p>
          </Link>
        </div>
      </div>
    </CnaShell>
  );
}
