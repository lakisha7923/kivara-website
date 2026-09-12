"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import AdminShell from "@/components/admin/AdminShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockCna, mockOnboardingCna } from "@/lib/mock/v1-data";

const tabs = ["Overview", "Onboarding", "Credentials", "Work Ready"] as const;

export default function AdminCnaDetailPage() {
  const params = useParams<{ id: string }>();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview");
  const cna = useMemo(
    () =>
      [mockCna, mockOnboardingCna].find((person) => person.id === params.id) ??
      null,
    [params.id],
  );

  if (!cna) {
    return (
      <AdminShell title="CNA Detail">
        <PageHeader title="CNA not found" />
        <Link href="/admin/cnas" className="text-sm font-semibold text-teal-700">
          ← Back to CNAs
        </Link>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="CNA Detail">
      <PageHeader
        eyebrow="CNAs · Applications"
        title={cna.fullName}
        subtitle="CNA Detail → Onboarding → Credentials → Work Ready"
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <StatusBadge
          label={cna.status}
          tone={cna.workReady ? "success" : "warning"}
        />
        <StatusBadge
          label={cna.workReady ? "Work Ready" : "Not Work Ready"}
          tone={cna.workReady ? "success" : "warning"}
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              tab === item
                ? "bg-[#0D2B4D] text-white"
                : "border border-slate-200 bg-white text-[#0D2B4D]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === "Overview" ? (
        <ScreenCard>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-3 border-b border-slate-100 py-2">
              <dt className="text-slate-500">Email</dt>
              <dd className="font-medium">{cna.email}</dd>
            </div>
            <div className="flex justify-between gap-3 border-b border-slate-100 py-2">
              <dt className="text-slate-500">Phone</dt>
              <dd className="font-medium">{cna.phone}</dd>
            </div>
            <div className="flex justify-between gap-3 border-b border-slate-100 py-2">
              <dt className="text-slate-500">Work areas</dt>
              <dd className="text-right font-medium">{cna.workAreas.join(", ")}</dd>
            </div>
            <div className="flex justify-between gap-3 py-2">
              <dt className="text-slate-500">Pay status</dt>
              <dd className="text-right font-medium">{cna.payStatus}</dd>
            </div>
          </dl>
        </ScreenCard>
      ) : null}

      {tab === "Onboarding" ? (
        <ScreenCard>
          <h2 className="font-semibold text-[#0D2B4D]">Onboarding checklist</h2>
          {cna.actionItems.length === 0 ? (
            <p className="mt-3 text-sm text-slate-600">No open onboarding items.</p>
          ) : (
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
              {cna.actionItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </ScreenCard>
      ) : null}

      {tab === "Credentials" ? (
        <div className="space-y-3">
          {cna.credentials.map((credential) => (
            <ScreenCard key={credential.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-[#0D2B4D]">{credential.name}</p>
                  {credential.expiresOn ? (
                    <p className="text-sm text-slate-600">
                      Expires {credential.expiresOn}
                    </p>
                  ) : null}
                </div>
                <StatusBadge
                  label={credential.status}
                  tone={
                    credential.status === "Approved"
                      ? "success"
                      : credential.status === "Expiring Soon" ||
                          credential.status === "Missing"
                        ? "warning"
                        : "info"
                  }
                />
              </div>
              {credential.status !== "Approved" ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="rounded-full bg-[#0FA3A3] px-4 py-2 text-sm font-semibold text-white"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="rounded-full border px-4 py-2 text-sm font-semibold"
                  >
                    Request re-upload
                  </button>
                </div>
              ) : null}
            </ScreenCard>
          ))}
        </div>
      ) : null}

      {tab === "Work Ready" ? (
        <ScreenCard>
          <h2 className="font-semibold text-[#0D2B4D]">Work Ready status</h2>
          <p className="mt-2 text-sm text-slate-600">
            Work Ready requires approved credentials and completed onboarding.
            Only Master Admin restores this status.
          </p>
          <div className="mt-4">
            <StatusBadge
              label={cna.workReady ? "Work Ready" : "Blocked"}
              tone={cna.workReady ? "success" : "danger"}
            />
          </div>
          {!cna.workReady ? (
            <button
              type="button"
              className="mt-4 rounded-full bg-[#0D2B4D] px-4 py-2.5 text-sm font-semibold text-white"
            >
              Mark Work Ready
            </button>
          ) : (
            <p className="mt-4 text-sm font-medium text-emerald-700">
              Eligible for shift matching and confirmations.
            </p>
          )}
        </ScreenCard>
      ) : null}

      <p className="mt-5">
        <Link href="/admin/cnas" className="text-sm font-semibold text-teal-700">
          ← Back to CNAs
        </Link>
      </p>
    </AdminShell>
  );
}
