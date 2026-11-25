import { useRef, useState } from 'react';
import {
  CARS,
  PHONE_DISPLAY,
  PHONE_TEL,
  TRIP_TYPES,
  todayISO,
  validate,
  whatsappHref,
  WHATSAPP_URL
} from '../lib/booking.js';

const EMPTY = { name: '', phone: '', tripType: '', pickup: '', drop: '', date: '', time: '' };

function Field({ id, label, optional, error, children }) {
  return (
    <div className={`field${error ? ' field--error' : ''}`}>
      <label className="field__label" htmlFor={id}>
        {label}
        {optional ? <span className="field__optional"> (optional)</span> : null}
      </label>
      {children}
      {error ? (
        <p className="field__error" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function BookingForm({ car, onCarChange }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [summary, setSummary] = useState('');
  const formRef = useRef(null);
  const minDate = todayISO();

  const change = (key) => (event) => {
    const { value } = event.target;
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const describedBy = (key) => (errors[key] ? `${key}-error` : undefined);

  const handleSubmit = (event) => {
    event.preventDefault();
    const candidate = { ...values, car };
    const found = validate(candidate);
    setErrors(found);

    const firstKey = Object.keys(found)[0];
    if (firstKey) {
      setSent(false);
      setSummary('Please check the highlighted fields and send again.');
      const node = formRef.current && formRef.current.querySelector(`#field-${firstKey}`);
      if (node) node.focus();
      return;
    }

    setSummary('');
    const url = whatsappHref(candidate);

    // Open WhatsApp. If the popup is blocked, fall back to a same-tab jump.
    let opened = null;
    try {
      opened = window.open(url, '_blank', 'noopener');
    } catch (error) {
      opened = null;
    }
    if (!opened) window.location.href = url;

    setSent(true);
  };

  return (
    <form
      className="booking-card"
      id="booking-form"
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="booking-title"
    >
      <h2 className="booking-card__title" id="booking-title">
        Book a car
      </h2>
      <p className="booking-card__note">Fill this in — it opens WhatsApp with the details ready to send.</p>

      {summary ? (
        <p className="booking-card__summary" role="alert">
          {summary}
        </p>
      ) : null}

      <div className="booking-card__fields">
        <Field id="field-name" label="Name" error={errors.name}>
          <input
            id="field-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            onChange={change('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy('name')}
            required
          />
        </Field>

        <Field id="field-phone" label="Mobile number" error={errors.phone}>
          <input
            id="field-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="10-digit number"
            value={values.phone}
            onChange={change('phone')}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy('phone')}
            required
          />
        </Field>

        <Field id="field-tripType" label="Trip type" error={errors.tripType}>
          <select
            id="field-tripType"
            name="tripType"
            value={values.tripType}
            onChange={change('tripType')}
            aria-invalid={Boolean(errors.tripType)}
            aria-describedby={describedBy('tripType')}
            required
          >
            <option value="">Select trip type</option>
            {TRIP_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <Field id="field-pickup" label="Pickup location" error={errors.pickup}>
          <input
            id="field-pickup"
            name="pickup"
            type="text"
            autoComplete="street-address"
            placeholder="Where we pick you up"
            value={values.pickup}
            onChange={change('pickup')}
            aria-invalid={Boolean(errors.pickup)}
            aria-describedby={describedBy('pickup')}
            required
          />
        </Field>

        <Field id="field-drop" label="Drop location" optional>
          <input
            id="field-drop"
            name="drop"
            type="text"
            placeholder="If you know it"
            value={values.drop}
            onChange={change('drop')}
          />
        </Field>

        <div className="booking-card__pair">
          <Field id="field-date" label="Date" error={errors.date}>
            <input
              id="field-date"
              name="date"
              type="date"
              min={minDate}
              value={values.date}
              onChange={change('date')}
              aria-invalid={Boolean(errors.date)}
              aria-describedby={describedBy('date')}
              required
            />
          </Field>

          <Field id="field-time" label="Time" optional>
            <input
              id="field-time"
              name="time"
              type="time"
              value={values.time}
              onChange={change('time')}
            />
          </Field>
        </div>

        <Field id="field-car" label="Car" optional>
          <select id="field-car" name="car" value={car} onChange={(event) => onCarChange(event.target.value)}>
            <option value="">Any car</option>
            {CARS.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name} — {item.seats}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <button className="btn btn--orange btn--block" type="submit">
        Book on WhatsApp
      </button>
      <p className="booking-card__call">
        Or call <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
      </p>

      {sent ? (
        <div className="booking-card__success" aria-live="polite">
          <h3>Message ready</h3>
          <p>WhatsApp is opening with your details. Press send and the fare is confirmed on call.</p>
          <a className="btn btn--outline" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            Open WhatsApp again
          </a>
        </div>
      ) : null}
    </form>
  );
}
