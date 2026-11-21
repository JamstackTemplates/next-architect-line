import type { DrawingKey } from '../../content/projects';
import { useDraftingPatterns } from './shared';

interface PlateDrawingProps {
  drawing: DrawingKey;
  title: string;
  className?: string;
}

/**
 * Renders one of the eight distinct architectural plate drawings (elevations, sections, plans and axonometrics).
 * Every project uses its own dedicated drawing key with zero reuse.
 */
export function ProjectDrawing({ drawing, title, className = 'w-full h-auto block' }: PlateDrawingProps) {
  switch (drawing) {
    case 'elevation-house':
      return <ElevationHouse title={title} className={className} />;
    case 'section-library':
      return <SectionLibrary title={title} className={className} />;
    case 'axo-foundry':
      return <AxoFoundry title={title} className={className} />;
    case 'elevation-chapel':
      return <ElevationChapel title={title} className={className} />;
    case 'plan-studio':
      return <PlanStudio title={title} className={className} />;
    case 'elevation-offices':
      return <ElevationOffices title={title} className={className} />;
    case 'section-house':
      return <SectionHouse title={title} className={className} />;
    case 'axo-kiln':
      return <AxoKiln title={title} className={className} />;
  }
}

function ElevationHouse({ title, className }: { title: string; className: string }) {
  const { earthId, hatchId, defs } = useDraftingPatterns();
  return (
    <svg viewBox="0 0 800 460" role="img" aria-label={`South elevation drawing of ${title}`} className={className} fill="none">
      {defs}
      {/* Grid axes */}
      {[
        { x: 130, l: 'A' },
        { x: 300, l: 'B' },
        { x: 480, l: 'C' },
        { x: 660, l: 'D' },
      ].map((a) => (
        <g key={a.l}>
          <circle cx={a.x} cy="34" r="11" className="draft-fine" />
          <text x={a.x} y="38" textAnchor="middle" fill="var(--drawing)" fontSize="10" fontFamily="var(--font-mono)">
            {a.l}
          </text>
          <line x1={a.x} y1="45" x2={a.x} y2="395" stroke="var(--line)" strokeWidth="0.75" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
        </g>
      ))}
      {/* Ground and ravine slope */}
      <polygon points="24,376 112,334 646,334 646,368 112,368 24,404" fill={`url(#${earthId})`} />
      <polyline points="24,376 112,334 784,334" className="draft-cut" />
      <text x="784" y="324" textAnchor="end" fill="var(--muted)" fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.1em">
        LAKE DATUM 0&apos;-0&quot;
      </text>
      {/* Cantilevered oak roof */}
      <rect x="92" y="132" width="576" height="18" fill="var(--surface)" className="draft-cut" />
      <rect x="98" y="150" width="564" height="7" fill={`url(#${hatchId})`} className="draft-fine" />
      {/* Chimney flue */}
      <rect x="368" y="96" width="32" height="36" fill="var(--surface)" className="draft-cut" />
      {/* Three board-formed concrete walls */}
      {[130, 340, 562].map((x, i) => {
        const w = i === 1 ? 112 : 82;
        return (
          <g key={x}>
            <rect x={x} y="157" width={w} height="177" fill="var(--surface)" className="draft-cut" />
            {[178, 199, 220, 241, 262, 283, 304, 322].map((y) => (
              <line key={y} x1={x} y1={y} x2={x + w} y2={y} className="draft-hairline" />
            ))}
          </g>
        );
      })}
      {/* Glazed bays */}
      <rect x="212" y="157" width="128" height="177" className="draft-fine" />
      <line x1="255" y1="157" x2="255" y2="334" className="draft-cut" />
      <line x1="298" y1="157" x2="298" y2="334" className="draft-cut" />
      <rect x="452" y="157" width="110" height="177" className="draft-fine" />
      <line x1="489" y1="157" x2="489" y2="334" className="draft-cut" />
      <line x1="526" y1="157" x2="526" y2="334" className="draft-cut" />
      {/* Brass slot light */}
      <line x1="171" y1="180" x2="171" y2="288" className="draft-brass" />
      {/* Dimension string */}
      <line x1="130" y1="416" x2="644" y2="416" className="draft-fine" />
      {[130, 340, 562, 644].map((x) => (
        <g key={x}>
          <line x1={x} y1="408" x2={x} y2="424" className="draft-fine" />
          <line x1={x - 4} y1="420" x2={x + 4} y2="412" className="draft-cut" />
        </g>
      ))}
      <text x="405" y="438" textAnchor="middle" fill="var(--muted)" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.14em">
        SOUTH ELEVATION · 92&apos;-0&quot; OVERALL
      </text>
    </svg>
  );
}

