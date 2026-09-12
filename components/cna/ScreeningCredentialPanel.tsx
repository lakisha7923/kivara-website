"use client";

import { useMemo, useState } from "react";

import { ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { screeningsForCredential } from "@/lib/mock/screenings";
import {
  SCREENING_STATUS_RULES,
  screeningTone,
} from "@/lib/rules/screenings";
import type { Credential, ScreeningOrderStatus } from "@/types/kivara";

const DEMO_STATUSES: ScreeningOrderStatus[] = [
  "In Progress",
  "Clear",
  "Consider",
  "Failed",
];

export default function ScreeningCredentialPanel({
  credential,
}: {
  credential: Credential;
}) {
  const base = screeningsForCredential(credential.id)[0];
  const [orderStatus, setOrderStatus] = useState<ScreeningOrderStatus>(
    base?.orderStatus ?? "Not Started"
  );
  const [consented, setConsented] = useState(
    !["Consent Needed", "Not Started"].includes(
      base?.orderStatus ?? "Not Started"
    )
  );
  const [message, setMessage] = useState<string | null>(null);

  const rules = SCREENING_STATUS_RULES[orderStatus];
  const isDrug =
    credential.kind === "drug" || /drug/i.test(credential.name);
  const kindLabel = isDrug ? "Drug Screen" : "Background Check";

  const nextSteps = useMemo(() => {
    if (orderStatus === "Consent Needed") {
      return "Sign consent below so Kivara can order this screening.";
    }
    if (orderStatus === "Not Started") {
      return "Kivara will order this screening after required onboarding steps.";
    }
    if (orderStatus === "Ordered" || orderStatus === "In Progress") {
      return isDrug
        ? "Watch for collection-site instructions from the lab partner."
        : "The background vendor is processing your check.";
    }
    if (orderStatus === "Consider") {
      return "Kivara credentialing is reviewing your result. No action needed unless Support contacts you.";
    }
    if (orderStatus === "Clear") {
      return "This requirement is satisfied for Work Ready.";
    }
    if (orderStatus === "Failed" || orderStatus === "Expired") {
      return "Contact Kivara Support for next steps.";
    }
    return rules.cnaMessage;
  }, [orderStatus, isDrug, rules.cnaMessage]);

  function signConsent() {
    setConsented(true);
    setOrderStatus("Ordered");
    setMessage(
      "Consent saved. Demo order placed with the planned vendor integration."
    );
  }

  return (
    <div className="space-y-4">
      <ScreenCard>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Screening status
            </p>
            <h2 className="mt-1 text-lg font-bold text-[#0D2B4D]">{kindLabel}</h2>
          </div>
          <StatusBadge label={orderStatus} tone={screeningTone(orderStatus)} />
        </div>
        <p className="mt-3 text-sm text-slate-600">{rules.cnaMessage}</p>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between gap-3 border-b border-slate-100 py-2">
            <dt className="text-slate-500">Vendor</dt>
            <dd className="font-medium text-[#0D2B4D]">
              {base?.vendorName ?? credential.vendorName ?? "Planned partner"}
            </dd>
          </div>
          <div className="flex justify-between gap-3 border-b border-slate-100 py-2">
            <dt className="text-slate-500">Package</dt>
            <dd className="text-right font-medium text-[#0D2B4D]">
              {base?.packageName ?? "Healthcare standard"}
            </dd>
          </div>
          <div className="flex justify-between gap-3 border-b border-slate-100 py-2">
            <dt className="text-slate-500">Credential status</dt>
            <dd className="font-medium text-[#0D2B4D]">{rules.credentialStatus}</dd>
          </div>
          <div className="flex justify-between gap-3 py-2">
            <dt className="text-slate-500">Blocks Work Ready?</dt>
            <dd className="font-medium text-[#0D2B4D]">
              {rules.blocksWorkReady ? "Yes" : "No"}
            </dd>
          </div>
        </dl>
      </ScreenCard>

      <ScreenCard>
        <h3 className="font-bold text-[#0D2B4D]">What you can see</h3>
        <p className="mt-2 text-sm text-slate-600">
          {base?.cnaSummary ??
            credential.resultSummary ??
            "Kivara only shows screening status — not full vendor report details."}
        </p>
        <p className="mt-3 text-sm text-slate-600">
          <span className="font-semibold text-[#0D2B4D]">Next step: </span>
          {nextSteps}
        </p>
      </ScreenCard>

      {orderStatus === "Consent Needed" ||
      (orderStatus === "Not Started" && !consented) ? (
        <ScreenCard>
          <h3 className="font-bold text-[#0D2B4D]">Consent</h3>
          <p className="mt-2 text-sm text-slate-600">
            I authorize Kivara Healthcare to order a {kindLabel.toLowerCase()}{" "}
            through its screening partner and to receive the pass/fail status
            needed for Work Ready.
          </p>
          <button
            type="button"
            onClick={signConsent}
            className="mt-4 w-full rounded-full bg-[#0D2B4D] px-4 py-3 text-sm font-semibold text-white"
          >
            Sign consent & request order
          </button>
        </ScreenCard>
      ) : null}

      <ScreenCard>
        <h3 className="font-bold text-[#0D2B4D]">Demo vendor outcomes</h3>
        <p className="mt-1 text-xs text-slate-500">
          Simulates webhook results until Checkr / lab APIs are connected.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {DEMO_STATUSES.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => {
                setOrderStatus(status);
                setMessage(`Demo status updated to ${status}.`);
              }}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-[#0D2B4D]"
            >
              {status}
            </button>
          ))}
        </div>
        {message ? (
          <p className="mt-3 text-sm font-medium text-emerald-700">{message}</p>
        ) : null}
      </ScreenCard>
    </div>
  );
}
