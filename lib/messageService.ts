import { Message } from "@/types/message";
import { db } from "@/lib/firebase";
import { createNotification } from "@/lib/notificationService";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export async function sendMessage(
  conversationId: string,
  senderId: string,
  text: string
) {
  // Save the message
  await addDoc(collection(db, "messages"), {
    conversationId,
    senderId,
    text,
    createdAt: serverTimestamp(),
  });

  // Update conversation preview
  await updateDoc(doc(db, "conversations", conversationId), {
    lastMessage: text,
    updatedAt: serverTimestamp(),
  });

  // Load conversation to determine recipient
  const conversationRef = doc(db, "conversations", conversationId);
  const conversationSnap = await getDoc(conversationRef);

  if (!conversationSnap.exists()) return;

  const conversation = conversationSnap.data();

  // Determine who should receive the notification
  const receiverId =
    senderId === conversation.facilityId
      ? conversation.professionalId
      : conversation.facilityId;

  const senderName =
    senderId === conversation.facilityId
      ? conversation.facilityName
      : conversation.professionalName;

  // Create notification
  await createNotification({
    userId: receiverId,
    title: "New Message",
    message: `${senderName} sent you a new message.`,
    type: "Message",
    read: false,
  });
}

export function subscribeToMessages(
  conversationId: string,
  callback: (messages: Message[]) => void
) {
  const q = query(
    collection(db, "messages"),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    const messages: Message[] = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Message, "id">),
      }))
      .filter(
        (message) => message.conversationId === conversationId
      );

    callback(messages);
  });
}