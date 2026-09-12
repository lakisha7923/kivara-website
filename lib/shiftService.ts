import { Shift } from "../types/shift";
import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";




export async function createShift(
  shift: Omit<Shift, "id">
) {
  return await addDoc(
    collection(db, "shifts"),
    {
      ...shift,
      createdAt: serverTimestamp(),
    }
  );
}

export async function getProfessionalShifts(
  professionalId: string
): Promise<Shift[]> {
  const q = query(
    collection(db, "shifts"),
    where("professionalId", "==", professionalId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Shift, "id">),
  }));
}