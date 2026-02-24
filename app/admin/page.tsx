"use client";

import { useState, useTransition } from "react";
import { verifyPassword, addEvent } from "./actions";
import { TAGS } from "@/lib/data";

type Step = "password" | "form" | "success";

export default function AdminPage() {
  const [step, setStep] = useState<Step>("password");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [addedTitle, setAddedTitle] = useState("");
  const [formError, setFormError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const valid = await verifyPassword(passwordInput);
      if (valid) {
        setStep("form");
      } else {
        setPasswordError("Fel lösenord. Försök igen.");
      }
    });
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");
    const data = new FormData(e.currentTarget);

    const event = {
      title: (data.get("title") as string).trim(),
      date: data.get("date") as string,
      location: (data.get("location") as string).trim() || null,
      timeRange: (data.get("timeRange") as string).trim() || null,
      description: (data.get("description") as string).trim() || null,
      tags: data.getAll("tags") as string[],
      isFree: data.get("isFree") === "on",
      ctaLabel: data.get("ctaLabel") as string,
      url: (data.get("url") as string).trim(),
      targetAudience: (data.get("targetAudience") as string).trim() || null,
      isOutsidePeriod: false,
      outsidePeriodLabel: null,
      status: "active" as const,
    };

    startTransition(async () => {
      const result = await addEvent(event);
      if (result.success) {
        setAddedTitle(event.title);
        setStep("success");
      } else {
        setFormError(result.error ?? "Något gick fel. Försök igen.");
      }
    });
  }

  /* ── Password screen ─────────────────────────────────────────── */
  if (step === "password") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg px-6">
        <div className="w-full max-w-sm">
          <h1 className="font-serif font-bold text-ink text-2xl mb-1">
            Kalender
          </h1>
          <p className="text-muted text-sm mb-6">
            Ange lösenordet för att lägga till ett event.
          </p>
          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-3">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                setPasswordError("");
              }}
              placeholder="Lösenord"
              autoFocus
              className="border border-line rounded-lg px-4 py-2.5 text-ink bg-white outline-none focus:border-accent"
            />
            {passwordError && (
              <p className="text-red-600 text-sm">{passwordError}</p>
            )}
            <button
              type="submit"
              disabled={isPending}
              className="bg-accent text-white rounded-lg px-4 py-2.5 font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isPending ? "Kontrollerar…" : "Fortsätt →"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ── Success screen ──────────────────────────────────────────── */
  if (step === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg px-6">
        <div className="w-full max-w-sm text-center">
          <div
            className="mx-auto mb-4 flex items-center justify-center rounded-full bg-accent-light"
            style={{ width: 56, height: 56 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13l4 4L19 7"
                stroke="#D4601A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="font-serif font-bold text-ink text-xl mb-2">
            Event tillagt!
          </h2>
          <p className="text-muted text-sm mb-6">
            <span className="font-medium text-ink">"{addedTitle}"</span> är
            sparat och visas på sidan om ~1–2 minuter.
          </p>
          <button
            onClick={() => setStep("form")}
            className="text-accent text-sm font-medium hover:underline"
          >
            Lägg till ett till
          </button>
        </div>
      </div>
    );
  }

  /* ── Form screen ─────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-bg py-12 px-6">
      <div className="max-w-lg mx-auto">
        <h1 className="font-serif font-bold text-ink text-2xl mb-1">
          Lägg till event
        </h1>
        <p className="text-muted text-sm mb-8">
          Fyll i fälten och klicka på "Spara". Eventet publiceras på sidan inom
          ~1–2 minuter.
        </p>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
          {/* Titel */}
          <Field label="Titel *">
            <input
              name="title"
              required
              placeholder="YH-mässan Stockholm"
              className={inputCls}
            />
          </Field>

          {/* Datum + Tid */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Datum *">
              <input name="date" type="date" required className={inputCls} />
            </Field>
            <Field label="Tid">
              <input
                name="timeRange"
                placeholder="11:00–18:00"
                className={inputCls}
              />
            </Field>
          </div>

          {/* Plats */}
          <Field label="Plats">
            <input
              name="location"
              placeholder="Venue, Stad  eller  Online"
              className={inputCls}
            />
          </Field>

          {/* Beskrivning */}
          <Field label="Beskrivning">
            <textarea
              name="description"
              rows={3}
              maxLength={200}
              placeholder="Max 200 tecken"
              className={`${inputCls} resize-none`}
            />
          </Field>

          {/* URL */}
          <Field label="URL *">
            <input
              name="url"
              type="url"
              required
              placeholder="https://"
              className={inputCls}
            />
          </Field>

          {/* Taggar */}
          <Field label="Taggar">
            <div className="flex flex-wrap gap-4 pt-1">
              {TAGS.map((tag) => (
                <label
                  key={tag.label}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="tags"
                    value={tag.label}
                    className="w-4 h-4 accent-accent"
                  />
                  <span className="text-sm text-ink">{tag.label}</span>
                </label>
              ))}
            </div>
          </Field>

          {/* CTA + Gratis */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="CTA-knapp">
              <select name="ctaLabel" className={inputCls}>
                <option>Mer info</option>
                <option>Registrera</option>
              </select>
            </Field>
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFree"
                  defaultChecked
                  className="w-4 h-4 accent-accent"
                />
                <span className="text-sm text-ink">Gratis event</span>
              </label>
            </div>
          </div>

          {/* Målgrupp */}
          <Field label="Målgrupp (valfritt)">
            <input
              name="targetAudience"
              placeholder="t.ex. Lärare & förskollärare"
              className={inputCls}
            />
          </Field>

          {formError && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="bg-accent text-white rounded-lg px-4 py-3 font-medium hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
          >
            {isPending ? "Sparar…" : "Spara event"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ── Helpers ─────────────────────────────────────────────────── */
const inputCls =
  "w-full border border-line rounded-lg px-3 py-2 bg-white text-ink outline-none focus:border-accent";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-ink">{label}</label>
      {children}
    </div>
  );
}
