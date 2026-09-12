import FacilityShell from "@/components/facility/FacilityShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import {
  CONFIRMED_FACILITY_COPY,
  mockAssignments,
} from "@/lib/mock/v1-data";

export default function FacilityAssignmentsPage() {
  return (
    <FacilityShell title="Assignments">
      <PageHeader
        eyebrow="Confirmed coverage"
        title="Your confirmed assignments"
        subtitle="Confirmed means scheduled. Changes require a documented Kivara exception — not a casual cancel button."
      />

      <div className="space-y-3">
        {mockAssignments.map((assignment) => (
          <ScreenCard key={assignment.id}>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-teal-800">
              {CONFIRMED_FACILITY_COPY}
            </p>
            <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-[var(--kivara-navy)]">
                  {assignment.cnaName}
                </h2>
                <p className="text-sm text-slate-600">
                  {assignment.date} · {assignment.startTime}–{assignment.endTime}
                </p>
                <p className="text-sm text-slate-600">
                  {assignment.unit} · {assignment.locationName}
                </p>
              </div>
              <StatusBadge label={assignment.status} tone="success" />
            </div>
            <button
              type="button"
              className="mt-4 rounded-full border border-[var(--kivara-navy)] px-4 py-2 text-sm font-semibold text-[var(--kivara-navy)]"
            >
              Request emergency change via Kivara
            </button>
          </ScreenCard>
        ))}
      </div>
    </FacilityShell>
  );
}
