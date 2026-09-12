"use client";

import FacilityShell from "@/components/facility/FacilityShell";
import {
  HandoffNotifications,
  HandoffRail,
} from "@/components/handoffs/HandoffChrome";
import { useHandoffs } from "@/components/handoffs/HandoffProvider";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockInvoices } from "@/lib/mock/v1-data";

export default function FacilityInvoicesPage() {
  const { record, hydrated } = useHandoffs();
  const drafted = hydrated && record.invoiceDrafted;
  const amount = record.actualHours * record.billRate;

  return (
    <FacilityShell title="Invoices">
      <HandoffRail portal="facility" />
      <HandoffNotifications portal="facility" />
      <PageHeader
        eyebrow="Billing"
        title="Your facility invoices"
        subtitle="Invoices are generated from approved, locked billable hours."
      />

      <div className="space-y-3">
        {drafted ? (
          <ScreenCard>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-[#0FA3A3]">
                  From locked handoff hours
                </p>
                <h2 className="font-bold text-[#0D2B4D]">{record.invoiceId}</h2>
                <p className="text-sm text-slate-600">
                  1 shift · {record.actualHours} billable hrs · {record.cnaName}
                </p>
                <p className="mt-2 text-2xl font-bold text-[#0D2B4D]">
                  ${amount.toFixed(2)}
                </p>
              </div>
              <StatusBadge label="Draft" tone="info" />
            </div>
          </ScreenCard>
        ) : null}

        {mockInvoices.map((invoice) => (
          <ScreenCard key={invoice.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-bold text-[#0D2B4D]">{invoice.periodLabel}</h2>
                <p className="text-sm text-slate-600">
                  {invoice.shiftCount} shifts · {invoice.billableHours} billable hrs
                </p>
                <p className="mt-2 text-2xl font-bold text-[#0D2B4D]">
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
