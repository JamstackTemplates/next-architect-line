import type { ReactNode } from 'react';

/**
 * Architectural sheet heading block for inner pages:
 * mono sheet eyebrow ("Sheet 02 — Work"), huge left-hung condensed display title
 * connected to the plumb line datum, optional intro copy, and a per-page right-side motif.
 */
export function PageHead({
  eyebrow,
  title,
  children,
  id,
  motif,
  meta,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  /** Per-page line-drawn motif rendered at right on desktop. */
  motif?: ReactNode;
  /** Optional mono datum count or stamp beside the eyebrow. */
  meta?: ReactNode;
}) {
  return (
    <header className="border-b border-line">
      <div className="wrap py-[clamp(2.25rem,5vw,4rem)]">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <p className="eyebrow">{eyebrow}</p>
              {meta ? (
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-brass">
                  {meta}
                </span>
              ) : null}
            </div>
            <h1
              id={id}
              className="font-display-tight mt-3 text-[clamp(3.2rem,8.5vw,6.25rem)] font-bold uppercase text-ink"
            >
              {title}
            </h1>
            {children ? (
              <div className="mt-5 max-w-(--measure) text-[1.03rem] leading-relaxed text-muted">
                {children}
              </div>
            ) : null}
          </div>
          {motif ? (
            <div className="hidden items-end justify-end lg:col-span-4 lg:flex">
              {motif}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
