import { useId } from 'react';

/** Shared SVG hatch patterns with instance-unique IDs so multiple drawings never collide. */
export function useDraftingPatterns() {
  const uid = useId().replace(/:/g, '');
  const hatchId = `hatch-45-${uid}`;
  const earthId = `earth-hatch-${uid}`;
  const denseId = `dense-hatch-${uid}`;

  const defs = (
    <defs>
      <pattern id={hatchId} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="8" stroke="var(--line)" strokeWidth="0.8" />
      </pattern>
      <pattern id={earthId} width="12" height="12" patternUnits="userSpaceOnUse">
        <path
          d="M0 12 L12 0 M-3 3 L3 -3 M9 15 L15 9"
          stroke="var(--line)"
          strokeWidth="0.75"
          fill="none"
        />
        <path d="M2 8 L6 12 M7 3 L11 7" stroke="var(--line)" strokeWidth="0.6" opacity="0.65" fill="none" />
      </pattern>
      <pattern id={denseId} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
        <line x1="0" y1="0" x2="0" y2="6" stroke="var(--drawing)" strokeWidth="0.65" opacity="0.55" />
      </pattern>
    </defs>
  );

  return { hatchId, earthId, denseId, defs };
}

/** Circled architectural grid bubble ("01", "A", "B") used on plates, headings and process strips. */
export function GridBubble({
  label,
  active = false,
  size = 'md',
}: {
  label: string;
  active?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  const dims =
    size === 'sm' ? 'h-6 w-6 text-[0.65rem]' : size === 'lg' ? 'h-9 w-9 text-xs' : 'h-7 w-7 text-[0.68rem]';
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border font-mono uppercase tracking-[0.06em] ${dims} ${
        active
          ? 'border-brass bg-brass-soft text-ink'
          : 'border-drawing text-ink'
      }`}
      aria-hidden="true"
    >
      {label}
    </span>
  );
}

/** Brass plumb bob inline SVG used in the header wordmark, signature plumb line and Contact motif. */
export function PlumbBob({
  className = 'h-7 w-3.5',
  showCord = true,
  tilted = false,
}: {
  className?: string;
  showCord?: boolean;
  tilted?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 18 38"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g transform={tilted ? 'rotate(3 9 2)' : undefined}>
        {showCord ? (
          <line
            x1="9"
            y1="0"
            x2="9"
            y2="11"
            stroke="var(--drawing)"
            strokeWidth="0.9"
            vectorEffect="non-scaling-stroke"
          />
        ) : null}
        <circle
          cx="9"
          cy="12.5"
          r="2"
          stroke="var(--brass)"
          strokeWidth="1.2"
          fill="var(--surface)"
        />
        <polygon points="3.2,15.5 14.8,15.5 9,34.5" fill="var(--brass)" />
        <line x1="9" y1="15.5" x2="9" y2="34.5" stroke="var(--bg)" strokeWidth="0.8" opacity="0.35" />
        <line x1="3.2" y1="15.5" x2="14.8" y2="15.5" stroke="var(--drawing)" strokeWidth="0.75" />
      </g>
    </svg>
  );
}

/** Architectural graphic scale bar rendered in drafting stroke and mono ticks. */
export function ScaleBar({
  scale = '1:100',
  className = '',
}: {
  scale?: string;
  className?: string;
}) {
  return (
    <div className={`inline-flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted ${className}`}>
      <span>Scale {scale}</span>
      <svg viewBox="0 0 140 16" className="h-3.5 w-28" aria-hidden="true">
        <line x1="2" y1="10" x2="134" y2="10" className="draft-fine" />
        <rect x="2" y="6" width="22" height="4" fill="var(--drawing)" />
        <rect x="24" y="6" width="22" height="4" fill="none" stroke="var(--drawing)" strokeWidth="0.75" />
        <rect x="46" y="6" width="44" height="4" fill="var(--drawing)" />
        <rect x="90" y="6" width="44" height="4" fill="none" stroke="var(--drawing)" strokeWidth="0.75" />
        <line x1="2" y1="3" x2="2" y2="13" className="draft-fine" />
        <line x1="46" y1="3" x2="46" y2="13" className="draft-fine" />
        <line x1="90" y1="3" x2="90" y2="13" className="draft-fine" />
        <line x1="134" y1="3" x2="134" y2="13" className="draft-fine" />
      </svg>
      <span>0 — 20 FT</span>
    </div>
  );
}

/** Minimal drafting north arrow. */
export function NorthArrow({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="11" className="draft-hairline" />
      <line x1="16" y1="2" x2="16" y2="30" className="draft-fine" />
      <line x1="6" y1="16" x2="26" y2="16" className="draft-hairline" />
      <polygon points="16,5 19.5,16 16,13.5 12.5,16" fill="var(--drawing)" />
    </svg>
  );
}

/** Full-width horizontal hairline section-cut divider with dimension ticks and cut arrows ("A—A"). */
export function SectionLineDivider({
  code = 'A',
  dimension = 'EL. +0\'-0"',
  label,
}: {
  code?: string;
  dimension?: string;
  label?: string;
}) {
  return (
    <div className="wrap py-4" aria-hidden="true">
      <div className="flex items-center gap-3 text-muted">
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em]">
          <svg viewBox="0 0 18 14" className="h-3 w-4" fill="none">
            <line x1="2" y1="7" x2="16" y2="7" className="draft-cut" />
            <polygon points="2,7 7,2 7,12" fill="var(--drawing)" />
          </svg>
          {code}
        </span>

        <div className="relative h-px flex-1 bg-line">
          <span className="absolute -top-1.5 left-0 h-3 w-px bg-drawing" />
          <span className="absolute -top-1 left-1/4 h-2 w-px bg-line" />
          <span className="absolute -top-1.5 left-1/2 h-3 w-px bg-line" />
          <span className="absolute -top-1 left-3/4 h-2 w-px bg-line" />
          <span className="absolute -top-1.5 right-0 h-3 w-px bg-drawing" />
        </div>

        <span className="hidden font-mono text-[0.66rem] uppercase tracking-[0.16em] text-muted sm:inline">
          {label ? `${label} · ${dimension}` : dimension}
        </span>

        <span className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em]">
          {code}
          <svg viewBox="0 0 18 14" className="h-3 w-4" fill="none">
            <line x1="2" y1="7" x2="16" y2="7" className="draft-cut" />
            <polygon points="16,7 11,2 11,12" fill="var(--drawing)" />
          </svg>
        </span>
      </div>
    </div>
  );
}

/** Drawing-sheet title block used on project sheets and structured summary panels. */
export function TitleBlock({
  studio = 'Plumb Line Architects',
  project,
  plate,
  scale,
  date,
  status,
  view,
}: {
  studio?: string;
  project: string;
  plate: string;
  scale: string;
  date: string;
  status?: string;
  view?: string;
}) {
  return (
    <div className="grid grid-cols-2 border-t border-line bg-surface font-mono text-[0.68rem] uppercase tracking-[0.13em] sm:grid-cols-12">
      <div className="border-b border-r border-line px-3 py-2.5 sm:col-span-4 sm:border-b-0">
        <span className="block text-[0.6rem] text-muted">Practice</span>
        <span className="mt-0.5 block text-ink">{studio}</span>
      </div>
      <div className="border-b border-line px-3 py-2.5 sm:col-span-4 sm:border-b-0 sm:border-r">
        <span className="block text-[0.6rem] text-muted">{view || 'Drawing'}</span>
        <span className="mt-0.5 block text-ink">{project}</span>
      </div>
      <div className="border-r border-line px-3 py-2.5 sm:col-span-2">
        <span className="block text-[0.6rem] text-muted">Scale / Year</span>
        <span className="mt-0.5 block text-ink">
          {scale} · {date}
        </span>
      </div>
      <div className="flex items-center justify-between gap-2 px-3 py-2.5 sm:col-span-2">
        <div>
          <span className="block text-[0.6rem] text-muted">Sheet</span>
          <span className="mt-0.5 block text-ink">{plate}</span>
        </div>
        {status ? (
          <span className="border border-accent px-1.5 py-0.5 text-[0.6rem] text-accent-ink">
            {status}
          </span>
        ) : null}
      </div>
    </div>
  );
}

/* Drafting line icons — shared fine line weight, square caps, zero fills */
export function IconPin({ className = 'h-4 w-4 shrink-0' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M10 18 L10 12 M10 2 L15 7 L10 12 L5 7 Z" className="draft-cut" />
      <circle cx="10" cy="7" r="1.5" fill="var(--brass)" />
    </svg>
  );
}

export function IconClock({ className = 'h-4 w-4 shrink-0' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" className="draft-cut" />
      <path d="M10 5.5 V10 L13.5 12" className="draft-cut" />
    </svg>
  );
}

export function IconPhone({ className = 'h-4 w-4 shrink-0' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <rect x="5" y="2.5" width="10" height="15" className="draft-cut" />
      <line x1="5" y1="5.5" x2="15" y2="5.5" className="draft-fine" />
      <line x1="5" y1="14.5" x2="15" y2="14.5" className="draft-fine" />
      <circle cx="10" cy="16" r="0.6" fill="var(--drawing)" />
    </svg>
  );
}

export function IconEnvelope({ className = 'h-4 w-4 shrink-0' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <rect x="2.5" y="4.5" width="15" height="11" className="draft-cut" />
      <path d="M2.5 5 L10 11 L17.5 5" className="draft-fine" />
    </svg>
  );
}

export function IconCompass({ className = 'h-4 w-4 shrink-0' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <circle cx="10" cy="4" r="1.5" className="draft-cut" />
      <path d="M9.2 5.5 L4.5 17.5 M10.8 5.5 L15.5 17.5 M5.5 12.5 Q10 15 14.5 12.5" className="draft-cut" />
    </svg>
  );
}

export function IconStair({ className = 'h-4 w-4 shrink-0' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M2.5 16.5 H6.5 V12.5 H10.5 V8.5 H14.5 V4.5 H17.5" className="draft-cut" />
      <line x1="2.5" y1="16.5" x2="17.5" y2="16.5" className="draft-hairline" />
    </svg>
  );
}

export function IconArrowRight({ className = 'h-3.5 w-3.5 shrink-0' }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 12" fill="none" className={className} aria-hidden="true">
      <path d="M1 6 H16 M11 1.5 L16 6 L11 10.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" />
    </svg>
  );
}

export function IconArrowLeft({ className = 'h-3.5 w-3.5 shrink-0' }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 12" fill="none" className={className} aria-hidden="true">
      <path d="M17 6 H2 M7 1.5 L2 6 L7 10.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" />
    </svg>
  );
}
