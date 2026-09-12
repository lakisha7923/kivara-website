import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-[#E7F7F7] to-slate-100">
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#0D2B4D]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
            Kivara Healthcare
          </p>

          <h1 className="text-4xl font-bold leading-tight text-[#0D2B4D] sm:text-5xl lg:text-6xl">
            Open shifts.
            <br />
            Verified talent.
            <br />
            Coverage when you need it.
          </h1>

          <p className="mt-6 max-w-xl text-base text-gray-600 sm:text-lg">
            Kivara connects healthcare facilities with licensed professionals
            for on-demand shifts—transparent rates, credential checks, and
            payouts built for real staffing needs.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/register"
              className="rounded-full bg-teal-500 px-8 py-4 text-center text-base font-semibold text-white transition hover:bg-teal-600"
            >
              Hire for your facility
            </Link>

            <Link
              href="/register"
              className="rounded-full border-2 border-[#0D2B4D] px-8 py-4 text-center text-base font-semibold text-[#0D2B4D] transition hover:bg-[#0D2B4D] hover:text-white"
            >
              Find shifts near you
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex h-56 w-56 items-center justify-center rounded-full bg-[#D6F4F4] shadow-2xl sm:h-80 sm:w-80 lg:h-[420px] lg:w-[420px]">
            <span className="text-6xl sm:text-7xl lg:text-8xl" aria-hidden>
              🩺
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
