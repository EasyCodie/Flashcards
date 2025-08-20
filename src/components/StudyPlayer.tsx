"use client";

import { useEffect, useMemo, useState } from "react";
import { nextDueCard, reviewCard, countDue } from "@/lib/localdb";
import type { Rating } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

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
      if (e.key === " ") {
        e.preventDefault();
        setFlipped((f) => !f);
      }
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
    setKey((k: number) => k + 1);
  }

  if (!card) {
    return (
      <div className="text-center space-y-2">
        <p className="text-lg">No cards due right now 🎉</p>
        <p className="text-sm text-muted">Come back later or add more cards.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted">Due now: {available}</div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={card.id + String(flipped)}
          initial={{ opacity: 0, y: 12, rotateX: -6 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -12, rotateX: 6 }}
          transition={{ duration: 0.25 }}
          className="card p-6"
        >
          {!flipped ? (
            <div>
              <p className="text-xl whitespace-pre-wrap">{card.front}</p>
              <button className="btn btn-primary mt-4" onClick={() => setFlipped(true)}>
                Flip [Space]
              </button>
            </div>
          ) : (
            <div>
              <p className="text-xl whitespace-pre-wrap">{card.back}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                {["Again", "Hard", "Good", "Easy"].map((t, i) => (
                  <button key={t} onClick={() => rate(i as Rating)} className="btn btn-outline">
                    {t} <span className="opacity-60">[{i + 1}]</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