function SectionLibrary({ title, className }: { title: string; className: string }) {
  const { earthId, hatchId, defs } = useDraftingPatterns();
  return (
    <svg viewBox="0 0 800 460" role="img" aria-label={`Transverse section drawing of ${title}`} className={className} fill="none">
      {defs}
      {/* Hatched earth below terrazzo slab */}
      <rect x="40" y="346" width="720" height="44" fill={`url(#${earthId})`} />
      {/* Cut foundation & terrazzo floor slab (poché) */}
      <path d="M96 330 H704 V346 H678 V378 H644 V346 H156 V378 H122 V346 H96 Z" fill="var(--poche)" />
      <line x1="36" y1="346" x2="764" y2="346" className="draft-cut" />

      {/* Left & right loadbearing common brick cut walls (poché) */}
      <rect x="122" y="138" width="28" height="192" fill="var(--poche)" />
      <rect x="650" y="138" width="28" height="192" fill="var(--poche)" />
      {/* Interior brick service bar wall */}
      <rect x="556" y="170" width="18" height="160" fill="var(--poche)" />

      {/* Deep glulam roof trusses & north clerestory lantern */}
      <path d="M108 138 H282 V82 H518 V138 H692 V154 H108 Z" fill="var(--surface)" className="draft-cut" />
      <rect x="108" y="138" width="584" height="16" fill={`url(#${hatchId})`} className="draft-cut" />
      {/* Clerestory glazing mullions */}
      {[312, 348, 384, 420, 456, 492].map((x) => (
        <line key={x} x1={x} y1="88" x2={x} y2="138" className="draft-fine" />
      ))}
      <rect x="274" y="74" width="252" height="10" fill="var(--poche)" />

      {/* Falling shafts of daylight in brass dashed lines */}
      <line x1="322" y1="138" x2="215" y2="328" stroke="var(--brass)" strokeWidth="0.9" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" />
      <line x1="388" y1="138" x2="288" y2="328" stroke="var(--brass)" strokeWidth="0.9" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" />
      <line x1="454" y1="138" x2="365" y2="328" stroke="var(--brass)" strokeWidth="0.9" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" />

      {/* Reading hall interior: long oak reading tables & low bookstacks */}
      {[204, 344].map((x) => (
        <g key={x}>
          <rect x={x} y="294" width="106" height="6" fill="var(--surface)" className="draft-cut" />
          <line x1={x + 12} y1="300" x2={x + 12} y2="330" className="draft-cut" />
          <line x1={x + 94} y1="300" x2={x + 94} y2="330" className="draft-cut" />
          {/* Table reading lamp */}
          <line x1={x + 53} y1="294" x2={x + 53} y2="274" className="draft-fine" />
          <line x1={x + 43} y1="274" x2={x + 63} y2="274" className="draft-brass" />
        </g>
      ))}
      {/* Perimeter bookshelves along left brick wall */}
      <rect x="150" y="216" width="24" height="114" className="draft-fine" />
      {[236, 256, 276, 296, 314].map((y) => (
        <line key={y} x1="150" y1={y} x2="174" y2={y} className="draft-hairline" />
      ))}
      {/* Archive study rooms right of interior brick wall */}
      <line x1="574" y1="242" x2="650" y2="242" className="draft-cut" />
      <rect x="594" y="274" width="38" height="56" className="draft-fine" />
      <rect x="594" y="186" width="38" height="56" className="draft-fine" />

      {/* Elevation markers & section label */}
      <line x1="76" y1="74" x2="76" y2="346" className="draft-fine" />
      <line x1="70" y1="74" x2="82" y2="74" className="draft-cut" />
      <line x1="70" y1="154" x2="82" y2="154" className="draft-fine" />
      <line x1="70" y1="346" x2="82" y2="346" className="draft-cut" />
      <text x="64" y="216" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)" transform="rotate(-90 64 216)">
        26&apos;-0&quot; LANTERN
      </text>
      <text x="400" y="428" textAnchor="middle" fill="var(--muted)" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.14em">
        SECTION A—A · LOADBEARING BRICK &amp; GLULAM TRUSSES
      </text>
    </svg>
  );
}

