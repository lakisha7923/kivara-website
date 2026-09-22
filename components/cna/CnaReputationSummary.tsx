import Link from "next/link";

import { ScreenCard } from "@/components/ui/primitives";
import {
  mockProfessionalRating,
  type ProfessionalRatingSummary,
} from "@/lib/ratings/faq";
import {
  mockReliabilityScore,
  type ReliabilityScoreSummary,
} from "@/lib/reliability/faq";

function ReliabilityCard({ score }: { score: ReliabilityScoreSummary }) {
  return (
    <ScreenCard className="h-full">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0FA3A3]">
        Reliability Score
      </p>
      {score.status === "ready" ? (
        <>
          <p className="mt-2 font-[family-name:var(--font-playfair)] text-3xl font-bold leading-none text-[#0D2B4D]">
            {score.value}
            <span className="text-lg font-semibold text-slate-400">
              /{score.max}
            </span>
          </p>
          <p className="mt-1.5 text-xs font-semibold text-emerald-700">
            {score.label}
          </p>
          <ul className="mt-3 space-y-1 text-xs text-slate-600">
            <li>{score.completedShifts} shifts completed</li>
            <li>{score.onTimeShifts} on time</li>
            <li>{score.noShows} no-shows</li>
          </ul>
        </>
      ) : (
        <>
          <p className="mt-3 text-base font-semibold text-[#0D2B4D]">
            {score.message}
          </p>
          <p className="mt-2 text-xs text-slate-600">
            Complete more verified Kivara shifts to establish a Reliability
            Score. This is not the same as a low score.
          </p>
        </>
      )}
      <Link
        href="/cna/more/reliability"
        className="mt-3 inline-flex text-sm font-semibold text-teal-700"
      >
        How your score works →
      </Link>
    </ScreenCard>
  );
}

function RatingCard({ rating }: { rating: ProfessionalRatingSummary }) {
  return (
    <ScreenCard className="h-full">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0FA3A3]">
        Professional Rating
      </p>
      {rating.status === "ready" ? (
        <>
          <p className="mt-2 font-[family-name:var(--font-playfair)] text-3xl font-bold leading-none text-[#0D2B4D]">
            {rating.average.toFixed(1)}
            <span className="text-lg font-semibold text-slate-400">
              /{rating.maxStars.toFixed(1)}
            </span>
            <span className="ml-1 text-2xl" aria-hidden>
              ⭐
            </span>
          </p>
          <p className="mt-1.5 text-xs font-semibold text-emerald-700">
            Based on {rating.ratingCount} ratings
          </p>
          <p className="mt-3 text-xs text-slate-600">{rating.caption}</p>
        </>
      ) : (
        <>
          <p className="mt-3 text-base font-semibold text-[#0D2B4D]">
            {rating.message}
          </p>
          <p className="mt-2 text-xs text-slate-600">
            This is different from a low rating. Facilities rate after completed
            Kivara assignments.
          </p>
        </>
      )}
      <Link
        href="/cna/more/ratings"
        className="mt-3 inline-flex text-sm font-semibold text-teal-700"
      >
        How ratings work →
      </Link>
    </ScreenCard>
  );
}

/**
 * Side-by-side professional summary: Reliability (shift activity) and
 * Professional Rating (facility feedback). Never combined into one score.
 */
export default function CnaReputationSummary({
  reliability = mockReliabilityScore,
  rating = mockProfessionalRating,
}: {
  reliability?: ReliabilityScoreSummary;
  rating?: ProfessionalRatingSummary;
}) {
  return (
    <section aria-label="Professional summary">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ReliabilityCard score={reliability} />
        <RatingCard rating={rating} />
      </div>
    </section>
  );
}
