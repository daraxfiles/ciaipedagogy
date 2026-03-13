import researchBannerImg from "@assets/stock_images/research-banner.jpg";
import aboutBannerImg from "@assets/stock_images/about-banner.jpg";
import projYouthAiImg from "@assets/stock_images/proj-youth-ai.png";
import { Link } from "wouter";
import { Hero } from "@/components/sections/Hero";
import { siteConfig } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const { research, toolkit, events } = siteConfig;

  return (
    <div>
      <Hero />

      {/* ── Editorial Grid ──────────────────────────────────────────────── */}
      <section
        className="py-16 sm:py-20 border-t border-border"
        data-testid="section-editorial-grid"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section label */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              Work & Updates
            </p>
            <Link
              href="/projects"
              className="hidden sm:flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              All Projects <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* ── ROW 1: Large research image tile (2/3) + Pillar II text tile (1/3) ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

            {/* Large image — Research hero */}
            <Link href="/research" className="md:col-span-2 block">
              <article
                className="relative overflow-hidden rounded-xl min-h-[360px] md:min-h-[460px] flex flex-col justify-end cursor-pointer group"
                data-testid="tile-research-hero"
              >
                <img
                  src={researchBannerImg}
                  alt="Researchers collaborating in a lab"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="relative z-10 p-7 sm:p-10">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-white/50 mb-2">
                    Research Framework
                  </p>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3">
                    {research.pillar1.title.replace("Pillar I: ", "")}
                  </h2>
                  <p className="text-sm text-white/65 mb-6 max-w-lg leading-relaxed">
                    {research.overview.text.slice(0, 140)}&hellip;
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all duration-200">
                    Explore Research <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </article>
            </Link>

            {/* Pillar II — dark navy text tile */}
            <Link href="/research" className="block">
              <article
                className="rounded-xl bg-primary p-7 sm:p-8 flex flex-col min-h-[280px] md:min-h-[460px] cursor-pointer group hover:opacity-95 transition-opacity"
                data-testid="tile-pillar2"
              >
                <p className="text-[10px] font-bold tracking-widest uppercase text-accent mb-4">
                  Pillar II
                </p>
                <h2 className="font-serif text-xl font-bold text-primary-foreground leading-snug mb-3">
                  {research.pillar2.title.replace("Pillar II: ", "")}
                </h2>
                <p className="text-sm leading-relaxed text-primary-foreground/60 mb-6">
                  {research.pillar2.description}
                </p>
                <ul className="space-y-3 mt-auto">
                  {research.pillar2.areas.slice(0, 3).map((area, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-primary-foreground/80">
                      <div className="h-px w-5 bg-accent mt-2.5 shrink-0" />
                      <span className="font-medium leading-snug">{area.title}</span>
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-accent group-hover:gap-2.5 transition-all duration-200">
                  Learn More <ArrowRight className="h-3 w-3" />
                </span>
              </article>
            </Link>
          </div>

          {/* ── ROW 2: Text project + Image project + Text project ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

            {/* Text card — AI Smuggling */}
            <Link href="/projects" className="block">
              <article
                className="rounded-xl border border-card-border bg-card p-6 flex flex-col h-full hover-elevate cursor-pointer group"
                data-testid="tile-project-smuggling"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-0.5 w-5 bg-primary rounded-full" />
                  <span className="text-[10px] font-bold tracking-widest uppercase text-primary">
                    Pillar I
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground leading-snug mb-2">
                  AI Smuggling &amp; Legitimacy Study
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground flex-1">
                  A qualitative investigation into why students conceal AI use in academic settings,
                  and what hidden practices reveal about institutional trust.
                </p>
                <div className="mt-5 pt-4 border-t border-card-border flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground tracking-wide">
                    Empirical Study &middot; Ongoing
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                </div>
              </article>
            </Link>

            {/* Image card — Youth AI */}
            <Link href="/projects" className="block">
              <article
                className="rounded-xl overflow-hidden bg-card flex flex-col h-full hover-elevate cursor-pointer group"
                data-testid="tile-project-youth"
              >
                <div className="overflow-hidden shrink-0" style={{ height: "180px" }}>
                  <img
                    src={projYouthAiImg}
                    alt="Youth and generative AI research"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-0.5 w-5 bg-accent rounded-full" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-accent-foreground">
                      Pillar II
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-foreground leading-snug mb-1.5">
                    Youth Interpreting Generative AI
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground flex-1">
                    How young people make meaning of AI-generated text, images, and video across
                    formal and informal learning contexts.
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-3 tracking-wide">
                    Design-Based Research &middot; Ongoing
                  </p>
                </div>
              </article>
            </Link>

            {/* Text card — Deepfake */}
            <Link href="/projects" className="block">
              <article
                className="rounded-xl border border-card-border bg-card p-6 flex flex-col h-full hover-elevate cursor-pointer group"
                data-testid="tile-project-deepfake"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-0.5 w-5 bg-accent rounded-full" />
                  <span className="text-[10px] font-bold tracking-widest uppercase text-accent-foreground">
                    Pillar II
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground leading-snug mb-2">
                  Deepfake Literacy Pedagogy
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground flex-1">
                  Pedagogical frameworks for teaching students to critically analyze synthetic media,
                  detect manipulation, and reason ethically about AI-generated content.
                </p>
                <div className="mt-5 pt-4 border-t border-card-border flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground tracking-wide">
                    Curriculum Design &middot; Pilot
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                </div>
              </article>
            </Link>
          </div>

          {/* ── ROW 3: Community image tile (1/3) + Toolkit text tile (2/3) ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

            {/* Community image tile */}
            <Link href="/people" className="block">
              <article
                className="relative overflow-hidden rounded-xl min-h-[340px] flex flex-col justify-end cursor-pointer group"
                data-testid="tile-community"
              >
                <img
                  src={aboutBannerImg}
                  alt="Research community collaborating"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="relative z-10 p-6">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-white/50 mb-1.5">
                    Community
                  </p>
                  <h3 className="font-serif text-xl font-bold text-white leading-snug mb-3">
                    The Critical Innovation Network
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:gap-2.5 transition-all duration-200">
                    Meet the People <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </article>
            </Link>

            {/* Toolkit text tile — large */}
            <article
              className="md:col-span-2 rounded-xl border border-card-border bg-card p-7 sm:p-8 flex flex-col"
              data-testid="tile-toolkit"
            >
              <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3">
                Open Resources
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Educator Toolkit
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground mb-7 max-w-xl">
                {toolkit.intro}
              </p>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 mb-8 flex-1">
                {[
                  { label: "AI Disclosure Frameworks", desc: "Syllabus statements and policy templates" },
                  { label: "Deepfake Analysis Lessons", desc: "Rubrics and classroom lesson plans" },
                  { label: "AI Literacy Curricula", desc: "K-12 and higher education programs" },
                  { label: "Open-Source Tools", desc: "Free tools for low-bandwidth settings" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="h-px w-4 bg-primary mt-2.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground leading-snug">{item.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <Link href="/toolkit">
                  <Button data-testid="button-explore-toolkit">
                    Explore the Toolkit <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </article>
          </div>

          {/* ── ROW 4: Upcoming events (2/3) + Insights (1/3) ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Two event cards */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {events.upcoming.slice(0, 2).map((event, i) => (
                <Link href="/events" key={i} className="block">
                  <article
                    className="rounded-xl border border-card-border bg-card p-5 h-full hover-elevate cursor-pointer"
                    data-testid={`card-home-event-${i}`}
                  >
                    <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-2">
                      Upcoming Event
                    </p>
                    <p className="text-xs font-semibold text-accent-foreground mb-2">{event.date}</p>
                    <h3 className="font-serif text-base font-bold text-foreground leading-snug mb-2">
                      {event.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">{event.description}</p>
                  </article>
                </Link>
              ))}
            </div>

            {/* Research insights */}
            <article
              className="rounded-xl border border-primary/20 bg-primary/5 p-6 flex flex-col"
              data-testid="tile-insights"
            >
              <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-5">
                Research Insights
              </p>
              <div className="space-y-4 flex-1">
                {events.insights.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5" data-testid={`card-home-insight-${i}`}>
                    <Badge
                      variant="secondary"
                      className="text-[10px] shrink-0 mt-0.5 no-default-active-elevate"
                    >
                      {item.tag}
                    </Badge>
                    <div>
                      <p className="text-xs font-medium text-foreground leading-snug mb-0.5">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/events" className="mt-6 block">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  data-testid="button-view-insights"
                >
                  All Insights <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section
        className="py-16 sm:py-20 border-t border-border"
        data-testid="section-home-cta"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-primary px-8 py-12 sm:px-12 sm:py-16 text-primary-foreground">
            <div className="max-w-2xl">
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