function AxoFoundry({ title, className }: { title: string; className: string }) {
  const { hatchId, defs } = useDraftingPatterns();
  return (
    <svg viewBox="0 0 800 460" role="img" aria-label={`Exploded axonometric drawing of ${title}`} className={className} fill="none">
      {defs}
      {/* Vertical dashed explosion alignment lines */}
      {[
        { x: 210, y1: 112, y2: 332 },
        { x: 400, y1: 60, y2: 266 },
        { x: 590, y1: 112, y2: 332 },
        { x: 400, y1: 184, y2: 404 },
      ].map((l, idx) => (
        <line
          key={idx}
          x1={l.x}
          y1={l.y1}
          x2={l.x}
          y2={l.y2}
          stroke="var(--brass)"
          strokeWidth="0.8"
          strokeDasharray="4 4"
          vectorEffect="non-scaling-stroke"
        />
      ))}

      {/* Layer 1 (Bottom): Retained 1912 brick shell */}
      <g>
        <polygon points="400,266 590,332 400,404 210,332" fill={`url(#${hatchId})`} className="draft-fine" />
        {/* Left brick facade with industrial arched windows */}
        <polygon points="210,276 400,348 400,404 210,332" fill="var(--surface)" className="draft-cut" />
        {[236, 274, 312, 350].map((x, idx) => {
          const y = 296 + idx * 14.5;
          return (
            <path
              key={x}
              d={`M${x} ${y + 30} V${y + 8} Q${x + 11} ${y - 2} ${x + 22} ${y + 16} V${y + 38} Z`}
              className="draft-fine"
            />
          );
        })}
        {/* Right brick facade */}
        <polygon points="400,348 590,276 590,332 400,404" fill="var(--surface)" className="draft-cut" />
        {[428, 466, 504, 542].map((x, idx) => {
          const y = 342 - idx * 14.5;
          return (
            <path
              key={x}
              d={`M${x} ${y + 30} V${y + 8} Q${x + 11} ${y - 6} ${x + 22} ${y + 0} V${y + 22} Z`}
              className="draft-fine"
            />
          );
        })}
        {/* Back walls */}
        <polyline points="210,276 400,210 590,276" className="draft-cut" />
        <text x="614" y="346" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.1em">
          01 / 1912 BRICK SHELL
        </text>
      </g>

      {/* Layer 2 (Middle): Inserted blackened-steel mezzanines */}
      <g>
        <polygon points="400,156 566,214 400,276 234,214" fill="var(--surface)" fillOpacity="0.88" className="draft-cut" />
        {/* Open courtyard cutout in centre */}
        <polygon points="400,192 466,215 400,239 334,215" fill="var(--bg)" className="draft-cut" />
        {/* Steel structural grid beams */}
        <line x1="289" y1="194" x2="455" y2="255" className="draft-fine" />
        <line x1="345" y1="175" x2="511" y2="235" className="draft-fine" />
        <line x1="317" y1="245" x2="483" y2="185" className="draft-fine" />
        {/* Steel columns descending slightly */}
        {[
          [234, 214],
          [400, 276],
          [566, 214],
        ].map(([cx, cy], idx) => (
          <line key={idx} x1={cx} y1={cy} x2={cx} y2={cy + 26} className="draft-cut" />
        ))}
        <text x="614" y="220" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.1em">
          02 / STEEL MEZZANINE
        </text>
      </g>

      {/* Layer 3 (Top): Sawtooth north-light roof monitors */}
      <g>
        <polygon points="400,56 584,120 400,184 216,120" fill="var(--surface)" fillOpacity="0.85" className="draft-cut" />
        {/* Three sawtooth monitor ridges */}
        {[0, 1, 2].map((i) => {
          const dx = i * 44;
          const dy = i * 15;
          return (
            <g key={i}>
              <polyline
                points={`${268 + dx},${112 + dy} ${400 + dx * 0.4},${66 + dy} ${444 + dx * 0.4},${82 + dy} ${312 + dx},${128 + dy}`}
                className="draft-cut"
              />
              <line x1={268 + dx} y1={112 + dy} x2={268 + dx} y2={98 + dy} className="draft-brass" />
            </g>
          );
        })}
        <text x="614" y="118" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.1em">
          03 / ROOF MONITORS
        </text>
      </g>

      <text x="400" y="438" textAnchor="middle" fill="var(--muted)" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.14em">
        EXPLODED AXONOMETRIC · ADAPTIVE REUSE INSERTION
      </text>
    </svg>
  );
}

