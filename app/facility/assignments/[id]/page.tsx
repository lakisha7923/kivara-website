"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import FacilityShell from "@/components/facility/FacilityShell";
import { useHandoffs } from "@/components/handoffs/HandoffProvider";
import { ConfirmedAssignmentBanner } from "@/components/shared/ConfirmedAssignmentBanner";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockAssignments } from "@/lib/mock/v1-data";

export default function FacilityAssignmentDetailPage() {
  const params = useParams<{ id: string }>();
  const { record, hydrated } = useHandoffs();
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [changeNote, setChangeNote] = useState("");
  const [changeSubmitted, setChangeSubmitted] = useState(false);

  const isHandoff = params.id === "asg-handoff";
  const assignment = mockAssignments.find((a) => a.id === params.id);

  if (!assignment && !isHandoff) {
    return (
      <FacilityShell title="Assignment Detail">
        <PageHeader title="Assignment not found" />
        <Link
          href="/facility/assignments"
          className="text-sm font-semibold text-teal-700"
        >
          ← Back to Active Assignments
        </Link>
      </FacilityShell>
    );
  }

  const cnaName = assignment?.cnaName ?? (hydrated ? record.cnaName : "—");
  const date = assignment?.date ?? (hydrated ? record.date : "—");
  const start = assignment?.startTime ?? (hydrated ? record.startTime : "—");
  const end = assignment?.endTime ?? (hydrated ? record.endTime : "—");
  const unit = assignment?.unit ?? (hydrated ? record.unit : "—");
  const location =
    assignment?.locationName ?? (hydrated ? record.locationName : "—");
  const address = assignment?.address ?? "Facility address on file";
  const workStatus =
    assignment?.attendanceStatus ??
    (hydrated && record.clocked ? "Clocked Out" : "Scheduled");
  const assignmentStatus =
    assignment?.status ?? (hydrated && record.confirmed ? "Confirmed" : "—");

  return (
    <FacilityShell title="Assignment Detail">
      <PageHeader
        eyebrow="Active Assignments"
        title={cnaName}
        subtitle={`${date} · ${start}–${end}`}
      />

      <div className="mb-4">
        <ConfirmedAssignmentBanner portal="facility" />
      </div>

      <ScreenCard className="mb-4">
        <div className="flex flex-wrap gap-2">
          <StatusBadge label={assignmentStatus} tone="success" />
          <StatusBadge label={`Work status: ${workStatus}`} tone="brand" />
        </div>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between gap-3 border-b border-slate-100 py-2">
            <dt className="text-slate-500">Unit / location</dt>
            <dd className="text-right font-medium">
              {unit} · {location}
            </dd>
          </div>
          <div className="flex justify-between gap-3 border-b border-slate-100 py-2">
            <dt className="text-slate-500">Address</dt>
            <dd className="text-right font-medium">{address}</dd>
          </div>
          {assignment?.clockInAt ? (
            <div className="flex justify-between gap-3 border-b border-slate-100 py-2">
              <dt className="text-slate-500">Clock</dt>
              <dd className="font-medium">
                In {assignment.clockInAt}
                {assignment.clockOutAt ? ` · Out ${assignment.clockOutAt}` : ""}
              </dd>
            </div>
          ) : null}
        </dl>
        <p className="mt-3 text-xs text-slate-500">
          Operational work-status only — detailed GPS history stays with Kivara
          for exception review.
        </p>
      </ScreenCard>

      <div className="grid gap-4 sm:grid-cols-2">
        <ScreenCard>
          <h2 className="font-semibold text-[#0D2B4D]">Contact Kivara</h2>
          <p className="mt-2 text-sm text-slate-600">
            Reach support for coverage questions, late arrivals, or credential
            checks.
          </p>
          <p className="mt-3 text-sm font-semibold text-[#0D2B4D]">
            (800) 555-0147
          </p>
          <button
            type="button"
            onClick={() => setContactSent(true)}
            className="mt-4 rounded-full bg-[#0D2B4D] px-4 py-2.5 text-sm font-semibold text-white"
          >
            Send message to Kivara
          </button>
          {contactSent ? (
            <p className="mt-3 text-sm text-emerald-700">
              Message queued for Kivara Support.
            </p>
          ) : null}
        </ScreenCard>

        <ScreenCard>
          <h2 className="font-semibold text-[#0D2B4D]">
            Documented exception workflow
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            There is no Cancel CNA button. Cancel, replace, or schedule change
            after confirmation requires a documented emergency exception.
          </p>
          {!emergencyOpen ? (
            <button
              type="button"
              onClick={() => setEmergencyOpen(true)}
              className="mt-4 rounded-full border-2 border-rose-600 px-4 py-2.5 text-sm font-semibold text-rose-700"
            >
              Request emergency change
            </button>
          ) : (
            <div className="mt-4 space-y-3">
              <textarea
                value={changeNote}
                onChange={(e) => setChangeNote(e.target.value)}
                rows={3}
                placeholder="Documented reason for emergency change (required)…"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                required
              />
              <button
                type="button"
                disabled={!changeNote.trim() || changeSubmitted}
                onClick={() => setChangeSubmitted(true)}
                className="rounded-full bg-rose-700 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
              >
                Submit documented exception
              </button>
              {changeSubmitted ? (
                <p className="text-sm text-emerald-700">
                  Exception submitted to Kivara for review and audit.
                </p>
              ) : null}
            </div>
          )}
        </ScreenCard>
      </div>

      <p className="mt-5">
        <Link
          href="/facility/assignments"
          className="text-sm font-semibold text-teal-700"
        >
          ← Back to Active Assignments
        </Link>
      </p>
    </FacilityShell>
  );
}
