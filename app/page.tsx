import Exhibit from "@/components/Exhibit";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import { profile } from "@/content/profile";
import { projects, stats, supporting } from "@/content/projects";

export default function Home() {
  return (
    <>
      <Nav />
      <Reveal />
      <main>
        <Hero />

        {/* The system, in numbers — ink block with huge numerals, FYP-style. */}
        <section className="mx-auto px-5 reveal" style={{ maxWidth: "var(--page-max-width)", marginTop: 24 }}>
          <div style={{ background: "var(--ink)", borderRadius: "var(--radius-cards)", padding: "clamp(40px, 5vw, 72px)" }}>
            <p className="caption" style={{ color: "#86868b", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 40 }}>
              The work, in numbers
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="numeral" style={{ fontSize: "clamp(36px, 4.4vw, 64px)", lineHeight: 1, color: "#f5f5f7" }}>
                    {s.value}
                  </div>
                  <p style={{ color: "#86868b", fontSize: 17, marginTop: 12, maxWidth: 260 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Exhibits */}
        <section id="work" style={{ paddingTop: "var(--section-gap)" }}>
          <div className="mx-auto px-5 reveal" style={{ maxWidth: "var(--content-max-width)", marginBottom: 80 }}>
            <h2 className="heading-lg">Four systems.</h2>
            <p className="lead muted" style={{ marginTop: 20, maxWidth: 620 }}>
              Each one covers a category employers screen for, and each was measured before it was allowed to claim anything.
              The decision worth explaining is on every page — including the ones that went the other way.
            </p>
          </div>
          <div className="flex flex-col" style={{ gap: "var(--section-gap)" }}>
            {projects.map((p, i) => (
              <Exhibit key={p.slug} project={p} index={i} priority={i === 0} />
            ))}
          </div>
        </section>

        {/* Supporting work */}
        <section className="mx-auto px-5 reveal" style={{ maxWidth: "var(--content-max-width)", paddingTop: "var(--section-gap)" }}>
          <h2 className="heading">Also.</h2>
          <div className="grid gap-4 md:grid-cols-3" style={{ marginTop: 40 }}>
            {supporting.map((s) => (
              <div key={s.name} className="card" style={{ padding: 28 }}>
                <h3 className="label">{s.name}</h3>
                <p className="muted" style={{ fontSize: 15, lineHeight: 1.47, marginTop: 10, minHeight: 66 }}>
                  {s.note}
                </p>
                <div className="flex gap-4" style={{ marginTop: 16, fontSize: 15 }}>
                  {s.live && (
                    <a href={s.live} target="_blank" rel="noreferrer" className="link">
                      Live ↗
                    </a>
                  )}
                  <a href={s.repo} target="_blank" rel="noreferrer" className="link">
                    Repository ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="mx-auto px-5 reveal" style={{ maxWidth: "var(--content-max-width)", paddingTop: "var(--section-gap)" }}>
          <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
            <div>
              <h2 className="heading">About.</h2>
            </div>
            <div>
              <p className="lead" style={{ color: "var(--ink)" }}>
                {profile.intro}
              </p>
              <p className="muted" style={{ marginTop: 24 }}>
                {profile.education}. Based in {profile.location}.
              </p>
              <div className="flex flex-wrap items-center gap-4" style={{ marginTop: 32 }}>
                <a href={`mailto:${profile.email}`} className="btn-primary">
                  Email me
                </a>
                <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost">
                  GitHub
                </a>
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <div style={{ paddingTop: "var(--section-gap)" }}>
        <Footer />
      </div>
    </>
  );
}
