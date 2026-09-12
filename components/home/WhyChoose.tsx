export default function WhyChoose() {
  return (
    <section className="bg-slate-100 py-24">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center text-[#0D2B4D]">
          Why Choose Kivara?
        </h2>

        <p className="text-center text-gray-600 mt-4 mb-16 text-lg max-w-3xl mx-auto">
          We connect healthcare facilities with experienced professionals,
          making staffing faster, easier, and more reliable.
        </p>

        <div className="grid md:grid-cols-4 gap-8">

          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="font-bold text-xl mb-3">Fast Hiring</h3>
            <p className="text-gray-600">
              Fill open shifts quickly with qualified healthcare professionals.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="text-5xl mb-4">✔️</div>
            <h3 className="font-bold text-xl mb-3">Verified Professionals</h3>
            <p className="text-gray-600">
              Credentialed nurses, CNAs, therapists, and allied healthcare staff.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="font-bold text-xl mb-3">Flexible Scheduling</h3>
            <p className="text-gray-600">
              Post shifts or accept work that fits your schedule.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="text-5xl mb-4">🤝</div>
            <h3 className="font-bold text-xl mb-3">Trusted Partnership</h3>
            <p className="text-gray-600">
              Building lasting relationships between facilities and professionals.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}