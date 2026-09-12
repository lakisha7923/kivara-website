"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { ScreenCard, StatusBadge } from "@/components/ui/primitives";
import type { CnaProfile } from "@/types/kivara";

const STORAGE_KEY = "kivara.cna.profile.v1";

type EditableProfile = {
  email: string;
  phone: string;
  homeAddress: string;
  photoUrl?: string;
};

function loadSaved(defaults: EditableProfile): EditableProfile {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Partial<EditableProfile>;
    return {
      email: parsed.email ?? defaults.email,
      phone: parsed.phone ?? defaults.phone,
      homeAddress: parsed.homeAddress ?? defaults.homeAddress,
      photoUrl: parsed.photoUrl ?? defaults.photoUrl,
    };
  } catch {
    return defaults;
  }
}

export default function CnaProfileEditor({ profile }: { profile: CnaProfile }) {
  const fileInputId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const defaults: EditableProfile = {
    email: profile.email,
    phone: profile.phone,
    homeAddress: profile.homeAddress,
    photoUrl: profile.photoUrl,
  };

  const [email, setEmail] = useState(defaults.email);
  const [phone, setPhone] = useState(defaults.phone);
  const [homeAddress, setHomeAddress] = useState(defaults.homeAddress);
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(defaults.photoUrl);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    const saved = loadSaved(defaults);
    setEmail(saved.email);
    setPhone(saved.phone);
    setHomeAddress(saved.homeAddress);
    setPhotoUrl(saved.photoUrl);
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- hydrate once from mock + localStorage
  }, []);

  function onPickPhoto(file: File | undefined) {
    setPhotoError(null);
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setPhotoError("Please choose an image file (JPG, PNG, or HEIC).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setPhotoError("Photo must be under 5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPhotoUrl(reader.result);
        setSavedAt(null);
      }
    };
    reader.onerror = () => setPhotoError("Could not read that photo. Try another file.");
    reader.readAsDataURL(file);
  }

  function clearPhoto() {
    setPhotoUrl(undefined);
    setPhotoError(null);
    setSavedAt(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  function save() {
    setSaveError(null);
    const next: EditableProfile = {
      email: email.trim(),
      phone: phone.trim(),
      homeAddress: homeAddress.trim(),
      photoUrl,
    };
    if (!next.email || !next.phone || !next.homeAddress) {
      setSaveError("Email, phone, and home address are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email)) {
      setSaveError("Enter a valid email address.");
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setSavedAt(new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
    } catch {
      setSaveError("Could not save on this device. Try a smaller photo or clear browser storage.");
    }
  }

  const initials = profile.fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-4">
      <ScreenCard>
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="relative">
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-[#E8F6F6] bg-[#0D2B4D] text-2xl font-bold text-white">
              {photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- local FileReader data URLs
                <img
                  src={photoUrl}
                  alt={`${profile.fullName} profile photo`}
                  width={112}
                  height={112}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span aria-hidden>{initials}</span>
              )}
            </div>
          </div>
          <div>
            <p className="text-lg font-bold text-[#0D2B4D]">{profile.fullName}</p>
            <div className="mt-2 flex justify-center">
              <StatusBadge
                label={profile.status}
                tone={profile.workReady ? "success" : "warning"}
              />
            </div>
          </div>
          <div className="flex w-full flex-wrap justify-center gap-2">
            <label
              htmlFor={fileInputId}
              className="inline-flex cursor-pointer rounded-full bg-[#0FA3A3] px-4 py-2 text-sm font-semibold text-white"
            >
              {photoUrl ? "Change photo" : "Upload photo"}
            </label>
            <input
              id={fileInputId}
              ref={fileRef}
              type="file"
              accept="image/*"
              capture="user"
              className="sr-only"
              onChange={(e) => onPickPhoto(e.target.files?.[0])}
            />
            {photoUrl ? (
              <button
                type="button"
                onClick={clearPhoto}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Remove photo
              </button>
            ) : null}
          </div>
          {photoError ? (
            <p className="text-sm text-rose-700" role="alert">
              {photoError}
            </p>
          ) : (
            <p className="text-xs text-slate-500">
              JPG or PNG, up to 5 MB. Saved on this device for the demo.
            </p>
          )}
        </div>
      </ScreenCard>

      <ScreenCard>
        <h2 className="text-sm font-bold text-[#0D2B4D]">Contact details</h2>
        <p className="mt-1 text-xs text-slate-500">
          Keep email, phone, and home address current for shift and payroll contact.
        </p>
        <form
          className="mt-4 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            save();
          }}
        >
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Email
            </span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setSavedAt(null);
              }}
              disabled={!hydrated}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#0D2B4D] outline-none ring-[#0FA3A3] focus:ring-2"
              placeholder="you@email.com"
              required
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Phone number
            </span>
            <input
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setSavedAt(null);
              }}
              disabled={!hydrated}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#0D2B4D] outline-none ring-[#0FA3A3] focus:ring-2"
              placeholder="(404) 555-0100"
              required
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Home address
            </span>
            <textarea
              autoComplete="street-address"
              value={homeAddress}
              onChange={(e) => {
                setHomeAddress(e.target.value);
                setSavedAt(null);
              }}
              disabled={!hydrated}
              rows={3}
              className="mt-1.5 w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#0D2B4D] outline-none ring-[#0FA3A3] focus:ring-2"
              placeholder="Street, city, state, ZIP"
              required
            />
          </label>

          {saveError ? (
            <p className="text-sm text-rose-700" role="alert">
              {saveError}
            </p>
          ) : null}
          {savedAt ? (
            <p className="text-sm text-emerald-700" role="status">
              Profile saved at {savedAt}.
            </p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-full bg-[#0D2B4D] px-4 py-3 text-sm font-semibold text-white"
          >
            Save profile
          </button>
        </form>
      </ScreenCard>

      <ScreenCard>
        <p className="text-sm text-slate-700">
          Credential and Work Ready status stay under Credentials and Work Ready.
        </p>
        <Link
          href="/cna/work-ready"
          className="mt-3 inline-flex rounded-full bg-[#0D2B4D] px-4 py-2 text-sm font-semibold text-white"
        >
          View Work Ready details
        </Link>
      </ScreenCard>
    </div>
  );
}
