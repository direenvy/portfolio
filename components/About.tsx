import Image from "next/image";
import { certifications, experience } from "@/content/experience";
import { profile } from "@/content/profile";

/* One block, one grid: the portrait on the left, everything else on the right.
   Experience and certifications are spec-style rows — period, one ink line,
   one muted line — divided by hairlines, per the reference. */

function Row({ period, title, detail, mark }: { period: string; title: string; detail: string; mark?: { src: string; alt: string } }) {
  return (
    <li className="grid gap-1 sm:grid-cols-[140px_1fr_auto] sm:items-baseline sm:gap-5" style={{ padding: "16px 0", borderTop: "1px solid var(--ash)" }}>
      <span className="muted" style={{ fontSize: 13, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>
        {period}
      </span>
      <div>
        <p style={{ fontSize: 17, color: "var(--ink)" }}>{title}</p>
        <p className="muted" style={{ fontSize: 15, marginTop: 2 }}>
          {detail}
        </p>
      </div>
      {mark && <Image src={mark.src} alt={mark.alt} width={80} height={20} className="hidden sm:block" style={{ width: "auto", height: 18, alignSelf: "center" }} />}
    </li>
  );
}

function Label({ id, children }: { id?: string; children: string }) {
  return (
    <p id={id} className="caption" style={{ letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink)", marginTop: 56, marginBottom: 4, scrollMarginTop: 80 }}>
      {children}
    </p>
  );
}

export default function About() {
  return (
    <section id="about" className="mx-auto px-5 reveal" style={{ maxWidth: "var(--content-max-width)", paddingTop: "var(--section-gap)" }}>
      <div className="grid gap-10 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:gap-x-16">
        <div>
          {profile.portrait && (
            <div className="frame" style={{ aspectRatio: "4 / 5", maxWidth: 300, position: "relative" }}>
              <Image src={profile.portrait} alt={`${profile.name}, portrait`} fill sizes="(max-width: 768px) 80vw, 320px" style={{ objectFit: "cover", objectPosition: "top" }} />
            </div>
          )}
        </div>
        <div>
          <h2 className="heading">About.</h2>
          <p className="lead" style={{ color: "var(--ink)", marginTop: 24 }}>
            {profile.about}
          </p>
          <p className="muted" style={{ marginTop: 20 }}>
            {profile.education}. Based in {profile.location}.
          </p>
          <div className="flex flex-wrap items-center gap-4" style={{ marginTop: 28 }}>
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

          <Label id="experience">Experience</Label>
          <ol>
            {experience.map((e) => (
              <Row key={e.org + e.period} period={e.period} title={e.role} detail={`${e.org} · ${e.type} · ${e.location}`} mark={e.logo ? { src: e.logo, alt: `${e.org} logo` } : undefined} />
            ))}
          </ol>

          <Label>Certifications</Label>
          <ul>
            {certifications.map((c) => (
              <Row key={c.name} period={c.period} title={c.name} detail={c.issuer} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
