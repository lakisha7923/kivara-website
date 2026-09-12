import type {
  Credential,
  CredentialStatus,
  ScreeningOrderStatus,
  ScreeningRequirement,
} from "@/types/kivara";

/** Core credentials that must be Approved for Work Ready (V1 rule). */
export const REQUIRED_WORK_READY_CREDENTIAL_NAMES = [
  "CNA License",
  "CPR / BLS",
  "TB Screening",
  "Background Check",
  "Drug Screen",
] as const;

export const SCREENING_STATUS_RULES: Record<
  ScreeningOrderStatus,
  {
    credentialStatus: CredentialStatus;
    blocksWorkReady: boolean;
    cnaMessage: string;
    adminAction: string;
  }
> = {
  "Not Started": {
    credentialStatus: "Missing",
    blocksWorkReady: true,
    cnaMessage: "This screening has not been started yet.",
    adminAction: "Order screening or collect consent",
  },
  "Consent Needed": {
    credentialStatus: "Missing",
    blocksWorkReady: true,
    cnaMessage: "Review and sign consent so Kivara can order this screening.",
    adminAction: "Wait for CNA consent, then order",
  },
  Ordered: {
    credentialStatus: "Pending Review",
    blocksWorkReady: true,
    cnaMessage: "Your screening was ordered. Complete any vendor instructions.",
    adminAction: "Monitor vendor status / webhook",
  },
  "In Progress": {
    credentialStatus: "Pending Review",
    blocksWorkReady: true,
    cnaMessage: "Screening is in progress with the vendor.",
    adminAction: "Monitor vendor; no Work Ready until Clear",
  },
  Clear: {
    credentialStatus: "Approved",
    blocksWorkReady: false,
    cnaMessage: "Screening cleared. This requirement is satisfied.",
    adminAction: "No action unless package expires",
  },
  Consider: {
    credentialStatus: "Pending Review",
    blocksWorkReady: true,
    cnaMessage:
      "Your screening needs Kivara review. Support may contact you for next steps.",
    adminAction: "Review vendor report; Approve, Restrict, or Fail",
  },
  Failed: {
    credentialStatus: "Rejected",
    blocksWorkReady: true,
    cnaMessage:
      "This screening did not clear. Contact Kivara Support for options.",
    adminAction: "Document decision; keep Work Ready blocked",
  },
  Expired: {
    credentialStatus: "Expired",
    blocksWorkReady: true,
    cnaMessage: "This screening expired. A new order is required.",
    adminAction: "Reorder screening package",
  },
  Cancelled: {
    credentialStatus: "Missing",
    blocksWorkReady: true,
    cnaMessage: "This screening order was cancelled. Start a new order.",
    adminAction: "Reorder if still required",
  },
};

export function isScreeningCredential(credential: Credential) {
  return (
    credential.kind === "background" ||
    credential.kind === "drug" ||
    /background/i.test(credential.name) ||
    /drug screen/i.test(credential.name)
  );
}

export function screeningKindFromCredential(
  credential: Credential
): "background" | "drug" | null {
  if (credential.kind === "background" || credential.kind === "drug") {
    return credential.kind;
  }
  if (/background/i.test(credential.name)) return "background";
  if (/drug screen/i.test(credential.name)) return "drug";
  return null;
}

export function credentialBlocksWorkReady(status: CredentialStatus) {
  return status !== "Approved" && status !== "Expiring Soon";
}

export function evaluateWorkReady(credentials: Credential[]) {
  const required = REQUIRED_WORK_READY_CREDENTIAL_NAMES.map((name) => {
    const match = credentials.find(
      (credential) =>
        credential.name === name ||
        (name === "Background Check" && /background/i.test(credential.name)) ||
        (name === "Drug Screen" && /drug screen/i.test(credential.name))
    );
    return {
      name,
      credential: match,
      satisfied: match ? !credentialBlocksWorkReady(match.status) : false,
      status: match?.status ?? ("Missing" as CredentialStatus),
    };
  });

  const blockers = required.filter((item) => !item.satisfied);
  return {
    workReady: blockers.length === 0,
    required,
    blockers,
  };
}

export function screeningTone(status: ScreeningOrderStatus) {
  if (status === "Clear") return "success" as const;
  if (status === "Failed" || status === "Expired" || status === "Cancelled")
    return "danger" as const;
  if (status === "Consider") return "warning" as const;
  if (status === "Not Started" || status === "Consent Needed")
    return "neutral" as const;
  return "info" as const;
}

export function findScreeningRequirement(
  requirements: ScreeningRequirement[],
  credentialId: string
) {
  return requirements.find((item) => item.credentialId === credentialId);
}
