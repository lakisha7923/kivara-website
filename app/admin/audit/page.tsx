import AdminShell from "@/components/admin/AdminShell";
import { PageHeader, ScreenCard } from "@/components/ui/primitives";
import { mockAuditEvents } from "@/lib/mock/v1-data";

export default function AdminAuditPage() {
  return (
    <AdminShell title="Audit history">
      <PageHeader
        eyebrow="Compliance"
        title="Sensitive action audit trail"
        subtitle="Who changed what, when, previous value, new value, and reason when required."
      />
      <div className="space-y-3">
        {mockAuditEvents.map((event) => (
          <ScreenCard key={event.id}>
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
              {event.at}
            </p>
            <h2 className="mt-1 font-bold text-[var(--kivara-navy)]">
              {event.action}
            </h2>
            <p className="text-sm text-slate-600">
              {event.actor} · {event.recordType} {event.recordId}
            </p>
            <p className="mt-2 text-sm text-slate-700">
              {event.previousValue} → {event.newValue}
            </p>
            {event.reason ? (
              <p className="mt-1 text-sm text-slate-600">Reason: {event.reason}</p>
            ) : null}
          </ScreenCard>
        ))}
      </div>
    </AdminShell>
  );
}
