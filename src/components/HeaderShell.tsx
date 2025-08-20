"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function HeaderShell() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      el.setAttribute("data-stuck", (window.scrollY > 8).toString());
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header ref={ref} className="site-header" data-stuck="false">
      <div className="container">
        <Link href="/" className="brand">Flashcards</Link>
        <nav className="nav">
          <Link href="/decks" className="nav-link">Decks</Link>
          <form role="search" className="search" aria-label="Search decks">
            <svg aria-hidden="true" className="search-ic" viewBox="0 0 20 20">
              <path d="M13.5 12h-.79l-.28-.27a6 6 0 10-.71.71l.27.28v.79L18 19l1-1-5.5-5zm-5.5 0A4.5 4.5 0 1112.5 7.5 4.5 4.5 0 018 12z"/>
            </svg>
            <input type="search" placeholder="Search decks" aria-label="Search" />
          </form>
          <Link href="/decks" className="btn btn-primary">Get started</Link>
        </nav>
      </div>
    </header>
  );
}
