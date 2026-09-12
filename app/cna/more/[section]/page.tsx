import Link from "next/link";

import CnaShell from "@/components/cna/CnaShell";
import { PageHeader, ScreenCard } from "@/components/ui/primitives";
import { mockCna } from "@/lib/mock/v1-data";

const pages: Record<
  string,
  { title: string; subtitle: string; body: string; cta?: { href: string; label: string } }
> = {
  timesheets: {
    title: "Timesheets",
    subtitle: "Submitted and in-review time",
    body: "Open Pay Status for approved hours. Clock-out submits a timesheet for facility review and Kivara approval.",
    cta: { href: "/cna/pay", label: "Open pay status" },
  },
  messages: {
    title: "Messages",
    subtitle: "Facility and Kivara threads",
    body: "Shift confirmations, credential questions, and support messages appear here.",
  },
  notifications: {
    title: "Notifications",
    subtitle: "Alerts that need attention",
    body: "New eligible shifts, confirmation updates, credential decisions, and timesheet status changes.",
  },
  "work-areas": {
    title: "Work Areas",
    subtitle: "Where you are approved to work",
    body: mockCna.workAreas.join(" · "),
    cta: { href: "/cna/work-ready", label: "Back to Work Ready" },
  },
  forms: {
    title: "Forms & Resources",
    subtitle: "Handbooks, packets, and references",
    body: "Orientation packet, handbook acknowledgment, and facility-specific forms will live here.",
  },
  help: {
    title: "Help",
    subtitle: "Support for CNAs",
    body: "Need help with credentials, GPS clock issues, or pay status? Contact Kivara Support at (800) 555-0147.",
  },
  settings: {
    title: "Settings",
    subtitle: "App preferences",
    body: "Notification preferences, language, and sign-out controls will live here.",
    cta: { href: "/login", label: "Switch account / Login" },
  },
};

export default async function CnaMoreSubpage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const page = pages[section];

  if (!page) {
    return (
      <CnaShell>
        <PageHeader title="Not found" />
        <Link href="/cna/more" className="text-teal-700">
          ← Back to More
        </Link>
      </CnaShell>
    );
  }

  return (
    <CnaShell>
      <PageHeader
        eyebrow="More"
        title={page.title}
        subtitle={page.subtitle}
      />
      <ScreenCard>
        <p className="text-sm text-slate-700">{page.body}</p>
        {page.cta ? (
          <Link
            href={page.cta.href}
            className="mt-4 inline-flex rounded-full bg-[#0D2B4D] px-4 py-2 text-sm font-semibold text-white"
          >
            {page.cta.label}
          </Link>
        ) : null}
      </ScreenCard>
      <Link
        href="/cna/more"
        className="mt-4 inline-block text-sm font-semibold text-teal-700"
      >
        ← Back to More
      </Link>
    </CnaShell>
  );
}
