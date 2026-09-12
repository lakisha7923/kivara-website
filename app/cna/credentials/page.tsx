import Link from "next/link";

import CnaShell from "@/components/cna/CnaShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockCna } from "@/lib/mock/v1-data";

function toneFor(status: string) {
  if (status === "Approved") return "success" as const;
  if (status === "Expiring Soon" || status === "Pending Review") return "warning" as const;
  if (status === "Missing" || status === "Rejected" || status === "Expired")
    return "danger" as const;
  return "neutral" as const;
}

export default function CnaCredentialsPage() {
  return (
    <CnaShell>
      <PageHeader
        eyebrow="Credentials"
        title="Your credential center"
        subtitle="Missing, rejected, or expired required credentials can affect Work Ready status."
      />
      <div className="space-y-3">
        {mockCna.credentials.map((credential) => (
          <ScreenCard key={credential.id}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="font-bold text-[var(--kivara-navy)]">{credential.name}</h2>
                {credential.expiresOn ? (
                  <p className="text-sm text-slate-600">Expires {credential.expiresOn}</p>
                ) : null}
              </div>
              <StatusBadge label={credential.status} tone={toneFor(credential.status)} />
            </div>
            <button
              type="button"
              className="mt-4 rounded-full border border-[var(--kivara-navy)] px-4 py-2 text-sm font-semibold text-[var(--kivara-navy)]"
            >
              Upload / replace
            </button>
          </ScreenCard>
        ))}
      </div>
      <Link href="/cna" className="mt-4 inline-block text-sm font-semibold text-[var(--kivara-teal)]">
        ← Back home
      </Link>
    </CnaShell>
  );
}