function ElevationChapel({ title, className }: { title: string; className: string }) {
  const { earthId, defs } = useDraftingPatterns();
  return (
    <svg viewBox="0 0 800 460" role="img" aria-label={`West gable elevation drawing of ${title}`} className={className} fill="none">
      {defs}
      {/* Hatched Door County limestone bedrock ground */}
      <rect x="44" y="356" width="712" height="34" fill={`url(#${earthId})`} />
      <line x1="44" y1="356" x2="756" y2="356" className="draft-cut" />

      {/* Main Chapel Gable Volume in coursed Wisconsin limestone */}
      <polygon points="184,356 184,186 352,66 520,186 520,356" fill="var(--surface)" className="draft-cut" />
      {/* Steep roof thickness */}
      <polyline points="172,194 352,66 532,194" className="draft-cut" />
      <polyline points="178,199 352,75 526,199" className="draft-fine" />

      {/* Coursed limestone horizontal ashlar joints */}
      {[118, 144, 170, 196, 222, 248, 274, 300, 326].map((y, idx) => {
        const halfW = y < 186 ? ((y - 66) / 120) * 168 : 168;
        const x1 = 352 - halfW;
        const x2 = 352 + halfW;
        return (
          <g key={y}>
            <line x1={x1} y1={y} x2={x2} y2={y} className="draft-hairline" />
            {y >= 196 && (
              <>
                <line x1={x1 + (idx % 2 === 0 ? 74 : 112)} y1={y - 26} x2={x1 + (idx % 2 === 0 ? 74 : 112)} y2={y} className="draft-hairline" />
                <line x1={x2 - (idx % 2 === 0 ? 96 : 58)} y1={y - 26} x2={x2 - (idx % 2 === 0 ? 96 : 58)} y2={y} className="draft-hairline" />
              </>
            )}
          </g>
        );
      })}

      {/* Single tall off-centre vertical slot window */}
      <rect x="384" y="138" width="22" height="176" fill="var(--bg)" className="draft-cut" />
      <line x1="395" y1="138" x2="395" y2="314" className="draft-brass" />

      {/* Recessed oak entrance door */}
      <rect x="268" y="256" width="54" height="100" fill="var(--bg)" className="draft-cut" />
      <line x1="295" y1="256" x2="295" y2="356" className="draft-fine" />
      <line x1="289" y1="306" x2="289" y2="318" className="draft-brass" />

      {/* Freestanding blackened-steel bell frame on right */}
      <g>
        <rect x="602" y="132" width="44" height="224" className="draft-cut" />
        <line x1="602" y1="176" x2="646" y2="176" className="draft-cut" />
        {/* Cast bronze bell silhouette */}
        <path d="M614 176 H634 L638 202 H610 Z" fill="var(--brass)" />
        <circle cx="624" cy="205" r="2.5" fill="var(--drawing)" />
        {/* Pull cord */}
        <line x1="624" y1="208" x2="624" y2="334" stroke="var(--line)" strokeWidth="0.75" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
        {/* Concrete plinth */}
        <rect x="590" y="346" width="68" height="10" fill="var(--poche)" />
      </g>

      {/* Ridge height dimension */}
      <line x1="128" y1="66" x2="128" y2="356" className="draft-fine" />
      <line x1="122" y1="66" x2="134" y2="66" className="draft-cut" />
      <line x1="122" y1="356" x2="134" y2="356" className="draft-cut" />
      <text x="114" y="216" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)" transform="rotate(-90 114 216)">
        28&apos;-6&quot; RIDGE
      </text>

      <text x="400" y="428" textAnchor="middle" fill="var(--muted)" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.14em">
        WEST GABLE ELEVATION · WISCONSIN LIMESTONE &amp; BELL FRAME
      </text>
    </svg>
  );
}

