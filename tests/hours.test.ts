import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import {
  DAYS,
  openingLabel,
  studioOpeningLabel,
  validateHours,
  type OpeningHours,
} from '../lib/hours.ts';

const hours: OpeningHours[] = DAYS.map((day) =>
  day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' },
);
const at = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(at('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('closed weekdays and week wrap find the next service', () => {
  assert.equal(at('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(at('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map((day) => ({ day })), 'UTC'), 'Closed · see opening hours');
});

test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(at('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(at('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(at('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});

test('studio hours in America/Chicago respect 08:59/09:00/17:59/18:00 boundaries, weekends, and March/November DST', () => {
  const studioAt = (isoUtc: string) =>
    studioOpeningLabel(business.hours, 'America/Chicago', business.hoursSummary, new Date(isoUtc));

  // Standard Time (CST = UTC-6): Friday 2026-03-06 before spring-forward (2026-03-08)
  assert.deepEqual(studioAt('2026-03-06T14:59:00Z'), {
    state: 'closed',
    label: 'Studio closed, opens today 09:00',
  });
  assert.deepEqual(studioAt('2026-03-06T15:00:00Z'), {
    state: 'open',
    label: 'Studio open now, by appointment',
  });
  assert.deepEqual(studioAt('2026-03-06T23:59:00Z'), {
    state: 'open',
    label: 'Studio open now, by appointment',
  });
  assert.deepEqual(studioAt('2026-03-07T00:00:00Z'), {
    state: 'closed',
    label: 'Studio closed, opens Monday 09:00',
  });

  // Closed on Saturday & Sunday (including DST spring-forward Sunday 2026-03-08)
  assert.deepEqual(studioAt('2026-03-07T18:00:00Z'), {
    state: 'closed',
    label: 'Studio closed, opens Monday 09:00',
  });
  assert.deepEqual(studioAt('2026-03-08T18:00:00Z'), {
    state: 'closed',
    label: 'Studio closed, opens Monday 09:00',
  });

  // Daylight Saving Time (CDT = UTC-5): Monday 2026-03-09 right after March DST change
  assert.deepEqual(studioAt('2026-03-09T13:59:00Z'), {
    state: 'closed',
    label: 'Studio closed, opens today 09:00',
  });
  assert.deepEqual(studioAt('2026-03-09T14:00:00Z'), {
    state: 'open',
    label: 'Studio open now, by appointment',
  });
  assert.deepEqual(studioAt('2026-03-09T22:59:00Z'), {
    state: 'open',
    label: 'Studio open now, by appointment',
  });
  assert.deepEqual(studioAt('2026-03-09T23:00:00Z'), {
    state: 'closed',
    label: 'Studio closed, opens Tuesday 09:00',
  });

  // Fall-back DST change (2026-11-01): Monday 2026-11-02 returns to CST (UTC-6)
  assert.deepEqual(studioAt('2026-11-01T18:00:00Z'), {
    state: 'closed',
    label: 'Studio closed, opens Monday 09:00',
  });
  assert.deepEqual(studioAt('2026-11-02T14:59:00Z'), {
    state: 'closed',
    label: 'Studio closed, opens today 09:00',
  });
  assert.deepEqual(studioAt('2026-11-02T15:00:00Z'), {
    state: 'open',
    label: 'Studio open now, by appointment',
  });
  assert.deepEqual(studioAt('2026-11-02T23:59:00Z'), {
    state: 'open',
    label: 'Studio open now, by appointment',
  });
  assert.deepEqual(studioAt('2026-11-03T00:00:00Z'), {
    state: 'closed',
    label: 'Studio closed, opens Tuesday 09:00',
  });
});

test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(hours));
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(
      () => validateHours(hours.map((x) => (x.day === 'Tuesday' ? { ...x, opens } : x))),
      /Tuesday/,
    );
  }
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(
    () => validateHours(hours.map((x) => (x.day === 'Tuesday' ? { ...x, closes: undefined } : x))),
    /Tuesday/,
  );
});
