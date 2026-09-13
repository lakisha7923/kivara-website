import Link from "next/link";

import CnaProfileEditor from "@/components/cna/CnaProfileEditor";
import CnaShell from "@/components/cna/CnaShell";
import { PageHeader } from "@/components/ui/primitives";
import { mockCna } from "@/lib/mock/v1-data";

export default function CnaProfilePage() {
  return (
    <CnaShell>
      <PageHeader
        eyebrow="More"
        title="Profile"
        subtitle="Photo, contact, EMR experience, pay, and emergency details"
      />
      <CnaProfileEditor profile={mockCna} />
      <Link
        href="/cna/more"
        className="mt-4 inline-block text-sm font-semibold text-teal-700"
      >
        ← Back to More
      </Link>
    </CnaShell>
  );
}
