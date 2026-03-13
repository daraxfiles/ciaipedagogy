import { Link } from "wouter";
import { siteConfig } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, FlaskConical, BookOpen, Layers, Beaker, ExternalLink } from "lucide-react";

export default function ToolkitPage() {
  const { toolkit } = siteConfig;

  return (
    <div className="space-y-0">

      {/* Page header */}
      <div className="mb-16">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Open Resources</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-5 max-w-3xl">
          {toolkit.title}
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl">
          {toolkit.intro}
        </p>
      </div>

      <Separator />

      {/* Open-Source Tools */}
      <section className="py-14 sm:py-16" data-testid="section-open-tools">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
              <FlaskConical className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Free to Use</p>
              <h2 className="font-serif text-2xl font-bold text-foreground">Open-Source Tools</h2>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {toolkit.openTools.map((tool, i) => (
            <Card key={i} className="flex flex-col hover-elevate border-card-border" data-testid={`card-tool-${i}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge
                    variant="outline"
                    className={`text-xs no-default-active-elevate ${tool.status === "Available" ? "border-emerald-500/40 text-emerald-700 dark:text-emerald-400" : "border-amber-500/40 text-amber-700 dark:text-amber-400"}`}
                  >
                    {tool.status}
                  </Badge>
                </div>
                <CardTitle className="font-serif text-base leading-snug">{tool.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed mt-2">{tool.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-0">
                <a href={tool.link}>
                  <Button variant="outline" size="sm" className="w-full" data-testid={`button-tool-${i}`}>
                    Access Tool <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Teaching Resources */}
      <section className="py-14 sm:py-16" data-testid="section-resources">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/15">
              <BookOpen className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Classroom Ready</p>
              <h2 className="font-serif text-2xl font-bold text-foreground">Teaching Resources</h2>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {toolkit.resources.map((resource, i) => (
            <Card key={i} className="hover-elevate border-card-border" data-testid={`card-resource-${i}`}>
              <CardHeader>
                <div className="mb-2">
                  <Badge variant="secondary" className="text-xs no-default-active-elevate">{resource.type}</Badge>
                </div>
                <CardTitle className="font-serif text-base">{resource.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed mt-2">{resource.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Curriculum */}
      <section className="py-14 sm:py-16" data-testid="section-curriculum">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-chart-3/10">
              <Layers className="h-5 w-5 text-chart-3" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Full Programs</p>
              <h2 className="font-serif text-2xl font-bold text-foreground">Curriculum Case Studies</h2>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {toolkit.curriculum.map((item, i) => (
            <div key={i} className="rounded-xl border border-card-border bg-card p-6 hover-elevate" data-testid={`card-curriculum-${i}`}>
              <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                <Badge variant="outline" className="text-xs no-default-active-elevate">{item.audience}</Badge>
                <Badge
                  variant="outline"
                  className={`text-xs no-default-active-elevate ${item.status === "Available" ? "border-emerald-500/40 text-emerald-700 dark:text-emerald-400" : "border-amber-500/40 text-amber-700 dark:text-amber-400"}`}
                >
                  {item.status}
                </Badge>
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Classroom Experiments */}
      <section className="py-14 sm:py-16" data-testid="section-experiments">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-chart-4/10">
              <Beaker className="h-5 w-5 text-chart-4" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Active Experiments</p>
              <h2 className="font-serif text-2xl font-bold text-foreground">AI Classroom Experiments</h2>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {toolkit.experiments.map((exp, i) => (
            <Card key={i} className="hover-elevate border-card-border" data-testid={`card-experiment-${i}`}>
              <CardHeader>
                <Badge variant="secondary" className="text-xs w-fit mb-2 no-default-active-elevate">{exp.setting}</Badge>
                <CardTitle className="font-serif text-base">{exp.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed mt-2">{exp.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* CTA */}
      <section className="py-14 sm:py-16" data-testid="section-toolkit-cta">
        <div className="rounded-xl border border-primary/20 bg-primary/5 px-6 py-10 sm:px-10">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Contribute to the Toolkit</h2>
          <p className="text-base leading-relaxed text-muted-foreground mb-6 max-w-2xl">
            Do you have a lesson plan, tool, or classroom experiment that fits our approach? We
            welcome contributions from educators and researchers. All resources are reviewed,
            credited, and published openly.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/collaborate">
              <Button data-testid="button-toolkit-contribute">
                Submit a Resource <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" data-testid="button-toolkit-contact">Get in Touch</Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
