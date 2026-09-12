"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import CnaShell from "@/components/cna/CnaShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { CONFIRMED_CNA_COPY, mockAssignments } from "@/lib/mock/v1-data";

export default function CnaClockPage() {
  const shift = useMemo(
    () => mockAssignments.find((item) => item.status === "Confirmed"),
    []
  );
  const [phase, setPhase] = useState<
    "ready" | "in" | "out" | "submitted"
  >("ready");

  if (!shift) {
    return (
      <CnaShell>
        <PageHeader title="Time clock" subtitle="No confirmed shift to clock." />
        <Link href="/cna/schedule" className="text-[var(--kivara-teal)]">
          Go to schedule
        </Link>
      </CnaShell>
    );
  }

  return (
    <CnaShell>
      <PageHeader
        eyebrow="GPS time clock"
        title="Clock in / out"
        subtitle="Clocking is tied to your confirmed assignment and facility geofence checks."
      />

      <ScreenCard className="border-teal-200 bg-teal-50/60">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-teal-800">
          {CONFIRMED_CNA_COPY}
        </p>
        <h2 className="mt-2 text-lg font-bold text-[var(--kivara-navy)]">
          {shift.facilityName}
        </h2>
        <p className="text-sm text-slate-600">
          {shift.date} · {shift.startTime}–{shift.endTime} · {shift.unit}
        </p>
        <p className="mt-1 text-sm text-slate-600">{shift.address}</p>
      </ScreenCard>

      <ScreenCard className="mt-4">
        <StatusBadge
          label={
            phase === "ready"
              ? "Ready to Clock In"
              : phase === "in"
                ? "Clocked In / On Shift"
                : phase === "out"
                  ? "Clocked Out"
                  : "Timesheet Submitted"
          }
          tone={phase === "submitted" ? "success" : "brand"}
        />
        <p className="mt-3 text-sm text-slate-600">
          GPS exceptions create a review flag — they do not automatically penalize
          you.
        </p>

        <div className="mt-5 space-y-3">
          {phase === "ready" ? (
            <button
              type="button"
              className="w-full rounded-full bg-[var(--kivara-teal)] py-3 font-semibold text-white"
              onClick={() => setPhase("in")}
            >
              Clock in (geofence check)
            </button>
          ) : null}
          {phase === "in" ? (
            <button
              type="button"
              className="w-full rounded-full bg-[var(--kivara-navy)] py-3 font-semibold text-white"
              onClick={() => setPhase("out")}
            >
              Clock out
            </button>
          ) : null}
          {phase === "out" ? (
            <button
              type="button"
              className="w-full rounded-full bg-emerald-600 py-3 font-semibold text-white"
              onClick={() => setPhase("submitted")}
            >
              Submit timesheet for review
            </button>
          ) : null}
          {phase === "submitted" ? (
            <p className="text-sm font-medium text-emerald-700">
              Timesheet submitted. Facility can review; Kivara gives final
              approval.
            </p>
          ) : null}
        </div>
      </ScreenCard>
    </CnaShell>
  );
}
