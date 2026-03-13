import type { CSSProperties } from "react";
import { Link } from "wouter";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";

function VennDiagram() {
  const { circles } = siteConfig.hero;

  const circleBase: CSSProperties = {
    position: 'absolute',
    width: '52%',
    height: '52%',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const labelStyle: CSSProperties = {
    fontWeight: 600,
    fontSize: '0.68rem',
    lineHeight: 1.45,
    textAlign: 'center',
    color: 'hsl(var(--foreground))',
    padding: '0 12%',
    pointerEvents: 'none',
  };

  return (
    <div
      className="relative w-full max-w-md mx-auto"
      style={{ aspectRatio: '1' }}
      aria-hidden="true"
    >
      {/* Decorative SVG lines behind the circles */}
      <svg
        viewBox="0 0 400 400"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <line x1="80" y1="350" x2="320" y2="50" stroke="hsl(var(--muted-foreground) / 0.15)" strokeWidth="0.5" />
        <line x1="50" y1="100" x2="350" y2="300" stroke="hsl(var(--muted-foreground) / 0.15)" strokeWidth="0.5" />
        <line x1="200" y1="30" x2="200" y2="370" stroke="hsl(var(--muted-foreground) / 0.15)" strokeWidth="0.5" />
        <circle cx="100" cy="300" r="3" fill="hsl(var(--muted-foreground) / 0.15)" />
        <circle cx="300" cy="100" r="2" fill="hsl(var(--muted-foreground) / 0.15)" />
        <circle cx="50" cy="200" r="2" fill="hsl(var(--muted-foreground) / 0.15)" />
        <circle cx="350" cy="250" r="3" fill="hsl(var(--muted-foreground) / 0.15)" />
      </svg>

      {/*
        Three overlapping CSS circles — same layout as the SVG coords (400×400 viewBox):
          Top   cx=200 cy=145 r=100  →  left=24% top=11%
          Left  cx=145 cy=240 r=100  →  left=10% top=35%
          Right cx=255 cy=240 r=100  →  left=37.5% top=35%
        Each circle is a flex container so the label is always centered inside it.
      */}

      {/* Top circle — Agency & Judgment */}
      <div
        style={{
          ...circleBase,
          left: '24%',
          top: '11%',
          backgroundColor: 'hsl(var(--primary) / 0.10)',
          border: '1.5px solid hsl(var(--primary) / 0.45)',
        }}
      >
        <span style={labelStyle}>{circles[0]}</span>
      </div>

      {/* Left circle — Critical AI Literacy */}
      <div
        style={{
          ...circleBase,
          left: '10%',
          top: '35%',
          backgroundColor: 'hsl(var(--accent) / 0.12)',
          border: '1.5px solid hsl(var(--accent) / 0.50)',
        }}
      >
        <span style={labelStyle}>Critical AI<br />Literacy</span>
      </div>

      {/* Right circle — Equitable Innovation */}
      <div
        style={{
          ...circleBase,
          left: '37.5%',
          top: '35%',
          backgroundColor: 'hsl(var(--chart-3) / 0.10)',
          border: '1.5px solid hsl(var(--chart-3) / 0.45)',
        }}
      >
        <span style={labelStyle}>Equitable<br />Innovation</span>
      </div>

      {/* Center glow accent dot */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '55%',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: 'hsl(var(--accent))',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 6px 2px hsl(var(--accent) / 0.4)',
        }}
      />
    </div>
  );
}

export function Hero() {
  const { hero } = siteConfig;

  return (
    <section className="relative py-16 sm:py-24 lg:py-32" data-testid="section-hero">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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

          <div className="hidden lg:flex items-center justify-center">
            <VennDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}
