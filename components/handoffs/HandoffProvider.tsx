"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  createSeedHandoff,
  HANDOFF_STORAGE_KEY,
  isStepDone,
  nextOpenStep,
  stamp,
  type HandoffNotification,
  type HandoffRecord,
  type HandoffStepId,
  type PortalActor,
} from "@/lib/handoffs/journey";
import {
  CONFIRM_ADMIN_ACTION,
  CONFIRMED_CNA_COPY,
  CONFIRMED_FACILITY_COPY,
} from "@/types/kivara";

interface HandoffContextValue {
  record: HandoffRecord;
  hydrated: boolean;
  nextStep: ReturnType<typeof nextOpenStep>;
  resetJourney: () => void;
  submitStaffingRequest: (input?: {
    unit?: string;
    date?: string;
    startTime?: string;
    endTime?: string;
    quantity?: number;
    instructions?: string;
  }) => void;
  publishPositions: () => void;
  requestShift: () => void;
  confirmAssignment: () => void;
  completeClockCycle: () => void;
  facilityReviewTimesheet: (accepted: boolean) => void;
  adminLockHours: () => void;
  unreadFor: (portal: PortalActor) => HandoffNotification[];
  markPortalRead: (portal: PortalActor) => void;
  copy: {
    cnaConfirmed: typeof CONFIRMED_CNA_COPY;
    facilityConfirmed: typeof CONFIRMED_FACILITY_COPY;
    adminConfirmAction: typeof CONFIRM_ADMIN_ACTION;
  };
}

const HandoffContext = createContext<HandoffContextValue | null>(null);

function pushNote(
  record: HandoffRecord,
  portal: PortalActor,
  title: string,
  detail: string
): HandoffNotification[] {
  return [
    {
      id: `n-${Date.now()}-${portal}`,
      portal,
      title,
      detail,
      at: stamp(),
      read: false,
    },
    ...record.notifications,
  ];
}

function complete(
  record: HandoffRecord,
  step: HandoffStepId,
  actor: string,
  action: string
): HandoffRecord {
  if (record.completedSteps.includes(step)) return record;
  return {
    ...record,
    completedSteps: [...record.completedSteps, step],
    auditTrail: [
      { at: stamp(), actor, action },
      ...record.auditTrail,
    ],
  };
}

