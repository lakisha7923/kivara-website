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

      const facilityQuery = query(
        collection(db, "conversations"),
        where("facilityId", "==", user.uid)
      );

      const professionalQuery = query(
        collection(db, "conversations"),
        where("professionalId", "==", user.uid)
      );

      let facilityConversations: any[] = [];
      let professionalConversations: any[] = [];

      const updateConversations = () => {
        const combined = [
          ...facilityConversations,
          ...professionalConversations,
        ];

        const unique = Array.from(
          new Map(
            combined.map((conversation) => [
              conversation.id,
              conversation,
            ])
          ).values()
        );

        callback(unique);
      };

      const unsubscribeFacility = onSnapshot(
        facilityQuery,
        (snapshot) => {
          facilityConversations = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          updateConversations();
        },
        (error) => {
          console.error(
            "Unable to load facility conversations:",
            error
          );
        }
      );

      const unsubscribeProfessional = onSnapshot(
        professionalQuery,
        (snapshot) => {
          professionalConversations = snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

          updateConversations();
        },
        (error) => {
          console.error(
            "Unable to load professional conversations:",
            error
          );
        }
      );

      unsubscribeSnapshot = () => {
        unsubscribeFacility();
        unsubscribeProfessional();
      };
    }
  );

  return () => {
    unsubscribeAuth();

    if (unsubscribeSnapshot) {
      unsubscribeSnapshot();
    }
  };
}