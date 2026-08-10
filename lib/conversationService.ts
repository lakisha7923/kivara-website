import { db, auth } from "@/lib/firebase";

import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";

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
  let unsubscribeSnapshot: (() => void) | null = null;

  const unsubscribeAuth = onAuthStateChanged(
    auth,
    (user) => {
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
        unsubscribeSnapshot = null;
      }

      if (!user) {
        callback([]);
        return;
      }

      unsubscribeSnapshot = onSnapshot(
        collection(db, "conversations"),
        (snapshot) => {
          const conversations = snapshot.docs
            .map((conversationDoc) => ({
              id: conversationDoc.id,
              ...conversationDoc.data(),
            }))
            .filter(
              (conversation: any) =>
                conversation.facilityId === user.uid ||
                conversation.professionalId === user.uid
            );

          callback(conversations);
        },
        (error) => {
          console.error(
            "Unable to load conversations:",
            error
          );

          callback([]);
        }
      );
    }
  );

  return () => {
    unsubscribeAuth();

    if (unsubscribeSnapshot) {
      unsubscribeSnapshot();
    }
  };
}