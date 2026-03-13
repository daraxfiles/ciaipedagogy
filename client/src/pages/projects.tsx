import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Brain,
  BookOpen,
  Cpu,
  Globe,
  GraduationCap,
  Lightbulb,
  Users,
  FlaskConical,
  FileText,
  Presentation,
  Wrench,
  Github,
  ExternalLink,
} from "lucide-react";

const pillars = [
  {
    id: "pillar-1",
    label: "Pillar I",
    title: "Agency, Judgment & Psychology of AI Use",
    icon: Brain,
    color: "bg-primary/10 text-primary border-primary/20",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    projects: [
      {
        title: "AI Smuggling & Legitimacy Study",
        description:
          "A multi-institutional qualitative study investigating why students conceal their AI use in academic settings. We examine the psychology of concealment, institutional trust dynamics, and what hidden AI practices reveal about learning environments and academic identity.",
        focus: "Epistemic Trust & Agency",
        type: "Empirical Study",
        status: "Ongoing",
        outputs: "3 publications, 2 conference presentations",
        lead: "Faculty Lead & Graduate Fellow",
      },
      {
        title: "Trust and Epistemic Judgment in AI Use",
        description:
          "A longitudinal investigation into how learners evaluate the credibility and accuracy of AI-generated information across disciplines. We study the cognitive and social processes through which students form, revise, and apply trust judgments in AI-mediated academic work.",
        focus: "Epistemic Trust",
        type: "Longitudinal Study",
        status: "Ongoing",
        outputs: "2 publications in progress",
        lead: "Postdoctoral Fellow",
      },
    ],
  },
  {
    id: "pillar-2",
    label: "Pillar II",
    title: "Critical AI & Media Literacy",
    icon: Lightbulb,
    color: "bg-accent/15 text-accent-foreground border-accent/20",
    iconBg: "bg-accent/15",
    iconColor: "text-accent-foreground",
    projects: [
      {
        title: "Youth Interpreting Generative AI",
        description:
          "How do young people make meaning of AI-generated text, images, and video? This study examines the interpretive frameworks youth bring to generative AI content across informal and formal learning contexts, with attention to equity and differential access.",
        focus: "Youth & Generative AI",
        type: "Design-Based Research",
        status: "Ongoing",
        outputs: "1 publication, curriculum modules",
        lead: "Graduate Fellow",
      },
      {
        title: "Deepfake Literacy Pedagogy",
        description:
          "Developing and testing pedagogical frameworks for teaching students to critically analyze synthetic media. Covers detection skills, ethical reasoning about creation and distribution, and understanding the sociopolitical implications of deepfake technology in K-12 and higher education.",
        focus: "Synthetic Media & Critical Literacy",
        type: "Curriculum Design",
        status: "Pilot",
        outputs: "Framework paper, lesson plans",
        lead: "Research Director",
      },
    ],
  },
  {
    id: "pillar-3",
    label: "Pillar III",
    title: "AI Design & Learning Innovation",
    icon: Cpu,
    color: "bg-chart-3/15 text-chart-3 border-chart-3/20",
    iconBg: "bg-chart-3/10",
    iconColor: "text-chart-3",
    projects: [
      {
        title: "Vibe Coding for Education",
        description:
          "An experimental learning environment exploring how students learn programming through AI-assisted creative coding. The studio emphasizes aesthetic experience, creative expression, and computational thinking over syntax mastery, enabling more students to engage meaningfully with code.",
        focus: "Creative Computing & CS Education",
        type: "Experimental Studio",
        status: "Pilot",
        outputs: "Studio prototype, pilot report",
        lead: "Faculty Lead",
      },
      {
        title: "AI-Powered Micro-Content Design",
        description:
          "Investigating how AI tools can support educators in designing modular, high-impact micro-learning content. We study the design process, pedagogical outcomes, and ethical dimensions of AI-assisted instructional design in professional and academic settings.",
        focus: "Instructional Design",
        type: "Participatory Design",
        status: "Building",
        outputs: "Design principles, working paper",
        lead: "Lab Coordinator",
      },
    ],
  },
  {
    id: "pillar-4",
    label: "Pillar IV",
    title: "Equitable AI Tools",
    icon: Globe,
    color: "bg-chart-4/15 text-chart-4 border-chart-4/20",
    iconBg: "bg-chart-4/10",
    iconColor: "text-chart-4",
    projects: [
      {
        title: "AI Literacy for Low-Access Communities",
        description:
          "Building accessible AI literacy programs for schools and communities with limited computational resources and connectivity. We develop offline-compatible curricula and examine the equity dimensions of differential AI access in formal and informal learning contexts.",
        focus: "Educational Equity",
        type: "Community-Based Research",
        status: "Ongoing",
        outputs: "Curriculum resources, policy brief",
        lead: "Lab Coordinator",
      },
      {
        title: "Open-Source AI Tools for Schools",
        description:
          "Designing, building, and maintaining open-source AI tools for educational settings. All tools are free, auditable, and engineered to function in low-bandwidth environments, with a focus on transparency, educator control, and community ownership.",
        focus: "Open-Source Development",
        type: "Tool Development",
        status: "Building",
        outputs: "GitHub repository, documentation",
        lead: "Research Team",
      },
    ],
  },
];

