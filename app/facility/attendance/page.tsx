import FacilityShell from "@/components/facility/FacilityShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockAssignments } from "@/lib/mock/v1-data";

export default function FacilityAttendancePage() {
  return (
    <FacilityShell title="Attendance">
      <PageHeader
        eyebrow="Today’s roster"
        title="Operational attendance"
        subtitle="Facilities see work status (Scheduled, Clocked In, On Shift, Clocked Out) — not unrestricted GPS history."
      />

      <div className="space-y-3">
        {mockAssignments.map((assignment) => (
          <ScreenCard key={assignment.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-bold text-[var(--kivara-navy)]">
                  {assignment.cnaName}
                </h2>
                <p className="text-sm text-slate-600">
                  {assignment.unit} · {assignment.startTime}–{assignment.endTime}
                </p>
              </div>
              <StatusBadge label={assignment.attendanceStatus} tone="info" />
            </div>
          </ScreenCard>
        ))}
      </div>
    </FacilityShell>
  );
}
