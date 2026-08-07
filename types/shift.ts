export interface Shift {
  id: string;

  facilityId: string;
  facilityName: string;

  professionalId: string;
  professionalName: string;

  date: string;

  startTime: string;
  endTime: string;

  department: string;

  notes?: string;

  status: "Scheduled" | "Completed" | "Cancelled";
}