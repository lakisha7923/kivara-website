import { CONFIRM_ADMIN_ACTION, CONFIRMED_CNA_COPY, CONFIRMED_FACILITY_COPY } from "@/types/kivara";

/** Screen Map §3 — Confirmed Assignment Screen Rule */
export const CONFIRMED_ASSIGNMENT_RULE = {
  cnaSees: CONFIRMED_CNA_COPY,
  facilitySees: CONFIRMED_FACILITY_COPY,
  adminAction: CONFIRM_ADMIN_ACTION,
  noCasualCancel:
    "There is no casual Cancel CNA control. Coverage changes require a documented exception workflow.",
} as const;
