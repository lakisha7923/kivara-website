import Link from "next/link";

import CnaShell from "@/components/cna/CnaShell";
import { PageHeader, ScreenCard } from "@/components/ui/primitives";

export default function CnaMoreStaticSectionPage({
  title,
  subtitle,
  body,
  cta,
}: {
  title: string;
  subtitle: string;
  body: string;
  cta?: { href: string; label: string };
}) {
  return (
    <CnaShell>
      <PageHeader eyebrow="More" title={title} subtitle={subtitle} />
      <ScreenCard>
        <p className="text-sm text-slate-700">{body}</p>
        {cta ? (
          <Link
            href={cta.href}
            className="mt-4 inline-flex rounded-full bg-[#0D2B4D] px-4 py-2 text-sm font-semibold text-white"
          >
            {cta.label}
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