export function HandoffProvider({ children }: { children: ReactNode }) {
  const [record, setRecord] = useState<HandoffRecord>(createSeedHandoff);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(HANDOFF_STORAGE_KEY);
      if (raw) setRecord(JSON.parse(raw) as HandoffRecord);
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(HANDOFF_STORAGE_KEY, JSON.stringify(record));
  }, [record, hydrated]);

  const resetJourney = useCallback(() => {
    const fresh = createSeedHandoff();
    setRecord(fresh);
    window.localStorage.setItem(HANDOFF_STORAGE_KEY, JSON.stringify(fresh));
  }, []);

  const submitStaffingRequest = useCallback(
    (input?: {
      unit?: string;
      date?: string;
      startTime?: string;
      endTime?: string;
      quantity?: number;
      instructions?: string;
    }) => {
      setRecord((prev) => {
        if (isStepDone(prev, "facility_submitted")) return prev;
        let next = complete(
          {
            ...prev,
            unit: input?.unit || prev.unit,
            date: input?.date || prev.date,
            startTime: input?.startTime || prev.startTime,
            endTime: input?.endTime || prev.endTime,
            quantity: input?.quantity || prev.quantity,
            instructions: input?.instructions || prev.instructions,
          },
          "facility_submitted",
          "Facility — Memorial Care Center",
          "Submitted staffing request"
        );
        next = {
          ...next,
          notifications: pushNote(
            next,
            "admin",
            "New staffing request",
            `${next.facilityName} needs ${next.quantity} CNA · ${next.date} ${next.startTime}–${next.endTime}`
          ),
        };
        return next;
      });
    },
    []
  );

  const publishPositions = useCallback(() => {
    setRecord((prev) => {
      if (!isStepDone(prev, "facility_submitted")) return prev;
      if (isStepDone(prev, "admin_published")) return prev;
      let next = complete(
        { ...prev, published: true },
        "admin_published",
        "Kivara Admin",
        "Published eligible positions to CNAs"
      );
      next = {
        ...next,
        notifications: pushNote(
          next,
          "cna",
          "New eligible shift",
          `${next.facilityName} · ${next.date} · $${next.payRate}/hr`
        ),
      };
      return next;
    });
  }, []);

  const requestShift = useCallback(() => {
    setRecord((prev) => {
      if (!isStepDone(prev, "admin_published")) return prev;
      if (isStepDone(prev, "cna_requested")) return prev;
      let next = complete(
        { ...prev, cnaRequested: true },
        "cna_requested",
        prev.cnaName,
        "Requested published shift"
      );
      next = {
        ...next,
        notifications: pushNote(
          next,
          "admin",
          "CNA shift request received",
          `${next.cnaName} requested ${next.facilityName} · eligibility checks passed`
        ),
      };
      return next;
    });
  }, []);

  const confirmAssignment = useCallback(() => {
    setRecord((prev) => {
      if (!isStepDone(prev, "cna_requested")) return prev;
      if (isStepDone(prev, "admin_confirmed")) return prev;
      let next = complete(
        { ...prev, confirmed: true },
        "admin_confirmed",
        "Kivara Admin",
        CONFIRM_ADMIN_ACTION
      );
      next = {
        ...next,
        notifications: pushNote(
          next,
          "cna",
          CONFIRMED_CNA_COPY,
          `${next.facilityName} · ${next.date} · ${next.startTime}–${next.endTime}`
        ),
      };
      next = {
        ...next,
        notifications: pushNote(
          next,
          "facility",
          CONFIRMED_FACILITY_COPY,
          `${next.cnaName} assigned · ${next.date} · ${next.startTime}–${next.endTime}`
        ),
      };
      return next;
    });
  }, []);

  const completeClockCycle = useCallback(() => {
    setRecord((prev) => {
      if (!isStepDone(prev, "admin_confirmed")) return prev;
      if (isStepDone(prev, "cna_clocked")) return prev;
      let next = complete(
        {
          ...prev,
          clocked: true,
          timesheetSubmitted: true,
          actualHours: 8.05,
        },
        "cna_clocked",
        prev.cnaName,
        "GPS clock in/out completed · timesheet submitted"
      );
      next = {
        ...next,
        notifications: pushNote(
          next,
          "admin",
          "Attendance + timesheet update",
          `${next.cnaName} clocked out · GPS within area`
        ),
      };
      next = {
        ...next,
        notifications: pushNote(
          next,
          "facility",
          "Timesheet ready for review",
          `${next.cnaName} · ${next.actualHours} hrs · status: Clocked Out`
        ),
      };
      return next;
    });
  }, []);

  const facilityReviewTimesheet = useCallback((accepted: boolean) => {
    setRecord((prev) => {
      if (!isStepDone(prev, "cna_clocked")) return prev;
      if (isStepDone(prev, "timesheet_reviewed")) return prev;
      let next = complete(
        { ...prev, facilityReviewed: true },
        "timesheet_reviewed",
        "Facility — Memorial Care Center",
        accepted
          ? "Accepted timesheet hours"
          : "Submitted discrepancy note for Kivara review"
      );
      next = {
        ...next,
        notifications: pushNote(
          next,
          "admin",
          accepted
            ? "Facility accepted timesheet"
            : "Facility submitted timesheet discrepancy",
          `${next.cnaName} · awaiting Kivara final approval`
        ),
      };
      return next;
    });
  }, []);

  const adminLockHours = useCallback(() => {
    setRecord((prev) => {
      if (!isStepDone(prev, "timesheet_reviewed")) return prev;
      if (isStepDone(prev, "hours_locked")) return prev;
      let next = complete(
        {
          ...prev,
          hoursLocked: true,
          invoiceDrafted: true,
        },
        "hours_locked",
        "Kivara Admin",
        "Approved & locked hours · payroll-ready + invoice draft created"
      );
      next = {
        ...next,
        notifications: pushNote(
          next,
          "facility",
          "Invoice draft ready",
          `${next.invoiceId} · $${(next.actualHours * next.billRate).toFixed(2)} from locked hours`
        ),
      };
      next = {
        ...next,
        notifications: pushNote(
          next,
          "cna",
          "Hours approved for payroll",
          `${next.actualHours} hrs · $${(next.actualHours * next.payRate).toFixed(2)} estimated pay`
        ),
      };
      return next;
    });
  }, []);

  const unreadFor = useCallback(
    (portal: PortalActor) =>
      record.notifications.filter((n) => n.portal === portal && !n.read),
    [record.notifications]
  );

  const markPortalRead = useCallback((portal: PortalActor) => {
    setRecord((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) =>
        n.portal === portal ? { ...n, read: true } : n
      ),
    }));
  }, []);

  const value = useMemo<HandoffContextValue>(
    () => ({
      record,
      hydrated,
      nextStep: nextOpenStep(record),
      resetJourney,
      submitStaffingRequest,
      publishPositions,
      requestShift,
      confirmAssignment,
      completeClockCycle,
      facilityReviewTimesheet,
      adminLockHours,
      unreadFor,
      markPortalRead,
      copy: {
        cnaConfirmed: CONFIRMED_CNA_COPY,
        facilityConfirmed: CONFIRMED_FACILITY_COPY,
        adminConfirmAction: CONFIRM_ADMIN_ACTION,
      },
    }),
    [
      record,
      hydrated,
      resetJourney,
      submitStaffingRequest,
      publishPositions,
      requestShift,
      confirmAssignment,
      completeClockCycle,
      facilityReviewTimesheet,
      adminLockHours,
      unreadFor,
      markPortalRead,
    ]
  );

  return (
    <HandoffContext.Provider value={value}>{children}</HandoffContext.Provider>
  );
}

export function useHandoffs() {
  const ctx = useContext(HandoffContext);
  if (!ctx) {
    throw new Error("useHandoffs must be used within HandoffProvider");
  }
  return ctx;
}
