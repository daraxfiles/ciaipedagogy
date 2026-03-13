import type { CSSProperties } from "react";
import { Link } from "wouter";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";

function VennDiagram() {
  const { circles } = siteConfig.hero;

  const labelStyle: CSSProperties = {
    position: 'absolute',
    textAlign: 'center',
    transform: 'translate(-50%, -50%)',
    fontWeight: 600,
    fontSize: '0.7rem',
    lineHeight: 1.4,
    color: 'hsl(var(--foreground))',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    letterSpacing: '0.01em',
  };

  return (
    <div className="relative w-full max-w-md mx-auto aspect-square" aria-hidden="true">
      {/* SVG layer: decorative lines + the three circle shapes */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full" role="img">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <line x1="80" y1="350" x2="320" y2="50" stroke="hsl(var(--muted-foreground) / 0.15)" strokeWidth="0.5" />
        <line x1="50" y1="100" x2="350" y2="300" stroke="hsl(var(--muted-foreground) / 0.15)" strokeWidth="0.5" />
        <line x1="200" y1="30" x2="200" y2="370" stroke="hsl(var(--muted-foreground) / 0.15)" strokeWidth="0.5" />
        <circle cx="100" cy="300" r="3" fill="hsl(var(--muted-foreground) / 0.15)" />
        <circle cx="300" cy="100" r="2" fill="hsl(var(--muted-foreground) / 0.15)" />
        <circle cx="50" cy="200" r="2" fill="hsl(var(--muted-foreground) / 0.15)" />
        <circle cx="350" cy="250" r="3" fill="hsl(var(--muted-foreground) / 0.15)" />

        {/* Three overlapping circles */}
        <circle cx="200" cy="145" r="100" fill="hsl(var(--primary) / 0.10)" stroke="hsl(var(--primary) / 0.45)" strokeWidth="1.5" />
        <circle cx="145" cy="240" r="100" fill="hsl(var(--accent) / 0.12)" stroke="hsl(var(--accent) / 0.50)" strokeWidth="1.5" />
        <circle cx="255" cy="240" r="100" fill="hsl(var(--chart-3) / 0.10)" stroke="hsl(var(--chart-3) / 0.45)" strokeWidth="1.5" />

        {/* Center glow dot */}
        <circle cx="200" cy="210" r="4" fill="hsl(var(--accent))" filter="url(#glow)" />
      </svg>

      {/*
        HTML label overlays — positions match SVG coords converted to %:
          Top circle    cx=200,cy=145 unique region → label at (200,78) = 50%, 19.5%
          Left circle   cx=145,cy=240 unique region → label at (85,295) = 21.25%, 73.75%
          Right circle  cx=255,cy=240 unique region → label at (315,295) = 78.75%, 73.75%
      */}
      <span style={{ ...labelStyle, left: '50%', top: '19.5%' }}>
        {circles[0]}
      </span>

      <span style={{ ...labelStyle, left: '21.25%', top: '73.75%' }}>
        Critical AI<br />Literacy
      </span>

      <span style={{ ...labelStyle, left: '78.75%', top: '73.75%' }}>
        Equitable<br />Innovation
      </span>
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
