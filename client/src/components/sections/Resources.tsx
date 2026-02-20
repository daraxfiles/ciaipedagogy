import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";

export function Resources() {
  const { resources } = siteConfig;

  return (
    <section className="py-16 sm:py-24 bg-muted/40" data-testid="section-resources">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-center">
          {resources.title}
        </h2>
        <div className="mt-12 grid md:grid-cols-2 gap-10 max-w-4xl mx-auto items-start">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              {resources.description}
            </p>
          </div>
          <div>
            <ul className="space-y-3">
              {resources.items.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 text-sm font-medium text-foreground rounded-md py-2 px-3 hover-elevate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    data-testid={`link-resource-${i}`}
                  >
                    <FileText className="h-4 w-4 text-primary shrink-0" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 pl-3">
              <Button
                variant="outline"
                onClick={() => {
                  const el = document.querySelector(resources.cta.href);
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                data-testid="button-explore-toolkit"
              >
                {resources.cta.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
