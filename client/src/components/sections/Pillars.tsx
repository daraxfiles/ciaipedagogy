import { siteConfig } from "@/content/site";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Brain, Eye, Scale, ArrowRight } from "lucide-react";

const icons = [Brain, Eye, Scale];

function handleNav(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function Pillars() {
  const { pillars } = siteConfig;

  return (
    <section id="research" className="py-16 sm:py-24" data-testid="section-pillars">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-center">
          {pillars.title}
        </h2>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <Card key={i} className="hover-elevate flex flex-col" data-testid={`card-pillar-${i}`}>
                <CardHeader>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="font-serif text-lg">{item.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed mt-2">
                    {item.text}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-0">
                  <a
                    href={item.link.href}
                    onClick={(e) => { e.preventDefault(); handleNav(item.link.href); }}
                    className="inline-flex items-center text-sm font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                    data-testid={`link-pillar-${i}`}
                  >
                    {item.link.label}
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </a>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
