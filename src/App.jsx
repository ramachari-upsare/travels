import { useCallback, useState } from 'react';
import HeroBackground from './components/HeroBackground.jsx';
import BookingForm from './components/BookingForm.jsx';
import Gallery from './components/Gallery.jsx';
import { CARS, PHONE_DISPLAY, PHONE_TEL, TAGLINE, TRIP_TYPES, WHATSAPP_URL } from './lib/booking.js';

/* ── icons ────────────────────────────────────────────────────────── */
const SERVICE_ICONS = {
  Local: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-6-5.4-6-10a6 6 0 1 1 12 0c0 4.6-6 10-6 10Z" />
      <circle cx="12" cy="11" r="2.2" />
    </svg>
  ),
  Outstation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19 9 5M20 19 15 5M12 6v2M12 11v2M12 16v3" />
    </svg>
  ),
  'Airport pick-up and drop': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2Z" />
    </svg>
  ),
  'All-India service': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <polygon points="15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5 15.5 8.5" />
    </svg>
  )
};

const NAV_LINKS = [
  { label: 'Fleet', href: '#fleet' },
  { label: 'Services', href: '#services' },
  { label: 'Book', href: '#booking' },
  { label: 'Contact', href: '#contact' }
];

/* ── components ───────────────────────────────────────────────────── */

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="Manasvi Tours & Travels — back to top">
      <img src="/images/logo.png" alt="Manasvi Tours & Travels" width="368" height="96" />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header" id="top">
      <div className="container header__inner">
        <Logo />

        <button
          type="button"
          className="header__hamburger"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>

        <nav className={`header__nav${open ? ' header__nav--open' : ''}`} aria-label="Main">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              className="header__link"
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a className="btn btn--orange header__cta" href={PHONE_TEL}>
          Call
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroBackground />
      <div className="container hero__container">
        <div className="hero__grid">
          <div className="hero__copy">
            <span className="section-label section-label--light">{TAGLINE}</span>
            <h1 className="hero__title" id="hero-title">
              Book a car<br />with a driver.
            </h1>
            <p className="hero__services">
              Local · Outstation · Airport pick-up and drop · All&#x2011;India service
            </p>
            <div className="hero__actions">
              <a className="btn btn--orange" href="#booking-form">Book Now</a>
              <a className="btn btn--ghost" href={PHONE_TEL}>Call</a>
            </div>
          </div>

          <div className="hero__photo">
            <picture>
              <source srcSet="/images/innova.webp" type="image/webp" />
              <img
                src="/images/innova.jpg"
                alt="Innova Crysta from Manasvi Tours & Travels"
                width="1200"
                height="900"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}

function FleetCard({ car, onView, onBook }) {
  return (
    <article className="car-card">
      <div className="car-card__media">
        <picture>
          <source srcSet={`/images/${car.image}.webp`} type="image/webp" />
          <img
            src={`/images/${car.image}.jpg`}
            alt={car.name}
            width="1200"
            height="900"
            loading="lazy"
            decoding="async"
          />
        </picture>
        <div className="car-card__media-overlay" />
      </div>
      <div className="car-card__body">
        <h3 className="car-card__name">{car.name}</h3>
        <p className="car-card__seats">{car.seats} seats</p>
        <p className="car-card__price">
          Rs {car.rate} <span>per km</span>
        </p>
        <div className="car-card__actions">
          {car.gallery.length > 0 && (
            <button
              type="button"
              className="btn btn--outline btn--sm"
              onClick={() => onView(car.gallery)}
            >
              View photos
            </button>
          )}
          <button
            type="button"
            className="btn btn--orange btn--sm"
            onClick={() => onBook(car.name)}
          >
            Book This Car
          </button>
        </div>
      </div>
    </article>
  );
}

