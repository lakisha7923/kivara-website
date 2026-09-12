import Link from "next/link";

import AdminShell from "@/components/admin/AdminShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockFacilities } from "@/lib/mock/v1-data";

export default function AdminFacilitiesPage() {
  return (
    <AdminShell title="Facilities">
      <PageHeader
        eyebrow="Accounts"
        title="Facilities"
        subtitle="Facility Detail → Locations → Users → Requirements → Rates/Terms"
      />
      <div className="space-y-3">
        {mockFacilities.map((facility) => (
          <Link key={facility.id} href={`/admin/facilities/${facility.id}`}>
            <ScreenCard className="transition hover:border-[#0FA3A3]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-[#0D2B4D]">
                    {facility.name}
                  </h2>
                  <p className="text-sm text-slate-600">{facility.city}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {facility.locations} locations · {facility.users} users ·{" "}
                    {facility.openRequests} open requests
                  </p>
                </div>
                <StatusBadge
                  label={facility.status}
                  tone={facility.status === "Active" ? "success" : "warning"}
                />
              </div>
            </ScreenCard>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