function PlanStudio({ title, className }: { title: string; className: string }) {
  const { hatchId, defs } = useDraftingPatterns();
  return (
    <svg viewBox="0 0 800 460" role="img" aria-label={`Floor plan drawing of ${title}`} className={className} fill="none">
      {defs}
      {/* Topographic ravine contour lines sweeping diagonally */}
      {[
        { d: 'M36 90 C160 110, 220 210, 340 240 C480 275, 590 320, 764 388', l: 'EL. -4\'-0"' },
        { d: 'M36 146 C155 170, 210 264, 336 298 C472 336, 560 368, 720 422', l: 'EL. -8\'-0"' },
        { d: 'M36 206 C150 232, 200 318, 326 354 C440 388, 520 412, 620 442', l: 'EL. -12\'-0"' },
        { d: 'M36 268 C135 294, 184 368, 286 404', l: 'EL. -16\'-0"' },
      ].map((c, idx) => (
        <g key={idx}>
          <path d={c.d} className="draft-hairline" />
          <text x="64" y={84 + idx * 58} fill="var(--muted)" fontSize="8" fontFamily="var(--font-mono)">
            {c.l}
          </text>
        </g>
      ))}

      {/* Cantilevered cedar deck over ravine */}
      <rect x="478" y="114" width="128" height="224" fill={`url(#${hatchId})`} className="draft-fine" />

      {/* Main studio footprint with poché insulated walls */}
      <rect x="196" y="114" width="282" height="224" fill="var(--surface)" className="draft-cut" />
      {/* Poché perimeter wall cut */}
      <path d="M196 114 H478 V128 H210 V324 H478 V338 H196 Z" fill="var(--poche)" />
      {/* North window wall right side */}
      <line x1="478" y1="128" x2="478" y2="324" className="draft-cut" />
      <line x1="472" y1="128" x2="472" y2="324" className="draft-fine" />

      {/* Six concrete foundation pier markers (4'-0" module) */}
      {[
        [226, 144],
        [338, 144],
        [450, 144],
        [226, 308],
        [338, 308],
        [450, 308],
      ].map(([x, y], idx) => (
        <g key={idx}>
          <rect x={x - 7} y={y - 7} width="14" height="14" stroke="var(--brass)" strokeWidth="1.2" fill="none" />
          <line x1={x - 7} y1={y - 7} x2={x + 7} y2={y + 7} className="draft-brass" />
        </g>
      ))}

      {/* Interior drafting table, library wall & wood stove */}
      <rect x="284" y="180" width="118" height="44" className="draft-cut" />
      <line x1="210" y1="158" x2="244" y2="158" className="draft-fine" />
      <rect x="210" y="158" width="24" height="136" className="draft-fine" />
      {/* Wood stove circle */}
      <circle cx="432" cy="176" r="14" className="draft-cut" />
      <circle cx="432" cy="176" r="4" fill="var(--poche)" />
      {/* Entry door swing */}
      <line x1="252" y1="338" x2="252" y2="294" className="draft-cut" />
      <path d="M252 294 A44 44 0 0 1 296 338" className="draft-hairline" />

      {/* Section cut line across plan */}
      <line x1="154" y1="226" x2="646" y2="226" stroke="var(--drawing)" strokeWidth="0.9" strokeDasharray="10 4 2 4" vectorEffect="non-scaling-stroke" />
      <circle cx="144" cy="226" r="10" className="draft-cut" />
      <text x="144" y="230" textAnchor="middle" fill="var(--drawing)" fontSize="9.5" fontFamily="var(--font-mono)">A</text>
      <circle cx="656" cy="226" r="10" className="draft-cut" />
      <text x="656" y="230" textAnchor="middle" fill="var(--drawing)" fontSize="9.5" fontFamily="var(--font-mono)">A</text>

      {/* North arrow top right */}
      <g transform="translate(690, 56)">
        <circle cx="20" cy="20" r="16" className="draft-hairline" />
        <line x1="20" y1="2" x2="20" y2="38" className="draft-fine" />
        <polygon points="20,5 24,20 20,17 16,20" fill="var(--drawing)" />
        <text x="20" y="52" textAnchor="middle" fill="var(--muted)" fontSize="8.5" fontFamily="var(--font-mono)">N</text>
      </g>

      <text x="400" y="438" textAnchor="middle" fill="var(--muted)" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.14em">
        GROUND FLOOR PLAN · TIMBER FRAME ON SIX CONCRETE PIERS
      </text>
    </svg>
  );
}

