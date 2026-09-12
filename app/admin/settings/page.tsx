import AdminShell from "@/components/admin/AdminShell";
import { PageHeader, ScreenCard } from "@/components/ui/primitives";

const sections = [
  ["Organization", "Legal entity, branding, and support contacts"],
  ["Roles & access", "Who can confirm, lock hours, issue invoices"],
  ["Matching rules", "Credential, distance, and Work Ready requirements"],
  ["Notification defaults", "Ops alert routing for urgent coverage gaps"],
  ["Integrations", "Payroll export and document storage connectors"],
];

export default function AdminSettingsPage() {
  return (
    <AdminShell title="Settings">
      <PageHeader
        eyebrow="Configuration"
        title="Settings"
        subtitle="Platform defaults for Master Admin operations."
      />
      <div className="grid gap-3 md:grid-cols-2">
        {sections.map(([title, detail]) => (
          <ScreenCard key={title}>
            <p className="font-semibold text-[#0D2B4D]">{title}</p>
            <p className="mt-1 text-sm text-slate-600">{detail}</p>
          </ScreenCard>
        ))}
      </div>
    </AdminShell>
  );
}
