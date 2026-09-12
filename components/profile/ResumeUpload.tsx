"use client";

import { useEffect, useState } from "react";
import { auth, db, storage } from "@/lib/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

export default function ResumeUpload() {
  const [uploading, setUploading] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const loadResume = async () => {
      const user = auth.currentUser;

      if (!user) return;

      try {
        const userDoc = await getDoc(
          doc(db, "users", user.uid)
        );

        if (userDoc.exists()) {
          const data = userDoc.data();

          setResumeUrl(data.resumeUrl || "");
        }
      } catch (error) {
        console.error(
          "Unable to load resume:",
          error
        );
      }
    };

    loadResume();
  }, []);

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in.");
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    try {
      setUploading(true);

      const storageRef = ref(
        storage,
        `resumes/${user.uid}.pdf`
      );

      await uploadBytes(storageRef, file);

      const url = await getDownloadURL(storageRef);

      await updateDoc(
        doc(db, "users", user.uid),
        {
          resumeUrl: url,
        }
      );

      setResumeUrl(url);

      alert("Resume uploaded successfully!");
    } catch (error) {
      console.error(
        "Unable to upload resume:",
        error
      );

      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-[#F2F4F7] p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#D6F1F1] text-2xl">
          📄
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#0D2B4D]">
            Resume
          </h2>

          <p className="text-gray-600 mt-1">
            Upload your current healthcare resume as a PDF.
          </p>
        </div>
      </div>

      <div className="mt-5">
        <label className="block">
          <span className="sr-only">
            Upload resume
          </span>

          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleUpload}
            disabled={uploading}
            className="block w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-[#0D2B4D] file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-[#123B66]"
          />
        </label>
      </div>

      {uploading && (
        <div className="mt-4 rounded-xl bg-[#D6F1F1] p-4 text-sm font-semibold text-[#0D2B4D]">
          Uploading your resume...
        </div>
      )}

      {resumeUrl && !uploading && (
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl bg-white border border-slate-200 p-4">
          <div>
            <p className="font-semibold text-[#0D2B4D]">
              Resume uploaded
            </p>

            <p className="text-sm text-gray-500">
              Your resume is available to view.
            </p>
          </div>

          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-[#0FA3A3] px-5 py-2.5 font-semibold text-white hover:bg-[#0D9292] transition"
          >
            👀 View Resume
          </a>
        </div>
      )}
    </div>
  );
}