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
  const { record, facilityReviewTimesheet, hydrated } = useHandoffs();
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
        title="Review timesheets"
        subtitle="Accept hours or submit a documented discrepancy. Kivara gives final approval and lock."
      />

      <div className="space-y-4">
        {hydrated && record.clocked ? (
          <ScreenCard>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-[#0FA3A3]">
                  Handoff timesheet
                </p>
                <h2 className="font-bold text-[#0D2B4D]">{record.cnaName}</h2>
                <p className="text-sm text-slate-600">
                  {record.date} · {record.actualHours} hrs (scheduled{" "}
                  {record.scheduledHours})
                </p>
              </div>
              <StatusBadge
                label={reviewed ? "Facility Reviewed" : "Submitted"}
                tone={reviewed ? "success" : "warning"}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                disabled={!canReview}
                onClick={() => facilityReviewTimesheet(true)}
                className="rounded-full bg-[#0FA3A3] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                Accept hours
              </button>
              <button
                type="button"
                disabled={!canReview}
                onClick={() => facilityReviewTimesheet(false)}
                className="rounded-full border px-4 py-2 text-sm font-semibold disabled:opacity-50"
              >
                Flag discrepancy
              </button>
            </div>
            {reviewed ? (
              <p className="mt-3 text-sm font-medium text-emerald-700">
                Handoff 6 complete. Kivara can now approve & lock hours.{" "}
                <Link href="/admin/timesheets" className="underline">
                  Open Admin Timesheets
                </Link>
              </p>
            ) : null}
          </ScreenCard>
        ) : null}

        {mockTimesheets.map((sheet) => (
          <ScreenCard key={sheet.id}>
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
        ))}
      </div>
    </FacilityShell>
  );
}
