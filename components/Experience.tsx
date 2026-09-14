import Image from "next/image";
import { certifications, experience } from "@/content/experience";

/* Experience as a plain list: an employer mark in a fixed column, then role,
   organisation, dates and place. No timeline graphics; hairlines divide rows,
   per the reference. */
export default function Experience() {
  return (
    <section id="experience" className="mx-auto px-5 reveal" style={{ maxWidth: "var(--content-max-width)", paddingTop: "var(--section-gap)" }}>
      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="heading">Experience.</h2>
        </div>
        <div>
          <ol>
            {experience.map((e, i) => (
              <li key={e.org + e.start} className="grid gap-4 sm:grid-cols-[120px_1fr] sm:gap-8" style={{ padding: i === 0 ? "0 0 28px" : "28px 0", borderTop: i === 0 ? "none" : "1px solid var(--ash)" }}>
                <div className="flex items-start" style={{ height: 40 }}>
                  {e.logo ? (
                    <Image src={e.logo} alt={`${e.org} logo`} width={120} height={40} style={{ width: "auto", height: 30, maxWidth: 120, objectFit: "contain", objectPosition: "left center" }} />
                  ) : (
                    <span aria-hidden="true" className="flex items-center justify-center numeral" style={{ width: 40, height: 40, borderRadius: 999, background: "var(--ash)", fontSize: 14, letterSpacing: "0.02em" }}>
                      {e.monogram}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="label" style={{ fontSize: 19 }}>
                    {e.role}
                  </h3>
                  <p style={{ fontSize: 15, marginTop: 4 }}>
                    {e.org} <span className="muted">· {e.type}</span>
                  </p>
                  <p className="caption muted" style={{ marginTop: 6, fontSize: 13 }}>
                    {e.start} – {e.end} · {e.location}
                  </p>
                  {e.summary && (
                    <p className="muted" style={{ fontSize: 15, lineHeight: 1.47, marginTop: 10 }}>
                      {e.summary}
                    </p>
                  )}
                  {e.skills && (
                    <div className="flex flex-wrap gap-2" style={{ marginTop: 12 }}>
                      {e.skills.map((s) => (
                        <span key={s} className="chip">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <div style={{ marginTop: 40 }}>
            <p className="caption" style={{ letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink)", paddingBottom: 12, borderBottom: "1px solid var(--ash)" }}>
              Certifications
            </p>
            <ul>
              {certifications.map((c) => (
                <li key={c.name} style={{ padding: "14px 0", borderBottom: "1px solid var(--ash)", fontSize: 15 }}>
                  <p>{c.name}</p>
                  <p className="muted" style={{ fontSize: 13, marginTop: 2 }}>
                    {c.issuer} · {c.year}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
