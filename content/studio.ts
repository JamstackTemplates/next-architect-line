export interface Person {
  /** Full name and credentials, if applicable. */
  name: string;
  /** Role in the studio. */
  role: string;
  /** True for founding / managing principals. */
  principal: boolean;
}

export interface Principle {
  /** Formatted principle numeral ("01", "02", "03"). */
  number: string;
  /** Short principle title. */
  title: string;
  /** One-sentence explanation of the architectural principle. */
  sentence: string;
}

export interface Publication {
  /** Monograph, essay or exhibition title. */
  title: string;
  /** Publisher, journal or gallery venue. */
  outlet: string;
  /** Year of publication or exhibition. */
  year: number;
}

export const people: readonly Person[] = [
  { name: 'Mara Lindqvist AIA', role: 'Founding Principal', principal: true },
  { name: 'Tomasz Okafor AIA', role: 'Founding Principal', principal: true },
  { name: 'Hannah Kowalski AIA', role: 'Senior Associate — Civic & Reuse', principal: false },
  { name: 'David Alverez', role: 'Project Architect — Mass Timber', principal: false },
  { name: 'Nadia Benali', role: 'Project Architect — Residential', principal: false },
  { name: 'Owen MacLeod', role: 'Architectural Designer — Models & Detail', principal: false },
  { name: 'Claire Takahashi', role: 'Studio Manager & Archivist', principal: false },
];

export const principles: readonly Principle[] = [
  {
    number: '01',
    title: 'Structure is the finish',
    sentence:
      'We build with walls that carry load and age in the open—cast concrete, common brick, limestone and timber—so rooms need no applied decoration to hold their weight.',
  },
  {
    number: '02',
    title: 'Draw what the site already knows',
    sentence:
      'Every project begins by measuring wind off the lake, winter sun angles and the existing masonry or earth beneath our feet, keeping what works before adding anything new.',
  },
  {
    number: '03',
    title: 'One true line to the end',
    sentence:
      'A principal stays on the drawings from first site walk through the twelve-month inspection, protecting the clarity of the first section cut against compromise on site.',
  },
];

export const publications: readonly Publication[] = [
  {
    title: 'Plumb Line: Ten Buildings',
    outlet: 'Great Lakes Architectural Press (Monograph)',
    year: 2025,
  },
  {
    title: 'Masonry Without Veneer: Notes from Pullman',
    outlet: 'Inland Construction Quarterly, Issue 42',
    year: 2024,
  },
  {
    title: 'Second Lives: Adaptive Reuse in the Rust Belt',
    outlet: 'Chicago Architecture Center (Group Exhibition)',
    year: 2022,
  },
  {
    title: 'Board-Formed Concrete and Winter Light',
    outlet: 'Midwest Building Craft Journal, Vol. 18',
    year: 2020,
  },
];

export function validateStudio(): void {
  if (people.length < 2) throw new Error('studio.people: expected studio roster');
  const principals = people.filter((person) => person.principal);
  if (principals.length < 1) throw new Error('studio.people: at least one principal is required');
  for (const person of people) {
    if (!person.name.trim() || !person.role.trim()) {
      throw new Error(`studio.people: incomplete record for "${person.name || 'unknown'}"`);
    }
  }
  if (principles.length !== 3) throw new Error(`studio.principles: expected 3 principles (got ${principles.length})`);
  for (const principle of principles) {
    if (!principle.number.trim() || !principle.title.trim() || !principle.sentence.trim()) {
      throw new Error(`studio.principles: incomplete principle "${principle.number}"`);
    }
  }
  if (publications.length < 1) throw new Error('studio.publications: expected at least one publication');
  for (const pub of publications) {
    if (!pub.title.trim() || !pub.outlet.trim() || !Number.isInteger(pub.year) || pub.year < 2011 || pub.year > 2026) {
      throw new Error(`studio.publications: invalid entry "${pub.title || 'unknown'}"`);
    }
  }
}
