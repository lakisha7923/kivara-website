import CnaMoreStaticSection from "@/components/cna/CnaMoreStaticSection";

export default function CnaHelpPage() {
  return (
    <CnaMoreStaticSection
      title="Help"
      subtitle="Support for CNAs"
      body="Need help with credentials, GPS clock issues, or pay status? Contact Kivara Support at (800) 555-0147 or email support@kivara.health."
      cta={{ href: "tel:18005550147", label: "Call Kivara Support" }}
    />
  );
}
