import { useState } from "react";
import { Link } from "wouter";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";

// ─── Geometry constants ──────────────────────────────────────────────────────
// Three anchor positions in a balanced triangle (viewBox 520 × 460)
const TOP   = { x: 260, y: 105 };
const LEFT  = { x: 100, y: 358 };
const RIGHT = { x: 420, y: 358 };

// Geometric centroid — where all three lines converge
const CX = (TOP.x + LEFT.x + RIGHT.x) / 3;   // 260
const CY = (TOP.y + LEFT.y + RIGHT.y) / 3;   // 274

// ─── Node descriptors ────────────────────────────────────────────────────────
const NODES = [
  {
    ...TOP,
    id: "agency",
    colorVar: "--primary" as const,
    label: "Agency & Judgment",
    subtitle: "Human decision-making with AI",
    // label above the node
    lx: 260, ly: 33, lAnchor: "middle" as const,
  },
  {
    ...LEFT,
    id: "literacy",
    colorVar: "--accent" as const,
    label: "Critical AI Literacy",
    subtitle: "Detecting & evaluating AI systems",
    // label below-left
    lx: 100, ly: 404, lAnchor: "middle" as const,
  },
  {
    ...RIGHT,
    id: "equity",
    colorVar: "--chart-3" as const,
    label: "Equitable Innovation",
    subtitle: "Designing for equity & access",
    // label below-right
    lx: 420, ly: 404, lAnchor: "middle" as const,
  },
];

// Midpoint helpers (for decorative tick marks on each line)
function midpoint(a: { x: number; y: number }, b: { x: number; y: number }) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

const MID_TOP   = midpoint(TOP,   { x: CX, y: CY });
const MID_LEFT  = midpoint(LEFT,  { x: CX, y: CY });
const MID_RIGHT = midpoint(RIGHT, { x: CX, y: CY });

