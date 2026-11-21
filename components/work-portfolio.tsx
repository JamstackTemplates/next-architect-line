'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  DRAWING_METADATA,
  PROJECT_STATUS_LABELS,
  PROJECT_TYPES,
  PROJECT_TYPE_LABELS,
  formatPlateNumber,
  type Project,
  type ProjectType,
} from '../content/projects';
import { ProjectDrawing } from './drawings/project-plates';
import { GridBubble } from './drawings/shared';
import { PLUMB_TARGET_EVENT } from './plumb-line';
import { SiteLink } from './site-link';

type FilterValue = 'all' | ProjectType;

function parseHashFilter(hash: string): FilterValue {
  const value = hash.replace(/^#/, '').toLowerCase();
  if ((PROJECT_TYPES as readonly string[]).includes(value)) {
    return value as ProjectType;
  }
  return 'all';
}

/**
 * Interactive portfolio index for /work/.
 * - Filter bar appears only once JS is active (without JS all plates show and the bar stays hidden).
 * - Syncs choice to URL hash (#reuse, #residential, etc.) so filtered views can be linked.
 * - Uses aria-pressed on filter buttons and a polite live region announcing visible count.
 * - Hovering or focusing a plate drops the global brass plumb bob to align with that plate's title.
 */
export function WorkPortfolio({ projects }: { projects: readonly Project[] }) {
  const [hydrated, setHydrated] = useState(false);
  const [filter, setFilter] = useState<FilterValue>('all');

  useEffect(() => {
    setHydrated(true);
    setFilter(parseHashFilter(window.location.hash));

    const onHashChange = () => {
      setFilter(parseHashFilter(window.location.hash));
    };
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.dispatchEvent(new CustomEvent(PLUMB_TARGET_EVENT, { detail: { y: null } }));
    };
  }, []);

  const counts = useMemo(() => {
    const map: Record<FilterValue, number> = {
      all: projects.length,
      residential: 0,
      civic: 0,
      cultural: 0,
      workplace: 0,
      reuse: 0,
    };
    for (const project of projects) {
      map[project.type] += 1;
    }
    return map;
  }, [projects]);

  const visibleProjects = useMemo(
    () => (filter === 'all' ? projects : projects.filter((project) => project.type === filter)),
    [projects, filter],
  );

  const selectFilter = (next: FilterValue) => {
    setFilter(next);
    const nextHash = next === 'all' ? '' : `#${next}`;
    if (typeof window !== 'undefined') {
      const targetUrl = `${window.location.pathname}${window.location.search}${nextHash}`;
      window.history.replaceState(null, '', targetUrl);
    }
  };

  const announcePlumbY = (element: HTMLElement | null) => {
    if (!element) {
      window.dispatchEvent(new CustomEvent(PLUMB_TARGET_EVENT, { detail: { y: null } }));
      return;
    }
    const titleEl = element.querySelector<HTMLElement>('[data-plate-title]') ?? element;
    const rect = titleEl.getBoundingClientRect();
    window.dispatchEvent(
      new CustomEvent(PLUMB_TARGET_EVENT, { detail: { y: rect.top + rect.height / 2 - 14 } }),
    );
  };

  const filterButtons: { key: FilterValue; label: string }[] = [
    { key: 'all', label: 'All' },
    ...PROJECT_TYPES.map((type) => ({ key: type, label: PROJECT_TYPE_LABELS[type] })),
  ];

  return (
    <section className="wrap py-10 lg:py-14" aria-label="Project archive">
      {/* Filter bar: hidden without JavaScript per progressive enhancement requirement */}
      {hydrated ? (
        <div className="work-filter-bar mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by type">
            {filterButtons.map((btn) => {
              const active = filter === btn.key;
              return (
                <button
                  key={btn.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => selectFilter(btn.key)}
                  className={`inline-flex min-h-10 items-center gap-2 border px-3.5 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] transition-colors ${
                    active
                      ? 'border-ink bg-ink text-bg'
                      : 'border-line bg-surface text-ink hover:border-drawing'
                  }`}
                >
                  <span>{btn.label}</span>
                  <span className={active ? 'text-bg/75' : 'text-muted'}>
                    ({counts[btn.key]})
                  </span>
                </button>
              );
            })}
          </div>

          <p
            role="status"
            aria-live="polite"
            className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted"
          >
            {visibleProjects.length} {visibleProjects.length === 1 ? 'project' : 'projects'}
          </p>
        </div>
      ) : null}

      {/* Contact sheet grid: 3-column desktop, 2-column tablet, 1-column mobile; alternating wide plates fill every 3-col row cleanly */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project, index) => {
          const plateNum = formatPlateNumber(project.plate);
          const meta = DRAWING_METADATA[project.drawing];
          const isWide = visibleProjects.length > 3 && (index % 4 === 0 || index % 4 === 3);
          const showStamp = project.status !== 'completed';

          return (
            <article
              key={project.id}
              className={`plate-sheet group flex flex-col ${isWide ? 'lg:col-span-2' : ''}`}
              onPointerEnter={(e) => announcePlumbY(e.currentTarget)}
              onPointerLeave={() => announcePlumbY(null)}
              onFocus={(e) => announcePlumbY(e.currentTarget)}
              onBlur={() => announcePlumbY(null)}
            >
              <SiteLink
                href={`/work/${project.id}/`}
                className="flex h-full flex-col text-ink no-underline hover:no-underline"
              >
                {/* Plate header strip */}
                <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                  <span className="inline-flex items-center gap-2">
                    <GridBubble label={plateNum} size="sm" />
                    <span className="text-ink">Pl. {plateNum}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    {showStamp ? (
                      <span
                        data-status-stamp={project.status}
                        className="border border-accent px-1.5 py-0.5 text-[0.62rem] tracking-[0.15em] text-accent-ink"
                      >
                        {PROJECT_STATUS_LABELS[project.status].toUpperCase()}
                      </span>
                    ) : null}
                    <span>{PROJECT_TYPE_LABELS[project.type]}</span>
                  </div>
                </div>

                {/* Drawing canvas */}
                <div className="flex flex-1 items-center justify-center p-4 sm:p-5">
                  <ProjectDrawing drawing={project.drawing} title={project.title} />
                </div>

                {/* Plate title block */}
                <div className="border-t border-line px-4 py-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2
                      data-plate-title=""
                      className="font-display text-[1.9rem] font-bold uppercase leading-none text-ink group-hover:text-accent-ink"
                    >
                      {project.title}
                    </h2>
                    <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                      {project.year}
                    </span>
                  </div>
                  <p className="mt-1.5 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-muted">
                    {project.location} · {project.areaSqFt.toLocaleString('en-US')} sq ft · {meta.scale}
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{project.summary}</p>
                </div>
              </SiteLink>
            </article>
          );
        })}
      </div>
    </section>
  );
}
