export interface Application {
  id: string;
  jobId: string;
  professionalId: string;
  professionalName: string;
  professionalEmail: string;
  facilityName: string;
  jobTitle: string;
  status: "Pending" | "Accepted" | "Declined";
}