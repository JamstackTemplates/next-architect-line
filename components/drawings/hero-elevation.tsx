import { useDraftingPatterns } from './shared';

/**
 * Lakeshore House south elevation — full-bleed hero architectural drawing.
 * Three board-formed concrete walls, cantilevered oak roof plane, hatched ravine left,
 * Lake Michigan horizon right, structural grid bubbles A–E, dimension chain and scale bar.
 */
export function HeroElevation({ className = '' }: { className?: string }) {
  const { earthId, hatchId, defs } = useDraftingPatterns();

  return (
    <svg
      viewBox="0 0 1440 480"
      role="img"
      aria-label="Architectural south elevation of Lakeshore House: three board-formed concrete walls supporting a cantilevered roof plane between a hatched ravine on the left and the Lake Michigan horizon on the right."
      className={`block w-full h-auto ${className}`}
      fill="none"
    >
      {defs}

      {/* Top structural grid bubbles A–E and vertical dashed axes */}
      {[
        { x: 250, label: 'A' },
        { x: 480, label: 'B' },
        { x: 760, label: 'C' },
        { x: 1030, label: 'D' },
        { x: 1170, label: 'E' },
      ].map((axis) => (
        <g key={axis.label}>
          <circle cx={axis.x} cy={34} r={13} className="draft-fine" />
          <text
            x={axis.x}
            y={38}
            textAnchor="middle"
            fill="var(--drawing)"
            fontSize="11"
            fontFamily="var(--font-mono)"
            letterSpacing="0.06em"
          >
            {axis.label}
          </text>
          <line
            x1={axis.x}
            y1={47}
            x2={axis.x}
            y2={420}
            stroke="var(--line)"
            strokeWidth="0.75"
            strokeDasharray="4 5"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      ))}

      {/* Elevation datum lines (Roof ridge +18'-6", Ceiling +11'-0", Lake datum 0'-0") */}
      <g>
        <line x1="40" y1="114" x2="1400" y2="114" className="draft-hairline" strokeDasharray="8 6" />
        <text x="1396" y="108" textAnchor="end" fill="var(--muted)" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.1em">
          EL. +18&apos;-6&quot; ROOF PLANE
        </text>
        <line x1="1170" y1="336" x2="1440" y2="336" className="draft-cut hero-draw-path" />
        <line x1="1220" y1="344" x2="1410" y2="344" className="draft-hairline" />
        <line x1="1265" y1="351" x2="1380" y2="351" className="draft-hairline" />
        <text x="1426" y="324" textAnchor="end" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.09em">
          EL. +0&apos;-0&quot; LAKE HORIZON
        </text>
      </g>

      {/* Ravine slope hatched earth (left) + bluff foundation grade */}
      <g>
        <polygon
          points="0,418 76,396 154,368 232,336 1170,336 1170,382 232,382 140,422 0,440"
          fill={`url(#${earthId})`}
        />
        <polyline
          points="0,418 76,396 154,368 232,336 1170,336"
          className="draft-cut hero-draw-path"
        />
        {/* Ravine concrete pier footings */}
        <rect x="242" y="336" width="16" height="44" fill="var(--poche)" />
        <rect x="472" y="336" width="16" height="40" fill="var(--poche)" />
        <rect x="752" y="336" width="16" height="40" fill="var(--poche)" />
        <rect x="1022" y="336" width="16" height="40" fill="var(--poche)" />
        {/* Ravine tree/slope contour ticks */}
        <line x1="76" y1="396" x2="76" y2="430" className="draft-hairline" />
        <line x1="154" y1="368" x2="154" y2="412" className="draft-hairline" />
        <text x="26" y="366" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.1em">
          RAVINE -14&apos;-0&quot;
        </text>
      </g>

      {/* Cantilevered oak & standing-seam zinc roof plane */}
      <g className="hero-draw-path">
        <rect x="186" y="114" width="1028" height="22" fill="var(--surface)" className="draft-cut" />
        {/* Standing-seam zinc fascia ribs */}
        <line x1="186" y1="120" x2="1214" y2="120" className="draft-fine" />
        {/* Oiled oak underside soffit band */}
        <rect x="192" y="136" width="1016" height="8" fill={`url(#${hatchId})`} className="draft-fine" />
        {/* Vertical zinc seam ticks */}
        {Array.from({ length: 24 }, (_, idx) => {
          const x = 210 + idx * 42;
          return <line key={x} x1={x} y1="114" x2={x} y2="120" className="draft-fine" />;
        })}
      </g>

      {/* Wall 1 (Left board-formed concrete shear wall) */}
      <g className="hero-draw-path-delay">
        <rect x="250" y="144" width="132" height="192" fill="var(--surface)" className="draft-cut" />
        {[162, 180, 198, 216, 234, 252, 270, 288, 306, 322].map((y) => (
          <line key={y} x1="250" y1={y} x2="382" y2={y} className="draft-hairline" />
        ))}
        {/* Concrete form tie-hole markers */}
        {[171, 207, 243, 279, 314].map((y) => (
          <g key={y}>
            <circle cx="272" cy={y} r="1.4" fill="var(--muted)" />
            <circle cx="316" cy={y} r="1.4" fill="var(--muted)" />
            <circle cx="360" cy={y} r="1.4" fill="var(--muted)" />
          </g>
        ))}
        {/* Recessed brass slot aperture */}
        <rect x="308" y="168" width="16" height="110" fill="var(--bg)" className="draft-cut" />
        <line x1="316" y1="168" x2="316" y2="278" className="draft-brass" />
      </g>

      {/* Bay 1: Recessed glazing + interior stair hint */}
      <g className="hero-draw-path-delay">
        <rect x="382" y="144" width="210" height="192" className="draft-fine" />
        {/* Steel mullions */}
        <line x1="452" y1="144" x2="452" y2="336" className="draft-cut" />
        <line x1="522" y1="144" x2="522" y2="336" className="draft-cut" />
        <line x1="382" y1="216" x2="592" y2="216" className="draft-fine" />
        {/* Interior datum & stair flights visible through glass */}
        <polyline
          points="400,336 420,336 420,320 440,320 440,304 460,304 460,288 480,288 480,272 500,272 500,256 520,256 520,240 545,240"
          stroke="var(--line)"
          strokeWidth="0.9"
          vectorEffect="non-scaling-stroke"
        />
        {/* Diagonal glazing reflection strokes */}
        <line x1="406" y1="162" x2="434" y2="190" className="draft-hairline" />
        <line x1="476" y1="162" x2="504" y2="190" className="draft-hairline" />
        <line x1="544" y1="232" x2="574" y2="262" className="draft-hairline" />
      </g>

      {/* Wall 2 (Centre monolithic board-formed concrete hearth wall) */}
      <g className="hero-draw-path">
        <rect x="592" y="144" width="168" height="192" fill="var(--surface)" className="draft-cut" />
        {/* Rising concrete flue above roof */}
        <rect x="652" y="76" width="44" height="38" fill="var(--surface)" className="draft-cut" />
        <line x1="652" y1="90" x2="696" y2="90" className="draft-hairline" />
        <line x1="652" y1="102" x2="696" y2="102" className="draft-hairline" />
        <rect x="648" y="72" width="52" height="4" fill="var(--poche)" />
        {/* Board-form lifts */}
        {[162, 180, 198, 216, 234, 252, 270, 288, 306, 322].map((y) => (
          <line key={y} x1="592" y1={y} x2="760" y2={y} className="draft-hairline" />
        ))}
        {[171, 207, 243, 279, 314].map((y) => (
          <g key={y}>
            <circle cx="614" cy={y} r="1.4" fill="var(--muted)" />
            <circle cx="676" cy={y} r="1.4" fill="var(--muted)" />
            <circle cx="738" cy={y} r="1.4" fill="var(--muted)" />
          </g>
        ))}
      </g>

      {/* Bay 2: Main living pavilion glass bay facing the lake */}
      <g className="hero-draw-path-delay">
        <rect x="760" y="144" width="270" height="192" className="draft-fine" />
        {[828, 896, 964].map((x) => (
          <line key={x} x1={x} y1="144" x2={x} y2="336" className="draft-cut" />
        ))}
        {/* Interior oak table and datum line */}
        <line x1="760" y1="294" x2="1030" y2="294" className="draft-hairline" />
        <line x1="846" y1="312" x2="946" y2="312" className="draft-fine" />
        <line x1="858" y1="312" x2="858" y2="336" className="draft-fine" />
        <line x1="934" y1="312" x2="934" y2="336" className="draft-fine" />
        {/* Subtle glass shimmer lines */}
        <line x1="782" y1="168" x2="812" y2="198" className="draft-hairline" />
        <line x1="914" y1="168" x2="944" y2="198" className="draft-hairline" />
      </g>

      {/* Wall 3 (Right concrete wing wall + cantilevered lake terrace) */}
      <g className="hero-draw-path">
        <rect x="1030" y="144" width="108" height="192" fill="var(--surface)" className="draft-cut" />
        {[162, 180, 198, 216, 234, 252, 270, 288, 306, 322].map((y) => (
          <line key={y} x1="1030" y1={y} x2="1138" y2={y} className="draft-hairline" />
        ))}
        {/* Lake terrace guardrail */}
        <line x1="1138" y1="278" x2="1194" y2="278" className="draft-fine" />
        <line x1="1194" y1="278" x2="1194" y2="336" className="draft-fine" />
        <line x1="1166" y1="278" x2="1166" y2="336" className="draft-hairline" />
      </g>

      {/* Bottom dimension string with 45° architectural ticks */}
      <g>
        <line x1="250" y1="432" x2="1170" y2="432" className="draft-fine" />
        {[250, 480, 760, 1030, 1170].map((x) => (
          <g key={x}>
            <line x1={x} y1="422" x2={x} y2="442" className="draft-fine" />
            <line x1={x - 5} y1="437" x2={x + 5} y2="427" className="draft-cut" />
          </g>
        ))}
        <text x="365" y="424" textAnchor="middle" fill="var(--muted)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.1em">
          24&apos;-0&quot;
        </text>
        <text x="620" y="424" textAnchor="middle" fill="var(--muted)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.1em">
          28&apos;-0&quot;
        </text>
        <text x="895" y="424" textAnchor="middle" fill="var(--muted)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.1em">
          26&apos;-0&quot;
        </text>
        <text x="1100" y="424" textAnchor="middle" fill="var(--muted)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.1em">
          14&apos;-0&quot;
        </text>
        <text x="710" y="460" textAnchor="middle" fill="var(--drawing)" fontSize="10.5" fontFamily="var(--font-mono)" letterSpacing="0.14em">
          TOTAL ELEVATION 92&apos;-0&quot; — BOARD-FORMED CONCRETE / OILED OAK / ZINC
        </text>
      </g>

      {/* Graphic north arrow & mini scale bar bottom right */}
      <g transform="translate(1285, 405)">
        <circle cx="18" cy="18" r="14" className="draft-hairline" />
        <line x1="18" y1="1" x2="18" y2="35" className="draft-fine" />
        <polygon points="18,4 22,18 18,15 14,18" fill="var(--drawing)" />
        <text x="42" y="15" fill="var(--muted)" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.12em">
          SOUTH ELEV.
        </text>
        <text x="42" y="29" fill="var(--drawing)" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="0.12em">
          SCALE 1:100
        </text>
      </g>
    </svg>
  );
}
