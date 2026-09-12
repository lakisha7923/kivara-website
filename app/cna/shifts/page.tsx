"use client";

import Link from "next/link";
import { useMemo } from "react";

import CnaShell from "@/components/cna/CnaShell";
import {
  HandoffNotifications,
  HandoffRail,
} from "@/components/handoffs/HandoffChrome";
import { useHandoffs } from "@/components/handoffs/HandoffProvider";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockAvailableShifts, mockShiftRequests } from "@/lib/mock/v1-data";

export default function CnaShiftsPage() {
  const { record, hydrated } = useHandoffs();
  const showHandoff = hydrated && record.published;

  const shifts = useMemo(() => {
    if (!showHandoff) return mockAvailableShifts;
    if (mockAvailableShifts.some((shift) => shift.id === record.shiftId)) {
      return mockAvailableShifts;
    }
    return [
      {
        id: record.shiftId,
        positionId: record.requestId,
        requestId: record.requestId,
        facilityName: record.facilityName,
        locationName: record.locationName,
        address: record.locationName,
        unit: record.unit,
        date: record.date,
        startTime: record.startTime,
        endTime: record.endTime,
        payRate: record.payRate,
        requirements: record.requirements,
        instructions: record.instructions,
        eligible: true,
      },
      ...mockAvailableShifts,
    ];
  }, [record, showHandoff]);

  return (
    <CnaShell>
      <HandoffRail portal="cna" />
      <HandoffNotifications portal="cna" />
      <PageHeader
        eyebrow="Shifts"
        title="Available shifts"
        subtitle="Available Shifts → Shift Details → Request Shift → Request Status"
      />

      <div className="space-y-4">
        {mockShiftRequests.map((request) => (
          <ScreenCard key={request.id}>
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-[#0D2B4D]">Your request</p>
              <StatusBadge label={request.status} tone="info" />
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Requested {request.requestedAt}. Not a schedule until confirmed.
            </p>
            <Link
              href={`/cna/shifts/${request.shiftId}/status`}
              className="mt-3 inline-flex text-sm font-semibold text-teal-700"
            >
              View request status →
            </Link>
          </ScreenCard>
        ))}

        {shifts.map((shift) => {
          const isHandoff = showHandoff && shift.id === record.shiftId;
          return (
            <ScreenCard key={shift.id}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="font-bold text-[#0D2B4D]">{shift.facilityName}</h2>
                  <p className="text-sm text-slate-600">{shift.locationName}</p>
                </div>
                <StatusBadge
                  label={
                    isHandoff && record.confirmed
                      ? "Confirmed"
                      : isHandoff && record.cnaRequested
                        ? "Requested"
                        : "Eligible"
                  }
                  tone={
                    isHandoff && record.confirmed
                      ? "success"
                      : isHandoff && record.cnaRequested
                        ? "warning"
                        : "brand"
                  }
                />
              </div>
              <p className="mt-3 text-sm text-slate-700">
                {shift.date} · {shift.startTime}–{shift.endTime} · $
                {shift.payRate}/hr
              </p>
              <Link
                href={`/cna/shifts/${shift.id}`}
                className="mt-4 inline-flex rounded-full bg-[#0D2B4D] px-4 py-2 text-sm font-semibold text-white"
              >
                Shift details
              </Link>
            </ScreenCard>
          );
        })}
      </div>
    </CnaShell>
  );
}
