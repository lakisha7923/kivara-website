export interface Job {
  id: string;
  jobTitle: string;
  facilityName: string;
  location: string;
  specialty: string;
  shift: string;
  hourlyRate: string;
  description?: string;
  createdAt?: any;
}