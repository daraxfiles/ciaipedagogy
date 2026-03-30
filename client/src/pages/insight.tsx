import { Link, useParams } from "wouter";
import { siteConfig } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import NotFound from "@/pages/not-found";

const tagColors: Record<string, string> = {
  Essay: "bg-primary/10 text-primary border-primary/20",
  Commentary: "bg-accent/15 text-accent-foreground border-accent/20",
  Reflection: "bg-chart-3/10 text-chart-3 border-chart-3/20",
};

export default function InsightPage() {
  const { slug } = useParams<{ slug: string }>();
  const insight = siteConfig.events.insights.find((i) => i.slug === slug);

  if (!insight) return <NotFound />;

  return (
    <div className="max-w-2xl">

      {/* Back link */}
      <Link href="/insights">
        <Button variant="ghost" size="sm" className="mb-8 -ml-2 gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" />
          All Insights
        </Button>
      </Link>

      {/* Article header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-5">
          <Badge
            variant="outline"
            className={`text-[10px] no-default-active-elevate border ${tagColors[insight.tag] ?? ""}`}
          >
            {insight.tag}
          </Badge>
          <span className="text-xs text-muted-foreground">{insight.date}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4">
          {insight.title}
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
          {insight.excerpt}
        </p>
      </header>

      <Separator className="mb-10" />

      {/* Article body */}
      <article
        className="space-y-5 text-base leading-relaxed text-foreground/90"
        data-testid="article-body"
      >
        {insight.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </article>

      <Separator className="mt-12 mb-8" />

      {/* Footer nav */}
      <div className="flex items-center justify-between">
        <Link href="/insights">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Insights
          </Button>
        </Link>
        <Link href="/events">
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
            Events & Insights
          </Button>
        </Link>
      </div>

    </div>
  );
}
