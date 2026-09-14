import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import ProjectGrid, { type Tile } from "@/components/ProjectGrid";
import Reveal from "@/components/Reveal";
import { profile } from "@/content/profile";
import { projects, supporting } from "@/content/projects";

export const metadata: Metadata = {
  title: `Projects — ${profile.name}`,
  description: "Every project: the systems built end to end, the final-year project they grew out of, and the coursework before that.",
};

/* Everything in one place. The four systems link to their case studies; the
   supporting work links out to the live app or the repository. */
export default function ProjectsPage() {
  const tiles: Tile[] = [
    ...projects.map<Tile>((p) => ({
      key: p.slug,
      name: p.name,
      group: p.group,
      category: p.category,
      blurb: `${p.headline}. ${p.result.value} ${p.result.label}.`,
      href: `/projects/${p.slug}`,
      external: false,
      image: p.image,
      fit: "cover",
      links: [
        { label: "Case study ›", href: `/projects/${p.slug}`, external: false },
        { label: "Repository ↗", href: p.repo, external: true },
      ],
    })),
    ...supporting.map<Tile>((s) => ({
      key: s.name,
      name: s.name,
      group: s.group,
      category: s.category,
      blurb: s.note,
      href: s.live ?? s.repo,
      external: true,
      image: s.image,
      fit: s.fit,
      links: [...(s.live ? [{ label: "Live ↗", href: s.live, external: true }] : []), { label: "Repository ↗", href: s.repo, external: true }],
    })),
  ];
  const groups = Array.from(new Set(tiles.map((t) => t.group)));

  return (
    <>
      <Nav />
      <Reveal />
      <main className="mx-auto w-full px-5" style={{ maxWidth: "var(--page-max-width)", paddingTop: 140 }}>
        <div
          className="flex items-baseline justify-between caption"
          style={{
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--ink)",
            paddingBottom: 14,
            borderBottom: "1px solid var(--ash)",
          }}
        >
          <span>Projects</span>
          <span className="muted">{String(tiles.length).padStart(2, "0")} in total</span>
        </div>
        <div className="grid gap-6 md:grid-cols-[1fr_1.4fr] md:items-end" style={{ marginTop: 40, marginBottom: 56 }}>
          <h1 className="heading-lg">All the work.</h1>
          <p className="lead muted" style={{ maxWidth: 560 }}>
            The systems built end to end, the final-year project they grew out of, and the coursework before that. Filter by area, or browse the lot.
          </p>
        </div>
        <ProjectGrid tiles={tiles} groups={groups} />
      </main>
      <div style={{ paddingTop: "var(--section-gap)" }}>
        <Footer />
      </div>
    </>
  );
}
