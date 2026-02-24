import { CalendarEvent, Tag } from "./types";
import eventsData from "./events.json";

export const TAGS: Tag[] = [
  { label: "Nätverkande", bgColor: "#E8F0E4", textColor: "#3A6B2A" },
  { label: "Jobbmässa", bgColor: "#FFF0E0", textColor: "#9C4A00" },
  { label: "Öppet Hus", bgColor: "#E4EAF5", textColor: "#1A3A7A" },
  { label: "Tech / IT", bgColor: "#F0E4F5", textColor: "#5A1A7A" },
];

export const EVENTS: CalendarEvent[] = eventsData as CalendarEvent[];

export function buildTagMap(tags: Tag[]): Record<string, Tag> {
  return Object.fromEntries(tags.map((t) => [t.label, t]));
}
