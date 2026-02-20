import { siteConfig } from "@/content/site";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Beaker, GraduationCap, Wrench, Code, BookOpen, FlaskConical } from "lucide-react";

const statusColors: Record<string, string> = {
  Ongoing: "bg-chart-3/15 text-chart-3 dark:bg-chart-3/20",
  Pilot: "bg-accent/30 text-accent-foreground",
  Building: "bg-chart-4/15 text-chart-4 dark:bg-chart-4/20",
};

export default function ProjectsPage() {
  const { projects } = siteConfig;

  return (
    <div className="space-y-16 sm:space-y-24">
      <section data-testid="section-active-projects">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
            <Beaker className="h-5 w-5 text-primary" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            {projects.activeProjects.title}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.activeProjects.items.map((project, i) => (
            <Card key={i} className="hover-elevate flex flex-col" data-testid={`card-project-${i}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="font-serif text-base">{project.title}</CardTitle>
                  <Badge
                    variant="secondary"
                    className={`shrink-0 no-default-active-elevate text-xs ${statusColors[project.status] || ""}`}
                  >
                    {project.status}
                  </Badge>
                </div>
                <CardDescription className="text-sm leading-relaxed mt-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      <section data-testid="section-research-lab">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/20">
            <FlaskConical className="h-5 w-5 text-accent-foreground" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            {projects.researchLab.title}
          </h2>
        </div>
        <p className="text-base leading-relaxed text-muted-foreground max-w-3xl mb-8">
          {projects.researchLab.description}
        </p>
        <div className="grid sm:grid-cols-3 gap-5">
          {projects.researchLab.items.map((item, i) => (
            <Card key={i} className="hover-elevate" data-testid={`card-lab-${i}`}>
              <CardHeader>
                <CardTitle className="font-serif text-base">{item.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed mt-2">
                  {item.text}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      <section data-testid="section-educator-toolkit">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
            <Wrench className="h-5 w-5 text-primary" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            {projects.educatorToolkit.title}
          </h2>
        </div>
        <p className="text-base leading-relaxed text-muted-foreground max-w-3xl mb-8">
          {projects.educatorToolkit.description}
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          {projects.educatorToolkit.items.map((item, i) => (
            <Card key={i} className="hover-elevate" data-testid={`card-toolkit-${i}`}>
              <CardHeader>
                <CardTitle className="font-serif text-base">{item.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed mt-2">
                  {item.text}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      <section data-testid="section-open-source" className="grid md:grid-cols-2 gap-6">
        <div className="py-6 px-6 rounded-md bg-card border border-card-border">
          <div className="flex items-center gap-3 mb-4">
            <Code className="h-5 w-5 text-primary" />
            <h3 className="font-serif text-lg font-semibold text-foreground">
              {projects.openSourceTools.title}
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {projects.openSourceTools.text}
          </p>
        </div>
        <div className="py-6 px-6 rounded-md bg-card border border-card-border">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-5 w-5 text-accent-foreground" />
            <h3 className="font-serif text-lg font-semibold text-foreground">
              {projects.curriculumCaseStudies.title}
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {projects.curriculumCaseStudies.text}
          </p>
        </div>
      </section>
    </div>
  );
}
