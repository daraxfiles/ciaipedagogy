export const siteConfig = {
  name: "Critical Innovation & AI Pedagogy",
  logoMark: "CI&AIP",

  nav: {
    items: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Research", href: "#research" },
      { label: "Research in Action", href: "#action" },
      { label: "Publications", href: "#publications" },
      { label: "Insights & Events", href: "#insights" },
      { label: "Collaborate", href: "#collaborate" },
      { label: "Contact", href: "#contact" },
    ],
    cta: { label: "Join the Network", href: "#collaborate" },
  },

  hero: {
    headline: "Reimagining AI in Education Through Agency, Ethics, and Equity",
    subheadline:
      "Critical Innovation & AI Pedagogy is a research and practice working group examining how artificial intelligence reshapes teaching, learning, and knowledge production in sociotechnical educational systems.",
    supporting:
      "We study agency, epistemic trust, hidden AI practices, and equitable innovation in automated learning environments.",
    primaryCta: { label: "Explore Our Research", href: "#research" },
    secondaryCta: { label: "Collaborate With Us", href: "#collaborate" },
    circles: [
      "Agency & Judgment",
      "Critical AI Literacy",
      "Equitable Innovation",
    ],
  },

  pillars: {
    title: "Our Research Pillars",
    items: [
      {
        title: "Agency, Judgment & Psychology of AI Use",
        text: "We examine how learners and educators interpret, negotiate, and respond to AI systems in learning environments.",
        link: { label: "Learn More", href: "#research" },
      },
      {
        title: "Critical AI & Media Literacy",
        text: "We investigate how learners critically analyze and respond to AI-generated media, including synthetic video, audio, and images.",
        link: { label: "Learn More", href: "#research" },
      },
      {
        title: "Equitable & Transparent Innovation",
        text: "We design low-resource, open-source, and ethically transparent models so AI innovation does not widen inequities.",
        link: { label: "Learn More", href: "#research" },
      },
    ],
  },

  researchInAction: {
    title: "Research in Action",
    linkLabel: "View Project",
    projects: [
      {
        title: "AI Smuggling Study",
        description:
          "Investigating undisclosed AI use in academic settings and the psychology behind concealment behaviors.",
        status: "Ongoing" as const,
        link: "#action",
      },
      {
        title: "Vibe Coding Studio",
        description:
          "An experimental environment exploring how students learn programming concepts through AI-assisted creative coding.",
        status: "Pilot" as const,
        link: "#action",
      },
      {
        title: "Deepfake Literacy Initiative",
        description:
          "Building critical media literacy frameworks for identifying and analyzing AI-generated synthetic media.",
        status: "Ongoing" as const,
        link: "#action",
      },
      {
        title: "Low-Resource AI Initiative",
        description:
          "Developing accessible, open-source AI tools for educational contexts with limited computational resources.",
        status: "Building" as const,
        link: "#action",
      },
    ],
  },

  publications: {
    title: "Recent Publications & Outputs",
    items: [
      {
        title: "The Hidden Curriculum of AI: Smuggling, Agency, and Epistemic Trust",
        venue: "Journal of Educational Technology & Society, 2025",
        description:
          "Exploring how undisclosed AI use reveals tensions between student agency and institutional trust.",
      },
      {
        title: "Deepfake Literacy as Critical Pedagogy: A Framework for Media Education",
        venue: "Computers & Education, 2025",
        description:
          "Proposing a multi-layered approach to teaching synthetic media analysis in K-12 and higher education.",
      },
      {
        title: "Equitable AI Innovation in Under-Resourced Educational Contexts",
        venue: "International Journal of AI in Education, 2024",
        description:
          "Examining strategies for deploying AI tools in schools with limited infrastructure.",
      },
      {
        title: "Vibe Coding: Aesthetic Experience and Computational Thinking",
        venue: "ACM SIGCSE Proceedings, 2025",
        description:
          "Investigating the role of creative, affect-driven coding practices in introductory CS education.",
      },
    ],
    cta: { label: "View All Publications", href: "#publications" },
  },

  resources: {
    title: "Resources for Educators",
    description:
      "We translate research into practical, ethical AI integration frameworks for educators across contexts.",
    items: [
      { label: "AI Syllabus Statements", href: "#" },
      { label: "Deepfake Analysis Modules", href: "#" },
      { label: "AI Disclosure Framework", href: "#" },
      { label: "Open-Source Toolkits", href: "#" },
    ],
    cta: { label: "Explore Toolkit", href: "#" },
  },

  insights: {
    title: "Insights & Commentary",
    items: [
      {
        title: "The Psychology of AI Smuggling",
        excerpt:
          "Why do students hide their AI use, and what does it tell us about the learning environments we create?",
        tag: "Research Insight",
      },
      {
        title: "Epistemic Trust in Automated Classrooms",
        excerpt:
          "As AI mediates more educational interactions, how do learners decide what to trust?",
        tag: "Commentary",
      },
      {
        title: "Designing Ethical AI Assignments",
        excerpt:
          "Practical strategies for creating assignments that embrace AI while maintaining academic integrity.",
        tag: "Practice Guide",
      },
    ],
    cta: { label: "Read Insights", href: "#insights" },
    events: {
      title: "Upcoming Events",
      items: [
        { title: "Virtual Working Group Meetup", date: "TBD" },
        { title: "Research Showcase", date: "TBD" },
      ],
    },
  },

  ctaSection: {
    headline: "Join the Critical Innovation Network",
    subtext:
      "We collaborate with researchers, educators, graduate students, and institutions committed to human-centered AI in education.",
    buttons: [
      { label: "Join as Researcher", href: "#collaborate" },
      { label: "Partner With Us", href: "#collaborate" },
      { label: "Student Fellows", href: "#collaborate" },
    ],
  },

  footer: {
    columns: [
      {
        items: [
          { label: "About", href: "#about" },
          { label: "Research", href: "#research" },
          { label: "Projects", href: "#action" },
          { label: "Publications", href: "#publications" },
        ],
      },
      {
        items: [
          { label: "Collaborate", href: "#collaborate" },
          { label: "Events", href: "#insights" },
          { label: "Blog", href: "#insights" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        items: [
          { label: "Ethics & Transparency", href: "#" },
          { label: "Privacy Policy", href: "#" },
          { label: "AI Usage Disclosure", href: "#" },
        ],
      },
    ],
    bottomLine:
      "\u00A9 2026 Critical Innovation & AI Pedagogy \u2014 Human-centered. Critically informed. Ethically transparent.",
  },
};
