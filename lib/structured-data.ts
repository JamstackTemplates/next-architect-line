import { awards } from '../content/awards.ts';
import { business } from '../content/business.ts';
import { people } from '../content/studio.ts';
import { absoluteUrl } from './paths.ts';

/** ProfessionalService schema for Plumb Line Architects, derived entirely from typed content. */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const openDays = business.hours.filter((entry) => entry.opens && entry.closes);

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    additionalType: 'https://en.wikipedia.org/wiki/Architectural_firm',
    name: business.name,
    description: business.introduction,
    email: business.email,
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(url ? { url } : {}),
    foundingDate: String(business.founded),
    areaServed: business.serviceArea,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${business.address.suite}, ${business.address.building}, ${business.address.street}`,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    openingHoursSpecification: openDays.map((entry) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${entry.day}`,
      opens: entry.opens,
      closes: entry.closes,
    })),
    founder: people
      .filter((person) => person.principal)
      .map((person) => ({
        '@type': 'Person',
        name: person.name,
        jobTitle: person.role,
      })),
    award: awards.map((award) => `${award.name} (${award.body}, ${award.year})`),
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
