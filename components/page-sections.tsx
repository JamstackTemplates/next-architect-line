import type { ReactNode } from 'react';
import { business } from '../content/business';
import type { Person, Principle, Publication } from '../content/studio';
import { mapDirectionsUrl } from '../lib/maps';
import { IconArrowRight, IconClock, IconEnvelope, IconPhone, IconPin } from './drawings/shared';
import { GoogleMap } from './google-map';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

type Children = { children: ReactNode };

/* -------------------------------------------------------------------------- */
/* PROCESS PAGE: Checklist & Fees                                             */
/* -------------------------------------------------------------------------- */

function ProcessPreparationRoot({ children }: Children) {
  return (
    <section className="wrap py-14 lg:py-16">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">{children}</div>
    </section>
  );
}

function ProcessChecklist({
  eyebrow,
  heading,
  children,
}: {
  eyebrow: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <div className="lg:col-span-7">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="font-display-tight mt-2 text-[clamp(2.2rem,4.5vw,3.4rem)] font-bold uppercase text-ink">
        {heading}
      </h2>
      <ul className="mt-6 m-0 list-none divide-y divide-line border-y border-line p-0">{children}</ul>
    </div>
  );
}

function ChecklistItem({ term, children }: { term: string; children: ReactNode }) {
  return (
    <li className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-12 sm:gap-4">
      <span className="font-mono text-xs uppercase tracking-[0.14em] text-brass sm:col-span-4">
        {term}
      </span>
      <span className="text-sm leading-relaxed text-ink sm:col-span-8">{children}</span>
    </li>
  );
}

function FeePanel({ eyebrow, heading, children }: { eyebrow: string; heading: string; children: ReactNode }) {
  return (
    <aside className="border border-line bg-surface p-6 sm:p-8 lg:col-span-5 lg:self-start">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="font-display-tight mt-2 text-[clamp(2rem,4vw,3rem)] font-bold uppercase text-ink">
        {heading}
      </h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted">{children}</div>
    </aside>
  );
}

export const ProcessPreparation = Object.assign(ProcessPreparationRoot, {
  Checklist: ProcessChecklist,
  Item: ChecklistItem,
  Fees: FeePanel,
});

/* -------------------------------------------------------------------------- */
/* STUDIO PAGE: Principles, People, Publications, Location                    */
/* -------------------------------------------------------------------------- */

