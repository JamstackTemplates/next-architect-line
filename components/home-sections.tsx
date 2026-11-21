import type { ReactNode } from 'react';
import type { Award } from '../content/awards';
import { business } from '../content/business';
import type { Stage } from '../content/process';
import {
  DRAWING_METADATA,
  PROJECT_TYPE_LABELS,
  formatPlateNumber,
  type Project,
} from '../content/projects';
import { mapDirectionsUrl } from '../lib/maps';
import { AwardsRegister } from './awards-register';
import { HeroElevation } from './drawings/hero-elevation';
import { MonadnockProfile } from './drawings/motifs';
import { ProjectDrawing } from './drawings/project-plates';
import {
  GridBubble,
  IconArrowRight,
  IconClock,
  IconCompass,
  IconEnvelope,
  IconPhone,
  IconPin,
  IconStair,
  ScaleBar,
} from './drawings/shared';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

type Children = { children: ReactNode };

/* -------------------------------------------------------------------------- */
/* 1. HERO PLATE                                                              */
/* -------------------------------------------------------------------------- */

function HeroRoot({ children }: Children) {
  return <section className="border-b border-line pt-5 pb-6 lg:pt-8 lg:pb-8">{children}</section>;
}

function HeroHeader({ children }: Children) {
  return (
    <div className="wrap">
      <div className="grid grid-cols-1 items-end gap-5 lg:grid-cols-12 lg:gap-8">{children}</div>
    </div>
  );
}

function HeroHeadingColumn({ children }: Children) {
  return <div className="lg:col-span-7">{children}</div>;
}

function HeroEyebrow({ children }: Children) {
  return <p className="eyebrow mb-2">{children}</p>;
}

function HeroHeading({ children }: Children) {
  return (
    <h1 className="font-display-tight text-[clamp(3.35rem,8.4vw,7.8rem)] font-bold uppercase text-ink">
      {children}
    </h1>
  );
}

function HeroAside({ children }: Children) {
  return <div className="flex flex-col gap-4 lg:col-span-5 lg:pb-2">{children}</div>;
}

function HeroIntroduction({ children }: Children) {
  return <p className="max-w-md text-[0.95rem] leading-relaxed text-muted sm:text-[1rem]">{children}</p>;
}

function HeroActions({ children }: Children) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>;
}

function HeroPrimaryAction({ children, href = '/contact/' }: { children: ReactNode; href?: string }) {
  return (
    <SiteLink href={href} className="button">
      <span>{children}</span>
      <IconArrowRight />
    </SiteLink>
  );
}

function HeroSecondaryAction({ children, href = '/work/' }: { children: ReactNode; href?: string }) {
  return (
    <SiteLink href={href} className="button button-quiet">
      <span>{children}</span>
    </SiteLink>
  );
}

function HeroPlate({ caption }: { caption: ReactNode }) {
  return (
    <figure className="mt-6 border-t border-line bg-surface lg:mt-8">
      <div className="w-full overflow-hidden border-b border-line">
        <div className="mx-auto max-w-[1680px] max-sm:-mx-[28%] max-sm:w-[156%]">
          <HeroElevation />
        </div>
      </div>
      <figcaption className="wrap flex flex-wrap items-center justify-between gap-3 py-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
        <span>{caption}</span>
        <ScaleBar scale="1:100" className="hidden sm:inline-flex" />
      </figcaption>
    </figure>
  );
}

export const Hero = Object.assign(HeroRoot, {
  Header: HeroHeader,
  HeadingColumn: HeroHeadingColumn,
  Eyebrow: HeroEyebrow,
  Heading: HeroHeading,
  Aside: HeroAside,
  Introduction: HeroIntroduction,
  Actions: HeroActions,
  PrimaryAction: HeroPrimaryAction,
  SecondaryAction: HeroSecondaryAction,
  Plate: HeroPlate,
});

/* -------------------------------------------------------------------------- */
/* 2. SELECTED WORK (Asymmetric staggered plates: 7+5, then 5+7)              */
/* -------------------------------------------------------------------------- */

