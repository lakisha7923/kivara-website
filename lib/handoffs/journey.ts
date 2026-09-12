export type HandoffStepId =
  | "facility_submitted"
  | "admin_published"
  | "cna_requested"
  | "admin_confirmed"
  | "cna_clocked"
  | "timesheet_reviewed"
  | "hours_locked";

export type PortalActor = "facility" | "admin" | "cna";

export interface HandoffStepDef {
  id: HandoffStepId;
  order: number;
  trigger: string;
  whatHappensNext: string;
  actor: PortalActor;
  actionLabel: string;
  portalHref: string;
}

/** Screen Map §2 Table 1 — Cross-Portal Handoffs */
export const HANDOFF_STEPS: HandoffStepDef[] = [
  {
    id: "facility_submitted",
    order: 1,
    trigger: "Facility submits staffing request",
    whatHappensNext: "Admin receives request and reviews it.",
    actor: "facility",
    actionLabel: "Submit staffing request",
    portalHref: "/facility/requests",
  },
  {
    id: "admin_published",
    order: 2,
    trigger: "Admin publishes eligible positions",
    whatHappensNext: "Qualified CNAs can see the shift.",
    actor: "admin",
    actionLabel: "Publish to eligible CNAs",
    portalHref: "/admin/requests",
  },
  {
    id: "cna_requested",
    order: 3,
    trigger: "CNA requests shift",
    whatHappensNext: "Admin receives the request with eligibility checks.",
    actor: "cna",
    actionLabel: "Request this shift",
    portalHref: "/cna/shifts/handoff-shift-1",
  },
  {
    id: "admin_confirmed",
    order: 4,
    trigger: "Admin confirms assignment",
    whatHappensNext:
      "CNA schedule locks; facility sees assigned CNA; both are notified.",
    actor: "admin",
    actionLabel: "Confirm Assignment",
    portalHref: "/admin/assignments",
  },
  {
    id: "cna_clocked",
    order: 5,
    trigger: "CNA clocks in/out",
    whatHappensNext:
      "Admin sees attendance and exceptions; facility sees operational status only.",
    actor: "cna",
    actionLabel: "Complete GPS clock in/out",
    portalHref: "/cna/clock/asg-handoff-1",
  },
  {
    id: "timesheet_reviewed",
    order: 6,
    trigger: "Timesheet is submitted",
    whatHappensNext:
      "Facility reviews; Kivara gives final approval and locks hours.",
    actor: "facility",
    actionLabel: "Facility reviews timesheet",
    portalHref: "/facility/timesheets",
  },
  {
    id: "hours_locked",
    order: 7,
    trigger: "Hours are locked",
    whatHappensNext:
      "Payroll-ready record and facility invoice draft are created from the same approved hours.",
    actor: "admin",
    actionLabel: "Approve & lock hours",
    portalHref: "/admin/timesheets",
  },
];

export interface HandoffNotification {
  id: string;
  portal: PortalActor;
  title: string;
  detail: string;
  at: string;
  read: boolean;
}

export interface HandoffRecord {
  requestId: string;
  facilityName: string;
  locationName: string;
  unit: string;
  date: string;
  startTime: string;
  endTime: string;
  quantity: number;
  payRate: number;
  billRate: number;
  requirements: string[];
  instructions: string;
  cnaName: string;
  cnaId: string;
  shiftId: string;
  assignmentId: string;
  timesheetId: string;
  invoiceId: string;
  completedSteps: HandoffStepId[];
  notifications: HandoffNotification[];
  auditTrail: { at: string; actor: string; action: string }[];
  published: boolean;
  cnaRequested: boolean;
  confirmed: boolean;
  clocked: boolean;
  timesheetSubmitted: boolean;
  facilityReviewed: boolean;
  hoursLocked: boolean;
  invoiceDrafted: boolean;
  scheduledHours: number;
  actualHours: number;
}

export const HANDOFF_STORAGE_KEY = "kivara.v1.crossPortalHandoffs";

export function createSeedHandoff(): HandoffRecord {
  return {
    requestId: "req-handoff-1",
    facilityName: "Memorial Care Center",
    locationName: "Main Campus",
    unit: "Skilled Nursing",
    date: "Mon, Sep 15",
    startTime: "7:00 AM",
    endTime: "3:00 PM",
    quantity: 1,
    payRate: 22,
    billRate: 38,
    requirements: ["CNA License", "CPR / BLS"],
    instructions: "Report to nurse station A. GPS clock required.",
    cnaName: "Jordan Miles",
    cnaId: "cna-jordan",
    shiftId: "handoff-shift-1",
    assignmentId: "asg-handoff-1",
    timesheetId: "ts-handoff-1",
    invoiceId: "inv-handoff-1",
    completedSteps: [],
    notifications: [],
    auditTrail: [],
    published: false,
    cnaRequested: false,
    confirmed: false,
    clocked: false,
    timesheetSubmitted: false,
    facilityReviewed: false,
    hoursLocked: false,
    invoiceDrafted: false,
    scheduledHours: 8,
    actualHours: 8.05,
  };
}

export function nextOpenStep(record: HandoffRecord): HandoffStepDef | null {
  return (
    HANDOFF_STEPS.find((step) => !record.completedSteps.includes(step.id)) ??
    null
  );
}

export function isStepDone(record: HandoffRecord, id: HandoffStepId) {
  return record.completedSteps.includes(id);
}

export function stamp() {
  return new Date().toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
