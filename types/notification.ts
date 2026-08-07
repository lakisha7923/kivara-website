export interface Notification {
  id: string;

  userId: string;

  title: string;

  message: string;

  type:
    | "Application"
    | "Message"
    | "Shift"
    | "System";

  read: boolean;

  createdAt: any;
}