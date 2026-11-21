import { useDraftingPatterns } from './shared';

/** Contour and Chicago street-grid fragment with north arrow for the Work page head. */
export function SitePlanMotif({ className = 'w-full max-w-[260px] h-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 150" className={className} fill="none" aria-hidden="true">
      {/* Orthogonal street grid */}
      {[36, 92, 148, 204].map((x) => (
        <line key={x} x1={x} y1="10" x2={x} y2="140" className="draft-hairline" />
      ))}
      {[34, 76, 118].map((y) => (
        <line key={y} x1="12" y1={y} x2="248" y2={y} className="draft-hairline" />
      ))}
      {/* Lakefront / ravine contours */}
      <path d="M12 108 C72 96, 128 118, 196 88 C220 78, 236 62, 248 48" className="draft-fine" />
      <path d="M12 128 C78 114, 134 134, 206 104 C226 94, 238 82, 248 70" className="draft-hairline" />
      {/* Highlighted parcel */}
      <rect x="92" y="34" width="56" height="42" fill="var(--brass-soft)" className="draft-cut" />
      <line x1="92" y1="34" x2="148" y2="76" className="draft-brass" />
      {/* North arrow */}
      <g transform="translate(216, 102)">
        <circle cx="14" cy="14" r="11" className="draft-hairline" />
        <line x1="14" y1="1" x2="14" y2="27" className="draft-fine" />
        <polygon points="14,3 17,14 14,12 11,14" fill="var(--drawing)" />
      </g>
      <text x="16" y="24" fill="var(--muted)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.12em">
        INDEX SITE PLAN
      </text>
    </svg>
  );
}

/** Crisp architectural line profile of the Monadnock Building (53 W Jackson Blvd) for Home Studio Visit. */
export function MonadnockProfile({ className = 'w-full h-auto block' }: { className?: string }) {
  const { earthId, defs } = useDraftingPatterns();
  return (
    <svg
      viewBox="0 0 420 420"
      role="img"
      aria-label="Architectural line drawing of the Monadnock Building in Chicago, showing its chamfered masonry base, stacked bay windows and flared cornice."
      className={className}
      fill="none"
    >
      {defs}
      {/* Sidewalk & Jackson Blvd ground hatch */}
      <rect x="24" y="352" width="372" height="28" fill={`url(#${earthId})`} />
      <line x1="24" y1="352" x2="396" y2="352" className="draft-cut" />

      {/* Monadnock Building silhouette: flared base, tall austere brick shaft, flared cornice */}
      <path
        d="M112 352 L118 308 L118 82 L108 66 H254 L244 82 V308 L250 352 Z"
        fill="var(--surface)"
        className="draft-cut"
      />
      {/* Side perspective depth */}
      <path
        d="M254 66 L306 88 L296 102 V312 L302 352 L250 352 L244 308 V82 Z"
        fill="var(--bg)"
        className="draft-cut"
      />
      {/* Flared cornice line */}
      <line x1="108" y1="66" x2="254" y2="66" className="draft-cut" />
      <line x1="114" y1="74" x2="248" y2="74" className="draft-fine" />
      <line x1="118" y1="82" x2="244" y2="82" className="draft-fine" />

      {/* Vertical rhythmic masonry piers & projecting bay windows */}
      {[140, 174, 208].map((x) => (
        <g key={x}>
          <rect x={x} y="94" width="18" height="206" className="draft-fine" />
          {[112, 130, 148, 166, 184, 202, 220, 238, 256, 274, 292].map((y) => (
            <line key={y} x1={x} y1={y} x2={x + 18} y2={y} className="draft-hairline" />
          ))}
        </g>
      ))}

      {/* Side elevation windows */}
      {[112, 138, 164, 190, 216, 242, 268, 294].map((y) => (
        <line key={y} x1="254" y1={y} x2="294" y2={y + 14} className="draft-hairline" />
      ))}

      {/* 11th floor studio marker (Suite 1110) in warm brass */}
      <line x1="68" y1="148" x2="244" y2="148" className="draft-brass" />
      <circle cx="64" cy="148" r="4" fill="var(--brass)" />
      <text x="68" y="138" fill="var(--drawing)" fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.12em">
        FL. 11 · STE 1110
      </text>

      {/* Chamfered base arches */}
      {[136, 174, 212].map((x) => (
        <rect key={x} x={x} y="318" width="22" height="34" className="draft-fine" />
      ))}

      {/* Height dimension line right */}
      <line x1="342" y1="66" x2="342" y2="352" className="draft-fine" />
      <line x1="336" y1="66" x2="348" y2="66" className="draft-cut" />
      <line x1="336" y1="352" x2="348" y2="352" className="draft-cut" />
      <text x="358" y="210" textAnchor="middle" fill="var(--muted)" fontSize="8.5" fontFamily="var(--font-mono)" transform="rotate(90 358 210)">
        16 STOREYS · 1891
      </text>

      <text x="210" y="402" textAnchor="middle" fill="var(--muted)" fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.14em">
        MONADNOCK BUILDING · 53 W JACKSON BLVD
      </text>
    </svg>
  );
}

