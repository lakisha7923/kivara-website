"use client";

import { useState } from "react";
import Link from "next/link";

import FacilityShell from "@/components/facility/FacilityShell";
import { PageHeader, ScreenCard } from "@/components/ui/primitives";

const PREFS = [
  {
    id: "staffing",
    label: "Staffing alerts",
    detail: "New CNA requests, confirmations, and unfilled openings",
  },
  {
    id: "attendance",
    label: "Attendance alerts",
    detail: "Late arrivals, no-shows, and clock exceptions",
  },
  {
    id: "timesheets",
    label: "Timesheet alerts",
    detail: "Submitted hours ready for Accept or Discrepancy",
  },
  {
    id: "invoices",
    label: "Invoice alerts",
    detail: "Draft, issued, and due invoice notifications",
  },
] as const;

export default function FacilityNotificationSettingsPage() {
  const [emailOn, setEmailOn] = useState(true);
  const [inAppOn, setInAppOn] = useState(true);
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    staffing: true,
    attendance: true,
    timesheets: true,
    invoices: true,
  });
  const [saved, setSaved] = useState(false);

  return (
    <FacilityShell>
      <PageHeader
        eyebrow="Settings"
        title="Notification Preferences"
        subtitle="Choose email and in-app alerts for facility operations."
      />

      <ScreenCard className="mb-4">
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={emailOn}
              onChange={(e) => {
                setEmailOn(e.target.checked);
                setSaved(false);
              }}
            />
            Email
          </label>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={inAppOn}
              onChange={(e) => {
                setInAppOn(e.target.checked);
                setSaved(false);
              }}
            />
            In-app
          </label>
        </div>
      </ScreenCard>

      <div className="space-y-3">
        {PREFS.map((pref) => (
          <ScreenCard key={pref.id}>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1"
                checked={enabled[pref.id]}
                onChange={(e) => {
                  setEnabled((prev) => ({ ...prev, [pref.id]: e.target.checked }));
                  setSaved(false);
                }}
              />
              <span>
                <span className="block font-semibold text-[#0D2B4D]">
                  {pref.label}
                </span>
                <span className="mt-1 block text-sm text-slate-600">
                  {pref.detail}
                </span>
              </span>
            </label>
          </ScreenCard>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setSaved(true)}
          className="rounded-full bg-[#0FA3A3] px-4 py-2.5 text-sm font-semibold text-white"
        >
          Save preferences
        </button>
        {saved ? (
          <p className="text-sm text-emerald-700">Preferences saved for this demo.</p>
        ) : null}
      </div>

      <p className="mt-5">
        <Link href="/facility/settings" className="text-sm font-semibold text-teal-700">
          ← Back to Settings
        </Link>
      </p>
    </FacilityShell>
  );
}
