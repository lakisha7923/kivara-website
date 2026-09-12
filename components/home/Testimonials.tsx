export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center text-[#0D2B4D]">
          Trusted by Healthcare Professionals
        </h2>

        <p className="text-center text-gray-600 mt-4 mb-16">
          Hear what our healthcare partners have to say.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <p className="text-gray-600 italic">
              "Kivara made filling our nursing shortages quick and stress-free.
              We found qualified professionals within hours."
            </p>

            <h3 className="mt-6 font-bold text-[#0D2B4D]">
              Sarah Johnson
            </h3>

            <p className="text-sm text-gray-500">
              Director of Nursing
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <p className="text-gray-600 italic">
              "The application process was simple, and I found shifts that fit
              my schedule perfectly."
            </p>

            <h3 className="mt-6 font-bold text-[#0D2B4D]">
              Michael Carter
            </h3>

            <p className="text-sm text-gray-500">
              Registered Nurse
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <p className="text-gray-600 italic">
              "Excellent communication and reliable staffing support. We highly
              recommend Kivara."
            </p>

            <h3 className="mt-6 font-bold text-[#0D2B4D]">
              Emily Rodriguez
            </h3>

            <p className="text-sm text-gray-500">
              Healthcare Administrator
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}