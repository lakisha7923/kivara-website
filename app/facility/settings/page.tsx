import Link from "next/link";

import FacilityShell from "@/components/facility/FacilityShell";
import { PageHeader, ScreenCard } from "@/components/ui/primitives";

const SETTINGS_SECTIONS = [
  {
    href: "/facility/settings/locations",
    title: "Locations",
    detail: "Facilities, campuses, and unit addresses on your account.",
  },
  {
    href: "/facility/settings/users",
    title: "Users",
    detail: "Authorized facility users and their contact details.",
  },
  {
    href: "/facility/settings/permissions",
    title: "Permissions",
    detail: "Who can request staff, review timesheets, and view invoices.",
  },
  {
    href: "/facility/settings/notifications",
    title: "Notification Preferences",
    detail: "Email and in-app alerts for staffing, attendance, and billing.",
  },
] as const;

export default function FacilitySettingsPage() {
  return (
    <FacilityShell>
      <PageHeader
        eyebrow="Account"
        title="Settings"
        subtitle="Locations | Users | Permissions | Notification Preferences"
      />
      <div className="grid gap-4 md:grid-cols-2">
        {SETTINGS_SECTIONS.map((section) => (
          <Link key={section.href} href={section.href}>
            <ScreenCard className="h-full transition hover:border-[#0FA3A3]">
              <p className="font-semibold text-[#0D2B4D]">{section.title}</p>
              <p className="mt-1 text-sm text-slate-600">{section.detail}</p>
              <p className="mt-3 text-sm font-semibold text-teal-700">Open →</p>
            </ScreenCard>
          </Link>
        ))}
      </div>
    </FacilityShell>
  );
}
