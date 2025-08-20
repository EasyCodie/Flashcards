"use client";

import { useState } from "react";
import { createDeck } from "@/lib/localdb";

export function DeckForm({ onCreated }: { onCreated?: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <section className="editor" data-testid="deck-editor">
      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim()) return;
          createDeck({ title: title.trim(), description: description.trim() || undefined });
          setTitle("");
          setDescription("");
          onCreated?.();
        }}
      >
        <div className="field">
          <label htmlFor="deck-name">Deck name</label>
          <input
            id="deck-name"
            className="input"
            placeholder="e.g., Biology — Cell Basics"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <p className="help">Visible only to you by default.</p>
        </div>

        <div className="field">
          <label htmlFor="deck-desc">Description</label>
          <textarea
            id="deck-desc"
            className="textarea"
            rows={2}
            placeholder="Short description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <button className="btn btn-primary" type="submit">Create deck</button>
        </div>
      </form>
    </section>
  );
}
