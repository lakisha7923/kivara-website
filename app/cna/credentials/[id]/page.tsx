"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import CnaShell from "@/components/cna/CnaShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockCna } from "@/lib/mock/v1-data";

export default function CnaCredentialDetailPage() {
  const params = useParams<{ id: string }>();
  const credential = mockCna.credentials.find((item) => item.id === params.id);
  const [status, setStatus] = useState(credential?.status ?? "Missing");
  const [note, setNote] = useState("");

  if (!credential) {
    return (
      <CnaShell>
        <PageHeader title="Credential not found" />
        <Link href="/cna/credentials" className="text-teal-700">
          Back to credentials
        </Link>
      </CnaShell>
    );
  }

  return (
    <CnaShell>
      <PageHeader
        eyebrow="Credential detail"
        title={credential.name}
        subtitle="Upload or replace a document, then track review status."
      />

      <div className="space-y-4">
        <ScreenCard>
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm text-slate-500">Status</p>
            <StatusBadge
              label={status}
              tone={
                status === "Approved"
                  ? "success"
                  : status === "Rejected" || status === "Missing"
                    ? "danger"
                    : "warning"
              }
            />
          </div>
          {credential.expiresOn ? (
            <p className="mt-3 text-sm text-slate-600">
              Expires {credential.expiresOn}
            </p>
          ) : (
            <p className="mt-3 text-sm text-slate-600">No expiration on file</p>
          )}
        </ScreenCard>

        <ScreenCard>
          <h2 className="font-bold text-[#0D2B4D]">Upload / replace</h2>
          <p className="mt-2 text-sm text-slate-600">
            Demo upload only — file is not stored yet. Status moves to Pending
            Review.
          </p>
          <label className="mt-4 block text-sm font-semibold text-[#0D2B4D]">
            Choose file
            <input
              type="file"
              accept="image/*,.pdf"
              className="mt-2 block w-full text-sm"
              onChange={() => {
                setStatus("Pending Review");
                setNote("Document submitted for Kivara review.");
              }}
            />
          </label>
          <button
            type="button"
            onClick={() => {
              setStatus("Pending Review");
              setNote("Document submitted for Kivara review.");
            }}
            className="mt-4 w-full rounded-full bg-[#0D2B4D] py-3 text-sm font-semibold text-white"
          >
            Submit for review
          </button>
          {note ? (
            <p className="mt-3 text-sm font-medium text-emerald-700">{note}</p>
          ) : null}
        </ScreenCard>

        <ScreenCard>
          <h2 className="font-bold text-[#0D2B4D]">Review outcomes</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setStatus("Approved");
                setNote("Approved by Kivara credentialing.");
              }}
              className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-800"
            >
              Simulate Approved
            </button>
            <button
              type="button"
              onClick={() => {
                setStatus("Rejected");
                setNote("Rejected — please upload a clearer document.");
              }}
              className="rounded-full bg-rose-100 px-3 py-1.5 text-xs font-semibold text-rose-800"
            >
              Simulate Rejected
            </button>
          </div>
        </ScreenCard>

        <Link href="/cna/credentials" className="text-sm font-semibold text-teal-700">
          ← Back to credential list
        </Link>
      </div>
    </CnaShell>
  );
}