function SelectedWorkRoot({
  projects,
  children,
}: {
  projects: readonly Project[];
  children: ReactNode;
}) {
  const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7'];

  return (
    <section className="wrap py-16 lg:py-20" aria-labelledby="selected-work-heading">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-4">
        {children}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        {projects.map((project, idx) => {
          const plateNum = formatPlateNumber(project.plate);
          const meta = DRAWING_METADATA[project.drawing];
          return (
            <article key={project.id} className={`plate-sheet group flex flex-col ${spans[idx % spans.length]}`}>
              <SiteLink
                href={`/work/${project.id}/`}
                className="flex h-full flex-col text-ink no-underline hover:no-underline"
              >
                <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                  <span className="inline-flex items-center gap-2.5">
                    <GridBubble label={plateNum} size="sm" />
                    <span className="text-ink">Pl. {plateNum}</span>
                  </span>
                  <span>
                    {PROJECT_TYPE_LABELS[project.type]} · {meta.scale}
                  </span>
                </div>

                <div className="flex flex-1 items-center justify-center p-4 sm:p-6">
                  <ProjectDrawing drawing={project.drawing} title={project.title} />
                </div>

                <div className="border-t border-line px-4 py-4 sm:px-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-[2rem] font-bold uppercase leading-none tracking-[0.01em] text-ink group-hover:text-accent-ink">
                      {project.title}
                    </h3>
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
                      {project.location} · {project.year}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted">{project.summary}</p>
                </div>
              </SiteLink>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function SelectedWorkHeading({ eyebrow, children }: { eyebrow: string; children: ReactNode }) {
  return (
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h2
        id="selected-work-heading"
        className="font-display-tight mt-2 text-[clamp(2.5rem,5.5vw,4.2rem)] font-bold uppercase text-ink"
      >
        {children}
      </h2>
    </div>
  );
}

function SelectedWorkMoreLink({ children, href = '/work/' }: { children: ReactNode; href?: string }) {
  return (
    <SiteLink
      href={href}
      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-accent-ink underline hover:text-ink"
    >
      <span>{children}</span>
      <IconArrowRight />
    </SiteLink>
  );
}

export const SelectedWork = Object.assign(SelectedWorkRoot, {
  Heading: SelectedWorkHeading,
  MoreLink: SelectedWorkMoreLink,
});

/* -------------------------------------------------------------------------- */
/* 3. STATEMENT BAND (Full-bleed board-form striations + dimension counts)    */
/* -------------------------------------------------------------------------- */

function StatementBandRoot({
  founded,
  builtCount,
  awardCount,
  children,
}: {
  founded: number;
  builtCount: number;
  awardCount: number;
  children: ReactNode;
}) {
  return (
    <section className="bg-boardform border-y border-line py-16 lg:py-24" aria-labelledby="practice-statement">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-10">{children}</div>
        </div>

        {/* Three oversized mono numerals set as architectural dimension strings */}
        <dl className="mt-12 grid grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-3">
          <div className="border-l border-line pl-4">
            <dt className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
              Founded in Chicago
            </dt>
            <dd className="mt-2 font-mono text-4xl tracking-[0.04em] text-ink sm:text-5xl">
              {founded}
            </dd>
          </div>
          <div className="border-l border-line pl-4">
            <dt className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
              Built projects on record
            </dt>
            <dd className="mt-2 font-mono text-4xl tracking-[0.04em] text-ink sm:text-5xl">
              {String(builtCount).padStart(2, '0')}
            </dd>
          </div>
          <div className="border-l border-line pl-4">
            <dt className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
              Design awards &amp; citations
            </dt>
            <dd className="mt-2 font-mono text-4xl tracking-[0.04em] text-ink sm:text-5xl">
              {String(awardCount).padStart(2, '0')}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function StatementEyebrow({ children }: Children) {
  return <p className="eyebrow mb-4">{children}</p>;
}

function StatementQuote({ children }: Children) {
  return (
    <h2
      id="practice-statement"
      className="font-display text-[clamp(2.6rem,6.4vw,5.4rem)] font-light leading-[0.96] tracking-[0.005em] text-ink"
    >
      {children}
    </h2>
  );
}

export const StatementBand = Object.assign(StatementBandRoot, {
  Eyebrow: StatementEyebrow,
  Quote: StatementQuote,
});

/* -------------------------------------------------------------------------- */
/* 4. PROCESS STRIP (Horizontal section line across 6 stages)                 */
/* -------------------------------------------------------------------------- */

function ProcessStripRoot({ stages, children }: { stages: readonly Stage[]; children: ReactNode }) {
  return (
    <section className="wrap py-16 lg:py-20" aria-labelledby="process-strip-heading">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">{children}</div>

      <div className="-mx-2 overflow-x-auto px-2 pb-4" tabIndex={0} role="region" aria-label="Six commission stages">
        <ol className="relative m-0 grid min-w-[780px] list-none grid-cols-6 gap-4 p-0">
          {/* Continuous horizontal section datum line */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-[14px] right-0 left-0 h-px bg-line"
          />

          {stages.map((stage) => (
            <li key={stage.id} className="relative pt-0">
              <div className="relative z-10 flex items-center gap-2 bg-bg pr-2 w-fit">
                <GridBubble label={String(stage.number).padStart(2, '0')} />
                <span className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-muted">
                  {stage.duration}
                </span>
              </div>
              <div className="mt-4 border-l border-line pl-3">
                <p className="font-display text-2xl font-bold uppercase leading-none text-ink">
                  {stage.name}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted">{stage.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ProcessStripHeading({ eyebrow, children }: { eyebrow: string; children: ReactNode }) {
  return (
    <div>
      <p className="eyebrow inline-flex items-center gap-2">
        <IconStair />
        <span>{eyebrow}</span>
      </p>
      <h2
        id="process-strip-heading"
        className="font-display-tight mt-2 text-[clamp(2.4rem,5vw,3.9rem)] font-bold uppercase text-ink"
      >
        {children}
      </h2>
    </div>
  );
}

function ProcessStripLink({ children, href = '/process/' }: { children: ReactNode; href?: string }) {
  return (
    <SiteLink
      href={href}
      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-accent-ink underline hover:text-ink"
    >
      <span>{children}</span>
      <IconArrowRight />
    </SiteLink>
  );
}

export const ProcessStrip = Object.assign(ProcessStripRoot, {
  Heading: ProcessStripHeading,
  Link: ProcessStripLink,
});

/* -------------------------------------------------------------------------- */
/* 5. RECOGNITION (Narrow 8-column centered engraved register)                */
/* -------------------------------------------------------------------------- */

function RecognitionRoot({ awards, children }: { awards: readonly Award[]; children: ReactNode }) {
  return (
    <section className="wrap py-16 lg:py-20" aria-labelledby="recognition-heading">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">{children}</div>
        <AwardsRegister items={awards} />
      </div>
    </section>
  );
}

function RecognitionHeading({ eyebrow, children }: { eyebrow: string; children: ReactNode }) {
  return (
    <div>
      <p className="eyebrow inline-flex items-center gap-2">
        <IconCompass />
        <span>{eyebrow}</span>
      </p>
      <h2
        id="recognition-heading"
        className="font-display-tight mt-2 text-[clamp(2.4rem,5vw,3.9rem)] font-bold uppercase text-ink"
      >
        {children}
      </h2>
    </div>
  );
}

function RecognitionLink({ children, href = '/studio/#awards' }: { children: ReactNode; href?: string }) {
  return (
    <SiteLink
      href={href}
      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-accent-ink underline hover:text-ink"
    >
      <span>{children}</span>
      <IconArrowRight />
    </SiteLink>
  );
}

export const RecognitionSection = Object.assign(RecognitionRoot, {
  Heading: RecognitionHeading,
  Link: RecognitionLink,
});

/* -------------------------------------------------------------------------- */
/* 6. STUDIO VISIT (Split: Monadnock line drawing left, details right)        */
/* -------------------------------------------------------------------------- */

function StudioVisitRoot({ children }: Children) {
  return (
    <section className="wrap py-16 lg:py-20" aria-labelledby="studio-visit-heading">
      <div className="grid grid-cols-1 items-center gap-10 border border-line bg-surface p-6 sm:p-10 lg:grid-cols-12">
        <div className="border-b border-line pb-8 lg:col-span-5 lg:border-r lg:border-b-0 lg:pr-8 lg:pb-0">
          <MonadnockProfile />
        </div>
        <div className="lg:col-span-7 lg:pl-4">{children}</div>
      </div>
    </section>
  );
}

function StudioVisitHeading({ eyebrow, children }: { eyebrow: string; children: ReactNode }) {
  return (
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h2
        id="studio-visit-heading"
        className="font-display-tight mt-2 text-[clamp(2.5rem,5.2vw,4.1rem)] font-bold uppercase text-ink"
      >
        {children}
      </h2>
    </div>
  );
}

function StudioVisitDetails() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-5 border-t border-line pt-6 sm:grid-cols-2">
      <div className="flex items-start gap-3">
        <IconPin className="mt-1 h-4 w-4 shrink-0" />
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">Address</p>
          <p className="mt-1 text-sm leading-relaxed text-ink">
            {business.address.suite}, {business.address.building}
            <br />
            {business.address.street}, {business.address.city}, {business.address.region}{' '}
            {business.address.postalCode}
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

      <div className="flex items-start gap-3">
        <IconClock className="mt-1 h-4 w-4 shrink-0" />
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">Studio Hours</p>
          <div className="mt-1">
            <OpenBadge hours={business.hours} />
          </div>
          <p className="mt-1 text-xs text-muted">{business.hoursSummary}</p>
          <TimeZoneNote className="text-muted font-mono text-[0.66rem] uppercase tracking-[0.1em]" />
        </div>
      </div>

      <div className="flex items-start gap-3">
        <IconPhone className="mt-1 h-4 w-4 shrink-0" />
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">Telephone</p>
          <p className="mt-1 font-mono text-sm text-ink">
            <a href={`tel:${business.phone.replace(/[^\d+]/g, '')}`} className="no-underline hover:underline">
              {business.phoneDisplay}
            </a>
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <IconEnvelope className="mt-1 h-4 w-4 shrink-0" />
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">Email</p>
          <p className="mt-1 text-sm">
            <a href={`mailto:${business.email}`} className="text-link wrap-anywhere">
              {business.email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function StudioVisitAction({ children, href = '/contact/' }: { children: ReactNode; href?: string }) {
  return (
    <div className="mt-8 border-t border-line pt-6">
      <SiteLink href={href} className="button">
        <span>{children}</span>
        <IconArrowRight />
      </SiteLink>
    </div>
  );
}

export const StudioVisit = Object.assign(StudioVisitRoot, {
  Heading: StudioVisitHeading,
  Details: StudioVisitDetails,
  Action: StudioVisitAction,
});
