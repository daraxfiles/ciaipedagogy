import { useQuery } from "@tanstack/react-query";
import { siteConfig } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";
import type { Publication } from "@shared/schema";

const typeLabel: Record<string, string> = {
  journal: "Journal Article",
  conference: "Conference Paper",
  "book-chapter": "Book Chapter",
  preprint: "Preprint",
  report: "Report",
};

const typeColors: Record<string, string> = {
  journal: "bg-primary/10 text-primary border-primary/20",
  conference: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  "book-chapter": "bg-chart-4/10 text-chart-4 border-chart-4/20",
  preprint: "bg-accent/15 text-accent-foreground border-accent/20",
  report: "bg-muted text-muted-foreground border-border",
};

export default function PublicationsPage() {
  const { publications: staticPubs } = siteConfig;

  const { data: dbPubs = [], isLoading } = useQuery<Publication[]>({
    queryKey: ["/api/publications"],
  });

  const grouped = dbPubs.reduce<Record<string, Publication[]>>((acc, p) => {
    if (!acc[p.type]) acc[p.type] = [];
    acc[p.type].push(p);
    return acc;
  }, {});

  return (
    <div className="space-y-0">

      {/* Page header */}
      <div className="mb-16">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
          Scholarly Output
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-5 max-w-3xl">
          {staticPubs.title}
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl">
          Peer-reviewed research, conference presentations, working papers, and public scholarship from the Critical Innovation network.
        </p>
      </div>

      {/* DB-backed publications */}
      {!isLoading && dbPubs.length > 0 && (
        <>
          {Object.entries(grouped).map(([type, pubs]) => (
            <section key={type} className="mb-12" data-testid={`section-pub-${type}`}>
              <div className="mb-6">
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">
                  {typeLabel[type] || type}
                </p>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  {typeLabel[type] || type}s
                </h2>
              </div>
              <div className="space-y-4">
                {pubs
                  .sort((a, b) => b.year - a.year)
                  .map((pub) => (
                    <div
                      key={pub.id}
                      className="rounded-xl border border-card-border bg-card p-5 hover:border-primary/30 transition-colors"
                      data-testid={`card-pub-${pub.id}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <Badge
                              variant="outline"
                              className={`text-[10px] no-default-active-elevate border capitalize ${typeColors[pub.type] || ""}`}
                            >
                              {typeLabel[pub.type] || pub.type}
                            </Badge>
                            <span className="text-xs font-semibold text-muted-foreground">{pub.year}</span>
                          </div>
                          <p className="font-serif text-base font-bold text-foreground leading-snug mb-1">
                            {pub.title}
                          </p>
                          <p className="text-xs text-muted-foreground mb-1">{pub.authors}</p>
                          {pub.venue && (
                            <p className="text-xs text-muted-foreground italic">{pub.venue}</p>
                          )}
                          {pub.abstract && (
                            <p className="text-xs text-muted-foreground leading-relaxed mt-2 line-clamp-2">
                              {pub.abstract}
                            </p>
                          )}
                        </div>
                        {pub.url && (
                          <a
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0"
                            data-testid={`link-pub-${pub.id}`}
                          >
                            <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs">
                              <ExternalLink className="h-3.5 w-3.5" />
                              View
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          ))}
          <Separator className="my-14 sm:my-16" />
        </>
      )}

      {/* Static publications from site.ts */}
      {staticPubs.categories.map((cat, ci) => (
        <section key={ci} data-testid={`section-pub-static-${ci}`}>
          <div className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-foreground">{cat.title}</h2>
          </div>
          <div className="space-y-4">
            {cat.items.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-card-border bg-card p-5 hover:border-primary/30 transition-colors"
                data-testid={`card-pub-static-${ci}-${i}`}
              >
                <p className="font-serif text-base font-bold text-foreground leading-snug mb-1">
                  {item.title}
                </p>
                {item.venue && (
                  <p className="text-xs text-muted-foreground italic mb-1">{item.venue}</p>
                )}
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          {ci < staticPubs.categories.length - 1 && <Separator className="my-14 sm:my-16" />}
        </section>
      ))}
    </div>
  );
}
