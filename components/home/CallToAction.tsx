export default function CallToAction() {
  return (
    <section className="py-24 bg-[#0FA3A3] text-white">
      <div className="max-w-5xl mx-auto text-center px-8">

        <h2 className="text-5xl font-bold">
          Ready to Get Started?
        </h2>

        <p className="mt-6 text-xl">
          Whether you're looking for qualified healthcare professionals
          or searching for your next opportunity, Kivara Healthcare
          is here to help.
        </p>

        <div className="mt-10 flex justify-center gap-6 flex-wrap">

          <button className="bg-white text-[#0FA3A3] px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition">
            Find Staff
          </button>

          <button className="border-2 border-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#0FA3A3] transition">
            Find Work
          </button>

        </div>

      </div>
    </section>
  );
}