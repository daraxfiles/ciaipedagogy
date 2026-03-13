import researchBannerImg from "@assets/stock_images/research-banner.jpg";
import { Link } from "wouter";
import { siteConfig } from "@/content/site";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Brain, Eye, ArrowRight } from "lucide-react";

export default function ResearchPage() {
  const { research } = siteConfig;

  return (
    <div className="space-y-0">

      {/* Page header */}
      <div className="mb-16">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Research Program</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-5 max-w-3xl">
          {research.overview.title}
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl mb-10">
          {research.overview.text}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {research.overview.stats.map((stat, i) => (
            <div
              key={i}
              className="py-6 px-5 rounded-xl bg-card border border-card-border text-center"
              data-testid={`stat-${i}`}
            >
              <p className="font-serif text-3xl font-bold text-primary mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Banner image */}
        <div className="rounded-xl overflow-hidden border border-card-border">
          <img
            src={researchBannerImg}
            alt="Research lab with students and technology"
            className="w-full h-52 sm:h-64 object-cover"
          />
        </div>
      </div>

      <Separator />

      {/* Pillar I */}
      <section className="py-14 sm:py-16" data-testid="section-pillar-1">
        <div className="grid lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                <Brain className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">Pillar I</p>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-4">
              {research.pillar1.title.replace("Pillar I: ", "")}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {research.pillar1.description}
            </p>
          </div>

          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {research.pillar1.areas.map((area, i) => (
              <Card key={i} className="hover-elevate border-card-border" data-testid={`card-p1-area-${i}`}>
                <CardHeader>
                  <div className="h-0.5 w-6 bg-primary rounded-full mb-3" />
                  <CardTitle className="font-serif text-base">{area.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed mt-2">{area.text}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Pillar II */}
      <section className="py-14 sm:py-16" data-testid="section-pillar-2">
        <div className="grid lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/15">
                <Eye className="h-5 w-5 text-accent-foreground" />
              </div>
            </div>
            <p className="text-xs font-semibold tracking-widest uppercase text-accent-foreground mb-2">Pillar II</p>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-4">
              {research.pillar2.title.replace("Pillar II: ", "")}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {research.pillar2.description}
            </p>
          </div>

          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {research.pillar2.areas.map((area, i) => (
              <Card key={i} className="hover-elevate border-card-border" data-testid={`card-p2-area-${i}`}>
                <CardHeader>
                  <div className="h-0.5 w-6 bg-accent rounded-full mb-3" />
                  <CardTitle className="font-serif text-base">{area.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed mt-2">{area.text}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* CTA */}
      <section className="py-14 sm:py-16" data-testid="section-research-cta">
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
            <h3 className="font-serif text-lg font-bold text-foreground mb-2">Explore the Projects</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              See how our two research pillars translate into active studies, teaching experiments, and open tools.
            </p>
            <Link href="/projects">
              <Button size="sm" data-testid="button-research-to-projects">
                View Projects <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
          <div className="rounded-xl border border-card-border bg-card p-6">
            <h3 className="font-serif text-lg font-bold text-foreground mb-2">Join a Research Study</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              We're actively seeking research collaborators, school partners, and graduate fellows to join our work.
            </p>
            <Link href="/collaborate">
              <Button variant="outline" size="sm" data-testid="button-research-to-collaborate">
                Collaborate <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
