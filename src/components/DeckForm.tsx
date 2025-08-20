"use client";
import { useState } from "react";
import { createDeck } from "@/lib/localdb";

export function DeckForm({ onCreated }: { onCreated?: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (!title.trim()) return;
        createDeck({ title: title.trim(), description: description.trim() || undefined });
        setTitle("");
        setDescription("");
        onCreated?.();
      }}
    >
      <input
        className="rounded-xl border p-2"
        placeholder="Deck title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="rounded-xl border p-2"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
      />
      <button className="rounded-2xl bg-black text-white px-4 py-2 hover:opacity-90" type="submit">Create deck</button>
    </form>
  );
}