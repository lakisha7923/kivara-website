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
      text
    );

    setText("");
  };

  return (
    <DashboardLayout>

      <header className="bg-[#0D2B4D] text-white rounded-3xl shadow-lg p-8">

        <h1 className="text-3xl font-bold">
          Conversation
        </h1>

      </header>

      <div className="bg-white rounded-2xl shadow mt-8 p-6">

        <div className="space-y-4 h-[500px] overflow-y-auto">

          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-4 rounded-xl max-w-md ${
                message.senderId === auth.currentUser?.uid
                  ? "ml-auto bg-teal-500 text-white"
                  : "bg-slate-200"
              }`}
            >
              {message.text}
            </div>
          ))}

        </div>

        <div className="flex gap-3 mt-6">

          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-xl p-3"
          />

          <button
            onClick={handleSend}
            className="bg-[#0D2B4D] text-white px-6 rounded-xl"
          >
            Send
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}