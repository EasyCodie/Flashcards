"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { CardForm } from "@/components/CardForm";
import { countDue, deleteCard, deleteDeck, exportDeckCSV, getDeck, listCards, importDeckCSV } from "@/lib/localdb";
import type { Card, Deck } from "@/lib/types";

export default function DeckDetailPage() {
  const params = useParams<{ deckId: string }>();
  const router = useRouter();
  const deckId = params.deckId;
  const [deck, setDeck] = useState<Deck | undefined>();
  const [cards, setCards] = useState<Card[]>([]);
  const refresh = () => { setDeck(getDeck(deckId)); setCards(listCards(deckId)); };

  useEffect(() => { refresh(); }, [deckId]);

  const due = useMemo(() => countDue(deckId), [deckId, cards]);

  const fileRef = useRef<HTMLInputElement>(null);

  if (!deck) return <p>Deck not found.</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{deck.title}</h1>
          {deck.description && <p className="text-sm opacity-70">{deck.description}</p>}
        </div>
        <div className="flex gap-2">
          <Link className="rounded-2xl bg-black text-white px-4 py-2" href={`/study/${deckId}`}>Study ({due} due)</Link>
          <button className="rounded-2xl border px-4 py-2" onClick={() => downloadCSV(deckId, deck.title)}>Export CSV</button>
          <button className="rounded-2xl border px-4 py-2" onClick={() => fileRef.current?.click()}>Import CSV</button>
          <input ref={fileRef} type="file" accept=".csv,text/csv" className="hidden" onChange={handleImport} />
          <button className="rounded-2xl border px-4 py-2 text-red-600" onClick={() => { if(confirm("Delete deck and all cards?")){ deleteDeck(deckId); router.push("/decks"); } }}>Delete</button>
        </div>
      </div>

      <section className="rounded-2xl border p-4 bg-white">
        <h2 className="font-medium mb-2">Add a card</h2>
        <CardForm deckId={deckId} onCreated={refresh} />
      </section>

      <section>
        <h2 className="font-medium mb-2">Cards ({cards.length})</h2>
        <div className="grid gap-3">
          {cards.length === 0 && <p className="text-sm opacity-70">No cards yet.</p>}
          {cards.map((c) => (
            <div key={c.id} className="rounded-2xl border p-4 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs opacity-70 mb-1">Front</div>
                  <div className="whitespace-pre-wrap">{c.front}</div>
                </div>
                <div>
                  <div className="text-xs opacity-70 mb-1">Back</div>
                  <div className="whitespace-pre-wrap">{c.back}</div>
                </div>
              </div>
              <div className="flex gap-2 mt-3 text-sm opacity-70">
                <span>Due: {new Date(c.due).toLocaleString()}</span>
                <span>· Interval: {c.interval}d</span>
                <span>· Ease: {c.ease.toFixed(2)}</span>
                <span>· Reps: {c.repetitions}</span>
                <button onClick={()=>{ if(confirm("Delete card?")){ deleteCard(c.id); refresh(); } }} className="ml-auto text-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  function downloadCSV(id: string, title: string) {
    const csv = exportDeckCSV(id);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slugify(title)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const text = await f.text();
    const added = importDeckCSV(deckId, text);
    alert(`Imported ${added} cards`);
    refresh();
    e.currentTarget.value = "";
  }
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}