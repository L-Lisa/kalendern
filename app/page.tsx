import { EVENTS, TAGS, buildTagMap } from "@/lib/data";
import { groupEventsByMonth } from "@/lib/utils";
import { MonthGroup } from "@/components/MonthGroup";

// Revalidate every 60 seconds so updates in data.ts reflect quickly after deploy
export const revalidate = 60;

export default function Page() {
  const activeEvents = EVENTS.filter((e) => e.status === "active");
  const sorted = [...activeEvents].sort((a, b) =>
    a.date.localeCompare(b.date)
  );
  const monthGroups = groupEventsByMonth(sorted);
  const tagMap = buildTagMap(TAGS);

  return (
    <main
      className="mx-auto"
      style={{ maxWidth: "720px", padding: "60px 24px" }}
    >
      {/* Admin link */}
      <div className="flex justify-end mb-6">
        <a href="/admin" className="text-xs text-muted hover:text-accent transition-colors">
          + Lägg till event
        </a>
      </div>

      {/* Header */}
      <header className="mb-12">
        <h1
          className="font-serif font-bold text-ink leading-tight mb-4"
          style={{ fontSize: "clamp(1.75rem, 5vw, 2.5rem)" }}
        >
          Jobbsökaraktiviteter
          <br />
          Stockholm
        </h1>
        <p className="text-muted leading-relaxed max-w-lg">
          Verifierade mässor, öppet hus och nätverksträffar för dig som söker
          jobb i Stockholm. Uppdateras löpande.
        </p>
        <div className="mt-6 h-px bg-line" />
      </header>

      {/* Events */}
      {monthGroups.length === 0 ? (
        <p className="text-muted text-sm">Inga kommande aktiviteter just nu. Kolla tillbaka snart.</p>
      ) : (
        monthGroups.map((group, i) => (
          <MonthGroup key={group.monthKey} group={group} tagMap={tagMap} index={i} />
        ))
      )}

      {/* Footer */}
      <footer className="mt-8 pt-8 border-t border-line">
        <p className="text-sm text-muted">
          Uppdateras löpande · Bevaka{" "}
          <a
            href="https://www.arbetsformedlingen.se/for-arbetssokande/aktiviteter"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Arbetsförmedlingens aktiviteter
          </a>
        </p>
      </footer>
    </main>
  );
}
