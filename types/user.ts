export interface User {
  uid: string;
  fullName: string;
  email: string;
  role: "facility" | "professional";
}