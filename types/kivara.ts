export type CredentialStatus =
  | "Missing"
  | "Uploaded"
  | "Pending Review"
  | "Approved"
  | "Rejected"
  | "Expiring Soon"
  | "Expired";

export type CnaStatus =
  | "Applicant"
  | "Onboarding"
  | "Pending Review"
  | "Work Ready"
  | "Restricted"
  | "Inactive";

export type StaffingRequestStatus =
  | "Draft"
  | "Submitted"
  | "Open"
  | "Partially Filled"
  | "Fully Staffed"
  | "In Progress"
  | "Completed"
  | "Billed";

export type ShiftRequestStatus =
  | "Requested"
  | "Under Review"
  | "Confirmed"
  | "Not Selected"
  | "Withdrawn";

export type AssignmentStatus =
  | "Confirmed"
  | "Ready to Clock In"
  | "Clocked In"
  | "On Shift"
  | "Clocked Out"
  | "Timesheet Submitted"
  | "Completed";

export type TimesheetStatus =
  | "Draft"
  | "Submitted"
  | "Facility Reviewed"
  | "Disputed"
  | "Kivara Approved"
  | "Locked"
  | "Corrected";

export type InvoiceStatus =
  | "Draft"
  | "Reviewed"
  | "Issued"
  | "Sent"
  | "Due"
  | "Paid"
  | "Overdue"
  | "Adjusted";

export type AttendanceStatus =
  | "Scheduled"
  | "Arrived"
  | "Clocked In"
  | "On Shift"
  | "Clocked Out";

export interface Credential {
  id: string;
  name: string;
  status: CredentialStatus;
  expiresOn?: string;
}

export interface CnaProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  status: CnaStatus;
  workReady: boolean;
  actionItems: string[];
  workAreas: string[];
  approvedHoursThisPeriod: number;
  payStatus: string;
  credentials: Credential[];
}

export interface AvailableShift {
  id: string;
  facilityName: string;
  locationName: string;
  address: string;
  unit: string;
  date: string;
  startTime: string;
  endTime: string;
  payRate: number;
  requirements: string[];
  instructions: string;
  eligible: boolean;
  positionId: string;
  requestId: string;
}

export interface ShiftRequest {
  id: string;
  shiftId: string;
  cnaName: string;
  status: ShiftRequestStatus;
  requestedAt: string;
}

export interface Assignment {
  id: string;
  cnaId: string;
  cnaName: string;
  facilityName: string;
  locationName: string;
  address: string;
  unit: string;
  date: string;
  startTime: string;
  endTime: string;
  payRate: number;
  billRate: number;
  status: AssignmentStatus;
  attendanceStatus: AttendanceStatus;
  requestId: string;
  positionId: string;
  clockInAt?: string;
  clockOutAt?: string;
  gpsException?: boolean;
}

export interface StaffingRequest {
  id: string;
  facilityName: string;
  locationName: string;
  unit: string;
  date: string;
  startTime: string;
  endTime: string;
  quantity: number;
  filled: number;
  status: StaffingRequestStatus;
  payRate: number;
  billRate: number;
  requirements: string[];
  instructions: string;
  contactName: string;
}

export interface Timesheet {
  id: string;
  assignmentId: string;
  cnaName: string;
  facilityName: string;
  date: string;
  scheduledHours: number;
  actualHours: number;
  status: TimesheetStatus;
}

export interface Invoice {
  id: string;
  facilityName: string;
  periodLabel: string;
  amount: number;
  status: InvoiceStatus;
  shiftCount: number;
  billableHours: number;
}

export interface AdminAlert {
  id: string;
  severity: "urgent" | "warning" | "info";
  title: string;
  detail: string;
}

export interface AuditEvent {
  id: string;
  actor: string;
  action: string;
  recordType: string;
  recordId: string;
  previousValue?: string;
  newValue?: string;
  reason?: string;
  at: string;
}

/** Screen Map §3 — Confirmed Assignment Screen Rule
 *  CNA sees: CONFIRMED — YOU ARE SCHEDULED TO WORK
 *  Facility sees: CONFIRMED ASSIGNMENT
 *  Admin action: CONFIRM ASSIGNMENT
 *  No casual Cancel CNA — documented exception workflow required.
 */
export const CONFIRMED_CNA_COPY =
  "CONFIRMED — YOU ARE SCHEDULED TO WORK" as const;
export const CONFIRMED_FACILITY_COPY = "CONFIRMED ASSIGNMENT" as const;
export const CONFIRM_ADMIN_ACTION = "CONFIRM ASSIGNMENT" as const;