function ElevationOffices({ title, className }: { title: string; className: string }) {
  const { hatchId, defs } = useDraftingPatterns();
  return (
    <svg viewBox="0 0 800 460" role="img" aria-label={`Street elevation drawing of ${title} with tower crane indicating on-site construction`} className={className} fill="none">
      {defs}
      {/* Ground line */}
      <line x1="40" y1="386" x2="760" y2="386" className="draft-cut" />

      {/* Tower crane outline rising above the building (on-site status) */}
      <g>
        {/* Mast */}
        <rect x="576" y="34" width="16" height="122" className="draft-fine" />
        {[46, 66, 86, 106, 126, 146].map((y) => (
          <path key={y} d={`M576 ${y} L592 ${y - 12} M592 ${y} L576 ${y - 12}`} className="draft-hairline" />
        ))}
        {/* Horizontal jib */}
        <polygon points="344,54 662,54 662,64 344,64" className="draft-fine" />
        <line x1="584" y1="34" x2="412" y2="54" className="draft-brass" />
        <line x1="584" y1="34" x2="656" y2="54" className="draft-brass" />
        {/* Counterweight */}
        <rect x="634" y="64" width="24" height="12" fill="var(--poche)" />
        {/* Hook line */}
        <line x1="428" y1="64" x2="428" y2="112" stroke="var(--brass)" strokeWidth="0.9" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
        <path d="M424 112 H432 L428 122 Z" fill="var(--brass)" />
      </g>

      {/* Main 6-storey mass timber building elevation */}
      <rect x="164" y="138" width="472" height="248" fill="var(--surface)" className="draft-cut" />

      {/* Precast concrete ground podium arcade */}
      <rect x="164" y="314" width="472" height="72" fill={`url(#${hatchId})`} className="draft-cut" />
      {[184, 260, 336, 412, 488, 564].map((x) => (
        <rect key={x} x={x} y="328" width="54" height="58" fill="var(--bg)" className="draft-cut" />
      ))}

      {/* 5 upper storeys of CLT post-and-beam grid */}
      {[174, 209, 244, 279].map((y) => (
        <g key={y}>
          <line x1="164" y1={y} x2="636" y2={y} className="draft-cut" />
          <line x1="164" y1={y - 5} x2="636" y2={y - 5} className="draft-hairline" />
        </g>
      ))}
      {[243, 322, 400, 479, 558].map((x) => (
        <g key={x}>
          <line x1={x} y1="138" x2={x} y2="314" className="draft-cut" />
          <line x1={x - 3} y1="138" x2={x - 3} y2="314" className="draft-hairline" />
          <line x1={x + 3} y1="138" x2={x + 3} y2="314" className="draft-hairline" />
        </g>
      ))}
      {/* Bronze operable vent mullions in each bay */}
      {[182, 261, 340, 418, 497, 576].map((x) => (
        <line key={x} x1={x} y1="138" x2={x} y2="314" className="draft-fine" />
      ))}

      {/* Floor datum labels on left */}
      {['L06', 'L05', 'L04', 'L03', 'L02', 'L01'].map((fl, i) => {
        const y = 156 + i * 36;
        return (
          <g key={fl}>
            <line x1="126" y1={y} x2="156" y2={y} className="draft-hairline" />
            <text x="118" y={y + 3} textAnchor="end" fill="var(--muted)" fontSize="8.5" fontFamily="var(--font-mono)">
              {fl}
            </text>
          </g>
        );
      })}

      <text x="400" y="428" textAnchor="middle" fill="var(--muted)" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.14em">
        EAST ELEVATION · CLT GRID ON PRECAST PODIUM (ON SITE)
      </text>
    </svg>
  );
}

