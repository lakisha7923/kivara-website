import CnaShell from "@/components/cna/CnaShell";
import CnaTimesheetsPanel from "@/components/cna/CnaTimesheetsPanel";
import { mockTimesheets } from "@/lib/mock/v1-data";

export default function CnaTimesheetsPage() {
  return (
    <CnaShell>
      <CnaTimesheetsPanel initialSheets={mockTimesheets} />
    </CnaShell>
  );
}
