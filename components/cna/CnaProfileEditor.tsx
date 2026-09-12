"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { ScreenCard, StatusBadge } from "@/components/ui/primitives";
import type {
  CnaEmergencyContact,
  CnaPaymentMethod,
  CnaProfile,
} from "@/types/kivara";

const STORAGE_KEY = "kivara.cna.profile.v2";

const PAYMENT_METHODS: CnaPaymentMethod[] = [
  "Direct deposit",
  "Instant pay",
  "Paper check",
];

const HOME_BASE_OPTIONS = [
  "Atlanta Metro",
  "North Atlanta",
  "South Atlanta",
  "Marietta / Cobb",
  "Decatur / DeKalb",
  "Other / Travel",
];

type EditableProfile = {
  email: string;
  phone: string;
  homeAddress: string;
  homeBase: string;
  dateOfBirth: string;
  socialSecurityNumber: string;
  paymentMethod: CnaPaymentMethod;
  emergencyContacts: CnaEmergencyContact[];
  photoUrl?: string;
};

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#0D2B4D] outline-none ring-[#0FA3A3] focus:ring-2 disabled:opacity-60";

function newContactId() {
  return `ec-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function formatSsnInput(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 9);
  if (digits.length <= 3) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
}

function isValidSsn(value: string) {
  if (/^\*\*\*-\*\*-\d{4}$/.test(value)) return true;
  return /^\d{3}-\d{2}-\d{4}$/.test(value) || /^\d{9}$/.test(value.replace(/\D/g, ""));
}

function loadSaved(defaults: EditableProfile): EditableProfile {
  if (typeof window === "undefined") return defaults;
  try {
    const raw =
      window.localStorage.getItem(STORAGE_KEY) ??
      window.localStorage.getItem("kivara.cna.profile.v1");
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Partial<EditableProfile>;
    const contacts = Array.isArray(parsed.emergencyContacts)
      ? parsed.emergencyContacts.map((c, index) => ({
          id: c.id || `ec-saved-${index}`,
          name: c.name ?? "",
          relationship: c.relationship ?? "",
          phone: c.phone ?? "",
        }))
      : defaults.emergencyContacts;
    return {
      email: parsed.email ?? defaults.email,
      phone: parsed.phone ?? defaults.phone,
      homeAddress: parsed.homeAddress ?? defaults.homeAddress,
      homeBase: parsed.homeBase ?? defaults.homeBase,
      dateOfBirth: parsed.dateOfBirth ?? defaults.dateOfBirth,
      socialSecurityNumber:
        parsed.socialSecurityNumber ?? defaults.socialSecurityNumber,
      paymentMethod:
        parsed.paymentMethod && PAYMENT_METHODS.includes(parsed.paymentMethod)
          ? parsed.paymentMethod
          : defaults.paymentMethod,
      emergencyContacts: contacts.length
        ? contacts
        : defaults.emergencyContacts,
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
    homeBase: profile.homeBase,
    dateOfBirth: profile.dateOfBirth,
    socialSecurityNumber: profile.socialSecurityNumber,
    paymentMethod: profile.paymentMethod,
    emergencyContacts: profile.emergencyContacts.map((c) => ({ ...c })),
    photoUrl: profile.photoUrl,
  };

  const [email, setEmail] = useState(defaults.email);
  const [phone, setPhone] = useState(defaults.phone);
  const [homeAddress, setHomeAddress] = useState(defaults.homeAddress);
  const [homeBase, setHomeBase] = useState(defaults.homeBase);
  const [dateOfBirth, setDateOfBirth] = useState(defaults.dateOfBirth);
  const [socialSecurityNumber, setSocialSecurityNumber] = useState(
    defaults.socialSecurityNumber
  );
  const [paymentMethod, setPaymentMethod] = useState<CnaPaymentMethod>(
    defaults.paymentMethod
  );
  const [emergencyContacts, setEmergencyContacts] = useState(
    defaults.emergencyContacts
  );
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
    setHomeBase(saved.homeBase);
    setDateOfBirth(saved.dateOfBirth);
    setSocialSecurityNumber(saved.socialSecurityNumber);
    setPaymentMethod(saved.paymentMethod);
    setEmergencyContacts(saved.emergencyContacts);
    setPhotoUrl(saved.photoUrl);
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- hydrate once from mock + localStorage
  }, []);

  function markDirty() {
    setSavedAt(null);
  }

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
        markDirty();
      }
    };
    reader.onerror = () =>
      setPhotoError("Could not read that photo. Try another file.");
    reader.readAsDataURL(file);
  }

  function clearPhoto() {
    setPhotoUrl(undefined);
    setPhotoError(null);
    markDirty();
    if (fileRef.current) fileRef.current.value = "";
  }

  function updateContact(
    id: string,
    field: keyof Omit<CnaEmergencyContact, "id">,
    value: string
  ) {
    setEmergencyContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
    markDirty();
  }

  function addEmergencyContact() {
    setEmergencyContacts((prev) => [
      ...prev,
      { id: newContactId(), name: "", relationship: "", phone: "" },
    ]);
    markDirty();
  }

  function removeEmergencyContact(id: string) {
    setEmergencyContacts((prev) =>
      prev.length <= 1 ? prev : prev.filter((c) => c.id !== id)
    );
    markDirty();
  }

  function save() {
    setSaveError(null);
    const next: EditableProfile = {
      email: email.trim(),
      phone: phone.trim(),
      homeAddress: homeAddress.trim(),
      homeBase: homeBase.trim(),
      dateOfBirth: dateOfBirth.trim(),
      socialSecurityNumber: socialSecurityNumber.trim(),
      paymentMethod,
      emergencyContacts: emergencyContacts.map((c) => ({
        ...c,
        name: c.name.trim(),
        relationship: c.relationship.trim(),
        phone: c.phone.trim(),
      })),
      photoUrl,
    };

    if (
      !next.email ||
      !next.phone ||
      !next.homeAddress ||
      !next.homeBase ||
      !next.dateOfBirth ||
      !next.socialSecurityNumber
    ) {
      setSaveError("Fill in all contact details before saving.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email)) {
      setSaveError("Enter a valid email address.");
      return;
    }
    if (!isValidSsn(next.socialSecurityNumber)) {
      setSaveError("Enter a valid Social Security number (###-##-####).");
      return;
    }
    const incompleteContact = next.emergencyContacts.find(
      (c) => !c.name || !c.relationship || !c.phone
    );
    if (incompleteContact || next.emergencyContacts.length === 0) {
      setSaveError("Each emergency contact needs a name, relationship, and phone.");
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setSavedAt(
        new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
      );
    } catch {
      setSaveError(
        "Could not save on this device. Try a smaller photo or clear browser storage."
      );
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
          Keep contact, identity, pay, and emergency information current for
          staffing and payroll.
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
                markDirty();
              }}
              disabled={!hydrated}
              className={fieldClass}
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
                markDirty();
              }}
              disabled={!hydrated}
              className={fieldClass}
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
                markDirty();
              }}
              disabled={!hydrated}
              rows={3}
              className={`${fieldClass} resize-y`}
              placeholder="Street, city, state, ZIP"
              required
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Home base
            </span>
            <select
              value={homeBase}
              onChange={(e) => {
                setHomeBase(e.target.value);
                markDirty();
              }}
              disabled={!hydrated}
              className={fieldClass}
              required
            >
              {!HOME_BASE_OPTIONS.includes(homeBase) ? (
                <option value={homeBase}>{homeBase}</option>
              ) : null}
              {HOME_BASE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="mt-1 block text-xs text-slate-500">
              Primary metro area used for eligible shifts.
            </span>
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Date of birth
            </span>
            <input
              type="date"
              autoComplete="bday"
              value={dateOfBirth}
              onChange={(e) => {
                setDateOfBirth(e.target.value);
                markDirty();
              }}
              disabled={!hydrated}
              className={fieldClass}
              required
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Social Security number
            </span>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={socialSecurityNumber}
              onChange={(e) => {
                const next = e.target.value;
                setSocialSecurityNumber(
                  next.includes("*") ? next : formatSsnInput(next)
                );
                markDirty();
              }}
              onFocus={() => {
                if (socialSecurityNumber.includes("*")) {
                  setSocialSecurityNumber("");
                  markDirty();
                }
              }}
              disabled={!hydrated}
              className={fieldClass}
              placeholder="###-##-####"
              required
            />
            <span className="mt-1 block text-xs text-slate-500">
              Demo only — stored on this device. Production will use secure
              payroll storage.
            </span>
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Payment method
            </span>
            <select
              value={paymentMethod}
              onChange={(e) => {
                setPaymentMethod(e.target.value as CnaPaymentMethod);
                markDirty();
              }}
              disabled={!hydrated}
              className={fieldClass}
              required
            >
              {PAYMENT_METHODS.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </label>

          <div className="border-t border-slate-100 pt-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-[#0D2B4D]">
                  Emergency contacts
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Who Kivara should call if you cannot be reached on shift.
                </p>
              </div>
              <button
                type="button"
                onClick={addEmergencyContact}
                disabled={!hydrated}
                className="shrink-0 rounded-full border border-[#0FA3A3] px-3 py-1.5 text-xs font-semibold text-[#0FA3A3]"
              >
                Add
              </button>
            </div>
            <div className="mt-3 space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div
                  key={contact.id}
                  className="rounded-xl border border-slate-200 bg-[#F8FBFB] p-3"
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Contact {index + 1}
                    </p>
                    {emergencyContacts.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => removeEmergencyContact(contact.id)}
                        className="text-xs font-semibold text-rose-700"
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>
                  <div className="space-y-3">
                    <label className="block">
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Full name
                      </span>
                      <input
                        type="text"
                        value={contact.name}
                        onChange={(e) =>
                          updateContact(contact.id, "name", e.target.value)
                        }
                        disabled={!hydrated}
                        className={fieldClass}
                        placeholder="Full name"
                        required
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Relationship
                      </span>
                      <input
                        type="text"
                        value={contact.relationship}
                        onChange={(e) =>
                          updateContact(
                            contact.id,
                            "relationship",
                            e.target.value
                          )
                        }
                        disabled={!hydrated}
                        className={fieldClass}
                        placeholder="Spouse, parent, friend…"
                        required
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Phone
                      </span>
                      <input
                        type="tel"
                        value={contact.phone}
                        onChange={(e) =>
                          updateContact(contact.id, "phone", e.target.value)
                        }
                        disabled={!hydrated}
                        className={fieldClass}
                        placeholder="(404) 555-0100"
                        required
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
