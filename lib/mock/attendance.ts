export type AttendanceStatusLabel =
  | "Scheduled"
  | "Arrived"
  | "Clocked In"
  | "On Shift"
  | "Clocked Out";

export type OnSiteLabel = "Within Area" | "Outside Area" | "Unknown";
export type PunctualityLabel = "On Time" | "Late" | "Early" | "—";

export interface LiveAttendanceRow {
  id: string;
  cnaName: string;
  initials: string;
  facilityName: string;
  facilityCity: string;
  unit: string;
  shiftLabel: string;
  status: AttendanceStatusLabel;
  clockInAt?: string;
  punctuality: PunctualityLabel;
  onSite: OnSiteLabel;
  lastSeen?: string;
  duration?: string;
  gpsAccuracyFt?: number;
}

export const cnaActiveClockShift = {
  id: "asg-clock-today",
  facilityName: "Memorial Care Center",
  address: "4120 Peachtree Road NE, Atlanta, GA 30319",
  unit: "Skilled Nursing Unit",
  role: "CNA — Long Term Care",
  date: "Today",
  startTime: "3:00 PM",
  endTime: "11:00 PM",
  payRate: 22,
  instructions:
    "Arrive on time and in uniform. Report to the nurse station at the main entrance.",
  geofenceRadiusFt: 250,
};

export const facilityTodayAttendance: LiveAttendanceRow[] = [
  {
    id: "att-1",
    cnaName: "Lakisha Thomas",
    initials: "LT",
    facilityName: "Memorial Care Center",
    facilityCity: "Atlanta, GA",
    unit: "Skilled Nursing",
    shiftLabel: "7:00 AM – 3:00 PM",
    status: "On Shift",
    clockInAt: "7:02 AM",
    punctuality: "On Time",
    onSite: "Within Area",
    lastSeen: "Just now",
    duration: "0h 56m",
  },
  {
    id: "att-2",
    cnaName: "Marcus J.",
    initials: "MJ",
    facilityName: "Memorial Care Center",
    facilityCity: "Atlanta, GA",
    unit: "Memory Care",
    shiftLabel: "7:00 AM – 3:00 PM",
    status: "On Shift",
    clockInAt: "6:58 AM",
    punctuality: "On Time",
    onSite: "Within Area",
    lastSeen: "1 min ago",
    duration: "1h 00m",
  },
  {
    id: "att-3",
    cnaName: "Priya S.",
    initials: "PS",
    facilityName: "Memorial Care Center",
    facilityCity: "Atlanta, GA",
    unit: "Rehab Wing",
    shiftLabel: "7:00 AM – 3:00 PM",
    status: "On Shift",
    clockInAt: "7:05 AM",
    punctuality: "On Time",
    onSite: "Within Area",
    lastSeen: "2 min ago",
    duration: "0h 53m",
  },
  {
    id: "att-4",
    cnaName: "Angela D.",
    initials: "AD",
    facilityName: "Memorial Care Center",
    facilityCity: "Atlanta, GA",
    unit: "Skilled Nursing",
    shiftLabel: "3:00 PM – 11:00 PM",
    status: "Scheduled",
    punctuality: "—",
    onSite: "Unknown",
  },
  {
    id: "att-5",
    cnaName: "Tiffany M.",
    initials: "TM",
    facilityName: "Memorial Care Center",
    facilityCity: "Atlanta, GA",
    unit: "Memory Care",
    shiftLabel: "3:00 PM – 11:00 PM",
    status: "Arrived",
    punctuality: "On Time",
    onSite: "Within Area",
    lastSeen: "Just now",
  },
  {
    id: "att-7",
    cnaName: "Devon K.",
    initials: "DK",
    facilityName: "Memorial Care Center",
    facilityCity: "Atlanta, GA",
    unit: "Skilled Nursing",
    shiftLabel: "7:00 AM – 3:00 PM",
    status: "Clocked In",
    clockInAt: "7:11 AM",
    punctuality: "Late",
    onSite: "Within Area",
    lastSeen: "Just now",
    duration: "0h 05m",
  },
  {
    id: "att-6",
    cnaName: "Jasmine R.",
    initials: "JR",
    facilityName: "Memorial Care Center",
    facilityCity: "Atlanta, GA",
    unit: "Rehab Wing",
    shiftLabel: "11:00 PM – 7:00 AM",
    status: "Clocked Out",
    clockInAt: "10:58 PM",
    punctuality: "On Time",
    onSite: "Within Area",
    duration: "7h 57m",
  },
];

