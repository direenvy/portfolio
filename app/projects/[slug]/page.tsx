import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import { projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.name} — ${p.headline}`, description: p.oneLine, openGraph: { images: [p.image] } } : {};
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="reveal grid gap-6 md:grid-cols-[1fr_2fr]" style={{ paddingTop: 80 }}>
      <h2 className="heading-sm">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  const index = projects.findIndex((x) => x.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <Nav />
      <Reveal />
      <main style={{ paddingTop: 48 }}>
        <header className="mx-auto px-5" style={{ maxWidth: "var(--content-max-width)", paddingTop: 100, paddingBottom: 56 }}>
          <p className="caption muted" style={{ letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 16 }}>
            {String(index + 1).padStart(2, "0")} · {p.category}
          </p>
          <p className="label" style={{ marginBottom: 12 }}>
            {p.name}
          </p>
          <h1 className="heading-lg" style={{ maxWidth: 900 }}>
            {p.headline}
          </h1>
          <p className="lead muted" style={{ marginTop: 24, maxWidth: 680 }}>
            {p.oneLine}
          </p>
          <div className="flex flex-wrap items-center gap-4" style={{ marginTop: 32 }}>
            <a href={p.repo} target="_blank" rel="noreferrer" className="btn-primary">
              View the repository
            </a>
            <div className="flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </header>

        <div className="mx-auto px-5" style={{ maxWidth: "var(--page-max-width)" }}>
          <div className="frame">
            <Image src={p.image} alt={`${p.name} interface`} width={2880} height={2360} priority sizes="(max-width: 1440px) 100vw, 1440px" />
          </div>
        </div>

        <div className="mx-auto px-5" style={{ maxWidth: "var(--content-max-width)" }}>
          <Section title="The problem">
            <p className="lead" style={{ color: "var(--ink)" }}>
              {p.problem}
            </p>
          </Section>

          <Section title="The approach">
            <ol className="flex flex-col gap-4" style={{ fontSize: 17, color: "var(--ink)" }}>
              {p.approach.map((a, i) => (
                <li key={i} className="grid gap-4" style={{ gridTemplateColumns: "32px 1fr" }}>
                  <span className="numeral muted" style={{ fontSize: 17 }}>
                    {i + 1}
                  </span>
                  <span>{a}</span>
                </li>
              ))}
            </ol>
          </Section>

          <Section title="The numbers">
            <div className="card" style={{ padding: 28 }}>
              <dl className="grid gap-y-5 gap-x-8 sm:grid-cols-2">
                {p.numbers.map((n) => (
                  <div key={n.label}>
                    <dt className="muted" style={{ fontSize: 14 }}>
                      {n.label}
                    </dt>
                    <dd className="numeral" style={{ fontSize: 24, lineHeight: 1.15, marginTop: 4 }}>
                      {n.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Section>
        </div>

        {p.extraImage && (
          <div className="mx-auto px-5 reveal" style={{ maxWidth: "var(--page-max-width)", paddingTop: 80 }}>
            <div className="frame">
              <Image src={p.extraImage.src} alt={p.extraImage.alt} width={2880} height={2000} sizes="(max-width: 1440px) 100vw, 1440px" />
            </div>
          </div>
        )}

        <div className="mx-auto px-5" style={{ maxWidth: "var(--content-max-width)" }}>
          <Section title="The decision worth explaining">
            <h3 className="subheading" style={{ marginBottom: 16 }}>
              {p.decision.title}
            </h3>
            <p style={{ fontSize: 17, color: "var(--ink)" }}>{p.decision.body}</p>
          </Section>

          <Section title="What it doesn't do">
            <ul className="flex flex-col gap-3" style={{ fontSize: 17 }}>
              {p.limits.map((l, i) => (
                <li key={i} className="muted">
                  {l}
                </li>
              ))}
            </ul>
          </Section>

          <div className="reveal flex flex-col gap-4 md:flex-row md:items-center md:justify-between" style={{ paddingTop: 100 }}>
            <Link href="/projects" className="link" style={{ fontSize: 17 }}>
              ‹ All projects
            </Link>
            <Link href={`/projects/${next.slug}`} className="btn-ghost">
              Next: {next.name} ›
            </Link>
          </div>
        </div>
      </main>
      <div style={{ paddingTop: 80 }}>
        <Footer />
      </div>
    </>
  );
}
