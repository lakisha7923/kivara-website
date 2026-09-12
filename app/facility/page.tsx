import Link from "next/link";

import FacilityShell from "@/components/facility/FacilityShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import {
  CONFIRMED_FACILITY_COPY,
  mockAssignments,
  mockInvoices,
  mockStaffingRequests,
  mockTimesheets,
} from "@/lib/mock/v1-data";

export default function FacilityDashboardPage() {
  const openRequests = mockStaffingRequests.filter((r) =>
    ["Open", "Partially Filled", "Submitted"].includes(r.status)
  ).length;
  const confirmed = mockAssignments.filter((a) => a.status === "Confirmed");

  return (
    <FacilityShell title="Facility dashboard">
      <PageHeader
        eyebrow="Sunrise Care Center"
        title="Staffing overview"
        subtitle="Request staff, track fill status, review attendance and timesheets, and view invoices."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ScreenCard>
          <p className="text-sm text-slate-500">Open requests</p>
          <p className="mt-1 text-3xl font-bold text-[var(--kivara-navy)]">
            {openRequests}
          </p>
        </ScreenCard>
        <ScreenCard>
          <p className="text-sm text-slate-500">Confirmed assignments</p>
          <p className="mt-1 text-3xl font-bold text-[var(--kivara-navy)]">
            {confirmed.length}
          </p>
        </ScreenCard>
        <ScreenCard>
          <p className="text-sm text-slate-500">Timesheets to review</p>
          <p className="mt-1 text-3xl font-bold text-[var(--kivara-navy)]">
            {mockTimesheets.length}
          </p>
        </ScreenCard>
        <ScreenCard>
          <p className="text-sm text-slate-500">Invoices</p>
          <p className="mt-1 text-3xl font-bold text-[var(--kivara-navy)]">
            {mockInvoices.length}
          </p>
        </ScreenCard>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <ScreenCard>
          <h2 className="font-display text-xl font-bold text-[var(--kivara-navy)]">
            Quick actions
          </h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {[
              ["/facility/requests", "Request staff"],
              ["/facility/assignments", "View assignments"],
              ["/facility/attendance", "Today’s attendance"],
              ["/facility/timesheets", "Review timesheets"],
              ["/facility/invoices", "View invoices"],
              ["/facility/messages", "Message Kivara"],
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

        <ScreenCard className="border-teal-200 bg-teal-50/50">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal-800">
            {CONFIRMED_FACILITY_COPY}
          </p>
          {confirmed[0] ? (
            <>
              <h2 className="mt-2 text-lg font-bold text-[var(--kivara-navy)]">
                {confirmed[0].cnaName}
              </h2>
              <p className="text-sm text-slate-600">
                {confirmed[0].date} · {confirmed[0].startTime}–{confirmed[0].endTime} ·{" "}
                {confirmed[0].unit}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                No casual cancel button. Exception changes go through Kivara with
                a documented reason.
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm text-slate-600">No confirmed assignments yet.</p>
          )}
        </ScreenCard>
      </div>
    </FacilityShell>
  );
}
