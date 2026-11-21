'use client';

import { useEffect, useRef, useState } from 'react';
import type { Stage } from '../content/process';
import { BuildingSection } from './drawings/motifs';
import { GridBubble } from './drawings/shared';

/**
 * Interactive six-stage building section for /process/.
 * - Sticky BuildingSection on desktop left; IntersectionObserver lights up each floor in brass as its stage scrolls into view.
 * - Mobile renders a compact horizontal 6-floor strip above each stage.
 * - Without JS, activeStage stays 0 so all six floors render in their normal neutral architectural state.
 */
export function ProcessStages({ stages }: { stages: readonly Stage[] }) {
  const [activeStage, setActiveStage] = useState<number>(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const num = Number(visible[0].target.getAttribute('data-stage'));
          if (num >= 1 && num <= 6) setActiveStage(num);
        }
      },
      { rootMargin: '-25% 0px -45% 0px', threshold: [0.15, 0.5, 0.8] },
    );

    for (const el of refs.current) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section className="wrap py-12 lg:py-16" aria-label="Six architectural stages">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Sticky six-storey section diagram at desktop */}
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-24 border border-line bg-surface p-5">
            <BuildingSection activeStage={activeStage} />
          </div>
        </div>

        {/* Six stages on the right */}
        <ol className="m-0 list-none divide-y divide-line border-y border-line p-0 lg:col-span-7">
          {stages.map((stage, idx) => {
            const isActive = activeStage === stage.number;
            return (
              <li
                key={stage.id}
                id={stage.id}
                data-stage={stage.number}
                ref={(el) => {
                  refs.current[idx] = el;
                }}
                className="py-8 lg:py-10"
              >
                {/* Compact horizontal strip on mobile */}
                <div className="mb-4 lg:hidden">
                  <BuildingSection compact activeStage={stage.number} />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <GridBubble label={String(stage.number).padStart(2, '0')} active={isActive} size="lg" />
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                      Stage {String(stage.number).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="border border-line bg-surface px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink">
                    Typical duration · {stage.duration}
                  </span>
                </div>

                <h2 className="font-display-tight mt-4 text-[clamp(2.2rem,4.5vw,3.4rem)] font-bold uppercase text-ink">
                  {stage.name}
                </h2>
                <p className="mt-4 max-w-(--measure) text-[0.98rem] leading-relaxed text-ink/90">
                  {stage.summary}
                </p>

                <div className="mt-5 border-l-2 border-brass bg-surface px-4 py-3">
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-muted">
                    Your part
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink">{stage.clientRole}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
