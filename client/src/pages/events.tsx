import { siteConfig } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const tagColors: Record<string, string> = {
  Essay: "bg-primary/10 text-primary border-primary/20",
  Commentary: "bg-accent/15 text-accent-foreground border-accent/20",
  Reflection: "bg-chart-3/10 text-chart-3 border-chart-3/20",
};

export default function EventsPage() {
  const { events } = siteConfig;

  return (
    <div className="space-y-0">

      {/* Page header */}
      <div className="mb-16">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Network Updates</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-5 max-w-3xl">
          {events.title}
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl">
          {events.intro}
        </p>
      </div>

      {/* Upcoming Events */}
      <section data-testid="section-upcoming">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">On the Calendar</p>
          <h2 className="font-serif text-2xl font-bold text-foreground">Upcoming Events</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {events.upcoming.map((event, i) => (
            <Card key={i} className="hover-elevate border-card-border" data-testid={`card-upcoming-${i}`}>
              <CardHeader>
                <div className="mb-2">
                  <span className="text-xs font-semibold text-accent-foreground">{event.date}</span>
                </div>
                <CardTitle className="font-serif text-base">{event.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed mt-2">{event.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-14 sm:my-16" />

      {/* Insights */}
      <section data-testid="section-insights">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Written Outputs</p>
          <h2 className="font-serif text-2xl font-bold text-foreground">Research Insights</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.insights.map((item, i) => (
            <Card key={i} className="hover-elevate border-card-border" data-testid={`card-insight-${i}`}>
              <CardHeader>
                <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                  <Badge
                    variant="outline"
                    className={`text-xs no-default-active-elevate ${tagColors[item.tag] || ""}`}
                  >
                    {item.tag}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
                <CardTitle className="font-serif text-base leading-snug">{item.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed mt-2">{item.excerpt}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-14 sm:my-16" />

      {/* Archive */}
      <section data-testid="section-archive">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Past Events</p>
          <h2 className="font-serif text-2xl font-bold text-foreground">Event Archive</h2>
        </div>
        <div className="max-w-3xl divide-y divide-border">
          {events.archive.map((event, i) => (
            <div key={i} className="py-5" data-testid={`archive-event-${i}`}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="font-serif text-base font-semibold text-foreground">{event.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                </div>
                <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{event.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
