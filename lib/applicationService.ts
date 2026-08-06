import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
} from "firebase/firestore";

import { Application } from "@/types/application";

export async function getApplications(): Promise<Application[]> {
  const snapshot = await getDocs(collection(db, "applications"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Application, "id">),
  }));
}