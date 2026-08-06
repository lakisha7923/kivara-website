import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
} from "firebase/firestore";

import { Job } from "@/types/job";

export async function getJobs(): Promise<Job[]> {
  const snapshot = await getDocs(collection(db, "jobs"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Job, "id">),
  }));
}