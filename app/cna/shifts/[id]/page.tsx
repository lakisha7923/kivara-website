"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import CnaShell from "@/components/cna/CnaShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockAvailableShifts } from "@/lib/mock/v1-data";

export default function CnaShiftDetailPage() {
  const params = useParams<{ id: string }>();
  const shift = mockAvailableShifts.find((item) => item.id === params.id);
  const [requested, setRequested] = useState(false);

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

  return (
    <CnaShell>
      <PageHeader
        eyebrow="Shift Details"
        title={shift.facilityName}
        subtitle={`${shift.date} · ${shift.startTime}–${shift.endTime}`}
      />

      <div className="space-y-4">
        <ScreenCard>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-slate-500">Location</dt>
              <dd className="font-medium text-[#0D2B4D]">
                {shift.locationName}
                <br />
                {shift.address}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Unit / Pay</dt>
              <dd className="font-medium text-[#0D2B4D]">
                {shift.unit} · ${shift.payRate}/hr
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
        </ScreenCard>

        <ScreenCard>
          <StatusBadge
            label={requested ? "Requested — Under Review" : "Open position"}
            tone={requested ? "info" : "brand"}
          />
          <p className="mt-3 text-sm text-slate-600">
            Requesting does not schedule you. Kivara confirmation locks the
            assignment.
          </p>
          <button
            type="button"
            disabled={requested}
            onClick={() => setRequested(true)}
            className="mt-4 w-full rounded-full bg-[#0D2B4D] px-4 py-3 text-sm font-semibold text-white disabled:bg-slate-300"
          >
            {requested ? "Request submitted" : "Request this shift"}
          </button>
        </ScreenCard>
      </div>
    </CnaShell>
  );
}
