import type {
  AdminAlert,
  Assignment,
  AuditEvent,
  AvailableShift,
  CnaProfile,
  Invoice,
  ShiftRequest,
  StaffingRequest,
  Timesheet,
} from "@/types/kivara";

export {
  CONFIRM_ADMIN_ACTION,
  CONFIRMED_CNA_COPY,
  CONFIRMED_FACILITY_COPY,
} from "@/types/kivara";

export const mockCna: CnaProfile = {
  id: "cna-jordan",
  fullName: "Jordan Miles",
  email: "jordan.miles@email.com",
  phone: "(404) 555-0142",
  status: "Work Ready",
  workReady: true,
  actionItems: [],
  workAreas: ["Long-term care", "Med-surg support", "Assisted living"],
  approvedHoursThisPeriod: 36,
  payStatus: "Approved hours ready for payroll provider",
  credentials: [
    {
      id: "cred-1",
      name: "CNA License",
      status: "Approved",
      expiresOn: "2027-03-12",
    },
    {
      id: "cred-2",
      name: "CPR / BLS",
      status: "Approved",
      expiresOn: "2026-11-02",
    },
    {
      id: "cred-3",
      name: "TB Screening",
      status: "Expiring Soon",
      expiresOn: "2026-09-28",
    },
    {
      id: "cred-4",
      name: "Background Screening",
      status: "Approved",
    },
  ],
};

export const mockOnboardingCna: CnaProfile = {
  id: "cna-avery",
  fullName: "Avery Quinn",
  email: "avery.quinn@email.com",
  phone: "(678) 555-0199",
  status: "Onboarding",
  workReady: false,
  actionItems: [
    "Upload CPR / BLS card",
    "Complete orientation packet",
    "Sign handbook acknowledgment",
  ],
  workAreas: ["Long-term care"],
  approvedHoursThisPeriod: 0,
  payStatus: "Not ready",
  credentials: [
    {
      id: "cred2-1",
      name: "CNA License",
      status: "Pending Review",
      expiresOn: "2027-01-01",
    },
    {
      id: "cred2-2",
      name: "CPR / BLS",
      status: "Missing",
    },
    {
      id: "cred2-3",
      name: "TB Screening",
      status: "Uploaded",
    },
  ],
};

export const mockAvailableShifts: AvailableShift[] = [
  {
    id: "shift-1001-b",
    positionId: "pos-1001-b",
    requestId: "req-1001",
    facilityName: "Sunrise Care Center",
    locationName: "Main Campus",
    address: "1840 Wellness Parkway, Atlanta, GA",
    unit: "Memory Care",
    date: "Sun, Sep 14",
    startTime: "7:00 AM",
    endTime: "3:00 PM",
    payRate: 22,
    requirements: ["CNA License", "CPR / BLS"],
    instructions: "Report to nurse station A. Bring scrub set and badge.",
    eligible: true,
  },
  {
    id: "shift-1002-a",
    positionId: "pos-1002-a",
    requestId: "req-1002",
    facilityName: "Sunrise Care Center",
    locationName: "East Wing",
    address: "220 Hillcrest Ave, Decatur, GA",
    unit: "Skilled Nursing",
    date: "Mon, Sep 15",
    startTime: "3:00 PM",
    endTime: "11:00 PM",
    payRate: 24,
    requirements: ["CNA License", "CPR / BLS"],
    instructions: "Evening med-pass support. Clock in at East lobby kiosk.",
    eligible: true,
  },
];

export const mockShiftRequests: ShiftRequest[] = [
  {
    id: "sr-501",
    shiftId: "shift-1001-b",
    cnaName: "Jordan Miles",
    status: "Under Review",
    requestedAt: "Sep 12, 9:14 AM",
  },
];

