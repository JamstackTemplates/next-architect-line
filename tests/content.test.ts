import assert from 'node:assert/strict';
import { test } from 'node:test';
import { awards, validateAwards } from '../content/awards.ts';
import { business } from '../content/business.ts';
import { stages, validateStages } from '../content/process.ts';
import {
  getBuiltProjectCount,
  getFeaturedProjects,
  projects,
  validateProjects,
} from '../content/projects.ts';
import { people, validateStudio } from '../content/studio.ts';
import { validateHours } from '../lib/hours.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

test('business content has actionable required fields and enquiry-only wording', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email', 'phone'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.usefulToInclude.length >= 4, 'business.enquiries.usefulToInclude: include message guidance');
  for (const tip of business.enquiries.usefulToInclude) {
    assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
  }
  assert.doesNotMatch(
    business.enquiries.introduction,
    /\b(booked|confirmed|accepted|guaranteed|appointment confirmed)\b/i,
    'business.enquiries.introduction must phrase contact as an enquiry, never a confirmed booking or fee',
  );
  assert.doesNotThrow(() => validateHours(business.hours));
});

test('projects pass full validation, have distinct drawings, and name the item on failure', () => {
  assert.doesNotThrow(() => validateProjects(projects));
  assert.equal(getFeaturedProjects().length, 4);
  assert.equal(
    new Set(projects.map((p) => p.drawing)).size,
    projects.length,
    'every project must have its own distinct architectural drawing',
  );
  assert.equal(
    getBuiltProjectCount(),
    projects.filter((p) => p.status === 'completed').length,
  );

  // Item-specific failure checks
  assert.throws(
    () => validateProjects(projects.map((p) => (p.id === 'foundry-yard' ? { ...p, id: 'Foundry Yard!' } : p))),
    /Foundry Yard!/,
  );
  assert.throws(
    () => validateProjects(projects.map((p) => (p.id === 'foundry-yard' ? { ...p, plate: 1 } : p))),
    /foundry-yard/,
  );
  assert.throws(
    () => validateProjects(projects.map((p) => (p.id === 'dune-acres-house' ? { ...p, areaSqFt: 50 } : p))),
    /dune-acres-house/,
  );
  assert.throws(
    () => validateProjects(projects.map((p) => (p.id === 'ravine-studio' ? { ...p, materials: [] } : p))),
    /ravine-studio/,
  );
  assert.throws(
    () =>
      validateProjects(
        projects.map((p) => (p.id === 'lakeshore-house' ? { ...p, featured: false } : p)),
      ),
    /exactly 4 featured/,
  );
});

test('awards reference real projects, stay non-future, and name the item on failure', () => {
  assert.doesNotThrow(() => validateAwards(awards, projects));

  assert.throws(
    () =>
      validateAwards(
        awards.map((a) => (a.id === 'masonry-medal-2025' ? { ...a, projectId: 'missing-building' } : a)),
        projects,
      ),
    /masonry-medal-2025/,
  );
  assert.throws(
    () =>
      validateAwards(
        awards.map((a) => (a.id === 'prairie-honor-2024' ? { ...a, year: 2029 } : a)),
        projects,
      ),
    /prairie-honor-2024/,
  );
});

test('process stages are 1–6 consecutive and studio data is valid', () => {
  assert.doesNotThrow(() => validateStages(stages));
  assert.throws(
    () => validateStages(stages.map((s) => (s.id === 'design' ? { ...s, number: 9 } : s))),
    /design/,
  );
  assert.doesNotThrow(() => validateStudio());
});

test('structured data is ProfessionalService derived from content and escapes inline JSON-LD', () => {
  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'ProfessionalService');
  assert.equal(schema.additionalType, 'https://en.wikipedia.org/wiki/Architectural_firm');
  assert.equal(schema.name, business.name);
  assert.equal(schema.email, business.email);
  assert.equal(schema.telephone, business.phone);
  assert.equal(schema.address.addressLocality, 'Chicago');
  assert.equal(schema.openingHoursSpecification.length, 5);
  assert.equal(
    schema.founder.length,
    people.filter((person) => person.principal).length,
  );
  assert.equal(schema.award.length, awards.length);

  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});
