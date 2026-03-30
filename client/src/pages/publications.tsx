import { siteConfig } from "@/content/site";
import { Clock } from "lucide-react";

export default function PublicationsPage() {
  const { publications } = siteConfig;

  return (
    <div className="space-y-0">

      {/* Page header */}
      <div className="mb-16">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
          {publications.title}
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-5 max-w-3xl">
          {publications.subtitle}
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl">
          {publications.description}
        </p>
      </div>

      {/* Coming soon */}
      <section id="publications" data-testid="section-publications-coming-soon">
        <div className="rounded-xl border border-card-border bg-card p-8 sm:p-10 flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-5">
            <Clock className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="font-serif text-lg font-semibold text-foreground mb-2">Coming Soon</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {publications.comingSoon}
          </p>
        </div>
      </section>

    </div>
  );
}
