import { siteConfig } from "@/content/site";
import { Separator } from "@/components/ui/separator";

function handleNav(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function Footer() {
  const { footer, name } = siteConfig;

  return (
    <footer id="contact" className="py-12 sm:py-16 bg-card" data-testid="section-footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="font-serif font-bold text-lg text-foreground">{name}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          {footer.columns.map((col, i) => (
            <ul key={i} className="space-y-3">
              {col.items.map((item, j) => (
                <li key={j}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (item.href.startsWith("#")) {
                        e.preventDefault();
                        handleNav(item.href);
                      }
                    }}
                    className="text-sm text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                    data-testid={`link-footer-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <Separator className="my-8" />

        <p className="text-xs text-muted-foreground text-center" data-testid="text-copyright">
          {footer.bottomLine}
        </p>
      </div>
    </footer>
  );
}
