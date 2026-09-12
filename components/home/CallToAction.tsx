import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="bg-[#0FA3A3] py-16 text-white sm:py-24">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-8">
        <h2 className="text-3xl font-bold sm:text-5xl">Ready to get started?</h2>

        <p className="mx-auto mt-5 max-w-3xl text-base sm:mt-6 sm:text-xl">
          Whether you need coverage tonight or want flexible shifts that fit
          your life, Kivara helps facilities and professionals connect with
          confidence.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-6">
          <Link
            href="/register"
            className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#0FA3A3] transition hover:scale-[1.02]"
          >
            Create facility account
          </Link>

          <Link
            href="/register"
            className="rounded-full border-2 border-white px-8 py-4 text-lg font-semibold transition hover:bg-white hover:text-[#0FA3A3]"
          >
            Join as a professional
          </Link>
        </div>
      </div>
    </section>
  );
}
