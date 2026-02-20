import { siteConfig } from "@/content/site";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

function handleNav(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function InsightsEvents() {
  const { insights } = siteConfig;

  return (
    <section id="insights" className="py-16 sm:py-24" data-testid="section-insights">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-center">
          {insights.title}
        </h2>

        <div className="mt-12 grid lg:grid-cols-3 gap-6">
          {insights.items.map((item, i) => (
            <Card key={i} className="hover-elevate flex flex-col" data-testid={`card-insight-${i}`}>
              <CardHeader>
                <Badge
                  variant="secondary"
                  className="no-default-active-elevate w-fit mb-2 text-xs"
                >
                  {item.tag}
                </Badge>
                <CardTitle className="font-serif text-lg">{item.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed mt-2">
                  {item.excerpt}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button
            variant="outline"
            onClick={() => handleNav(insights.cta.href)}
            data-testid="button-read-insights"
          >
            {insights.cta.label}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-16 max-w-md mx-auto">
          <h3 className="font-serif text-lg font-semibold text-foreground text-center">
            {insights.events.title}
          </h3>
          <div className="mt-6 space-y-3">
            {insights.events.items.map((event, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-3 px-4 rounded-md bg-card border border-card-border"
                data-testid={`event-${i}`}
              >
                <Calendar className="h-4 w-4 text-accent shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