/**
 * Six-storey building cut in section for the Process page.
 * Each floor maps to stages 01–06 (bottom to top or top to bottom — here 01 at ground floor rising to 06 at roof/handover,
 * or 01 top to 06 bottom to match reading order; let's render 01 at top to 06 at bottom OR ground-up clearly numbered FL 01..06
 * matching vertical scroll order: 01 at top down to 06 at foundation-to-handover? Actually an architectural section cut through
 * six floors reading top-down 01→06 OR bottom-up 01→06: reading top-down aligns each floor directly beside its stage as you scroll!).
 */
export function BuildingSection({
  activeStage = 0,
  compact = false,
  className = '',
}: {
  /** 1-based active stage index (1–6), or 0 for all neutral (static/no-JS). */
  activeStage?: number;
  compact?: boolean;
  className?: string;
}) {
  const { earthId, defs } = useDraftingPatterns();
  const floorHeight = 76;
  const topOffset = 44;

  if (compact) {
    // Narrow horizontal 6-bay section strip for mobile above each stage
    return (
      <svg viewBox="0 0 360 56" className={`w-full h-auto block ${className}`} fill="none" aria-hidden="true">
        <line x1="8" y1="44" x2="352" y2="44" className="draft-cut" />
        {[1, 2, 3, 4, 5, 6].map((num) => {
          const x = 14 + (num - 1) * 56;
          const isActive = activeStage === num;
          return (
            <g key={num}>
              <rect
                x={x}
                y="12"
                width="50"
                height="32"
                fill={isActive ? 'var(--brass-soft)' : 'var(--surface)'}
                stroke={isActive ? 'var(--brass)' : 'var(--drawing)'}
                strokeWidth={isActive ? '1.5' : '0.8'}
                vectorEffect="non-scaling-stroke"
              />
              <text
                x={x + 25}
                y="32"
                textAnchor="middle"
                fill={isActive ? 'var(--ink)' : 'var(--muted)'}
                fontSize="10"
                fontFamily="var(--font-mono)"
              >
                0{num}
              </text>
            </g>
          );
        })}
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 340 580"
      role="img"
      aria-label="Six-storey architectural building section corresponding to the six stages of a commission, from Stage 01 Survey and brief through Stage 06 Handover."
      className={`w-full h-auto block ${className}`}
      fill="none"
    >
      {defs}

      {/* Roof parapet cap */}
      <rect x="64" y="34" width="224" height="10" fill="var(--poche)" />

      {/* Outer cut masonry walls (poché) */}
      <rect x="64" y="44" width="14" height="456" fill="var(--poche)" />
      <rect x="274" y="44" width="14" height="456" fill="var(--poche)" />

      {/* Six floors: Stage 01 through Stage 06 in scroll order */}
      {[1, 2, 3, 4, 5, 6].map((stageNum, idx) => {
        const y = topOffset + idx * floorHeight;
        const isActive = activeStage === stageNum;
        const stairLeftToRight = idx % 2 === 0;
        return (
          <g key={stageNum}>
            {/* Active floor brass illumination */}
            <rect
              x="78"
              y={y}
              width="196"
              height={floorHeight - 8}
              fill={isActive ? 'var(--brass-soft)' : 'var(--surface)'}
              style={{ transition: 'fill 260ms ease' }}
            />
            {isActive ? (
              <rect
                x="78"
                y={y}
                width="4"
                height={floorHeight - 8}
                fill="var(--brass)"
              />
            ) : null}

            {/* Architectural interior motif unique per floor */}
            {stageNum === 1 && (
              /* Survey tripod & datum line */
              <g>
                <line x1="112" y1={y + 42} x2="246" y2={y + 42} className="draft-hairline" strokeDasharray="4 4" />
                <path d={`M136 ${y + 68} L148 ${y + 38} L160 ${y + 68}`} className="draft-fine" />
                <circle cx="148" cy={y + 35} r="4" className={isActive ? 'draft-brass' : 'draft-fine'} />
              </g>
            )}
            {stageNum === 2 && (
              /* Massing block volumes */
              <g>
                <rect x="108" y={y + 36} width="32" height="32" className="draft-fine" />
                <rect x="148" y={y + 20} width="42" height="48" className={isActive ? 'draft-brass' : 'draft-fine'} />
                <rect x="198" y={y + 44} width="28" height="24" className="draft-fine" />
              </g>
            )}
            {stageNum === 3 && (
              /* Section detail & mullion rhythm */
              <g>
                {[110, 134, 158, 182, 206].map((mx) => (
                  <line key={mx} x1={mx} y1={y + 16} x2={mx} y2={y + 68} className="draft-hairline" />
                ))}
                <line x1="100" y1={y + 34} x2="220" y2={y + 34} className={isActive ? 'draft-brass' : 'draft-fine'} />
              </g>
            )}
            {stageNum === 4 && (
              /* Drawing roll / tender set grid */
              <g>
                <rect x="104" y={y + 22} width="84" height="36" className="draft-fine" />
                <line x1="104" y1={y + 34} x2="188" y2={y + 34} className="draft-hairline" />
                <line x1="104" y1={y + 46} x2="188" y2={y + 46} className="draft-hairline" />
                <circle cx="206" cy={y + 40} r="10" className={isActive ? 'draft-brass' : 'draft-fine'} />
              </g>
            )}
            {stageNum === 5 && (
              /* Structural truss & site hoist */
              <g>
                <polyline
                  points={`102,${y + 22} 136,${y + 48} 170,${y + 22} 204,${y + 48}`}
                  className={isActive ? 'draft-brass' : 'draft-fine'}
                />
                <line x1="102" y1={y + 22} x2="204" y2={y + 22} className="draft-fine" />
              </g>
            )}
            {stageNum === 6 && (
              /* Occupied calm room with table & pendant light */
              <g>
                <line x1="158" y1={y} x2="158" y2={y + 26} className={isActive ? 'draft-brass' : 'draft-fine'} />
                <line x1="146" y1={y + 26} x2="170" y2={y + 26} className={isActive ? 'draft-brass' : 'draft-cut'} />
                <line x1="124" y1={y + 48} x2="192" y2={y + 48} className="draft-cut" />
                <line x1="132" y1={y + 48} x2="132" y2={y + 68} className="draft-fine" />
                <line x1="184" y1={y + 48} x2="184" y2={y + 68} className="draft-fine" />
              </g>
            )}

            {/* Linking stair flight on right side of section */}
            {stageNum < 6 && (
              <polyline
                points={
                  stairLeftToRight
                    ? `226,${y + 68} 236,${y + 54} 246,${y + 40} 256,${y + 26} 266,${y + 12}`
                    : `266,${y + 68} 256,${y + 54} 246,${y + 40} 236,${y + 26} 226,${y + 12}`
                }
                className="draft-fine"
              />
            )}

            {/* Poché floor slab */}
            <rect x="64" y={y + floorHeight - 8} width="224" height="8" fill="var(--poche)" />

            {/* Left stage datum bubble & tick */}
            <line
              x1="44"
              y1={y + 34}
              x2="64"
              y2={y + 34}
              stroke={isActive ? 'var(--brass)' : 'var(--line)'}
              strokeWidth={isActive ? '1.5' : '0.75'}
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx="30"
              cy={y + 34}
              r="13"
              fill={isActive ? 'var(--brass-soft)' : 'var(--surface)'}
              stroke={isActive ? 'var(--brass)' : 'var(--drawing)'}
              strokeWidth={isActive ? '1.4' : '0.8'}
            />
            <text
              x="30"
              y={y + 38}
              textAnchor="middle"
              fill="var(--drawing)"
              fontSize="10"
              fontFamily="var(--font-mono)"
            >
              0{stageNum}
            </text>
          </g>
        );
      })}

      {/* Foundation & hatched ground below floor 06 */}
      <rect x="34" y="500" width="284" height="40" fill={`url(#${earthId})`} />
      <line x1="34" y1="500" x2="318" y2="500" className="draft-cut" />
      <rect x="54" y="500" width="34" height="24" fill="var(--poche)" />
      <rect x="264" y="500" width="34" height="24" fill="var(--poche)" />

      <text x="176" y="564" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.14em">
        SECTION THROUGH SIX STAGES · 1:100
      </text>
    </svg>
  );
}

/** 404 drawing: wall elevation leaning 3 degrees right with a true-vertical brass plumb line exposing the error. */
export function OutOfPlumb({ className = 'w-full max-w-[460px] h-auto block' }: { className?: string }) {
  const { earthId, defs } = useDraftingPatterns();
  return (
    <svg
      viewBox="0 0 460 360"
      role="img"
      aria-label="Architectural wall elevation leaning 3 degrees off vertical beside a true-vertical brass plumb line marked 3 degrees out of true."
      className={className}
      fill="none"
    >
      {defs}
      {/* Ground line & earth hatch */}
      <rect x="30" y="294" width="400" height="32" fill={`url(#${earthId})`} />
      <line x1="30" y1="294" x2="430" y2="294" className="draft-cut" />

      {/* Leaning wall elevation (tilted 3° around bottom-left corner) */}
      <g transform="rotate(3.5 130 294)">
        <rect x="130" y="72" width="160" height="222" fill="var(--surface)" className="draft-cut" />
        {[104, 136, 168, 200, 232, 264].map((y) => (
          <line key={y} x1="130" y1={y} x2="290" y2={y} className="draft-hairline" />
        ))}
        {/* Window opening in leaning wall */}
        <rect x="184" y="136" width="52" height="96" fill="var(--bg)" className="draft-cut" />
        <line x1="210" y1="136" x2="210" y2="232" className="draft-fine" />
      </g>

      {/* True vertical reference axis & hanging brass plumb bob */}
      <line x1="130" y1="26" x2="130" y2="294" stroke="var(--brass)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      {/* Plumb bob suspended near bottom of true vertical */}
      <circle cx="130" cy="242" r="2.5" stroke="var(--brass)" strokeWidth="1.2" fill="var(--surface)" />
      <polygon points="122,246 138,246 130,278" fill="var(--brass)" />

      {/* Out-of-plumb top deviation arc & dimension callout */}
      <line x1="130" y1="72" x2="144" y2="72" className="draft-brass" />
      <path d="M130 112 A42 42 0 0 1 141 113" className="draft-brass" />
      <line x1="142" y1="48" x2="326" y2="48" className="draft-hairline" />
      <text x="330" y="52" fill="var(--drawing)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.14em">
        3° OUT OF TRUE
      </text>

      {/* Plumb datum label */}
      <text x="116" y="42" textAnchor="end" fill="var(--muted)" fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.1em">
        TRUE VERTICAL
      </text>
      <text x="230" y="348" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.14em">
        ERROR 404 · SHEET NOT ON RECORD
      </text>
    </svg>
  );
}
