import { Link } from "wouter";
import { siteConfig } from "@/content/site";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const { footer, name } = siteConfig;

  return (
    <footer className="py-12 sm:py-16 bg-card border-t border-card-border" data-testid="section-footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Link href="/">
            <span className="font-serif font-bold text-lg text-foreground">{name}</span>
          </Link>
          <p className="text-xs text-muted-foreground mt-1.5 max-w-xs">
            Human-centered. Critically informed. Ethically transparent.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          {footer.columns.map((col, i) => (
            <div key={i}>
              {"label" in col && col.label && (
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground/60 mb-3">
                  {col.label}
                </p>
              )}
              <ul className="space-y-2.5">
                {col.items.map((item, j) => (
                  <li key={j}>
                    {item.href.startsWith("/") ? (
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                        data-testid={`link-footer-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                        data-testid={`link-footer-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-xs text-muted-foreground" data-testid="text-copyright">
            {footer.bottomLine}
          </p>
          <p className="text-xs text-muted-foreground/50">
            Critical Innovation & AI Pedagogy Network
          </p>
        </div>
      </div>
    </footer>
  );
}
