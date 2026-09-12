"use client";

import Link from "next/link";

import FacilityShell from "@/components/facility/FacilityShell";
import {
  HandoffNotifications,
  HandoffRail,
} from "@/components/handoffs/HandoffChrome";
import { useHandoffs } from "@/components/handoffs/HandoffProvider";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockTimesheets } from "@/lib/mock/v1-data";

export default function FacilityTimesheetsPage() {
  const { record, hydrated } = useHandoffs();
  const canReview =
    hydrated &&
    record.completedSteps.includes("cna_clocked") &&
    !record.completedSteps.includes("timesheet_reviewed");
  const reviewed =
    hydrated && record.completedSteps.includes("timesheet_reviewed");

  return (
    <FacilityShell title="Timesheets">
      <HandoffRail portal="facility" />
      <HandoffNotifications portal="facility" />
      <PageHeader
        eyebrow="Hours review"
        title="Timesheets"
        subtitle="Review → Accept or Submit Discrepancy. Kivara gives final approval and lock."
      />

      <div className="space-y-4">
        {hydrated && record.clocked ? (
          <Link href="/facility/timesheets/ts-handoff">
            <ScreenCard className="transition hover:border-[#0FA3A3]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[#0FA3A3]">
                    Handoff timesheet · needs review
                  </p>
                  <h2 className="font-bold text-[#0D2B4D]">{record.cnaName}</h2>
                  <p className="text-sm text-slate-600">
                    {record.date} · {record.actualHours} hrs (scheduled{" "}
                    {record.scheduledHours})
                  </p>
                  {canReview ? (
                    <p className="mt-2 text-xs font-semibold text-amber-800">
                      Open to Accept or Submit Discrepancy
                    </p>
                  ) : null}
                </div>
                <StatusBadge
                  label={reviewed ? "Facility Reviewed" : "Submitted"}
                  tone={reviewed ? "success" : "warning"}
                />
              </div>
            </ScreenCard>
          </Link>
        ) : null}

        {mockTimesheets.map((sheet) => (
          <Link key={sheet.id} href={`/facility/timesheets/${sheet.id}`}>
            <ScreenCard className="transition hover:border-[#0FA3A3]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold text-[#0D2B4D]">{sheet.cnaName}</h2>
                  <p className="text-sm text-slate-600">
                    {sheet.date} · {sheet.actualHours} hrs (scheduled{" "}
                    {sheet.scheduledHours})
                  </p>
                </div>
                <StatusBadge label={sheet.status} tone="warning" />
              </div>
            </ScreenCard>
          </Link>
        ))}
      </div>
    </FacilityShell>
  );
}
