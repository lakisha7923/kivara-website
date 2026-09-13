import Link from "next/link";

export default function Services() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-center text-[#0D2B4D]">
          Our Services
        </h2>

        <p className="text-center text-gray-600 mt-4 mb-16 text-lg">
          Connecting healthcare facilities with trusted professionals through
          reliable staffing solutions.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-slate-50 rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
            <div className="text-5xl mb-6">🏥</div>
            <h3 className="text-2xl font-bold text-[#0D2B4D] mb-4">
              Facilities
            </h3>
            <p className="text-gray-600 mb-6">
              Find qualified nurses, CNAs, therapists, and healthcare
              professionals quickly when your facility needs them most.
            </p>
            <Link
              href="/facility"
              className="inline-flex bg-teal-500 text-white px-6 py-3 rounded-full font-semibold"
            >
              Learn More
            </Link>
          </div>

          <div className="bg-slate-50 rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
            <div className="text-5xl mb-6">👩‍⚕️</div>
            <h3 className="text-2xl font-bold text-[#0D2B4D] mb-4">
              Professionals
            </h3>
            <p className="text-gray-600 mb-6">
              Browse shifts, manage your schedule, and build your healthcare
              career with flexible opportunities.
            </p>
            <Link
              href="/cna"
              className="inline-flex bg-teal-500 text-white px-6 py-3 rounded-full font-semibold"
            >
              Join Today
            </Link>
          </div>

          <div className="bg-slate-50 rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
            <div className="text-5xl mb-6">🤝</div>
            <h3 className="text-2xl font-bold text-[#0D2B4D] mb-4">
              Workforce Solutions
            </h3>
            <p className="text-gray-600 mb-6">
              Customized staffing solutions for hospitals, clinics,
              rehabilitation centers, and long-term care facilities.
            </p>
            <Link
              href="/register"
              className="inline-flex bg-teal-500 text-white px-6 py-3 rounded-full font-semibold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
