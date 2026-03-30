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
      { label: "Events & Insights", href: "/events" },
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
      {
        slug: "psychology-ai-smuggling",
        title: "The Psychology of AI Smuggling",
        excerpt: "Why do students hide their AI use, and what does it tell us about the learning environments we create?",
        tag: "Essay",
        date: "February 2026",
        body: [
          "When we began asking students directly about their AI use in academic work, we expected some evasiveness. What we did not expect was the richness and coherence of the concealment strategies they described. Students were not simply hiding AI use out of laziness or dishonesty. They were navigating a complex set of social, institutional, and epistemic pressures that made concealment feel not only rational but necessary.",
          "We call this phenomenon AI Smuggling: the practice of integrating AI assistance into academic work while deliberately obscuring its presence. It is not a fringe behavior. In our preliminary surveys, a majority of students reported at least one instance of undisclosed AI use in the past semester. Many described systematic practices—paraphrasing AI outputs, splitting tasks across multiple tools, or framing AI-generated ideas as their own to avoid scrutiny.",
          "What drives this behavior? Our qualitative interviews point to three interlocking dynamics. First, institutional ambiguity: most students received conflicting or vague guidance about what AI use is permitted. Without clear norms, concealment becomes a pragmatic default. Second, identity threat: students reported that acknowledging AI use felt like admitting intellectual inadequacy, particularly in high-stakes contexts. Third, distrust of enforcement: many students believed that disclosing AI use would be penalized regardless of context, even when the use was legitimate or transformative.",
          "The implications for educators are significant. If students are hiding AI use at scale, then policies designed to prohibit or regulate AI are not working—they are simply driving the behavior underground. Worse, they may be teaching students that the appearance of independent thinking matters more than honest engagement with new tools.",
          "What would it look like to design learning environments where students do not feel the need to smuggle? We believe it starts with transparency: about what AI can and cannot do, about how instructors are thinking about AI-assisted work, and about the genuine intellectual skills that AI use does and does not replace. The goal is not to eliminate all boundaries around AI, but to create conditions where students can engage with it honestly.",
        ],
      },
      {
        slug: "designing-ethical-ai-assignments",
        title: "Designing Ethical AI Assignments",
        excerpt: "Practical strategies for creating assignments that embrace AI while maintaining academic integrity.",
        tag: "Essay",
        date: "January 2026",
        body: [
          "The question educators most often ask us is not whether to allow AI, but how. How do you design an assignment that is intellectually meaningful when students have access to tools that can generate competent first drafts in seconds? How do you assess thinking rather than output? How do you ensure that AI use enhances learning rather than circumventing it?",
          "There is no single answer, but there are design principles that consistently point in the right direction. The most effective AI-integrated assignments we have observed share several features: they require students to make visible the process of their thinking, not just its products; they build in moments of human judgment that AI cannot replicate; and they treat AI as a collaborator to be interrogated, not a solution to be accepted.",
          "One practical strategy is what we call the Rationale Requirement: students must accompany any AI-assisted work with a short written account of how they used AI, what they changed, and why. This does not penalize AI use—it makes the cognitive work visible and assessable. Students who engaged seriously with AI tools and reflected on their choices consistently produced richer rationale statements than those who either avoided AI entirely or used it uncritically.",
          "Another approach is to design for revision. Assignments that require multiple drafts, peer review, and documented iteration are harder to shortcut with AI, because the learning is embedded in the process, not the final product. AI can produce a draft, but it cannot participate in the genuine intellectual back-and-forth of revision.",
          "Finally, we encourage educators to be explicit about what they are actually trying to assess. If the goal is disciplinary thinking, then the assignment should expose that thinking. If the goal is communication, then AI assistance with grammar or structure may be entirely appropriate. Ethical AI assignment design begins with clarity about what learning looks like in your context.",
        ],
      },
      {
        slug: "epistemic-trust-automated-classrooms",
        title: "Epistemic Trust in Automated Classrooms",
        excerpt: "As AI mediates more educational interactions, how do learners decide what to trust?",
        tag: "Commentary",
        date: "December 2025",
        body: [
          "Trust is foundational to learning. When a student accepts a claim as true, follows an explanation, or treats feedback as credible, they are making an epistemic judgment—deciding that a source is reliable enough to anchor their understanding. In traditional educational settings, these judgments are shaped by social cues: the authority of the instructor, the peer dynamics of the classroom, the institutional legitimacy of the text.",
          "AI changes these dynamics in ways we are only beginning to understand. When a student asks an AI tutor a question and receives a confident, fluent answer, what cues do they use to evaluate its reliability? Our preliminary research suggests that many students apply social trust heuristics to AI systems—treating fluency as competence, consistency as accuracy, and tone as sincerity. These heuristics, which are often useful in human interactions, are systematically misleading when applied to large language models.",
          "We have observed what we call epistemic capture: moments when a student's genuine uncertainty is resolved not by their own reasoning, but by deference to an AI system whose limitations they do not understand. This is not always problematic—appropriate reliance on reliable tools is part of sophisticated epistemic practice. But uncritical deference to AI, particularly in domains where the AI is prone to confident errors, represents a genuine educational risk.",
          "The challenge for educators is not to make students distrust AI, but to help them develop calibrated trust—a sense of when AI outputs warrant scrutiny, what kinds of errors AI systems are prone to, and how to verify claims that matter. This is a new form of information literacy, and it requires explicit instruction. We cannot assume students will figure it out on their own.",
        ],
      },
      {
        slug: "equity-gap-ai-education",
        title: "The Equity Gap in AI Education",
        excerpt: "Why access to AI tools is not the same as access to AI literacy.",
        tag: "Commentary",
        date: "November 2025",
        body: [
          "When AI tools became widely available to students, many observers expressed optimism about equity. For the first time, students without access to expensive tutors, writing coaches, or research assistants could access sophisticated cognitive support on demand. The playing field, it seemed, might finally be leveled.",
          "That optimism was not wrong, but it was incomplete. Access to a tool and the ability to use it effectively are not the same thing. Our research consistently shows that students from well-resourced educational backgrounds—those with strong reading skills, prior exposure to academic conventions, and experience receiving substantive feedback—are better positioned to use AI productively. They know what a good draft looks like. They can evaluate AI suggestions critically. They understand when to push back.",
          "Students who lack this background may receive AI outputs without the context to evaluate them. They may not know that an AI-generated argument is weak, that a citation is fabricated, or that a framing is subtly misleading. In these cases, AI access does not reduce the equity gap—it may amplify it, because students with more prior knowledge extract more value from the same tools.",
          "This is not an argument against expanding AI access. It is an argument for investing equally in the critical literacy skills that make that access meaningful. AI literacy education must be part of any serious equity agenda in education. Without it, the promise of democratic access to AI tools will remain unfulfilled.",
        ],
      },
      {
        slug: "notes-vibe-coding-studio",
        title: "Notes from the Vibe Coding Studio",
        excerpt: "Observations from our pilot program on creative, affect-driven coding practices.",
        tag: "Reflection",
        date: "October 2025",
        body: [
          "The Vibe Coding Studio began as a simple experiment: what would happen if we removed the emphasis on correctness from an introductory programming experience and replaced it with an emphasis on aesthetics and feeling? Instead of asking students to solve problems, we asked them to make things they found beautiful, strange, or interesting.",
          "The results surprised us. Students who had previously described themselves as non-coders or math-phobic became deeply engaged when the goal was creative expression rather than technical correctness. The presence of AI tools—which could help them move quickly from a vague aesthetic idea to working code—lowered the threshold of entry in ways that felt genuinely liberating rather than academically dubious.",
          "We observed what we have started calling vibe-driven iteration: students would run a piece of code, have an aesthetic reaction to its output, and use that reaction to guide their next prompt or edit. The feedback loop was affective before it was technical. This is, in many ways, how experienced creative coders work—but it is rarely how we teach beginners.",
          "There were also challenges. Some students struggled to translate vague aesthetic intentions into specific prompts. Others became frustrated when AI tools produced outputs that were technically correct but aesthetically wrong. A few students, once they found something they liked, were reluctant to touch it further—an understandable but limiting response to the fragility of creative work.",
          "We are continuing to develop the Vibe Coding Studio as a research context and a pedagogical model. Our working hypothesis is that affect-driven entry into programming can build a different kind of computational identity—one grounded in creative ownership rather than technical competence—and that this identity may be more durable and more equitable.",
        ],
      },
      {
        slug: "what-students-told-us-about-ai",
        title: "What Students Told Us About AI",
        excerpt: "Surprising findings from our focus groups on student perceptions of AI in learning.",
        tag: "Reflection",
        date: "September 2025",
        body: [
          "We spent the summer running focus groups with undergraduate and graduate students across three institutions, asking them about their experiences with AI in academic contexts. We came in with hypotheses. Most of them were wrong, or at least incomplete.",
          "We expected students to be primarily enthusiastic about AI as a productivity tool. Many were, but the more striking pattern was ambivalence. Students described AI as both useful and unsettling. They appreciated the speed it offered but worried about what it was doing to their thinking. Several students used the phrase 'I don't know if I'm getting better or worse' to describe their sense of their own development as writers and thinkers.",
          "We expected students in more demanding programs to be more skeptical of AI. The opposite was often true. Students in highly competitive environments reported the most strategic and extensive AI use—and the most anxiety about it. The pressure to perform created strong incentives to use every available tool, while the academic culture around them made that use feel shameful.",
          "We did not expect students to have such sophisticated critiques of AI limitations. Many students described developing personal heuristics for when to trust AI outputs: checking AI-generated citations, cross-referencing claims in unfamiliar domains, being suspicious of AI responses that felt too smooth or too confident. These practices were largely self-taught, often through hard experience.",
          "The clearest finding was also the most actionable: students wanted guidance. Not prohibition, and not uncritical enthusiasm—but honest, specific guidance about how to use AI well. They felt abandoned between institutional policies that prohibited AI use and a cultural environment that assumed it. That gap is where we are focusing our next phase of research.",
        ],
      },
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
