import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import HeaderShell from "@/components/HeaderShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flashcards — Study Smarter",
  description: "Spaced repetition flashcards with a clean dark UI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <HeaderShell />
        <main className="mx-auto max-w-[1120px] px-4 py-10">
          {children}
        </main>
        <footer className="mx-auto max-w-[1120px] px-4 py-12 text-[rgb(var(--text-muted))] text-sm">
          © {new Date().getFullYear()} Flashcards.
        </footer>
      </body>
    </html>
  );
}
