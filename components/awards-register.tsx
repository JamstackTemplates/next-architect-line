import { AWARD_LEVEL_LABELS, type Award } from '../content/awards';
import { formatPlateNumber, getProjectById } from '../content/projects';
import { SiteLink } from './site-link';

/**
 * Engraved-plaque awards register shared between Home (3 most recent) and Studio (all, grouped by year).
 */
export function AwardsRegister({
  items,
  grouped = false,
}: {
  items: readonly Award[];
  grouped?: boolean;
}) {
  if (grouped) {
    const byYear = new Map<number, Award[]>();
    for (const award of items) {
      const list = byYear.get(award.year) ?? [];
      list.push(award);
      byYear.set(award.year, list);
    }

    return (
      <div className="divide-y divide-line border-y border-line">
        {[...byYear.entries()].map(([year, group]) => (
          <div key={year} className="grid grid-cols-1 gap-4 py-6 md:grid-cols-12">
            <div className="md:col-span-2">
              <span className="font-mono text-sm uppercase tracking-[0.16em] text-brass">{year}</span>
            </div>
            <ul className="m-0 list-none divide-y divide-line/60 p-0 md:col-span-10">
              {group.map((award) => (
                <AwardRow key={award.id} award={award} showYear={false} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  return (
    <ul className="m-0 list-none divide-y divide-line border-y border-line p-0">
      {items.map((award) => (
        <AwardRow key={award.id} award={award} showYear />
      ))}
    </ul>
  );
}

function AwardRow({ award, showYear }: { award: Award; showYear: boolean }) {
  const project = getProjectById(award.projectId);
  return (
    <li className="grid grid-cols-1 gap-2 py-4 first:pt-0 last:pb-0 sm:grid-cols-12 sm:items-baseline sm:gap-4">
      {showYear ? (
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-brass sm:col-span-2">
          {award.year}
        </span>
      ) : null}
      <div className={showYear ? 'sm:col-span-6' : 'sm:col-span-7'}>
        <p className="font-display text-[1.75rem] font-bold leading-none tracking-[0.01em] text-ink">
          {award.name}
        </p>
        <p className="mt-1.5 text-sm text-muted">
          {award.body} ·{' '}
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink">
            {AWARD_LEVEL_LABELS[award.level]}
          </span>
        </p>
      </div>
      <div className={`sm:text-right ${showYear ? 'sm:col-span-4' : 'sm:col-span-5'}`}>
        {project ? (
          <SiteLink
            href={`/work/${project.id}/`}
            className="inline-flex items-baseline gap-2 font-mono text-xs uppercase tracking-[0.12em] text-accent-ink underline hover:text-ink"
          >
            <span className="text-muted">Pl. {formatPlateNumber(project.plate)}</span>
            <span>{project.title}</span>
          </SiteLink>
        ) : null}
      </div>
    </li>
  );
}
