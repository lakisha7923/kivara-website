/** Calendar helpers for CNA timesheet history (year / month / ISO week). */

export function parseWorkDate(workDate: string): Date {
  const [year, month, day] = workDate.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

export function formatDisplayDate(workDate: string): string {
  const date = parseWorkDate(workDate);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** ISO week number (1–53). */
export function isoWeek(workDate: string): number {
  const date = parseWorkDate(workDate);
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export function isoWeekYear(workDate: string): number {
  const date = parseWorkDate(workDate);
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  return date.getUTCFullYear();
}

export function weekLabel(workDate: string): string {
  const date = parseWorkDate(workDate);
  const dayNum = date.getUTCDay() || 7;
  const monday = new Date(date);
  monday.setUTCDate(date.getUTCDate() - dayNum + 1);
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  const fmt = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
  return `Week ${isoWeek(workDate)} · ${fmt.format(monday)}–${fmt.format(sunday)}`;
}

export function periodFromWorkDate(workDate: string) {
  const [year, month] = workDate.split("-").map(Number);
  return {
    workDate,
    year,
    month,
    week: isoWeek(workDate),
    weekLabel: weekLabel(workDate),
    date: formatDisplayDate(workDate),
  };
}

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;
