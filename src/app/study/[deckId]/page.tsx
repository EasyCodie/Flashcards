"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getDeck } from "@/lib/localdb";
import { StudyPlayer } from "@/components/StudyPlayer";

export default function StudyPage() {
  const params = useParams();
  const deckId = params?.deckId as string;
  const deck = getDeck(deckId);
  if (!deck) return <p>Deck not found.</p>;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Study: {deck.title}</h1>
        <Link className="btn btn-outline" href={`/decks/${deck.id}`}>Back to deck</Link>
      </div>
      <StudyPlayer deckId={deck.id} />
    </div>
  );
}
