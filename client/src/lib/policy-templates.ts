export interface PolicySelections {
  purpose: string[];
  tools: string[];
  integrity: string[];
  privacy: string[];
  consequences: string[];
}

export const policyTemplates = {
  purpose: {
    'enhance-learning': 'Students may use AI tools to enhance their learning and understanding of course material.',
    'writing-assistance': 'AI tools may be used to assist with writing tasks including brainstorming, editing, and proofreading.',
    'research-aid': 'AI is permitted for research assistance, including finding sources and exploring topics.',
    'critical-thinking': 'AI may be used to develop critical thinking skills through guided questioning and analysis.',
    'skill-development': 'AI tools are encouraged for developing specific skills relevant to the course objectives.',
    'accessibility-support': 'AI tools are permitted to provide accessibility support for students with learning differences.',
    'collaborative-learning': 'AI may be used as a collaborative learning partner for discussion and exploration.',
    'no-ai': 'The use of AI tools is not permitted for any assignments in this course.',
    'limited-phases': 'AI use is permitted only during specific phases of assignments (e.g., brainstorming, initial research).',
    'final-work-only': 'AI assistance is prohibited for final submissions but allowed for drafts and preparation.'
  },
  tools: {
    'chatgpt': 'ChatGPT and similar language models are permitted',
    'grammarly': 'Grammarly and writing enhancement tools are allowed',
    'institutional': 'Only institution-approved AI platforms may be used',
    'instructor-approved': 'Students must receive explicit instructor approval before using any AI tool',
    'code-assistants': 'Programming AI assistants (GitHub Copilot, CodeWhisperer) are permitted',
    'translation-tools': 'AI translation tools are allowed for language learning purposes',
    'research-databases': 'AI-powered research and database tools are permitted',
    'creative-tools': 'AI creative tools (image, video, audio generation) are allowed',
    'citation-managers': 'AI-powered citation and reference management tools are permitted',
    'presentation-tools': 'AI presentation and visualization tools are allowed',
    'no-generative': 'Traditional AI tools are permitted but generative AI is prohibited',
    'open-source-only': 'Only open-source AI tools are permitted for transparency'
  },
  integrity: {
    'full-disclosure': 'Students must cite and fully disclose all AI assistance as they would any other source.',
    'plagiarism-unless-cited': 'Use of AI without proper citation constitutes plagiarism and academic misconduct.',
    'case-by-case': 'AI use appropriateness will be evaluated on a case-by-case basis by the instructor.',
    'detailed-explanation': 'Students must provide detailed explanations of how AI was used and their personal contribution to the work.',
    'process-documentation': 'Students must document their entire process including all AI interactions and iterations.',
    'human-verification': 'Students must demonstrate understanding and be able to explain all AI-assisted work.',
    'original-contribution': 'Students must make substantial original contributions beyond AI-generated content.',
    'collaborative-disclosure': 'AI use must be disclosed similarly to human collaboration and assistance.',
    'iterative-improvement': 'Students must show how they refined and improved upon AI-generated initial work.',
    'ethical-reflection': 'Students must reflect on the ethical implications of their AI use in their work.',
    'percentage-limits': 'AI contribution must not exceed a specified percentage of the total work (e.g., 30%).'
  },
  privacy: {
    'no-personal-data': 'Students must not input personal, sensitive, or confidential information into AI tools',
    'institutional-platforms': 'Only institution-approved platforms that meet data security standards may be used',
    'data-usage-awareness': 'Students must understand and acknowledge how AI tools use and store their input data',
    'protect-others-work': "Students must protect other students' work and intellectual property from AI tools",
    'anonymize-inputs': 'All inputs to AI tools must be anonymized and free of identifying information',
    'secure-platforms': 'Only AI platforms with end-to-end encryption and strong privacy policies may be used',
    'local-processing': 'Preference for AI tools that process data locally rather than in the cloud',
    'data-retention-limits': 'Use only AI tools with clear data retention and deletion policies',
    'consent-for-sharing': "Students must obtain consent before inputting others' work or ideas into AI tools",
    'institutional-accounts': 'Students must use institutional accounts for AI tools when available',
    'no-biometric-data': 'Biometric or physiological data must never be shared with AI tools'
  },
  consequences: {
    'grade-penalties': 'Violations will result in grade penalties for the assignment or course',
    'misconduct-report': 'Violations will be reported through formal academic misconduct proceedings',
    'resubmission-penalty': 'First violations may allow resubmission with grade penalty',
    'educational-conversation': 'First-time violations will result in educational discussion before formal consequences',
    'progressive-discipline': 'Consequences will escalate from warning to grade penalty to course failure',
    'portfolio-review': "Student's entire portfolio will be reviewed for additional AI policy violations",
    'integrity-seminar': 'Students must complete an academic integrity seminar before continuing',
    'peer-mediation': 'Violations may be addressed through peer mediation and learning circles',
    'assignment-redo': 'Students must redo assignments without AI assistance following violations',
    'reflection-paper': 'Students must write a reflection paper on ethical AI use and academic integrity',
    'community-service': 'Academic community service related to AI ethics education may be required',
    'course-withdrawal': 'Severe or repeated violations may result in required course withdrawal'
  }
} as const;

