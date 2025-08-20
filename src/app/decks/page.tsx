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
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Your Decks</h1>
          <p className="text-[rgb(var(--text-muted))]">Stored locally in your browser.</p>
        </div>
        <Link href="/" className="btn btn-secondary">Home</Link>
      </div>

      <div className="grid-cards">
        {decks.length === 0 && <p className="text-[rgb(var(--text-muted))]">No decks yet. Create one below.</p>}
        {decks.map((d) => (
          <Link key={d.id} href={`/decks/${d.id}`} className="card-tile" data-testid="deck-tile">
            <div className="flex items-center justify-between">
              <div>
                <div className="card-title">{d.title}</div>
                <div className="card-meta">Updated {new Date(d.updatedAt).toLocaleString()}</div>
              </div>
              <div className="text-sm font-medium" style={{ color: "rgb(var(--brand-600))" }}>
                Due: {countDue(d.id)}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <DeckForm onCreated={refresh} />
    </div>
  );
}
