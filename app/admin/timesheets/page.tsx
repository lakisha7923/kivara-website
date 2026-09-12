"use client";

import { useState } from "react";

import AdminShell from "@/components/admin/AdminShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockTimesheets } from "@/lib/mock/v1-data";

export default function AdminTimesheetsPage() {
  const [locked, setLocked] = useState(false);

  return (
    <AdminShell title="Timesheets">
      <PageHeader
        eyebrow="Time & money"
        title="Approve and lock hours"
        subtitle="Kivara final-approves timesheets. Locked hours feed payroll-ready data and facility invoices."
      />

      <div className="space-y-3">
        {mockTimesheets.map((sheet) => (
          <ScreenCard key={sheet.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-bold text-[var(--kivara-navy)]">
                  {sheet.cnaName}
                </h2>
                <p className="text-sm text-slate-600">
                  {sheet.facilityName} · {sheet.date}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Actual {sheet.actualHours} hrs · Scheduled {sheet.scheduledHours}{" "}
                  hrs
                </p>
              </div>
              <StatusBadge
                label={locked ? "Locked" : sheet.status}
                tone={locked ? "success" : "warning"}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-full bg-[var(--kivara-teal)] px-4 py-2 text-sm font-semibold text-white"
                onClick={() => setLocked(true)}
              >
                Approve & lock
              </button>
              <button
                type="button"
                className="rounded-full border px-4 py-2 text-sm font-semibold"
              >
                Correct with audit reason
              </button>
            </div>
            {locked ? (
              <p className="mt-3 text-sm text-emerald-700">
                Hours locked. Payroll-ready record + invoice draft can be created
                from this approved total.
              </p>
            ) : null}
          </ScreenCard>
        ))}
      </div>
    </AdminShell>
  );
}
