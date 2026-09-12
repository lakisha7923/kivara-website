import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--kivara-offwhite)] via-[var(--kivara-aqua)] to-white">
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[var(--kivara-teal)]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[var(--kivara-navy)]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/80 px-3 py-2 shadow-sm">
            <Image
              src="/logo/kivara-logo.png"
              alt="Kivara Healthcare logo"
              width={36}
              height={36}
              className="rounded-full"
              priority
            />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--kivara-teal)]">
              Kivara Healthcare
            </p>
          </div>

          <h1 className="font-display text-4xl font-bold leading-tight text-[var(--kivara-navy)] sm:text-5xl lg:text-6xl">
            Empowering healthcare through exceptional staffing.
          </h1>

          <p className="mt-6 max-w-xl text-base text-[var(--kivara-gray)] sm:text-lg">
            Kivara connects facilities and CNAs with confirmed assignments,
            credential tracking, GPS timekeeping, timesheets, payroll-ready
            hours, and facility billing — in one branded system.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/facility"
              className="rounded-full bg-[var(--kivara-teal)] px-8 py-4 text-center text-base font-semibold text-white transition hover:brightness-110"
            >
              Facility portal
            </Link>
            <Link
              href="/cna"
              className="rounded-full border-2 border-[var(--kivara-navy)] px-8 py-4 text-center text-base font-semibold text-[var(--kivara-navy)] transition hover:bg-[var(--kivara-navy)] hover:text-white"
            >
              CNA app
            </Link>
            <Link
              href="/admin"
              className="rounded-full bg-[var(--kivara-navy)] px-8 py-4 text-center text-base font-semibold text-white transition hover:brightness-110"
            >
              Master admin
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[var(--kivara-teal)]/20 blur-2xl" />
            <Image
              src="/logo/kivara-logo.png"
              alt="Kivara Healthcare"
              width={420}
              height={420}
              priority
              className="relative h-56 w-56 rounded-full bg-white object-contain p-4 shadow-2xl sm:h-80 sm:w-80 lg:h-[420px] lg:w-[420px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
