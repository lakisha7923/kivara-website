"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import AdminShell from "@/components/admin/AdminShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";
import { mockFacilities, mockFacilityDetail } from "@/lib/mock/v1-data";

const tabs = [
  "Overview",
  "Locations",
  "Users",
  "Requirements",
  "Rates/Terms",
] as const;

export default function AdminFacilityDetailPage() {
  const params = useParams<{ id: string }>();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview");
  const facility =
    mockFacilities.find((f) => f.id === params.id) ?? mockFacilities[0];
  const detail = mockFacilityDetail;

  return (
    <AdminShell title="Facility Detail">
      <PageHeader
        eyebrow="Facilities"
        title={facility.name}
        subtitle="Facility Detail → Locations → Users → Requirements → Rates/Terms"
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              tab === item
                ? "bg-[#0D2B4D] text-white"
                : "border border-slate-200 bg-white text-[#0D2B4D]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === "Overview" ? (
        <ScreenCard>
          <StatusBadge label={facility.status} tone="success" />
          <p className="mt-3 text-sm text-slate-600">{facility.city}</p>
          <p className="mt-2 text-sm text-slate-600">
            {facility.locations} locations · {facility.users} users ·{" "}
            {facility.openRequests} open staffing requests
          </p>
        </ScreenCard>
      ) : null}

      {tab === "Locations" ? (
        <div className="space-y-3">
          {detail.locations.map((location) => (
            <ScreenCard key={location.id}>
              <p className="font-semibold text-[#0D2B4D]">{location.name}</p>
              <p className="mt-1 text-sm text-slate-600">{location.address}</p>
              <p className="mt-2 text-xs text-slate-500">
                Units: {location.units.join(" · ")}
              </p>
            </ScreenCard>
          ))}
        </div>
      ) : null}

      {tab === "Users" ? (
        <div className="space-y-3">
          {detail.users.map((user) => (
            <ScreenCard key={user.email}>
              <p className="font-semibold text-[#0D2B4D]">{user.name}</p>
              <p className="text-sm text-slate-600">
                {user.role} · {user.email}
              </p>
            </ScreenCard>
          ))}
        </div>
      ) : null}

      {tab === "Requirements" ? (
        <ScreenCard>
          <ul className="flex flex-wrap gap-2">
            {detail.requirements.map((req) => (
              <li
                key={req}
                className="rounded-full bg-[#D6F1F1] px-3 py-1 text-xs font-semibold text-[#0D2B4D]"
              >
                {req}
              </li>
            ))}
          </ul>
        </ScreenCard>
      ) : null}

      {tab === "Rates/Terms" ? (
        <ScreenCard>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-slate-100 py-2">
              <dt className="text-slate-500">Standard bill rate</dt>
              <dd className="font-medium">
                ${detail.ratesTerms.standardBillRate}/hr
              </dd>
            </div>
            <div className="flex justify-between border-b border-slate-100 py-2">
              <dt className="text-slate-500">Evening bill rate</dt>
              <dd className="font-medium">
                ${detail.ratesTerms.eveningBillRate}/hr
              </dd>
            </div>
            <div className="flex justify-between border-b border-slate-100 py-2">
              <dt className="text-slate-500">Payment terms</dt>
              <dd className="font-medium">{detail.ratesTerms.paymentTerms}</dd>
            </div>
            <div className="flex justify-between py-2">
              <dt className="text-slate-500">Contract</dt>
              <dd className="font-medium">{detail.ratesTerms.contractStatus}</dd>
            </div>
          </dl>
        </ScreenCard>
      ) : null}

      <p className="mt-5">
        <Link
          href="/admin/facilities"
          className="text-sm font-semibold text-teal-700"
        >
          ← Back to Facilities
        </Link>
      </p>
    </AdminShell>
  );
}
