"use client";

import Link from "next/link";
import { useId, useState } from "react";

import CnaShell from "@/components/cna/CnaShell";
import { PageHeader, ScreenCard } from "@/components/ui/primitives";
import {
  mockProfessionalRating,
  professionalRatingFaqItems,
  professionalRatingFaqRemember,
  type RatingFaqItem,
} from "@/lib/ratings/faq";

function FaqAnswer({ item }: { item: RatingFaqItem }) {
  return (
    <div className="space-y-3 text-sm leading-relaxed text-slate-700">
      {item.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {item.bullets ? (
        <ul className="list-disc space-y-1.5 pl-5">
          {item.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      {item.numbered ? (
        <ol className="list-decimal space-y-1.5 pl-5">
          {item.numbered.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      ) : null}
      {item.closing ? <p>{item.closing}</p> : null}
    </div>
  );
}

function FaqAccordionItem({
  item,
  defaultOpen = false,
}: {
  item: RatingFaqItem;
  defaultOpen?: boolean;
}) {
  const panelId = useId();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-slate-200 last:border-b-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-start justify-between gap-3 py-3.5 text-left"
      >
        <span className="text-sm font-semibold text-[#0D2B4D]">
          {item.question}
        </span>
        <span
          className="mt-0.5 shrink-0 text-lg font-light leading-none text-[#0FA3A3]"
          aria-hidden
        >
          {open ? "−" : "+"}
        </span>
      </button>
      {open ? (
        <div id={panelId} className="pb-4">
          <FaqAnswer item={item} />
        </div>
      ) : null}
    </div>
  );
}

export default function CnaRatingsFaqPage() {
  const rating = mockProfessionalRating;

  return (
    <CnaShell>
      <PageHeader
        eyebrow="More"
        title="Professional Rating"
        subtitle="Frequently asked questions about facility feedback after completed assignments"
      />

      <ScreenCard className="mb-4 bg-gradient-to-br from-[#0D2B4D] to-[#164872] text-white">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D6F1F1]">
          Your rating
        </p>
        {rating.status === "ready" ? (
          <>
            <div className="mt-2 flex items-end gap-3">
              <p className="font-[family-name:var(--font-playfair)] text-5xl font-bold leading-none">
                {rating.average.toFixed(1)}
              </p>
              <div className="pb-1">
                <p className="text-sm font-semibold text-[#0FA3A3]">
                  / {rating.maxStars.toFixed(1)} ⭐
                </p>
                <p className="text-xs text-white/75">
                  Based on {rating.ratingCount} ratings
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-white/80">
              Facility feedback after completed Kivara assignments — separate
              from your Reliability Score, and not editable by you or as an
              overall score by facilities.
            </p>
          </>
        ) : (
          <>
            <p className="mt-3 text-2xl font-bold">{rating.message}</p>
            <p className="mt-2 text-xs leading-relaxed text-white/80">
              This is different from a low rating. Ratings appear after
              facilities rate completed assignments.
            </p>
          </>
        )}
      </ScreenCard>

      <ScreenCard>
        <h2 className="text-xs font-bold uppercase tracking-wide text-slate-500">
          FAQ
        </h2>
        <div className="mt-1">
          {professionalRatingFaqItems.map((item, index) => (
            <FaqAccordionItem
              key={item.id}
              item={item}
              defaultOpen={index === 0}
            />
          ))}
        </div>
      </ScreenCard>

      <ScreenCard className="mt-4 border-[#0FA3A3]/40 bg-[#E8F6F6]">
        <h2 className="text-sm font-bold text-[#0D2B4D]">
          {professionalRatingFaqRemember.title}
        </h2>
        <div className="mt-2 space-y-2 text-sm text-slate-700">
          {professionalRatingFaqRemember.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-3 text-sm font-semibold text-[#0D2B4D]">
          {professionalRatingFaqRemember.tagline}
        </p>
      </ScreenCard>

      <div className="mt-4 flex flex-col gap-2">
        <Link
          href="/cna/more/reliability"
          className="inline-flex justify-center rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#0D2B4D]"
        >
          Read Reliability Score FAQ
        </Link>
        <Link
          href="/cna/more/help"
          className="inline-flex justify-center rounded-full bg-[#0D2B4D] px-4 py-2.5 text-sm font-semibold text-white"
        >
          Contact Kivara Support
        </Link>
        <Link
          href="/cna/more"
          className="inline-block text-center text-sm font-semibold text-teal-700"
        >
          ← Back to More
        </Link>
      </div>
    </CnaShell>
  );
}
