import { MonthGroup as MonthGroupType, Tag } from "@/lib/types";
import { EventCard } from "./EventCard";

interface MonthGroupProps {
  group: MonthGroupType;
  tagMap: Record<string, Tag>;
  index: number;
}

export function MonthGroup({ group, tagMap, index }: MonthGroupProps) {
  return (
    <section
      className="animate-fade-up mb-12"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Month heading */}
      <div className="flex items-center gap-4 mb-6">
        <h2 className="font-serif font-bold text-ink shrink-0" style={{ fontSize: "1.375rem" }}>
          {group.monthLabel}
        </h2>
        <div className="h-px flex-1 bg-line" />
      </div>

      {/* Events */}
      <div>
        {group.events.map((event) => (
          <EventCard key={event.id} event={event} tagMap={tagMap} />
        ))}
      </div>
    </section>
  );
}
