export type JobStatus = "Open" | "Closed";

export type Job = {
  id: string;
  facilityId: string;
  facilityName: string;
  jobTitle: string;
  location: string;
  specialty: string;
  shift: string;
  hourlyRate: string;
  description: string;
  status?: JobStatus;
};