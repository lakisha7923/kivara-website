import CnaMoreStaticSection from "@/components/cna/CnaMoreStaticSection";

export default function CnaMessagesPage() {
  return (
    <CnaMoreStaticSection
      title="Messages"
      subtitle="Facility and Kivara threads"
      body="Shift confirmations, credential questions, and support messages appear here. No unread threads right now."
      cta={{ href: "/cna/more/notifications", label: "Check notifications" }}
    />
  );
}