export const tooltips = {
  purpose: {
    'enhance-learning': 'Allows AI to supplement learning while maintaining student ownership of work',
    'writing-assistance': 'Permits AI assistance in writing tasks like brainstorming, editing, and proofreading',
    'research-aid': 'Research aid for finding sources, summarizing information, and exploring topics',
    'critical-thinking': 'Develops analytical skills through AI-guided questioning and exploration',
    'skill-development': 'Supports targeted skill building aligned with learning objectives',
    'accessibility-support': 'Provides accommodations for students with diverse learning needs',
    'collaborative-learning': 'Uses AI as a learning partner for discussion and idea development',
    'no-ai': 'Prohibits all AI use to ensure completely original student work',
    'limited-phases': 'Restricts AI to specific assignment stages while preserving core learning',
    'final-work-only': 'Maintains originality in final work while allowing AI for preparation'
  },
  tools: {
    'chatgpt': 'Popular language model for various academic tasks, requires citation',
    'grammarly': 'Writing enhancement tool for grammar, clarity, and style improvements',
    'institutional': 'Institutional tools that meet privacy and data security standards',
    'instructor-approved': 'Requires explicit instructor permission before using any AI tool',
    'code-assistants': 'Programming tools like GitHub Copilot for software development courses',
    'translation-tools': 'Language translation aids for multilingual learning contexts',
    'research-databases': 'AI-powered academic search and research assistance tools',
    'creative-tools': 'Multimedia AI for artistic and design-focused coursework',
    'citation-managers': 'Academic citation and reference formatting assistance',
    'presentation-tools': 'AI-assisted slideware and visualization creation',
    'no-generative': 'Allows traditional AI while restricting content generation',
    'open-source-only': 'Ensures transparency and auditability of AI tools used'
  },
  integrity: {
    'full-disclosure': 'Students must cite all AI assistance like any other source',
    'plagiarism-unless-cited': 'AI use is considered plagiarism unless properly documented and cited',
    'case-by-case': 'Instructor evaluates AI use appropriateness for each assignment',
    'detailed-explanation': 'Students must explain how AI was used and their contribution to the work',
    'process-documentation': 'Requires complete records of AI interactions and iterative improvements',
    'human-verification': 'Students must prove comprehension and ability to explain AI-assisted work',
    'original-contribution': 'Ensures substantial human input beyond AI-generated content',
    'collaborative-disclosure': 'Treats AI assistance similarly to human collaboration requirements',
    'iterative-improvement': 'Documents how students refined and enhanced AI outputs',
    'ethical-reflection': 'Promotes critical thinking about AI use implications',
    'percentage-limits': 'Quantifies acceptable level of AI contribution to assignments'
  },
  privacy: {
    'no-personal-data': 'Prevents exposure of sensitive personal information to external AI systems',
    'institutional-platforms': 'Use only platforms vetted by the institution for data security compliance',
    'data-usage-awareness': 'Students must understand how AI tools use and store their input data',
    'protect-others-work': "Protect other students' work and ideas from being shared with AI tools",
    'anonymize-inputs': 'Removes identifying information before AI processing',
    'secure-platforms': 'Prioritizes AI tools with strong encryption and privacy protections',
    'local-processing': "Prefers AI tools that don't transmit data to external servers",
    'data-retention-limits': 'Ensures AI tools delete data according to institutional policies',
    'consent-for-sharing': "Requires permission before inputting others' intellectual property",
    'institutional-accounts': 'Uses campus-managed AI accounts with enhanced privacy controls',
    'no-biometric-data': 'Prohibits sharing physiological or behavioral data with AI systems'
  },
  consequences: {
    'grade-penalties': 'Immediate grade reduction for the assignment or course',
    'misconduct-report': 'Formal academic misconduct proceedings through institutional channels',
    'resubmission-penalty': 'Opportunity to resubmit work with proper AI disclosure and grade penalty',
    'educational-conversation': 'Educational discussion before formal consequences for first-time violations',
    'progressive-discipline': 'Escalating consequences from warning to course failure',
    'portfolio-review': 'Comprehensive review of student work for additional violations',
    'integrity-seminar': 'Required education on academic integrity and AI ethics',
    'peer-mediation': 'Restorative justice approach through peer learning circles',
    'assignment-redo': 'Complete assignment without AI assistance following violations',
    'reflection-paper': 'Written reflection on AI ethics and academic integrity principles',
    'community-service': 'Educational service related to promoting AI ethics awareness',
    'course-withdrawal': 'Removal from course for severe or repeated violations'
  }
};

