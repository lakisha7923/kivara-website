import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

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

  const docRef = await addDoc(collection(db, "conversations"), {
    facilityId,
    professionalId,
    facilityName,
    professionalName,
    createdAt: new Date(),
  });

  return docRef.id;
}