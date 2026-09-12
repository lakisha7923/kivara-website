import Link from "next/link";

import AdminShell from "@/components/admin/AdminShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockCna, mockOnboardingCna } from "@/lib/mock/v1-data";

export default function AdminCnasPage() {
  const people = [mockCna, mockOnboardingCna];

  return (
    <AdminShell title="CNAs">
      <PageHeader
        eyebrow="Workforce"
        title="CNAs"
        subtitle="Applications → CNA Detail → Onboarding → Credentials → Work Ready"
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {["Applications", "Onboarding", "Credentials", "Work Ready"].map(
          (stage) => (
            <span
              key={stage}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
            >
              {stage}
            </span>
          ),
        )}
      </div>

      <div className="space-y-3">
        {people.map((cna) => (
          <Link key={cna.id} href={`/admin/cnas/${cna.id}`}>
            <ScreenCard className="transition hover:border-[#0FA3A3]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[#0FA3A3]">
                    {cna.workReady ? "Work Ready" : "Application / Onboarding"}
                  </p>
                  <h2 className="text-lg font-bold text-[#0D2B4D]">
                    {cna.fullName}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {cna.email} · {cna.phone}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {cna.credentials.filter((c) => c.status === "Approved").length}/
                    {cna.credentials.length} credentials approved
                  </p>
                </div>
                <StatusBadge
                  label={cna.status}
                  tone={cna.workReady ? "success" : "warning"}
                />
              </div>
            </ScreenCard>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
