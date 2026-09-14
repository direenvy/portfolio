# Portfolio

The site at the front of four projects — Sentinel, Sitewatch, Trackside and Kaunter — each
built, measured and documented before it was allowed on this page.

![Home page: the headline "Models that show their working" above a framed montage of the four projects in use](docs/hero.png)

## What's on it

- **Home** — a looping, muted montage of the four apps recorded from the running software
  (no stock footage), the work in four numbers, one exhibit per project with its single most
  interesting result, supporting work, and contact.
- **One page per project** (`/projects/<slug>`) — the problem, the approach, the numbers,
  the decision worth explaining, and what it doesn't do. Every figure comes from that
  project's README; nothing on this site is quoted that wasn't measured there.

![Project page for Kaunter: headline, stack chips, the interface screenshot and the structured sections](docs/project.png)

## Design

The Refero style reference **"Apple (España) — gallery vitrine in morning fog"**, kept in
[DESIGN.md](DESIGN.md): fog-grey canvas, near-monochrome, one blue reserved for the primary
action, Inter Tight display type at 56–96px standing in for SF Pro Display, 28px card radius,
pill buttons, no shadows, and whitespace as the only divider. The four project interfaces
use a different system (Column) on purpose: the shopfront and the exhibits are not the same
object.

The hero montage is `public/hero.mp4` (28 s, 2.7 MB, h264). It was recorded with
`scripts/record.py`, which drives each app with Playwright, and stitched with ffmpeg
(`xfade`, 0.6 s). Re-record by starting a project's frontend on :3000 (and API on :8000) and
running `python scripts/record.py <sentinel|sitewatch|trackside|kaunter>`.

## Running it

```bash
npm install && npm run dev
```

Static export: every page is prerendered at build time. Content lives in `content/` —
`profile.ts` for the person, `projects.ts` for the four exhibits and the supporting work.

## Deploy

Vercel, framework preset Next.js, no environment variables.
