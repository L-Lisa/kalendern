import { CalendarEvent, MonthGroup } from "./types";

export function groupEventsByMonth(events: CalendarEvent[]): MonthGroup[] {
  const map = new Map<string, MonthGroup>();

  for (const event of events) {
    const date = parseDate(event.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const monthLabel = toMonthLabel(date);

    if (!map.has(monthKey)) {
      map.set(monthKey, { monthKey, monthLabel, events: [] });
    }
    map.get(monthKey)!.events.push(event);
  }

  return Array.from(map.values());
}

/** Parse "YYYY-MM-DD" safely without timezone shift */
export function parseDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatDay(dateStr: string): string {
  return String(parseDate(dateStr).getDate());
}

export function formatWeekday(dateStr: string): string {
  return new Intl.DateTimeFormat("sv-SE", { weekday: "short" })
    .format(parseDate(dateStr))
    .replace(".", "")
    .replace(/^[a-z]/, (c) => c.toUpperCase());
}

function toMonthLabel(date: Date): string {
  return new Intl.DateTimeFormat("sv-SE", { month: "long", year: "numeric" })
    .format(date)
    .replace(/^[a-z]/, (c) => c.toUpperCase());
}
