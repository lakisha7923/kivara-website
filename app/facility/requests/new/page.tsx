"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import FacilityShell from "@/components/facility/FacilityShell";
import { useHandoffs } from "@/components/handoffs/HandoffProvider";
import { PageHeader, ScreenCard } from "@/components/ui/primitives";
import { mockFacilityWorkAreas } from "@/lib/mock/v1-data";

type Step = "new" | "review" | "submit";

export default function NewStaffRequestPage() {
  const router = useRouter();
  const { submitStaffingRequest } = useHandoffs();
  const [step, setStep] = useState<Step>("new");
  const [unit, setUnit] = useState("Med Surg");
  const [date, setDate] = useState("2026-09-14");
  const [startTime, setStartTime] = useState("07:00");
  const [endTime, setEndTime] = useState("19:00");
  const [quantity, setQuantity] = useState("2");
  const [instructions, setInstructions] = useState(
    "Prefer CNAs familiar with med-surg ratios.",
  );
  const [areas, setAreas] = useState<string[]>(["wa-medsurg"]);
  const [submitted, setSubmitted] = useState(false);

  function toggleArea(id: string) {
    setAreas((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function goReview(e: FormEvent) {
    e.preventDefault();
    setStep("review");
  }

  function confirmSubmit() {
    submitStaffingRequest({
      unit,
      date,
      startTime,
      endTime,
      quantity: Number(quantity) || 1,
      instructions,
    });
    setSubmitted(true);
  }

  return (
    <FacilityShell title="New Request">
      <PageHeader
        eyebrow="Request Staff"
        title="New Request"
        subtitle="New Request → Review → Submit → Request Detail"
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {(
          [
            ["new", "1. New Request"],
            ["review", "2. Review"],
            ["submit", "3. Submit"],
          ] as const
        ).map(([key, label]) => (
          <span
            key={key}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              step === key
                ? "bg-[#0D2B4D] text-white"
                : "border border-slate-200 bg-white text-slate-600"
            }`}
          >
            {label}
          </span>
        ))}
      </div>

      {step === "new" ? (
        <form onSubmit={goReview}>
          <ScreenCard className="space-y-4">
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-slate-700">Unit</span>
              <input
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
                required
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-slate-700">Date</span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
                  required
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-slate-700">Start</span>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
                  required
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-slate-700">End</span>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
                  required
                />
              </label>
            </div>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-slate-700">
                Open slots
              </span>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 sm:max-w-xs"
                required
              />
            </label>
            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">Work areas</p>
              <div className="flex flex-wrap gap-2">
                {mockFacilityWorkAreas.map((area) => (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => toggleArea(area.id)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      areas.includes(area.id)
                        ? "bg-[#0FA3A3] text-white"
                        : "border border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    {area.name}
                  </button>
                ))}
              </div>
            </div>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-slate-700">Notes</span>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/facility/requests"
                className="rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="rounded-full bg-[#0D2B4D] px-4 py-2.5 text-sm font-semibold text-white"
              >
                Continue to Review
              </button>
            </div>
          </ScreenCard>
        </form>
      ) : null}

      {step === "review" ? (
        <ScreenCard>
          <h2 className="text-lg font-semibold text-[#0D2B4D]">Review request</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-3 border-b border-slate-100 py-2">
              <dt className="text-slate-500">Unit</dt>
              <dd className="font-medium text-slate-800">{unit}</dd>
            </div>
            <div className="flex justify-between gap-3 border-b border-slate-100 py-2">
              <dt className="text-slate-500">When</dt>
              <dd className="font-medium text-slate-800">
                {date} · {startTime}–{endTime}
              </dd>
            </div>
            <div className="flex justify-between gap-3 border-b border-slate-100 py-2">
              <dt className="text-slate-500">Open slots</dt>
              <dd className="font-medium text-slate-800">{quantity}</dd>
            </div>
            <div className="flex justify-between gap-3 border-b border-slate-100 py-2">
              <dt className="text-slate-500">Work areas</dt>
              <dd className="text-right font-medium text-slate-800">
                {mockFacilityWorkAreas
                  .filter((a) => areas.includes(a.id))
                  .map((a) => a.name)
                  .join(", ") || "None"}
              </dd>
            </div>
            <div className="border-b border-slate-100 py-2">
              <dt className="text-slate-500">Notes</dt>
              <dd className="mt-1 text-slate-800">{instructions || "—"}</dd>
            </div>
          </dl>
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setStep("new")}
              className="rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700"
            >
              Back to edit
            </button>
            <button
              type="button"
              onClick={() => setStep("submit")}
              className="rounded-full bg-[#0D2B4D] px-4 py-2.5 text-sm font-semibold text-white"
            >
              Continue to Submit
            </button>
          </div>
        </ScreenCard>
      ) : null}

      {step === "submit" ? (
        <ScreenCard>
          {!submitted ? (
            <>
              <h2 className="text-lg font-semibold text-[#0D2B4D]">
                Submit request
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Publishing opens this request for matching CNAs. Initial status:{" "}
                <strong>Open</strong>.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setStep("review")}
                  className="rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700"
                >
                  Back to review
                </button>
                <button
                  type="button"
                  onClick={confirmSubmit}
                  className="rounded-full bg-[#0FA3A3] px-4 py-2.5 text-sm font-semibold text-white"
                >
                  Submit request
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                Request submitted. Status: Open.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => router.push("/facility/requests/req-submitted")}
                  className="rounded-full bg-[#0D2B4D] px-4 py-2.5 text-sm font-semibold text-white"
                >
                  View request detail
                </button>
                <Link
                  href="/facility/requests"
                  className="rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700"
                >
                  Back to Request Staff
                </Link>
              </div>
            </>
          )}
        </ScreenCard>
      ) : null}
    </FacilityShell>
  );
}
