"use client";

import Link from "next/link";

import { useHandoffs } from "@/components/handoffs/HandoffProvider";
import { HANDOFF_STEPS, type PortalActor } from "@/lib/handoffs/journey";

const PORTAL_BADGE: Record<PortalActor, string> = {
  facility: "bg-sky-100 text-sky-900",
  admin: "bg-[#0D2B4D] text-white",
  cna: "bg-teal-100 text-teal-900",
};

export default function HandoffsBoardPage() {
  const { record, nextStep, resetJourney, hydrated, copy } = useHandoffs();

  if (!hydrated) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <p className="text-sm text-slate-500">Loading handoff board…</p>
      </main>
    );
  }

  const done = record.completedSteps.length;

  return (
    <main className="min-h-screen bg-[#F2F4F7] px-4 py-8 text-[#0D2B4D]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0FA3A3]">
              Screen Map §2
            </p>
            <h1 className="mt-1 font-[family-name:var(--font-playfair)] text-3xl font-bold">
              Cross-Portal Handoffs
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Facility ↔ Kivara Admin ↔ CNA. Walk the Table 1 chain so each portal
              action unlocks the next portal&apos;s work.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold"
            >
              Website
            </Link>
            <button
              type="button"
              onClick={resetJourney}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold"
            >
              Reset journey
            </button>
          </div>
        </div>

        <section className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-3">
          <Link href="/facility/requests" className="rounded-xl bg-sky-50 p-4 hover:bg-sky-100">
            <p className="text-xs font-bold uppercase tracking-wide text-sky-800">Facility Portal</p>
            <p className="mt-1 text-sm font-semibold">Request · Review · Invoice</p>
          </Link>
          <Link href="/admin/requests" className="rounded-xl bg-[#0D2B4D] p-4 text-white hover:brightness-110">
            <p className="text-xs font-bold uppercase tracking-wide text-[#D6F1F1]">Master Admin</p>
            <p className="mt-1 text-sm font-semibold">Publish · Confirm · Lock</p>
          </Link>
          <Link href="/cna/shifts" className="rounded-xl bg-teal-50 p-4 hover:bg-teal-100">
            <p className="text-xs font-bold uppercase tracking-wide text-teal-800">CNA App</p>
            <p className="mt-1 text-sm font-semibold">Request · Schedule · Clock</p>
          </Link>
        </section>

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-semibold">Demo record · {record.requestId}</h2>
            <p className="text-sm text-slate-600">
              {done}/{HANDOFF_STEPS.length} complete
              {nextStep ? ` · Next: ${nextStep.actionLabel}` : " · Journey complete"}
            </p>
          </div>
          <p className="mt-2 text-sm text-slate-600">
            {record.facilityName} · {record.unit} · {record.date} · {record.startTime}–
            {record.endTime} · {record.cnaName}
          </p>
          {record.confirmed ? (
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <p className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-900">
                CNA sees: {copy.cnaConfirmed}
              </p>
              <p className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-900">
                Facility sees: {copy.facilityConfirmed}
              </p>
            </div>
          ) : null}
        </section>

        <ol className="space-y-3">
          {HANDOFF_STEPS.map((step) => {
            const complete = record.completedSteps.includes(step.id);
            const current = nextStep?.id === step.id;
            return (
              <li
                key={step.id}
                className={`rounded-2xl border p-4 shadow-sm ${
                  complete
                    ? "border-emerald-200 bg-emerald-50/50"
                    : current
                      ? "border-[#0FA3A3] bg-white ring-2 ring-[#0FA3A3]/20"
                      : "border-slate-200 bg-white opacity-70"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-slate-500">Step {step.order}</span>
                      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${PORTAL_BADGE[step.actor]}`}>
                        {step.actor.toUpperCase()}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500">
                        {complete ? "DONE" : current ? "READY" : "LOCKED"}
                      </span>
                    </div>
                    <h3 className="mt-2 font-bold text-[#0D2B4D]">{step.trigger}</h3>
                    <p className="mt-1 text-sm text-slate-600">{step.whatHappensNext}</p>
                  </div>
                  <Link
                    href={step.portalHref}
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      current ? "bg-[#0FA3A3] text-white" : "border border-slate-200 bg-white text-[#0D2B4D]"
                    }`}
                  >
                    {step.actionLabel}
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>

        <section className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="font-semibold">Audit trail</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {record.auditTrail.length === 0 ? (
                <li className="text-slate-500">No handoffs yet.</li>
              ) : (
                record.auditTrail.map((item, index) => (
                  <li key={`${item.at}-${index}`} className="rounded-xl bg-slate-50 px-3 py-2">
                    <p className="font-medium">{item.action}</p>
                    <p className="text-xs text-slate-500">
                      {item.actor} · {item.at}
                    </p>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="font-semibold">Notifications by portal</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {record.notifications.length === 0 ? (
                <li className="text-slate-500">No alerts yet.</li>
              ) : (
                record.notifications.slice(0, 8).map((note) => (
                  <li key={note.id} className="rounded-xl bg-slate-50 px-3 py-2">
                    <p className="text-[10px] font-bold uppercase text-slate-500">{note.portal}</p>
                    <p className="font-medium">{note.title}</p>
                    <p className="text-xs text-slate-600">{note.detail}</p>
                  </li>
                ))
              )}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
