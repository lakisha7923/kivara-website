import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
} from "firebase/firestore";

import { ProfessionalProfile } from "@/types/profile";

export async function getProfessionalProfile(
  uid: string
): Promise<ProfessionalProfile | null> {
  const snapshot = await getDoc(doc(db, "users", uid));

  if (!snapshot.exists()) return null;

  return snapshot.data() as ProfessionalProfile;
}