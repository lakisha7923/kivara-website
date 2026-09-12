import Link from "next/link";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const services = [
  {
    title: "On-demand shift posting",
    body: "Publish open shifts with role, rate, location, and timing in a few taps.",
  },
  {
    title: "Credential-ready matching",
    body: "Review licenses and work history before you accept a professional.",
  },
  {
    title: "In-app messaging",
    body: "Coordinate details directly between facilities and professionals.",
  },
  {
    title: "Billing & payouts",
    body: "Track completed shifts and move into clear facility billing and professional payouts.",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
          Services
        </p>
        <h1 className="mt-3 text-4xl font-bold text-[#0D2B4D] sm:text-5xl">
          Everything you need to fill and work shifts
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-slate-600">
          Kivara brings posting, applications, messaging, credentials, and
          payments into one healthcare workforce platform.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-[#0D2B4D]">
                {service.title}
              </h2>
              <p className="mt-2 text-slate-600">{service.body}</p>
            </article>
          ))}
        </div>

        <Link
          href="/register"
          className="mt-10 inline-flex rounded-full bg-[#0D2B4D] px-7 py-3 font-semibold text-white hover:bg-[#123B66]"
        >
          Get started
        </Link>
      </section>

      <Footer />
    </main>
  );
}
