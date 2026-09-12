"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import CnaShell from "@/components/cna/CnaShell";
import {
  HandoffNotifications,
  HandoffRail,
} from "@/components/handoffs/HandoffChrome";
import { useHandoffs } from "@/components/handoffs/HandoffProvider";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockAvailableShifts } from "@/lib/mock/v1-data";

export default function CnaShiftDetailPage() {
  const params = useParams<{ id: string }>();
  const { record, requestShift, hydrated, copy } = useHandoffs();
  const [localRequested, setLocalRequested] = useState(false);

  const isHandoff =
    params.id === record.shiftId || params.id === "handoff-shift-1";

  const shift = isHandoff
    ? {
        id: record.shiftId,
        facilityName: record.facilityName,
        locationName: record.locationName,
        unit: record.unit,
        date: record.date,
        startTime: record.startTime,
        endTime: record.endTime,
        payRate: record.payRate,
        requirements: record.requirements,
        instructions: record.instructions,
        eligible: true,
      }
    : mockAvailableShifts.find((item) => item.id === params.id);

  if (!shift) {
    return (
      <CnaShell>
        <PageHeader title="Shift not found" />
        <Link href="/cna/shifts" className="text-teal-700">
          Back to shifts
        </Link>
      </CnaShell>
    );
  }

  const canRequest =
    isHandoff &&
    hydrated &&
    record.completedSteps.includes("admin_published") &&
    !record.completedSteps.includes("cna_requested");
  const requested =
    (isHandoff && record.completedSteps.includes("cna_requested")) ||
    localRequested;
  const confirmed = isHandoff && record.confirmed;

  return (
    <CnaShell>
      <HandoffRail portal="cna" />
      <HandoffNotifications portal="cna" />
      <PageHeader
        eyebrow="Shift details"
        title={shift.facilityName}
        subtitle={`${shift.date} · ${shift.startTime}–${shift.endTime}`}
      />

      <div className="space-y-4">
        {confirmed ? (
          <ScreenCard>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-800">
              {copy.cnaConfirmed}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              This shift is locked on your schedule.
            </p>
            <Link
              href={`/cna/clock/${record.assignmentId}`}
              className="mt-3 inline-flex rounded-full bg-[#0D2B4D] px-4 py-2 text-sm font-semibold text-white"
            >
              Open GPS time clock
            </Link>
          </ScreenCard>
        ) : null}

        <ScreenCard>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-slate-500">Location</dt>
              <dd className="font-medium text-[#0D2B4D]">{shift.locationName}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Unit</dt>
              <dd className="font-medium text-[#0D2B4D]">{shift.unit}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Pay</dt>
              <dd className="font-medium text-[#0D2B4D]">
                ${shift.payRate.toFixed(2)}/hr
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Requirements</dt>
              <dd className="font-medium text-[#0D2B4D]">
                {shift.requirements.join(" · ")}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Instructions</dt>
              <dd className="font-medium text-[#0D2B4D]">{shift.instructions}</dd>
            </div>
          </dl>

          <div className="mt-4">
            <StatusBadge
              label={
                confirmed
                  ? "Confirmed"
                  : requested
                    ? "Requested"
                    : "Eligible"
              }
              tone={confirmed ? "success" : requested ? "warning" : "brand"}
            />
          </div>

          {!confirmed ? (
            <button
              type="button"
              disabled={isHandoff ? !canRequest : requested}
              onClick={() => {
                if (isHandoff) requestShift();
                else setLocalRequested(true);
              }}
              className="mt-4 w-full rounded-full bg-[#0FA3A3] py-3 text-sm font-semibold text-white disabled:opacity-50"
            >
              {requested ? "Request submitted" : "Request this shift"}
            </button>
          ) : null}

          {isHandoff && !record.completedSteps.includes("admin_published") ? (
            <p className="mt-3 text-xs text-amber-700">
              Not published yet. Admin must publish eligible positions first.
            </p>
          ) : null}

          {requested && !confirmed ? (
            <p className="mt-3 text-sm font-medium text-emerald-700">
              Handoff 3 complete. A request is not a schedule until Admin
              confirms.
            </p>
          ) : null}
        </ScreenCard>
      </div>
    </CnaShell>
  );
}
