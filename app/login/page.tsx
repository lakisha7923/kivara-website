"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData.accountType === "Healthcare Professional") {
          router.push("/cna");
        } else if (userData.accountType === "Healthcare Facility") {
          router.push("/facility");
        } else if (
          userData.accountType === "Master Admin" ||
          userData.accountType === "Kivara Admin"
        ) {
          router.push("/login/mfa");
        } else {
          alert("Unknown account type.");
        }
      } else {
        alert("User profile not found.");
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Unable to sign in.";
      alert(message);
    }
  };

  return (
    <main className="relative min-h-screen bg-[var(--kivara-offwhite)] px-4 py-8 sm:px-6">
      <div className="mx-auto mb-6 flex max-w-5xl items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[var(--kivara-navy)] shadow-sm hover:bg-[var(--kivara-aqua)]"
        >
          ← Back to website
        </Link>
        <Link
          href="/register"
          className="text-sm font-semibold text-[var(--kivara-teal)] hover:underline"
        >
          Create account
        </Link>
      </div>

      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">
        <div className="flex flex-col items-center justify-center bg-[var(--kivara-navy)] px-8 py-12 text-white sm:px-12">
          <Image
            src="/logo/kivara-logo.png"
            alt="Kivara Healthcare"
            width={120}
            height={120}
            className="mb-8 rounded-full bg-white p-1"
            priority
          />
          <h1 className="font-display text-center text-4xl font-bold">
            Welcome back
          </h1>
          <p className="mt-4 text-center text-lg text-slate-200">
            Sign in to your Kivara CNA, Facility, or Admin workspace.
          </p>
        </div>

        <div className="px-8 py-12 sm:px-12">
          <h2 className="font-display text-3xl font-bold text-[var(--kivara-navy)]">
            Login
          </h2>

          <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--kivara-teal)]"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--kivara-teal)]"
            />
            <button
              type="button"
              onClick={handleLogin}
              className="w-full rounded-xl bg-[var(--kivara-teal)] py-4 font-semibold text-white transition hover:brightness-110"
            >
              Login
            </button>
          </form>

          <div className="mt-6 space-y-4 text-center">
            <a href="#" className="text-sm text-[var(--kivara-teal)] hover:underline">
              Forgot password?
            </a>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Demo portals
              </p>
              <div className="mt-3 grid gap-2">
                <Link
                  href="/cna"
                  className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-[#0D2B4D] shadow-sm"
                >
                  CNA App →
                </Link>
                <Link
                  href="/facility"
                  className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-[#0D2B4D] shadow-sm"
                >
                  Facility Portal →
                </Link>
                <Link
                  href="/login/mfa"
                  className="rounded-xl bg-[#0D2B4D] px-3 py-2 text-sm font-semibold text-white shadow-sm"
                >
                  Master Admin (Login + MFA) →
                </Link>
              </div>
            </div>
            <p className="text-gray-600">
              Don&apos;t have an account?
              <Link
                href="/register"
                className="ml-2 font-semibold text-[var(--kivara-teal)] hover:underline"
              >
                Register
              </Link>
            </p>
            <Link
              href="/"
              className="inline-flex text-sm font-semibold text-[var(--kivara-navy)] hover:underline"
            >
              ← Return to Kivara website
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
