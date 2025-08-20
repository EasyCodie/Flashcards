"use client";
import { useState } from "react";
import { createCard } from "@/lib/localdb";


export function CardForm({ deckId, onCreated }: { deckId: string; onCreated?: () => void }) {
const [front, setFront] = useState("");
const [back, setBack] = useState("");


return (
<form
className="flex flex-col gap-3"
onSubmit={(e) => {
e.preventDefault();
if (!front.trim() || !back.trim()) return;
createCard(deckId, { front: front.trim(), back: back.trim() });
setFront(""); setBack("");
onCreated?.();
}}
>
<textarea className="input" placeholder="Front (question/prompt)" value={front} onChange={(e)=>setFront(e.target.value)} rows={3} />
<textarea className="input" placeholder="Back (answer)" value={back} onChange={(e)=>setBack(e.target.value)} rows={3} />
<button className="btn btn-primary" type="submit">Add card</button>
</form>
);
}