function SectionHouse({ title, className }: { title: string; className: string }) {
  const { earthId, denseId, defs } = useDraftingPatterns();
  return (
    <svg viewBox="0 0 800 460" role="img" aria-label={`Longitudinal section drawing of ${title}`} className={className} fill="none">
      {defs}
      {/* Rolling Lake Michigan dune profile */}
      <path
        d="M30 332 C120 278, 180 264, 240 286 L566 286 C638 286, 686 322, 770 364 L770 398 L30 398 Z"
        fill={`url(#${earthId})`}
      />
      <path d="M30 332 C120 278, 180 264, 240 286 L566 286 C638 286, 686 322, 770 364" className="draft-cut" />

      {/* Concrete grade slab */}
      <rect x="206" y="286" width="388" height="14" fill="var(--poche)" />

      {/* Banded rammed-earth cut walls (horizontal strata hatch) */}
      {[216, 396, 560].map((x, idx) => {
        const w = idx === 1 ? 26 : 30;
        const top = idx === 0 ? 186 : idx === 1 ? 168 : 154;
        return (
          <g key={x}>
            <rect x={x} y={top} width={w} height={286 - top} fill={`url(#${denseId})`} className="draft-cut" />
            {Array.from({ length: Math.floor((286 - top) / 14) }, (_, j) => (
              <line key={j} x1={x} y1={top + (j + 1) * 14} x2={x + w} y2={top + (j + 1) * 14} className="draft-fine" />
            ))}
          </g>
        );
      })}

      {/* Low-pitched larch and standing-seam copper roof */}
      <polygon points="184,188 614,142 614,158 184,202" fill="var(--surface)" className="draft-cut" />
      <line x1="184" y1="194" x2="614" y2="149" className="draft-brass" />

      {/* Sheltered courtyard & dune grass hint */}
      <line x1="246" y1="286" x2="396" y2="286" className="draft-cut" />
      <rect x="444" y="254" width="88" height="32" className="draft-fine" />
      <line x1="488" y1="254" x2="488" y2="286" className="draft-hairline" />

      {/* Prevailing lake wind arrow over dune crest */}
      <path d="M636 122 C674 114, 706 118, 744 126" className="draft-brass" />
      <path d="M644 116 L634 122 L646 127" className="draft-brass" />
      <text x="690" y="106" textAnchor="middle" fill="var(--muted)" fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.1em">
        NW LAKE WIND
      </text>

      <text x="400" y="428" textAnchor="middle" fill="var(--muted)" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.14em">
        SECTION B—B · BANDED RAMMED EARTH &amp; DUNE PROFILE
      </text>
    </svg>
  );
}

