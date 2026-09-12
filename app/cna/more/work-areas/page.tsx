import CnaMoreStaticSection from "@/components/cna/CnaMoreStaticSection";
import { mockCna } from "@/lib/mock/v1-data";

export default function CnaWorkAreasPage() {
  return (
    <CnaMoreStaticSection
      title="Work Areas"
      subtitle="Where you are approved to work"
      body={mockCna.workAreas.join(" · ")}
      cta={{ href: "/cna/work-ready", label: "Back to Work Ready" }}
    />
  );
}