const statusColors: Record<string, string> = {
  Ongoing: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20",
  Pilot: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20",
  Building: "bg-chart-4/10 text-chart-4 border border-chart-4/20",
};

const studentProjects = [
  {
    name: "Undergraduate Research Cohort",
    term: "Spring 2026",
    description:
      "Six undergraduate students contributing to active research projects through data collection, literature review, and pilot-scale analysis. Mentored by graduate fellows and faculty.",
    tags: ["AI Smuggling", "Media Literacy", "Vibe Coding"],
  },
  {
    name: "Creative Inquiry Research Team",
    term: "2025–2026",
    description:
      "A Creative Inquiry cohort co-designing AI literacy curriculum with community educators. Students develop, test, and refine lesson modules for K-12 settings.",
    tags: ["Curriculum Design", "Community Engagement", "AI Literacy"],
  },
  {
    name: "Graduate Fellows Collaborative",
    term: "Ongoing",
    description:
      "Doctoral and master's students conducting original research as part of the Critical Innovation network. Fellows lead sub-studies, present at conferences, and contribute to publications.",
    tags: ["Doctoral Research", "Conference Presentations", "Co-Authorship"],
  },
];

const outputs = [
  { icon: FileText, label: "Publications", desc: "Peer-reviewed articles, working papers, policy briefs", href: "/publications" },
  { icon: Presentation, label: "Presentations", desc: "Conference talks, keynotes, panels", href: "/publications" },
  { icon: BookOpen, label: "Teaching Resources", desc: "Syllabi, lesson plans, ethical frameworks", href: "/projects" },
  { icon: Wrench, label: "Workshops", desc: "Educator institutes, faculty development sessions", href: "/insights" },
  { icon: Github, label: "GitHub & Prototypes", desc: "Open-source tools and experimental prototypes", href: "#" },
  { icon: Globe, label: "Media & Public Writing", desc: "Public scholarship, op-eds, community resources", href: "/publications" },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-20 sm:space-y-28">

      {/* Hero / Intro */}
      <section data-testid="section-projects-hero">
        <div className="max-w-3xl">
          <div className="flex flex-wrap gap-2 mb-5">
            <Badge variant="outline" className="text-xs font-medium px-3 py-1">Research Studies</Badge>
            <Badge variant="outline" className="text-xs font-medium px-3 py-1">Teaching Experiments</Badge>
            <Badge variant="outline" className="text-xs font-medium px-3 py-1">Open Tools & Prototypes</Badge>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-5">
            Projects & Research Initiatives
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
            The Critical Innovation & AI Pedagogy network develops research studies, teaching
            experiments, and open tools that explore how AI reshapes learning, knowledge production,
            and educational design. Our work spans four interconnected research pillars — each
            grounded in equity, human agency, and critical inquiry.
          </p>
        </div>

        {/* Affiliation strip */}
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            Research Network
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-1.5 w-1.5 rounded-full bg-accent" />
            Creative Inquiry
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-1.5 w-1.5 rounded-full bg-chart-3" />
            Research · Teaching · Design
          </div>
        </div>
      </section>

      {/* Research Pillars */}
      {pillars.map((pillar) => {
        const PillarIcon = pillar.icon;
        return (
          <section key={pillar.id} data-testid={`section-${pillar.id}`}>
            {/* Pillar header */}
            <div className="flex items-start gap-4 mb-8">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md ${pillar.iconBg} mt-0.5`}>
                <PillarIcon className={`h-5 w-5 ${pillar.iconColor}`} />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">
                  {pillar.label}
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                  {pillar.title}
                </h2>
              </div>
            </div>

            {/* Project cards */}
            <div className="grid sm:grid-cols-2 gap-5">
              {pillar.projects.map((project, i) => (
                <Card
                  key={i}
                  className="flex flex-col hover-elevate border-card-border"
                  data-testid={`card-${pillar.id}-project-${i}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <Badge variant="outline" className={`text-xs shrink-0 no-default-active-elevate ${pillar.color}`}>
                        {pillar.label}
                      </Badge>
                      <Badge variant="secondary" className={`text-xs shrink-0 no-default-active-elevate ${statusColors[project.status] || ""}`}>
                        {project.status}
                      </Badge>
                    </div>
                    <CardTitle className="font-serif text-lg leading-snug">{project.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed mt-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto pt-0">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-muted-foreground border-t border-card-border pt-4 mb-5">
                      <div>
                        <span className="block font-semibold text-foreground/70 uppercase tracking-wide text-[10px] mb-0.5">Focus Area</span>
                        {project.focus}
                      </div>
                      <div>
                        <span className="block font-semibold text-foreground/70 uppercase tracking-wide text-[10px] mb-0.5">Project Type</span>
                        {project.type}
                      </div>
                      <div>
                        <span className="block font-semibold text-foreground/70 uppercase tracking-wide text-[10px] mb-0.5">Outputs</span>
                        {project.outputs}
                      </div>
                      <div>
                        <span className="block font-semibold text-foreground/70 uppercase tracking-wide text-[10px] mb-0.5">Lead</span>
                        {project.lead}
                      </div>
                    </div>
                    <Link href="/collaborate">
                      <Button variant="outline" size="sm" className="w-full" data-testid={`button-learn-more-${pillar.id}-${i}`}>
                        Learn More <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        );
      })}

      <Separator />

      {/* Student Research & Innovation */}
      <section data-testid="section-student-research">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-accent/15">
            <GraduationCap className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-0.5">Student Involvement</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              Student Research & Innovation
            </h2>
          </div>
        </div>
        <p className="text-base leading-relaxed text-muted-foreground max-w-3xl mb-8">
          Undergraduate and graduate students are active partners in every phase of our research —
          from design and data collection to analysis, presentation, and publication. We are
          committed to mentored, high-impact research experiences grounded in creative inquiry.
        </p>
        <div className="grid sm:grid-cols-3 gap-5 mb-8">
          {studentProjects.map((proj, i) => (
            <Card key={i} className="hover-elevate border-card-border" data-testid={`card-student-${i}`}>
              <CardHeader>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <Badge variant="outline" className="text-[10px] font-semibold tracking-wide uppercase no-default-active-elevate">
                    {proj.term}
                  </Badge>
                </div>
                <CardTitle className="font-serif text-base">{proj.name}</CardTitle>
                <CardDescription className="text-sm leading-relaxed mt-2">
                  {proj.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs no-default-active-elevate">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Link href="/collaborate">
          <Button variant="outline" data-testid="button-view-student-work">
            <GraduationCap className="mr-2 h-4 w-4" />
            Apply as a Student Fellow
          </Button>
        </Link>
      </section>

      <Separator />

      {/* Outputs & Open Resources */}
      <section data-testid="section-outputs">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10">
            <FlaskConical className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-0.5">Open Scholarship</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              Outputs & Open Resources
            </h2>
          </div>
        </div>
        <p className="text-base leading-relaxed text-muted-foreground max-w-3xl mb-8">
          Our network is committed to open scholarship. All tools are free. Publications are
          available via open access where possible. Teaching resources are shared publicly for
          educators everywhere.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {outputs.map((item, i) => {
            const Icon = item.icon;
            return (
              <Link key={i} href={item.href}>
                <div
                  className="flex items-start gap-4 p-5 rounded-lg border border-card-border bg-card hover:bg-card/80 hover:border-primary/30 transition-colors cursor-pointer group"
                  data-testid={`card-output-${i}`}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                      {item.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <ExternalLink className="ml-auto h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-primary/60 shrink-0 mt-0.5 transition-colors" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <Separator />

      {/* Collaborate CTA */}
      <section data-testid="section-projects-cta">
        <div className="rounded-xl border border-primary/20 bg-primary/5 px-6 py-10 sm:px-10 sm:py-12">
          <div className="max-w-2xl">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 mb-5">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Collaborate With Us
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground mb-8">
              We welcome researchers, educators, graduate students, schools, and technology
              partners who share our commitment to human-centered, equitable AI in education.
              Whether you want to co-design a study, test curriculum, or build open tools — we'd
              love to connect.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/collaborate">
                <Button size="lg" data-testid="button-collaborate-on-project">
                  Collaborate on a Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/collaborate">
                <Button size="lg" variant="outline" data-testid="button-join-network">
                  Join the Network
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="ghost" data-testid="button-contact-us">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
