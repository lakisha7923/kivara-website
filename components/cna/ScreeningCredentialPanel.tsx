"use client";

import { useMemo, useState } from "react";

import { ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { screeningsForCredential } from "@/lib/mock/screenings";
import {
  SCREENING_STATUS_RULES,
  screeningTone,
} from "@/lib/rules/screenings";
import type { Credential, ScreeningOrderStatus } from "@/types/kivara";

type FlowStep = 1 | 2 | 3;

const DEMO_STATUSES: ScreeningOrderStatus[] = [
  "In Progress",
  "Clear",
  "Consider",
  "Failed",
];

function stepFromStatus(status: ScreeningOrderStatus, consented: boolean): FlowStep {
  if (!consented || status === "Consent Needed" || status === "Not Started") {
    return 1;
  }
  if (status === "Clear" || status === "Failed" || status === "Consider") {
    return 3;
  }
  return 2;
}

export default function ScreeningCredentialPanel({
  credential,
}: {
  credential: Credential;
}) {
  const base = screeningsForCredential(credential.id)[0];
  const initialStatus = base?.orderStatus ?? "Not Started";
  const [orderStatus, setOrderStatus] =
    useState<ScreeningOrderStatus>(initialStatus);
  const [consented, setConsented] = useState(
    !["Consent Needed", "Not Started"].includes(initialStatus)
  );
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const rules = SCREENING_STATUS_RULES[orderStatus];
  const isDrug =
    credential.kind === "drug" || /drug/i.test(credential.name);
  const kindLabel = isDrug ? "Drug Screen" : "Background Check";
  const step = stepFromStatus(orderStatus, consented);

  const nextSteps = useMemo(() => {
    if (!consented || orderStatus === "Consent Needed") {
      return "Sign consent so Kivara can start this screening.";
    }
    if (orderStatus === "Not Started" || orderStatus === "Ordered") {
      return isDrug
        ? "Upload a lab clearance, or wait for the vendor collection invite (coming soon)."
        : "Upload a clearance letter, or wait for the vendor order (coming soon).";
    }
    if (orderStatus === "In Progress") {
      return "Screening is in progress. You will see Clear / Consider / Failed here.";
    }
    if (orderStatus === "Consider") {
      return "Kivara is reviewing your result. Support may contact you.";
    }
    if (orderStatus === "Clear") {
      return "This screening is satisfied for Work Ready.";
    }
    if (orderStatus === "Failed" || orderStatus === "Expired") {
      return "Contact Kivara Support for next steps.";
    }
    return rules.cnaMessage;
  }, [consented, orderStatus, isDrug, rules.cnaMessage]);

  function signConsent() {
    setConsented(true);
    setOrderStatus("Ordered");
    setMessage(
      "Consent saved. You can upload a clearance document now. Vendor e-order is a placeholder."
    );
  }

  function onManualUpload(file: File | undefined) {
    if (!file) return;
    setUploadedFile(file.name);
    setOrderStatus("In Progress");
    setMessage(
      `Uploaded ${file.name}. Status set to In Progress for Kivara review (manual path).`
    );
  }

  return (
    <div className="space-y-4">
      <ScreenCard>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
              Required for Work Ready
            </p>
            <h2 className="mt-1 text-lg font-bold text-[#0D2B4D]">{kindLabel}</h2>
          </div>
          <StatusBadge label={orderStatus} tone={screeningTone(orderStatus)} />
        </div>
        <p className="mt-3 text-sm text-slate-600">{rules.cnaMessage}</p>
        <p className="mt-2 text-sm text-slate-600">
          <span className="font-semibold text-[#0D2B4D]">Next step: </span>
          {nextSteps}
        </p>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between gap-3 border-b border-slate-100 py-2">
            <dt className="text-slate-500">Blocks Work Ready?</dt>
            <dd className="font-medium text-[#0D2B4D]">
              {rules.blocksWorkReady ? "Yes" : "No"}
            </dd>
          </div>
          <div className="flex justify-between gap-3 py-2">
            <dt className="text-slate-500">Credential status</dt>
            <dd className="font-medium text-[#0D2B4D]">{rules.credentialStatus}</dd>
          </div>
        </dl>
      </ScreenCard>

      <ScreenCard>
        <h3 className="text-sm font-bold text-[#0D2B4D]">Screening steps</h3>
        <ol className="mt-3 space-y-2">
          {[
            { n: 1 as const, label: "Consent" },
            { n: 2 as const, label: "Submit / process" },
            { n: 3 as const, label: "Result" },
          ].map((item) => {
            const active = step === item.n;
            const done = step > item.n;
            return (
              <li
                key={item.n}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm ${
                  active
                    ? "bg-[#E8F6F6] font-semibold text-[#0D2B4D]"
                    : done
                      ? "bg-emerald-50 text-emerald-800"
                      : "bg-slate-50 text-slate-500"
                }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    active || done
                      ? "bg-[#0D2B4D] text-white"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {done ? "✓" : item.n}
                </span>
                {item.label}
              </li>
            );
          })}
        </ol>
      </ScreenCard>

      <ScreenCard>
        <h3 className="font-bold text-[#0D2B4D]">1. Consent</h3>
        <p className="mt-2 text-sm text-slate-600">
          I authorize Kivara Healthcare to collect and review a{" "}
          {kindLabel.toLowerCase()} for staffing eligibility, and later to order
          it through a screening partner when vendor integration is live.
        </p>
        {consented ? (
          <p className="mt-3 text-sm font-medium text-emerald-700">
            Consent on file.
          </p>
        ) : (
          <button
            type="button"
            onClick={signConsent}
            className="mt-4 w-full rounded-full bg-[#0D2B4D] px-4 py-3 text-sm font-semibold text-white"
          >
            Sign consent
          </button>
        )}
      </ScreenCard>

      <ScreenCard>
        <h3 className="font-bold text-[#0D2B4D]">2. Manual upload (V1)</h3>
        <p className="mt-2 text-sm text-slate-600">
          Upload a clearance letter, lab result summary, or facility-accepted
          screening document. This is the manual path until vendors are
          connected.
        </p>
        <label className="mt-4 block text-sm font-semibold text-[#0D2B4D]">
          Upload document
          <input
            type="file"
            accept="image/*,.pdf"
            disabled={!consented}
            className="mt-2 block w-full text-sm disabled:opacity-50"
            onChange={(e) => onManualUpload(e.target.files?.[0])}
          />
        </label>
        {!consented ? (
          <p className="mt-2 text-xs text-amber-800">
            Sign consent before uploading.
          </p>
        ) : null}
        {uploadedFile ? (
          <p className="mt-2 text-sm text-slate-600">Selected: {uploadedFile}</p>
        ) : null}
        <button
          type="button"
          disabled={!consented || !uploadedFile}
          onClick={() => {
            setOrderStatus("In Progress");
            setMessage(
              "Submitted for Kivara credentialing review (manual screening path)."
            );
          }}
          className="mt-4 w-full rounded-full bg-[#0FA3A3] px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Submit for Kivara review
        </button>
      </ScreenCard>

      <ScreenCard className="border-dashed border-slate-300 bg-slate-50">
        <h3 className="font-bold text-[#0D2B4D]">Vendor integration placeholder</h3>
        <p className="mt-2 text-sm text-slate-600">
          Planned: {base?.vendorName ?? credential.vendorName ?? "screening partner"}{" "}
          · {base?.packageName ?? "Healthcare standard package"}.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
          <li>E-order after consent</li>
          <li>Collection-site invite for drug screens</li>
          <li>Webhook status: Ordered → In Progress → Clear / Consider / Failed</li>
        </ul>
        <button
          type="button"
          disabled
          className="mt-4 w-full rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-400"
        >
          Order via vendor (coming soon)
        </button>
      </ScreenCard>

      <ScreenCard>
        <h3 className="font-bold text-[#0D2B4D]">3. Result</h3>
        <p className="mt-2 text-sm text-slate-600">
          You only see status and next steps. Full vendor reports stay with
          Kivara credentialing.
        </p>
        <p className="mt-3 text-sm text-slate-600">
          {base?.cnaSummary ??
            credential.resultSummary ??
            "No detailed report is shown in the CNA app."}
        </p>
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Demo status controls
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
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
        </div>
        {message ? (
          <p className="mt-3 text-sm font-medium text-emerald-700">{message}</p>
        ) : null}
      </ScreenCard>
    </div>
  );
}
