"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";

import { cnaActiveClockShift } from "@/lib/mock/attendance";

type Phase = "details" | "geofence" | "on_shift" | "clock_out" | "submitted";

function formatElapsed(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function GeofenceMap({
  within,
  accuracyFt,
}: {
  within: boolean;
  accuracyFt: number;
}) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-full border-[6px] border-[#D6F1F1] bg-[#E8F6F6] shadow-inner">
      <div
        className="absolute inset-[18%] rounded-full border-2 border-dashed border-[#0FA3A3]/40"
        aria-hidden
      />
      <div
        className="absolute inset-[32%] rounded-full bg-[#0FA3A3]/15"
        aria-hidden
      />
      <div
        className={`absolute left-1/2 top-[42%] flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-lg text-white shadow-lg ${
          within ? "bg-[#0FA3A3]" : "bg-rose-500"
        }`}
      >
        📍
      </div>
      <div className="absolute bottom-6 left-1/2 w-[80%] -translate-x-1/2 rounded-full bg-white/95 px-3 py-1.5 text-center text-[11px] font-semibold text-[#0D2B4D] shadow">
        GPS accuracy · {accuracyFt} ft
      </div>
    </div>
  );
}

/**
 * Pins the primary CTA above the CNA bottom tab bar.
 * Must sit above the tab bar z-index (z-50) or taps hit Home/Clock links
 * and navigate away instead of advancing the geofence → clock-in flow.
 */
function StickyClockAction({ children }: { children: ReactNode }) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-[60] mx-auto w-full max-w-md px-3"
      style={{
        bottom: "calc(4.5rem + max(0.35rem, env(safe-area-inset-bottom)))",
      }}
    >
      <div className="pointer-events-auto rounded-2xl border border-slate-200/80 bg-white/95 p-2 shadow-lg backdrop-blur">
        {children}
      </div>
    </div>
  );
}

