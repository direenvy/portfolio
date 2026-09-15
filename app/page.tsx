import Link from "next/link";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import ProjectCarousel from "@/components/ProjectCarousel";
import Reveal from "@/components/Reveal";
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
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-5">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="numeral" style={{ fontSize: "clamp(32px, 3.4vw, 52px)", lineHeight: 1, color: "#f5f5f7" }}>
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

        <About />
      </main>
      <div style={{ paddingTop: "var(--section-gap)" }}>
        <Footer />
      </div>
    </>
  );
}
