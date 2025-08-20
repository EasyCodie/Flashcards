"use client";
import { useEffect, useMemo, useState } from "react";
import { nextDueCard, reviewCard, countDue } from "@/lib/localdb";
import type { Rating } from "@/lib/types";

export function StudyPlayer({ deckId }: { deckId: string }) {
  const [flipped, setFlipped] = useState(false);
  const [key, setKey] = useState(0);
  const [available, setAvailable] = useState(0);
  const card = useMemo(() => nextDueCard(deckId), [deckId, key]);

  useEffect(() => {
    setAvailable(countDue(deckId));
  }, [deckId, key]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!card) return;
      if (e.key === " ") { e.preventDefault(); setFlipped((f) => !f); }
      if (flipped) {
        if (e.key === "1") rate(0);
        if (e.key === "2") rate(1);
        if (e.key === "3") rate(2);
        if (e.key === "4") rate(3);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flipped, card]);

  function rate(r: Rating) {
    if (!card) return;
    reviewCard(card.id, r);
    setFlipped(false);
    setKey((k) => k + 1);
  }

  if (!card) {
    return (
      <div className="text-center space-y-2">
        <p className="text-lg">No cards due right now 🎉</p>
        <p className="text-sm opacity-70">Come back later or add more cards.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm opacity-70">Due now: {available}</div>
      <div className="rounded-2xl border p-6 bg-white">
        {!flipped ? (
          <div>
            <p className="text-xl whitespace-pre-wrap">{card.front}</p>
            <button className="mt-4 rounded-2xl bg-black text-white px-4 py-2" onClick={() => setFlipped(true)}>Flip [Space]</button>
          </div>
        ) : (
          <div>
            <p className="text-xl whitespace-pre-wrap">{card.back}</p>
            <div className="grid grid-cols-4 gap-2 mt-4">
              {["Again","Hard","Good","Easy"].map((t,i)=> (
                <button key={t} onClick={()=>rate(i as Rating)} className="rounded-2xl border px-3 py-2 hover:bg-gray-50">
                  {t} <span className="opacity-60">[{i+1}]</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}