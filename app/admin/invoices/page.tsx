import Link from "next/link";

import AdminShell from "@/components/admin/AdminShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockInvoices } from "@/lib/mock/v1-data";

export default function AdminInvoicesPage() {
  return (
    <AdminShell title="Invoices">
      <PageHeader
        eyebrow="Billing"
        title="Invoices"
        subtitle="Draft from Locked Timesheet → Review → Issue → Due/Paid"
      />
      <div className="space-y-3">
        {mockInvoices.map((invoice) => (
          <Link key={invoice.id} href={`/admin/invoices/${invoice.id}`}>
            <ScreenCard className="transition hover:border-[#0FA3A3]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold text-[#0D2B4D]">
                    {invoice.id.toUpperCase()}
                  </h2>
                  <p className="text-sm text-slate-600">{invoice.facilityName}</p>
                  <p className="text-sm text-slate-600">{invoice.periodLabel}</p>
                  <p className="mt-2 text-2xl font-bold text-[#0D2B4D]">
                    ${invoice.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-slate-600">
                    {invoice.shiftCount} shifts · {invoice.billableHours} hrs
                  </p>
                </div>
                <StatusBadge
                  label={invoice.status}
                  tone={invoice.status === "Issued" ? "success" : "info"}
                />
              </div>
              <p className="mt-3 text-sm font-semibold text-teal-700">
                Open status / documents →
              </p>
            </ScreenCard>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
