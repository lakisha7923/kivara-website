"use client";

import { useState } from "react";

import { ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { screeningsForCredential } from "@/lib/mock/screenings";
import {
  SCREENING_STATUS_RULES,
  screeningTone,
} from "@/lib/rules/screenings";
import type { Credential, ScreeningOrderStatus } from "@/types/kivara";

export default function ScreeningAdminPanel({
  credential,
  cnaName,
}: {
  credential: Credential;
  cnaName: string;
}) {
  const base = screeningsForCredential(credential.id)[0];
  const [orderStatus, setOrderStatus] = useState<ScreeningOrderStatus>(
    base?.orderStatus ?? "Not Started"
  );
  const [note, setNote] = useState<string | null>(null);
  const rules = SCREENING_STATUS_RULES[orderStatus];

  function setStatus(next: ScreeningOrderStatus, message: string) {
    setOrderStatus(next);
    setNote(message);
  }

  return (
    <ScreenCard>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-[#0D2B4D]">{credential.name}</p>
          <p className="text-sm text-slate-600">
            {cnaName} · {base?.vendorName ?? credential.vendorName ?? "Vendor TBD"}
          </p>
        </div>
        <StatusBadge label={orderStatus} tone={screeningTone(orderStatus)} />
      </div>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between gap-3 border-b border-slate-100 py-2">
          <dt className="text-slate-500">Package</dt>
          <dd className="text-right font-medium">
            {base?.packageName ?? "Healthcare standard"}
          </dd>
        </div>
        <div className="flex justify-between gap-3 border-b border-slate-100 py-2">
          <dt className="text-slate-500">Mapped credential status</dt>
          <dd className="font-medium">{rules.credentialStatus}</dd>
        </div>
        <div className="flex justify-between gap-3 py-2">
          <dt className="text-slate-500">Blocks Work Ready?</dt>
          <dd className="font-medium">{rules.blocksWorkReady ? "Yes" : "No"}</dd>
        </div>
      </dl>

      <p className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">
        <span className="font-semibold text-[#0D2B4D]">Admin action: </span>
        {rules.adminAction}
      </p>

      {base?.adminNotes ? (
        <p className="mt-3 text-sm text-slate-600">
          <span className="font-semibold text-[#0D2B4D]">Restricted notes: </span>
          {base.adminNotes}
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() =>
            setStatus(
              "Ordered",
              "Demo order sent to planned vendor. Waiting on webhook."
            )
          }
          className="rounded-full bg-[#0FA3A3] px-4 py-2 text-sm font-semibold text-white"
        >
          Order screening
        </button>
        <button
          type="button"
          onClick={() =>
            setStatus("Clear", "Marked Clear — Work Ready blocker removed.")
          }
          className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
        >
          Mark Clear
        </button>
        <button
          type="button"
          onClick={() =>
            setStatus(
              "Consider",
              "Marked Consider — Work Ready stays blocked pending review."
            )
          }
          className="rounded-full border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-900"
        >
          Mark Consider
        </button>
        <button
          type="button"
          onClick={() =>
            setStatus("Failed", "Marked Failed — Work Ready remains blocked.")
          }
          className="rounded-full border border-rose-300 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-800"
        >
          Mark Failed
        </button>
      </div>
      {note ? (
        <p className="mt-3 text-sm font-medium text-emerald-700">{note}</p>
      ) : null}
    </ScreenCard>
  );
}
