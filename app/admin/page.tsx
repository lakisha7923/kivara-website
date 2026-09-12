import Link from "next/link";

import AdminShell from "@/components/admin/AdminShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { adminLiveAttendance } from "@/lib/mock/attendance";
import {
  mockAdminAlerts,
  mockAtRiskShifts,
  mockAssignments,
  mockInvoices,
  mockOnboardingCna,
  mockPayrollBatches,
  mockStaffingRequests,
  mockTimesheets,
} from "@/lib/mock/v1-data";

const modules = [
  {
    href: "/admin/alerts",
    label: "Urgent Alerts",
    detail: `${mockAdminAlerts.filter((a) => a.severity === "urgent").length} urgent`,
  },
  {
    href: "/admin/requests",
    label: "Open Requests",
    detail: `${mockStaffingRequests.filter((r) => r.status === "Open" || r.status === "Partially Filled").length} open`,
  },
  {
    href: "/admin/assignments",
    label: "At-Risk Shifts",
    detail: `${mockAtRiskShifts.length} need attention`,
  },
  {
    href: "/admin/attendance",
    label: "Live Attendance",
    detail: `${adminLiveAttendance.filter((r) => r.status === "On Shift").length} on shift`,
  },
  {
    href: "/admin/cnas",
    label: "Credential Alerts",
    detail: `${mockOnboardingCna.credentials.filter((c) => c.status !== "Approved").length + 1} expiring / pending`,
  },
  {
    href: "/admin/timesheets",
    label: "Timesheets",
    detail: `${mockTimesheets.length} in review`,
  },
  {
    href: "/admin/payroll",
    label: "Payroll",
    detail: mockPayrollBatches[0]?.status ?? "Ready",
  },
  {
    href: "/admin/invoices",
    label: "Invoices",
    detail: `${mockInvoices.filter((i) => i.status === "Draft").length} drafts`,
  },
] as const;

export default function AdminDashboardPage() {
  return (
    <AdminShell title="Master Dashboard">
      <PageHeader
        eyebrow="Login + MFA → Master Dashboard"
        title="Master Dashboard"
        subtitle="Urgent Alerts · Open Requests · At-Risk Shifts · Live Attendance · Credential Alerts · Timesheets · Payroll · Invoices"
      />

      <section className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {modules.map((mod) => (
          <Link key={mod.href + mod.label} href={mod.href}>
            <ScreenCard className="h-full transition hover:border-[#0FA3A3]">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {mod.label}
              </p>
              <p className="mt-2 text-lg font-bold text-[#0D2B4D]">{mod.detail}</p>
              <p className="mt-2 text-sm font-semibold text-teal-700">Open →</p>
            </ScreenCard>
          </Link>
        ))}
      </section>

      <section className="mb-6 grid gap-4 lg:grid-cols-2">
        <ScreenCard>
          <h2 className="font-semibold text-[#0D2B4D]">Urgent Alerts</h2>
          <div className="mt-3 space-y-3">
            {mockAdminAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`rounded-xl border px-3 py-3 ${
                  alert.severity === "urgent"
                    ? "border-rose-200 bg-rose-50"
                    : alert.severity === "warning"
                      ? "border-amber-200 bg-amber-50"
                      : "border-slate-100 bg-slate-50"
                }`}
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
                <p className="mt-2 font-semibold text-[#0D2B4D]">{alert.title}</p>
                <p className="mt-1 text-sm text-slate-600">{alert.detail}</p>
              </div>
            ))}
          </div>
        </ScreenCard>

        <ScreenCard>
          <h2 className="font-semibold text-[#0D2B4D]">At-Risk Shifts</h2>
          <div className="mt-3 space-y-3">
            {mockAtRiskShifts.map((shift) => (
              <div
                key={shift.id}
                className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-3"
              >
                <p className="font-semibold text-[#0D2B4D]">
                  {shift.facilityName} · {shift.unit}
                </p>
                <p className="text-sm text-slate-600">{shift.when}</p>
                <p className="mt-1 text-sm text-amber-900">{shift.reason}</p>
              </div>
            ))}
          </div>
          <Link
            href="/admin/assignments"
            className="mt-4 inline-flex text-sm font-semibold text-teal-700"
          >
            Open Assignments →
          </Link>
        </ScreenCard>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <ScreenCard>
          <p className="text-sm text-slate-500">Confirmed assignments</p>
          <p className="text-3xl font-bold text-[#0D2B4D]">
            {mockAssignments.filter((a) => a.status === "Confirmed").length}
          </p>
        </ScreenCard>
        <ScreenCard>
          <p className="text-sm text-slate-500">Live on shift</p>
          <p className="text-3xl font-bold text-[#0D2B4D]">
            {adminLiveAttendance.filter((r) => r.status === "On Shift").length}
          </p>
        </ScreenCard>
        <ScreenCard>
          <p className="text-sm text-slate-500">Payroll-ready batch</p>
          <p className="text-3xl font-bold text-[#0D2B4D]">
            ${mockPayrollBatches[0].amount.toLocaleString()}
          </p>
        </ScreenCard>
      </section>
    </AdminShell>
  );
}
