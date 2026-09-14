import { profile } from "@/content/profile";

export default function Footer() {
  return (
    <footer className="mx-auto px-5" style={{ maxWidth: "var(--content-max-width)", paddingTop: 48, paddingBottom: 64 }}>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between caption muted">
        <span>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js; the design follows a Refero style reference.
        </span>
        <span className="flex gap-5">
          <a href={profile.github} target="_blank" rel="noreferrer" className="link">
            GitHub
          </a>
          <a href={`mailto:${profile.email}`} className="link">
            Email
          </a>
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link">
              LinkedIn
            </a>
          )}
        </span>
      </div>
    </footer>
  );
}
