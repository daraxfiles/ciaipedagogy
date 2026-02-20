import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookOpen, ArrowRight } from "lucide-react";

function handleNav(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function Publications() {
  const { publications } = siteConfig;

  return (
    <section id="publications" className="py-16 sm:py-24" data-testid="section-publications">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-center">
          {publications.title}
        </h2>
        <div className="mt-12 max-w-3xl mx-auto space-y-0">
          {publications.items.map((pub, i) => (
            <div key={i}>
              <div className="flex gap-4 py-5 group" data-testid={`publication-${i}`}>
                <div className="shrink-0 mt-1">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-base font-semibold text-foreground leading-snug">
                    {pub.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-accent-foreground dark:text-accent-foreground">
                    {pub.venue}
                  </p>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    {pub.description}
                  </p>
                </div>
              </div>
              {i < publications.items.length - 1 && <Separator />}
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button
            variant="outline"
            onClick={() => handleNav(publications.cta.href)}
            data-testid="button-view-publications"
          >
            {publications.cta.label}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
