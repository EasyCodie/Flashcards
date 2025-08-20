import type { Card, Rating } from "./types";

export function updateCardSRS(card: Card, rating: Rating): Card {
  let ease = card.ease;
  let interval = card.interval;
  let repetitions = card.repetitions;

  if (rating === 0) {
    repetitions = 0;
    interval = 1;
  } else {
    repetitions += 1;
    const q = rating === 1 ? 2.5 : rating === 2 ? 3.5 : 4.5; // quality proxy
    ease = Math.max(1.3, ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
    if (repetitions === 1) interval = 1;
    else if (repetitions === 2) interval = 6;
    else interval = Math.round(interval * ease);
  }
  const nextDue = new Date();
  nextDue.setDate(nextDue.getDate() + interval);

  return {
    ...card,
    ease,
    interval,
    repetitions,
    due: nextDue.toISOString(),
    updatedAt: new Date().toISOString(),
  };
}