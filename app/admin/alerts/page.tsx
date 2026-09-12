import Link from "next/link";

import AdminShell from "@/components/admin/AdminShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockAdminAlerts, mockAtRiskShifts } from "@/lib/mock/v1-data";

export default function AdminAlertsPage() {
  return (
    <AdminShell title="Alerts">
      <PageHeader
        eyebrow="Operations"
        title="Alerts"
        subtitle="Urgent coverage, credential, and timesheet risks."
      />
      <div className="space-y-3">
        {mockAdminAlerts.map((alert) => (
          <ScreenCard key={alert.id}>
            <StatusBadge
              label={alert.severity}
              tone={
                alert.severity === "urgent"
                  ? "danger"
                  : alert.severity === "warning"
                    ? "warning"
                    : "info"
              }
            />
            <h2 className="mt-2 font-bold text-[#0D2B4D]">{alert.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{alert.detail}</p>
          </ScreenCard>
        ))}
      </div>
      <ScreenCard className="mt-4">
        <h2 className="font-semibold text-[#0D2B4D]">At-risk shifts</h2>
        <ul className="mt-3 space-y-2">
          {mockAtRiskShifts.map((shift) => (
            <li key={shift.id} className="rounded-xl bg-amber-50 px-3 py-2 text-sm">
              <p className="font-semibold text-[#0D2B4D]">
                {shift.facilityName} · {shift.unit}
              </p>
              <p className="text-slate-600">{shift.when}</p>
              <p className="text-amber-900">{shift.reason}</p>
            </li>
          ))}
        </ul>
        <Link href="/admin/assignments" className="mt-3 inline-flex text-sm font-semibold text-teal-700">
          Open Assignments →
        </Link>
      </ScreenCard>
    </AdminShell>
  );
}
