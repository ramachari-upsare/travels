# Manasvi Tours & Travels

Mobile-first site for a car-and-driver operator — Vite + React, deployed on Vercel.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static build in dist/
npm run preview    # serve dist/ locally
```

## Vercel settings
`vercel.json` pins them, so the project builds the same whichever preset the dashboard holds:

| Setting | Value |
| --- | --- |
| Framework | Vite |
| Install command | `npm install` |
| Build command | `npm run build` |
| Output directory | `dist` |

## Page
1. **Header** — wordmark, Call button.
2. **Hero** — navy surface with soft steel/blush depth, tagline, headline, the four service names on one line, Book Now + Call, and framed Innova Crysta photo. No form in the hero.
3. **Services** — the four service names with steel-blue icons, 2×2 on phones and one row on desktop.
4. **Fleet** — four cards (photo, name, seats, `Rs XX per km`, Book This Car, plus Tempo Traveller interior toggle), horizontal snap scrolling on phones and one row on desktop, toll note underneath.
5. **Booking** — the one form (name, mobile, trip type, pickup, drop optional, date, time optional, car) with a visible call option.
6. **Contact strip + footer** — phone, Call/WhatsApp, tagline, copyright.
7. **Mobile bar** — Call / WhatsApp / Book Now, hidden from 768px up.

`#reviews-section` is in the tree, empty and `hidden`, ready for real reviews.

## Booking
`src/lib/booking.js` holds the rules and the message: 10-digit mobile validation, no past dates, `28 Nov 2026` and `2:30 pm` formatting, then `encodeURIComponent` into `https://wa.me/919845976916?text=…`. No backend, nothing stored. Fleet buttons set the car in the form and scroll to it.

## Design rules
- **Type:** Bricolage Grotesque 600–800 for headings, DM Sans for body, both `display=swap`.
- **60/30/10:** calm `#D5CED6` (tints `#E6E1E8` / `#F4F1F5`) for page and cards; navy `#1B365A` for header, hero, footer and headings; steel `#7495B9` for borders and details (never text — it is 2:1 on the calm background); orange `#DF6C43` for every primary button; blush `#E2A498` only as a hover tint.
- Prices use a darker tint of the same orange, `#B4502A`, so they clear AA at any size. Button labels are 19px bold white on orange (AA for large text, 3.3:1).
- **Squircle corners:** `--r-card: 24px` and `--r-ctl: 20px` with `corner-shape: squircle` (`--corner`). Applied to cards, buttons, inputs and photos; browsers without `corner-shape` fall back to plain rounded corners.
- 8px spacing scale, 1px borders, small soft shadow, left-aligned copy.
- One effect, restrained: React Bits **Silk** (JS + CSS variant, vendored in `src/components`) behind the hero, as a lazy chunk on screens ≥1024px with motion allowed. Phones and `prefers-reduced-motion` get a static navy gradient with a faint dot pattern. Call, WhatsApp and the form never depend on it.

## Images
`public/images/` holds `logo.png`, `etios`, `ertiga`, `innova`, `tt`, `tt-interior` as
1200×900 JPG plus a WebP twin. The car and logo files are AI-generated stand-ins
until real photos of the fleet and the real logo are available — replace the files,
keep the names, and nothing else needs to change. The hero image is preloaded; the
rest are lazy-loaded with width/height set.
