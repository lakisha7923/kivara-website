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
  where,
} from "firebase/firestore";

export async function sendMessage(
  conversationId: string,
  senderId: string,
  text: string
) {
  const conversationRef = doc(
    db,
    "conversations",
    conversationId
  );

  const conversationSnap = await getDoc(conversationRef);

  if (!conversationSnap.exists()) {
    throw new Error("Conversation not found.");
  }

  const conversation = conversationSnap.data();

  if (
    senderId !== conversation.facilityId &&
    senderId !== conversation.professionalId
  ) {
    throw new Error(
      "You are not a participant in this conversation."
    );
  }

  await addDoc(collection(db, "messages"), {
    conversationId,
    senderId,
    text,
    createdAt: serverTimestamp(),
  });

  await updateDoc(conversationRef, {
    lastMessage: text,
    updatedAt: serverTimestamp(),
  });

  const receiverId =
    senderId === conversation.facilityId
      ? conversation.professionalId
      : conversation.facilityId;

  const senderName =
    senderId === conversation.facilityId
      ? conversation.facilityName
      : conversation.professionalName;

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
    where("conversationId", "==", conversationId),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const messages: Message[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Message, "id">),
      }));

      callback(messages);
    },
    (error) => {
      console.error(
        "Unable to load conversation messages:",
        error
      );

      callback([]);
    }
  );
}