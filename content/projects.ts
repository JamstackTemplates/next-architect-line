export const PROJECT_STATUSES = ['completed', 'on-site', 'in-design'] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const PROJECT_TYPES = ['residential', 'civic', 'cultural', 'workplace', 'reuse'] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

export const CLIENT_TYPES = ['private', 'non-profit', 'public', 'developer'] as const;
export type ClientType = (typeof CLIENT_TYPES)[number];

export const DRAWING_KEYS = [
  'elevation-house',
  'section-library',
  'axo-foundry',
  'elevation-chapel',
  'plan-studio',
  'elevation-offices',
  'section-house',
  'axo-kiln',
] as const;
export type DrawingKey = (typeof DRAWING_KEYS)[number];

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  residential: 'Residential',
  civic: 'Civic',
  cultural: 'Cultural',
  workplace: 'Workplace',
  reuse: 'Reuse',
};

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  completed: 'Completed',
  'on-site': 'On site',
  'in-design': 'In design',
};

export const CLIENT_TYPE_LABELS: Record<ClientType, string> = {
  private: 'Private',
  'non-profit': 'Non-profit',
  public: 'Public',
  developer: 'Developer',
};

export const DRAWING_METADATA: Record<DrawingKey, { view: string; scale: string }> = {
  'elevation-house': { view: 'South elevation', scale: '1:100' },
  'section-library': { view: 'Transverse section A—A', scale: '1:100' },
  'axo-foundry': { view: 'Exploded axonometric', scale: '1:200' },
  'elevation-chapel': { view: 'West gable elevation', scale: '1:50' },
  'plan-studio': { view: 'Ground floor plan', scale: '1:75' },
  'elevation-offices': { view: 'East street elevation', scale: '1:200' },
  'section-house': { view: 'Longitudinal section B—B', scale: '1:100' },
  'axo-kiln': { view: 'Cutaway axonometric', scale: '1:150' },
};

export interface Project {
  /** URL-safe unique slug used as the /work/[id]/ route segment. */
  id: string;
  /** Unique monograph plate number (1–99); controls plate ordering and display ("Pl. 01"). */
  plate: number;
  /** Building or project title. */
  title: string;
  /** Neighbourhood or town and state. */
  location: string;
  /** Completion year, or expected completion year (2011–2027). */
  year: number;
  /** Current stage of construction; edited frequently by the studio. */
  status: ProjectStatus;
  /** Primary typology used for portfolio filtering. */
  type: ProjectType;
  /** Gross internal floor area in square feet (200–200000). */
  areaSqFt: number;
  /** Commissioning body category. */
  client: ClientType;
  /** Concise structural system description. */
  structure: string;
  /** One to four principal building materials. */
  materials: readonly string[];
  /** Key selecting the bespoke inline SVG architectural drawing. */
  drawing: DrawingKey;
  /** One-sentence plate caption and page meta description (≤ 160 characters). */
  summary: string;
  /** Two to three short architectural narrative paragraphs. */
  narrative: readonly string[];
  /** Exactly four projects are marked featured for the Home page. */
  featured: boolean;
}

