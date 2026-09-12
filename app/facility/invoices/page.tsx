import FacilityShell from "@/components/facility/FacilityShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockInvoices } from "@/lib/mock/v1-data";

export default function FacilityInvoicesPage() {
  return (
    <FacilityShell title="Invoices">
      <PageHeader
        eyebrow="Billing"
        title="Your facility invoices"
        subtitle="Invoices are generated from approved, locked billable hours. You only see your own facility records."
      />

      <div className="space-y-3">
        {mockInvoices.map((invoice) => (
          <ScreenCard key={invoice.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-bold text-[var(--kivara-navy)]">
                  {invoice.periodLabel}
                </h2>
                <p className="text-sm text-slate-600">
                  {invoice.shiftCount} shifts · {invoice.billableHours} billable hrs
                </p>
                <p className="mt-2 text-2xl font-bold text-[var(--kivara-navy)]">
                  ${invoice.amount.toLocaleString()}
                </p>
              </div>
              <StatusBadge
                label={invoice.status}
                tone={invoice.status === "Issued" ? "success" : "neutral"}
              />
            </div>
          </ScreenCard>
        ))}
      </div>
    </FacilityShell>
  );
}
