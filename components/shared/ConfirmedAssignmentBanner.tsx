import { CONFIRMED_ASSIGNMENT_RULE } from "@/lib/rules/confirmed-assignment";

type Portal = "cna" | "facility" | "admin";

const headlines: Record<Portal, string> = {
  cna: CONFIRMED_ASSIGNMENT_RULE.cnaSees,
  facility: CONFIRMED_ASSIGNMENT_RULE.facilitySees,
  admin: CONFIRMED_ASSIGNMENT_RULE.adminAction,
};

export function ConfirmedAssignmentBanner({
  portal,
  showPolicy = true,
}: {
  portal: Portal;
  showPolicy?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-teal-200 bg-teal-50/80 p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-800">
        Confirmed Assignment Screen Rule
      </p>
      <p className="mt-2 font-[family-name:var(--font-playfair)] text-lg font-bold leading-snug text-[#0D2B4D] sm:text-xl">
        {headlines[portal]}
      </p>
      {showPolicy ? (
        <p className="mt-2 text-sm text-slate-700">
          {CONFIRMED_ASSIGNMENT_RULE.noCasualCancel}
        </p>
      ) : null}
      {portal === "admin" ? (
        <p className="mt-2 text-xs text-slate-600">
          CNA sees “{CONFIRMED_ASSIGNMENT_RULE.cnaSees}”. Facility sees “
          {CONFIRMED_ASSIGNMENT_RULE.facilitySees}”.
        </p>
      ) : null}
    </div>
  );
}
