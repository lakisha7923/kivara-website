import Link from "next/link";

import CnaShell from "@/components/cna/CnaShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { CONFIRMED_CNA_COPY, mockAssignments } from "@/lib/mock/v1-data";

export default function CnaSchedulePage() {
  const upcoming = mockAssignments.filter((item) =>
    ["Confirmed", "Ready to Clock In", "Clocked In", "On Shift"].includes(
      item.status
    )
  );
  const recent = mockAssignments.filter(
    (item) => !upcoming.some((u) => u.id === item.id)
  );

  return (
    <CnaShell>
      <PageHeader
        eyebrow="Schedule"
        title="Upcoming confirmed shifts"
        subtitle="Upcoming → Confirmed Shift → Ready to Clock In → GPS Clock"
      />

      <div className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
          Upcoming
        </h2>
        {upcoming.map((assignment) => (
          <ScreenCard key={assignment.id}>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-teal-800">
              {CONFIRMED_CNA_COPY}
            </p>
            <h3 className="mt-1 text-lg font-bold text-[#0D2B4D]">
              {assignment.facilityName}
            </h3>
            <p className="text-sm text-slate-600">
              {assignment.date} · {assignment.startTime}–{assignment.endTime}
            </p>
            <p className="text-sm text-slate-600">
              {assignment.unit} · {assignment.locationName}
            </p>
            <div className="mt-3">
              <StatusBadge label={assignment.status} tone="brand" />
            </div>
            <div className="mt-4 flex gap-2">
              <Link
                href={`/cna/schedule/${assignment.id}`}
                className="rounded-full bg-[#0D2B4D] px-4 py-2 text-sm font-semibold text-white"
              >
                Confirmed shift
              </Link>
              <Link
                href={`/cna/clock/${assignment.id}`}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-[#0D2B4D]"
              >
                Ready to clock in
              </Link>
            </div>
          </ScreenCard>
        ))}

        {recent.length ? (
          <>
            <h2 className="pt-2 text-sm font-bold uppercase tracking-wide text-slate-500">
              Recent
            </h2>
            {recent.map((assignment) => (
              <ScreenCard key={assignment.id}>
                <h3 className="font-bold text-[#0D2B4D]">
                  {assignment.facilityName}
                </h3>
                <p className="text-sm text-slate-600">
                  {assignment.date} · {assignment.startTime}–{assignment.endTime}
                </p>
                <div className="mt-3">
                  <StatusBadge label={assignment.status} tone="neutral" />
                </div>
                <Link
                  href={`/cna/schedule/${assignment.id}`}
                  className="mt-3 inline-flex text-sm font-semibold text-teal-700"
                >
                  View details →
                </Link>
              </ScreenCard>
            ))}
          </>
        ) : null}
      </div>
    </CnaShell>
  );
}
