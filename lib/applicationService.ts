import { auth, db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { Application } from "@/types/application";

export async function getApplications(): Promise<Application[]> {
  const user = auth.currentUser;

  if (!user) {
    return [];
  }

  const applicationsQuery = query(
    collection(db, "applications"),
    where("facilityId", "==", user.uid)
  );

  const snapshot = await getDocs(applicationsQuery);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Application, "id">),
  }));
}