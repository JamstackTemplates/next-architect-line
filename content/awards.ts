import { projects, type Project } from './projects.ts';

export const AWARD_LEVELS = ['winner', 'commendation', 'shortlist'] as const;
export type AwardLevel = (typeof AWARD_LEVELS)[number];

export const AWARD_LEVEL_LABELS: Record<AwardLevel, string> = {
  winner: 'Winner',
  commendation: 'Commendation',
  shortlist: 'Shortlist',
};

export interface Award {
  /** Unique URL-safe identifier. */
  id: string;
  /** Award title. */
  name: string;
  /** Awarding body or organisation. */
  body: string;
  /** Year awarded (2011–2026, not in the future). */
  year: number;
  /** Award distinction. */
  level: AwardLevel;
  /** Must reference an existing project id in content/projects.ts. */
  projectId: string;
}

export const awards: readonly Award[] = [
  {
    id: 'masonry-medal-2025',
    name: 'Masonry Medal',
    body: 'Great Lakes Masonry Guild',
    year: 2025,
    level: 'winner',
    projectId: 'pullman-reading-room',
  },
  {
    id: 'prairie-honor-2024',
    name: 'Honor Award, Civic Architecture',
    body: 'Prairie Chapter of Architects',
    year: 2024,
    level: 'winner',
    projectId: 'pullman-reading-room',
  },
  {
    id: 'house-of-year-2023',
    name: 'House of the Year',
    body: 'Midwest Residential Design Review',
    year: 2023,
    level: 'winner',
    projectId: 'lakeshore-house',
  },
  {
    id: 'concrete-commend-2023',
    name: 'Commendation, Cast-in-Place',
    body: 'Concrete Craft Awards',
    year: 2023,
    level: 'commendation',
    projectId: 'lakeshore-house',
  },
  {
    id: 'reuse-prize-2022',
    name: 'Adaptive Reuse Prize',
    body: 'City Heritage Forum',
    year: 2022,
    level: 'winner',
    projectId: 'foundry-yard',
  },
  {
    id: 'sacred-space-2020',
    name: 'Sacred Space Award',
    body: 'Faith and Form Circle',
    year: 2020,
    level: 'winner',
    projectId: 'saint-brendan-chapel',
  },
  {
    id: 'timber-shortlist-2020',
    name: 'Shortlist, Small Projects',
    body: 'North American Timber Awards',
    year: 2020,
    level: 'shortlist',
    projectId: 'saint-brendan-chapel',
  },
  {
    id: 'community-build-2019',
    name: 'Community Building Award',
    body: 'Lakefront Civic Trust',
    year: 2019,
    level: 'commendation',
    projectId: 'south-shore-kiln',
  },
  {
    id: 'emerging-practice-2017',
    name: 'Emerging Practice Citation',
    body: 'Prairie Chapter of Architects',
    year: 2017,
    level: 'winner',
    projectId: 'ravine-studio',
  },
];

const LEVEL_PRIORITY: Record<AwardLevel, number> = {
  winner: 0,
  commendation: 1,
  shortlist: 2,
};

export function getAwardsNewestFirst(): Award[] {
  return [...awards].sort(
    (a, b) =>
      b.year - a.year ||
      LEVEL_PRIORITY[a.level] - LEVEL_PRIORITY[b.level] ||
      a.name.localeCompare(b.name),
  );
}

export function getRecentAwards(limit = 3): Award[] {
  return getAwardsNewestFirst().slice(0, limit);
}

export function getAwardsForProject(projectId: string): Award[] {
  return getAwardsNewestFirst().filter((award) => award.projectId === projectId);
}

export function getAwardsGroupedByYear(): { year: number; items: Award[] }[] {
  const map = new Map<number, Award[]>();
  for (const award of getAwardsNewestFirst()) {
    const group = map.get(award.year) ?? [];
    group.push(award);
    map.set(award.year, group);
  }
  return [...map.entries()].map(([year, items]) => ({ year, items }));
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateAwards(
  list: readonly Award[] = awards,
  projectList: readonly Project[] = projects,
  maxYear = 2026,
): void {
  const seenIds = new Set<string>();
  const projectIds = new Set(projectList.map((project) => project.id));

  for (const award of list) {
    const label = `award "${award.id || award.name || 'unknown'}"`;
    if (!award.id || !SLUG_PATTERN.test(award.id)) {
      throw new Error(`${label}: id must be a URL-safe lowercase slug`);
    }
    if (seenIds.has(award.id)) {
      throw new Error(`${label}: duplicate award id "${award.id}"`);
    }
    seenIds.add(award.id);
    if (!award.name.trim()) throw new Error(`${label}: name is required`);
    if (!award.body.trim()) throw new Error(`${label}: awarding body is required`);
    if (!Number.isInteger(award.year) || award.year < 2011 || award.year > maxYear) {
      throw new Error(`${label}: year must be between 2011 and ${maxYear} (got ${award.year})`);
    }
    if (!AWARD_LEVELS.includes(award.level)) {
      throw new Error(`${label}: invalid level "${award.level}"`);
    }
    if (!projectIds.has(award.projectId)) {
      throw new Error(`${label}: projectId "${award.projectId}" does not match any project in content/projects.ts`);
    }
  }
}