export function PrinciplesBand({
  eyebrow,
  heading,
  statement,
  principles,
}: {
  eyebrow: string;
  heading: string;
  statement: ReactNode;
  principles: readonly Principle[];
}) {
  return (
    <section className="wrap py-14 lg:py-16" aria-labelledby="principles-heading">
      <div className="grid grid-cols-1 gap-8 border-b border-line pb-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow">{eyebrow}</p>
          <h2
            id="principles-heading"
            className="font-display-tight mt-2 text-[clamp(2.2rem,4.5vw,3.4rem)] font-bold uppercase text-ink"
          >
            {heading}
          </h2>
        </div>
        <div className="text-lg leading-relaxed text-ink/90 lg:col-span-8">{statement}</div>
      </div>

      <ol className="m-0 mt-10 grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-12">
        {principles.map((item, idx) => {
          const cols = idx === 0 ? 'md:col-span-5' : idx === 1 ? 'md:col-span-4' : 'md:col-span-3';
          return (
            <li key={item.number} className={`border-l border-line pl-5 ${cols}`}>
              <span className="font-mono text-4xl tracking-[0.04em] text-brass lg:text-5xl">
                {item.number}
              </span>
              <h3 className="font-display mt-3 text-3xl font-bold uppercase leading-none text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.sentence}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export function PeopleRoster({
  eyebrow,
  heading,
  note,
  people,
}: {
  eyebrow: string;
  heading: string;
  note: ReactNode;
  people: readonly Person[];
}) {
  const ordered = [...people].sort((a, b) => Number(b.principal) - Number(a.principal));
  return (
    <section className="wrap py-14 lg:py-16" aria-labelledby="people-heading">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2
            id="people-heading"
            className="font-display-tight mt-2 text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold uppercase text-ink"
          >
            {heading}
          </h2>
        </div>
        <p className="max-w-md text-sm text-muted">{note}</p>
      </div>

      <ul className="m-0 grid list-none grid-cols-1 gap-x-10 border-t border-line p-0 md:grid-cols-2">
        {ordered.map((person) => (
          <li
            key={person.name}
            className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line py-4"
          >
            <span className="font-display text-[1.9rem] font-bold uppercase leading-none text-ink">
              {person.name}
            </span>
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
              {person.role}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function PublicationsList({
  eyebrow,
  heading,
  publications,
}: {
  eyebrow: string;
  heading: string;
  publications: readonly Publication[];
}) {
  return (
    <section className="wrap py-14 lg:py-16" aria-labelledby="publications-heading">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow">{eyebrow}</p>
          <h2
            id="publications-heading"
            className="font-display-tight mt-2 text-[clamp(2.2rem,4.5vw,3.4rem)] font-bold uppercase text-ink"
          >
            {heading}
          </h2>
        </div>
        <ul className="m-0 list-none divide-y divide-line border-y border-line p-0 lg:col-span-8">
          {publications.map((pub) => (
            <li
              key={pub.title}
              className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-12 sm:items-baseline sm:gap-4"
            >
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-brass sm:col-span-2">
                {pub.year}
              </span>
              <span className="font-semibold text-ink sm:col-span-6">{pub.title}</span>
              <span className="text-sm text-muted sm:col-span-4 sm:text-right">{pub.outlet}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function StudioLocation({
  eyebrow,
  heading,
  note,
  actionLabel,
}: {
  eyebrow: string;
  heading: string;
  note: ReactNode;
  actionLabel: string;
}) {
  return (
    <section className="wrap py-14 lg:py-16" aria-labelledby="location-heading">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow">{eyebrow}</p>
          <h2
            id="location-heading"
            className="font-display-tight mt-2 text-[clamp(2.2rem,4.5vw,3.4rem)] font-bold uppercase text-ink"
          >
            {heading}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">{note}</p>

          <div className="mt-6 space-y-4 border-t border-line pt-6 text-sm">
            <div className="flex items-start gap-3">
              <IconPin className="mt-1 h-4 w-4 shrink-0" />
              <div>
                <p className="text-ink">{business.address.formatted}</p>
                <a
                  href={mapDirectionsUrl(business.address.mapQuery)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-link mt-1 inline-block font-mono text-[0.7rem] uppercase tracking-[0.12em]"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <IconClock className="mt-1 h-4 w-4 shrink-0" />
              <div>
                <OpenBadge hours={business.hours} />
                <p className="mt-1 text-xs text-muted">{business.hoursSummary}</p>
                <TimeZoneNote className="text-muted font-mono text-[0.66rem] uppercase tracking-[0.1em]" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <IconPhone className="h-4 w-4 shrink-0" />
              <a href={`tel:${business.phone.replace(/[^\d+]/g, '')}`} className="font-mono text-sm text-ink no-underline hover:underline">
                {business.phoneDisplay}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <IconEnvelope className="h-4 w-4 shrink-0" />
              <a href={`mailto:${business.email}`} className="text-link wrap-anywhere">
                {business.email}
              </a>
            </div>
          </div>

          <div className="mt-7">
            <SiteLink href="/contact/" className="button">
              <span>{actionLabel}</span>
              <IconArrowRight />
            </SiteLink>
          </div>
        </div>

        <div className="border border-line bg-surface p-2 lg:col-span-7">
          <GoogleMap
            address={business.address.mapQuery}
            title={`Map showing ${business.name} at ${business.address.formatted}`}
          />
        </div>
      </div>
    </section>
  );
}
