import { siteConfig } from "@/content/site";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const statusColors: Record<string, string> = {
  Ongoing: "bg-chart-3/15 text-chart-3 dark:bg-chart-3/20",
  Pilot: "bg-accent/30 text-accent-foreground",
  Building: "bg-chart-4/15 text-chart-4 dark:bg-chart-4/20",
};

function handleNav(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function ResearchInAction() {
  const { researchInAction } = siteConfig;

  return (
    <section id="action" className="py-16 sm:py-24 bg-muted/40" data-testid="section-research-action">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-center">
          {researchInAction.title}
        </h2>
        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          {researchInAction.projects.map((project, i) => (
            <Card key={i} className="hover-elevate flex flex-col" data-testid={`card-project-${i}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="font-serif text-lg">{project.title}</CardTitle>
                  <Badge
                    variant="secondary"
                    className={`shrink-0 no-default-active-elevate ${statusColors[project.status] || ""}`}
                  >
                    {project.status}
                  </Badge>
                </div>
                <CardDescription className="text-sm leading-relaxed mt-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto pt-0">
                <a
                  href={project.link}
                  onClick={(e) => { e.preventDefault(); handleNav(project.link); }}
                  className="inline-flex items-center text-sm font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  data-testid={`link-project-${i}`}
                >
                  {researchInAction.linkLabel}
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
