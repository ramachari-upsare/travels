/* Booking helpers — one source of truth for the form, the fleet buttons and
   the WhatsApp message. No backend: the message is prepared and handed to
   wa.me, the customer presses send. */

export const PHONE_DISPLAY = '9845976916';
export const PHONE_TEL = 'tel:+919845976916';
export const WHATSAPP_NUMBER = '919845976916';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const TAGLINE = 'Explore • Travel • Discover';

/* Fleet — name, seats and rate exactly as supplied. */
export const CARS = [
  { name: 'Etios', seats: '4 + 1', rate: 15, image: 'etios' },
  { name: 'Ertiga', seats: '6 + 1', rate: 18, image: 'ertiga' },
  { name: 'Innova Crysta', seats: '7 + 1', rate: 20, image: 'innova' },
  { name: 'Tempo Traveller', seats: '12 + 1', rate: 24, image: 'tt' }
];

export const TRIP_TYPES = ['Local', 'Outstation', 'Airport pick-up and drop', 'All-India service'];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const pad = (n) => String(n).padStart(2, '0');

/** Today as yyyy-mm-dd, in the visitor's own timezone. */
export function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Keep only the 10-digit mobile number (accepts +91, 0 prefix, spaces). */
export function cleanPhone(value) {
  let digits = String(value || '').replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  return digits;
}

/** 2026-11-28 -> 28 Nov 2026 */
export function formatDate(value) {
  const parts = String(value || '').split('-');
  if (parts.length !== 3) return value || '';
  const day = parseInt(parts[2], 10);
  const month = parseInt(parts[1], 10) - 1;
  if (!day || month < 0 || month > 11) return value;
  return `${day} ${MONTHS[month]} ${parts[0]}`;
}

/** 14:30 -> 2:30 pm */
export function formatTime(value) {
  const match = /^(\d{1,2}):(\d{2})/.exec(String(value || ''));
  if (!match) return value || '';
  let hours = parseInt(match[1], 10);
  const suffix = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12;
  return `${hours}:${match[2]} ${suffix}`;
}

/** Field rules used by the form. */
export function validate(values) {
  const errors = {};
  if (!String(values.name || '').trim()) errors.name = 'Please fill this in.';

  const phone = cleanPhone(values.phone);
  if (!String(values.phone || '').trim()) errors.phone = 'Please fill this in.';
  else if (!/^\d{10}$/.test(phone)) errors.phone = 'Enter a 10-digit mobile number.';

  if (!values.tripType) errors.tripType = 'Please choose a trip type.';
  if (!String(values.pickup || '').trim()) errors.pickup = 'Please fill this in.';

  if (!values.date) errors.date = 'Please choose a date.';
  else if (values.date < todayISO()) errors.date = 'Pick today or a later date.';

  return errors;
}

/** Neatly formatted WhatsApp message. Empty optional fields are left out. */
export function buildMessage(values) {
  const lines = ['*Booking request — Manasvi Tours & Travels*'];
  const push = (label, value) => {
    if (value) lines.push(`${label}: ${value}`);
  };

  push('Name', String(values.name || '').trim());
  push('Mobile', cleanPhone(values.phone));
  push('Trip type', values.tripType);
  push('Pickup', String(values.pickup || '').trim());
  push('Drop', String(values.drop || '').trim());
  push('Date', formatDate(values.date));
  push('Time', formatTime(values.time));
  push('Car', values.car);

  lines.push('');
  lines.push('Sent from the Manasvi Tours & Travels website.');
  return lines.join('\n');
}

export function whatsappHref(values) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(buildMessage(values))}`;
}