export function generatePolicy(selections: PolicySelections): string {
  let policy = `AI USE POLICY FOR [COURSE NAME]\nInstructor: [INSTRUCTOR NAME]\n\n`;

  if (selections.purpose.length > 0) {
    policy += `PURPOSE OF AI USE:\n`;
    selections.purpose.forEach(purpose => {
      policy += `• ${policyTemplates.purpose[purpose as keyof typeof policyTemplates.purpose]}\n`;
    });
    policy += '\n';
  }

  if (selections.tools.length > 0) {
    policy += `PERMITTED AI TOOLS:\n`;
    selections.tools.forEach(tool => {
      policy += `• ${policyTemplates.tools[tool as keyof typeof policyTemplates.tools]}\n`;
    });
    policy += '\n';
  }

  if (selections.integrity.length > 0) {
    policy += `ACADEMIC INTEGRITY REQUIREMENTS:\n`;
    selections.integrity.forEach(integrity => {
      policy += `• ${policyTemplates.integrity[integrity as keyof typeof policyTemplates.integrity]}\n`;
    });
    policy += '\n';
  }

  if (selections.privacy.length > 0) {
    policy += `PRIVACY & DATA ETHICS:\n`;
    selections.privacy.forEach(privacy => {
      policy += `• ${policyTemplates.privacy[privacy as keyof typeof policyTemplates.privacy]}\n`;
    });
    policy += '\n';
  }

  if (selections.consequences.length > 0) {
    policy += `CONSEQUENCES FOR VIOLATIONS:\n`;
    selections.consequences.forEach(consequence => {
      policy += `• ${policyTemplates.consequences[consequence as keyof typeof policyTemplates.consequences]}\n`;
    });
    policy += '\n';
  }

  policy += `QUESTIONS:\nIf you have questions about this AI policy, please contact the instructor before submitting your work.\n\nLast Updated: [DATE]`;

  return policy;
}
