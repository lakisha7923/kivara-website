import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { auth } from "@/lib/firebase";

export async function createOrGetConversation(
  facilityId: string,
  professionalId: string,
  facilityName: string,
  professionalName: string
) {
  const q = query(
    collection(db, "conversations"),
    where("facilityId", "==", facilityId),
    where("professionalId", "==", professionalId)
  );

  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    return snapshot.docs[0].id;
  }

  const conversation = await addDoc(
    collection(db, "conversations"),
    {
      facilityId,
      professionalId,
      facilityName,
      professionalName,
      lastMessage: "",
      updatedAt: serverTimestamp(),
    }
  );

  return conversation.id;
}

export function subscribeToConversations(
  callback: (conversations: any[]) => void
) {
  const user = auth.currentUser;

  if (!user) return () => {};

  return onSnapshot(
    collection(db, "conversations"),
    (snapshot) => {
      const conversations = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(
          (conversation: any) =>
            conversation.facilityId === user.uid ||
            conversation.professionalId === user.uid
        );

      callback(conversations);
    }
  );
}