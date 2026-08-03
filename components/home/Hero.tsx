export default function Hero() {
  return (
    <section className="bg-slate-50">

      <div className="max-w-7xl mx-auto px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Side */}

        <div>

          <h1 className="text-6xl font-bold text-[#0D2B4D] leading-tight">

            Connecting
            <br />

            Healthcare Professionals
            <br />

            with
            <br />

            Healthcare Facilities

          </h1>

          <p className="mt-8 text-xl text-gray-600">

            Fast. Reliable. Trusted staffing solutions for hospitals,
            nursing homes, clinics, rehabilitation centers,
            home health agencies, and healthcare professionals.

          </p>

          <div className="mt-10 flex gap-5">

            <button className="bg-teal-500 text-white px-8 py-4 rounded-full hover:bg-teal-600 transition">

              Find Staff

            </button>

            <button className="border-2 border-[#0D2B4D] text-[#0D2B4D] px-8 py-4 rounded-full hover:bg-[#0D2B4D] hover:text-white transition">

              Find Work

            </button>

          </div>

        </div>

        {/* Right Side */}

        <div className="flex justify-center">

          <div className="w-[420px] h-[420px] rounded-full bg-[#D6F4F4] shadow-2xl flex items-center justify-center">

            <span className="text-8xl">

              🩺

            </span>

          </div>

        </div>

      </div>

    </section>
  );
}