import AdminShell from "@/components/admin/AdminShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockAdminMessages } from "@/lib/mock/v1-data";

export default function AdminMessagesPage() {
  return (
    <AdminShell title="Messages">
      <PageHeader
        eyebrow="Communications"
        title="Messages"
        subtitle="Cross-portal threads with facilities and CNAs."
      />
      <div className="space-y-3">
        {mockAdminMessages.map((msg) => (
          <ScreenCard key={msg.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {msg.from} · {msg.at}
                </p>
                <h2 className="mt-1 font-bold text-[#0D2B4D]">{msg.subject}</h2>
                <p className="mt-1 text-sm text-slate-600">{msg.preview}</p>
              </div>
              {msg.unread ? <StatusBadge label="Unread" tone="warning" /> : null}
            </div>
          </ScreenCard>
        ))}
      </div>
    </AdminShell>
  );
}
