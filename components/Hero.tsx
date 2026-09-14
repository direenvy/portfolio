import { profile } from "@/content/profile";

/* Apple-style hero: enormous headline on the fog canvas, then the product
   floating centred beneath it — here the product is a muted, looping montage
   of the four projects in use, in a 28px frame, with the reference's
   iridescent light-ring as a soft glow behind it. */
export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: "var(--canvas)", paddingTop: 140 }}>
      <div className="mx-auto px-5 text-center" style={{ maxWidth: "var(--content-max-width)" }}>
        <span className="chip" style={{ marginBottom: 24 }}>
          <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: 999, background: "var(--ink)", marginRight: 8 }} />
          {profile.availability}
        </span>
        <p className="label" style={{ marginBottom: 16 }}>
          {profile.greeting}
        </p>
        <h1 className="display mx-auto" style={{ maxWidth: 1000 }}>
          {profile.headline}
        </h1>
        <p className="muted mx-auto" style={{ fontSize: 20, lineHeight: 1.47, letterSpacing: "-0.01em", marginTop: 24, maxWidth: 680 }}>
          {profile.intro}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4" style={{ marginTop: 32 }}>
          <a href="#work" className="btn-primary">
            See the work
          </a>
          <a href={`mailto:${profile.email}`} className="btn-ghost">
            Get in touch
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="link" style={{ fontSize: 17 }}>
            GitHub ↗
          </a>
        </div>
      </div>

      <div className="relative mx-auto px-5" style={{ maxWidth: 1240, marginTop: 72 }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            inset: "6% 4%",
            background: "var(--spectrum)",
            filter: "blur(80px)",
            opacity: 0.28,
            borderRadius: "50%",
          }}
        />
        <div className="frame relative" style={{ aspectRatio: "16 / 10", background: "var(--white)" }}>
          <video className="h-full w-full object-cover" autoPlay muted loop playsInline poster="/hero.jpg" aria-label="The four projects in use: Sentinel scoring a transaction, Sitewatch detecting unprotected heads, Trackside's station-premium charts, Kaunter answering with citations">
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </div>
        <p className="caption muted text-center" style={{ marginTop: 16 }}>
          Sentinel · Sitewatch · Trackside · Kaunter — recorded from the running apps, not mocked up.
        </p>
      </div>
    </section>
  );
}
