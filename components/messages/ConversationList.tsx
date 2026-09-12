"use client";

type Conversation = {
  id: string;
  name: string;
  lastMessage: string;
  unread: boolean;
};

type ConversationListProps = {
  conversations: Conversation[];
};

export default function ConversationList({
  conversations,
}: ConversationListProps) {
  if (conversations.length === 0) {
    return (
      <div className="border rounded-xl p-6 bg-white">
        <p className="text-gray-600">
          No conversations yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {conversations.map((conversation) => (

        <div
          key={conversation.id}
          className="bg-white rounded-xl shadow p-5 hover:shadow-lg cursor-pointer transition"
        >

          <div className="flex justify-between items-center">

            <h3 className="text-xl font-bold">
              {conversation.name}
            </h3>

            {conversation.unread && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                New
              </span>
            )}

          </div>

          <p className="text-gray-600 mt-2">
            {conversation.lastMessage}
          </p>

        </div>

      ))}

    </div>
  );
}