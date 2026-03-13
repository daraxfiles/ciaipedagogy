import { siteConfig } from "@/content/site";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const valueColors = [
  "bg-primary/10 text-primary border-primary/20",
  "bg-accent/15 text-accent-foreground border-accent/20",
  "bg-chart-3/10 text-chart-3 border-chart-3/20",
  "bg-chart-4/10 text-chart-4 border-chart-4/20",
];

export default function AboutPage() {
  const { about } = siteConfig;

  return (
    <div className="space-y-0">

      {/* Page intro */}
      <div className="mb-16">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">About</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-6 max-w-3xl">
          A critical lens on AI in education
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl">
          We are a research and practice working group examining how artificial intelligence
          reshapes teaching, learning, and knowledge production — with equity, agency, and
          accountability at the center of everything we do.
        </p>
      </div>

      <Separator />

      {/* Mission */}
      <section className="py-14 sm:py-16" data-testid="section-mission">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">Mission</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">{about.mission.title}</h2>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <p className="text-base leading-relaxed text-muted-foreground">{about.mission.text}</p>
            <blockquote className="border-l-2 border-accent pl-5 py-1 italic text-base text-foreground/70 font-serif">
              {about.mission.vision}
            </blockquote>
          </div>
        </div>
      </section>

      <Separator />

      {/* Why Critical */}
      <section className="py-14 sm:py-16" data-testid="section-why-critical">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">Philosophy</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">{about.whyCritical.title}</h2>
          </div>
          <div className="lg:col-span-2">
            <p className="text-base leading-relaxed text-muted-foreground mb-8">{about.whyCritical.text}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {about.whyCritical.points.map((point, i) => (
                <div
                  key={i}
                  className={`rounded-lg border p-5 ${valueColors[i % valueColors.length]}`}
                  data-testid={`card-value-${i}`}
                >
                  <p className="font-serif font-bold text-lg mb-1">{point.label}</p>
                  <p className="text-sm leading-relaxed opacity-80">{point.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Approach */}
      <section className="py-14 sm:py-16" data-testid="section-approach">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">Methods</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">{about.approach.title}</h2>
          </div>
          <div className="lg:col-span-2">
            <p className="text-base leading-relaxed text-muted-foreground mb-6">{about.approach.text}</p>
            <div className="flex flex-wrap gap-2">
              {about.approach.methods.map((method, i) => (
                <Badge key={i} variant="secondary" className="no-default-active-elevate text-sm py-1.5 px-3">
                  {method}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* People teaser */}
      <section className="py-14 sm:py-16" data-testid="section-about-people">
        <div className="grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-1">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">Network</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">The People</h2>
          </div>
          <div className="lg:col-span-2">
            <p className="text-base leading-relaxed text-muted-foreground mb-6">
              Our team includes researchers, educators, graduate fellows, and community partners
              working across disciplines. We are organized around shared commitments rather than
              institutional hierarchy — a network of contributors united by a belief that AI in
              education must be critically examined, equitably designed, and communally governed.
            </p>
            <Link href="/people">
              <Button data-testid="button-view-people">
                Meet the Network <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
