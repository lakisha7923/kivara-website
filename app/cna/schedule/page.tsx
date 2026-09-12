import Link from "next/link";

import CnaShell from "@/components/cna/CnaShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { CONFIRMED_CNA_COPY, mockAssignments } from "@/lib/mock/v1-data";

export default function CnaSchedulePage() {
  return (
    <CnaShell>
      <PageHeader
        eyebrow="Schedule"
        title="Confirmed shifts"
        subtitle="Confirmed means you are scheduled to work."
      />

      <div className="space-y-3">
        {mockAssignments.map((assignment) => (
          <ScreenCard key={assignment.id}>
            {["Confirmed", "Ready to Clock In", "Clocked In", "On Shift"].includes(
              assignment.status
            ) ? (
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-teal-800">
                {CONFIRMED_CNA_COPY}
              </p>
            ) : null}
            <h2 className="mt-1 text-lg font-bold text-[#0D2B4D]">
              {assignment.facilityName}
            </h2>
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
                Open
              </Link>
              <Link
                href={`/cna/clock/${assignment.id}`}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-[#0D2B4D]"
              >
                Clock
              </Link>
            </div>
          </ScreenCard>
        ))}
      </div>
    </CnaShell>
  );
}
