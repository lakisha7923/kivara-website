import { Message } from "@/types/message";
import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

export async function sendMessage(
  conversationId: string,
  senderId: string,
  text: string
) {
  return await addDoc(collection(db, "messages"), {
    conversationId,
    senderId,
    text,
    createdAt: serverTimestamp(),
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