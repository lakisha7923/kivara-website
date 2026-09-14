import Link from "next/link";

export default function Services() {
  return (
    <section id="services" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-8">
        <h2 className="text-center text-4xl font-bold text-[#0D2B4D]">
          Our Services
        </h2>

        <p className="mx-auto mt-4 mb-16 max-w-3xl text-center text-lg text-gray-600">
          Connecting healthcare facilities with trusted professionals through
          reliable staffing solutions.
        </p>

        <div className="grid gap-10 md:grid-cols-3">
          <div className="flex flex-col rounded-2xl bg-slate-50 p-8 shadow-lg transition hover:shadow-xl">
            <div className="mb-6 text-5xl">🏥</div>
            <h3 className="mb-4 text-2xl font-bold text-[#0D2B4D]">
              Facilities
            </h3>
            <p className="mb-6 text-gray-600">
              Find qualified nurses, CNAs, therapists, and healthcare
              professionals quickly when your facility needs them most. Request
              coverage, track live attendance, and manage timesheets in one
              place.
            </p>
            <div className="mt-auto pt-2">
              <Link
                href="/facility"
                className="inline-flex rounded-full bg-[var(--kivara-teal)] px-6 py-3 text-center font-semibold text-white hover:brightness-110"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="flex flex-col rounded-2xl bg-slate-50 p-8 shadow-lg transition hover:shadow-xl">
            <div className="mb-6 text-5xl">👩‍⚕️</div>
            <h3 className="mb-4 text-2xl font-bold text-[#0D2B4D]">
              Professionals
            </h3>
            <p className="mb-6 text-gray-600">
              Browse shifts, manage your schedule, and build your healthcare
              career with flexible opportunities. Stay Work Ready, clock in with
              GPS, and track pay from your phone.
            </p>
            <div className="mt-auto pt-2">
              <Link
                href="/cna"
                className="inline-flex rounded-full bg-[var(--kivara-teal)] px-6 py-3 text-center font-semibold text-white hover:brightness-110"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="flex flex-col rounded-2xl bg-slate-50 p-8 shadow-lg transition hover:shadow-xl">
            <div className="mb-6 text-5xl">🤝</div>
            <h3 className="mb-4 text-2xl font-bold text-[#0D2B4D]">
              Workforce Solutions
            </h3>
            <p className="mb-6 text-gray-600">
              Customized staffing solutions for hospitals, clinics,
              rehabilitation centers, and long-term care facilities.
            </p>
            <div className="mt-auto border-t border-slate-200 pt-6">
              <Link
                href="/register"
                className="inline-flex w-full items-center justify-center rounded-full bg-[var(--kivara-navy)] px-6 py-3 text-center font-semibold text-white hover:brightness-110"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