function Fleet({ onChooseCar, onViewGallery }) {
  return (
    <section className="section section--fleet" id="fleet" aria-labelledby="fleet-title">
      <div className="container">
        <span className="section-label">Fleet</span>
        <h2 className="section-title" id="fleet-title">Our vehicles</h2>
        <p className="section-desc">
          Well-maintained cars for every group size, with an experienced driver.
        </p>

        <div className="fleet-grid">
          {CARS.map((car) => (
            <FleetCard
              key={car.name}
              car={car}
              onView={onViewGallery}
              onBook={onChooseCar}
            />
          ))}
        </div>

        <p className="fleet-note">
          Toll, parking and driver allowance as applicable. Final fare confirmed on call.
        </p>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section section--services" id="services" aria-labelledby="services-title">
      <div className="container">
        <span className="section-label">Services</span>
        <h2 className="section-title" id="services-title">What we offer</h2>
        <p className="section-desc">
          Ride anywhere in India — from a quick city trip to a long outstation journey.
        </p>

        <div className="services-grid">
          {TRIP_TYPES.map((service) => (
            <div className="service-item" key={service}>
              <span className="service-item__icon">{SERVICE_ICONS[service]}</span>
              <span className="service-item__label">{service}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingSection({ car, onCarChange }) {
  return (
    <section className="section section--booking" id="booking" aria-labelledby="booking-title">
      <div className="container booking-layout">
        <div className="booking-info">
          <span className="section-label section-label--light">Booking</span>
          <h2 className="section-title section-title--light" id="booking-title">
            Book your ride
          </h2>
          <p className="section-desc section-desc--light">
            Fill in your trip details and it opens WhatsApp with the message ready to send.
          </p>

          <div className="booking-info__call">
            <p className="booking-info__call-label">Prefer to talk?</p>
            <a className="booking-info__phone" href={PHONE_TEL}>{PHONE_DISPLAY}</a>
          </div>

          <p className="booking-info__note">
            Toll, parking and driver allowance as applicable. Final fare confirmed on call.
          </p>
        </div>

        <BookingForm car={car} onCarChange={onCarChange} />
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section section--contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact-inner">
        <span className="section-label">Contact</span>
        <h2 className="section-title" id="contact-title">Get in touch</h2>
        <p className="section-desc">
          Call or message on WhatsApp to book your ride or confirm the fare.
        </p>

        <div className="contact-phone">
          <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
        </div>

        <div className="contact-actions">
          <a className="btn btn--orange btn--lg" href={PHONE_TEL}>
            Call Now
          </a>
          <a
            className="btn btn--outline btn--lg"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <Logo />
        <p className="footer__tagline">{TAGLINE}</p>
        <div className="footer__links">
          <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
        <p className="footer__copy">© 2026 Manasvi Tours &amp; Travels</p>
      </div>
    </footer>
  );
}

function MobileBar() {
  return (
    <nav className="mobile-bar" aria-label="Quick actions">
      <p className="mobile-bar__helper">Ready to book? Reach us instantly.</p>
      <div className="mobile-bar__buttons">
        <a className="btn btn--orange mobile-bar__btn" href={PHONE_TEL}>Call</a>
        <a
          className="btn btn--outline mobile-bar__btn"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
        <a className="btn btn--orange mobile-bar__btn" href="#booking-form">Book Now</a>
      </div>
    </nav>
  );
}

/* ── app ──────────────────────────────────────────────────────────── */

export default function App() {
  const [car, setCar] = useState('');
  const [galleryPhotos, setGalleryPhotos] = useState(null);

  const chooseCar = useCallback((name) => {
    setCar(name);
    const form = document.getElementById('booking-form');
    if (!form) return;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    form.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' });
    const first = form.querySelector('#field-name');
    if (first) window.setTimeout(() => first.focus({ preventScroll: true }), 320);
  }, []);

  const openGallery = useCallback((photos) => setGalleryPhotos(photos), []);
  const closeGallery = useCallback(() => setGalleryPhotos(null), []);

  return (
    <div className="page">
      <Header />
      <main>
        <Hero />
        <Fleet onChooseCar={chooseCar} onViewGallery={openGallery} />
        <Services />
        <BookingSection car={car} onCarChange={setCar} />
        <Contact />
        <section id="reviews-section" hidden aria-hidden="true" />
      </main>
      <Footer />
      <MobileBar />

      {galleryPhotos && (
        <Gallery photos={galleryPhotos} onClose={closeGallery} />
      )}
    </div>
  );
}
