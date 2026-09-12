import Link from "next/link";

import FacilityShell from "@/components/facility/FacilityShell";
import { PageHeader, ScreenCard } from "@/components/ui/primitives";

const ROLES = [
  {
    role: "DON",
    permissions: [
      "Request Staff",
      "Review timesheets",
      "View invoices",
      "Manage users",
      "Edit notification preferences",
    ],
  },
  {
    role: "Scheduler",
    permissions: [
      "Request Staff",
      "View Active Assignments",
      "View Today's Attendance",
      "Review timesheets",
    ],
  },
  {
    role: "Billing",
    permissions: ["View invoices", "Download invoice documents"],
  },
];

export default function FacilityPermissionsSettingsPage() {
  return (
    <FacilityShell>
      <PageHeader
        eyebrow="Settings"
        title="Permissions"
        subtitle="Role-based access for Facility Portal actions."
      />
      <div className="space-y-3">
        {ROLES.map((row) => (
          <ScreenCard key={row.role}>
            <p className="font-semibold text-[#0D2B4D]">{row.role}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {row.permissions.map((p) => (
                <li
                  key={p}
                  className="rounded-full bg-[#D6F1F1] px-3 py-1 text-xs font-semibold text-[#0D2B4D]"
                >
                  {p}
                </li>
              ))}
            </ul>
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
