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
1. **Header** — wordmark, phone number, Call button.
2. **Hero** — vehicle photo under a dark teal overlay, one short headline, the four service names on one line, Book Now + WhatsApp, and the single booking form (name, mobile, trip type, pickup, drop optional, date, time optional, car).
3. **Fleet** — four cards (photo, name, seats, `Rs XX per km`, Book This Car) and the toll note underneath.
4. **Services** — the four service names, nothing else.
5. **Contact strip + footer** — phone, WhatsApp, tagline, copyright.
6. **Mobile bar** — Call / WhatsApp / Book Now, hidden from 768px up.

`#reviews-section` is in the tree, empty and `hidden`, ready for real reviews.

## Booking
`src/lib/booking.js` holds the rules and the message: 10-digit mobile validation, no past dates, `28 Nov 2026` and `2:30 pm` formatting, then `encodeURIComponent` into `https://wa.me/919845976916?text=…`. No backend, nothing stored. Fleet buttons set the car in the form and scroll to it.

## Design rules
- One family, Manrope 400/600/800 (`display=swap`).
- 60/30/10: white + `#F4F6F8`, text `#1A2B2B`, teal `#0E5A5A`, orange `#E85A0C` **only** for Book Now buttons and prices. Orange text on white is always 19px bold or larger, which is the AA threshold for large text.
- 8px spacing scale, 8px button radius, 12px card radius, 1px `#E2E7E9` borders, small soft shadow, left-aligned copy.
- Effects are limited to three React Bits components (JS + CSS variants, vendored in `src/components`): **Silk** behind the hero on screens ≥1024px with motion allowed, **SpotlightCard** on fleet cards for mouse users, **BlurText** on the headline once on load. All three degrade to plain CSS; the phone, WhatsApp links and form never depend on them.

## Images
`public/images/` holds `logo.png`, `etios`, `ertiga`, `innova`, `tt`, `tt-interior` as
1200×900 JPG plus a WebP twin. The car and logo files are AI-generated stand-ins
until real photos of the fleet and the real logo are available — replace the files,
keep the names, and nothing else needs to change. The hero image is preloaded; the
rest are lazy-loaded with width/height set.
