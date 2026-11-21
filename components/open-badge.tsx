'use client';

import { useEffect, useState } from 'react';
import { business } from '../content/business';
import { studioOpeningLabel, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

/**
 * Browser-computed studio opening status in America/Chicago, refreshed every minute.
 * Static and no-JS output renders the neutral weekly hours summary only.
 */
export function OpenBadge({
  hours,
  fallback = business.hoursSummary,
}: {
  hours: readonly OpeningHours[];
  fallback?: string;
}) {
  const [status, setStatus] = useState<{ state: 'open' | 'closed' | 'unknown'; label: string }>({
    state: 'unknown',
    label: fallback,
  });

  useEffect(() => {
    const update = () => setStatus(studioOpeningLabel(hours, site.timeZone, fallback));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours, fallback]);

  return (
    <span className="inline-flex items-center gap-2 font-mono text-[0.74rem] uppercase tracking-[0.12em] text-ink">
      <span
        aria-hidden="true"
        className={`h-2 w-2 shrink-0 rounded-full ${
          status.state === 'open'
            ? 'bg-brass'
            : status.state === 'closed'
              ? 'border border-muted bg-transparent'
              : 'bg-line'
        }`}
      />
      <span>{status.label}</span>
    </span>
  );
}
