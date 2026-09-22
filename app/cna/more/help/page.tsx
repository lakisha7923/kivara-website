import Link from "next/link";

import CnaShell from "@/components/cna/CnaShell";
import { PageHeader, ScreenCard } from "@/components/ui/primitives";

export default function CnaHelpPage() {
  return (
    <CnaShell>
      <PageHeader
        eyebrow="More"
        title="Help"
        subtitle="Support for CNAs"
      />
      <ScreenCard>
        <p className="text-sm text-slate-700">
          Need help with credentials, GPS clock issues, or pay status? Contact
          Kivara Support at (800) 555-0147 or email support@kivara.health.
        </p>
        <Link
          href="tel:18005550147"
          className="mt-4 inline-flex rounded-full bg-[#0D2B4D] px-4 py-2 text-sm font-semibold text-white"
        >
          Call Kivara Support
        </Link>
      </ScreenCard>
      <ScreenCard className="mt-4">
        <h2 className="text-sm font-bold text-[#0D2B4D]">Reliability Score</h2>
        <p className="mt-2 text-sm text-slate-700">
          Learn how your 0–100 Reliability Score works, what affects it, and how
          to build a strong track record on Kivara.
        </p>
        <Link
          href="/cna/more/reliability"
          className="mt-4 inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-[#0D2B4D]"
        >
          Read Reliability Score FAQ →
        </Link>
      </ScreenCard>
      <ScreenCard className="mt-4">
        <h2 className="text-sm font-bold text-[#0D2B4D]">Professional Rating</h2>
        <p className="mt-2 text-sm text-slate-700">
          Learn how facility star ratings work after completed assignments, and
          how they stay separate from your Reliability Score.
        </p>
        <Link
          href="/cna/more/ratings"
          className="mt-4 inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-[#0D2B4D]"
        >
          Read Professional Rating FAQ →
        </Link>
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
