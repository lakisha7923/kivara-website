"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import AdminShell from "@/components/admin/AdminShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockAssignments } from "@/lib/mock/v1-data";

const exceptions = ["Call-Out", "No-Show", "Emergency Exception"] as const;

export default function AdminAssignmentDetailPage() {
  const params = useParams<{ id: string }>();
  const assignment = mockAssignments.find((a) => a.id === params.id);
  const [exception, setException] = useState<(typeof exceptions)[number] | null>(
    null,
  );
  const [replacementStarted, setReplacementStarted] = useState(false);
  const [note, setNote] = useState("");

  if (!assignment) {
    return (
      <AdminShell title="Assignment Detail">
        <PageHeader title="Assignment not found" />
        <Link href="/admin/assignments" className="text-sm font-semibold text-teal-700">
          ← Back to Assignments
        </Link>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Assignment Detail">
      <PageHeader
        eyebrow="Assignments"
        title={assignment.cnaName}
        subtitle="Confirmed → Call-Out / No-Show / Emergency Exception → Replacement Workflow"
      />

      <ScreenCard className="mb-4">
        <div className="flex flex-wrap gap-2">
          <StatusBadge label={assignment.status} tone="success" />
          <StatusBadge
            label={`Attendance: ${assignment.attendanceStatus}`}
            tone="brand"
          />
        </div>
        <p className="mt-3 text-sm text-slate-600">
          {assignment.facilityName} · {assignment.unit}
        </p>
        <p className="text-sm text-slate-600">
          {assignment.date} · {assignment.startTime}–{assignment.endTime}
        </p>
      </ScreenCard>

      <ScreenCard className="mb-4">
        <h2 className="font-semibold text-[#0D2B4D]">Exception actions</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {exceptions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setException(item)}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                exception === item
                  ? "bg-rose-700 text-white"
                  : "border border-rose-300 text-rose-800"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        {exception ? (
          <div className="mt-4 space-y-3">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder={`${exception} reason (required for audit)…`}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
            />
            <button
              type="button"
              disabled={!note.trim()}
              onClick={() => setReplacementStarted(true)}
              className="rounded-full bg-[#0D2B4D] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            >
              Start replacement workflow
            </button>
          </div>
        ) : null}
      </ScreenCard>

      {replacementStarted ? (
        <ScreenCard>
          <h2 className="font-semibold text-[#0D2B4D]">Replacement workflow</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
            <li>Original assignment marked {exception} with audit reason.</li>
            <li>Open position republished to eligible Work Ready CNAs.</li>
            <li>Facility notified of coverage gap and ETA.</li>
            <li>Confirm replacement via Shift Requests when eligible CNA requests.</li>
          </ol>
          <Link
            href="/admin/shift-requests"
            className="mt-4 inline-flex rounded-full bg-[#0FA3A3] px-4 py-2.5 text-sm font-semibold text-white"
          >
            Open Shift Requests
          </Link>
        </ScreenCard>
      ) : null}

      <p className="mt-5">
        <Link href="/admin/assignments" className="text-sm font-semibold text-teal-700">
          ← Back to Assignments
        </Link>
      </p>
    </AdminShell>
  );
}
