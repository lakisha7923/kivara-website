import Link from "next/link";

import CnaShell from "@/components/cna/CnaShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockCna, mockTimesheets } from "@/lib/mock/v1-data";

export default function CnaPayPage() {
  return (
    <CnaShell>
      <PageHeader
        eyebrow="Hours & Pay"
        title="Approved hours & pay status"
        subtitle="Official pay stubs stay with the payroll provider. Kivara shows approved hours and status."
      />
      <ScreenCard className="mb-4">
        <p className="text-sm text-[var(--kivara-gray)]">This period</p>
        <p className="mt-1 text-3xl font-bold text-[var(--kivara-navy)]">
          {mockCna.approvedHoursThisPeriod}.00 hrs
        </p>
        <div className="mt-3">
          <StatusBadge label={mockCna.payStatus} tone="success" />
        </div>
      </ScreenCard>
      <div className="space-y-3">
        {mockTimesheets.map((sheet) => (
          <ScreenCard key={sheet.id}>
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="font-semibold text-[var(--kivara-navy)]">{sheet.date}</p>
                <p className="text-sm text-slate-600">{sheet.facilityName}</p>
              </div>
              <StatusBadge label={sheet.status} tone="info" />
            </div>
            <p className="mt-2 text-sm text-slate-700">
              {sheet.actualHours} hrs worked · {sheet.scheduledHours} scheduled
            </p>
          </ScreenCard>
        ))}
      </div>
      <Link href="/cna" className="mt-4 inline-block text-sm font-semibold text-[var(--kivara-teal)]">
        ← Back home
      </Link>
    </CnaShell>
  );
}
