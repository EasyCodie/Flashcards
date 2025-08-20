"use client";
import { useState } from "react";
import { createDeck } from "@/lib/localdb";


export function DeckForm({ onCreated }: { onCreated?: () => void }) {
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");


return (
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
<input className="input" placeholder="Deck title" value={title} onChange={(e) => setTitle(e.target.value)} required />
<textarea className="input" placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
<button className="btn btn-primary" type="submit">Create deck</button>
</form>
);
}