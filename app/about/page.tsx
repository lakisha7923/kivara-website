import Link from "next/link";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
          About Kivara
        </p>
        <h1 className="mt-3 text-4xl font-bold text-[#0D2B4D] sm:text-5xl">
          Built for flexible healthcare coverage
        </h1>
        <p className="mt-6 text-lg text-slate-600">
          Kivara is a marketplace where facilities post open shifts and
          licensed professionals claim work that fits their schedule. We
          focus on clear rates, credential visibility, and a mobile-first
          experience your teams can use on the floor—not just at a desk.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-bold text-[#0D2B4D]">For facilities</h2>
            <p className="mt-2 text-slate-600">
              Post shifts, review applicants, confirm coverage, and keep
              staffing moving without agency lock-ins.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-bold text-[#0D2B4D]">
              For professionals
            </h2>
            <p className="mt-2 text-slate-600">
              Browse nearby opportunities, apply in minutes, track shifts,
              and get paid for completed work.
            </p>
          </div>
        </div>

        <Link
          href="/register"
          className="mt-10 inline-flex rounded-full bg-teal-500 px-7 py-3 font-semibold text-white hover:bg-teal-600"
        >
          Create your Kivara account
        </Link>
      </section>

      <Footer />
    </main>
  );
}
