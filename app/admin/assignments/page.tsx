"use client";

import { useState } from "react";

import AdminShell from "@/components/admin/AdminShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import {
  CONFIRM_ADMIN_ACTION,
  CONFIRMED_CNA_COPY,
  mockAssignments,
  mockShiftRequests,
} from "@/lib/mock/v1-data";

export default function AdminAssignmentsPage() {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <AdminShell title="Assignments">
      <PageHeader
        eyebrow="Confirm Assignment"
        title="Review requests & confirm coverage"
        subtitle="Confirm Assignment schedules the CNA. There is no casual cancel — exceptions need reason + audit."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <h2 className="font-semibold text-[var(--kivara-navy)]">
            Incoming shift requests
          </h2>
          {mockShiftRequests.map((request) => (
            <ScreenCard key={request.id}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-[var(--kivara-navy)]">
                    {request.cnaName}
                  </p>
                  <p className="text-sm text-slate-600">
                    Shift {request.shiftId} · {request.requestedAt}
                  </p>
                </div>
                <StatusBadge label={request.status} tone="warning" />
              </div>
              <button
                type="button"
                className="mt-4 rounded-full bg-[var(--kivara-teal)] px-4 py-2 text-sm font-semibold text-white"
                onClick={() => setConfirmed(true)}
              >
                {CONFIRM_ADMIN_ACTION}
              </button>
              {confirmed ? (
                <p className="mt-3 text-sm font-medium text-emerald-700">
                  Assignment confirmed. CNA now sees: {CONFIRMED_CNA_COPY}
                </p>
              ) : null}
            </ScreenCard>
          ))}
        </div>

        <div className="space-y-3">
          <h2 className="font-semibold text-[var(--kivara-navy)]">
            Confirmed assignments
          </h2>
          {mockAssignments.map((assignment) => (
            <ScreenCard key={assignment.id}>
              <StatusBadge label={assignment.status} tone="success" />
              <p className="mt-2 font-bold text-[var(--kivara-navy)]">
                {assignment.cnaName}
              </p>
              <p className="text-sm text-slate-600">
                {assignment.facilityName} · {assignment.date} ·{" "}
                {assignment.startTime}–{assignment.endTime}
              </p>
              <button
                type="button"
                className="mt-3 rounded-full border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-700"
              >
                Start exception / replacement workflow
              </button>
            </ScreenCard>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
