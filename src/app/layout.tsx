import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });


export const metadata: Metadata = {
title: "Flashcards — Study Smarter",
description: "Spaced repetition flashcards with a clean design.",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en" className={inter.variable}>
<body className="min-h-screen">
<header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-[rgb(var(--border))]">
<div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
<Link href="/" className="flex items-center gap-2 font-semibold">
{/* Simple logo dot */}
<span className="inline-block h-3 w-3 rounded-full" style={{background:"linear-gradient(135deg, rgb(var(--brand-600)), rgb(var(--accent-500)))"}} />
Flashcards
</Link>
<nav className="flex items-center gap-6 text-sm">
<Link href="/decks" className="hover:opacity-80 transition">Decks</Link>
<a href="/#how" className="hover:opacity-80 transition">How it works</a>
<a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:opacity-80 transition">GitHub</a>
</nav>
</div>
</header>
<main className="mx-auto max-w-5xl px-4 py-10">
{children}
</main>
<footer className="mx-auto max-w-5xl px-4 py-12 text-sm text-muted">
© {new Date().getFullYear()} Flashcards. Built with Next.js.
</footer>
</body>
</html>
);
}