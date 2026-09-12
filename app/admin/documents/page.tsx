import AdminShell from "@/components/admin/AdminShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockAdminDocuments } from "@/lib/mock/v1-data";

export default function AdminDocumentsPage() {
  return (
    <AdminShell title="Documents">
      <PageHeader
        eyebrow="Files"
        title="Documents"
        subtitle="Contracts, rate cards, and operating policies."
      />
      <div className="space-y-3">
        {mockAdminDocuments.map((doc) => (
          <ScreenCard key={doc.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-bold text-[#0D2B4D]">{doc.name}</h2>
                <p className="text-sm text-slate-600">Updated {doc.updated}</p>
              </div>
              <StatusBadge label={doc.type} tone="info" />
            </div>
            <button
              type="button"
              className="mt-3 rounded-full border px-4 py-2 text-sm font-semibold"
            >
              Open
            </button>
          </ScreenCard>
        ))}
      </div>
    </AdminShell>
  );
}
