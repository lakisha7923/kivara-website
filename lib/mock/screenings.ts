import type { ScreeningRequirement } from "@/types/kivara";

/** Demo screening orders for Jordan (Work Ready) and Avery (Onboarding). */
export const mockScreenings: ScreeningRequirement[] = [
  {
    id: "screen-bg-jordan",
    kind: "background",
    title: "Background Check",
    credentialId: "cred-4",
    orderStatus: "Clear",
    vendorName: "Checkr (planned)",
    packageName: "Healthcare standard package",
    orderedOn: "2026-01-08",
    completedOn: "2026-01-11",
    cnaSummary: "Cleared for work. Kivara keeps detailed report results private.",
    adminNotes: "Vendor result: Clear. Package includes county + national + OIG/SAM.",
    blocksWorkReady: false,
  },
  {
    id: "screen-drug-jordan",
    kind: "drug",
    title: "Drug Screen",
    credentialId: "cred-5",
    orderStatus: "Consent Needed",
    vendorName: "Lab partner (planned)",
    packageName: "10-panel urine",
    cnaSummary: "Sign consent, then upload a clearance document or wait for vendor invite.",
    adminNotes: "Manual path enabled. Vendor e-order placeholder until lab API is connected.",
    blocksWorkReady: true,
  },
  {
    id: "screen-bg-avery",
    kind: "background",
    title: "Background Check",
    credentialId: "cred2-4",
    orderStatus: "Consent Needed",
    vendorName: "Checkr (planned)",
    packageName: "Healthcare standard package",
    cnaSummary: "Sign consent so Kivara can order your background check.",
    adminNotes: "Do not order until consent is captured.",
    blocksWorkReady: true,
  },
  {
    id: "screen-drug-avery",
    kind: "drug",
    title: "Drug Screen",
    credentialId: "cred2-5",
    orderStatus: "Not Started",
    vendorName: "Lab partner (planned)",
    packageName: "10-panel urine",
    cnaSummary: "Drug screen has not been ordered yet.",
    adminNotes: "Order after background consent is complete.",
    blocksWorkReady: true,
  },
];

export function screeningsForCredential(credentialId: string) {
  return mockScreenings.filter((item) => item.credentialId === credentialId);
}
