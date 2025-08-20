"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DeckForm } from "@/components/DeckForm";
import { listDecks, countDue } from "@/lib/localdb";
import type { Deck } from "@/lib/types";

export default function DecksPage() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const refresh = () => setDecks(listDecks());
  useEffect(() => { refresh(); }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Your Decks</h1>
        <p className="text-sm opacity-70">Stored locally in your browser.</p>
      </div>

      <div className="grid gap-3">
        {decks.length === 0 && <p className="text-sm opacity-70">No decks yet. Create one below.</p>}
        {decks.map((d) => (
          <Link key={d.id} href={`/decks/${d.id}`} className="rounded-2xl border p-4 bg-white hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{d.title}</div>
                <div className="text-sm opacity-70">Updated {new Date(d.updatedAt).toLocaleString()}</div>
              </div>
              <div className="text-sm">Due: {countDue(d.id)}</div>
            </div>
          </Link>
        ))}
      </div>

      <section className="rounded-2xl border p-4 bg-white">
        <h2 className="font-medium mb-2">Create a deck</h2>
        <DeckForm onCreated={refresh} />
      </section>
    </div>
  );
}