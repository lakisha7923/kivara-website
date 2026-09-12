export default function Statistics() {
  return (
    <section className="bg-[#0D2B4D] py-20 text-white">
      <div className="max-w-7xl mx-auto px-8">

        <div className="grid md:grid-cols-4 gap-10 text-center">

          <div>
            <h2 className="text-5xl font-bold text-teal-400">
              10K+
            </h2>
            <p className="mt-3 text-xl">
              Healthcare Professionals
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-teal-400">
              500+
            </h2>
            <p className="mt-3 text-xl">
              Partner Facilities
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-teal-400">
              25K+
            </h2>
            <p className="mt-3 text-xl">
              Shifts Filled
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-teal-400">
              24/7
            </h2>
            <p className="mt-3 text-xl">
              Support
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}