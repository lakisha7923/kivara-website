"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import AdminShell from "@/components/admin/AdminShell";
import { useHandoffs } from "@/components/handoffs/HandoffProvider";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockInvoices } from "@/lib/mock/v1-data";

const STATUS_FLOW = ["Draft", "Reviewed", "Issued", "Due", "Paid"] as const;

export default function AdminInvoiceDetailPage() {
  const params = useParams<{ id: string }>();
  const { record, hydrated } = useHandoffs();
  const isHandoff = params.id === "inv-handoff";
  const invoice = mockInvoices.find((i) => i.id === params.id);
  const [status, setStatus] = useState<string | null>(null);

  if (!invoice && !isHandoff) {
    return (
      <AdminShell title="Invoice Detail">
        <PageHeader title="Invoice not found" />
        <Link href="/admin/invoices" className="text-sm font-semibold text-teal-700">
          ← Back to Invoices
        </Link>
      </AdminShell>
    );
  }

  const id = invoice?.id ?? (hydrated ? record.invoiceId : "—");
  const facility =
    invoice?.facilityName ?? (hydrated ? record.facilityName : "—");
  const period =
    invoice?.periodLabel ??
    (hydrated ? `Shift ${record.date}` : "From locked timesheet");
  const amount =
    invoice?.amount ??
    (hydrated ? record.actualHours * record.billRate : 0);
  const current = status ?? invoice?.status ?? "Draft";

  return (
    <AdminShell title="Invoice Detail">
      <PageHeader
        eyebrow="Invoices"
        title={String(id).toUpperCase()}
        subtitle="Draft from Locked Timesheet → Review → Issue → Due/Paid"
      />

      <ScreenCard className="mb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm text-slate-600">{facility}</p>
            <p className="text-sm text-slate-600">{period}</p>
            <p className="mt-2 text-3xl font-bold text-[#0D2B4D]">
              ${Number(amount).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <StatusBadge label={current} tone="info" />
        </div>
      </ScreenCard>

      <ScreenCard className="mb-4">
        <h2 className="font-semibold text-[#0D2B4D]">Status path</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {STATUS_FLOW.map((step) => (
            <button
              key={step}
              type="button"
              onClick={() => setStatus(step)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                step === current
                  ? "bg-[#0D2B4D] text-white"
                  : "border border-slate-200 bg-white text-slate-600"
              }`}
            >
              {step}
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setStatus("Reviewed")}
            className="rounded-full border px-4 py-2 text-sm font-semibold"
          >
            Mark reviewed
          </button>
          <button
            type="button"
            onClick={() => setStatus("Issued")}
            className="rounded-full bg-[#0FA3A3] px-4 py-2 text-sm font-semibold text-white"
          >
            Issue invoice
          </button>
          <button
            type="button"
            onClick={() => setStatus("Paid")}
            className="rounded-full bg-[#0D2B4D] px-4 py-2 text-sm font-semibold text-white"
          >
            Mark paid
          </button>
        </div>
      </ScreenCard>

      <ScreenCard>
        <h2 className="font-semibold text-[#0D2B4D]">Documents</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {[
            "Invoice PDF",
            "Locked timesheet source",
            "Billable hours summary",
          ].map((doc) => (
            <li
              key={doc}
              className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2"
            >
              <span>{doc}</span>
              <button type="button" className="font-semibold text-teal-700">
                View
              </button>
            </li>
          ))}
        </ul>
      </ScreenCard>

      <p className="mt-5">
        <Link href="/admin/invoices" className="text-sm font-semibold text-teal-700">
          ← Back to Invoices
        </Link>
      </p>
    </AdminShell>
  );
}
