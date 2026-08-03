"use client";
import Image from "next/image";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function LoginPage() {

  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const handleLogin = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userDoc = await getDoc(
      doc(db, "users", userCredential.user.uid)
    );

    if (userDoc.exists()) {
      const userData = userDoc.data();

      alert(`Welcome back, ${userData.fullName}!`);

      console.log(userData);
    } else {
      alert("User profile not found.");
    }

  } catch (error: any) {
    alert(error.message);
  }
};
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden max-w-5xl w-full grid md:grid-cols-2">

        {/* Left Side */}

        <div className="bg-[#0D2B4D] text-white p-12 flex flex-col justify-center items-center">

          <Image
            src="/logo/kivara-logo.png"
            alt="Kivara Healthcare"
            width={120}
            height={120}
            className="mb-8"
          />

          <h1 className="text-4xl font-bold mb-4 text-center">
            Welcome Back
          </h1>

          <p className="text-lg text-slate-200 text-center">
            Connecting Healthcare Professionals with Healthcare Facilities.
          </p>

        </div>

        {/* Right Side */}

        <div className="p-12">

          <h2 className="text-3xl font-bold text-[#0D2B4D] mb-8">
            Login
          </h2>

          <form className="space-y-6">

            <input
  type="email"
  placeholder="Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
/>

            <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
/>

            <button
  type="button"
  onClick={handleLogin}
  className="w-full bg-teal-500 text-white py-4 rounded-xl hover:bg-teal-600 transition"
>
  Login
</button>

          </form>

          <div className="mt-6 text-center">

            <a
              href="#"
              className="text-sm text-teal-600 hover:underline"
            >
              Forgot Password?
            </a>

            <p className="mt-6 text-gray-600">
              Don't have an account?
              <a
                href="/register"
                className="text-teal-600 font-semibold ml-2 hover:underline"
              >
                Register
              </a>
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}