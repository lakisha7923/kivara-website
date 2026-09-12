import AdminShell from "@/components/admin/AdminShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockInvoices } from "@/lib/mock/v1-data";

export default function AdminInvoicesPage() {
  return (
    <AdminShell title="Invoices">
      <PageHeader
        eyebrow="Billing"
        title="Facility invoice drafts"
        subtitle="Drafts come from approved locked billable hours. Review before issue."
      />
      <div className="space-y-3">
        {mockInvoices.map((invoice) => (
          <ScreenCard key={invoice.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-bold text-[var(--kivara-navy)]">
                  {invoice.facilityName}
                </h2>
                <p className="text-sm text-slate-600">{invoice.periodLabel}</p>
                <p className="mt-2 text-2xl font-bold">
                  ${invoice.amount.toLocaleString()}
                </p>
                <p className="text-sm text-slate-600">
                  {invoice.shiftCount} shifts · {invoice.billableHours} hrs
                </p>
              </div>
              <StatusBadge label={invoice.status} tone="info" />
            </div>
            <button
              type="button"
              className="mt-4 rounded-full bg-[var(--kivara-navy)] px-4 py-2 text-sm font-semibold text-white"
            >
              {invoice.status === "Draft" ? "Review & issue" : "View invoice"}
            </button>
          </ScreenCard>
        ))}
      </div>
    </AdminShell>
  );
}
