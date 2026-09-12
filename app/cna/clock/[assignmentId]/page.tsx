import CnaShell from "@/components/cna/CnaShell";
import GpsTimeClock from "@/components/cna/GpsTimeClock";

export default async function CnaClockAssignmentPage({
  params,
}: {
  params: Promise<{ assignmentId: string }>;
}) {
  const { assignmentId } = await params;

  return (
    <CnaShell>
      <GpsTimeClock assignmentId={assignmentId} />
    </CnaShell>
  );
}
