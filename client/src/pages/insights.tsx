import { Link } from "wouter";
import { siteConfig } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const tagColors: Record<string, string> = {
  Essay: "bg-primary/10 text-primary border-primary/20",
  Commentary: "bg-accent/15 text-accent-foreground border-accent/20",
  Reflection: "bg-chart-3/10 text-chart-3 border-chart-3/20",
};

export default function InsightsPage() {
  const { insights } = siteConfig.events;

  return (
    <div className="space-y-0">

      {/* Page header */}
      <div className="mb-16">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Written Outputs</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-5 max-w-3xl">
          Research Insights
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl">
          Essays, commentary, and reflections from the Critical Innovation & AI Pedagogy network.
        </p>
      </div>

      {/* Insights grid */}
      <section data-testid="section-insights-list">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {insights.map((item) => (
            <Link key={item.slug} href={`/insights/${item.slug}`}>
              <Card
                className="hover-elevate border-card-border h-full cursor-pointer group"
                data-testid={`card-insight-${item.slug}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex gap-2 flex-wrap mb-3">
                    <Badge
                      variant="outline"
                      className={`text-[10px] no-default-active-elevate border ${tagColors[item.tag] ?? ""}`}
                    >
                      {item.tag}
                    </Badge>
                  </div>
                  <CardTitle className="font-serif text-base leading-snug group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed mt-2">
                    {item.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-0 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-primary/60 transition-colors" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