export const mockAssignments: Assignment[] = [
  {
    id: "asg-9001",
    cnaId: "cna-jordan",
    cnaName: "Jordan Miles",
    facilityName: "Sunrise Care Center",
    locationName: "Main Campus",
    address: "1840 Wellness Parkway, Atlanta, GA",
    unit: "Memory Care",
    date: "Sat, Sep 13",
    startTime: "7:00 AM",
    endTime: "3:00 PM",
    payRate: 22,
    billRate: 38,
    status: "Confirmed",
    attendanceStatus: "Scheduled",
    requestId: "req-1001",
    positionId: "pos-1001-a",
  },
  {
    id: "asg-9000",
    cnaId: "cna-jordan",
    cnaName: "Jordan Miles",
    facilityName: "Sunrise Care Center",
    locationName: "East Wing",
    address: "220 Hillcrest Ave, Decatur, GA",
    unit: "Skilled Nursing",
    date: "Wed, Sep 10",
    startTime: "7:00 AM",
    endTime: "3:00 PM",
    payRate: 22,
    billRate: 38,
    status: "Timesheet Submitted",
    attendanceStatus: "Clocked Out",
    requestId: "req-0999",
    positionId: "pos-0999-a",
    clockInAt: "7:02 AM",
    clockOutAt: "3:05 PM",
    gpsException: false,
  },
];

export const mockStaffingRequests: StaffingRequest[] = [
  {
    id: "req-1001",
    facilityName: "Sunrise Care Center",
    locationName: "Main Campus",
    unit: "Memory Care",
    date: "Sun, Sep 14",
    startTime: "7:00 AM",
    endTime: "3:00 PM",
    quantity: 2,
    filled: 1,
    status: "Partially Filled",
    payRate: 22,
    billRate: 38,
    requirements: ["CNA License", "CPR / BLS"],
    instructions: "Report to nurse station A.",
    contactName: "DON — Pat Ellis",
  },
  {
    id: "req-1002",
    facilityName: "Sunrise Care Center",
    locationName: "East Wing",
    unit: "Skilled Nursing",
    date: "Mon, Sep 15",
    startTime: "3:00 PM",
    endTime: "11:00 PM",
    quantity: 1,
    filled: 0,
    status: "Open",
    payRate: 24,
    billRate: 41,
    requirements: ["CNA License", "CPR / BLS"],
    instructions: "Clock in at East lobby kiosk.",
    contactName: "Scheduler — Morgan Lee",
  },
];

export const mockTimesheets: Timesheet[] = [
  {
    id: "ts-7001",
    assignmentId: "asg-9000",
    cnaName: "Jordan Miles",
    facilityName: "Sunrise Care Center",
    date: "Wed, Sep 10",
    scheduledHours: 8,
    actualHours: 8.05,
    status: "Submitted",
  },
];

export const mockInvoices: Invoice[] = [
  {
    id: "inv-3001",
    facilityName: "Sunrise Care Center",
    periodLabel: "Week of Sep 7, 2026",
    amount: 1216,
    status: "Issued",
    shiftCount: 4,
    billableHours: 32,
  },
  {
    id: "inv-3002",
    facilityName: "Sunrise Care Center",
    periodLabel: "Week of Sep 14, 2026",
    amount: 304,
    status: "Draft",
    shiftCount: 1,
    billableHours: 8,
  },
];

export const mockAdminAlerts: AdminAlert[] = [
  {
    id: "a1",
    severity: "urgent",
    title: "Open position still unfilled",
    detail: "Sunrise Main · Memory Care · Sep 14 AM — 1 of 2 open",
  },
  {
    id: "a2",
    severity: "warning",
    title: "Credential expiring soon",
    detail: "Jordan Miles · TB Screening expires Sep 28",
  },
  {
    id: "a3",
    severity: "info",
    title: "Timesheet awaiting approval",
    detail: "Jordan Miles · Sep 10 East Wing shift",
  },
];

export const mockAuditEvents: AuditEvent[] = [
  {
    id: "aud-1",
    actor: "Ops Manager — Sam Rivera",
    action: "Confirm Assignment",
    recordType: "Assignment",
    recordId: "asg-9001",
    previousValue: "Under Review",
    newValue: "Confirmed",
    reason: "Eligible, no conflict, credentials approved",
    at: "Sep 11, 4:20 PM",
  },
];
