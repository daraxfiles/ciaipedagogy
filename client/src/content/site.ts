export const siteConfig = {
  name: "Critical Innovation & AI Pedagogy",
  logoMark: "CI&AIP",

  nav: {
    items: [
      { label: "About", href: "/about" },
      { label: "Research", href: "/research" },
      { label: "Projects, Labs & Resources", href: "/projects" },
      { label: "Publications & Outputs", href: "/publications" },
      { label: "Insights & Events", href: "/insights" },
      { label: "Collaborate", href: "/collaborate" },
      { label: "Contact", href: "/contact" },
    ],
    cta: { label: "Join the Network", href: "/collaborate" },
  },

  hero: {
    headline: "Reimagining AI in Education Through Agency, Ethics, and Equity",
    subheadline:
      "Critical Innovation & AI Pedagogy is a research and practice working group examining how artificial intelligence reshapes teaching, learning, and knowledge production in sociotechnical educational systems.",
    supporting:
      "We study agency, epistemic trust, hidden AI practices, and equitable innovation in automated learning environments.",
    primaryCta: { label: "Explore Our Research", href: "/research" },
    secondaryCta: { label: "Collaborate With Us", href: "/collaborate" },
    circles: [
      "Agency & Judgment",
      "Critical AI Literacy",
      "Equitable Innovation",
    ],
  },

  about: {
    title: "About",
    mission: {
      title: "Mission & Vision",
      text: "Our mission is to advance critical, human-centered scholarship on artificial intelligence in education. We envision a future where AI augments\u2014not replaces\u2014human agency, where learners and educators are empowered to navigate AI systems with critical awareness, and where innovation in learning technology serves equity rather than efficiency alone.",
      vision: "We envision educational ecosystems where AI is transparent, accountable, and designed with the communities it serves.",
    },
    whyCritical: {
      title: "Why Critical Innovation?",
      text: "Most conversations about AI in education center on adoption speed, productivity gains, and automation. We take a different approach. Critical Innovation asks: Who benefits? Who is excluded? What assumptions are embedded in the systems we build? By grounding our work in critical theory, media literacy, and learning sciences, we ensure innovation serves justice\u2014not just efficiency.",
      points: [
        "Centering equity in every design decision",
        "Questioning hidden assumptions in AI systems",
        "Prioritizing human agency over automation",
        "Building transparent, accountable tools",
      ],
    },
    approach: {
      title: "Our Approach",
      text: "We combine rigorous empirical research with participatory design, community engagement, and open scholarship. Our methods span qualitative inquiry, design-based research, computational analysis, and critical discourse analysis. We believe the best research is done with communities, not on them.",
      methods: [
        "Design-Based Research",
        "Critical Discourse Analysis",
        "Participatory Design",
        "Mixed-Methods Inquiry",
        "Community-Engaged Scholarship",
      ],
    },
    people: {
      title: "People",
      description: "Our team includes researchers, educators, graduate fellows, and community partners working across disciplines.",
      members: [
        { name: "Faculty Lead", role: "Principal Investigator", area: "AI in Education, Critical Pedagogy" },
        { name: "Research Director", role: "Co-Investigator", area: "Media Literacy, Synthetic Media" },
        { name: "Postdoctoral Fellow", role: "Research Associate", area: "Epistemic Trust, Learning Sciences" },
        { name: "Graduate Fellow", role: "Doctoral Researcher", area: "AI Smuggling, Student Agency" },
        { name: "Graduate Fellow", role: "Doctoral Researcher", area: "Deepfake Literacy, Youth Media" },
        { name: "Lab Coordinator", role: "Research Manager", area: "Open-Source AI, Low-Resource Contexts" },
      ],
    },
  },

  research: {
    title: "Research",
    overview: {
      title: "Research Overview",
      text: "Our research program examines how artificial intelligence reshapes teaching, learning, and knowledge production. We organize our work around two interconnected pillars that address the most pressing questions at the intersection of AI and education.",
      stats: [
        { label: "Active Studies", value: "8+" },
        { label: "Publications", value: "25+" },
        { label: "Collaborating Institutions", value: "12" },
        { label: "Graduate Researchers", value: "15" },
      ],
    },
    pillar1: {
      title: "Pillar I: Agency, Judgment & Psychology of AI Use",
      description: "We examine how learners and educators interpret, negotiate, and respond to AI systems in learning environments.",
      areas: [
        {
          title: "Epistemic Judgment",
          text: "How do learners evaluate the credibility, accuracy, and trustworthiness of AI-generated knowledge? We study the cognitive and social processes through which students make judgments about AI outputs in academic contexts.",
        },
        {
          title: "AI Smuggling Research",
          text: "Why do students conceal their AI use? Our flagship study investigates the hidden practices of AI use in academic settings\u2014what we call \u2018AI Smuggling\u2019\u2014and what these behaviors reveal about institutional trust, academic identity, and the design of learning environments.",
        },
        {
          title: "Trust & Legitimacy",
          text: "We examine how trust in AI systems is formed, maintained, and broken in educational contexts. This includes studying how educators and students negotiate the legitimacy of AI-assisted work and the role of institutional policies.",
        },
        {
          title: "Identity & Algorithmic Learning",
          text: "How do algorithmic systems shape learner identity? We investigate how recommendation engines, adaptive platforms, and AI tutors influence how students see themselves as learners and knowledge producers.",
        },
      ],
    },
    pillar2: {
      title: "Pillar II: Critical AI & Media Literacy",
      description: "We investigate how learners critically analyze and respond to AI-generated media, including synthetic video, audio, and images.",
      areas: [
        {
          title: "Youth & Generative AI Interpretation",
          text: "How do young people interpret, evaluate, and respond to generative AI content in their daily lives? We study how youth make meaning of AI-generated text, images, and video across informal and formal learning contexts.",
        },
        {
          title: "Deepfake & Synthetic Media Pedagogy",
          text: "We develop pedagogical frameworks for teaching students to critically analyze synthetic media. This includes detection skills, ethical reasoning about creation and distribution, and understanding the sociopolitical implications of deepfake technology.",
        },
        {
          title: "Creation-Based Counter-Misinformation",
          text: "Rather than teaching only detection, we explore how creating synthetic media can deepen students\u2019 understanding of misinformation dynamics and build more resilient critical thinking skills.",
        },
        {
          title: "AI Authorship, Attribution & Low-Resource AI Literacy",
          text: "Who is the author when AI writes? We investigate questions of attribution, intellectual property, and academic integrity in the age of generative AI, with special attention to contexts where access to AI tools is uneven.",
        },
      ],
    },
  },

  projects: {
    title: "Projects, Labs & Resources",
    activeProjects: {
      title: "Active Projects",
      items: [
        {
          title: "AI Smuggling Study",
          description: "Investigating undisclosed AI use in academic settings and the psychology behind concealment behaviors. A multi-institutional qualitative study exploring how students navigate AI policies and academic integrity.",
          status: "Ongoing" as const,
        },
        {
          title: "Epistemic Trust Project",
          description: "A longitudinal study examining how students develop, maintain, and revise trust in AI-generated information across different academic disciplines and learning contexts.",
          status: "Ongoing" as const,
        },
        {
          title: "Vibe Coding Studio",
          description: "An experimental learning environment exploring how students learn programming through AI-assisted creative coding, emphasizing aesthetic experience and computational thinking.",
          status: "Pilot" as const,
        },
        {
          title: "Deepfake Literacy Initiative",
          description: "Building critical media literacy frameworks for identifying and analyzing AI-generated synthetic media in K-12 and higher education settings.",
          status: "Ongoing" as const,
        },
        {
          title: "Low-Bandwidth AI Initiative",
          description: "Developing accessible, open-source AI tools for educational contexts with limited computational resources and internet connectivity.",
          status: "Building" as const,
        },
      ],
    },
    researchLab: {
      title: "Research Lab",
      description: "The Critical Innovation Lab brings together graduate and undergraduate researchers working at the intersection of AI, education, and social justice.",
      items: [
        {
          title: "Graduate Fellows",
          text: "Doctoral and master\u2019s students conducting original research on AI in education. Fellows receive mentorship, funding support, and access to shared datasets and tools.",
        },
        {
          title: "Undergraduate Researchers",
          text: "Undergraduate students contribute to ongoing projects through data collection, literature reviews, and pilot studies. Our program emphasizes mentored research experience.",
        },
        {
          title: "How to Apply",
          text: "We accept applications on a rolling basis. Prospective fellows should demonstrate interest in critical approaches to educational technology and a commitment to equity-centered research.",
        },
      ],
    },
    educatorToolkit: {
      title: "Educator Toolkit",
      description: "Practical resources for integrating AI thoughtfully and ethically into teaching practice.",
      items: [
        { title: "AI Syllabus Statements", text: "Model language for syllabi addressing AI use, expectations, and academic integrity in the age of generative AI." },
        { title: "Disclosure Frameworks", text: "Structured approaches for students and educators to transparently disclose how and when AI tools were used in academic work." },
        { title: "Deepfake Analysis Modules", text: "Ready-to-use lesson plans and activities for teaching students to critically analyze synthetic media." },
        { title: "Ethical Reflection Prompts", text: "Discussion starters and journaling prompts to help students reflect on the ethical dimensions of AI use in learning." },
      ],
    },
    openSourceTools: {
      title: "Open-Source AI Tools",
      text: "We build and maintain open-source tools designed for educational contexts. All tools are free, transparent, and designed to work in low-resource environments.",
    },
    curriculumCaseStudies: {
      title: "Curriculum Case Studies",
      text: "Real-world examples of how educators have integrated critical AI literacy into their courses. Each case study includes learning objectives, activities, assessment strategies, and reflections.",
    },
  },

  publications: {
    title: "Publications & Outputs",
    categories: [
      {
        title: "Peer-Reviewed Articles",
        items: [
          { title: "The Hidden Curriculum of AI: Smuggling, Agency, and Epistemic Trust", venue: "Journal of Educational Technology & Society, 2025", description: "Exploring how undisclosed AI use reveals tensions between student agency and institutional trust." },
          { title: "Deepfake Literacy as Critical Pedagogy: A Framework for Media Education", venue: "Computers & Education, 2025", description: "Proposing a multi-layered approach to teaching synthetic media analysis in K-12 and higher education." },
          { title: "Equitable AI Innovation in Under-Resourced Educational Contexts", venue: "International Journal of AI in Education, 2024", description: "Examining strategies for deploying AI tools in schools with limited infrastructure." },
        ],
      },
      {
        title: "Conference Presentations",
        items: [
          { title: "AI Smuggling: What Hidden Practices Reveal About Learning", venue: "AERA Annual Meeting, 2025", description: "Keynote presentation on the AI Smuggling framework and preliminary findings." },
          { title: "Vibe Coding: Aesthetic Experience in CS Education", venue: "ACM SIGCSE, 2025", description: "Presenting the Vibe Coding Studio design and early pilot results." },
        ],
      },
      {
        title: "Working Papers",
        items: [
          { title: "Toward a Critical Framework for AI Literacy Assessment", venue: "Working Paper Series, 2025", description: "Proposing assessment methodologies that capture critical engagement rather than just technical proficiency." },
          { title: "Low-Resource AI: Design Principles for Equitable Innovation", venue: "Working Paper Series, 2024", description: "Design principles for building AI tools that work in bandwidth-constrained educational environments." },
        ],
      },
      {
        title: "Policy Briefs",
        items: [
          { title: "AI in the Classroom: Recommendations for Institutional Policy", venue: "Policy Brief, 2025", description: "Evidence-based recommendations for university AI policies that balance innovation with integrity." },
        ],
      },
      {
        title: "Media & Public Scholarship",
        items: [
          { title: "Why Students Hide Their AI Use\u2014And What We Can Do About It", venue: "The Conversation, 2025", description: "A public-facing essay on the AI Smuggling phenomenon and implications for educators." },
          { title: "Teaching in the Age of Deepfakes", venue: "Inside Higher Ed, 2024", description: "An opinion piece on the urgency of synthetic media literacy in higher education." },
        ],
      },
    ],
  },

  insights: {
    title: "Insights & Events",
    categories: [
      {
        title: "Essays",
        items: [
          { title: "The Psychology of AI Smuggling", excerpt: "Why do students hide their AI use, and what does it tell us about the learning environments we create?", tag: "Essay" },
          { title: "Designing Ethical AI Assignments", excerpt: "Practical strategies for creating assignments that embrace AI while maintaining academic integrity.", tag: "Essay" },
        ],
      },
      {
        title: "Research Commentary",
        items: [
          { title: "Epistemic Trust in Automated Classrooms", excerpt: "As AI mediates more educational interactions, how do learners decide what to trust?", tag: "Commentary" },
          { title: "The Equity Gap in AI Education", excerpt: "Why access to AI tools is not the same as access to AI literacy.", tag: "Commentary" },
        ],
      },
      {
        title: "Field Reflections",
        items: [
          { title: "Notes from the Vibe Coding Studio", excerpt: "Observations from our pilot program on creative, affect-driven coding practices.", tag: "Reflection" },
          { title: "What Students Told Us About AI", excerpt: "Surprising findings from our focus groups on student perceptions of AI in learning.", tag: "Reflection" },
        ],
      },
    ],
    upcomingEvents: {
      title: "Upcoming Events",
      items: [
        { title: "Virtual Working Group Meetup", date: "TBD", description: "Monthly gathering for network members to share works-in-progress and discuss emerging research." },
        { title: "Research Showcase", date: "TBD", description: "Annual event featuring presentations from graduate fellows and lab researchers." },
        { title: "Critical AI Pedagogy Workshop", date: "TBD", description: "Hands-on workshop for educators on integrating critical AI literacy into their teaching." },
      ],
    },
    eventArchive: {
      title: "Event Archive",
      items: [
        { title: "Fall 2025 Research Symposium", date: "November 2025", description: "Featured presentations on AI Smuggling findings and Deepfake Literacy curriculum." },
        { title: "Summer 2025 Educator Institute", date: "June 2025", description: "Week-long intensive on ethical AI integration for K-12 and higher education faculty." },
      ],
    },
  },

  collaborate: {
    title: "Collaborate",
    headline: "Join the Critical Innovation Network",
    subtext: "We collaborate with researchers, educators, graduate students, and institutions committed to human-centered AI in education.",
    categories: [
      {
        title: "Join as Researcher",
        text: "We welcome researchers from education, computer science, psychology, media studies, and related fields. Collaborators contribute to ongoing studies, co-author publications, and participate in our working group meetings.",
        points: ["Access to shared datasets and methodologies", "Co-authorship opportunities", "Regular working group sessions", "Conference presentation support"],
      },
      {
        title: "Educator Partnerships",
        text: "We partner with educators at all levels to co-design AI integration strategies, test curriculum materials, and conduct classroom-based research. Our partnerships are collaborative and equity-centered.",
        points: ["Curriculum co-design support", "Classroom research partnerships", "Professional development resources", "Access to our Educator Toolkit"],
      },
      {
        title: "Student Fellows Application",
        text: "Graduate and undergraduate students can apply to join our research lab as fellows. Fellows work on active research projects, receive mentorship, and develop their own research agendas.",
        points: ["Mentored research experience", "Funding and conference travel support", "Publication opportunities", "Community of practice"],
      },
      {
        title: "Funding & Partnerships",
        text: "We seek partnerships with foundations, institutions, and organizations committed to equitable AI in education. Our work is supported by a commitment to transparency and open scholarship.",
        points: ["Grant collaborations", "Institutional partnerships", "Community-based research", "Open-access publication commitment"],
      },
    ],
  },

  contact: {
    title: "Contact",
    description: "We\u2019d love to hear from you. Whether you\u2019re a researcher, educator, journalist, or student, reach out through the channels below.",
    categories: [
      {
        title: "General Inquiry",
        text: "For general questions about our research, collaboration opportunities, or resources.",
        email: "info@criticalinnovation.org",
      },
      {
        title: "Media Inquiries",
        text: "For press coverage, interviews, or public commentary requests related to our research.",
        email: "media@criticalinnovation.org",
      },
      {
        title: "Newsletter Signup",
        text: "Stay informed about our latest research, publications, events, and opportunities. We send a monthly digest with the most important updates from the Critical Innovation network.",
      },
    ],
  },

  footer: {
    columns: [
      {
        items: [
          { label: "About", href: "/about" },
          { label: "Research", href: "/research" },
          { label: "Projects", href: "/projects" },
          { label: "Publications", href: "/publications" },
        ],
      },
      {
        items: [
          { label: "Collaborate", href: "/collaborate" },
          { label: "Events", href: "/insights" },
          { label: "Insights", href: "/insights" },
          { label: "Contact", href: "/contact" },
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
