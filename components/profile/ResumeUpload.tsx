"use client";

import { useState } from "react";
import { auth, db, storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

export default function ResumeUpload() {
  const [uploading, setUploading] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const user = auth.currentUser;

    if (!user) return;

    try {
      setUploading(true);

      const storageRef = ref(
        storage,
        `resumes/${user.uid}.pdf`
      );

      await uploadBytes(storageRef, file);

      const url = await getDownloadURL(storageRef);

      await updateDoc(doc(db, "users", user.uid), {
        resumeUrl: url,
      });

      setResumeUrl(url);

      alert("Resume uploaded successfully!");

    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    }

    setUploading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold mb-4">
        📄 Resume
      </h2>

      <input
        type="file"
        accept=".pdf"
        onChange={handleUpload}
      />

      {uploading && (
        <p className="mt-4 text-blue-600">
          Uploading...
        </p>
      )}

      {resumeUrl && (
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-4 text-teal-600 font-bold underline"
        >
          👀 View Resume
        </a>
      )}

    </div>
  );
}