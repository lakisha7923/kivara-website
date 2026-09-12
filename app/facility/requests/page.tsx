"use client";

import { useState } from "react";

import FacilityShell from "@/components/facility/FacilityShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockStaffingRequests } from "@/lib/mock/v1-data";

export default function FacilityRequestsPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <FacilityShell title="Request staff">
      <PageHeader
        eyebrow="Staffing requests"
        title="Create & track requests"
        subtitle="Each request can include multiple CNA positions. Kivara fills and confirms assignments."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <ScreenCard>
          <h2 className="font-display text-lg font-bold text-[var(--kivara-navy)]">
            New staffing request
          </h2>
          <form
            className="mt-4 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <input
              className="w-full rounded-xl border px-4 py-3"
              placeholder="Location (e.g. Main Campus)"
              required
            />
            <input
              className="w-full rounded-xl border px-4 py-3"
              placeholder="Unit / department"
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <input className="rounded-xl border px-4 py-3" type="date" required />
              <input
                className="rounded-xl border px-4 py-3"
                placeholder="# of CNAs"
                type="number"
                min={1}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input className="rounded-xl border px-4 py-3" type="time" required />
              <input className="rounded-xl border px-4 py-3" type="time" required />
            </div>
            <textarea
              className="min-h-24 w-full rounded-xl border px-4 py-3"
              placeholder="Requirements & instructions"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-[var(--kivara-teal)] py-3 font-semibold text-white"
            >
              Submit to Kivara
            </button>
            {submitted ? (
              <p className="text-sm font-medium text-emerald-700">
                Request submitted (prototype). Kivara ops will review and publish
                eligible positions.
              </p>
            ) : null}
          </form>
        </ScreenCard>

        <div className="space-y-3">
          {mockStaffingRequests.map((request) => (
            <ScreenCard key={request.id}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-[var(--kivara-navy)]">
                    {request.unit} · {request.locationName}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {request.date} · {request.startTime}–{request.endTime}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Filled {request.filled}/{request.quantity}
                  </p>
                </div>
                <StatusBadge label={request.status} tone="brand" />
              </div>
            </ScreenCard>
          ))}
        </div>
      </div>
    </FacilityShell>
  );
}
