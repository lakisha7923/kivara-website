import Link from "next/link";

import CnaShell from "@/components/cna/CnaShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { isScreeningCredential } from "@/lib/rules/screenings";
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
  const licenses = mockCna.credentials.filter(
    (credential) => !isScreeningCredential(credential)
  );
  const screenings = mockCna.credentials.filter((credential) =>
    isScreeningCredential(credential)
  );

  return (
    <CnaShell>
      <PageHeader
        eyebrow="Credentials"
        title="Your credentials"
        subtitle="Keep licenses current, then complete Background Check and Drug Screen for Work Ready."
      />

      <div className="space-y-5">
        <section className="space-y-3">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Licenses & certifications
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Upload cards and certificates for Kivara review.
            </p>
          </div>
          {licenses.map((credential) => (
            <ScreenCard key={credential.id}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-[#0D2B4D]">{credential.name}</h3>
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
        </section>

        <section className="space-y-3">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Background & drug screens
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Manual for now: consent, upload clearance docs, track status.
              Vendor ordering (Checkr / lab) comes next.
            </p>
          </div>
          {screenings.map((credential) => (
            <ScreenCard key={credential.id} className="border-[#0FA3A3]/40">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-teal-700">
                    Required screening
                  </p>
                  <h3 className="mt-1 font-bold text-[#0D2B4D]">
                    {credential.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {credential.kind === "drug"
                      ? "Drug screen status for Work Ready"
                      : "Background check status for Work Ready"}
                  </p>
                </div>
                <StatusBadge
                  label={credential.status}
                  tone={toneFor(credential.status)}
                />
              </div>
              <Link
                href={`/cna/credentials/${credential.id}`}
                className="mt-4 inline-flex rounded-full bg-[#0D2B4D] px-4 py-2 text-sm font-semibold text-white"
              >
                Open screening flow
              </Link>
            </ScreenCard>
          ))}
        </section>
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
