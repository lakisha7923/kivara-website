"use client";

import Link from "next/link";
import { useId, useState } from "react";

import CnaShell from "@/components/cna/CnaShell";
import { PageHeader, ScreenCard } from "@/components/ui/primitives";
import {
  mockReliabilityScore,
  reliabilityFaqItems,
  reliabilityFaqRemember,
  type ReliabilityFaqItem,
} from "@/lib/reliability/faq";

function FaqAnswer({ item }: { item: ReliabilityFaqItem }) {
  // Place factor bullets between the intro and closing sentence.
  if (item.id === "how-calculated" && item.bullets) {
    return (
      <div className="space-y-3 text-sm leading-relaxed text-slate-700">
        <p>{item.paragraphs[0]}</p>
        <ul className="list-disc space-y-1.5 pl-5">
          {item.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        {item.paragraphs.slice(1).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    );
  }

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
  item: ReliabilityFaqItem;
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

export default function CnaReliabilityFaqPage() {
  return (
    <CnaShell>
      <PageHeader
        eyebrow="More"
        title="Reliability Score"
        subtitle="Frequently asked questions about your 0–100 Kivara reliability history"
      />

      <ScreenCard className="mb-4 bg-gradient-to-br from-[#0D2B4D] to-[#164872] text-white">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D6F1F1]">
          Your score
        </p>
        <div className="mt-2 flex items-end gap-3">
          <p className="font-[family-name:var(--font-playfair)] text-5xl font-bold leading-none">
            {mockReliabilityScore.value}
          </p>
          <div className="pb-1">
            <p className="text-sm font-semibold text-[#0FA3A3]">
              {mockReliabilityScore.label}
            </p>
            <p className="text-xs text-white/75">
              Based on {mockReliabilityScore.completedShifts} completed shifts
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-white/80">
          Calculated by Kivara from verified shift activity — not entered by
          you, and not edited by facilities.
        </p>
      </ScreenCard>

      <ScreenCard>
        <h2 className="text-xs font-bold uppercase tracking-wide text-slate-500">
          FAQ
        </h2>
        <div className="mt-1">
          {reliabilityFaqItems.map((item, index) => (
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
          {reliabilityFaqRemember.title}
        </h2>
        <div className="mt-2 space-y-2 text-sm text-slate-700">
          {reliabilityFaqRemember.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-3 text-sm font-semibold text-[#0D2B4D]">
          {reliabilityFaqRemember.tagline}
        </p>
      </ScreenCard>

      <div className="mt-4 flex flex-col gap-2">
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
