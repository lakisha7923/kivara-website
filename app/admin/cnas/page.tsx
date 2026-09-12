import AdminShell from "@/components/admin/AdminShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockCna, mockOnboardingCna } from "@/lib/mock/v1-data";

export default function AdminCnasPage() {
  const people = [mockCna, mockOnboardingCna];

  return (
    <AdminShell title="CNAs">
      <PageHeader
        eyebrow="Workforce"
        title="Applications, credentials & Work Ready"
        subtitle="Only authorized Kivara roles approve credentials and restore Work Ready status."
      />

      <div className="space-y-4">
        {people.map((cna) => (
          <ScreenCard key={cna.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-[var(--kivara-navy)]">
                  {cna.fullName}
                </h2>
                <p className="text-sm text-slate-600">
                  {cna.email} · {cna.phone}
                </p>
              </div>
              <StatusBadge
                label={cna.status}
                tone={cna.workReady ? "success" : "warning"}
              />
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {cna.credentials.map((credential) => (
                <div
                  key={credential.id}
                  className="rounded-xl bg-[var(--kivara-offwhite)] px-3 py-2 text-sm"
                >
                  <p className="font-semibold text-[var(--kivara-navy)]">
                    {credential.name}
                  </p>
                  <p className="text-slate-600">{credential.status}</p>
                </div>
              ))}
            </div>
            {!cna.workReady && cna.actionItems.length > 0 ? (
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
                {cna.actionItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </ScreenCard>
        ))}
      </div>
    </AdminShell>
  );
}
