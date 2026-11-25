import { useCallback, useState } from 'react';
import HeroBackground from './components/HeroBackground.jsx';
import BookingForm from './components/BookingForm.jsx';
import { CARS, PHONE_DISPLAY, PHONE_TEL, TAGLINE, TRIP_TYPES, WHATSAPP_URL } from './lib/booking.js';

const SERVICE_ICONS = {
  Local: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-6-5.4-6-10a6 6 0 1 1 12 0c0 4.6-6 10-6 10Z" />
      <circle cx="12" cy="11" r="2.2" />
    </svg>
  ),
  Outstation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19 9 5M20 19 15 5M12 6v2M12 11v2M12 16v3" />
    </svg>
  ),
  'Airport pick-up and drop': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2Z" />
    </svg>
  ),
  'All-India service': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <polygon points="15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5 15.5 8.5" />
    </svg>
  )
};

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="Manasvi Tours & Travels — back to top">
      <img src="/images/logo.png" alt="Manasvi Tours & Travels" width="368" height="96" />
    </a>
  );
}

function Header() {
  return (
    <header className="header nav-surface">
      <div className="container header__inner">
        <Logo />
        <a className="btn btn--orange header__call" href={PHONE_TEL}>
          Call
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <HeroBackground />
      <div className="container hero__container">
        <div className="hero__grid">
          <div className="hero__copy">
            <p className="hero__tagline">{TAGLINE}</p>
            <h1 className="hero__title" id="hero-title">
              Book a car with a driver.
            </h1>
            <p className="hero__services">Local · Outstation · Airport pick-up and drop · All-India service</p>
            <div className="hero__actions">
              <a className="btn btn--orange" href="#booking-form">
                Book Now
              </a>
              <a className="btn btn--ghost" href={PHONE_TEL}>
                Call
              </a>
            </div>
          </div>

          <div className="hero__media">
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

function Services() {
  return (
    <section className="section section--services" id="services" aria-labelledby="services-title">
      <div className="container">
        <h2 className="section__title" id="services-title">
          Services
        </h2>
        <ul className="services">
          {TRIP_TYPES.map((service) => (
            <li className="services__item" key={service}>
              <span className="services__icon">{SERVICE_ICONS[service]}</span>
              <span className="services__label">{service}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FleetCard({ car, onChooseCar }) {
  const [showInterior, setShowInterior] = useState(false);
  const hasInterior = car.image === 'tt';
  const activeImage = hasInterior && showInterior ? 'tt-interior' : car.image;
  const activeAlt = hasInterior && showInterior ? `${car.name} interior` : car.name;

  return (
    <li className="fleet__item">
      <article className="car-card">
        <div className="car-card__media">
          <picture>
            <source srcSet={`/images/${activeImage}.webp`} type="image/webp" />
            <img
              src={`/images/${activeImage}.jpg`}
              alt={activeAlt}
              width="1200"
              height="900"
              loading="lazy"
              decoding="async"
            />
          </picture>
          {hasInterior ? (
            <button
              type="button"
              className="car-card__thumb"
              onClick={() => setShowInterior((prev) => !prev)}
              aria-pressed={showInterior}
              aria-label={showInterior ? 'Show Tempo Traveller exterior' : 'Show Tempo Traveller interior'}
            >
              <picture>
                <source srcSet={`/images/${showInterior ? 'tt' : 'tt-interior'}.webp`} type="image/webp" />
                <img
                  src={`/images/${showInterior ? 'tt' : 'tt-interior'}.jpg`}
                  alt={showInterior ? 'Tempo Traveller exterior' : 'Tempo Traveller interior'}
                  width="1200"
                  height="900"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </button>
          ) : null}
        </div>
        <div className="car-card__body">
          <h3 className="car-card__name">{car.name}</h3>
          <p className="car-card__seats">{car.seats} seats</p>
          <p className="car-card__price">
            Rs {car.rate} <span>per km</span>
          </p>
          <button className="btn btn--orange btn--block" type="button" onClick={() => onChooseCar(car.name)}>
            Book This Car
          </button>
        </div>
      </article>
    </li>
  );
}

function Fleet({ onChooseCar }) {
  return (
    <section className="section section--fleet" id="fleet" aria-labelledby="fleet-title">
      <div className="container">
        <h2 className="section__title" id="fleet-title">
          Fleet
        </h2>
        <ul className="fleet">
          {CARS.map((car) => (
            <FleetCard key={car.name} car={car} onChooseCar={onChooseCar} />
          ))}
        </ul>
        <p className="fleet__note">Toll, parking and driver allowance as applicable. Final fare confirmed on call.</p>
      </div>
    </section>
  );
}

function BookingSection({ car, onCarChange }) {
  return (
    <section className="booking" id="booking" aria-labelledby="booking-title">
      <div className="container booking__grid">
        <div className="booking__info">
          <h2 className="booking__title" id="booking-title">
            Book a car
          </h2>
          <p className="booking__lede">
            Fill in your trip details to open WhatsApp with your booking message ready to send.
          </p>

          <div className="booking__call">
            <p className="booking__call-label">Call directly</p>
            <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
          </div>

          <p className="booking__note">Toll, parking and driver allowance as applicable. Final fare confirmed on call.</p>
        </div>

        <BookingForm car={car} onCarChange={onCarChange} />
      </div>
    </section>
  );
}

function ContactStrip() {
  return (
    <section className="contact nav-surface" aria-labelledby="contact-title">
      <div className="container contact__inner">
        <div>
          <h2 className="contact__title" id="contact-title">
            Call or WhatsApp
          </h2>
          <a className="contact__phone" href={PHONE_TEL}>
            {PHONE_DISPLAY}
          </a>
        </div>
        <div className="contact__actions">
          <a className="btn btn--orange" href={PHONE_TEL}>
            Call
          </a>
          <a className="btn btn--ghost" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer nav-surface">
      <div className="container footer__inner">
        <Logo />
        <p className="footer__meta">
          <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
          <span aria-hidden="true"> · </span>
          {TAGLINE}
        </p>
        <p className="footer__meta footer__meta--small">© 2026 Manasvi Tours &amp; Travels</p>
      </div>
    </footer>
  );
}

function MobileBar() {
  return (
    <nav className="mobile-bar" aria-label="Quick actions">
      <a className="mobile-bar__btn mobile-bar__btn--call" href={PHONE_TEL}>
        Call
      </a>
      <a className="mobile-bar__btn mobile-bar__btn--wa" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
        WhatsApp
      </a>
      <a className="mobile-bar__btn mobile-bar__btn--book" href="#booking-form">
        Book Now
      </a>
    </nav>
  );
}

export default function App() {
  const [car, setCar] = useState('');

  const chooseCar = useCallback((name) => {
    setCar(name);
    const form = document.getElementById('booking-form');
    if (!form) return;

    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    form.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' });

    const first = form.querySelector('#field-name');
    if (first) window.setTimeout(() => first.focus({ preventScroll: true }), 320);
  }, []);

  return (
    <div className="page">
      <Header />
      <main>
        <Hero />
        <Services />
        <Fleet onChooseCar={chooseCar} />
        <BookingSection car={car} onCarChange={setCar} />
        <ContactStrip />
        {/* Kept empty for real reviews later. */}
        <section id="reviews-section" hidden aria-hidden="true" />
      </main>
      <Footer />
      <MobileBar />
    </div>
  );
}
