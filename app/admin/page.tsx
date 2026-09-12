import Link from "next/link";

import AdminShell from "@/components/admin/AdminShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import {
  CONFIRM_ADMIN_ACTION,
  mockAdminAlerts,
  mockAssignments,
  mockShiftRequests,
  mockStaffingRequests,
  mockTimesheets,
} from "@/lib/mock/v1-data";

export default function AdminDashboardPage() {
  return (
    <AdminShell title="Command center">
      <PageHeader
        eyebrow="Master Admin"
        title="Kivara operations dashboard"
        subtitle="Urgent staffing, credentials, attendance, timesheets, payroll-ready hours, and invoices."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {mockAdminAlerts.map((alert) => (
          <ScreenCard
            key={alert.id}
            className={
              alert.severity === "urgent"
                ? "border-rose-200 bg-rose-50"
                : alert.severity === "warning"
                  ? "border-amber-200 bg-amber-50"
                  : ""
            }
          >
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
            <h2 className="mt-3 font-bold text-[var(--kivara-navy)]">
              {alert.title}
            </h2>
            <p className="mt-1 text-sm text-slate-600">{alert.detail}</p>
          </ScreenCard>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ScreenCard>
          <p className="text-sm text-slate-500">Open requests</p>
          <p className="text-3xl font-bold">{mockStaffingRequests.length}</p>
        </ScreenCard>
        <ScreenCard>
          <p className="text-sm text-slate-500">Shift requests to review</p>
          <p className="text-3xl font-bold">{mockShiftRequests.length}</p>
        </ScreenCard>
        <ScreenCard>
          <p className="text-sm text-slate-500">Confirmed assignments</p>
          <p className="text-3xl font-bold">
            {mockAssignments.filter((a) => a.status === "Confirmed").length}
          </p>
        </ScreenCard>
        <ScreenCard>
          <p className="text-sm text-slate-500">Timesheets pending</p>
          <p className="text-3xl font-bold">{mockTimesheets.length}</p>
        </ScreenCard>
      </div>

      <ScreenCard className="mt-6">
        <h2 className="font-display text-xl font-bold text-[var(--kivara-navy)]">
          Priority actions
        </h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["/admin/requests", "Review staffing requests"],
            ["/admin/assignments", CONFIRM_ADMIN_ACTION],
            ["/admin/cnas", "Credential / Work Ready"],
            ["/admin/timesheets", "Approve & lock timesheets"],
            ["/admin/invoices", "Draft facility invoices"],
            ["/admin/audit", "View audit history"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="rounded-xl bg-[var(--kivara-aqua)] px-4 py-3 text-sm font-semibold text-[var(--kivara-navy)]"
            >
              {label} →
            </Link>
          ))}
        </div>
      </ScreenCard>
    </AdminShell>
  );
}
