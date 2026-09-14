"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import {
  portalForAccountType,
  registerDemoAccount,
  withAuthTimeout,
  type DemoAccountType,
} from "@/lib/auth/demoAuth";
import { auth, db } from "@/lib/firebase";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [accountType, setAccountType] = useState<DemoAccountType | "">("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleRegister = async (event?: FormEvent) => {
    event?.preventDefault();
    setError(null);
    setSuccess(null);

    if (!fullName.trim()) {
      setError("Enter your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password and confirm password must match.");
      return;
    }
    if (!accountType) {
      setError(
        "Select whether you are a healthcare professional or a facility."
      );
      return;
    }

    setBusy(true);
    try {
      const session = registerDemoAccount({
        email,
        password,
        fullName,
        accountType,
      });

      try {
        const userCredential = await withAuthTimeout(
          createUserWithEmailAndPassword(auth, email.trim(), password),
          3500
        );
        await withAuthTimeout(
          setDoc(doc(db, "users", userCredential.user.uid), {
            fullName: session.fullName,
            email: session.email,
            accountType: session.accountType,
            createdAt: new Date(),
          }),
          3500
        );
      } catch {
        // Local demo account is already saved and is enough for this preview.
      }

      setSuccess(
        `Account created for ${session.fullName}. Opening your ${
          session.accountType === "Healthcare Facility" ? "Facility" : "CNA"
        } app…`
      );
      window.setTimeout(() => {
        router.push(portalForAccountType(session.accountType));
      }, 500);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Unable to create account."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--kivara-offwhite)] px-4 py-8 sm:px-6">
      <div className="mx-auto mb-6 flex max-w-6xl items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[var(--kivara-navy)] shadow-sm hover:bg-[var(--kivara-aqua)]"
        >
          ← Back to website
        </Link>
        <Link
          href="/login"
          className="text-sm font-semibold text-[var(--kivara-teal)] hover:underline"
        >
          Already have an account?
        </Link>
      </div>

      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">
        <div className="flex flex-col items-center justify-center bg-[#0D2B4D] p-12 text-white">
          <Image
            src="/logo/kivara-logo.png"
            alt="Kivara Healthcare"
            width={120}
            height={120}
            className="mb-8 rounded-full bg-white p-1"
            priority
          />
          <h1 className="mb-4 font-display text-4xl font-bold">Join Kivara</h1>
          <p className="text-center text-slate-200">
            Create an account and connect with healthcare opportunities.
          </p>
        </div>

        <div className="p-8 sm:p-12">
          <h2 className="mb-8 font-display text-3xl font-bold text-[#0D2B4D]">
            Create Account
          </h2>

          <form className="space-y-5" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border px-5 py-4"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border px-5 py-4"
              autoComplete="email"
              required
            />
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border px-5 py-4"
              autoComplete="new-password"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border px-5 py-4"
              autoComplete="new-password"
              required
            />
            <select
              value={accountType}
              onChange={(e) =>
                setAccountType(e.target.value as DemoAccountType | "")
              }
              className="w-full rounded-xl border px-5 py-4"
              required
            >
              <option value="">Select Account Type</option>
              <option value="Healthcare Professional">
                Healthcare Professional
              </option>
              <option value="Healthcare Facility">
                Healthcare Facility
              </option>
            </select>

            {error ? (
              <p
                className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-800"
                role="alert"
              >
                {error}
              </p>
            ) : null}
            {success ? (
              <p
                className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-800"
                role="status"
              >
                {success}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-xl bg-[var(--kivara-teal)] py-4 font-semibold text-white hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?
            <Link href="/login" className="ml-2 font-semibold text-teal-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
