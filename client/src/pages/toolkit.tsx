import { Link } from "wouter";
import { siteConfig } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, ExternalLink, Clock } from "lucide-react";

// ── Shared "Coming Soon" block ────────────────────────────────────────────────
function ComingSoonBlock({ message }: { message?: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-muted/20 px-8 py-12 flex flex-col items-center text-center gap-3">
      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
        <Clock className="h-4 w-4 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium text-foreground">Coming Soon</p>
      <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
        {message ?? "This content is currently being developed. Check back soon."}
      </p>
    </div>
  );
}

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
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Free to Use</p>
          <h2 className="font-serif text-2xl font-bold text-foreground">Open-Source Tools</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {toolkit.openTools.map((tool, i) => (
            <Card key={i} className="flex flex-col hover-elevate border-card-border" data-testid={`card-tool-${i}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge
                    variant="outline"
                    className={`text-xs no-default-active-elevate ${
                      tool.status === "Available"
                        ? "border-emerald-500/40 text-emerald-700 dark:text-emerald-400"
                        : "border-amber-500/40 text-amber-700 dark:text-amber-400"
                    }`}
                  >
                    {tool.status}
                  </Badge>
                </div>
                <CardTitle className="font-serif text-base leading-snug">{tool.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed mt-2">{tool.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-0">
                {/* Available tool with real link */}
                {tool.link.startsWith("http") ? (
                  <a href={tool.link} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="w-full" data-testid={`button-tool-${i}`}>
                      Access Tool <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </a>
                ) : tool.link !== "#" ? (
                  <Link href={tool.link}>
                    <Button variant="outline" size="sm" className="w-full" data-testid={`button-tool-${i}`}>
                      Access Tool <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                ) : (
                  /* Coming soon — not yet available */
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full cursor-default text-muted-foreground border-dashed"
                    disabled
                    data-testid={`button-tool-${i}`}
                  >
                    <Clock className="mr-1.5 h-3.5 w-3.5" />
                    Coming Soon
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Teaching Resources — Coming Soon */}
      <section className="py-14 sm:py-16" data-testid="section-resources">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Classroom Ready</p>
          <h2 className="font-serif text-2xl font-bold text-foreground">Teaching Resources</h2>
        </div>
        <ComingSoonBlock message="Teaching resources including lesson plans, discussion guides, and assessment tools are currently being developed and will be available here soon." />
      </section>

      <Separator />

      {/* Curriculum Case Studies — Coming Soon */}
      <section className="py-14 sm:py-16" data-testid="section-curriculum">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Full Programs</p>
          <h2 className="font-serif text-2xl font-bold text-foreground">Curriculum Case Studies</h2>
        </div>
        <ComingSoonBlock message="Curriculum case studies, including our Critical AI Literacy Curriculum and Vibe Coding Studio materials, are being finalized and will be shared here." />
      </section>

      <Separator />

      {/* AI Classroom Experiments — Coming Soon */}
      <section className="py-14 sm:py-16" data-testid="section-experiments">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Active Experiments</p>
          <h2 className="font-serif text-2xl font-bold text-foreground">AI Classroom Experiments</h2>
        </div>
        <ComingSoonBlock message="Documentation for our classroom experiments — including the Participatory AI Design Lab and Deepfake Creator Workshop — is coming soon." />
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
