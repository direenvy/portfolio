"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/content/projects";

const INTERVAL = 7000;

/* One ink card that pages through the projects: counter, category, name,
   description and stack on the left; the interface in a browser frame on the
   right; dots, arrows and a link to the full list underneath. Auto-advances,
   pauses on hover or focus, and respects reduced motion. */
export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const go = useCallback((i: number) => setIndex(((i % projects.length) + projects.length) % projects.length), [projects.length]);

  useEffect(() => {
    if (paused || reduce.current) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % projects.length), INTERVAL);
    return () => clearInterval(t);
  }, [paused, projects.length]);

  const p = projects[index];

  return (
    <div
      className="relative"
        style={{ background: "var(--ink)", borderRadius: "var(--radius-cards)", padding: "clamp(28px, 4vw, 48px)", color: "#f5f5f7" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(index + 1);
          if (e.key === "ArrowLeft") go(index - 1);
        }}
        aria-roledescription="carousel"
        aria-label="Projects"
      >
        <div key={p.slug} className="grid items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 carousel-slide">
          <div>
            <p className="caption" style={{ color: "#86868b", letterSpacing: "0.08em", marginBottom: 28 }}>
              {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </p>
            <p className="caption" style={{ color: "#86868b", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
              {p.category}
            </p>
            <h3 className="heading" style={{ color: "#f5f5f7" }}>
              {p.name}
            </h3>
            <p style={{ fontSize: 17, lineHeight: 1.47, color: "#d2d2d7", marginTop: 16, maxWidth: 460 }}>{p.oneLine}</p>
            <div className="flex flex-wrap gap-2" style={{ marginTop: 20 }}>
              {p.stack.map((s) => (
                <span key={s} className="chip" style={{ background: "#333336", color: "#f5f5f7" }}>
                  {s}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-5" style={{ marginTop: 28, fontSize: 17 }}>
              <Link href={`/projects/${p.slug}`} className="btn-ghost on-dark">
                Read more
              </Link>
              <a href={p.repo} target="_blank" rel="noreferrer" style={{ color: "#f5f5f7", textDecoration: "underline", textUnderlineOffset: 4 }}>
                Repository ↗
              </a>
            </div>
          </div>

          <Link href={`/projects/${p.slug}`} aria-label={`${p.name}: read more`} className="block" style={{ borderRadius: 18, overflow: "hidden", background: "#ffffff" }}>
            <div className="flex items-center gap-1.5" style={{ height: 28, padding: "0 12px", background: "#e8e8ed" }} aria-hidden="true">
              {["#c8c8cd", "#c8c8cd", "#c8c8cd"].map((c, i) => (
                <span key={i} style={{ width: 8, height: 8, borderRadius: 999, background: c }} />
              ))}
            </div>
            <div className="relative" style={{ aspectRatio: "16 / 10" }}>
              <Image src={p.image} alt={`${p.name} interface`} fill sizes="(max-width: 1024px) 100vw, 800px" style={{ objectFit: "cover", objectPosition: "top" }} priority={index === 0} />
            </div>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4" style={{ marginTop: 40 }}>
          <div className="flex items-center gap-2" role="tablist" aria-label="Choose a project">
            {projects.map((q, i) => (
              <button
                key={q.slug}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={q.name}
                onClick={() => go(i)}
                style={{ width: i === index ? 28 : 8, height: 8, borderRadius: 999, background: i === index ? "#f5f5f7" : "#5b5b61", transition: "width 220ms ease, background-color 220ms ease" }}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button type="button" aria-label="Previous project" onClick={() => go(index - 1)} className="btn-ghost on-dark" style={{ width: 40, height: 40, padding: 0, justifyContent: "center" }}>
              ‹
            </button>
            <button type="button" aria-label="Next project" onClick={() => go(index + 1)} className="btn-ghost on-dark" style={{ width: 40, height: 40, padding: 0, justifyContent: "center" }}>
              ›
            </button>
            <Link href="/projects" className="btn-ghost on-dark" style={{ fontSize: 14, padding: "8px 16px" }}>
              View all projects
            </Link>
          </div>
        </div>
    </div>
  );
}
