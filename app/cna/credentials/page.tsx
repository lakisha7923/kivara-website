import Link from "next/link";

import CnaShell from "@/components/cna/CnaShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockCna } from "@/lib/mock/v1-data";

function toneFor(status: string) {
  if (status === "Approved") return "success" as const;
  if (
    status === "Expiring Soon" ||
    status === "Pending Review" ||
    status === "Uploaded"
  )
    return "warning" as const;
  return "danger" as const;
}

export default function CnaCredentialsPage() {
  return (
    <CnaShell>
      <PageHeader
        eyebrow="Credentials"
        title="Credential list"
        subtitle="Licenses, certifications, Background Check, and Drug Screen — required for Work Ready."
      />
      <div className="space-y-3">
        {mockCna.credentials.map((credential) => (
          <ScreenCard key={credential.id}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="font-bold text-[#0D2B4D]">{credential.name}</h2>
                {credential.expiresOn ? (
                  <p className="text-sm text-slate-600">
                    Expires {credential.expiresOn}
                  </p>
                ) : null}
              </div>
              <StatusBadge
                label={credential.status}
                tone={toneFor(credential.status)}
              />
            </div>
            <Link
              href={`/cna/credentials/${credential.id}`}
              className="mt-4 inline-flex rounded-full border border-[#0D2B4D] px-4 py-2 text-sm font-semibold text-[#0D2B4D]"
            >
              Open detail
            </Link>
          </ScreenCard>
        ))}
      </div>
      <Link
        href="/cna/more"
        className="mt-4 inline-block text-sm font-semibold text-teal-700"
      >
        ← Back to More
      </Link>
    </CnaShell>
  );
}
