import projYouthAiImg from "@assets/stock_images/proj-youth-ai.png";
import projDeepfakeImg from "@assets/stock_images/proj-deepfake.png";
import projVibeCodingImg from "@assets/stock_images/proj-vibe-coding.png";
import projOpenSourceImg from "@assets/stock_images/proj-open-source.png";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, GraduationCap, ExternalLink } from "lucide-react";

/* ─── Pillar accent definitions ─────────────────────────────────────────── */
const pillars = [
  {
    id: "pillar-1",
    label: "Pillar I",
    title: "Agency, Judgment & Psychology of AI Use",
    dotColor: "bg-primary",
    labelColor: "text-primary",
    badgeBg: "bg-primary/10",
    badgeText: "text-primary",
    accentBar: "bg-primary",
  },
  {
    id: "pillar-2",
    label: "Pillar II",
    title: "Critical AI & Media Literacy",
    dotColor: "bg-accent",
    labelColor: "text-accent-foreground",
    badgeBg: "bg-accent/15",
    badgeText: "text-accent-foreground",
    accentBar: "bg-accent",
  },
  {
    id: "pillar-3",
    label: "Pillar III",
    title: "AI Design & Learning Innovation",
    dotColor: "bg-chart-3",
    labelColor: "text-chart-3",
    badgeBg: "bg-chart-3/15",
    badgeText: "text-chart-3",
    accentBar: "bg-chart-3",
  },
  {
    id: "pillar-4",
    label: "Pillar IV",
    title: "Equitable AI Tools",
    dotColor: "bg-chart-4",
    labelColor: "text-chart-4",
    badgeBg: "bg-chart-4/15",
    badgeText: "text-chart-4",
    accentBar: "bg-chart-4",
  },
];

/* ─── Flat project list for the media grid ───────────────────────────────
   Order is arranged so 2-col layout alternates: TEXT | IMAGE, IMAGE | TEXT …
   image: null = text-only card  |  image: string = image-first card         */
type ProjectCard = {
  title: string;
  description: string;
  focus: string;
  type: string;
  status: "Ongoing" | "Pilot" | "Building";
  pillarIndex: number;
  image: string | null;
};

const allProjects: ProjectCard[] = [
  // Row 1: TEXT | IMAGE
  {
    title: "AI Smuggling & Legitimacy Study",
    description:
      "A qualitative study investigating why students conceal their AI use in academic settings. We examine the psychology of concealment, institutional trust dynamics, and what hidden AI practices reveal about learning environments.",
    focus: "Epistemic Trust & Agency",
    type: "Empirical Study",
    status: "Ongoing",
    pillarIndex: 0,
    image: null,
  },
  {
    title: "Youth Interpreting Generative AI",
    description:
      "How do young people make meaning of AI-generated text, images, and video? A study of the interpretive frameworks youth bring to generative AI across formal and informal learning contexts.",
    focus: "Youth & Generative AI",
    type: "Design-Based Research",
    status: "Ongoing",
    pillarIndex: 1,
    image: projYouthAiImg,
  },
  // Row 2: IMAGE | TEXT
  {
    title: "Deepfake Literacy Pedagogy",
    description:
      "Developing and testing pedagogical frameworks for teaching students to critically analyze synthetic media. Covers detection skills, ethical reasoning, and understanding sociopolitical implications.",
    focus: "Synthetic Media & Critical Literacy",
    type: "Curriculum Design",
    status: "Pilot",
    pillarIndex: 1,
    image: projDeepfakeImg,
  },
  {
    title: "Trust and Epistemic Judgment in AI Use",
    description:
      "A longitudinal investigation into how learners evaluate the credibility of AI-generated information across disciplines. We study the cognitive and social processes through which students form trust judgments.",
    focus: "Epistemic Trust",
    type: "Longitudinal Study",
    status: "Ongoing",
    pillarIndex: 0,
    image: null,
  },
  // Row 3: IMAGE | TEXT
  {
    title: "Vibe Coding for Education",
    description:
      "An experimental studio where students learn programming through AI-assisted creative coding. Emphasizes aesthetic experience and computational thinking over syntax mastery.",
    focus: "Creative Computing & CS Education",
    type: "Experimental Studio",
    status: "Pilot",
    pillarIndex: 2,
    image: projVibeCodingImg,
  },
  {
    title: "AI-Powered Micro-Content Design",
    description:
      "Investigating how AI tools can support educators in designing modular, high-impact micro-learning content. We study design process, pedagogical outcomes, and ethical dimensions of AI-assisted instructional design.",
    focus: "Instructional Design",
    type: "Participatory Design",
    status: "Building",
    pillarIndex: 2,
    image: null,
  },
  // Row 4: TEXT | IMAGE
  {
    title: "AI Literacy for Low-Access Communities",
    description:
      "Building accessible AI literacy programs for schools and communities with limited computational resources. We develop offline-compatible curricula and examine the equity dimensions of differential AI access.",
    focus: "Educational Equity",
    type: "Community-Based Research",
    status: "Ongoing",
    pillarIndex: 3,
    image: null,
  },
  {
    title: "Open-Source AI Tools for Schools",
    description:
      "Designing and maintaining open-source AI tools for educational settings. All tools are free, auditable, and engineered to function in low-bandwidth environments with a focus on community ownership.",
    focus: "Open-Source Development",
    type: "Tool Development",
    status: "Building",
    pillarIndex: 3,
    image: projOpenSourceImg,
  },
];

const statusColors: Record<string, string> = {
  Ongoing: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  Pilot: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  Building: "bg-chart-4/10 text-chart-4",
};

