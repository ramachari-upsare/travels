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

function SelectWrap({ children }) {
  return (
    <div className="select-wrap">
      {children}
      <svg
        className="select-wrap__chevron"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

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

function FormGroup({ number, title, helper, children }) {
  return (
    <div className="form-group">
      <div className="form-group__header">
        <span className="form-group__number">{number}</span>
        <div>
          <h3 className="form-group__title">{title}</h3>
          <p className="form-group__helper">{helper}</p>
        </div>
      </div>
      <div className="form-group__fields">{children}</div>
    </div>
  );
}

export default function BookingForm({ car, onCarChange }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sentUrl, setSentUrl] = useState('');
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

  const describedBy = (key) => (errors[key] ? `field-${key}-error` : undefined);

  const handleSubmit = (event) => {
    event.preventDefault();
    const candidate = { ...values, car };
    const found = validate(candidate);
    setErrors(found);

    const firstKey = Object.keys(found)[0];
    if (firstKey) {
      setSentUrl('');
      setSummary('Please check the highlighted fields and try again.');
      const node = formRef.current && formRef.current.querySelector(`#field-${firstKey}`);
      if (node) node.focus();
      return;
    }

    setSummary('');
    const url = whatsappHref(candidate);
    setSentUrl(url);

    let opened = null;
    try {
      opened = window.open(url, '_blank', 'noopener');
    } catch {
      opened = null;
    }
    if (!opened) window.location.href = url;
  };

  return (
    <form
      className="booking-card"
      id="booking-form"
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
    >
      {summary ? (
        <p className="booking-card__alert" role="alert">{summary}</p>
      ) : null}

      <FormGroup number="01" title="Your details" helper="So we can reach you about your trip.">
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
      </FormGroup>

      <FormGroup number="02" title="Trip details" helper="We'll confirm the final fare on call.">
        <Field id="field-tripType" label="Trip type" error={errors.tripType}>
          <SelectWrap>
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
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </SelectWrap>
        </Field>

        <Field id="field-pickup" label="Pickup location" error={errors.pickup}>
          <input
            id="field-pickup"
            name="pickup"
            type="text"
            autoComplete="street-address"
            placeholder="Pickup address or area"
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
            placeholder="Drop city or address"
            value={values.drop}
            onChange={change('drop')}
          />
        </Field>

        <div className="field-pair">
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
      </FormGroup>

      <FormGroup number="03" title="Car" helper="Pick a car or let us suggest one.">
        <Field id="field-car" label="Car preference" optional>
          <SelectWrap>
            <select id="field-car" name="car" value={car} onChange={(event) => onCarChange(event.target.value)}>
              <option value="">Any car</option>
              {CARS.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name} — {item.seats} (Rs {item.rate}/km)
                </option>
              ))}
            </select>
          </SelectWrap>
        </Field>
      </FormGroup>

      <div className="booking-card__actions">
        <button className="btn btn--orange btn--block" type="submit">
          Book on WhatsApp
        </button>
        <a className="btn btn--outline btn--block" href={PHONE_TEL}>
          Call {PHONE_DISPLAY}
        </a>
      </div>

      {sentUrl ? (
        <div className="booking-card__success" aria-live="polite">
          <h3>Message ready</h3>
          <p>WhatsApp is opening with your trip details. Press send and final fare will be confirmed on call.</p>
          <a className="btn btn--outline" href={sentUrl} target="_blank" rel="noopener noreferrer">
            Open WhatsApp again
          </a>
        </div>
      ) : null}
    </form>
  );
}
