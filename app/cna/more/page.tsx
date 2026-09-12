import Link from "next/link";

import CnaShell from "@/components/cna/CnaShell";
import { PageHeader, ScreenCard } from "@/components/ui/primitives";

const links = [
  { href: "/cna/credentials", label: "Credentials & documents" },
  { href: "/cna/pay", label: "Hours & pay status" },
  { href: "/cna/schedule", label: "My schedule" },
  { href: "/cna/shifts", label: "Available shifts" },
  { href: "/messages", label: "Messages" },
  { href: "/notifications", label: "Notifications" },
  { href: "/", label: "Exit to website" },
];

export default function CnaMorePage() {
  return (
    <CnaShell>
      <PageHeader
        eyebrow="More"
        title="Profile, support & settings"
        subtitle="Extra tools without leaving the Kivara CNA experience."
      />
      <ScreenCard>
        <div className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-xl bg-[var(--kivara-aqua)] px-4 py-3 text-sm font-semibold text-[var(--kivara-navy)]"
            >
              {link.label} →
            </Link>
          ))}
        </div>
      </ScreenCard>
    </CnaShell>
  );
}
