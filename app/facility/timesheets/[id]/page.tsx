"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import FacilityShell from "@/components/facility/FacilityShell";
import { useHandoffs } from "@/components/handoffs/HandoffProvider";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockTimesheets } from "@/lib/mock/v1-data";

export default function FacilityTimesheetDetailPage() {
  const params = useParams<{ id: string }>();
  const { record, facilityReviewTimesheet, hydrated } = useHandoffs();
  const [localDecision, setLocalDecision] = useState<"accept" | "discrepancy" | null>(
    null,
  );
  const [discrepancyNote, setDiscrepancyNote] = useState("");

  const isHandoff = params.id === "ts-handoff";
  const sheet = mockTimesheets.find((t) => t.id === params.id);

  if (!sheet && !isHandoff) {
    return (
      <FacilityShell title="Timesheet Review">
        <PageHeader title="Timesheet not found" />
        <Link href="/facility/timesheets" className="text-sm font-semibold text-teal-700">
          ← Back to Timesheets
        </Link>
      </FacilityShell>
    );
  }

  const canReviewHandoff =
    isHandoff &&
    hydrated &&
    record.completedSteps.includes("cna_clocked") &&
    !record.completedSteps.includes("timesheet_reviewed");
  const reviewedHandoff =
    isHandoff &&
    hydrated &&
    record.completedSteps.includes("timesheet_reviewed");
  const canReviewMock = Boolean(sheet) && !localDecision;
  const canReview = canReviewHandoff || canReviewMock;

  const cnaName = sheet?.cnaName ?? (hydrated ? record.cnaName : "—");
  const date = sheet?.date ?? (hydrated ? record.date : "—");
  const actual = sheet?.actualHours ?? (hydrated ? record.actualHours : 0);
  const scheduled =
    sheet?.scheduledHours ?? (hydrated ? record.scheduledHours : 0);
  const status =
    localDecision === "accept"
      ? "Facility Reviewed"
      : localDecision === "discrepancy"
        ? "Disputed"
        : reviewedHandoff
          ? "Facility Reviewed"
          : sheet?.status ?? "Submitted";

  function accept() {
    if (isHandoff) facilityReviewTimesheet(true);
    else setLocalDecision("accept");
  }

  function submitDiscrepancy() {
    if (isHandoff) facilityReviewTimesheet(false);
    else setLocalDecision("discrepancy");
  }

  return (
    <FacilityShell title="Timesheet Review">
      <PageHeader
        eyebrow="Timesheets"
        title={`Review · ${cnaName}`}
        subtitle="Accept hours or submit a documented discrepancy"
      />

      <ScreenCard className="mb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#0D2B4D]">{cnaName}</h2>
            <p className="mt-1 text-sm text-slate-600">{date}</p>
            <p className="mt-2 text-sm text-slate-700">
              Scheduled {scheduled} hrs · Actual {actual} hrs
            </p>
          </div>
          <StatusBadge
            label={status}
            tone={
              status === "Disputed"
                ? "danger"
                : status === "Facility Reviewed"
                  ? "success"
                  : "warning"
            }
          />
        </div>
      </ScreenCard>

      <ScreenCard>
        <h2 className="font-semibold text-[#0D2B4D]">Review decision</h2>
        <p className="mt-2 text-sm text-slate-600">
          Accept confirms the hours for Kivara approval. Submit Discrepancy
          flags a documented exception.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={!canReview}
            onClick={accept}
            className="rounded-full bg-[#0FA3A3] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          >
            Accept
          </button>
          <button
            type="button"
            disabled={!canReview}
            onClick={() => {
              if (!discrepancyNote.trim() && !isHandoff) return;
              submitDiscrepancy();
            }}
            className="rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold disabled:opacity-50"
          >
            Submit Discrepancy
          </button>
        </div>
        {!isHandoff ? (
          <label className="mt-4 block text-sm">
            <span className="mb-1 block font-medium text-slate-700">
              Discrepancy notes (required to flag)
            </span>
            <textarea
              value={discrepancyNote}
              onChange={(e) => setDiscrepancyNote(e.target.value)}
              rows={3}
              disabled={!canReview}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 disabled:bg-slate-50"
              placeholder="Describe the hours or punch issue…"
            />
          </label>
        ) : null}
        {(reviewedHandoff || localDecision) && (
          <p className="mt-4 text-sm font-medium text-emerald-700">
            {localDecision === "discrepancy"
              ? "Discrepancy submitted to Kivara."
              : "Hours accepted. Kivara can approve & lock."}
          </p>
        )}
      </ScreenCard>

      <p className="mt-5">
        <Link href="/facility/timesheets" className="text-sm font-semibold text-teal-700">
          ← Back to Timesheets
        </Link>
      </p>
    </FacilityShell>
  );
}
