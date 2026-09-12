import Link from "next/link";

import CnaShell from "@/components/cna/CnaShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import {
  CONFIRMED_CNA_COPY,
  mockAssignments,
  mockAvailableShifts,
  mockCna,
  mockShiftRequests,
} from "@/lib/mock/v1-data";

export default function CnaHomePage() {
  const nextShift = mockAssignments.find((item) => item.status === "Confirmed");
  const openCount = mockAvailableShifts.filter((shift) => shift.eligible).length;
  const openRequest = mockShiftRequests[0];

  return (
    <CnaShell>
      <PageHeader
        eyebrow="CNA Home"
        title={`Hi, ${mockCna.fullName.split(" ")[0]}`}
        subtitle="Work Ready, action items, next confirmed shift, and pay status."
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
          <Link
            href="/cna/work-ready"
            className="mt-4 inline-flex text-sm font-semibold text-teal-700"
          >
            Work Ready details →
          </Link>
        </ScreenCard>

        {mockCna.actionItems.length > 0 ? (
          <ScreenCard>
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-bold text-[#0D2B4D]">Action items</h2>
              <StatusBadge
                label={`${mockCna.actionItems.length} open`}
                tone="warning"
              />
            </div>
            <ul className="mt-3 space-y-2">
              {mockCna.actionItems.map((item) => (
                <li
                  key={item}
                  className="rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-950"
                >
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/cna/credentials"
              className="mt-3 inline-flex text-sm font-semibold text-teal-700"
            >
              Open credentials →
            </Link>
          </ScreenCard>
        ) : null}

        {nextShift ? (
          <ScreenCard className="border-teal-200 bg-teal-50/70">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal-800">
              Next confirmed shift
            </p>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-teal-800">
              {CONFIRMED_CNA_COPY}
            </p>
            <h2 className="mt-2 text-lg font-bold text-[#0D2B4D]">
              {nextShift.facilityName}
            </h2>
            <p className="text-sm text-slate-600">
              {nextShift.date} · {nextShift.startTime}–{nextShift.endTime} ·{" "}
              {nextShift.unit}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href={`/cna/schedule/${nextShift.id}`}
                className="rounded-full bg-[#0D2B4D] px-4 py-2 text-sm font-semibold text-white"
              >
                Open confirmed shift
              </Link>
              <Link
                href={`/cna/clock/${nextShift.id}`}
                className="rounded-full border border-[#0D2B4D] px-4 py-2 text-sm font-semibold text-[#0D2B4D]"
              >
                Ready to clock in
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
            <p className="text-sm text-slate-600">Available shifts</p>
          </Link>
          <Link
            href="/cna/pay"
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <p className="text-2xl font-bold text-[#0D2B4D]">
              {mockCna.approvedHoursThisPeriod}h
            </p>
            <p className="text-sm text-slate-600">Hours / pay status</p>
          </Link>
        </div>

        {openRequest ? (
          <ScreenCard>
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-bold text-[#0D2B4D]">Request status</h2>
              <StatusBadge label={openRequest.status} tone="info" />
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Requested {openRequest.requestedAt}. A request is not a schedule
              until Kivara confirms.
            </p>
            <Link
              href={`/cna/shifts/${openRequest.shiftId}/status`}
              className="mt-3 inline-flex text-sm font-semibold text-teal-700"
            >
              View request status →
            </Link>
          </ScreenCard>
        ) : null}
      </div>
    </CnaShell>
  );
}
