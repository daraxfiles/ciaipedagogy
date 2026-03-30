export const siteConfig = {
  name: "Critical Innovation & AI Pedagogy",
  logoMark: "CI&AIP",

  nav: {
    items: [
      { label: "About", href: "/about" },
      { label: "Research", href: "/research" },
      { label: "Projects", href: "/projects" },
      { label: "Toolkit", href: "/toolkit" },
      { label: "People", href: "/people" },
      { label: "Events", href: "/events" },
      { label: "Collaborate", href: "/collaborate" },
    ],
    cta: { label: "Join the Network", href: "/register" },
  },

  hero: {
    headline: "Reimagining AI in Education Through Agency, Ethics, and Equity",
    subheadline:
      "A research and practice working group examining how artificial intelligence reshapes teaching, learning, and knowledge production in sociotechnical educational systems.",
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
      text: "Our mission is to advance critical, human-centered scholarship on artificial intelligence in education. We envision a future where AI augments, not replaces, human agency, where learners and educators are empowered to navigate AI systems with critical awareness, and where innovation in learning technology serves equity rather than efficiency alone.",
      vision: "We envision educational ecosystems where AI is transparent, accountable, and designed with the communities it serves.",
    },
    whyCritical: {
      title: "Why Critical Innovation?",
      text: "Most conversations about AI in education center on adoption speed, productivity gains, and automation. We take a different approach, asking who benefits, who is excluded, and what assumptions are embedded in the systems we build.",
      points: [
        { label: "Equity", text: "Centering equity in every design decision" },
        { label: "Agency", text: "Prioritizing human agency over automation" },
        { label: "Trust", text: "Questioning hidden assumptions in AI systems" },
        { label: "Engagement", text: "Building transparent, accountable tools" },
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
  },

  research: {
    title: "Research",
    overview: {
      title: "Research Overview",
      text: "Our research program examines how artificial intelligence reshapes teaching, learning, and knowledge production. We organize our work around two interconnected pillars that address the most pressing questions at the intersection of AI and education.",
      stats: [
        { label: "Active Studies", value: "4" },
        { label: "Publications", value: "0" },
        { label: "Collaborating Institutions", value: "2" },
        { label: "Researchers", value: "10" },
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
          text: "Why do students conceal their AI use? Our flagship study investigates the hidden practices of AI use in academic settings, what we call 'AI Smuggling,' and what these behaviors reveal about institutional trust, academic identity, and the design of learning environments.",
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
          text: "Rather than teaching only detection, we explore how creating synthetic media can deepen students' understanding of misinformation dynamics and build more resilient critical thinking skills.",
        },
        {
          title: "AI Authorship, Attribution & Low-Resource AI Literacy",
          text: "Who is the author when AI writes? We investigate questions of attribution, intellectual property, and academic integrity in the age of generative AI, with special attention to contexts where access to AI tools is uneven.",
        },
      ],
    },
  },

  projects: {
    title: "Projects & Research Initiatives",
    intro: "The Critical Innovation & AI Pedagogy network develops research studies, teaching experiments, and open tools that explore how AI reshapes learning, knowledge production, and educational design.",
    featured: [
      {
        title: "AI Smuggling & Legitimacy Study",
        description: "A qualitative study investigating why students conceal their AI use in academic settings, examining the psychology of concealment and institutional trust dynamics.",
        focus: "Agency & Epistemic Trust",
        type: "Empirical Study",
        status: "Ongoing" as const,
        pillar: "Pillar I",
      },
      {
        title: "Trust and Epistemic Judgment in AI Use",
        description: "A longitudinal investigation into how learners evaluate the credibility and accuracy of AI-generated information across disciplines.",
        focus: "Epistemic Trust",
        type: "Longitudinal Study",
        status: "Ongoing" as const,
        pillar: "Pillar I",
      },
      {
        title: "Youth Interpreting Generative AI",
        description: "How do young people make meaning of AI-generated text, images, and video? A study of interpretive frameworks across formal and informal learning contexts.",
        focus: "Youth & Generative AI",
        type: "Design-Based Research",
        status: "Ongoing" as const,
        pillar: "Pillar II",
      },
      {
        title: "Deepfake Literacy Pedagogy",
        description: "Developing and testing pedagogical frameworks for teaching students to critically analyze synthetic media in K-12 and higher education settings.",
        focus: "Synthetic Media & Critical Literacy",
        type: "Curriculum Design",
        status: "Pilot" as const,
        pillar: "Pillar II",
      },
      {
        title: "Vibe Coding for Education",
        description: "An experimental learning environment exploring how students learn programming through AI-assisted creative coding, emphasizing aesthetic experience and computational thinking.",
        focus: "Creative Computing & CS Education",
        type: "Experimental Studio",
        status: "Pilot" as const,
        pillar: "Pillar III",
      },
      {
        title: "Open-Source AI Tools for Schools",
        description: "Designing, building, and maintaining open-source AI tools engineered to function in low-bandwidth environments, with a focus on transparency and community ownership.",
        focus: "Open-Source Development",
        type: "Tool Development",
        status: "Building" as const,
        pillar: "Pillar IV",
      },
    ],
  },

  toolkit: {
    title: "Educator Toolkit",
    intro: "Practical, open, and critically informed resources for educators integrating AI thoughtfully into teaching practice. Everything here is free to use, adapt, and share.",
    openTools: [
      {
        title: "AI Policy Generator",
        description: "Generate customizable AI use policies for your course or institution. Covers expectations, academic integrity, and disclosure requirements across disciplines and contexts.",
        status: "Available",
        link: "/policy-builder",
      },
      {
        title: "Low-Bandwidth AI Toolkit",
        description: "Open-source tools and resources designed for educational settings with limited computational resources or internet connectivity. Offline-compatible where possible.",
        status: "In Development",
        link: "#",
      },
    ],
    resources: [
      {
        title: "Deepfake Analysis Modules",
        description: "Ready-to-use lesson plans and activities for teaching students to critically analyze synthetic media. Suitable for high school and university settings.",
        type: "Lesson Plans",
      },
      {
        title: "Ethical Reflection Prompts",
        description: "Discussion starters and journaling prompts to help students reflect on the ethical dimensions of AI use in learning and creative work.",
        type: "Discussion Guides",
      },
      {
        title: "AI Literacy Assessment Rubrics",
        description: "Assessment frameworks that capture critical engagement with AI systems rather than just technical proficiency. Adaptable to multiple course formats.",
        type: "Assessment Tools",
      },
      {
        title: "Generative AI in the Classroom Guide",
        description: "A comprehensive guide for educators navigating the opportunities and risks of generative AI tools in teaching practice. Updated regularly.",
        type: "Reference Guide",
      },
    ],
    curriculum: [
      {
        title: "Critical AI Literacy Curriculum",
        description: "A modular curriculum framework for teaching critical analysis of AI systems across grade levels. Includes learning objectives, activities, assessment strategies, and reflections.",
        audience: "K-12 & Higher Education",
        status: "Available",
      },
      {
        title: "Vibe Coding Studio Curriculum",
        description: "A creative computing curriculum emphasizing aesthetic experience, AI-assisted coding, and computational thinking. Designed for learners with no prior programming experience.",
        audience: "Secondary & Post-Secondary",
        status: "Pilot",
      },
    ],
    experiments: [
      {
        title: "Participatory AI Design Lab",
        description: "A classroom experiment where students co-design AI tools for their own learning contexts. Combines design thinking, critical theory, and hands-on prototyping.",
        setting: "Higher Education",
      },
      {
        title: "Deepfake Creator Workshop",
        description: "Students create deepfake media as a way to understand synthetic media production, evaluate ethical implications, and develop more robust critical literacy skills.",
        setting: "Workshop / Studio",
      },
    ],
  },

  people: {
    title: "People",
    intro: "CI&AIP is a network of researchers, educators, graduate students, and community partners working at the intersection of AI, pedagogy, and equity. We are organized around shared commitments rather than institutional hierarchy.",
    categories: [
      {
        label: "Educators",
        description: "Faculty and teaching professionals who bring critical AI pedagogy into classrooms and curricula across disciplines.",
        members: [
          { name: "Faculty Lead", focus: "AI in Education, Critical Pedagogy", affiliation: "" },
          { name: "Teaching Fellow", focus: "Instructional Design, Generative AI", affiliation: "" },
        ],
      },
      {
        label: "Researchers",
        description: "Scholars advancing empirical and theoretical work on AI, media literacy, and learning sciences.",
        members: [
          { name: "Research Director", focus: "Media Literacy, Synthetic Media", affiliation: "" },
          { name: "Postdoctoral Fellow", focus: "Epistemic Trust, Learning Sciences", affiliation: "" },
        ],
      },
      {
        label: "Students",
        description: "Students conducting original research as part of the network. Fellows lead studies, present at conferences, and co-author publications.",
        members: [
          { name: "Graduate Fellow", focus: "AI Smuggling, Student Agency", affiliation: "" },
          { name: "Graduate Fellow", focus: "Deepfake Literacy, Youth Media", affiliation: "" },
          { name: "Lab Coordinator", focus: "Open-Source AI, Low-Resource Contexts", affiliation: "" },
        ],
      },
      {
        label: "Community Partners",
        description: "Organizations and practitioners collaborating on community-engaged research, curriculum development, and equity-centered design.",
        members: [
          { name: "K-12 Educator Partner", focus: "Classroom-Based Research, Curriculum", affiliation: "School District Partner" },
          { name: "Community Collaborator", focus: "Low-Access AI Literacy", affiliation: "Community Organization" },
        ],
      },
    ],
  },

  events: {
    title: "Events & Insights",
    intro: "Updates from the Critical Innovation network: upcoming events, field reflections, research commentary, and essays on AI and education.",
    insights: [
      { title: "The Psychology of AI Smuggling", excerpt: "Why do students hide their AI use, and what does it tell us about the learning environments we create?", tag: "Essay", date: "February 2026" },
      { title: "Designing Ethical AI Assignments", excerpt: "Practical strategies for creating assignments that embrace AI while maintaining academic integrity.", tag: "Essay", date: "January 2026" },
      { title: "Epistemic Trust in Automated Classrooms", excerpt: "As AI mediates more educational interactions, how do learners decide what to trust?", tag: "Commentary", date: "December 2025" },
      { title: "The Equity Gap in AI Education", excerpt: "Why access to AI tools is not the same as access to AI literacy.", tag: "Commentary", date: "November 2025" },
      { title: "Notes from the Vibe Coding Studio", excerpt: "Observations from our pilot program on creative, affect-driven coding practices.", tag: "Reflection", date: "October 2025" },
      { title: "What Students Told Us About AI", excerpt: "Surprising findings from our focus groups on student perceptions of AI in learning.", tag: "Reflection", date: "September 2025" },
    ],
    upcoming: [
      { title: "Virtual Working Group Meetup", date: "TBD, Spring 2026", description: "Monthly gathering for network members to share works-in-progress and discuss emerging research." },
      { title: "Critical AI Pedagogy Workshop", date: "TBD, Spring 2026", description: "Hands-on workshop for educators on integrating critical AI literacy into their teaching." },
      { title: "Research Showcase", date: "TBD, Fall 2026", description: "Annual event featuring presentations from graduate fellows and lab researchers." },
    ],
    archive: [
      { title: "Fall 2025 Research Symposium", date: "November 2025", description: "Featured presentations on AI Smuggling findings and Deepfake Literacy curriculum." },
      { title: "Summer 2025 Educator Institute", date: "June 2025", description: "Week-long intensive on ethical AI integration for K-12 and higher education faculty." },
      { title: "Spring 2025 Working Group Launch", date: "March 2025", description: "Inaugural gathering of the CI&AIP network. Established research agenda and collaboration structures." },
    ],
  },

  publications: {
    title: "Scholarly Output",
    subtitle: "Publications & Outputs",
    description: "Peer-reviewed research, conference presentations, working papers, and public scholarship from the Critical Innovation network.",
    comingSoon: "Our scholarly outputs are currently being developed and curated. Publications, presentations, and working papers will be available here soon.",
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
    description: "We'd love to hear from you. Whether you're a researcher, educator, journalist, or student, reach out through the channels below.",
    categories: [
      {
        title: "General Inquiry",
        text: "For general questions about our research, collaboration opportunities, or resources.",
        email: "info@ciaipedagogy.org",
      },
      {
        title: "Media Inquiries",
        text: "For press coverage, interviews, or public commentary requests related to our research.",
        email: "media@ciaipedagogy.org",
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
        label: "Pages",
        items: [
          { label: "About", href: "/about" },
          { label: "Research", href: "/research" },
          { label: "Projects", href: "/projects" },
          { label: "Toolkit", href: "/toolkit" },
        ],
      },
      {
        label: "Network",
        items: [
          { label: "People", href: "/people" },
          { label: "Events", href: "/events" },
          { label: "Collaborate", href: "/collaborate" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        label: "Policies",
        items: [
          { label: "Ethics & Transparency", href: "/ethics" },
          { label: "Privacy Policy", href: "/privacy" },
        ],
      },
    ],
    bottomLine:
      "\u00A9 2026 Critical Innovation & AI Pedagogy. Human-centered. Critically informed. Ethically transparent.",
  },
};

export const studentResearch = {
  title: "Student Research & Innovation",
  subtitle: "Students engage in research through design, inquiry, and collaboration.",
  cards: [
    {
      tag: "Independent",
      title: "Design Your Own Research",
      description:
        "Develop your own research idea and pursue it with structured guidance and mentorship. Students identify meaningful problems, design studies or AI-powered tools, and receive support throughout the research process—from concept to dissemination.",
      bullets: [
        "Define a research question or design problem",
        "Develop and refine your idea with faculty guidance",
        "Build prototypes or design studies using AI tools",
        "Analyze findings and present or publish your work",
      ],
    },
    {
      tag: "Collaboration",
      title: "Collaborate on Active Research",
      description:
        "Join an existing research project within the group and contribute to ongoing studies. Students work alongside faculty and graduate researchers to explore real-world questions related to AI, learning, and innovation.",
      bullets: [
        "Participate in data collection (e.g., surveys, interviews, artifacts)",
        "Support study implementation and coordination",
        "Engage in collaborative research discussions",
        "Contribute to project development and refinement",
      ],
    },
    {
      tag: "Skills",
      title: "Build Research & Innovation Skills",
      description:
        "Gain hands-on experience in the full research process. Students develop practical skills in data analysis, AI-assisted workflows, and scholarly writing while contributing to meaningful research outputs.",
      bullets: [
        "Clean, organize, and analyze data",
        "Work with AI tools for coding, interpretation, or prototyping",
        "Contribute to manuscript writing and publications",
        "Present research findings in academic or public formats",
      ],
    },
  ],
};
