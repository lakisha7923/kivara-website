"use client";

import { useState } from "react";

type MessageInputProps = {
  onSend: (message: string) => void;
};

export default function MessageInput({
  onSend,
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message);

    setMessage("");
  };

  return (
    <div className="flex gap-3 mt-6">

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 border rounded-xl p-3"
      />

      <button
        onClick={handleSend}
        className="bg-teal-500 text-white px-6 rounded-xl hover:bg-teal-600"
      >
        Send
      </button>

    </div>
  );
}