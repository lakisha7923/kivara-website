import Image from "next/image";
import Link from "next/link";

import FacilityShell from "@/components/facility/FacilityShell";

const kpis = [
  {
    label: "Open Requests",
    value: "2",
    detail: "Needs Coverage",
    icon: "📅",
    tint: "bg-sky-50 text-sky-700",
  },
  {
    label: "Confirmed Assignments",
    value: "6",
    detail: "Upcoming Shifts",
    icon: "✓",
    tint: "bg-emerald-50 text-emerald-700",
  },
  {
    label: "Currently On Shift",
    value: "4",
    detail: "CNAs Clocked In",
    icon: "👥",
    tint: "bg-teal-50 text-teal-700",
  },
  {
    label: "Completed Today",
    value: "3",
    detail: "Shifts Completed",
    icon: "🔒",
    tint: "bg-indigo-50 text-indigo-700",
  },
];

const todaySchedule = [
  {
    time: "7:00 AM – 3:00 PM",
    staff: "2 CNAs",
    unit: "Skilled Nursing Unit",
    status: "1 On Shift",
  },
  {
    time: "3:00 PM – 11:00 PM",
    staff: "3 CNAs",
    unit: "Memory Care",
    status: "Fully Staffed",
  },
  {
    time: "11:00 PM – 7:00 AM",
    staff: "1 CNA",
    unit: "Rehab Wing",
    status: "Open Slot",
  },
];

const recentActivity = [
  {
    name: "Lakisha Thomas",
    text: "clocked in for Skilled Nursing Unit",
    time: "7:02 AM",
  },
  {
    name: "Tiffany M.",
    text: "confirmed for Saturday AM Memory Care",
    time: "6:48 AM",
  },
  {
    name: "Jasmine R.",
    text: "completed shift · timesheet submitted",
    time: "3:08 AM",
  },
];

const upcoming = [
  {
    date: "MAY 30",
    time: "7:00 AM – 3:00 PM",
    unit: "Skilled Nursing",
    status: "CONFIRMED",
    tone: "bg-emerald-100 text-emerald-800",
  },
  {
    date: "MAY 30",
    time: "3:00 PM – 11:00 PM",
    unit: "Memory Care",
    status: "PENDING",
    tone: "bg-amber-100 text-amber-900",
  },
  {
    date: "MAY 31",
    time: "7:00 AM – 3:00 PM",
    unit: "Rehab Wing",
    status: "OPEN",
    tone: "bg-sky-100 text-sky-800",
  },
];

const notifications = [
  "CNA credential update pending review",
  "Night shift still needs 1 CNA",
  "Invoice INV-3001 is ready to view",
];

const confirmedPeople = [
  {
    name: "Lakisha Thomas",
    when: "Today · 7:00 AM – 3:00 PM",
    unit: "Skilled Nursing",
  },
  {
    name: "Tiffany M.",
    when: "Sat · 7:00 AM – 3:00 PM",
    unit: "Memory Care",
  },
  {
    name: "Angela D.",
    when: "Sat · 3:00 PM – 11:00 PM",
    unit: "Rehab Wing",
  },
];

const attendance = [
  { name: "Lakisha Thomas", since: "7:02 AM", duration: "0h 56m", unit: "SNF" },
  { name: "Marcus J.", since: "6:58 AM", duration: "1h 00m", unit: "Memory" },
  { name: "Priya S.", since: "7:05 AM", duration: "0h 53m", unit: "Rehab" },
];

const invoices = [
  { id: "INV-2998", date: "Sep 1", amount: "$1,216.00", status: "PAID" },
  { id: "INV-3001", date: "Sep 8", amount: "$980.00", status: "PAID" },
  { id: "INV-3002", date: "Sep 14", amount: "$304.00", status: "DRAFT" },
];

