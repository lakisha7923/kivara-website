import Link from "next/link";

import CnaShell from "@/components/cna/CnaShell";
import { PageHeader, ScreenCard } from "@/components/ui/primitives";

const sections = [
  {
    title: "Account",
    links: [
      { href: "/cna/more/profile", label: "Profile" },
      { href: "/cna/credentials", label: "Credentials" },
      { href: "/cna/more/work-areas", label: "Work Areas" },
      { href: "/cna/more/settings", label: "Settings" },
    ],
  },
  {
    title: "Work & pay",
    links: [
      { href: "/cna/more/timesheets", label: "Timesheets" },
      { href: "/cna/pay", label: "Pay Status" },
      { href: "/cna/schedule", label: "Schedule" },
      { href: "/cna/shifts", label: "Available Shifts" },
    ],
  },
  {
    title: "Communication",
    links: [
      { href: "/cna/more/messages", label: "Messages" },
      { href: "/cna/more/notifications", label: "Notifications" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/cna/more/forms", label: "Forms & Resources" },
      { href: "/cna/more/help", label: "Help" },
      { href: "/login", label: "Switch account / Login" },
      { href: "/", label: "← Kivara website" },
    ],
  },
];

export default function CnaMorePage() {
  return (
    <CnaShell>
      <PageHeader
        eyebrow="More"
        title="Profile & support"
        subtitle="Profile · Timesheets · Pay · Messages · Notifications · Work Areas · Forms · Help · Settings"
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
    </CnaShell>
  );
}
