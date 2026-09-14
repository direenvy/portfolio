import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";

/* One project as a gallery exhibit: a 1–3 word heading, the single most
   interesting result, then the screenshot floating on the canvas at 28px
   radius — the object is its own container. */
export default function Exhibit({ project, index, priority = false }: { project: Project; index: number; priority?: boolean }) {
  return (
    <article className="reveal" id={project.slug}>
      <div className="mx-auto px-5" style={{ maxWidth: "var(--content-max-width)" }}>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between" style={{ marginBottom: 40 }}>
          <div style={{ maxWidth: 640 }}>
            <p className="caption muted" style={{ marginBottom: 12, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              {String(index + 1).padStart(2, "0")} · {project.category}
            </p>
            <h2 className="heading">{project.name}</h2>
            <p className="lead" style={{ marginTop: 16, color: "var(--ink)" }}>
              {project.headline}
            </p>
          </div>
          <div className="md:text-right" style={{ minWidth: 260 }}>
            <div className="numeral" style={{ fontSize: 56, lineHeight: 1, color: "var(--ink)" }}>
              {project.result.value}
            </div>
            <p className="muted" style={{ fontSize: 14, lineHeight: 1.4, marginTop: 8, maxWidth: 300 }}>
              {project.result.label}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto px-5" style={{ maxWidth: "var(--page-max-width)" }}>
        <Link href={`/projects/${project.slug}`} className="frame relative block" aria-label={`${project.name}: read more`} style={{ aspectRatio: "16 / 10" }}>
          <Image src={project.image} alt={`${project.name} interface`} fill priority={priority} sizes="(max-width: 1440px) 100vw, 1440px" style={{ objectFit: "cover", objectPosition: "top" }} />
        </Link>
      </div>

      <div className="mx-auto px-5" style={{ maxWidth: "var(--content-max-width)" }}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between" style={{ marginTop: 28 }}>
          <p className="muted" style={{ fontSize: 17, maxWidth: 680 }}>
            {project.oneLine}
          </p>
          <div className="flex items-center gap-5" style={{ fontSize: 17, whiteSpace: "nowrap" }}>
            <Link href={`/projects/${project.slug}`} className="link">
              Read more ›
            </Link>
            <a href={project.repo} target="_blank" rel="noreferrer" className="link">
              Repository ↗
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
