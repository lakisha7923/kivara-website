"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminMfaPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  function verify() {
    if (code.trim().length < 6) {
      setError("Enter the 6-digit MFA code from your authenticator app.");
      return;
    }
    router.push("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F2F4F7] px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
          Login + MFA
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#0D2B4D]">
          Verify Master Admin
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Enter your MFA code to continue to the Master Dashboard.
        </p>

        <label className="mt-6 block text-sm font-medium text-slate-700">
          Authentication code
          <input
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError("");
            }}
            inputMode="numeric"
            maxLength={6}
            placeholder="6-digit code"
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 tracking-[0.3em]"
          />
        </label>
        {error ? <p className="mt-2 text-sm text-rose-700">{error}</p> : null}

        <button
          type="button"
          onClick={verify}
          className="mt-5 w-full rounded-xl bg-[#0FA3A3] py-3.5 text-sm font-semibold text-white"
        >
          Verify & continue
        </button>

        <p className="mt-4 text-center text-xs text-slate-500">
          Demo: any 6 digits opens Master Dashboard.
        </p>

        <div className="mt-6 flex justify-between text-sm">
          <Link href="/login" className="font-semibold text-slate-600">
            ← Back to login
          </Link>
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="font-semibold text-teal-700"
          >
            Skip MFA (demo)
          </button>
        </div>
      </div>
    </main>
  );
}
