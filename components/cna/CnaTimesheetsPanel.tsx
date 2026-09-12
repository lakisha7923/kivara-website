"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";

import {
  PageHeader,
  ScreenCard,
  StatusBadge,
} from "@/components/ui/primitives";
import { MONTH_NAMES, periodFromWorkDate } from "@/lib/timesheets/period";
import type { Timesheet, TimesheetStatus } from "@/types/kivara";

const STORAGE_KEY = "kivara.cna.timesheets.v1";

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#0D2B4D] outline-none ring-[#0FA3A3] focus:ring-2";

function toneForStatus(status: TimesheetStatus) {
  switch (status) {
    case "Kivara Approved":
    case "Locked":
      return "success" as const;
    case "Facility Reviewed":
      return "info" as const;
    case "Disputed":
    case "Corrected":
      return "warning" as const;
    case "Draft":
      return "neutral" as const;
    default:
      return "brand" as const;
  }
}

function loadUploads(): Timesheet[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Timesheet[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveUploads(sheets: Timesheet[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sheets));
}

export default function CnaTimesheetsPanel({
  initialSheets,
}: {
  initialSheets: Timesheet[];
}) {
  const [uploads, setUploads] = useState<Timesheet[]>([]);
  const [year, setYear] = useState("all");
  const [month, setMonth] = useState("all");
  const [week, setWeek] = useState("all");
  const [workDate, setWorkDate] = useState("2026-09-12");
  const [facilityName, setFacilityName] = useState("Sunrise Care Center");
  const [hours, setHours] = useState("8");
  const [notes, setNotes] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    setUploads(loadUploads());
  }, []);

  const sheets = useMemo(() => {
    const merged = [...uploads, ...initialSheets];
    const seen = new Set<string>();
    return merged
      .filter((sheet) => {
        if (seen.has(sheet.id)) return false;
        seen.add(sheet.id);
        return true;
      })
      .sort((a, b) => b.workDate.localeCompare(a.workDate));
  }, [uploads, initialSheets]);

  const years = useMemo(
    () => Array.from(new Set(sheets.map((s) => s.year))).sort((a, b) => b - a),
    [sheets]
  );

  const months = useMemo(() => {
    const source =
      year === "all" ? sheets : sheets.filter((s) => String(s.year) === year);
    return Array.from(new Set(source.map((s) => s.month))).sort((a, b) => b - a);
  }, [sheets, year]);

  const weeks = useMemo(() => {
    const source = sheets.filter((s) => {
      if (year !== "all" && String(s.year) !== year) return false;
      if (month !== "all" && String(s.month) !== month) return false;
      return true;
    });
    return Array.from(
      new Map(source.map((s) => [s.week, s.weekLabel])).entries()
    ).sort((a, b) => b[0] - a[0]);
  }, [sheets, year, month]);

  const filtered = useMemo(() => {
    return sheets.filter((s) => {
      if (year !== "all" && String(s.year) !== year) return false;
      if (month !== "all" && String(s.month) !== month) return false;
      if (week !== "all" && String(s.week) !== week) return false;
      return true;
    });
  }, [sheets, year, month, week]);

  const grouped = useMemo(() => {
    const map = new Map<string, Timesheet[]>();
    for (const sheet of filtered) {
      const key = `${sheet.year}|${sheet.month}|${sheet.week}|${sheet.weekLabel}`;
      const list = map.get(key) ?? [];
      list.push(sheet);
      map.set(key, list);
    }
    return Array.from(map.entries()).map(([key, items]) => {
      const [y, m, , label] = key.split("|");
      return {
        key,
        title: `${MONTH_NAMES[Number(m) - 1]} ${y}`,
        subtitle: label,
        items,
        hours: items.reduce((sum, item) => sum + item.actualHours, 0),
      };
    });
  }, [filtered]);

  function onPickFile(file: File | undefined) {
    setError(null);
    setSuccess(null);
    if (!file) {
      setFileName(null);
      return;
    }
    if (
      !file.type.startsWith("image/") &&
      file.type !== "application/pdf" &&
      !/\.(pdf|png|jpe?g|heic|webp)$/i.test(file.name)
    ) {
      setError("Upload a PDF or image timesheet (PDF, JPG, PNG).");
      setFileName(null);
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("File must be under 8 MB.");
      setFileName(null);
      return;
    }
    setFileName(file.name);
  }

  function submitUpload(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    if (!fileName) {
      setError("Choose a timesheet file to upload.");
      return;
    }
    if (!workDate || !facilityName.trim()) {
      setError("Work date and facility are required.");
      return;
    }
    const actualHours = Number(hours);
    if (!Number.isFinite(actualHours) || actualHours <= 0 || actualHours > 24) {
      setError("Enter hours between 0 and 24.");
      return;
    }

    const period = periodFromWorkDate(workDate);
    const next: Timesheet = {
      id: `ts-upload-${Date.now()}`,
      assignmentId: "upload",
      cnaName: initialSheets[0]?.cnaName ?? "Jordan Miles",
      facilityName: facilityName.trim(),
      date: period.date,
      workDate: period.workDate,
      year: period.year,
      month: period.month,
      week: period.week,
      weekLabel: period.weekLabel,
      scheduledHours: actualHours,
      actualHours,
      status: "Submitted",
      source: "Upload",
      fileName,
      uploadedAt: new Date().toISOString(),
      notes: notes.trim() || undefined,
    };

    const nextUploads = [next, ...uploads];
    setUploads(nextUploads);
    saveUploads(nextUploads);
    setYear(String(next.year));
    setMonth(String(next.month));
    setWeek(String(next.week));
    setFileName(null);
    setNotes("");
    setSuccess(`Uploaded ${next.fileName} for ${next.weekLabel}.`);
  }

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Work & pay"
        title="Timesheets"
        subtitle="Upload a timesheet and browse history by year, month, and week"
      />

      <ScreenCard>
        <h2 className="text-sm font-bold text-[#0D2B4D]">Upload timesheet</h2>
        <p className="mt-1 text-xs text-slate-500">
          Use this for paper or facility-signed timesheets. Clock-out still
          submits electronic timesheets automatically.
        </p>
        <form className="mt-4 space-y-3" onSubmit={submitUpload}>
          <label className="block" htmlFor="ts-work-date">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Work date
            </span>
            <input
              id="ts-work-date"
              type="date"
              value={workDate}
              onChange={(e) => setWorkDate(e.target.value)}
              className={fieldClass}
              required
            />
          </label>
          <label className="block" htmlFor="ts-facility">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Facility
            </span>
            <input
              id="ts-facility"
              type="text"
              value={facilityName}
              onChange={(e) => setFacilityName(e.target.value)}
              className={fieldClass}
              placeholder="Facility name"
              required
            />
          </label>
          <label className="block" htmlFor="ts-hours">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Hours worked
            </span>
            <input
              id="ts-hours"
              type="number"
              min="0.25"
              max="24"
              step="0.25"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className={fieldClass}
              required
            />
          </label>
          <label className="block" htmlFor="ts-notes">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Notes (optional)
            </span>
            <textarea
              id="ts-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className={`${fieldClass} resize-y`}
              placeholder="Break coverage, late stay, charge nurse signature…"
            />
          </label>
          <label className="block" htmlFor="ts-file">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Timesheet file
            </span>
            <input
              id="ts-file"
              type="file"
              accept="application/pdf,image/*"
              className={`${fieldClass} file:mr-3 file:rounded-full file:border-0 file:bg-[#E8F6F6] file:px-3 file:py-1 file:text-xs file:font-semibold file:text-[#0D2B4D]`}
              onChange={(e) => onPickFile(e.target.files?.[0])}
            />
            {fileName ? (
              <p className="mt-1 text-xs text-slate-600">Selected: {fileName}</p>
            ) : (
              <p className="mt-1 text-xs text-slate-500">
                PDF or image, up to 8 MB. Saved on this device for the demo.
              </p>
            )}
          </label>
          {error ? (
            <p className="text-sm text-rose-700" role="alert">
              {error}
            </p>
          ) : null}
          {success ? (
            <p className="text-sm text-emerald-700" role="status">
              {success}
            </p>
          ) : null}
          <button
            type="submit"
            className="w-full rounded-full bg-[#0D2B4D] px-4 py-3 text-sm font-semibold text-white"
          >
            Upload timesheet
          </button>
        </form>
      </ScreenCard>

      <ScreenCard>
        <h2 className="text-sm font-bold text-[#0D2B4D]">History</h2>
        <p className="mt-1 text-xs text-slate-500">
          Filter by year, month, and week. Uploaded and clock-out timesheets
          appear together.
        </p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <label className="block" htmlFor="ts-year">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Year
            </span>
            <select
              id="ts-year"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                setMonth("all");
                setWeek("all");
              }}
              className={fieldClass}
            >
              <option value="all">All years</option>
              {years.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <label className="block" htmlFor="ts-month">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Month
            </span>
            <select
              id="ts-month"
              value={month}
              onChange={(e) => {
                setMonth(e.target.value);
                setWeek("all");
              }}
              className={fieldClass}
            >
              <option value="all">All months</option>
              {months.map((value) => (
                <option key={value} value={value}>
                  {MONTH_NAMES[value - 1]}
                </option>
              ))}
            </select>
          </label>
          <label className="block" htmlFor="ts-week">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Week
            </span>
            <select
              id="ts-week"
              value={week}
              onChange={(e) => setWeek(e.target.value)}
              className={fieldClass}
            >
              <option value="all">All weeks</option>
              {weeks.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </ScreenCard>

      {grouped.length === 0 ? (
        <ScreenCard>
          <p className="text-sm text-slate-600">
            No timesheets for this year / month / week filter.
          </p>
        </ScreenCard>
      ) : (
        grouped.map((group) => (
          <ScreenCard key={group.key}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-[#0D2B4D]">
                  {group.title}
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">{group.subtitle}</p>
              </div>
              <p className="text-sm font-semibold text-[#0D2B4D]">
                {group.hours.toFixed(2)} hrs
              </p>
            </div>
            <div className="mt-3 space-y-3">
              {group.items.map((sheet) => (
                <div
                  key={sheet.id}
                  className="rounded-xl border border-slate-200 bg-[#F8FBFB] p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-[#0D2B4D]">
                        {sheet.date}
                      </p>
                      <p className="text-sm text-slate-600">
                        {sheet.facilityName}
                      </p>
                    </div>
                    <StatusBadge
                      label={sheet.status}
                      tone={toneForStatus(sheet.status)}
                    />
                  </div>
                  <p className="mt-2 text-sm text-slate-700">
                    {sheet.actualHours} hrs worked · {sheet.scheduledHours}{" "}
                    scheduled · {sheet.source}
                  </p>
                  {sheet.fileName ? (
                    <p className="mt-1 text-xs text-slate-500">
                      File: {sheet.fileName}
                      {sheet.notes ? ` · ${sheet.notes}` : ""}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </ScreenCard>
        ))
      )}

      <ScreenCard>
        <p className="text-sm text-slate-700">
          Approved hours for payroll also show under Pay Status.
        </p>
        <Link
          href="/cna/pay"
          className="mt-3 inline-flex rounded-full bg-[#0D2B4D] px-4 py-2 text-sm font-semibold text-white"
        >
          Open pay status
        </Link>
      </ScreenCard>

      <Link
        href="/cna/more"
        className="inline-block text-sm font-semibold text-teal-700"
      >
        ← Back to More
      </Link>
    </div>
  );
}
