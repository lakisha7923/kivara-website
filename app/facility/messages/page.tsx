import FacilityShell from "@/components/facility/FacilityShell";
import { PageHeader, ScreenCard } from "@/components/ui/primitives";

export default function FacilityMessagesPage() {
  return (
    <FacilityShell title="Messages">
      <PageHeader
        eyebrow="Communication"
        title="Message Kivara"
        subtitle="Contact Kivara ops for staffing updates and urgent operational issues."
      />
      <ScreenCard>
        <p className="text-sm text-slate-600">
          Prototype inbox — live messaging stays on Firebase conversations as we
          connect the full thread UI.
        </p>
        <div className="mt-4 space-y-3">
          <div className="rounded-xl bg-[var(--kivara-aqua)] p-4">
            <p className="text-xs font-semibold text-teal-800">Kivara Ops</p>
            <p className="mt-1 text-sm text-[var(--kivara-navy)]">
              Jordan Miles is confirmed for Saturday Memory Care 7a–3p.
            </p>
          </div>
          <textarea
            className="min-h-24 w-full rounded-xl border px-4 py-3"
            placeholder="Write a message to Kivara…"
          />
          <button
            type="button"
            className="rounded-full bg-[var(--kivara-navy)] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Send message
          </button>
        </div>
      </ScreenCard>
    </FacilityShell>
  );
}
