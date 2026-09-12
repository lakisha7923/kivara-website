"use client";

import { useState } from "react";

import FacilityShell from "@/components/facility/FacilityShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockTimesheets } from "@/lib/mock/v1-data";

export default function FacilityTimesheetsPage() {
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <FacilityShell title="Timesheets">
      <PageHeader
        eyebrow="Hours review"
        title="Review timesheets"
        subtitle="Accept hours or submit a documented discrepancy. Kivara gives final approval and lock."
      />

      <div className="space-y-4">
        {mockTimesheets.map((sheet) => (
          <ScreenCard key={sheet.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-bold text-[var(--kivara-navy)]">
                  {sheet.cnaName}
                </h2>
                <p className="text-sm text-slate-600">
                  {sheet.date} · {sheet.actualHours} hrs (scheduled{" "}
                  {sheet.scheduledHours})
                </p>
              </div>
              <StatusBadge label={sheet.status} tone="warning" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-full bg-[var(--kivara-teal)] px-4 py-2 text-sm font-semibold text-white"
              >
                Accept hours
              </button>
              <button
                type="button"
                className="rounded-full border border-[var(--kivara-navy)] px-4 py-2 text-sm font-semibold"
                onClick={() => setSent(false)}
              >
                Flag discrepancy
              </button>
            </div>
            <textarea
              className="mt-3 min-h-20 w-full rounded-xl border px-3 py-2 text-sm"
              placeholder="Discrepancy reason (required for disputes)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <button
              type="button"
              className="mt-2 text-sm font-semibold text-[var(--kivara-teal)]"
              onClick={() => setSent(true)}
            >
              Submit discrepancy to Kivara
            </button>
            {sent ? (
              <p className="mt-2 text-sm text-emerald-700">
                Discrepancy recorded for audit review (prototype).
              </p>
            ) : null}
          </ScreenCard>
        ))}
      </div>
    </FacilityShell>
  );
}
