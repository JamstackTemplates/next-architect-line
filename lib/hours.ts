/** Optional weekly opening-hours model. Time zone stays in site.config.json. */
export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export type Day = (typeof DAYS)[number];
export interface OpeningHours {
  /** Every weekday occurs exactly once. */
  day: Day;
  /** Inclusive local HH:MM; omit both times for a closed day. */
  opens?: string;
  /** Exclusive local HH:MM; overnight intervals are deliberately unsupported. */
  closes?: string;
}

export interface OpeningStatus {
  state: 'open' | 'closed' | 'unknown';
  closes?: string;
  nextDay?: Day | 'today';
  nextOpens?: string;
}

const clock = /^([01]\d|2[0-3]):[0-5]\d$/;
const minutes = (value: string) => Number(value.slice(0, 2)) * 60 + Number(value.slice(3));

export function validateHours(hours: readonly OpeningHours[]): void {
  for (const day of DAYS) {
    const matches = hours.filter((entry) => entry.day === day);
    if (matches.length !== 1) throw new Error(`hours: ${day} must occur exactly once`);
    const { opens, closes } = matches[0];
    if (opens === undefined && closes === undefined) continue;
    if (!opens || !closes || !clock.test(opens) || !clock.test(closes) || minutes(opens) >= minutes(closes)) {
      throw new Error(`hours: ${day} needs HH:MM opening before closing; overnight service is unsupported`);
    }
  }
  if (hours.length !== 7) throw new Error('hours: expected seven weekdays');
}

/** Structured opening status evaluated in the configured IANA time zone. */
export function openingStatus(hours: readonly OpeningHours[], timeZone: string, now = new Date()): OpeningStatus {
  if (!timeZone) return { state: 'unknown' };
  validateHours(hours);
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(now);
  } catch {
    return { state: 'unknown' };
  }
  const part = (type: string) => parts.find((entry) => entry.type === type)?.value ?? '';
  const index = DAYS.indexOf(part('weekday') as Day);
  if (index < 0) return { state: 'unknown' };
  const current = Number(part('hour')) * 60 + Number(part('minute'));
  const today = hours.find((entry) => entry.day === DAYS[index])!;
  if (today.opens && today.closes && current >= minutes(today.opens) && current < minutes(today.closes)) {
    return { state: 'open', closes: today.closes };
  }
  for (let offset = 0; offset <= 7; offset++) {
    const day = DAYS[(index + offset) % 7];
    const entry = hours.find((value) => value.day === day)!;
    if (entry.opens && (offset > 0 || current < minutes(entry.opens))) {
      return { state: 'closed', nextDay: offset === 0 ? 'today' : day, nextOpens: entry.opens };
    }
  }
  return { state: 'closed' };
}

/** Browser callers supply the clock; build/static views never compute current availability. */
export function openingLabel(hours: readonly OpeningHours[], timeZone: string, now = new Date()): string {
  const status = openingStatus(hours, timeZone, now);
  if (status.state === 'unknown') return 'See opening hours';
  if (status.state === 'open') return `Open now · until ${status.closes}`;
  if (status.nextDay && status.nextOpens) return `Closed · opens ${status.nextDay} at ${status.nextOpens}`;
  return 'Closed · see opening hours';
}

/** Studio-tailored label used by OpenBadge ("Studio open now, by appointment" / "Studio closed, opens Monday 09:00"). */
export function studioOpeningLabel(
  hours: readonly OpeningHours[],
  timeZone: string,
  fallback: string,
  now = new Date(),
): { state: 'open' | 'closed' | 'unknown'; label: string } {
  const status = openingStatus(hours, timeZone, now);
  if (status.state === 'unknown') return { state: 'unknown', label: fallback };
  if (status.state === 'open') return { state: 'open', label: 'Studio open now, by appointment' };
  if (status.nextDay && status.nextOpens) {
    return { state: 'closed', label: `Studio closed, opens ${status.nextDay} ${status.nextOpens}` };
  }
  return { state: 'closed', label: fallback };
}
