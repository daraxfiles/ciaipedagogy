import { siteConfig } from "@/content/site";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function InsightsPage() {
  const { insights } = siteConfig;

  return (
    <div className="space-y-16 sm:space-y-24">
      {insights.categories.map((category, ci) => (
        <section key={ci} data-testid={`section-insight-category-${ci}`}>
          {ci > 0 && <Separator className="mb-16 sm:mb-20" />}
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-8">
            {category.title}
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {category.items.map((item, i) => (
              <Card key={i} className="hover-elevate" data-testid={`card-insight-${ci}-${i}`}>
                <CardHeader>
                  <Badge variant="secondary" className="no-default-active-elevate w-fit mb-2 text-xs">
                    {item.tag}
                  </Badge>
                  <CardTitle className="font-serif text-base">{item.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed mt-2">
                    {item.excerpt}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      ))}

      <Separator />

      <section data-testid="section-upcoming-events">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-8">
          {insights.upcomingEvents.title}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {insights.upcomingEvents.items.map((event, i) => (
            <Card key={i} className="hover-elevate" data-testid={`card-event-${i}`}>
              <CardHeader>
                <div className="mb-1">
                  <span className="text-xs font-medium text-accent-foreground">{event.date}</span>
                </div>
                <CardTitle className="font-serif text-base">{event.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed mt-2">
                  {event.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      <section data-testid="section-event-archive">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-8">
          {insights.eventArchive.title}
        </h2>
        <div className="max-w-3xl space-y-0">
          {insights.eventArchive.items.map((event, i) => (
            <div key={i}>
              <div className="py-5" data-testid={`archive-event-${i}`}>
                <h3 className="font-serif text-base font-semibold text-foreground">{event.title}</h3>
                <p className="mt-1 text-xs font-medium text-muted-foreground">{event.date}</p>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{event.description}</p>
              </div>
              {i < insights.eventArchive.items.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
