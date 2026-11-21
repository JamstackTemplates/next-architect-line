import type { OpeningHours } from '../lib/hours.ts';

export interface PostalAddress {
  /** Suite or floor number. */
  suite: string;
  /** Building name, if any. */
  building: string;
  /** Street number and name. */
  street: string;
  /** City. */
  city: string;
  /** State or region abbreviation. */
  region: string;
  /** Postal / ZIP code. */
  postalCode: string;
  /** ISO 3166-1 alpha-2 country code. */
  country: string;
  /** Single-line address for display, maps and schema. */
  formatted: string;
  /** Concise address query for Google Maps embed and directions. */
  mapQuery: string;
}

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Split wordmark lines for the architectural header. */
  wordmarkPrimary: string;
  wordmarkSecondary: string;
  /** Short headline for the home page and OG image. */
  tagline: string;
  /** Plain-text introduction used by the home page, fallback metadata and schema. */
  introduction: string;
  /** Year the practice was founded. */
  founded: number;
  /** Geographic reach of commissions. */
  serviceArea: string;
  /** Public contact address, never a private notification destination. */
  email: string;
  /** E.164 or dialable telephone number. */
  phone: string;
  /** Formatted phone number as printed on drawing sheets. */
  phoneDisplay: string;
  /** Studio street address. */
  address: PostalAddress;
  /** Summary of studio visiting hours for static/no-JS views. */
  hoursSummary: string;
  /** Appointment policy note. */
  hoursNote: string;
  /** Seven weekday opening-hours records (same-day intervals only). */
  hours: readonly OpeningHours[];
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** No booking, appointment, fee or delivery promises. */
    introduction: string;
    /** Suggestions for the message body, never additional form inputs. */
    usefulToInclude: readonly string[];
  };
}

export const business: Business = {
  name: 'Plumb Line Architects',
  wordmarkPrimary: 'PLUMB LINE',
  wordmarkSecondary: 'ARCHITECTS',
  tagline: 'Buildings drawn to a true vertical.',
  introduction:
    'We design houses, civic rooms and second lives for old industrial buildings, in concrete, brick, timber and light, from a studio in the Monadnock.',
  founded: 2011,
  serviceArea: 'Chicago and the Great Lakes region; competitions further afield.',
  email: 'studio@plumblinearchitects.com',
  phone: '+1 312-555-0148',
  phoneDisplay: '(312) 555-0148',
  address: {
    suite: 'Suite 1110',
    building: 'Monadnock Building',
    street: '53 W Jackson Blvd',
    city: 'Chicago',
    region: 'IL',
    postalCode: '60604',
    country: 'US',
    formatted: 'Suite 1110, Monadnock Building, 53 W Jackson Blvd, Chicago, IL 60604',
    mapQuery: 'Monadnock Building, 53 W Jackson Blvd, Chicago, IL 60604',
  },
  hoursSummary: 'Monday–Friday, 09:00–18:00 (Saturday & Sunday closed)',
  hoursNote: 'Studio visits by appointment',
  hours: [
    { day: 'Monday', opens: '09:00', closes: '18:00' },
    { day: 'Tuesday', opens: '09:00', closes: '18:00' },
    { day: 'Wednesday', opens: '09:00', closes: '18:00' },
    { day: 'Thursday', opens: '09:00', closes: '18:00' },
    { day: 'Friday', opens: '09:00', closes: '18:00' },
    { day: 'Saturday' },
    { day: 'Sunday' },
  ],
  enquiries: {
    title: 'Start a project enquiry',
    introduction:
      'Tell us about the site and what you hope to build. A principal reads every enquiry and replies within five working days. Sending a message does not appoint the studio or commit either side to anything.',
    usefulToInclude: [
      'The site location and whether you already own or lease it',
      'The kind of building and rough size or scope',
      'An approximate budget range',
      'When you hope to begin design or construction',
      'Any existing drawings, plats or surveys you can share later by email',
      'Press and job enquiries: please say so in the first line',
    ],
  },
};
