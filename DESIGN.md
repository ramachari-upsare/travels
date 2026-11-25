# Design System — Manasvi Tours & Travels

Tokens, rules and components that every screen is built from.
No one-off styles; every value comes from here.

---

## Colours (60 / 30 / 10)

| Role | Token | Hex | Usage |
|------|-------|-----|-------|
| 60 % calm | `--calm` | `#D5CED6` | Page background |
| | `--calm-soft` | `#E6E1E8` | Alternate section bg, booking bg |
| | `--calm-light` | `#F4F1F5` | Card surfaces, inputs bg |
| | `--white` | `#FFFFFF` | Input fields, modal bg |
| 30 % navy | `--navy` | `#1B365A` | Header, hero, dark sections, headings, body text |
| | `--navy-deep` | `#122440` | Footer bg, pressed states |
| | `--steel` | `#7495B9` | Icons, borders, detail text, section labels |
| 10 % accent | `--orange` | `#DF6C43` | Primary buttons, prices |
| | `--orange-deep` | `#C4592F` | Button hover / pressed |
| | `--orange-text` | `#B4502A` | Prices on light bg (AA safe) |
| | `--blush` | `#E2A498` | Hover tint only |

> **Rules**
> - Button text is always **bold ≥ 18 px white** on `--orange`.
> - Prices use `--orange-text` at ≥ 22 px bold to pass AA on `--calm-light`.
> - `--steel` is never used for body text on calm backgrounds (2:1 fail).
> - `--navy` is body-text colour everywhere (7.9:1 on calm, 10.9:1 on calm-light).

---

## Typography

| Token | Family | Weights | Usage |
|-------|--------|---------|-------|
| `--font-display` | Bricolage Grotesque | 600, 700, 800 | Headings, section labels, prices |
| `--font-body` | DM Sans | 400, 500, 700 | Body text, buttons, inputs |

Both loaded from Google Fonts with `font-display: swap`.

### Type scale

| Name | Size | Weight | Letter-spacing | Line-height |
|------|------|--------|----------------|-------------|
| hero-title | `clamp(36px, 8vw, 64px)` | 800 | −0.03 em | 1.05 |
| section-title | `clamp(28px, 4.5vw, 42px)` | 800 | −0.02 em | 1.08 |
| card-title | 22 px | 800 | −0.01 em | 1.15 |
| price | 26 px | 800 | 0 | 1.15 |
| body-lg | 18 px | 400 | 0 | 1.6 |
| body | 16 px | 400 | 0 | 1.6 |
| label | 13 px | 700 | 0.08 em | 1.4 |
| caption | 14 px | 500 | 0 | 1.5 |

---

## Spacing (8 px grid)

| Token | Value |
|-------|-------|
| `--s1` | 8 px |
| `--s2` | 16 px |
| `--s3` | 24 px |
| `--s4` | 32 px |
| `--s5` | 48 px |
| `--s6` | 64 px |
| `--s7` | 96 px |

- **Section padding**: `clamp(64px, 8vw, 96px)` block.
- **Container**: `max-width: 1200px`, inline padding `16px` mobile / `24px` tablet+.

---

## Corners (squircle)

```css
--r-card: 24px;      /* cards, photos, modals */
--r-ctl:  20px;      /* buttons, inputs */
--r-sm:   14px;      /* small elements, icons, thumbnails */
--corner: squircle;  /* corner-shape; falls back to normal rounded */
```

Applied once per component, never ad-hoc.

---

## Shadows

| Token | Value |
|-------|-------|
| `--shadow` | `0 1px 2px rgba(20,40,63,.06), 0 8px 24px rgba(20,40,63,.08)` |
| `--shadow-lg` | `0 4px 8px rgba(20,40,63,.08), 0 16px 40px rgba(20,40,63,.14)` |
| `--shadow-hero` | `0 16px 40px rgba(10,20,38,.35)` |

---

## Buttons

| Variant | Background | Border | Text |
|---------|-----------|--------|------|
| Primary (`btn--orange`) | `--orange` | `--orange` | white, bold, ≥ 18 px |
| Ghost (`btn--ghost`) | transparent | white 55 % | white, bold, ≥ 18 px |
| Outline (`btn--outline`) | transparent | `--steel` | `--navy`, bold, ≥ 18 px |

- `min-height: 52px`, `padding: 12px 24px`.
- Hover: primary → `--orange-deep`; outline → `--blush` bg; ghost → white bg + navy text.
- Press: `transform: scale(0.97)` for 120 ms.
- Focus-visible: `3px solid --navy` offset `3px` (white on dark surfaces).
- Squircle corners via `--r-ctl` + `corner-shape: var(--corner)`.

---

## Inputs

- `min-height: 52px`, `font-size: 16px` (stops iOS zoom), `padding: 12px 16px`.
- Background `--white`, border `1px solid --steel`, radius `--r-ctl`.
- Focus: border `--navy` + `box-shadow: 0 0 0 4px rgba(116,149,185,.4)`.
- Error: border `--orange-deep` + `box-shadow: 0 0 0 3px rgba(226,164,152,.6)`.

---

## Section headers (Mr Fashion pattern)

```
<span class="section-label">Fleet</span>        ← 13px, 700, --steel, uppercase, 0.08em spacing
<h2 class="section-title">Our vehicles</h2>     ← clamp scale, 800, --navy
<p class="section-desc">One line of context</p> ← 16px, --muted
```

---

## Photos

- One consistent aspect ratio per context: `4:3` for fleet cards, `16:10` for hero.
- `object-fit: cover`, explicit `width` + `height` attributes, `loading="lazy"` (hero preloaded).
- WebP primary with JPG fallback via `<picture>`.
- Desktop hover: `transform: scale(1.04)` over 400 ms (not on mobile).
- Gallery modal: full-screen overlay, swipe/arrows/Esc, `z-index: 100`.

---

## Dark / light section rhythm (Toolbox pattern)

Alternate sections between `--calm` / `--calm-soft` backgrounds and a `--navy` section for the booking form. This creates a strong visual beat.

| Section | Background |
|---------|-----------|
| Header | `--navy` |
| Hero | `--navy` |
| Fleet | `--calm` |
| Services | `--calm-soft` |
| Booking | `--navy` |
| Contact | `--calm-soft` |
| Footer | `--navy-deep` |

---

## Numbered form groups (Mr Fashion pattern)

```
<div class="form-group">
  <span class="form-group__number">01</span>
  <h3 class="form-group__title">Your details</h3>
  <p class="form-group__helper">We'll use this to reach you.</p>
  <!-- fields -->
</div>
```
