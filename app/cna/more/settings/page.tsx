import CnaMoreStaticSection from "@/components/cna/CnaMoreStaticSection";

export default function CnaSettingsPage() {
  return (
    <CnaMoreStaticSection
      title="Settings"
      subtitle="App preferences"
      body="Notification preferences, language, and sign-out controls will live here."
      cta={{ href: "/login", label: "Switch account / Login" }}
    />
  );
}
