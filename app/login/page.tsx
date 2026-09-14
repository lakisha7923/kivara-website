"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import {
  DEMO_ACCOUNTS,
  loginDemoAccount,
  portalForAccountType,
  withAuthTimeout,
} from "@/lib/auth/demoAuth";
import { auth, db } from "@/lib/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetNote, setResetNote] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const finishLogin = (accountType: string) => {
    router.push(portalForAccountType(accountType));
  };

  const handleLogin = async (event?: FormEvent) => {
    event?.preventDefault();
    setError(null);
    setResetNote(null);
    setBusy(true);

    try {
      try {
        const demo = loginDemoAccount(email, password);
        finishLogin(demo.accountType);
        return;
      } catch {
        // Not a demo/local account — try Firebase next.
      }

      const userCredential = await withAuthTimeout(
        signInWithEmailAndPassword(auth, email.trim(), password)
      );
      const userDoc = await withAuthTimeout(
        getDoc(doc(db, "users", userCredential.user.uid))
      );

      if (!userDoc.exists()) {
        throw new Error(
          "Signed in, but no Kivara profile was found for this user."
        );
      }

      const accountType = String(userDoc.data().accountType ?? "");
      if (!accountType) {
        throw new Error("This account is missing an account type.");
      }
      finishLogin(accountType);
    } catch (err: unknown) {
      try {
        const demo = loginDemoAccount(email, password);
        finishLogin(demo.accountType);
        return;
      } catch {
        const message =
          err instanceof Error ? err.message : "Unable to sign in.";
        setError(
          message.includes("Firebase") || message.includes("auth/")
            ? "Sign-in could not reach Firebase. Use a demo account below, or create a local account on Register."
            : message
        );
      }
    } finally {
      setBusy(false);
    }
  };

  const fillDemo = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError(null);
    setResetNote(null);
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

          <form className="mt-8 space-y-5" onSubmit={handleLogin}>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-slate-600">
                Email
              </span>
              <input
                type="email"
                autoComplete="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--kivara-teal)]"
                required
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-slate-600">
                Password
              </span>
              <input
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--kivara-teal)]"
                required
              />
            </label>

            {error ? (
              <p
                className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-800"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-xl bg-[var(--kivara-teal)] py-4 font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy ? "Signing in…" : "Login"}
            </button>
          </form>

          <div className="mt-6 space-y-4 text-center">
            <button
              type="button"
              onClick={() =>
                setResetNote(
                  email.trim()
                    ? `Password reset for ${email.trim()} will send when recovery email is connected. For now use a demo password or create a new local account.`
                    : "Enter your email above, then tap Forgot password again."
                )
              }
              className="text-sm text-[var(--kivara-teal)] hover:underline"
            >
              Forgot password?
            </button>
            {resetNote ? (
              <p className="text-sm text-slate-600" role="status">
                {resetNote}
              </p>
            ) : null}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Demo sign-in (always works)
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Tap a row to fill the form, then press Login. Password for all:{" "}
                <span className="font-semibold">demo1234</span>
              </p>
              <div className="mt-3 grid gap-2">
                {DEMO_ACCOUNTS.map((account) => (
                  <button
                    key={account.uid}
                    type="button"
                    onClick={() => fillDemo(account.email, account.password)}
                    className="rounded-xl bg-white px-3 py-2 text-left text-sm font-semibold text-[#0D2B4D] shadow-sm hover:bg-[var(--kivara-aqua)]"
                  >
                    <span className="block">{account.fullName}</span>
                    <span className="block text-xs font-medium text-slate-500">
                      {account.email} · {account.note}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-3 grid gap-2 border-t border-slate-200 pt-3">
                <Link
                  href="/cna/more/profile"
                  className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-[#0D2B4D] shadow-sm"
                >
                  Skip to CNA App →
                </Link>
                <Link
                  href="/facility"
                  className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-[#0D2B4D] shadow-sm"
                >
                  Skip to Facility App →
                </Link>
                <Link
                  href="/login/mfa"
                  className="rounded-xl bg-[#0D2B4D] px-3 py-2 text-sm font-semibold text-white shadow-sm"
                >
                  Skip to Admin MFA →
                </Link>
              </div>
            </div>

            <p className="text-gray-600">
              Don&apos;t have an account?
              <Link
                href="/register"
                className="ml-2 font-semibold text-[var(--kivara-teal)] hover:underline"
              >
                Create account
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
