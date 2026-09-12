"use client";

import CnaShell from "@/components/cna/CnaShell";
import GpsTimeClock from "@/components/cna/GpsTimeClock";
import {
  HandoffNotifications,
  HandoffRail,
} from "@/components/handoffs/HandoffChrome";
import { useHandoffs } from "@/components/handoffs/HandoffProvider";
import { useParams } from "next/navigation";

export default function CnaClockAssignmentPage() {
  const params = useParams<{ assignmentId: string }>();
  const { record, completeClockCycle } = useHandoffs();
  const assignmentId = params.assignmentId;
  const isHandoff = assignmentId === record.assignmentId;

  return (
    <CnaShell>
      <HandoffRail portal="cna" />
      <HandoffNotifications portal="cna" />
      <GpsTimeClock
        assignmentId={assignmentId}
        onTimesheetSubmitted={
          isHandoff && record.confirmed && !record.clocked
            ? completeClockCycle
            : undefined
        }
      />
    </CnaShell>
  );
}
