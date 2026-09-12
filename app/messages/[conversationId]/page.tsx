"use client";

import { use, useEffect, useState } from "react";

import { auth } from "@/lib/firebase";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  sendMessage,
  subscribeToMessages,
} from "@/lib/messageService";

type Message = {
  id: string;
  senderId: string;
  text: string;
};

type ChatPageProps = {
  params: Promise<{
    conversationId: string;
  }>;
};

export default function ChatPage({
  params,
}: ChatPageProps) {
  const { conversationId } = use(params);

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToMessages(
      conversationId,
      (messages) => {
        setMessages(messages);
      }
    );

    return () => unsubscribe();
  }, [conversationId]);

  const handleSend = async () => {
    if (!text.trim()) return;

    const user = auth.currentUser;

    if (!user) return;

    await sendMessage(
      conversationId,
      user.uid,
      text.trim()
    );

    setText("");
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <header className="bg-[#0D2B4D] text-white rounded-3xl shadow-lg p-8">
        <p className="text-[#D6F1F1] text-sm font-semibold uppercase tracking-wide">
          Communication
        </p>

        <h1 className="text-4xl font-bold mt-2">
          💬 Conversation
        </h1>

        <p className="text-slate-300 mt-2">
          Communicate securely with your healthcare connection.
        </p>
      </header>

      {/* Chat */}
      <section className="mt-8">
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">

          {/* Chat header */}
          <div className="px-6 py-5 border-b border-slate-200 bg-[#F2F4F7]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0D2B4D] text-xl">
                💬
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#0D2B4D]">
                  Messages
                </h2>

                <p className="text-sm text-gray-500">
                  Secure healthcare staffing conversation
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[500px] overflow-y-auto bg-white p-6">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#D6F1F1] text-2xl">
                    💬
                  </div>

                  <h3 className="text-lg font-bold text-[#0D2B4D] mt-4">
                    No messages yet
                  </h3>

                  <p className="text-gray-500 mt-1">
                    Start the conversation below.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => {
                  const isMine =
                    message.senderId ===
                    auth.currentUser?.uid;

                  return (
                    <div
                      key={message.id}
                      className={`flex ${
                        isMine
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-sm ${
                          isMine
                            ? "bg-[#0FA3A3] text-white rounded-br-md"
                            : "bg-[#F2F4F7] text-[#0D2B4D] rounded-bl-md border border-slate-200"
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words">
                          {message.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Message composer */}
          <div className="border-t border-slate-200 bg-[#F2F4F7] p-4">
            <div className="flex gap-3">
              <input
                value={text}
                onChange={(e) =>
                  setText(e.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#0FA3A3] focus:ring-2 focus:ring-[#D6F1F1]"
              />

              <button
                onClick={handleSend}
                disabled={!text.trim()}
                className="rounded-xl bg-[#0D2B4D] px-6 py-3 font-semibold text-white transition hover:bg-[#123B66] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-2 ml-1">
              Press Enter to send
            </p>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}