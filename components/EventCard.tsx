import { CalendarEvent, Tag } from "@/lib/types";
import { formatDay, formatWeekday } from "@/lib/utils";
import { TagBadge } from "./TagBadge";

interface EventCardProps {
  event: CalendarEvent;
  tagMap: Record<string, Tag>;
}

export function EventCard({ event, tagMap }: EventCardProps) {
  const day = formatDay(event.date);
  const weekday = formatWeekday(event.date);

  return (
    <article
      className="grid gap-5 py-6 border-b border-line last:border-b-0"
      style={{ gridTemplateColumns: "56px 1fr" }}
    >
      {/* Date column */}
      <div className="flex flex-col items-center pt-0.5">
        <span
          className="font-serif font-bold leading-none text-accent"
          style={{ fontSize: "2.25rem" }}
        >
          {day}
        </span>
        <span className="mt-1 text-xs uppercase tracking-wide text-muted">
          {weekday}
        </span>
      </div>

      {/* Content column */}
      <div className="flex flex-col gap-2">
        {/* Title */}
        <h3 className="font-serif font-bold text-ink leading-snug text-lg">
          {event.title}
        </h3>

        {/* Target audience badge */}
        {event.targetAudience && (
          <p className="text-xs text-muted">
            <span className="inline-block rounded border border-line px-2 py-0.5 text-muted">
              {event.targetAudience}
            </span>
          </p>
        )}

        {/* Location · Time */}
        {(event.location || event.timeRange) && (
          <p className="text-sm text-muted">
            {[event.location, event.timeRange].filter(Boolean).join(" · ")}
          </p>
        )}

        {/* Description */}
        {event.description && (
          <p className="text-sm text-ink leading-relaxed">{event.description}</p>
        )}

        {/* Tags + CTA row */}
        <div className="flex flex-wrap items-center gap-2 mt-1">
          {event.tags.map((tag) => {
            const t = tagMap[tag];
            return (
              <TagBadge
                key={tag}
                label={tag}
                bgColor={t?.bgColor ?? "#F0F0EE"}
                textColor={t?.textColor ?? "#555"}
              />
            );
          })}

          {event.isFree && (
            <span className="text-xs text-muted">Gratis</span>
          )}

          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-accent border border-accent rounded-full px-3 py-1 hover:bg-accent-light transition-colors"
          >
            {event.ctaLabel}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2.5 6h7M6.5 3l3 3-3 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* Outside period badge */}
        {event.isOutsidePeriod && event.outsidePeriodLabel && (
          <p className="text-xs text-muted">{event.outsidePeriodLabel}</p>
        )}
      </div>
    </article>
  );
}
