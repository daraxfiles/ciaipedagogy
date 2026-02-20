import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";

function handleNav(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function CTASection() {
  const { ctaSection } = siteConfig;

  return (
    <section
      id="collaborate"
      className="py-16 sm:py-24 bg-primary text-primary-foreground"
      data-testid="section-cta"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold">
          {ctaSection.headline}
        </h2>
        <p className="mt-4 text-base sm:text-lg leading-relaxed opacity-90">
          {ctaSection.subtext}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {ctaSection.buttons.map((btn, i) => (
            <Button
              key={i}
              variant={i === 0 ? "secondary" : "outline"}
              size="lg"
              onClick={() => handleNav(btn.href)}
              className={i > 0 ? "border-primary-foreground/30 text-primary-foreground" : ""}
              data-testid={`button-cta-${i}`}
            >
              {btn.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
