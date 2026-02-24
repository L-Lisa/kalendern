"use server";

import { CalendarEvent } from "@/lib/types";

const REPO = process.env.GITHUB_REPO!; // "L-Lisa/kalendern"
const TOKEN = process.env.GITHUB_TOKEN!;
const FILE_PATH = "lib/events.json";

export async function verifyPassword(password: string): Promise<boolean> {
  return password === process.env.ADMIN_PASSWORD;
}

export async function addEvent(
  event: Omit<CalendarEvent, "id">
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    // 1. Fetch current file from GitHub
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          Accept: "application/vnd.github+json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`GitHub fetch failed: ${res.status} ${res.statusText}`);
    }

    const { content, sha } = await res.json();
    const events: CalendarEvent[] = JSON.parse(
      Buffer.from(content, "base64").toString("utf-8")
    );

    // 2. Append new event with unique timestamp-based id
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      ...event,
    };
    events.push(newEvent);

    // 3. Commit updated file back to GitHub
    const updatedContent = Buffer.from(
      JSON.stringify(events, null, 2) + "\n"
    ).toString("base64");

    const commitRes = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Lägg till event: ${event.title}`,
          content: updatedContent,
          sha,
        }),
      }
    );

    if (!commitRes.ok) {
      const err = await commitRes.json();
      throw new Error(err.message ?? `Commit failed: ${commitRes.status}`);
    }

    return { success: true, id: newEvent.id };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Okänt fel",
    };
  }
}

export async function removeEvent(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          Accept: "application/vnd.github+json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error(`GitHub fetch failed: ${res.status}`);

    const { content, sha } = await res.json();
    const events: CalendarEvent[] = JSON.parse(
      Buffer.from(content, "base64").toString("utf-8")
    );

    const filtered = events.filter((e) => e.id !== id);
    if (filtered.length === events.length) {
      throw new Error("Eventet hittades inte.");
    }

    const updatedContent = Buffer.from(
      JSON.stringify(filtered, null, 2) + "\n"
    ).toString("base64");

    const commitRes = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Ångra: ta bort event ${id}`,
          content: updatedContent,
          sha,
        }),
      }
    );

    if (!commitRes.ok) {
      const err = await commitRes.json();
      throw new Error(err.message ?? `Commit failed: ${commitRes.status}`);
    }

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Okänt fel",
    };
  }
}