export const adminAttendanceKpis = [
  { label: "Currently On Shift", value: "86", detail: "CNAs" },
  { label: "On Time", value: "78", detail: "90.7%" },
  { label: "Late", value: "5", detail: "5.8%" },
  { label: "Not Clocked In", value: "3", detail: "3.5%" },
  { label: "Completed Today", value: "63", detail: "Shifts" },
];

export const adminLiveAttendance: LiveAttendanceRow[] = [
  {
    id: "adm-1",
    cnaName: "Lakisha Thomas",
    initials: "LT",
    facilityName: "Memorial Care Center",
    facilityCity: "Atlanta, GA",
    unit: "Skilled Nursing",
    shiftLabel: "7:00 AM – 3:00 PM",
    status: "On Shift",
    clockInAt: "7:02 AM",
    punctuality: "On Time",
    onSite: "Within Area",
    lastSeen: "Just now",
    duration: "3h 17m",
    gpsAccuracyFt: 15,
  },
  {
    id: "adm-2",
    cnaName: "Marcus J.",
    initials: "MJ",
    facilityName: "Memorial Care Center",
    facilityCity: "Atlanta, GA",
    unit: "Memory Care",
    shiftLabel: "7:00 AM – 3:00 PM",
    status: "On Shift",
    clockInAt: "6:58 AM",
    punctuality: "On Time",
    onSite: "Within Area",
    lastSeen: "1 min ago",
    duration: "3h 21m",
    gpsAccuracyFt: 12,
  },
  {
    id: "adm-3",
    cnaName: "Devon K.",
    initials: "DK",
    facilityName: "Sunrise Care Center",
    facilityCity: "Decatur, GA",
    unit: "Med-Surg Support",
    shiftLabel: "7:00 AM – 3:00 PM",
    status: "On Shift",
    clockInAt: "7:18 AM",
    punctuality: "Late",
    onSite: "Outside Area",
    lastSeen: "4 min ago",
    duration: "3h 01m",
    gpsAccuracyFt: 42,
  },
  {
    id: "adm-4",
    cnaName: "Priya S.",
    initials: "PS",
    facilityName: "Memorial Care Center",
    facilityCity: "Atlanta, GA",
    unit: "Rehab Wing",
    shiftLabel: "7:00 AM – 3:00 PM",
    status: "On Shift",
    clockInAt: "7:05 AM",
    punctuality: "On Time",
    onSite: "Within Area",
    lastSeen: "2 min ago",
    duration: "3h 14m",
    gpsAccuracyFt: 10,
  },
  {
    id: "adm-5",
    cnaName: "Tiffany M.",
    initials: "TM",
    facilityName: "Memorial Care Center",
    facilityCity: "Atlanta, GA",
    unit: "Memory Care",
    shiftLabel: "3:00 PM – 11:00 PM",
    status: "Arrived",
    punctuality: "—",
    onSite: "Within Area",
    lastSeen: "Just now",
  },
  {
    id: "adm-6",
    cnaName: "Angela D.",
    initials: "AD",
    facilityName: "Harbor Ridge SNF",
    facilityCity: "Marietta, GA",
    unit: "Long-term Care",
    shiftLabel: "7:00 AM – 3:00 PM",
    status: "Scheduled",
    punctuality: "—",
    onSite: "Unknown",
  },
];
