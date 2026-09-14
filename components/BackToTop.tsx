"use client";

import { useEffect, useState } from "react";

/* A 44px ghost circle, bottom-right, that appears once the hero has scrolled
   past. Flat and monochrome like every other control on the page. */
export default function BackToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
      className="btn-ghost fixed z-30"
      tabIndex={shown ? 0 : -1}
      style={{
        right: 24,
        bottom: 24,
        width: 44,
        height: 44,
        padding: 0,
        justifyContent: "center",
        background: "var(--white)",
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(8px)",
        pointerEvents: shown ? "auto" : "none",
        transition: "opacity 220ms ease, transform 220ms ease, background-color 180ms ease, color 180ms ease",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
