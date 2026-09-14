"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type Tile = {
  key: string;
  name: string;
  group: string;
  category: string;
  blurb: string;
  href: string;
  external: boolean;
  image: string;
  fit: "cover" | "contain";
  links: { label: string; href: string; external: boolean }[];
};

/* Segmented filter over every project, then a three-column grid of tiles.
   The tile's picture is the link; the name and group sit beneath it. */
export default function ProjectGrid({ tiles, groups }: { tiles: Tile[]; groups: string[] }) {
  const [active, setActive] = useState("All");
  const shown = active === "All" ? tiles : tiles.filter((t) => t.group === active);

  return (
    <div>
      <div className="segmented" role="group" aria-label="Filter projects by area">
        {["All", ...groups].map((g) => (
          <button key={g} type="button" aria-pressed={g === active} onClick={() => setActive(g)}>
            {g}
          </button>
        ))}
      </div>

      <div key={active} className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" style={{ marginTop: 40 }} aria-live="polite">
        {shown.map((t, i) => {
          const media = (
            <>
              <Image
                src={t.image}
                alt={`${t.name} ${t.fit === "cover" ? "interface" : "figure"}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 460px"
                style={{
                  objectFit: t.fit,
                  objectPosition: "top",
                  padding: t.fit === "contain" ? 20 : 0,
                }}
              />
              <div className="tile-veil" aria-hidden="true">
                <span className="tile-arrow">↗</span>
                <p
                  className="caption"
                  style={{
                    color: "#d2d2d7",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  {t.category}
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.47, maxWidth: 380 }}>{t.blurb}</p>
              </div>
            </>
          );
          const label = `${t.name}: ${t.external ? "open" : "read the case study"}`;
          return (
            <article key={t.key} className="tile-in" style={{ animationDelay: `${i * 50}ms` }}>
              {t.external ? (
                <a href={t.href} target="_blank" rel="noreferrer" className="tile-media" aria-label={label}>
                  {media}
                </a>
              ) : (
                <Link href={t.href} className="tile-media" aria-label={label}>
                  {media}
                </Link>
              )}
              <div className="flex items-baseline justify-between gap-4" style={{ marginTop: 16 }}>
                <h2 className="label" style={{ fontSize: 19 }}>
                  {t.external ? (
                    <a href={t.href} target="_blank" rel="noreferrer">
                      {t.name}
                    </a>
                  ) : (
                    <Link href={t.href}>{t.name}</Link>
                  )}
                </h2>
                <span className="caption muted" style={{ whiteSpace: "nowrap" }}>
                  {t.group}
                </span>
              </div>
              <div className="flex flex-wrap gap-x-4" style={{ marginTop: 6, fontSize: 14 }}>
                {t.links.map((l) =>
                  l.external ? (
                    <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="link">
                      {l.label}
                    </a>
                  ) : (
                    <Link key={l.label} href={l.href} className="link">
                      {l.label}
                    </Link>
                  ),
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
