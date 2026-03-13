import { Link } from "wouter";
import { Hero } from "@/components/sections/Hero";
import { siteConfig } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Brain, Eye, FlaskConical, Wrench, Calendar, Users, CheckCircle } from "lucide-react";

const statusColors: Record<string, string> = {
  Ongoing: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20",
  Pilot: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20",
  Building: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20",
};

export default function Home() {
  const { research, projects, toolkit, events } = siteConfig;

  return (
    <div>
      <Hero />

      {/* Research Pillars */}
      <section className="py-16 sm:py-20 border-t border-border" data-testid="section-home-pillars">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">Research Framework</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">Two Interconnected Pillars</h2>
            </div>
            <Link href="/research" className="hidden sm:flex items-center gap-1 text-sm text-primary font-medium hover:underline shrink-0">
              Full Research Program <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Pillar I */}
            <div className="rounded-xl border border-card-border bg-card p-6 sm:p-8 hover-elevate" data-testid="card-home-pillar1">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs font-semibold tracking-wider uppercase text-primary">Pillar I</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">{research.pillar1.title.replace("Pillar I: ", "")}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground mb-5">{research.pillar1.description}</p>
              <ul className="space-y-2">
                {research.pillar1.areas.slice(0, 3).map((area, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span className="font-medium">{area.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pillar II */}
            <div className="rounded-xl border border-card-border bg-card p-6 sm:p-8 hover-elevate" data-testid="card-home-pillar2">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/15">
                  <Eye className="h-5 w-5 text-accent-foreground" />
                </div>
                <span className="text-xs font-semibold tracking-wider uppercase text-accent-foreground">Pillar II</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">{research.pillar2.title.replace("Pillar II: ", "")}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground mb-5">{research.pillar2.description}</p>
              <ul className="space-y-2">
                {research.pillar2.areas.slice(0, 3).map((area, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    <span className="font-medium">{area.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 sm:hidden">
            <Link href="/research">
              <Button variant="outline" className="w-full">
                Full Research Program <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 sm:py-20 border-t border-border bg-card/40" data-testid="section-home-projects">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">Active Research</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">Featured Projects</h2>
            </div>
            <Link href="/projects" className="hidden sm:flex items-center gap-1 text-sm text-primary font-medium hover:underline shrink-0">
              All Projects <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.featured.map((project, i) => (
              <Card key={i} className="flex flex-col hover-elevate border-card-border" data-testid={`card-home-project-${i}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold text-muted-foreground tracking-wide">{project.pillar}</span>
                    <Badge variant="secondary" className={`text-xs shrink-0 no-default-active-elevate ${statusColors[project.status] || ""}`}>
                      {project.status}
                    </Badge>
                  </div>
                  <CardTitle className="font-serif text-base leading-snug">{project.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed mt-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-0">
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="outline" className="text-xs no-default-active-elevate">{project.focus}</Badge>
                    <Badge variant="outline" className="text-xs no-default-active-elevate">{project.type}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/projects">
              <Button data-testid="button-view-all-projects">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/collaborate">
              <Button variant="outline" data-testid="button-home-collaborate">
                Collaborate on Research
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Toolkit Highlight */}
      <section className="py-16 sm:py-20 border-t border-border" data-testid="section-home-toolkit">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">Open Resources</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Educator Toolkit
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground mb-6">
                {toolkit.intro}
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Syllabus statements and AI disclosure frameworks",
                  "Deepfake analysis lesson plans and rubrics",
                  "AI literacy curricula for K-12 and higher education",
                  "Open-source tools for low-bandwidth settings",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/toolkit">
                <Button data-testid="button-explore-toolkit">
                  <Wrench className="mr-2 h-4 w-4" />
                  Explore the Toolkit
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {toolkit.openTools.map((tool, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-lg border border-card-border bg-card" data-testid={`card-home-tool-${i}`}>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10">
                    <FlaskConical className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <p className="font-semibold text-sm text-foreground">{tool.title}</p>
                      <Badge variant="outline" className={`text-[10px] no-default-active-elevate ${tool.status === "Available" ? "border-emerald-500/40 text-emerald-700 dark:text-emerald-400" : "border-amber-500/40 text-amber-700 dark:text-amber-400"}`}>
                        {tool.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events & Insights Preview */}
      <section className="py-16 sm:py-20 border-t border-border bg-card/40" data-testid="section-home-events">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">Updates</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">Events & Insights</h2>
            </div>
            <Link href="/events" className="hidden sm:flex items-center gap-1 text-sm text-primary font-medium hover:underline shrink-0">
              All Updates <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Upcoming Events */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Calendar className="h-4 w-4 text-accent-foreground" />
                <h3 className="font-serif text-lg font-semibold text-foreground">Upcoming Events</h3>
              </div>
              <div className="space-y-4">
                {events.upcoming.slice(0, 2).map((event, i) => (
                  <div key={i} className="p-4 rounded-lg border border-card-border bg-background" data-testid={`card-home-event-${i}`}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-medium text-accent-foreground">{event.date}</span>
                    </div>
                    <p className="font-serif font-semibold text-sm text-foreground mb-1">{event.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{event.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Insights */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="h-4 w-4 flex items-center justify-center">
                  <span className="block h-3.5 w-0.5 bg-muted-foreground rounded-full" />
                </span>
                <h3 className="font-serif text-lg font-semibold text-foreground">Recent Insights</h3>
              </div>
              <div className="space-y-4">
                {events.insights.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex items-start gap-3" data-testid={`card-home-insight-${i}`}>
                    <Badge variant="secondary" className="text-[10px] shrink-0 mt-0.5 no-default-active-elevate">{item.tag}</Badge>
                    <div>
                      <p className="text-sm font-medium text-foreground leading-snug mb-0.5">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 border-t border-border" data-testid="section-home-cta">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-primary px-8 py-12 sm:px-12 sm:py-16 text-primary-foreground">
            <div className="max-w-2xl">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary-foreground/10 mb-5">
                <Users className="h-5 w-5 text-primary-foreground" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-3">
                Join the Critical Innovation Network
              </h2>
              <p className="text-base text-primary-foreground/80 leading-relaxed mb-8">
                We welcome researchers, educators, graduate students, schools, and technology
                partners committed to human-centered, equitable AI in education. Whether you
                want to co-design a study, test curriculum, or build open tools — we'd love
                to connect.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/collaborate">
                  <Button
                    size="lg"
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                    data-testid="button-cta-collaborate"
                  >
                    Collaborate With Us <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="text-primary-foreground hover:bg-primary-foreground/10 border border-primary-foreground/20"
                    data-testid="button-cta-contact"
                  >
                    Get In Touch
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
