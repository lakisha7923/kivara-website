import AdminShell from "@/components/admin/AdminShell";
import { PageHeader, ScreenCard } from "@/components/ui/primitives";
import { mockAdminReports } from "@/lib/mock/v1-data";

export default function AdminReportsPage() {
  return (
    <AdminShell title="Reports">
      <PageHeader
        eyebrow="Insights"
        title="Reports"
        subtitle="Fill rate, exceptions, and credential risk."
      />
      <div className="space-y-3">
        {mockAdminReports.map((report) => (
          <ScreenCard key={report.id}>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {report.period}
            </p>
            <h2 className="mt-1 font-bold text-[#0D2B4D]">{report.name}</h2>
            <p className="mt-1 text-sm text-slate-600">{report.summary}</p>
            <button
              type="button"
              className="mt-3 rounded-full border px-4 py-2 text-sm font-semibold"
            >
              View report
            </button>
          </ScreenCard>
        ))}
      </div>
    </AdminShell>
  );
}