export const projects: readonly Project[] = [
  {
    id: 'lakeshore-house',
    plate: 1,
    title: 'Lakeshore House',
    location: 'Evanston, IL',
    year: 2022,
    status: 'completed',
    type: 'residential',
    areaSqFt: 3400,
    client: 'private',
    structure: 'Board-formed concrete walls, steel roof beams',
    materials: ['board-formed concrete', 'oiled oak', 'zinc'],
    drawing: 'elevation-house',
    summary:
      'Three concrete walls and a single oak roof hold a family house between a wooded ravine and Lake Michigan.',
    narrative: [
      'Set at the narrow pinch where a clay bluff meets a shaded north-shore ravine, the house is organised around three parallel board-formed concrete walls cast in eight-inch Douglas fir lifts. The walls step down the grade to anchor living rooms above the tree canopy while shielding the entry courtyard from winter lake winds.',
      'Across those walls rests a single horizontal roof plane of concealed steel beams lined underneath in oiled white oak and capped in standing-seam zinc. Between the structural bays, deep recessed glass opens straight through the plan so the lake horizon remains legible from the front threshold.',
      'No plaster or drywall hides the construction: electrical conduits, brass hardware and hearth flues were set before the pours, leaving the thermal mass exposed to temper summer heat and register low winter sun across the concrete grain.',
    ],
    featured: true,
  },
  {
    id: 'pullman-reading-room',
    plate: 2,
    title: 'Pullman Reading Room',
    location: 'Pullman, Chicago, IL',
    year: 2024,
    status: 'completed',
    type: 'civic',
    areaSqFt: 9800,
    client: 'public',
    structure: 'Loadbearing brick with glulam roof',
    materials: ['common brick', 'glulam', 'terrazzo'],
    drawing: 'section-library',
    summary:
      'A neighbourhood civic library built in Chicago common brick beneath a clear-span glulam lantern roof.',
    narrative: [
      'Occupying a corner lot two blocks from the historic Pullman clock tower, this branch reading room returns to the district’s loadbearing masonry tradition without imitation. Thick solid walls of reclaimed and local common brick carry deep glulam timber trusses across a single sixty-foot hall, eliminating interior columns.',
      'A continuous north-facing roof lantern washes the acoustic timber soffit and long white-oak tables in even daylight, freeing the perimeter masonry for tall reading alcoves and low bookstacks. In winter, hydronic tubing cast into the ground-stone terrazzo slab heats the room quietly from underfoot.',
      'Smaller study rooms, a local history archive and a civic meeting room occupy a thicker masonry service bar along the alley, allowing the main reading hall to remain calm, legible and open to the street.',
    ],
    featured: true,
  },
  {
    id: 'foundry-yard',
    plate: 3,
    title: 'Foundry Yard',
    location: 'West Loop, Chicago, IL',
    year: 2021,
    status: 'completed',
    type: 'reuse',
    areaSqFt: 42000,
    client: 'developer',
    structure: 'Retained 1912 brick shell, new steel mezzanines',
    materials: ['reclaimed brick', 'blackened steel', 'polished concrete'],
    drawing: 'axo-foundry',
    summary:
      'Adaptive reuse of a 1912 brass foundry into studio workspaces via freestanding blackened-steel mezzanines.',
    narrative: [
      'Rather than gutting or furring out a soot-darkened 1912 brick foundry shell, the intervention treats the existing envelope as a sheltered ruin and inserts an independent structural frame of blackened wide-flange steel inside it. Every new mezzanine holds back eighteen inches from the historic masonry so daylight and original arched openings run unbroken across two storeys.',
      'A central bay of deteriorated roof deck was removed to carve a gravelled open-air yard at the heart of the block, bringing natural cross-ventilation and planted birch trees deep into a previously windowless floorplate. New north-facing sawtooth monitors replace patched skylights above the outer bays.',
      'Original crane rails remain overhead as a datum line; mechanical runs sit consolidated in floor plenums beneath diamond-ground concrete slabs so the steel and brick meet without ceiling clutter.',
    ],
    featured: true,
  },
  {
    id: 'saint-brendan-chapel',
    plate: 4,
    title: 'Chapel of St Brendan',
    location: 'Door County, WI',
    year: 2019,
    status: 'completed',
    type: 'cultural',
    areaSqFt: 1600,
    client: 'non-profit',
    structure: 'Limestone walls, timber roof',
    materials: ['Wisconsin limestone', 'white oak', 'lime plaster'],
    drawing: 'elevation-chapel',
    summary:
      'A quiet lakeside chapel of coursed Wisconsin limestone lit by a single off-centre vertical slot window.',
    narrative: [
      'Built on a cedar clearing above Green Bay for a small retreat trust, the chapel reduces sacred space to stone mass, timber shelter and one measured shaft of west light. Thick cavity walls of locally quarried Niagara dolomite limestone rise to a steep gable with a recessed timber eaves edge.',
      'Instead of stained glass or ornament, a single fifteen-foot vertical aperture slices the west gable off-centre, casting a moving line of sunlight across lime-plastered interior walls and unvarnished white-oak benches from midday through vespers.',
      'Outside the entrance porch stands a freestanding blackened-steel bell frame carrying a cast bronze bell salvaged from a decommissioned lake schooner, anchoring the small building to the open clearing.',
    ],
    featured: true,
  },
  {
    id: 'ravine-studio',
    plate: 5,
    title: 'Ravine Studio',
    location: 'Highland Park, IL',
    year: 2016,
    status: 'completed',
    type: 'residential',
    areaSqFt: 900,
    client: 'private',
    structure: 'Timber frame on concrete piers',
    materials: ['charred cedar', 'Douglas fir', 'glass'],
    drawing: 'plan-studio',
    summary:
      'A 900-square-foot painter and writer’s pavilion poised on six concrete piers above a wooded ravine.',
    narrative: [
      'Commissioned as a year-round workplace at the edge of an erodible bluff, the studio touches the slope at only six hand-dug concrete piers so stormwater and tree roots continue uninterrupted below the floor.',
      'A disciplined four-foot Douglas fir structural module sets the rhythm of interior bookshelves, worktables and north glazing. Externally, vertical charred cedar boards weather to the tone of damp oak bark, while a cantilevered deck projects straight into the ravine canopy.',
    ],
    featured: false,
  },
  {
    id: 'canal-street-offices',
    plate: 6,
    title: 'Canal Street Offices',
    location: 'Fulton Market, Chicago, IL',
    year: 2026,
    status: 'on-site',
    type: 'workplace',
    areaSqFt: 68000,
    client: 'developer',
    structure: 'Cross-laminated timber on concrete podium',
    materials: ['CLT', 'precast concrete', 'bronze'],
    drawing: 'elevation-offices',
    summary:
      'A six-storey mass-timber workplace rising over a precast concrete street arcade along the North Branch.',
    narrative: [
      'Currently under construction near the Fulton Market rail corridor, Canal Street Offices pairs a grounded two-storey precast concrete arcade with five upper floors of exposed cross-laminated timber and glulam framing. The timber structure cuts embodied carbon by nearly half compared with an equivalent steel frame.',
      'Deep recessed window bays framed in weathered architectural bronze provide passive solar shading while expressing the honest twenty-five-foot structural grid on every elevation. Operable vent panels at each column line allow mixed-mode natural ventilation through spring and autumn.',
      'At ground level, a double-height public passage links Canal Street directly to a planted riverside walk, bringing civic generosity to a dense commercial block.',
    ],
    featured: false,
  },
  {
    id: 'dune-acres-house',
    plate: 7,
    title: 'Dune Acres House',
    location: 'Dune Acres, IN',
    year: 2027,
    status: 'in-design',
    type: 'residential',
    areaSqFt: 2800,
    client: 'private',
    structure: 'Rammed earth walls, timber roof',
    materials: ['rammed earth', 'larch', 'copper'],
    drawing: 'section-house',
    summary:
      'Banded rammed-earth walls and a low copper-sheathed roof folded into the lee of an Indiana lake dune.',
    narrative: [
      'In design for a shifting sand ridge overlooking the southern shore of Lake Michigan, the house anchors itself into the dune profile with twenty-four-inch insulated rammed-earth walls compacted from regional glacial aggregates and clay.',
      'The horizontal striations of each tamped lift echo the wind-cut strata of the surrounding foredunes. Above, a low-pitched larch ceiling and standing-seam copper roof shelter a wind-protected courtyard so the owners can sit outdoors even when lake gusts sweep the crest.',
    ],
    featured: false,
  },
  {
    id: 'south-shore-kiln',
    plate: 8,
    title: 'South Shore Kiln Workshops',
    location: 'South Shore, Chicago, IL',
    year: 2018,
    status: 'completed',
    type: 'reuse',
    areaSqFt: 12500,
    client: 'non-profit',
    structure: 'Retained brick kiln sheds, new timber trusses',
    materials: ['common brick', 'timber trusses', 'polycarbonate'],
    drawing: 'axo-kiln',
    summary:
      'Former terra-cotta drying sheds adapted into community ceramics, woodworking and youth fabrication studios.',
    narrative: [
      'Two derelict brick kiln sheds and a sixty-foot tapered chimney stood vacant on the South Shore for thirty years before a neighbourhood arts collective acquired the parcel. Rather than erasing the soot-stained masonry, we stabilised the walls and crowned them with crisp new Douglas fir scissor trusses.',
      'Where gable walls had collapsed, translucent multi-wall polycarbonate panels close the enclosure cleanly, turning the workshops into a soft lantern along the street at dusk while flooding workbenches with glare-free daylight by day.',
      'A shared timber-framed tool library joins the twin sheds around a paved firing yard, creating flexible, tough civic workspace built to absorb decades of heavy use.',
    ],
    featured: false,
  },
];

