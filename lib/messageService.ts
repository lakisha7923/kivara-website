import { Message } from "@/types/message";
import { db } from "@/lib/firebase";

import {
  addDoc,
  collection,
  doc,
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
  await addDoc(collection(db, "messages"), {
    conversationId,
    senderId,
    text,
    createdAt: serverTimestamp(),
  });

  await updateDoc(doc(db, "conversations", conversationId), {
    lastMessage: text,
    updatedAt: serverTimestamp(),
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