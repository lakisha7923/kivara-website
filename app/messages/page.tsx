"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { subscribeToConversations } from "@/lib/conversationService";

type Conversation = {
  id: string;
  facilityId: string;
  professionalId: string;
  facilityName: string;
  professionalName: string;
  lastMessage?: string;
};

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToConversations((data) => {
      setConversations(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <DashboardLayout>
      <header className="bg-[#0D2B4D] text-white rounded-3xl shadow-lg p-8">
        <h1 className="text-4xl font-bold">
          💬 Messages
        </h1>

        <p className="text-slate-300 mt-2">
          Your conversations
        </p>
      </header>

      <section className="mt-8">
        <div className="bg-white rounded-2xl shadow p-6">

          {conversations.length === 0 ? (
            <p className="text-gray-600">
              No conversations yet.
            </p>
          ) : (
            <div className="space-y-4">

              {conversations.map((conversation) => (

                <Link
                  key={conversation.id}
                  href={`/messages/${conversation.id}`}
                  className="block border rounded-xl p-5 hover:bg-slate-50 transition"
                >
                  <h2 className="text-xl font-bold">
                    {conversation.facilityName}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    {conversation.lastMessage || "No messages yet"}
                  </p>

                </Link>

              ))}

            </div>
          )}

        </div>
      </section>
    </DashboardLayout>
  );
}