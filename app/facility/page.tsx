import Link from "next/link";

import FacilityShell from "@/components/facility/FacilityShell";
import { PageHeader, ScreenCard, StatusBadge } from "@/components/ui/primitives";

const kpis = [
  { label: "Open requests", value: "2", href: "/facility/requests" },
  { label: "On shift now", value: "4", href: "/facility/attendance" },
  { label: "Confirmed", value: "6", href: "/facility/assignments" },
  { label: "Done today", value: "3", href: "/facility/timesheets" },
];

const todayBlocks = [
  {
    time: "7:00 AM – 3:00 PM",
    unit: "Skilled Nursing",
    staff: "2 CNAs",
    status: "1 On Shift",
    tone: "success" as const,
  },
  {
    time: "3:00 PM – 11:00 PM",
    unit: "Memory Care",
    staff: "3 CNAs",
    status: "Fully Staffed",
    tone: "success" as const,
  },
  {
    time: "11:00 PM – 7:00 AM",
    unit: "Rehab Wing",
    staff: "1 CNA",
    status: "Open Slot",
    tone: "warning" as const,
  },
];

const activity = [
  {
    name: "Lakisha Thomas",
    text: "clocked in · Skilled Nursing",
    time: "7:02 AM",
  },
  {
    name: "Tiffany M.",
    text: "confirmed · Saturday Memory Care",
    time: "6:48 AM",
  },
  {
    name: "Jasmine R.",
    text: "timesheet submitted",
    time: "3:08 AM",
  },
];

const alerts = [
  { href: "/facility/requests", label: "Night shift still needs 1 CNA" },
  {
    href: "/facility/timesheets",
    label: "1 timesheet waiting for facility review",
  },
  { href: "/facility/invoices", label: "Invoice INV-3001 is ready to view" },
];

export default function FacilityHomePage() {
  return (
    <FacilityShell>
      <PageHeader
        eyebrow="Facility Home"
        title="Hi, Sarah"
        subtitle="Memorial Care Center · staffing, live attendance, and billing in one phone app."
      />

      <div className="space-y-4">
        <ScreenCard className="border-teal-200 bg-teal-50/70">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-teal-800">
            Primary action
          </p>
          <h2 className="mt-2 text-lg font-bold text-[#0D2B4D]">
            Need coverage?
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Submit a staff request and track it until Kivara confirms a CNA.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/facility/requests/new"
              className="rounded-full bg-[#0FA3A3] px-4 py-2.5 text-sm font-semibold text-white"
            >
              Request staff
            </Link>
            <Link
              href="/facility/attendance"
              className="rounded-full border border-[#0D2B4D] px-4 py-2.5 text-sm font-semibold text-[#0D2B4D]"
            >
              Live attendance
            </Link>
          </div>
        </ScreenCard>

        <div className="grid grid-cols-2 gap-3">
          {kpis.map((kpi) => (
            <Link
              key={kpi.label}
              href={kpi.href}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="text-2xl font-bold text-[#0D2B4D]">{kpi.value}</p>
              <p className="mt-1 text-sm text-slate-600">{kpi.label}</p>
            </Link>
          ))}
        </div>

        <ScreenCard>
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-bold text-[#0D2B4D]">Needs attention</h2>
            <StatusBadge label={`${alerts.length} open`} tone="warning" />
          </div>
          <ul className="mt-3 space-y-2">
            {alerts.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-950 hover:bg-amber-100"
                >
                  {item.label} →
                </Link>
              </li>
            ))}
          </ul>
        </ScreenCard>

        <ScreenCard>
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-bold text-[#0D2B4D]">Today&apos;s coverage</h2>
            <Link
              href="/facility/assignments"
              className="text-sm font-semibold text-teal-700"
            >
              Staff →
            </Link>
          </div>
          <div className="mt-3 space-y-2">
            {todayBlocks.map((block) => (
              <div
                key={block.time}
                className="rounded-xl border border-slate-100 bg-[#F2F4F7] p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-[#0D2B4D]">
                      {block.time}
                    </p>
                    <p className="text-xs text-slate-600">
                      {block.staff} · {block.unit}
                    </p>
                  </div>
                  <StatusBadge label={block.status} tone={block.tone} />
                </div>
              </div>
            ))}
          </div>
        </ScreenCard>

        <ScreenCard>
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-bold text-[#0D2B4D]">Recent activity</h2>
            <Link
              href="/facility/attendance"
              className="text-sm font-semibold text-teal-700"
            >
              Live →
            </Link>
          </div>
          <ul className="mt-3 space-y-3">
            {activity.map((item) => (
              <li key={`${item.name}-${item.time}`} className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D6F1F1] text-xs font-bold text-[#0D2B4D]">
                  {item.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm text-[#0D2B4D]">
                    <span className="font-semibold">{item.name}</span>{" "}
                    {item.text}
                  </p>
                  <p className="text-xs text-slate-500">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </ScreenCard>

        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/facility/timesheets"
            className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-[#0D2B4D] shadow-sm"
          >
            Timesheets →
          </Link>
          <Link
            href="/facility/invoices"
            className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-[#0D2B4D] shadow-sm"
          >
            Invoices →
          </Link>
          <Link
            href="/facility/messages"
            className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-[#0D2B4D] shadow-sm"
          >
            Messages →
          </Link>
          <Link
            href="/facility/more"
            className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-[#0D2B4D] shadow-sm"
          >
            More tools →
          </Link>
        </div>
      </div>
    </FacilityShell>
  );
}
