import Link from "next/link";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function FacilitiesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
          For facilities
        </p>
        <h1 className="mt-3 text-4xl font-bold text-[#0D2B4D] sm:text-5xl">
          Fill open shifts without the agency maze
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-slate-600">
          Hospitals, clinics, nursing homes, rehab centers, and home health
          teams use Kivara to post shifts, review credentialed professionals,
          and confirm coverage fast.
        </p>

        <ol className="mt-10 space-y-4">
          {[
            "Create your facility account",
            "Post the shifts you need filled",
            "Review applicants and credentials",
            "Confirm the shift and stay coordinated in messages",
          ].map((step, index) => (
            <li
              key={step}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-500 font-bold text-white">
                {index + 1}
              </span>
              <p className="pt-1 text-lg font-semibold text-[#0D2B4D]">
                {step}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/register"
            className="rounded-full bg-teal-500 px-7 py-3 text-center font-semibold text-white hover:bg-teal-600"
          >
            Register your facility
          </Link>
          <Link
            href="/login"
            className="rounded-full border-2 border-[#0D2B4D] px-7 py-3 text-center font-semibold text-[#0D2B4D]"
          >
            Facility login
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
