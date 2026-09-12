import AdminShell from "@/components/admin/AdminShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockStaffingRequests } from "@/lib/mock/v1-data";

export default function AdminRequestsPage() {
  return (
    <AdminShell title="Staffing requests">
      <PageHeader
        eyebrow="Requests"
        title="Facility staffing requests"
        subtitle="Review submitted needs, publish eligible positions, and track fill status by position."
      />
      <div className="space-y-3">
        {mockStaffingRequests.map((request) => (
          <ScreenCard key={request.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-bold text-[var(--kivara-navy)]">
                  {request.facilityName} · {request.unit}
                </h2>
                <p className="text-sm text-slate-600">
                  {request.locationName} · {request.date} · {request.startTime}–
                  {request.endTime}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Positions filled {request.filled}/{request.quantity}
                </p>
              </div>
              <StatusBadge label={request.status} tone="brand" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-full bg-[var(--kivara-navy)] px-4 py-2 text-sm font-semibold text-white"
              >
                Publish to eligible CNAs
              </button>
              <button
                type="button"
                className="rounded-full border px-4 py-2 text-sm font-semibold"
              >
                Open request detail
              </button>
            </div>
          </ScreenCard>
        ))}
      </div>
    </AdminShell>
  );
}
