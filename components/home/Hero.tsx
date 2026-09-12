import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--kivara-offwhite)] via-[var(--kivara-aqua)] to-white">
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[var(--kivara-teal)]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[var(--kivara-navy)]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl font-bold leading-tight text-[var(--kivara-navy)] sm:text-5xl lg:text-6xl">
            Empowering healthcare through exceptional staffing.
          </h1>

          <p className="mt-6 max-w-2xl text-base text-[var(--kivara-gray)] sm:text-lg">
            Kivara connects facilities and CNAs with confirmed assignments,
            credential tracking, GPS timekeeping, timesheets, payroll-ready
            hours, and facility billing — in one branded system.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
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
      </div>
    </section>
  );
}
