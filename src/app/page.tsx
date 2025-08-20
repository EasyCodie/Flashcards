import Image from "next/image";

import Link from "next/link";

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Study faster with spaced repetition</h1>
      <p className="text-gray-600">Create decks, add cards, and review what’s due each day. No sign‑in required.</p>
      <div className="flex gap-3">
        <Link href="/decks" className="rounded-2xl bg-black text-white px-4 py-2">Go to Decks</Link>
        <a href="#how" className="rounded-2xl border px-4 py-2">How it works</a>
      </div>
      <section id="how" className="prose">
        <h2>How it works</h2>
        <ol>
          <li>Create a deck and add cards (front/back).</li>
          <li>Start a study session; press <kbd>Space</kbd> to flip, then 1–4 to rate.</li>
          <li>We schedule your next review using an SM‑2‑style algorithm.</li>
        </ol>
      </section>
    </div>
  );
}
