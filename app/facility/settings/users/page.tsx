import Link from "next/link";

import FacilityShell from "@/components/facility/FacilityShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";

export default function FacilityUsersSettingsPage() {
  return (
    <FacilityShell>
      <PageHeader
        eyebrow="Settings"
        title="Users"
        subtitle="People authorized to use the Facility Portal."
      />
      <div className="space-y-3">
        {[
          {
            name: "Sarah Johnson",
            role: "DON",
            email: "sjohnson@memorial.example",
            status: "Active",
          },
          {
            name: "Morgan Lee",
            role: "Scheduler",
            email: "mlee@memorial.example",
            status: "Active",
          },
          {
            name: "Pat Ellis",
            role: "Assistant DON",
            email: "pellis@memorial.example",
            status: "Invited",
          },
        ].map((user) => (
          <ScreenCard key={user.email}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-[#0D2B4D]">{user.name}</p>
                <p className="text-sm text-slate-600">
                  {user.role} · {user.email}
                </p>
              </div>
              <StatusBadge
                label={user.status}
                tone={user.status === "Active" ? "success" : "warning"}
              />
            </div>
          </ScreenCard>
        ))}
      </div>
      <p className="mt-5">
        <Link href="/facility/settings" className="text-sm font-semibold text-teal-700">
          ← Back to Settings
        </Link>
      </p>
    </FacilityShell>
  );
}
