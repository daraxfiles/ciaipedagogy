import { siteConfig } from "@/content/site";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Brain, Eye, BookOpen, BarChart3 } from "lucide-react";

export default function ResearchPage() {
  const { research } = siteConfig;

  return (
    <div className="space-y-16 sm:space-y-24">
      <section data-testid="section-research-overview">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
          {research.overview.title}
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground max-w-3xl mb-8">
          {research.overview.text}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {research.overview.stats.map((stat, i) => (
            <div
              key={i}
              className="text-center py-6 px-4 rounded-md bg-card border border-card-border"
              data-testid={`stat-${i}`}
            >
              <p className="font-serif text-2xl sm:text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      <section data-testid="section-pillar-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
            {research.pillar1.title}
          </h2>
        </div>
        <p className="text-base leading-relaxed text-muted-foreground max-w-3xl mb-8 mt-3">
          {research.pillar1.description}
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          {research.pillar1.areas.map((area, i) => (
            <Card key={i} className="hover-elevate" data-testid={`card-p1-area-${i}`}>
              <CardHeader>
                <CardTitle className="font-serif text-base">{area.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed mt-2">
                  {area.text}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      <section data-testid="section-pillar-2">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/20">
            <Eye className="h-5 w-5 text-accent-foreground" />
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
            {research.pillar2.title}
          </h2>
        </div>
        <p className="text-base leading-relaxed text-muted-foreground max-w-3xl mb-8 mt-3">
          {research.pillar2.description}
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          {research.pillar2.areas.map((area, i) => (
            <Card key={i} className="hover-elevate" data-testid={`card-p2-area-${i}`}>
              <CardHeader>
                <CardTitle className="font-serif text-base">{area.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed mt-2">
                  {area.text}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
