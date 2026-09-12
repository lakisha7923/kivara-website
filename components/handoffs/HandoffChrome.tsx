"use client";

import Link from "next/link";

import { useHandoffs } from "@/components/handoffs/HandoffProvider";
import { HANDOFF_STEPS, type PortalActor } from "@/lib/handoffs/journey";

const actorLabel: Record<PortalActor, string> = {
  facility: "Facility",
  admin: "Admin",
  cna: "CNA",
};

export function HandoffRail({ portal }: { portal: PortalActor }) {
  const { record, nextStep, unreadFor } = useHandoffs();
  const unread = unreadFor(portal);
  const done = record.completedSteps.length;
  const total = HANDOFF_STEPS.length;

  return (
    <div className="mb-4 rounded-2xl border border-[#0FA3A3]/30 bg-gradient-to-r from-[#D6F1F1]/80 to-white p-3 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#0FA3A3]">
            Cross-portal handoffs
          </p>
          <p className="text-sm font-semibold text-[#0D2B4D]">
            Journey {done}/{total}
            {nextStep
              ? ` · Next: ${actorLabel[nextStep.actor]} — ${nextStep.actionLabel}`
              : " · Complete"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unread.length ? (
            <span className="rounded-full bg-[#0D2B4D] px-2.5 py-1 text-[11px] font-bold text-white">
              {unread.length} new
            </span>
          ) : null}
          <Link
            href="/handoffs"
            className="rounded-full bg-[#0FA3A3] px-3 py-1.5 text-xs font-semibold text-white"
          >
            Open handoff board
          </Link>
        </div>
      </div>
      <div className="mt-3 flex gap-1">
        {HANDOFF_STEPS.map((step) => {
          const complete = record.completedSteps.includes(step.id);
          const current = nextStep?.id === step.id;
          return (
            <div
              key={step.id}
              title={step.trigger}
              className={`h-1.5 flex-1 rounded-full ${
                complete
                  ? "bg-emerald-500"
                  : current
                    ? "bg-[#0FA3A3]"
                    : "bg-slate-200"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

export function HandoffNotifications({ portal }: { portal: PortalActor }) {
  const { record, markPortalRead } = useHandoffs();
  const notes = record.notifications.filter((n) => n.portal === portal);

  if (notes.length === 0) return null;

  return (
    <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-[#0D2B4D]">Handoff alerts</h2>
        <button
          type="button"
          onClick={() => markPortalRead(portal)}
          className="text-xs font-semibold text-[#0FA3A3]"
        >
          Mark read
        </button>
      </div>
      <ul className="mt-3 space-y-2">
        {notes.slice(0, 4).map((note) => (
          <li
            key={note.id}
            className={`rounded-xl px-3 py-2 text-sm ${
              note.read ? "bg-slate-50 text-slate-600" : "bg-[#D6F1F1]/60"
            }`}
          >
            <p className="font-semibold text-[#0D2B4D]">{note.title}</p>
            <p className="text-xs text-slate-600">{note.detail}</p>
            <p className="mt-1 text-[10px] text-slate-400">{note.at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