/* ─── Image card ─────────────────────────────────────────────────────────── */
function ImageProjectCard({
  project,
  pillar,
  index,
}: {
  project: ProjectCard;
  pillar: (typeof pillars)[number];
  index: number;
}) {
  return (
    <article
      className="flex flex-col bg-card rounded-xl overflow-hidden hover-elevate"
      data-testid={`card-project-image-${index}`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.image!}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* Pillar badge overlay */}
        <div className="absolute bottom-3 left-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm ${pillar.badgeBg} ${pillar.badgeText} bg-opacity-90`}
          >
            <span className={`h-1 w-1 rounded-full ${pillar.dotColor}`} />
            {pillar.label}
          </span>
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-serif text-xl font-bold text-foreground leading-snug mb-2">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-4 pt-4 border-t border-card-border text-xs text-muted-foreground">
          <span>{project.type}</span>
          <span className="text-border">·</span>
          <span>{project.focus}</span>
          <span className="text-border">·</span>
          <span className={`font-medium ${statusColors[project.status]}`}>{project.status}</span>
        </div>
      </div>
    </article>
  );
}

/* ─── Text-only card ─────────────────────────────────────────────────────── */
function TextProjectCard({
  project,
  pillar,
  index,
}: {
  project: ProjectCard;
  pillar: (typeof pillars)[number];
  index: number;
}) {
  return (
    <article
      className="flex flex-col bg-card rounded-xl p-7 hover-elevate"
      data-testid={`card-project-text-${index}`}
    >
      {/* Accent bar + pillar label */}
      <div className="flex items-center gap-2 mb-5">
        <div className={`h-0.5 w-8 rounded-full ${pillar.accentBar}`} />
        <span className={`text-[10px] font-bold tracking-widest uppercase ${pillar.labelColor}`}>
          {pillar.label}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-serif text-2xl font-bold text-foreground leading-tight mb-3">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-muted-foreground flex-1">
        {project.description}
      </p>

      {/* Metadata */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-5 pt-4 border-t border-card-border text-xs text-muted-foreground">
        <span>{project.type}</span>
        <span className="text-border">·</span>
        <span>{project.focus}</span>
        <span className="text-border">·</span>
        <span className={`font-medium ${statusColors[project.status]}`}>{project.status}</span>
      </div>
    </article>
  );
}

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
  { label: "Publications", desc: "Peer-reviewed articles, working papers, policy briefs", href: "/publications" },
  { label: "Presentations", desc: "Conference talks, keynotes, panels", href: "/publications" },
  { label: "Teaching Resources", desc: "Syllabi, lesson plans, ethical frameworks", href: "/projects" },
  { label: "Workshops", desc: "Educator institutes, faculty development sessions", href: "/events" },
  { label: "GitHub & Prototypes", desc: "Open-source tools and experimental prototypes", href: "#" },
  { label: "Media & Public Writing", desc: "Public scholarship, op-eds, community resources", href: "/publications" },
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
            and educational design. Our work spans four interconnected research pillars, each
            grounded in equity, human agency, and critical inquiry.
          </p>
        </div>

        {/* Pillar legend strip */}
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          {pillars.map((p) => (
            <div key={p.id} className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className={`h-1.5 w-1.5 rounded-full ${p.dotColor}`} />
              {p.label}: {p.title}
            </div>
          ))}
        </div>
      </section>

      {/* ── MIT Media Lab-style project grid ─────────────────────────────── */}
      <section data-testid="section-project-grid">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-0.5 w-10 bg-primary rounded-full" />
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
            Active Research
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {allProjects.map((project, i) => {
            const pillar = pillars[project.pillarIndex];
            return project.image ? (
              <ImageProjectCard key={i} project={project} pillar={pillar} index={i} />
            ) : (
              <TextProjectCard key={i} project={project} pillar={pillar} index={i} />
            );
          })}
        </div>
      </section>

      <Separator />

      {/* Student Research & Innovation */}
      <section data-testid="section-student-research">
        <div className="mb-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Student Involvement</p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            Student Research & Innovation
          </h2>
        </div>
        <p className="text-base leading-relaxed text-muted-foreground max-w-3xl mb-8">
          Undergraduate and graduate students are active partners in every phase of our research, from design and data collection to analysis, presentation, and publication. We are
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
        <div className="mb-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Open Scholarship</p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            Outputs & Open Resources
          </h2>
        </div>
        <p className="text-base leading-relaxed text-muted-foreground max-w-3xl mb-8">
          Our network is committed to open scholarship. All tools are free. Publications are
          available via open access where possible. Teaching resources are shared publicly for
          educators everywhere.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {outputs.map((item, i) => (
            <Link key={i} href={item.href}>
              <div
                className="flex items-start justify-between gap-4 p-5 rounded-lg border border-card-border bg-card hover:bg-card/80 hover:border-primary/30 transition-colors cursor-pointer group"
                data-testid={`card-output-${i}`}
              >
                <div>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-primary/60 shrink-0 mt-0.5 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Separator />

      {/* Collaborate CTA */}
      <section data-testid="section-projects-cta">
        <div className="rounded-xl border border-primary/20 bg-primary/5 px-6 py-10 sm:px-10 sm:py-12">
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Collaborate With Us
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground mb-8">
              We welcome researchers, educators, graduate students, schools, and technology
              partners who share our commitment to human-centered, equitable AI in education.
              Whether you want to co-design a study, test curriculum, or build open tools. We'd
              love to connect.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/collaborate">
                <Button size="lg" data-testid="button-collaborate-on-project">
                  Collaborate on a Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/register">
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
