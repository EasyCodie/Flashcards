import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css"; // for LaTeX rendering if used later
import Link from "next/link";

export const metadata: Metadata = {
  title: "Flashcards",
  description: "Study faster with spaced repetition",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
          <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-semibold">Flashcards</Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/decks">Decks</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>
        <footer className="mx-auto max-w-3xl px-4 py-8 text-sm opacity-70">Made with Next.js</footer>
      </body>
    </html>
  );
}