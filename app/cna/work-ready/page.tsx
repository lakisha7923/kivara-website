import Link from "next/link";

import CnaShell from "@/components/cna/CnaShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { evaluateWorkReady } from "@/lib/rules/screenings";
import { mockCna } from "@/lib/mock/v1-data";

function credentialTone(status: string) {
  if (status === "Approved") return "success" as const;
  if (
    status === "Expiring Soon" ||
    status === "Pending Review" ||
    status === "Uploaded"
  )
    return "warning" as const;
  return "danger" as const;
}

export default function CnaWorkReadyPage() {
  const evaluation = evaluateWorkReady(mockCna.credentials);

  return (
    <CnaShell>
      <PageHeader
        eyebrow="Work Ready"
        title="Eligibility details"
        subtitle="Work Ready requires approved core credentials, including Background Check and Drug Screen."
      />

      <div className="space-y-4">
        <ScreenCard>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">Current status</p>
              <p className="text-xl font-bold text-[#0D2B4D]">{mockCna.status}</p>
            </div>
            <StatusBadge
              label={
                evaluation.workReady && mockCna.workReady
                  ? "Eligible"
                  : "Blocked"
              }
              tone={
                evaluation.workReady && mockCna.workReady ? "success" : "danger"
              }
            />
          </div>
          <p className="mt-3 text-sm text-slate-600">
            {evaluation.workReady
              ? "Core credentials are in good standing. Facility-specific requirements may still limit some shifts."
              : "Complete required screening and credential approvals to become Work Ready."}
          </p>
        </ScreenCard>

        <ScreenCard>
          <h2 className="font-bold text-[#0D2B4D]">Required for Work Ready</h2>
          <ul className="mt-3 space-y-2">
            {evaluation.required.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2"
              >
                <div>
                  <p className="text-sm font-medium text-slate-800">{item.name}</p>
                  {!item.satisfied ? (
                    <p className="text-xs text-rose-700">Blocks Work Ready</p>
                  ) : null}
                </div>
                <StatusBadge
                  label={item.status}
                  tone={credentialTone(item.status)}
                />
              </li>
            ))}
          </ul>
        </ScreenCard>

        <ScreenCard>
          <h2 className="font-bold text-[#0D2B4D]">Approved work areas</h2>
          <ul className="mt-3 space-y-2">
            {mockCna.workAreas.map((area) => (
              <li
                key={area}
                className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700"
              >
                {area}
              </li>
            ))}
          </ul>
        </ScreenCard>

        <ScreenCard>
          <h2 className="font-bold text-[#0D2B4D]">All credentials</h2>
          <ul className="mt-3 space-y-2">
            {mockCna.credentials.map((credential) => (
              <li key={credential.id}>
                <Link
                  href={`/cna/credentials/${credential.id}`}
                  className="flex items-center justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2"
                >
                  <span className="text-sm text-slate-700">{credential.name}</span>
                  <StatusBadge
                    label={credential.status}
                    tone={credentialTone(credential.status)}
                  />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/cna/credentials"
            className="mt-3 inline-flex text-sm font-semibold text-teal-700"
          >
            Open credential center →
          </Link>
        </ScreenCard>

        <Link href="/cna" className="inline-flex text-sm font-semibold text-teal-700">
          ← Back home
        </Link>
      </div>
    </CnaShell>
  );
}