function AxoKiln({ title, className }: { title: string; className: string }) {
  const { hatchId, defs } = useDraftingPatterns();
  return (
    <svg viewBox="0 0 800 460" role="img" aria-label={`Cutaway axonometric drawing of ${title}`} className={className} fill="none">
      {defs}
      {/* Ground yard plane */}
      <polygon points="400,190 676,294 400,398 124,294" fill={`url(#${hatchId})`} className="draft-hairline" />

      {/* Tall tapered circular brick chimney stack (back left) */}
      <g>
        <polygon points="224,244 246,74 268,74 290,244" fill="var(--surface)" className="draft-cut" />
        <ellipse cx="257" cy="74" rx="11" ry="4.5" fill="var(--poche)" />
        {[106, 138, 170, 202].map((y) => (
          <line key={y} x1={246 - (y - 74) * 0.13} y1={y} x2={268 + (y - 74) * 0.13} y2={y} className="draft-hairline" />
        ))}
        {/* Iron tension bands */}
        <line x1="238" y1="138" x2="276" y2="138" className="draft-brass" />
        <line x1="230" y1="196" x2="284" y2="196" className="draft-brass" />
      </g>

      {/* Shed 1 (Left brick kiln shed with cutaway roof revealing new timber scissor trusses) */}
      <g>
        <polygon points="184,296 364,364 364,284 184,216" fill="var(--surface)" className="draft-cut" />
        <polygon points="364,364 468,324 468,244 364,284" fill="var(--surface)" className="draft-cut" />
        {/* Translucent polycarbonate gable infill */}
        <polygon points="364,284 416,204 468,244" fill={`url(#${hatchId})`} className="draft-cut" />
        {[382, 400, 418, 436, 452].map((x) => (
          <line key={x} x1={x} y1="274" x2={x} y2="232" className="draft-hairline" />
        ))}
        {/* Exposed new timber scissor trusses along cutaway roof */}
        {[0, 1, 2, 3].map((i) => {
          const dx = -i * 42;
          const dy = -i * 16;
          return (
            <g key={i}>
              <polyline
                points={`${364 + dx},${284 + dy} ${416 + dx},${204 + dy} ${468 + dx},${244 + dy}`}
                className="draft-cut"
              />
              <line x1={364 + dx} y1={284 + dy} x2={442 + dx} y2={224 + dy} className="draft-brass" />
              <line x1={468 + dx} y1={244 + dy} x2={390 + dx} y2={244 + dy} className="draft-brass" />
            </g>
          );
        })}
        {/* Ridge beam */}
        <line x1="416" y1="204" x2="246" y2="140" className="draft-cut" />
      </g>

      {/* Shed 2 (Right twin brick kiln shed) */}
      <g>
        <polygon points="484,298 618,246 618,186 484,238" fill="var(--surface)" className="draft-cut" />
        <polygon points="402,266 484,298 484,238 402,206" fill="var(--surface)" className="draft-cut" />
        <polygon points="402,206 443,152 484,238" fill="var(--surface)" className="draft-cut" />
        <polygon points="443,152 577,100 618,186 484,238" fill="var(--surface)" className="draft-cut" />
        {/* Kiln doorway */}
        <path d="M532 280 V248 Q548 232 564 236 V268 Z" className="draft-fine" />
      </g>

      <text x="400" y="432" textAnchor="middle" fill="var(--muted)" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.14em">
        CUTAWAY AXONOMETRIC · BRICK KILN SHEDS &amp; TIMBER TRUSSES
      </text>
    </svg>
  );
}
