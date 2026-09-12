"use client";

import { useState } from "react";

import AdminShell from "@/components/admin/AdminShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockPayrollBatches } from "@/lib/mock/v1-data";

export default function AdminPayrollPage() {
  const [exportedId, setExportedId] = useState<string | null>(null);

  return (
    <AdminShell title="Payroll">
      <PageHeader
        eyebrow="Pay"
        title="Payroll"
        subtitle="Payroll-Ready Hours → Export/Send → Status/Reconcile"
      />

      <div className="space-y-3">
        {mockPayrollBatches.map((batch) => (
          <ScreenCard key={batch.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-bold text-[#0D2B4D]">{batch.periodLabel}</h2>
                <p className="text-sm text-slate-600">
                  {batch.cnaCount} CNAs · {batch.hours} payroll-ready hrs
                </p>
                <p className="mt-2 text-2xl font-bold text-[#0D2B4D]">
                  ${batch.amount.toLocaleString()}
                </p>
              </div>
              <StatusBadge
                label={
                  exportedId === batch.id && batch.status === "Ready to Export"
                    ? "Sent"
                    : batch.status
                }
                tone={
                  batch.status === "Reconciled" || batch.status === "Sent"
                    ? "success"
                    : "warning"
                }
              />
            </div>
            {batch.status === "Ready to Export" ? (
              <button
                type="button"
                onClick={() => setExportedId(batch.id)}
                className="mt-4 rounded-full bg-[#0FA3A3] px-4 py-2.5 text-sm font-semibold text-white"
              >
                {exportedId === batch.id ? "Exported / sent" : "Export / Send"}
              </button>
            ) : (
              <p className="mt-3 text-sm text-slate-600">
                Status tracked for reconciliation against provider confirmations.
              </p>
            )}
          </ScreenCard>
        ))}
      </div>
    </AdminShell>
  );
}