// ─── Diagram component ───────────────────────────────────────────────────────
function FrameworkDiagram() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className="relative w-full max-w-[520px] mx-auto select-none"
      aria-label="Research convergence framework: three areas uniting in Critical Innovation in AI & Education"
    >
      <svg
        viewBox="0 0 520 460"
        className="w-full h-auto"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Gradient lines: each flows from node color → near-transparent at center */}
          <linearGradient
            id="lg-top" gradientUnits="userSpaceOnUse"
            x1={TOP.x} y1={TOP.y} x2={CX} y2={CY}
          >
            <stop offset="0%"   stopColor="hsl(var(--primary))" stopOpacity="0.55" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.04" />
          </linearGradient>

          <linearGradient
            id="lg-left" gradientUnits="userSpaceOnUse"
            x1={LEFT.x} y1={LEFT.y} x2={CX} y2={CY}
          >
            <stop offset="0%"   stopColor="hsl(var(--accent))" stopOpacity="0.55" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.04" />
          </linearGradient>

          <linearGradient
            id="lg-right" gradientUnits="userSpaceOnUse"
            x1={RIGHT.x} y1={RIGHT.y} x2={CX} y2={CY}
          >
            <stop offset="0%"   stopColor="hsl(var(--chart-3))" stopOpacity="0.55" />
            <stop offset="100%" stopColor="hsl(var(--chart-3))" stopOpacity="0.04" />
          </linearGradient>

          {/* Soft radial fog at center — no hard-edged circle */}
          <radialGradient id="center-fog" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="hsl(var(--background))" stopOpacity="0.95" />
            <stop offset="55%"  stopColor="hsl(var(--background))" stopOpacity="0.70" />
            <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── 1. Triangle outline (outermost, very subtle) ───────────────── */}
        <polygon
          points={`${TOP.x},${TOP.y} ${LEFT.x},${LEFT.y} ${RIGHT.x},${RIGHT.y}`}
          fill="hsl(var(--muted-foreground) / 0.03)"
          stroke="hsl(var(--muted-foreground) / 0.10)"
          strokeWidth="1"
          strokeLinejoin="round"
          strokeDasharray="4 6"
        />

        {/* ── 2. Gradient connecting lines ──────────────────────────────── */}
        <line
          x1={TOP.x} y1={TOP.y} x2={CX} y2={CY}
          stroke="url(#lg-top)" strokeWidth="1.5" strokeLinecap="round"
          style={{ opacity: hovered === 0 ? 1 : 0.75, transition: "opacity 0.35s ease" }}
        />
        <line
          x1={LEFT.x} y1={LEFT.y} x2={CX} y2={CY}
          stroke="url(#lg-left)" strokeWidth="1.5" strokeLinecap="round"
          style={{ opacity: hovered === 1 ? 1 : 0.75, transition: "opacity 0.35s ease" }}
        />
        <line
          x1={RIGHT.x} y1={RIGHT.y} x2={CX} y2={CY}
          stroke="url(#lg-right)" strokeWidth="1.5" strokeLinecap="round"
          style={{ opacity: hovered === 2 ? 1 : 0.75, transition: "opacity 0.35s ease" }}
        />

        {/* ── 3. Midpoint tick marks — small perpendicular diamonds ─────── */}
        {[
          { m: MID_TOP,   color: "hsl(var(--primary))" },
          { m: MID_LEFT,  color: "hsl(var(--accent))" },
          { m: MID_RIGHT, color: "hsl(var(--chart-3))" },
        ].map(({ m, color }, i) => (
          <circle
            key={`tick-${i}`}
            cx={m.x} cy={m.y} r="2.5"
            fill={color}
            style={{ opacity: 0.35, pointerEvents: "none" }}
          />
        ))}

        {/* ── 4. Corner halos (interactive hover targets) ───────────────── */}
        {NODES.map((n, i) => (
          <circle
            key={`halo-${i}`}
            cx={n.x} cy={n.y} r={50}
            strokeWidth="1"
            style={{
              fill:   `hsl(var(${n.colorVar}) / ${hovered === i ? 0.13 : 0.06})`,
              stroke: `hsl(var(${n.colorVar}) / ${hovered === i ? 0.30 : 0.14})`,
              transition: "fill 0.35s ease, stroke 0.35s ease",
              cursor: "default",
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}

        {/* ── 5. Corner node dots ───────────────────────────────────────── */}
        {NODES.map((n, i) => (
          <circle
            key={`node-${i}`}
            cx={n.x} cy={n.y} r={5.5}
            style={{
              fill: `hsl(var(${n.colorVar}) / ${hovered === i ? 1 : 0.78})`,
              transition: "fill 0.35s ease",
              pointerEvents: "none",
            }}
          />
        ))}

        {/* ── 6. Center radial fog (soft, no hard edge) ─────────────────── */}
        <ellipse cx={CX} cy={CY} rx={105} ry={85} fill="url(#center-fog)" />

        {/* ── 7. Center accent rule ─────────────────────────────────────── */}
        <line
          x1={CX - 22} y1={CY - 30}
          x2={CX + 22} y2={CY - 30}
          stroke="hsl(var(--muted-foreground) / 0.28)"
          strokeWidth="0.75"
        />

        {/* ── 8. Center focal text ──────────────────────────────────────── */}
        <text
          x={CX} y={CY - 13}
          textAnchor="middle"
          fontFamily="'Libre Baskerville', 'Georgia', serif"
          fontWeight="700"
          fontSize="12.5"
          fill="hsl(var(--foreground))"
          letterSpacing="0"
        >
          Critical Innovation
          <tspan x={CX} dy="18" fontSize="12.5">
            in AI &amp; Education
          </tspan>
        </text>

        {/* ── 9. Corner labels (title + subtitle) ──────────────────────── */}
        {NODES.map((n, i) => (
          <text
            key={`label-${i}`}
            textAnchor={n.lAnchor}
            fontFamily="'DM Sans', 'system-ui', sans-serif"
            style={{ pointerEvents: "none" }}
          >
            <tspan
              x={n.lx} y={n.ly}
              fontWeight="600"
              fontSize="12.5"
              style={{
                fill: `hsl(var(${n.colorVar}) / ${hovered === i ? 1 : 0.85})`,
                transition: "fill 0.35s ease",
              }}
            >
              {n.label}
            </tspan>
            <tspan
              x={n.lx} dy="18"
              fontWeight="400"
              fontSize="9.5"
              fill="hsl(var(--muted-foreground))"
            >
              {n.subtitle}
            </tspan>
          </text>
        ))}
      </svg>
    </div>
  );
}

// ─── Hero section ────────────────────────────────────────────────────────────
export function Hero() {
  const { hero } = siteConfig;

  return (
    <section className="relative py-16 sm:py-24 lg:py-32" data-testid="section-hero">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — editorial text */}
          <div className="max-w-xl">
            <h1
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-foreground"
              data-testid="text-hero-headline"
            >
              {hero.headline}
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
              {hero.subheadline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground/80">
              {hero.supporting}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={hero.primaryCta.href}>
                <Button size="lg" data-testid="button-explore-research">
                  {hero.primaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href={hero.secondaryCta.href}>
                <Button size="lg" variant="outline" data-testid="button-collaborate">
                  <Users className="mr-2 h-4 w-4" />
                  {hero.secondaryCta.label}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right — convergence framework diagram */}
          <div className="hidden lg:flex items-center justify-center py-4">
            <FrameworkDiagram />
          </div>

        </div>
      </div>
    </section>
  );
}