export default function FacilityDashboardPage() {
  return (
    <FacilityShell>
      {/* Welcome + actions */}
      <section className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#0D2B4D] sm:text-4xl">
            Welcome back, Sarah!
          </h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Here&apos;s what&apos;s happening at Memorial Care Center.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/facility/requests/new"
            className="rounded-full bg-[#0FA3A3] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:brightness-110"
          >
            Request Staff
          </Link>
          <Link
            href="/facility/assignments"
            className="rounded-full border-2 border-[#0D2B4D] bg-white px-5 py-2.5 text-sm font-semibold text-[#0D2B4D]"
          >
            Active Assignments
          </Link>
          <Link
            href="/facility/attendance"
            className="rounded-full border-2 border-[#0FA3A3] bg-white px-5 py-2.5 text-sm font-semibold text-[#0FA3A3]"
          >
            Today&apos;s Attendance
          </Link>
          <Link
            href="/facility/timesheets"
            className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#0D2B4D]"
          >
            Timesheets
          </Link>
          <Link
            href="/facility/invoices"
            className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#0D2B4D]"
          >
            Invoices
          </Link>
          <Link
            href="/facility/messages"
            className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#0D2B4D]"
          >
            Messages
          </Link>
        </div>
      </section>

      {/* KPI row */}
      <section className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <article
            key={kpi.label}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {kpi.label}
                </p>
                <p className="mt-2 text-3xl font-bold text-[#0D2B4D]">
                  {kpi.value}
                </p>
                <p className="mt-1 text-sm text-slate-600">{kpi.detail}</p>
              </div>
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg ${kpi.tint}`}
              >
                {kpi.icon}
              </span>
            </div>
          </article>
        ))}
      </section>

      {/* Mid dashboard grid */}
      <section className="mb-6 grid gap-4 xl:grid-cols-12">
        <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm xl:col-span-4">
          <h2 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-[#0D2B4D]">
            Today&apos;s Schedule Overview
          </h2>
          <div className="mt-4 space-y-3">
            {todaySchedule.map((row) => (
              <div
                key={row.time}
                className="rounded-xl border border-slate-100 bg-[#F2F4F7] p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-[#0D2B4D]">{row.time}</p>
                    <p className="text-xs text-slate-600">
                      {row.staff} · {row.unit}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-800">
                    {row.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm xl:col-span-3">
          <h2 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-[#0D2B4D]">
            Recent Activity
          </h2>
          <div className="mt-4 space-y-3">
            {recentActivity.map((item) => (
              <div key={item.name + item.time} className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D6F1F1] text-xs font-bold">
                  {item.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm text-[#0D2B4D]">
                    <span className="font-semibold">{item.name}</span> {item.text}
                  </p>
                  <p className="text-xs text-slate-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm xl:col-span-3">
          <h2 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-[#0D2B4D]">
            Upcoming Shifts
          </h2>
          <div className="mt-4 space-y-3">
            {upcoming.map((item) => (
              <div
                key={item.date + item.time}
                className="flex items-center gap-3 rounded-xl border border-slate-100 p-3"
              >
                <div className="rounded-lg bg-[#D6F1F1] px-2 py-1 text-center">
                  <p className="text-[10px] font-bold text-[#0FA3A3]">{item.date}</p>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#0D2B4D]">
                    {item.time}
                  </p>
                  <p className="text-xs text-slate-500">{item.unit}</p>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-[10px] font-bold ${item.tone}`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </article>

        <div className="space-y-4 xl:col-span-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-bold text-[#0D2B4D]">Important Contacts</h2>
            <div className="mt-3 space-y-2 text-xs text-slate-600">
              <p>
                <span className="font-semibold text-[#0D2B4D]">24/7 Support</span>
                <br />
                (800) 555-0147
              </p>
              <p>
                <span className="font-semibold text-[#0D2B4D]">Client Manager</span>
                <br />
                Maya Chen · (404) 555-0190
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-bold text-[#0D2B4D]">Notifications</h2>
            <ul className="mt-3 space-y-2">
              {notifications.map((note) => (
                <li
                  key={note}
                  className="rounded-lg bg-[#F2F4F7] px-2.5 py-2 text-xs text-slate-600"
                >
                  {note}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl bg-[#0D2B4D] p-4 text-white shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#D6F1F1]">
              Account Balance
            </p>
            <p className="mt-2 text-2xl font-bold">$2,560.00</p>
            <Link
              href="/facility/invoices"
              className="mt-3 inline-flex rounded-full bg-[#0FA3A3] px-3 py-1.5 text-xs font-semibold"
            >
              View Invoices
            </Link>
          </article>
        </div>
      </section>

      {/* Bottom feature panels — navy headers match approved mockup */}
      <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <header className="flex items-center justify-between bg-[#0D2B4D] px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Image
                src="/logo/kivara-logo.png"
                alt=""
                width={22}
                height={22}
                className="rounded-full bg-white p-0.5"
              />
              <h3 className="text-sm font-semibold">Request Staff</h3>
            </div>
            <span aria-hidden className="text-sm text-[#D6F1F1]">
              🔔
            </span>
          </header>
          <div className="p-4">
            <p className="text-xs font-semibold text-[#0D2B4D]">
              Create a New Request
            </p>
            <div className="mt-3 space-y-2">
              <div className="rounded-lg border px-3 py-2 text-xs text-slate-500">
                Location / Unit
              </div>
              <div className="rounded-lg border px-3 py-2 text-xs text-slate-500">
                Date
              </div>
              <div className="rounded-lg border px-3 py-2 text-xs text-slate-500">
                Time · CNA Count
              </div>
              <div className="flex flex-wrap gap-1">
                {["Active CNA License", "BLS"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#D6F1F1] px-2 py-1 text-[10px] font-semibold text-[#0D2B4D]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href="/facility/requests"
                className="mt-1 flex w-full items-center justify-center rounded-full bg-[#0FA3A3] py-2 text-xs font-semibold text-white"
              >
                Submit Request
              </Link>
            </div>
          </div>
        </article>

        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <header className="flex items-center justify-between bg-[#0D2B4D] px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Image
                src="/logo/kivara-logo.png"
                alt=""
                width={22}
                height={22}
                className="rounded-full bg-white p-0.5"
              />
              <h3 className="text-sm font-semibold">Confirmed Assignments</h3>
            </div>
            <span aria-hidden className="text-sm text-[#D6F1F1]">
              🔔
            </span>
          </header>
          <div className="space-y-2 p-4">
            {confirmedPeople.map((person) => (
              <div
                key={person.name}
                className="rounded-xl border border-slate-100 p-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-[#0D2B4D]">
                      {person.name}
                    </p>
                    <p className="text-[11px] text-slate-500">{person.when}</p>
                    <p className="text-[11px] text-slate-500">{person.unit}</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                    CONFIRMED
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <header className="flex items-center justify-between bg-[#0D2B4D] px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Image
                src="/logo/kivara-logo.png"
                alt=""
                width={22}
                height={22}
                className="rounded-full bg-white p-0.5"
              />
              <h3 className="text-sm font-semibold">Today&apos;s Attendance</h3>
            </div>
            <span aria-hidden className="text-sm text-[#D6F1F1]">
              🔔
            </span>
          </header>
          <div className="space-y-2 p-4">
            {attendance.map((row) => (
              <div
                key={row.name}
                className="rounded-xl bg-[#F2F4F7] p-2.5 text-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-[#0D2B4D]">{row.name}</p>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                    On Shift
                  </span>
                </div>
                <p className="mt-1 text-slate-600">
                  In {row.since} · {row.duration} · {row.unit} 📍
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <header className="flex items-center justify-between bg-[#0D2B4D] px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Image
                src="/logo/kivara-logo.png"
                alt=""
                width={22}
                height={22}
                className="rounded-full bg-white p-0.5"
              />
              <h3 className="text-sm font-semibold">Timesheet Review</h3>
            </div>
            <span aria-hidden className="text-sm text-[#D6F1F1]">
              🔔
            </span>
          </header>
          <div className="p-4">
            <div className="rounded-xl border border-slate-100 p-3 text-xs">
              <p className="font-semibold text-[#0D2B4D]">Jasmine R.</p>
              <p className="mt-1 text-slate-600">Clock In 7:01 AM</p>
              <p className="text-slate-600">Clock Out 3:05 PM</p>
              <p className="text-slate-600">Break 30m · Total 7.57 hrs</p>
              <button
                type="button"
                className="mt-3 w-full rounded-full bg-[#0FA3A3] py-2 text-xs font-semibold text-white"
              >
                Approve
              </button>
            </div>
          </div>
        </article>

        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <header className="flex items-center justify-between bg-[#0D2B4D] px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Image
                src="/logo/kivara-logo.png"
                alt=""
                width={22}
                height={22}
                className="rounded-full bg-white p-0.5"
              />
              <h3 className="text-sm font-semibold">Invoices & Billing</h3>
            </div>
            <span aria-hidden className="text-sm text-[#D6F1F1]">
              🔔
            </span>
          </header>
          <div className="p-4">
            <div className="rounded-xl bg-[#0D2B4D] p-3 text-white">
              <p className="text-[11px] text-[#D6F1F1]">Current balance</p>
              <p className="text-xl font-bold">$2,560.00</p>
            </div>
            <div className="mt-3 space-y-2">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between rounded-lg bg-[#F2F4F7] px-2.5 py-2 text-xs"
                >
                  <div>
                    <p className="font-semibold text-[#0D2B4D]">{invoice.id}</p>
                    <p className="text-slate-500">{invoice.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{invoice.amount}</p>
                    <p
                      className={`text-[10px] font-bold ${
                        invoice.status === "PAID"
                          ? "text-emerald-700"
                          : "text-amber-700"
                      }`}
                    >
                      {invoice.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>

      {/* Footer feature strip — soft aqua cards with icons */}
      <section className="grid gap-3 rounded-2xl bg-[#D6F1F1] p-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          ["✓", "Reliable Staffing", "Confirmed coverage you can count on"],
          ["⏱", "Real-Time Updates", "Live attendance and shift status"],
          ["★", "Quality You Can Trust", "Credential-checked CNAs"],
          ["💬", "We're Here For You", "24/7 facility support"],
          ["🔒", "Secure & Compliant", "Role-based access and audit trails"],
        ].map(([icon, title, copy]) => (
          <div
            key={title}
            className="flex gap-3 rounded-xl bg-white/70 px-3 py-3"
          >
            <span
              aria-hidden
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0FA3A3] text-sm font-bold text-white"
            >
              {icon}
            </span>
            <div>
              <p className="text-sm font-bold text-[#0D2B4D]">{title}</p>
              <p className="mt-0.5 text-xs text-slate-600">{copy}</p>
            </div>
          </div>
        ))}
      </section>
    </FacilityShell>
  );
}
