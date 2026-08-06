"use client";

type MessageBubbleProps = {
  message: string;
  isSender: boolean;
};

export default function MessageBubble({
  message,
  isSender,
}: MessageBubbleProps) {
  return (
    <div
      className={`flex ${
        isSender ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs rounded-2xl px-4 py-3 ${
          isSender
            ? "bg-teal-500 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        {message}
      </div>
    </div>
  );
}