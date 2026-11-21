import type { Metadata } from 'next';
import { CopyEmail } from '../../components/copy-email';
import {
  IconClock,
  IconEnvelope,
  IconPhone,
  IconPin,
  PlumbBob,
  SectionLineDivider,
} from '../../components/drawings/shared';
import { GoogleMap } from '../../components/google-map';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { OpenBadge } from '../../components/open-badge';
import { PageHead } from '../../components/page-head';
import { TimeZoneNote } from '../../components/time-zone-note';
import { business } from '../../content/business';
import { mapDirectionsUrl } from '../../lib/maps';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);

  return (
    <>
      <PageHead
        eyebrow="Sheet 05 — Contact"
        title={business.enquiries.title}
        meta="Replies within 5 working days"
        motif={<PlumbBob className="h-24 w-12" />}
      >
        <p>{business.enquiries.introduction}</p>
      </PageHead>

      <div className="wrap py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left column: hosted Jamstacks support form OR unconfigured email fallback */}
          <section aria-label="Project enquiry form" className="lg:col-span-7">
            <div className="border border-line bg-surface p-6 sm:p-8">
              <p className="eyebrow mb-4">Enquiry sheet</p>
              {hosted ? (
                <JamstacksSupportForm
                  siteId={site.jamstacksSite}
                  embedUrl={site.jamstacksEmbedUrl}
                  email={business.email}
                />
              ) : (
                <div>
                  <h2 className="font-display-tight text-3xl font-bold uppercase text-ink">
                    Write to the studio directly
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    The online enquiry form is not connected on this preview. Send your enquiry
                    directly to{' '}
                    <a className="text-link wrap-anywhere" href={`mailto:${business.email}`}>
                      {business.email}
                    </a>{' '}
                    — a principal reads every message and replies within five working days.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Sending an email starts a conversation only; it does not appoint the studio or
                    confirm a meeting, site visit or fee.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a className="button" href={`mailto:${business.email}`}>
                      Email {business.email}
                    </a>
                    <CopyEmail email={business.email} />
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Right column: drawing-sheet title-block contact panel + useful-to-include list */}
          <aside aria-label="Studio contact details" className="lg:col-span-5">
            <div className="border border-line bg-surface">
              <div className="border-b border-line p-5">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                  Direct email (always open)
                </p>
                <div className="mt-2 flex items-start gap-3">
                  <IconEnvelope className="mt-1 h-4 w-4 shrink-0" />
                  <div className="min-w-0">
                    <a
                      className="text-link font-mono text-sm wrap-anywhere"
                      href={`mailto:${business.email}`}
                    >
                      {business.email}
                    </a>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <CopyEmail email={business.email} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 divide-y divide-line border-b border-line">
                {business.phone ? (
                  <div className="flex items-start gap-3 p-5">
                    <IconPhone className="mt-1 h-4 w-4 shrink-0" />
                    <div>
                      <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                        Telephone
                      </p>
                      <p className="mt-1 font-mono text-sm text-ink">
                        <a
                          className="no-underline hover:underline"
                          href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
                        >
                          {business.phoneDisplay}
                        </a>
                      </p>
                    </div>
                  </div>
                ) : null}

                <div className="flex items-start gap-3 p-5">
                  <IconPin className="mt-1 h-4 w-4 shrink-0" />
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                      Studio address
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink">
                      {business.address.formatted}
                    </p>
                    <a
                      href={mapDirectionsUrl(business.address.mapQuery)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-link mt-1 inline-block font-mono text-[0.7rem] uppercase tracking-[0.12em]"
                    >
                      Directions
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-5">
                  <IconClock className="mt-1 h-4 w-4 shrink-0" />
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                      Studio hours
                    </p>
                    <div className="mt-1">
                      <OpenBadge hours={business.hours} />
                    </div>
                    <p className="mt-1 text-xs text-muted">{business.hoursSummary}</p>
                    <TimeZoneNote className="text-muted font-mono text-[0.66rem] uppercase tracking-[0.1em]" />
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink">
                  Useful to include in your message
                </h2>
                <ul className="mt-3 list-none space-y-2.5 p-0 text-sm text-muted">
                  {business.enquiries.usefulToInclude.map((tip) => (
                    <li key={tip} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-px w-3 shrink-0 bg-brass"
                      />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <SectionLineDivider code="A" label="Monadnock Building" dimension="53 W JACKSON BLVD" />

      <section className="wrap py-8" aria-label="Studio map">
        <div className="border border-line bg-surface p-2">
          <GoogleMap
            address={business.address.mapQuery}
            title={`Map showing ${business.name} at ${business.address.formatted}`}
          />
        </div>
      </section>
    </>
  );
}
