"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getDeck } from "@/lib/localdb";
import { StudyPlayer } from "@/components/StudyPlayer";

export default function StudyPage() {
  const params = useParams<{ deckId: string }>();
  const deck = getDeck(params.deckId);
  if (!deck) return <p>Deck not found.</p>;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Study: {deck.title}</h1>
        <Link className="rounded-2xl border px-4 py-2" href={`/decks/${deck.id}`}>Back to deck</Link>
      </div>
      <StudyPlayer deckId={deck.id} />
    </div>
  );
}