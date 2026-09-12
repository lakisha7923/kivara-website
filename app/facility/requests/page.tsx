"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import FacilityShell from "@/components/facility/FacilityShell";
import {
  HandoffNotifications,
  HandoffRail,
} from "@/components/handoffs/HandoffChrome";
import { useHandoffs } from "@/components/handoffs/HandoffProvider";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockStaffingRequests } from "@/lib/mock/v1-data";

export default function FacilityRequestsPage() {
  const { record, submitStaffingRequest, hydrated } = useHandoffs();
  const [unit, setUnit] = useState("Skilled Nursing");
  const [message, setMessage] = useState("");

  const submitted =
    hydrated && record.completedSteps.includes("facility_submitted");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    submitStaffingRequest({
      unit,
      instructions: message || record.instructions,
    });
  }

  return (
    <FacilityShell title="Request staff">
      <HandoffRail portal="facility" />
      <HandoffNotifications portal="facility" />
      <PageHeader
        eyebrow="Staffing requests"
        title="Create & track requests"
        subtitle="Submitting a request hands the need to Kivara Admin for review and publishing."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <ScreenCard>
          <h2 className="text-lg font-bold text-[#0D2B4D]">New staffing request</h2>
          <form className="mt-4 space-y-3" onSubmit={onSubmit}>
            <input
              className="w-full rounded-xl border px-4 py-3"
              value={`${record.facilityName} — ${record.locationName}`}
              readOnly
            />
            <input
              className="w-full rounded-xl border px-4 py-3"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <input className="rounded-xl border px-4 py-3" value={record.date} readOnly />
              <input
                className="rounded-xl border px-4 py-3"
                value={`${record.quantity} CNA`}
                readOnly
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input className="rounded-xl border px-4 py-3" value={record.startTime} readOnly />
              <input className="rounded-xl border px-4 py-3" value={record.endTime} readOnly />
            </div>
            <textarea
              className="min-h-24 w-full rounded-xl border px-4 py-3"
              placeholder="Requirements & instructions"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              disabled={submitted}
              className="w-full rounded-full bg-[#0FA3A3] py-3 font-semibold text-white disabled:opacity-60"
            >
              {submitted ? "Submitted to Kivara" : "Submit to Kivara"}
            </button>
            {submitted ? (
              <p className="text-sm font-medium text-emerald-700">
                Handoff 1 complete.{" "}
                <Link href="/admin/requests" className="underline">
                  Open Admin Requests
                </Link>
              </p>
            ) : null}
          </form>
        </ScreenCard>

        <div className="space-y-3">
          {submitted ? (
            <ScreenCard>
              <StatusBadge label="Submitted" tone="brand" />
              <h3 className="mt-2 font-bold text-[#0D2B4D]">
                {record.facilityName} · {record.unit}
              </h3>
              <p className="text-sm text-slate-600">
                {record.date} · {record.startTime}–{record.endTime}
              </p>
            </ScreenCard>
          ) : null}
          {mockStaffingRequests.map((request) => (
            <ScreenCard key={request.id}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-[#0D2B4D]">
                    {request.facilityName} · {request.unit}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {request.date} · {request.startTime}–{request.endTime}
                  </p>
                </div>
                <StatusBadge label={request.status} tone="info" />
              </div>
            </ScreenCard>
          ))}
        </div>
      </div>
    </FacilityShell>
  );
}
