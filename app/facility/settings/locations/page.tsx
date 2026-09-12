import Link from "next/link";

import FacilityShell from "@/components/facility/FacilityShell";
import { PageHeader, ScreenCard } from "@/components/ui/primitives";

export default function FacilityLocationsSettingsPage() {
  return (
    <FacilityShell>
      <PageHeader
        eyebrow="Settings"
        title="Locations"
        subtitle="Campuses and units where Kivara CNAs report."
      />
      <div className="space-y-3">
        {[
          {
            name: "Memorial Care Center — Main Campus",
            address: "4120 Peachtree Road NE, Atlanta, GA 30319",
            units: "Skilled Nursing · Memory Care · Rehab Wing",
          },
          {
            name: "Memorial Care Center — East Annex",
            address: "4155 Peachtree Road NE, Atlanta, GA 30319",
            units: "Assisted Living",
          },
        ].map((loc) => (
          <ScreenCard key={loc.name}>
            <p className="font-semibold text-[#0D2B4D]">{loc.name}</p>
            <p className="mt-1 text-sm text-slate-600">{loc.address}</p>
            <p className="mt-1 text-xs text-slate-500">{loc.units}</p>
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
