import { useCallback, useState } from 'react';
import HeroBackground from './components/HeroBackground.jsx';
import BookingForm from './components/BookingForm.jsx';
import { CARS, PHONE_DISPLAY, PHONE_TEL, TAGLINE, TRIP_TYPES, WHATSAPP_URL } from './lib/booking.js';

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
      <div className="hero__media" aria-hidden="true">
        <picture>
          <source srcSet="/images/innova.webp" type="image/webp" />
          <img src="/images/innova.jpg" alt="" width="1200" height="900" decoding="async" />
        </picture>
      </div>
      <div className="hero__overlay" aria-hidden="true" />
      <HeroBackground />

      <div className="container">
        <div className="hero__inner">
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
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="container">
        <h2 className="section__title" id="services-title">
          Services
        </h2>
        <ul className="services">
          {TRIP_TYPES.map((service) => (
            <li className="services__item" key={service}>
              {service}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Fleet({ onChooseCar }) {
  return (
    <section className="section" id="fleet" aria-labelledby="fleet-title">
      <div className="container">
        <h2 className="section__title" id="fleet-title">
          Fleet
        </h2>
        <ul className="fleet">
          {CARS.map((car) => (
            <li className="fleet__item" key={car.name}>
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
                </div>
                <div className="car-card__body">
                  <h3 className="car-card__name">{car.name}</h3>
                  <p className="car-card__seats">{car.seats}</p>
                  <p className="car-card__price">
                    Rs {car.rate} <span>per km</span>
                  </p>
                  <button className="btn btn--orange btn--block" type="button" onClick={() => onChooseCar(car.name)}>
                    Book This Car
                  </button>
                </div>
              </article>
            </li>
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
        <div>
          <h2 className="booking__title" id="booking-title">
            Book a car
          </h2>
          <p className="booking__lede">
            Fill this in and it opens WhatsApp with the details ready to send. Change anything in the message before
            you send it.
          </p>

          <div className="booking__call">
            <p className="booking__call-label">Prefer to talk?</p>
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
      <a className="mobile-bar__btn" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
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