export function formatPlateNumber(plate: number): string {
  return String(plate).padStart(2, '0');
}

export function getProjectsInPlateOrder(): Project[] {
  return [...projects].sort((a, b) => a.plate - b.plate);
}

export function getFeaturedProjects(): Project[] {
  return getProjectsInPlateOrder().filter((project) => project.featured);
}

export function getBuiltProjectCount(): number {
  return projects.filter((project) => project.status === 'completed').length;
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getProjectNeighbors(id: string): { prev: Project; next: Project } | null {
  const ordered = getProjectsInPlateOrder();
  const idx = ordered.findIndex((project) => project.id === id);
  if (idx < 0) return null;
  const prev = ordered[(idx - 1 + ordered.length) % ordered.length];
  const next = ordered[(idx + 1) % ordered.length];
  return { prev, next };
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateProjects(list: readonly Project[] = projects): void {
  if (!list.length) throw new Error('projects: at least one project is required');

  const seenIds = new Set<string>();
  const seenPlates = new Set<number>();
  let featuredCount = 0;

  for (const project of list) {
    const label = `project "${project.id || project.title || 'unknown'}"`;

    if (!project.id || !SLUG_PATTERN.test(project.id)) {
      throw new Error(`${label}: id must be a URL-safe lowercase slug`);
    }
    if (seenIds.has(project.id)) {
      throw new Error(`${label}: duplicate project id "${project.id}"`);
    }
    seenIds.add(project.id);

    if (!Number.isInteger(project.plate) || project.plate < 1 || project.plate > 99) {
      throw new Error(`${label}: plate must be an integer between 1 and 99 (got ${project.plate})`);
    }
    if (seenPlates.has(project.plate)) {
      throw new Error(`${label}: duplicate plate number ${project.plate}`);
    }
    seenPlates.add(project.plate);

    if (!project.title.trim()) throw new Error(`${label}: title is required`);
    if (!project.location.trim()) throw new Error(`${label}: location is required`);
    if (!Number.isInteger(project.year) || project.year < 2011 || project.year > 2027) {
      throw new Error(`${label}: year must be an integer between 2011 and 2027 (got ${project.year})`);
    }
    if (!PROJECT_STATUSES.includes(project.status)) {
      throw new Error(`${label}: invalid status "${project.status}"`);
    }
    if (!PROJECT_TYPES.includes(project.type)) {
      throw new Error(`${label}: invalid type "${project.type}"`);
    }
    if (!Number.isInteger(project.areaSqFt) || project.areaSqFt < 200 || project.areaSqFt > 200000) {
      throw new Error(`${label}: areaSqFt must be an integer between 200 and 200000 (got ${project.areaSqFt})`);
    }
    if (!CLIENT_TYPES.includes(project.client)) {
      throw new Error(`${label}: invalid client "${project.client}"`);
    }
    if (!project.structure.trim()) throw new Error(`${label}: structure is required`);
    if (!Array.isArray(project.materials) || project.materials.length < 1 || project.materials.length > 4) {
      throw new Error(`${label}: materials must have 1 to 4 items`);
    }
    for (const material of project.materials) {
      if (!material.trim()) throw new Error(`${label}: material entry must not be empty`);
    }
    if (!DRAWING_KEYS.includes(project.drawing)) {
      throw new Error(`${label}: unknown drawing key "${project.drawing}"`);
    }
    if (!project.summary.trim() || project.summary.length > 160) {
      throw new Error(`${label}: summary must be 1–160 characters (got ${project.summary.length})`);
    }
    if (!Array.isArray(project.narrative) || project.narrative.length < 2 || project.narrative.length > 3) {
      throw new Error(`${label}: narrative must have 2 to 3 paragraphs`);
    }
    for (const para of project.narrative) {
      if (!para.trim()) throw new Error(`${label}: narrative paragraph must not be empty`);
    }
    if (project.featured) featuredCount += 1;
  }

  if (featuredCount !== 4) {
    throw new Error(`projects: exactly 4 featured projects are required for Home (got ${featuredCount})`);
  }
}
