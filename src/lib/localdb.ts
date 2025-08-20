import { nanoid } from "nanoid/non-secure"; // optional; or use crypto.randomUUID()
import type { Card, Deck, ID, Rating } from "./types";
import { updateCardSRS } from "./srs";

// If you don't install nanoid, replace nanoid() with crypto.randomUUID()
const makeId = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2));

const KEY = "fc.v1";

type Store = {
  decks: Record<ID, Deck>;
  cards: Record<ID, Card>;
};

function emptyStore(): Store {
  return { decks: {}, cards: {} };
}

function load(): Store {
  if (typeof window === "undefined") return emptyStore();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyStore();
    return JSON.parse(raw) as Store;
  } catch {
    return emptyStore();
  }
}

function save(store: Store) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(store));
}

// ---------- Decks ----------
export function listDecks(): Deck[] {
  const s = load();
  return Object.values(s.decks).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getDeck(id: ID): Deck | undefined {
  return load().decks[id];
}

export function createDeck(input: { title: string; description?: string }): Deck {
  const s = load();
  const now = new Date().toISOString();
  const deck: Deck = { id: makeId(), title: input.title, description: input.description, createdAt: now, updatedAt: now };
  s.decks[deck.id] = deck;
  save(s);
  return deck;
}

export function updateDeck(id: ID, patch: Partial<Deck>): Deck | undefined {
  const s = load();
  const prev = s.decks[id];
  if (!prev) return undefined;
  const next = { ...prev, ...patch, updatedAt: new Date().toISOString() } as Deck;
  s.decks[id] = next;
  save(s);
  return next;
}

export function deleteDeck(id: ID) {
  const s = load();
  for (const card of Object.values(s.cards)) if (card.deckId === id) delete s.cards[card.id];
  delete s.decks[id];
  save(s);
}

// ---------- Cards ----------
export function listCards(deckId: ID): Card[] {
  const s = load();
  return Object.values(s.cards).filter((c) => c.deckId === deckId).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function countDue(deckId: ID, now = new Date()): number {
  return listCards(deckId).filter((c) => !c.suspended && new Date(c.due) <= now).length;
}

export function createCard(deckId: ID, input: { front: string; back: string }): Card {
  const s = load();
  const now = new Date().toISOString();
  const card: Card = {
    id: makeId(),
    deckId,
    front: input.front,
    back: input.back,
    interval: 0,
    ease: 2.5,
    repetitions: 0,
    due: now,
    suspended: false,
    createdAt: now,
    updatedAt: now,
  };
  s.cards[card.id] = card;
  // touch deck
  const d = s.decks[deckId];
  if (d) d.updatedAt = now;
  save(s);
  return card;
}

export function updateCard(id: ID, patch: Partial<Card>): Card | undefined {
  const s = load();
  const prev = s.cards[id];
  if (!prev) return undefined;
  const next = { ...prev, ...patch, updatedAt: new Date().toISOString() } as Card;
  s.cards[id] = next;
  save(s);
  return next;
}

export function deleteCard(id: ID) {
  const s = load();
  delete s.cards[id];
  save(s);
}

export function nextDueCard(deckId: ID): Card | null {
  const now = new Date();
  const due = listCards(deckId).filter((c) => !c.suspended && new Date(c.due) <= now);
  if (due.length === 0) return null;
  due.sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime());
  return due[0];
}

export function reviewCard(cardId: ID, rating: Rating): Card | undefined {
  const s = load();
  const card = s.cards[cardId];
  if (!card) return undefined;
  const updated = updateCardSRS(card, rating);
  s.cards[cardId] = updated;
  // touch deck
  const d = s.decks[card.deckId];
  if (d) d.updatedAt = new Date().toISOString();
  save(s);
  return updated;
}

// ---------- CSV Import/Export ----------
export function exportDeckCSV(deckId: ID): string {
  const cards = listCards(deckId);
  const rows = ["front,back", ...cards.map((c) => `${escapeCSV(c.front)},${escapeCSV(c.back)}`)];
  return rows.join("\n");
}

export function importDeckCSV(deckId: ID, csv: string): number {
  const lines = csv.split(/\r?\n/).filter(Boolean);
  const start = lines[0]?.toLowerCase().startsWith("front") ? 1 : 0;
  let count = 0;
  for (let i = start; i < lines.length; i++) {
    const [front, back] = parseCSVLine(lines[i]);
    if (front && back) {
      createCard(deckId, { front, back });
      count++;
    }
  }
  return count;
}

function escapeCSV(s: string): string {
  if (s.includes(",") || s.includes("\n") || s.includes('"')) {
    return '"' + s.replaceAll('"', '""') + '"';
  }
  return s;
}

function parseCSVLine(line: string): [string, string] {
  // naive CSV parser for 2 columns
  const result: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"'; i++; // escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      result.push(cur); cur = "";
    } else {
      cur += ch;
    }
  }
  result.push(cur);
  return [result[0] ?? "", result[1] ?? ""] as [string, string];
}