import { db } from "@/lib/firebase";
import { Notification } from "@/types/notification";

import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  doc,
  where,
} from "firebase/firestore";

/**
 * Create a notification
 */
export async function createNotification(
  notification: Omit<Notification, "id" | "createdAt">
) {
  await addDoc(collection(db, "notifications"), {
    ...notification,
    createdAt: serverTimestamp(),
  });
}

/**
 * Get all notifications for a user
 */
export async function getNotifications(userId: string) {
  const q = query(
    collection(db, "notifications"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Notification[];
}

/**
 * Mark a notification as read
 */
export async function markNotificationAsRead(
  notificationId: string
) {
  await updateDoc(doc(db, "notifications", notificationId), {
    read: true,
  });
}