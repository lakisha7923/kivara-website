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
      {/* Header */}
      <header className="bg-[#0D2B4D] text-white rounded-3xl shadow-lg p-8">
        <p className="text-[#D6F1F1] text-sm font-semibold uppercase tracking-wide">
          Communication
        </p>

        <h1 className="text-4xl font-bold mt-2">
          💬 Messages
        </h1>

        <p className="text-slate-300 mt-2 text-lg">
          Communicate securely with healthcare facilities and professionals.
        </p>
      </header>

      {/* Conversations */}
      <section className="mt-8">
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#0FA3A3]">
                Conversations
              </p>

              <h2 className="text-2xl font-bold text-[#0D2B4D] mt-1">
                Your Messages
              </h2>

              <p className="text-gray-600 mt-1">
                View and continue your conversations.
              </p>
            </div>

            {conversations.length > 0 && (
              <div className="rounded-full bg-[#D6F1F1] px-4 py-2 text-sm font-semibold text-[#0D2B4D]">
                {conversations.length}{" "}
                {conversations.length === 1
                  ? "conversation"
                  : "conversations"}
              </div>
            )}
          </div>

          {conversations.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-[#F2F4F7] p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#D6F1F1] text-2xl">
                💬
              </div>

              <h3 className="text-xl font-bold text-[#0D2B4D] mt-4">
                No conversations yet
              </h3>

              <p className="text-gray-600 mt-2 max-w-md mx-auto">
                Conversations with healthcare facilities and professionals
                will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {conversations.map((conversation) => (
                <Link
                  key={conversation.id}
                  href={`/messages/${conversation.id}`}
                  className="group block rounded-2xl border border-slate-200 p-5 hover:border-[#0FA3A3] hover:bg-[#D6F1F1] transition"
                >
                  <div className="flex items-center gap-4">
                    {/* Conversation icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0D2B4D] text-xl text-white">
                      💬
                    </div>

                    {/* Conversation information */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-lg font-bold text-[#0D2B4D] truncate">
                          {conversation.facilityName ||
                            conversation.professionalName ||
                            "Conversation"}
                        </h3>

                        <span className="text-[#0FA3A3] font-bold text-lg group-hover:translate-x-1 transition">
                          →
                        </span>
                      </div>

                      <p className="text-sm text-gray-500 mt-1">
                        Healthcare staffing conversation
                      </p>

                      <p className="text-gray-600 mt-2 truncate">
                        {conversation.lastMessage ||
                          "No messages yet. Start the conversation."}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
}