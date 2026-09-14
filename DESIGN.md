# Apple (España) — Style Reference
> gallery vitrine in morning fog

**Theme:** light

Source: styles.refero.design (extracted from apple.com/airpods-pro). Chosen by the owner
for the portfolio site on 14 Sep 2026. The project pages (Sentinel, Sitewatch, Trackside,
Kaunter) use the *Column* design system instead; this one is for the shopfront only.

Apple's product page visual system is a near-monochrome cathedral of negative space where a single product floats centered under enormous display type. The canvas is fog-gray #f5f5f7 with pure white surfaces layered above, and the entire chromatic range is reduced to one precise blue (#0071e3) that exists only to make the buy button switch on. Typography carries the design: SF Pro Display at weight 600 with aggressive negative tracking at 56–96px creates headlines that feel carved rather than typed, while body copy at 17–21px stays whisper-thin to let the product breathe. Components are reduced to essential geometry — pill buttons at 980px radius, rounded cards at 28px, no shadows, no decorative borders — so the imagery and type do all the emotional work.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Apple Ink | `#1d1d1f` | `--color-apple-ink` | Primary text, card borders, structural outlines |
| Fog Canvas | `#f5f5f7` | `--color-fog-canvas` | Page background, badge fills, secondary surfaces |
| Pure White | `#ffffff` | `--color-pure-white` | Card surfaces, elevated layers above fog canvas |
| Graphite | `#707070` | `--color-graphite` | Secondary text, subdued borders, nav dividers |
| Slate | `#86868b` | `--color-slate` | Muted helper text, tertiary metadata |
| Charcoal | `#333336` | `--color-charcoal` | Nav bar elements, button borders on dark surfaces |
| Smoke | `#474747` | `--color-smoke` | Nav text and borders |
| Iron | `#5b5b61` | `--color-iron` | Body text in lower-emphasis contexts |
| Ash | `#e8e8ed` | `--color-ash` | Ghost button backgrounds, inactive chip surfaces |
| Electric Blue | `#0071e3` | `--color-electric-blue` | Primary action button fill — the only chromatic surface |
| Link Blue | `#0066cc` | `--color-link-blue` | Inline text links only |
| Iridescent Spectrum | `linear-gradient(60deg, rgb(8,148,255) 0%, rgb(201,89,221) 40%, rgb(255,46,84) 67%, rgb(255,144,3) 100%)` | `--gradient-iridescent-spectrum` | Decorative imagery only, never UI controls |

## Tokens — Typography

**SF Pro Display** (substitute: **Inter Tight**, weight 600) — display and headings at 56–96px.
Tracking tightens below 32px and opens above 56px: -0.015em @19, -0.012em @21, -0.009em @28,
-0.005em @32, +0.004em @56, +0.007em @72, +0.009em @80, +0.012em @96. Line-height 1.07 at display sizes.

**SF Pro Text** (substitute: **Inter**, weight 400/600) — body 17px, lead 20px, caption 12px.
Tracking -0.022em @12, -0.019em @17, -0.01em @20. Line-height 1.47.

| Role | Size | Line Height | Letter Spacing |
|------|------|-------------|----------------|
| caption | 12px | 1.33 | -0.22px |
| body-sm | 17px | 1.47 | -0.32px |
| body | 20px | 1.47 | -0.2px |
| subheading | 28px | 1.14 | -0.25px |
| heading-sm | 32px | 1.19 | -0.16px |
| heading | 56px | 1.07 | 0.22px |
| heading-lg | 72px | 1.07 | 0.5px |
| display | 96px | 1.07 | 1.15px |

## Spacing, shape, layout

Base unit 4px. Scale: 4 8 12 16 20 24 28 32 40 44 48 52 76 80 100 160.
Radius: cards/images 28px, buttons/nav 980px (pill), chips 999px. Never below 18px.
Page max-width 1440px, section gap 120px, card padding 28px, element gap 10px.

## Components

- **Nav bar** — 48px, `#1d1d1f` at 0.8 opacity with backdrop blur, inner max-width 1024px, 12px text in `#f5f5f7`.
- **Hero** — product visual centred in the top 60–80vh directly on fog canvas (no frame). Headline block lower-left: label 21px/600, headline 56–80px/600 lh 1.07, subtext 17px `#707070`.
- **Primary button** — pill, `#0071e3` fill, white 17px text, padding 8px 16px, no border/shadow. The only place the blue appears.
- **Ghost button** — 1px `#1d1d1f` border, pill, transparent; hover fills ink with white text.
- **Inline link** — 17px `#0066cc`, no underline, optional arrow.
- **Feature section** — 1–3 word heading at 32–56px left-aligned, 80–120px breathing room, then a full-width 28px-radius image.
- **Badge chip** — `#f5f5f7` fill, 999px radius, 4px 10px padding, 12px text.

## Do / Don't

Do: blue only for the primary action; all headlines Display 600 lh 1.07; surfaces fog → white → ash only; 28px radius on images/cards; body 17px; whitespace is the only divider; centre visuals, headline lower-left.

Don't: shadows, gradients or elevation on cards/buttons; accent colours beyond the palette; headlines under 32px; radius under 18px; blue on text/borders/icons; decorative rules between sections; serif or display faces.

## Elevation

Flat. Depth from surface progression `#f5f5f7 → #ffffff → #e8e8ed` and type scale, never shadows.

## Imagery

The product is the entire visual language — centred, unframed, 60–80% of viewport width. Lifestyle imagery tight and near-monochrome. No stock, no illustration. (For this portfolio: the four project screenshots/clips are the "products".)

## Quick Start — CSS custom properties

```css
:root {
  --color-apple-ink: #1d1d1f;
  --color-fog-canvas: #f5f5f7;
  --color-pure-white: #ffffff;
  --color-graphite: #707070;
  --color-slate: #86868b;
  --color-charcoal: #333336;
  --color-smoke: #474747;
  --color-iron: #5b5b61;
  --color-ash: #e8e8ed;
  --color-electric-blue: #0071e3;
  --color-link-blue: #0066cc;
  --gradient-iridescent-spectrum: linear-gradient(60deg, rgb(8, 148, 255) 0%, rgb(201, 89, 221) 40%, rgb(255, 46, 84) 67%, rgb(255, 144, 3) 100%);

  --font-display: 'Inter Tight', ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-text: 'Inter', ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;

  --text-caption: 12px;  --leading-caption: 1.33;  --tracking-caption: -0.22px;
  --text-body-sm: 17px;  --leading-body-sm: 1.47;  --tracking-body-sm: -0.32px;
  --text-body: 20px;     --leading-body: 1.47;     --tracking-body: -0.2px;
  --text-subheading: 28px; --leading-subheading: 1.14; --tracking-subheading: -0.25px;
  --text-heading-sm: 32px; --leading-heading-sm: 1.19; --tracking-heading-sm: -0.16px;
  --text-heading: 56px;  --leading-heading: 1.07;  --tracking-heading: 0.22px;
  --text-heading-lg: 72px; --leading-heading-lg: 1.07; --tracking-heading-lg: 0.5px;
  --text-display: 96px;  --leading-display: 1.07;  --tracking-display: 1.15px;

  --page-max-width: 1440px;
  --section-gap: 120px;
  --card-padding: 28px;
  --element-gap: 10px;

  --radius-cards: 28px;
  --radius-images: 28px;
  --radius-buttons: 980px;
  --radius-tags: 999px;
}
```
