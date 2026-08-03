"use client";

import Image from "next/image";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
export default function RegisterPage() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [fullName, setFullName] = useState("");
const [accountType, setAccountType] = useState("");
 const handleRegister = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
  auth,
  email,
  password
);

await setDoc(doc(db, "users", userCredential.user.uid), {
  fullName,
  email,
  accountType,
  createdAt: new Date(),
});

alert("Account created successfully!");
console.log(userCredential.user);
  } catch (error: any) {
    alert(error.message);
  }
}; 
return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full grid md:grid-cols-2">

        {/* Left */}

        <div className="bg-[#0D2B4D] text-white p-12 flex flex-col justify-center items-center">

          <Image
            src="/logo/kivara-logo.png"
            alt="Kivara Healthcare"
            width={120}
            height={120}
            className="mb-8"
          />

          <h1 className="text-4xl font-bold mb-4">
            Join Kivara
          </h1>

          <p className="text-center text-slate-200">
            Create an account and connect with healthcare opportunities.
          </p>

        </div>

        {/* Right */}

        <div className="p-12">

          <h2 className="text-3xl font-bold text-[#0D2B4D] mb-8">
            Create Account
          </h2>

          <form className="space-y-5">

            <input
  type="text"
  placeholder="Full Name"
  value={fullName}
  onChange={(e) => setFullName(e.target.value)}
  className="w-full border rounded-xl px-5 py-4"
/>

            <input
  type="email"
  placeholder="Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full border rounded-xl px-5 py-4"
/>

            <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full border rounded-xl px-5 py-4"
/>

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border rounded-xl px-5 py-4"
            />

            <select
  value={accountType}
  onChange={(e) => setAccountType(e.target.value)}
  className="w-full border rounded-xl px-5 py-4"
>
  <option value="">Select Account Type</option>
  <option value="Healthcare Professional">
    Healthcare Professional
  </option>
  <option value="Healthcare Facility">
    Healthcare Facility
  </option>
</select>

            <button
  type="button"
  onClick={handleRegister}
  className="w-full bg-teal-500 text-white py-4 rounded-xl hover:bg-teal-600"
>
  Create Account
</button>

          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?
            <a
              href="/login"
              className="text-teal-600 font-semibold ml-2"
            >
              Login
            </a>
          </p>

        </div>

      </div>

    </main>
  );
}