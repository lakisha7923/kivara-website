export type CredentialStatus =
  | "Not Submitted"
  | "Pending"
  | "Verified";

export interface ProfessionalProfile {
  fullName: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  specialty: string;
  licenseNumber: string;
  experience: string;
  summary: string;
  resumeUrl?: string;
  photoUrl?: string;

  licenseStatus?: CredentialStatus;
  backgroundCheckStatus?: CredentialStatus;
  cprStatus?: CredentialStatus;
}