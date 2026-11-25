# Manasvi Tours & Travels

Single-file website for a taxi and tour operator in Bengaluru — **`index.html`** (HTML + CSS + vanilla JS, no build step, no dependencies).

## Preview locally
```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Page order
Header → hero (headline, Book Now + WhatsApp, quick booking form) → popular
routes strip → services → fleet + rate table → how it works → full booking
form → why book with us → hidden reviews block → FAQ → closing CTA → footer →
mobile Call / WhatsApp / Book Now bar.

## Design rules
- **Font:** Manrope 400 / 600 / 800 (Google Fonts) — nothing else.
- **Colours (60-30-10)** — CSS variables at the top of `<style>`:
  - 60% `--white` `#FFFFFF` and `--grey` `#F4F6F8` for page and section backgrounds; body text `--ink` `#1A2B2B`.
  - 30% `--teal` `#0E5A5A` for the header, hero overlay, headings and footer.
  - 10% `--orange` `#E85A0C` **only** for Book Now buttons, prices, and the call / WhatsApp buttons. Text on orange is white 800 at 19px or larger.
  - Orange on white is 3.56:1, which clears WCAG AA for large text only — never set orange text below 19px bold.
- **Surfaces:** solid colours, 1px `--line` borders, `--shadow` (small and soft), radius 8px for buttons and 12px for cards.
- **Motion:** hover colour changes and smooth scrolling only. No blur, glass, gradients, parallax or scroll animation.
- **Layout:** mobile-first, left-aligned text, 4:3 photo crops everywhere. Breakpoints at 600 / 768 / 980 / 1024px.
- **Spacing:** 8px scale for section padding, grid gaps and card padding (section rhythm `clamp(56px, 7vw, 88px)`); 4px steps only for control padding. Text measures cap at 62–68 characters.

## Images
Drop these into `./images/` and they appear automatically:

`logo.png`, `etios.jpg`, `ertiga.jpg`, `innova.jpg`, `tt.jpg`, `tt-interior.jpg`

Until a file exists, the frame shows a grey card with a small car outline and the
vehicle name instead of a broken image (no layout shift). All photos use
`object-fit: cover` in a 4:3 box, and everything below the hero is lazy-loaded.

## Editing
- **Phone / WhatsApp** — search for `9845976916` (displayed) and `+919845976916` (links). The number appears in the header, hero, both forms, FAQ, CTA, footer, mobile bar and the JavaScript `WHATSAPP_NUMBER` constant.
- **Fleet prices** — three places to keep in sync: the fleet cards (`.car-price`), the rate table (`.rates`) and the JSON-LD `makesOffer` block. Seat counts also live in the `<select>` options and in `CAR_SEATS` in the script.
- **Reviews** — `#reviews-section` is in the markup, empty and `hidden`. Add real reviews inside it, then remove `hidden`. No demo reviews are shown.
- **SEO** — before deploying, replace `./images/tt.jpg` in the Open Graph / Twitter tags with a full `https://` URL, and add a `"url"` field to the LocalBusiness JSON-LD.

## Booking flow
Both forms share one handler. It validates required fields, the 10-digit mobile
number and the pickup date, writes a neatly formatted message (name, mobile, trip
type, pickup, drop, formatted date and time, car, passengers, notes), URL-encodes
it with `encodeURIComponent` and opens `https://wa.me/919845976916?text=…`.
There is no backend and nothing is stored. Fleet "Book Now" buttons pre-select the
car in both forms, and a seat warning appears if the group is larger than the
chosen car. Every failure path still shows "Or call 9845976916".
