"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl p-10 card">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Study faster with a brighter workspace
          </h1>
          <p className="mt-3 max-w-2xl text-muted">
            Clean design, spaced repetition, and delightful motion. Create decks, add cards, and keep your streak alive.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/decks" className="btn btn-primary">Get Started</Link>
            <a href="#how" className="btn btn-outline">How it works</a>
          </div>
        </motion.div>

        {/* Decorative gradients */}
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div
            className="absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-60"
            style={{ background: "radial-gradient(closest-side, rgba(139,92,246,0.6), transparent)" }}
          />
          <div
            className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-60"
            style={{ background: "radial-gradient(closest-side, rgba(79,70,229,0.6), transparent)" }}
          />
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-2xl font-semibold">Why you’ll love it</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <motion.div
              key={f.title}
              className="card p-5 hover:shadow-soft transition-all duration-300 hover:-translate-y-0.5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-sm font-semibold" style={{ color: "rgb(var(--brand-600))" }}>
                {f.kicker}
              </div>
              <div className="mt-1 text-lg font-semibold">{f.title}</div>
              <p className="mt-2 text-muted">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="how" className="card p-6">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <ol className="mt-3 space-y-2 list-decimal pl-6">
          <li>Create a deck and add cards (front/back).</li>
          <li>Start a study session; press <kbd>Space</kbd> to flip, then 1–4 to rate.</li>
          <li>We schedule your next review using an SM‑2‑style algorithm.</li>
        </ol>
      </section>
    </div>
  );
}

const features = [
  { kicker: "Delightful UI", title: "Glassy cards & soft shadows", body: "Readable surfaces and elegant contrast help you focus longer." },
  { kicker: "Keyboard first", title: "Space, 1–4 ratings", body: "Blazing fast sessions without leaving the keyboard." },
  { kicker: "Spaced repetition", title: "SM‑2 scheduling", body: "Beat the forgetting curve with proven intervals." },
  { kicker: "Portable", title: "CSV import/export", body: "Your notes aren’t trapped. Move data freely." },
  { kicker: "Mobile‑friendly", title: "Built for phones & tablets", body: "Buttons, spacing, and hit areas tuned for touch." },
  { kicker: "Accessible", title: "Contrast & focus rings", body: "Meets a11y basics with clear focus and ARIA‑friendly flows." },
];
