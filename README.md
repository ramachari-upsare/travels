# Manasvi Tours & Travels

Single-file website for a taxi and tour operator in Bengaluru — **`index.html`** (HTML + CSS + vanilla JS, no build step, no dependencies).

## Preview locally
```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Images
Drop these into `./images/` and they appear automatically:

`logo.png`, `etios.jpg`, `ertiga.jpg`, `innova.jpg`, `tt.jpg`, `tt-interior.jpg`

Until a file exists, the site shows a clean branded gradient placeholder instead of a broken image (no layout shift). Vehicle photos are displayed with `object-fit: cover` and lazy loading.

## Editing
- **Colours** — CSS variables at the top of the `<style>` block: `--navy`, `--white`, `--light`, `--impact`. Orange (`--impact`) is used only for booking buttons, prices, key accents and the floating call/WhatsApp buttons.
- **Phone / WhatsApp** — search for `9845976916` (displayed) and `+919845976916` (links). The number appears in the header, hero, booking form, footer, floating buttons and the JavaScript `wa.me` URL.
- **Fleet prices** — update the fleet cards, the vehicle `<select>` options (`data-seats` / `data-rate`) and the JSON-LD `makesOffer` block.
- **Reviews** — `#reviews-section` is empty and `hidden`. Add real reviews inside `#reviews-list`, then remove the `hidden` attribute. No demo reviews are shown.
- **SEO** — before deploying, replace `./images/tt.jpg` in the Open Graph/Twitter tags with a full `https://` URL.

## Booking flow
The form validates everything client-side, then opens WhatsApp (`wa.me/919845976916`) with a pre-filled, URL-encoded message. There is no backend and nothing is stored.
