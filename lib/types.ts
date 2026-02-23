export type EventStatus = "active" | "draft" | "cancelled";

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO: "2026-03-10"
  location: string | null;
  timeRange: string | null; // "11:00–18:00"
  description: string | null;
  tags: string[];
  isFree: boolean;
  ctaLabel: string;
  url: string;
  isOutsidePeriod: boolean;
  outsidePeriodLabel: string | null;
  targetAudience: string | null;
  status: EventStatus;
}

export interface Tag {
  label: string;
  bgColor: string;
  textColor: string;
}

export interface MonthGroup {
  monthKey: string; // "2026-03"
  monthLabel: string; // "Mars 2026"
  events: CalendarEvent[];
}
