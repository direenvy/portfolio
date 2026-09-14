import Image from "next/image";
import Link from "next/link";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import ProjectCarousel from "@/components/ProjectCarousel";
import Reveal from "@/components/Reveal";
import { profile } from "@/content/profile";
import { projects, stats } from "@/content/projects";

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

        {/* Projects */}
        <section id="work" className="mx-auto px-5 reveal" style={{ maxWidth: "var(--page-max-width)", paddingTop: "var(--section-gap)" }}>
          <div className="flex items-baseline justify-between caption" style={{ letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink)", paddingBottom: 14, borderBottom: "1px solid var(--ash)", marginBottom: 32 }}>
            <span>Projects</span>
            <Link href="/projects" className="link" style={{ letterSpacing: "0.08em" }}>
              All projects ›
            </Link>
          </div>
          <ProjectCarousel projects={projects} />
        </section>

        {/* About */}
        <section id="about" className="mx-auto px-5 reveal" style={{ maxWidth: "var(--content-max-width)", paddingTop: "var(--section-gap)" }}>
          <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
            <div>
              <h2 className="heading">About.</h2>
              {profile.portrait && (
                <div className="frame" style={{ aspectRatio: "4 / 5", maxWidth: 320, marginTop: 32, position: "relative" }}>
                  <Image src={profile.portrait} alt={`${profile.name}, portrait`} fill sizes="(max-width: 768px) 80vw, 320px" style={{ objectFit: "cover", objectPosition: "top" }} />
                </div>
              )}
            </div>
            <div>
              <p className="lead" style={{ color: "var(--ink)" }}>
                {profile.about}
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

        <Experience />
      </main>
      <div style={{ paddingTop: "var(--section-gap)" }}>
        <Footer />
      </div>
    </>
  );
}
