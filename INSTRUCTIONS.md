# Instruktioner – Jobbsökaraktiviteter Stockholm

Alla events underhålls direkt i koden via filen `lib/data.ts`. Inga separata verktyg eller databaser behövs – be Claude Code om hjälp och ange tydligt vad som ska ändras.

---

## Lägga till ett nytt event

Öppna `lib/data.ts` och lägg till ett nytt objekt i `EVENTS`-arrayen. Kopiera ett befintligt event och ändra fälten.

**Exempelblock att kopiera:**
```typescript
{
  id: "9",                                    // Unikt nummer, räkna upp från sista
  title: "Namn på eventet",
  date: "2026-05-14",                         // ISO-format: ÅÅÅÅ-MM-DD
  location: "Platsnamn, Stad",                // eller "Online", eller null
  timeRange: "10:00–16:00",                   // eller null om okänd tid
  description: "Kort beskrivning, max ~200 tecken.",
  tags: ["Jobbmässa"],                        // Se taggtyper nedan
  isFree: true,
  ctaLabel: "Mer info",                       // eller "Registrera"
  url: "https://example.com/event",           // Direktlänk – verifiera att den fungerar
  isOutsidePeriod: false,
  outsidePeriodLabel: null,                   // "· utanför perioden" om isOutsidePeriod: true
  targetAudience: null,                       // t.ex. "Lärare & förskollärare"
  status: "active",                           // "active" | "draft" | "cancelled"
},
```

---

## Uppdatera ett befintligt event

Hitta eventet via `id` eller `title` i `lib/data.ts` och ändra aktuella fält. Be Claude Code: *"Uppdatera event 3 – ändra url till X och timeRange till Y."*

---

## Ta bort / arkivera ett event

Sätt `status: "cancelled"` för att dölja det från sidan utan att radera datan. Eller ta bort hela objektet om datan inte behövs.

---

## Taggtyper

| Tagg | Använd när |
|---|---|
| **Jobbmässa** | Rekryteringsmässor, jobbmässor med arbetsgivare på plats |
| **Nätverkande** | Mingel, nätverksträffar, middagar, After Work |
| **Öppet Hus** | Lärosäten (YH, uni, gymnasium) som håller öppet hus |
| **Tech / IT** | Techfokuserade events, bootcamps, coding-events |

Taggar kan kombineras (t.ex. `["Nätverkande", "Tech / IT"]`). Nya taggar läggs till i `TAGS`-arrayen i `lib/data.ts`.

---

## Källguide – vad att söka och när

### Varannan vecka

| Källa | URL | Sök efter |
|---|---|---|
| Studentum Kalender | https://www.studentum.se/calendar | Mässor och event i Stockholm |
| YHGuiden | https://www.yhguiden.se/reportage/yh-maessor-och-evenemang-en-komplett-guide | YH-mässor, datum och platser |
| Alla Mässor | https://www.allamassor.se/events/kategori/jobb-utbildning-rekrytering/ | Jobbmässor Stockholm |
| Stockholm.com | https://www.stockholm.com/sv/evenemang | Filtrera på karriär/jobb |

### En gång i månaden

| Källa | URL | Sök efter |
|---|---|---|
| Tjejer Kodar | https://tjejerkodar.se/events/ | Alla kommande events |
| WomenHack | https://womenhack.com/events/ | Stockholm-events |
| Medrekmässan | https://www.medrekmassan.se/for-besokare/ | Datum och plats |
| Skoljobbsmässan | https://www.skoljobbsmassan.se | Datum och anmälan |
| AW Academy | https://www.academywebsiteworks.com/events | Bootcamps, trainee-program |
| Arbetsförmedlingen | https://www.arbetsformedlingen.se/for-arbetssokande/aktiviteter | Stockholm-aktiviteter |
| Täby Kommun | https://www.taby.se/naringsliv-och-foretagande/ | Jobbmässor och event |
| Stockholms Stad | https://www.stockholm.se/jobb-och-foretag | Karriärevent |
| Arbetsmarknadsförvaltningen | https://start.stockholm/arbete-och-foretagande/ | Aktiviteter och event |

### Per termin (HT/VT)

| Källa | URL | Notering |
|---|---|---|
| Stockholms Universitet | https://su.se/oppethus | Höst och vår |
| KTH | https://www.kth.se/student/studier/program/oppet-hus | Höst och vår |
| Nackademin | https://www.nackademin.se/om-nackademin/evenemang/ | Löpande |
| EC Utbildning | https://www.ecutbildning.se/evenemang/ | Löpande |
| Teknikhögskolan | https://www.teknikhogskolan.se/evenemang/ | Löpande |

### Per kvartal

| Källa | URL | Målgrupp |
|---|---|---|
| Medrekmässan | https://www.medrekmassan.se | Vård & omsorg |
| Skoljobbsmässan | https://www.skoljobbsmassan.se | Lärare & förskollärare |
| WomenHack | https://womenhack.com | Kvinnor i tech |

---

## Vad som är ett relevant event

Inkludera events som uppfyller **minst ett** av kriterierna:
- Rekryteringsmässa eller jobbmässa med arbetsgivare på plats
- Öppet hus vid utbildningsanordnare (YH, uni, gymnasium)
- Nätverksträff specifikt för jobbsökande eller karriärsutveckling
- Tech-event med fokus på rekrytering eller kompetensutveckling
- Arrangerat av Arbetsförmedlingen, kommunen eller känd organisation

**Exkludera:**
- Rena konferenser utan rekryteringsfokus
- Events utanför Stockholmsregionen (om inte online)
- Events med deltagaravgift utan tydligt jobbsyfte

---

## Verifiera URL:er

Klistra in URL:en i en privat webbläsarflik och kontrollera att sidan:
1. Laddar utan fel (inte 404 eller "sidan hittades inte")
2. Är rätt event (rätt datum, plats, titel)
3. Är en direktlänk, inte en sökresultatsida

---

## Deploya ändringar (Vercel)

1. Gör ändringarna i `lib/data.ts` via Claude Code
2. Commita och pusha till GitHub: `git add lib/data.ts && git commit -m "Lägg till event: [Eventnamn]" && git push`
3. Vercel deployer automatiskt inom ~1 minut

Om Vercel inte är kopplat till GitHub än: ladda upp via `vercel --prod` från terminalen.

---

## Filstruktur

```
lib/data.ts          ← HÄR gör du alla ändringar
lib/types.ts         ← TypeScript-typer (rör ej)
lib/utils.ts         ← Datumformatering (rör ej)
components/
  EventCard.tsx      ← Eventkortet
  MonthGroup.tsx     ← Månadsgrupp med animation
  TagBadge.tsx       ← Färgad tagg
app/
  page.tsx           ← Publika sidan
  layout.tsx         ← Typsnitt och metadata
  globals.css        ← Designsystemet (färger, typsnitt)
```
