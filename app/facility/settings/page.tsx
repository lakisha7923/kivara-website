import FacilityShell from "@/components/facility/FacilityShell";

export default function FacilitySettingsPage() {
  return (
    <FacilityShell>
      <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#0D2B4D]">
        Facility Settings
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Locations, authorized users, permissions, and notification preferences.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {[
          ["Locations", "Memorial Care Center · Main Campus"],
          ["Users & Permissions", "Sarah Johnson (DON) · Scheduler access"],
          ["Notification Preferences", "Email + in-app for staffing alerts"],
          ["Billing Contact", "Accounts Payable · invoices@memorial.example"],
        ].map(([title, detail]) => (
          <div
            key={title}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <p className="font-semibold text-[#0D2B4D]">{title}</p>
            <p className="mt-1 text-sm text-slate-600">{detail}</p>
          </div>
        ))}
      </div>
    </FacilityShell>
  );
}
