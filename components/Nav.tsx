import Link from "next/link";
import { profile } from "@/content/profile";

/* 48px translucent ink bar, per the reference: floats over content with a
   backdrop blur, 12px text, no borders. */
export default function Nav() {
  return (
    <nav
      className="fixed inset-x-0 top-0 z-30"
      style={{ height: 48, background: "rgba(29, 29, 31, 0.8)", backdropFilter: "saturate(180%) blur(20px)", WebkitBackdropFilter: "saturate(180%) blur(20px)" }}
    >
      <div className="mx-auto flex h-full items-center justify-between px-5" style={{ maxWidth: "var(--content-max-width)" }}>
        <Link href="/" style={{ color: "#f5f5f7", fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>
          {profile.name}
        </Link>
        <div className="flex items-center gap-6" style={{ fontSize: 12, letterSpacing: "-0.01em" }}>
          <Link href="/projects" style={{ color: "#f5f5f7" }}>
            Projects
          </Link>
          <Link href="/#about" style={{ color: "#f5f5f7" }}>
            About
          </Link>
          <Link href="/#experience" style={{ color: "#f5f5f7" }}>
            Experience
          </Link>
          <a href={profile.github} target="_blank" rel="noreferrer" style={{ color: "#f5f5f7" }}>
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
