export interface Stage {
  /** Unique slug identifier. */
  id: string;
  /** Consecutive stage number from 1 to 6. */
  number: number;
  /** Stage title. */
  name: string;
  /** Typical calendar duration. */
  duration: string;
  /** What the studio produces and resolves during this stage. */
  summary: string;
  /** What decisions or inputs are needed from the client. */
  clientRole: string;
}

export const stages: readonly Stage[] = [
  {
    id: 'survey',
    number: 1,
    name: 'Survey and brief',
    duration: '2–4 weeks',
    summary:
      'We walk the site or existing structure, commission measured and geotechnical surveys, review zoning envelopes and test the brief against realistic area and budget targets before a line of architecture is drawn.',
    clientRole:
      'Share priorities, daily patterns, target budget range and any existing deeds, plats or past drawings.',
  },
  {
    id: 'massing',
    number: 2,
    name: 'Massing',
    duration: '4–6 weeks',
    summary:
      'Using physical basswood models, sun studies and plan diagrams, we establish the building’s footprint, section height, daylight strategy and relationship to street, neighbours and topography.',
    clientRole:
      'Review options in studio, weigh trade-offs of area against build quality and agree on one clear direction.',
  },
  {
    id: 'design',
    number: 3,
    name: 'Design development',
    duration: '8–12 weeks',
    summary:
      'We coordinate structural, mechanical and envelope engineers, draw full elevations and wall sections at 1:20, and select actual brick, timber, stone and hardware samples so every junction is resolved in advance.',
    clientRole:
      'Approve room layouts, material samples and a preliminary contractor cost check before technical drafting begins.',
  },
  {
    id: 'permit',
    number: 4,
    name: 'Permit and tender',
    duration: '8–16 weeks',
    summary:
      'We assemble complete construction drawings and written specifications, steer filings through municipal building and landmark departments, and issue comparable tender packages to vetted general contractors.',
    clientRole:
      'Interview shortlisted builders with us, review line-by-line bids and sign the construction contract directly with the builder.',
  },
  {
    id: 'site',
    number: 5,
    name: 'On site',
    duration: '6–24 months',
    summary:
      'We visit the site weekly during critical framing, concrete pours and masonry work, inspect full-size mock-ups, review shop drawings and certify monthly contractor payment applications.',
    clientRole:
      'Walk the site at key milestones, approve agreed allowances and settle builder valuations against certified progress.',
  },
  {
    id: 'handover',
    number: 6,
    name: 'Handover and first year',
    duration: '12 months',
    summary:
      'We compile the punch list at substantial completion, hand over as-built drawings and maintenance notes for raw timber and masonry, and return after four full seasons to inspect shrinkage, drainage and performance.',
    clientRole:
      'Move in, live or work in the building through a full Chicago winter and summer, and flag any seasonal adjustments before the twelve-month inspection.',
  },
];

export function validateStages(list: readonly Stage[] = stages): void {
  if (list.length !== 6) {
    throw new Error(`process: expected exactly 6 stages (got ${list.length})`);
  }
  const seenIds = new Set<string>();
  for (let i = 0; i < list.length; i++) {
    const stage = list[i];
    const expected = i + 1;
    const label = `stage "${stage.id || stage.name || expected}"`;
    if (!stage.id.trim()) throw new Error(`${label}: id is required`);
    if (seenIds.has(stage.id)) throw new Error(`${label}: duplicate stage id "${stage.id}"`);
    seenIds.add(stage.id);
    if (stage.number !== expected) {
      throw new Error(`${label}: stage numbers must be 1–6 and consecutive (expected ${expected}, got ${stage.number})`);
    }
    if (!stage.name.trim()) throw new Error(`${label}: name is required`);
    if (!stage.duration.trim()) throw new Error(`${label}: duration is required`);
    if (!stage.summary.trim()) throw new Error(`${label}: summary is required`);
    if (!stage.clientRole.trim()) throw new Error(`${label}: clientRole is required`);
  }
}
