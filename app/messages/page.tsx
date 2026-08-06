"use client";

import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function MessagesPage() {
  return (
    <DashboardLayout>

      <header className="bg-[#0D2B4D] text-white rounded-3xl shadow-lg p-8">

        <h1 className="text-4xl font-bold">
          💬 Messages
        </h1>

        <p className="text-slate-300 mt-2">
          View your conversations with healthcare professionals and facilities.
        </p>

      </header>

      <section className="mt-8">

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-2xl font-bold mb-6">
            Conversations
          </h2>

          <p className="text-gray-600">
            Your conversations will appear here.
          </p>

        </div>

      </section>

    </DashboardLayout>
  );
}