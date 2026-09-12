"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import FacilityShell from "@/components/facility/FacilityShell";
import { useHandoffs } from "@/components/handoffs/HandoffProvider";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockInvoices } from "@/lib/mock/v1-data";

const DOCUMENTS = [
  { name: "Invoice PDF", type: "PDF", updated: "Generated with invoice" },
  { name: "Billable hours summary", type: "PDF", updated: "From locked timesheets" },
  { name: "Assignment detail export", type: "CSV", updated: "Optional support file" },
];

export default function FacilityInvoiceDetailPage() {
  const params = useParams<{ id: string }>();
  const { record, hydrated } = useHandoffs();

  const isHandoff = params.id === "inv-handoff";
  const invoice = mockInvoices.find((i) => i.id === params.id);

  if (!invoice && !isHandoff) {
    return (
      <FacilityShell title="Invoice Detail">
        <PageHeader title="Invoice not found" />
        <Link href="/facility/invoices" className="text-sm font-semibold text-teal-700">
          ← Back to Invoices
        </Link>
      </FacilityShell>
    );
  }

  const id = invoice?.id ?? (hydrated ? record.invoiceId : "—");
  const period =
    invoice?.periodLabel ??
    (hydrated ? `Shift ${record.date}` : "—");
  const amount =
    invoice?.amount ??
    (hydrated ? record.actualHours * record.billRate : 0);
  const status = invoice?.status ?? "Draft";
  const shifts = invoice?.shiftCount ?? 1;
  const hours =
    invoice?.billableHours ?? (hydrated ? record.actualHours : 0);

  return (
    <FacilityShell title="Invoice Detail">
      <PageHeader
        eyebrow="Invoices"
        title={String(id).toUpperCase()}
        subtitle="Status / Documents"
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <ScreenCard>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm text-slate-600">{period}</p>
              <p className="mt-2 text-3xl font-bold text-[#0D2B4D]">
                ${Number(amount).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                {shifts} shift{shifts === 1 ? "" : "s"} · {hours} billable hrs
              </p>
            </div>
            <StatusBadge
              label={status}
              tone={status === "Issued" || status === "Paid" ? "success" : "info"}
            />
          </div>
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Draft", "Reviewed", "Issued", "Sent", "Due", "Paid"].map((s) => (
                <span
                  key={s}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    s === status
                      ? "bg-[#0D2B4D] text-white"
                      : "border border-slate-200 bg-white text-slate-600"
                  }`}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </ScreenCard>

        <ScreenCard>
          <h2 className="font-semibold text-[#0D2B4D]">Documents</h2>
          <ul className="mt-3 space-y-2">
            {DOCUMENTS.map((doc) => (
              <li
                key={doc.name}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 px-3 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-[#0D2B4D]">
                    {doc.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {doc.type} · {doc.updated}
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-[#0D2B4D]"
                >
                  View
                </button>
              </li>
            ))}
          </ul>
        </ScreenCard>
      </div>

      <p className="mt-5">
        <Link href="/facility/invoices" className="text-sm font-semibold text-teal-700">
          ← Back to Invoices
        </Link>
      </p>
    </FacilityShell>
  );
}
