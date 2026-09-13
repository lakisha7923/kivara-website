import Link from "next/link";

import FacilityShell from "@/components/facility/FacilityShell";
import { PageHeader, ScreenCard } from "@/components/ui/primitives";

const sections = [
  {
    title: "Staffing",
    links: [
      { href: "/facility/requests/new", label: "New staff request" },
      { href: "/facility/requests", label: "Open requests" },
      { href: "/facility/assignments", label: "Active assignments" },
      { href: "/facility/attendance", label: "Today's attendance" },
    ],
  },
  {
    title: "Operations & pay",
    links: [
      { href: "/facility/timesheets", label: "Timesheets" },
      { href: "/facility/invoices", label: "Invoices" },
      { href: "/facility/messages", label: "Messages" },
    ],
  },
  {
    title: "Facility settings",
    links: [
      { href: "/facility/settings", label: "Settings hub" },
      { href: "/facility/settings/locations", label: "Locations & units" },
      { href: "/facility/settings/users", label: "Users" },
      { href: "/facility/settings/notifications", label: "Notifications" },
      { href: "/facility/settings/permissions", label: "Permissions" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/login", label: "Switch account / Login" },
      { href: "/cna", label: "Open CNA mobile app" },
      { href: "/", label: "← Kivara website" },
    ],
  },
];

export default function FacilityMorePage() {
  return (
    <FacilityShell title="More">
      <PageHeader
        eyebrow="More"
        title="Facility tools"
        subtitle="Requests · Assignments · Attendance · Timesheets · Invoices · Messages · Settings"
      />
      <div className="space-y-4">
        {sections.map((section) => (
          <ScreenCard key={section.title}>
            <h2 className="text-xs font-bold uppercase tracking-wide text-slate-500">
              {section.title}
            </h2>
            <div className="mt-3 space-y-2">
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-xl bg-[#E8F6F6] px-4 py-3 text-sm font-semibold text-[#0D2B4D]"
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          </ScreenCard>
        ))}
      </div>
    </FacilityShell>
  );
}
