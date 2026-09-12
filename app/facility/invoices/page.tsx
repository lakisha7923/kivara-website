"use client";

import Link from "next/link";

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
        title="Invoices"
        subtitle="Invoice Detail → Status / Documents"
      />

      <div className="space-y-3">
        {drafted ? (
          <Link href="/facility/invoices/inv-handoff">
            <ScreenCard className="transition hover:border-[#0FA3A3]">
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
          </Link>
        ) : null}

        {mockInvoices.map((invoice) => (
          <Link key={invoice.id} href={`/facility/invoices/${invoice.id}`}>
            <ScreenCard className="transition hover:border-[#0FA3A3]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold text-[#0D2B4D]">{invoice.id.toUpperCase()}</h2>
                  <p className="text-sm text-slate-600">{invoice.periodLabel}</p>
                  <p className="text-sm text-slate-600">
                    {invoice.shiftCount} shifts · {invoice.billableHours} billable
                    hrs
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
          </Link>
        ))}
      </div>
    </FacilityShell>
  );
}