export default function GpsTimeClock({
  assignmentId,
  onTimesheetSubmitted,
}: {
  assignmentId?: string;
  onTimesheetSubmitted?: () => void;
}) {
  const shift = cnaActiveClockShift;
  const [phase, setPhase] = useState<Phase>("details");
  const [checking, setChecking] = useState(false);
  const [withinGeofence, setWithinGeofence] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [onBreak, setOnBreak] = useState(false);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [clockInLabel, setClockInLabel] = useState("2:59 PM");
  const gpsAccuracy = 12;

  const totalPay = useMemo(() => {
    const worked = Math.max(elapsed - breakSeconds, 0) / 3600;
    return (worked * shift.payRate).toFixed(2);
  }, [elapsed, breakSeconds, shift.payRate]);

  useEffect(() => {
    if (phase !== "on_shift" && phase !== "clock_out") return;
    const id = window.setInterval(() => {
      setElapsed((n) => n + 1);
      if (onBreak) setBreakSeconds((n) => n + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [phase, onBreak]);

  const startGeofenceCheck = () => {
    setWithinGeofence(false);
    setChecking(true);
    setPhase("geofence");
    window.setTimeout(() => {
      setWithinGeofence(true);
      setChecking(false);
    }, 900);
  };

  const handleClockIn = () => {
    if (checking || !withinGeofence) return;
    const now = new Date();
    setClockInLabel(
      now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    );
    setElapsed(0);
    setBreakSeconds(0);
    setOnBreak(false);
    setPhase("on_shift");
  };

  return (
    <div className="space-y-4 pb-36" data-testid="gps-time-clock">
      {phase === "details" ? (
        <>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0FA3A3]">
                  Confirmed · You are scheduled
                </p>
                <h1 className="mt-1 font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#0D2B4D]">
                  {shift.facilityName}
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  {shift.date} · {shift.startTime} – {shift.endTime}
                </p>
                <p className="text-sm text-slate-600">{shift.role}</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-800">
                CONFIRMED
              </span>
            </div>

            <div className="mt-4 space-y-2 rounded-xl bg-[#F2F4F7] p-3 text-sm text-slate-700">
              <p>
                <span className="font-semibold text-[#0D2B4D]">Address</span>
                <br />
                {shift.address}
              </p>
              <p>
                <span className="font-semibold text-[#0D2B4D]">Unit</span> ·{" "}
                {shift.unit}
              </p>
              <p>
                <span className="font-semibold text-[#0D2B4D]">Pay</span> · $
                {shift.payRate.toFixed(2)}/hr
              </p>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
              <div className="relative h-36 bg-gradient-to-br from-[#D6F1F1] via-[#E8F0F4] to-[#c5dde8]">
                <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(#0D2B4D22_1px,transparent_1px),linear-gradient(90deg,#0D2B4D22_1px,transparent_1px)] [background-size:24px_24px]" />
                <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#0D2B4D] text-white shadow-lg">
                  📍
                </div>
              </div>
              <div className="flex items-center justify-between bg-white px-3 py-2">
                <p className="text-xs text-slate-500">Facility location</p>
                <span className="text-xs font-semibold text-[#0FA3A3]">
                  View on Map
                </span>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3">
              <p className="text-xs font-bold uppercase tracking-wide text-amber-900">
                Important
              </p>
              <p className="mt-1 text-sm text-amber-950">{shift.instructions}</p>
            </div>
          </div>

          <p className="text-center text-xs text-slate-500">
            Assignment {assignmentId ?? shift.id} · Geofence check required
          </p>

          <StickyClockAction>
            <button
              type="button"
              data-testid="ready-to-clock-in"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                startGeofenceCheck();
              }}
              className="relative z-[61] w-full rounded-full bg-[#0D2B4D] py-3.5 text-sm font-semibold text-white shadow-sm active:brightness-95"
            >
              I’m Here – Ready to Clock In
            </button>
          </StickyClockAction>
        </>
      ) : null}

      {phase === "geofence" ? (
        <>
          <div
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            data-testid="geofence-panel"
          >
            <h2 className="text-center font-[family-name:var(--font-playfair)] text-xl font-bold text-[#0D2B4D]">
              {checking
                ? "Checking your location…"
                : "You’re at the right location!"}
            </h2>
            <p className="mt-2 text-center text-sm text-slate-600">
              {checking
                ? "Verifying you are within the approved check-in area."
                : "You are within the approved check-in area."}
            </p>
            <div className="mt-5">
              <GeofenceMap within={withinGeofence} accuracyFt={gpsAccuracy} />
            </div>
            {!checking ? (
              <div className="mt-4 rounded-xl bg-emerald-50 px-3 py-2 text-center text-sm font-semibold text-emerald-800">
                Within {shift.geofenceRadiusFt} ft geofence · GPS {gpsAccuracy}{" "}
                ft
              </div>
            ) : (
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-2/3 animate-pulse rounded-full bg-[#0FA3A3]" />
              </div>
            )}
          </div>
          <p className="text-center text-xs text-slate-500">
            GPS exceptions create a review flag — they do not automatically
            penalize you.
          </p>

          <StickyClockAction>
            <button
              type="button"
              data-testid="clock-in"
              disabled={checking || !withinGeofence}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                handleClockIn();
              }}
              className="relative z-[61] w-full rounded-full bg-[#0FA3A3] py-3.5 text-sm font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-50 active:brightness-95"
            >
              {checking ? "Verifying GPS…" : "Clock In"}
            </button>
          </StickyClockAction>
        </>
      ) : null}

      {phase === "on_shift" ? (
        <>
          <div
            className="rounded-2xl bg-emerald-600 p-4 text-white shadow-sm"
            data-testid="on-shift-timer"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-100">
              You are clocked in
            </p>
            <p
              className="mt-3 font-mono text-4xl font-bold tracking-tight"
              data-testid="elapsed-timer"
            >
              {formatElapsed(elapsed)}
            </p>
            <p className="mt-1 text-sm text-emerald-100">
              Started {clockInLabel} · {shift.facilityName}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-lg">
                ✓
              </span>
              <div>
                <p className="font-semibold text-[#0D2B4D]">On-Site Status</p>
                <p className="text-sm text-emerald-700">
                  Within the approved work area
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                data-testid="toggle-break"
                onClick={() => setOnBreak((v) => !v)}
                className="rounded-full border border-slate-200 py-2.5 text-sm font-semibold text-[#0D2B4D]"
              >
                {onBreak ? "End Break" : "Start Break"}
              </button>
              <button
                type="button"
                className="rounded-full border border-slate-200 py-2.5 text-sm font-semibold text-[#0D2B4D]"
              >
                View Breaks
              </button>
            </div>
            {onBreak ? (
              <p className="mt-3 text-center text-xs font-semibold text-amber-700">
                Break in progress · {formatElapsed(breakSeconds)}
              </p>
            ) : null}
            <button
              type="button"
              className="mt-3 w-full text-center text-sm font-semibold text-rose-600"
            >
              Report an Issue
            </button>
          </div>

          <StickyClockAction>
            <button
              type="button"
              data-testid="ready-to-clock-out"
              onClick={() => {
                setOnBreak(false);
                setPhase("clock_out");
              }}
              className="w-full rounded-full bg-[#0D2B4D] py-3.5 text-sm font-semibold text-white active:brightness-95"
            >
              Ready to Clock Out
            </button>
          </StickyClockAction>
        </>
      ) : null}

      {phase === "clock_out" ? (
        <>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-center font-[family-name:var(--font-playfair)] text-xl font-bold text-[#0D2B4D]">
              Clock Out
            </h2>
            <p className="mt-1 text-center text-sm text-slate-600">
              Confirm you are still at the facility geofence.
            </p>
            <div className="mt-4">
              <GeofenceMap within accuracyFt={gpsAccuracy} />
            </div>
            <div className="mt-4 space-y-2 rounded-xl bg-[#F2F4F7] p-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Clock In</span>
                <span className="font-semibold text-[#0D2B4D]">
                  {clockInLabel}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Break</span>
                <span className="font-semibold text-[#0D2B4D]">
                  {formatElapsed(breakSeconds)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Elapsed</span>
                <span className="font-semibold text-[#0D2B4D]">
                  {formatElapsed(elapsed)}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2">
                <span className="text-slate-500">Est. total</span>
                <span className="font-semibold text-[#0D2B4D]">
                  {formatElapsed(Math.max(elapsed - breakSeconds, 0))}
                </span>
              </div>
            </div>
          </div>

          <StickyClockAction>
            <button
              type="button"
              data-testid="clock-out"
              onClick={() => {
                setPhase("submitted");
                onTimesheetSubmitted?.();
              }}
              className="w-full rounded-full bg-[#0FA3A3] py-3.5 text-sm font-semibold text-white active:brightness-95"
            >
              Clock Out
            </button>
          </StickyClockAction>
        </>
      ) : null}

      {phase === "submitted" ? (
        <div
          className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
          data-testid="timesheet-submitted"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-700">
            ✓
          </div>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#0D2B4D]">
            Timesheet Submitted
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {shift.facilityName} · {shift.startTime} – {shift.endTime}
          </p>
          <div className="mt-4 rounded-xl bg-[#F2F4F7] p-4 text-left text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Worked</span>
              <span className="font-semibold">
                {formatElapsed(Math.max(elapsed - breakSeconds, 0))}
              </span>
            </div>
            <div className="mt-2 flex justify-between">
              <span className="text-slate-500">Est. total pay</span>
              <span className="font-semibold text-[#0D2B4D]">${totalPay}</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Facility can review; Kivara gives final approval.
          </p>
          <button
            type="button"
            className="mt-4 w-full rounded-full border border-slate-200 py-2.5 text-sm font-semibold text-[#0D2B4D]"
          >
            Request Correction
          </button>
          <Link
            href="/cna/schedule"
            className="mt-3 flex w-full items-center justify-center rounded-full bg-[#0D2B4D] py-3 text-sm font-semibold text-white"
          >
            Return to Schedule
          </Link>
        </div>
      ) : null}
    </div>
  );
}
