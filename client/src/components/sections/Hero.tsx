import { useState } from "react";
import { Link } from "wouter";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";

const RADIUS = 115;

const CIRCLE_DATA = [
  {
    cx: 250, cy: 162,
    colorVar: "--primary",
    label: "Agency & Judgment",
    subtitle: "Human decision-making with AI",
    lx: 250, ly: 64,
    anchor: "middle" as const,
  },
  {
    cx: 190, cy: 275,
    colorVar: "--accent",
    label: "Critical AI Literacy",
    subtitle: "Detecting & evaluating AI systems",
    lx: 88, ly: 358,
    anchor: "middle" as const,
  },
  {
    cx: 310, cy: 275,
    colorVar: "--chart-3",
    label: "Equitable Innovation",
    subtitle: "Designing for equity & access",
    lx: 412, ly: 358,
    anchor: "middle" as const,
  },
];

const CORE_X = (250 + 190 + 310) / 3;
const CORE_Y = (162 + 275 + 275) / 3;

function VennDiagram() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className="relative w-full max-w-lg mx-auto select-none"
      aria-label="Research framework diagram showing three intersecting concepts"
    >
      <svg viewBox="0 0 500 430" className="w-full h-auto overflow-visible">

        {/* ── Three circles ─────────────────────────────────────── */}
        {CIRCLE_DATA.map((c, i) => (
          <circle
            key={i}
            cx={c.cx}
            cy={c.cy}
            r={RADIUS}
            strokeWidth="1.5"
            style={{
              fill: `hsl(var(${c.colorVar}) / ${hovered === i ? 0.42 : 0.26})`,
              stroke: `hsl(var(${c.colorVar}) / ${hovered === i ? 0.80 : 0.52})`,
              transition: "fill 0.35s ease, stroke 0.35s ease",
              cursor: "default",
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}

        {/* ── Center backdrop ───────────────────────────────────── */}
        <circle
          cx={CORE_X}
          cy={CORE_Y}
          r={50}
          style={{
            fill: "hsl(var(--background) / 0.80)",
            stroke: "hsl(var(--border) / 0.20)",
          }}
          strokeWidth="1"
        />

        {/* ── Center label ──────────────────────────────────────── */}
        <text
          x={CORE_X}
          y={CORE_Y - 10}
          textAnchor="middle"
          fontFamily="'Libre Baskerville', 'Georgia', serif"
          fontWeight="700"
          fontSize="10.5"
          style={{ fill: "hsl(var(--foreground))" }}
        >
          Critical Innovation
          <tspan x={CORE_X} dy="16">
            in AI &amp; Education
          </tspan>
        </text>

        {/* ── Circle labels ─────────────────────────────────────── */}
        {CIRCLE_DATA.map((c, i) => (
          <text
            key={`lbl-${i}`}
            textAnchor={c.anchor}
            fontFamily="'DM Sans', 'system-ui', sans-serif"
            style={{ pointerEvents: "none" }}
          >
            <tspan
              x={c.lx}
              y={c.ly}
              fontWeight="600"
              fontSize="12"
              style={{
                fill: `hsl(var(${c.colorVar}) / ${hovered === i ? 1 : 0.88})`,
                transition: "fill 0.35s ease",
              }}
            >
              {c.label}
            </tspan>
            <tspan
              x={c.lx}
              dy="18"
              fontWeight="400"
              fontSize="9"
              style={{ fill: "hsl(var(--muted-foreground))" }}
            >
              {c.subtitle}
            </tspan>
          </text>
        ))}
      </svg>
    </div>
  );
}

export function Hero() {
  const { hero } = siteConfig;

  return (
    <section className="relative py-16 sm:py-24 lg:py-32" data-testid="section-hero">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — text */}
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

          {/* Right — diagram */}
          <div className="hidden lg:flex items-center justify-center py-8">
            <VennDiagram />
          </div>

        </div>
      </div>
    </section>
  );
}
