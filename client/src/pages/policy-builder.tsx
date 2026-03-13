import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Wrench, Tag, Shield, AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import PolicySection from "@/components/policy-section";
import PolicyPreview from "@/components/policy-preview";
import ExportDialog from "@/components/export-dialog";
import { usePolicyBuilder } from "@/hooks/use-policy-builder";

const sections = [
  {
    key: 'purpose' as const,
    title: 'Purpose of AI Use',
    icon: Target,
    options: [
      { value: 'enhance-learning', label: 'Enhance learning and understanding' },
      { value: 'writing-assistance', label: 'Assist in writing and communication' },
      { value: 'research-aid', label: 'Research and information gathering' },
      { value: 'critical-thinking', label: 'Develop critical thinking skills' },
      { value: 'skill-development', label: 'Build specific course skills' },
      { value: 'accessibility-support', label: 'Provide accessibility support' },
      { value: 'collaborative-learning', label: 'Collaborative learning partner' },
      { value: 'limited-phases', label: 'Limited to specific assignment phases' },
      { value: 'final-work-only', label: 'Prohibited for final submissions' },
      { value: 'no-ai', label: 'No AI use allowed' },
    ],
  },
  {
    key: 'tools' as const,
    title: 'Permitted AI Tools',
    icon: Wrench,
    options: [
      { value: 'chatgpt', label: 'ChatGPT and similar language models' },
      { value: 'grammarly', label: 'Grammarly and writing assistants' },
      { value: 'code-assistants', label: 'Programming assistants (GitHub Copilot)' },
      { value: 'translation-tools', label: 'AI translation tools' },
      { value: 'research-databases', label: 'AI-powered research databases' },
      { value: 'creative-tools', label: 'AI creative tools (image/video/audio)' },
      { value: 'citation-managers', label: 'AI citation and reference tools' },
      { value: 'presentation-tools', label: 'AI presentation tools' },
      { value: 'institutional', label: 'Institution-approved platforms only' },
      { value: 'instructor-approved', label: 'Instructor-approved tools only' },
      { value: 'no-generative', label: 'Traditional AI only (no generative)' },
      { value: 'open-source-only', label: 'Open-source AI tools only' },
    ],
  },
  {
    key: 'integrity' as const,
    title: 'Academic Integrity Requirements',
    icon: Tag,
    options: [
      { value: 'full-disclosure', label: 'Full disclosure and citation required' },
      { value: 'detailed-explanation', label: 'Detailed explanation of AI contribution' },
      { value: 'process-documentation', label: 'Document entire AI interaction process' },
      { value: 'human-verification', label: 'Must demonstrate understanding of AI work' },
      { value: 'original-contribution', label: 'Substantial original contribution required' },
      { value: 'collaborative-disclosure', label: 'Disclose like human collaboration' },
      { value: 'iterative-improvement', label: 'Show refinement of AI outputs' },
      { value: 'ethical-reflection', label: 'Reflect on AI use ethics' },
      { value: 'percentage-limits', label: 'AI limited to specific percentage' },
      { value: 'plagiarism-unless-cited', label: 'AI use is plagiarism unless cited' },
      { value: 'case-by-case', label: 'Case-by-case evaluation by instructor' },
    ],
  },
  {
    key: 'privacy' as const,
    title: 'Privacy & Data Ethics',
    icon: Shield,
    options: [
      { value: 'no-personal-data', label: 'No personal or sensitive data in AI tools' },
      { value: 'anonymize-inputs', label: 'Anonymize all inputs to AI tools' },
      { value: 'secure-platforms', label: 'Use only encrypted AI platforms' },
      { value: 'local-processing', label: 'Prefer local AI processing' },
      { value: 'data-retention-limits', label: 'Clear data deletion policies required' },
      { value: 'consent-for-sharing', label: "Get consent before sharing others' work" },
      { value: 'institutional-accounts', label: 'Use institutional AI accounts when available' },
      { value: 'no-biometric-data', label: 'Never share biometric data' },
      { value: 'institutional-platforms', label: 'Institution-approved platforms only' },
      { value: 'data-usage-awareness', label: 'Understand AI data usage policies' },
      { value: 'protect-others-work', label: "Protect others' intellectual property" },
    ],
  },
  {
    key: 'consequences' as const,
    title: 'Consequences for Policy Violations',
    icon: AlertTriangle,
    options: [
      { value: 'educational-conversation', label: 'Educational conversation for first violations' },
      { value: 'resubmission-penalty', label: 'Resubmission allowed with grade penalty' },
      { value: 'assignment-redo', label: 'Redo assignment without AI assistance' },
      { value: 'reflection-paper', label: 'Write AI ethics reflection paper' },
      { value: 'grade-penalties', label: 'Grade penalties for violations' },
      { value: 'progressive-discipline', label: 'Escalating consequences system' },
      { value: 'integrity-seminar', label: 'Complete academic integrity seminar' },
      { value: 'peer-mediation', label: 'Peer mediation and learning circles' },
      { value: 'portfolio-review', label: 'Review entire student portfolio' },
      { value: 'community-service', label: 'AI ethics education community service' },
      { value: 'misconduct-report', label: 'Formal academic misconduct report' },
      { value: 'course-withdrawal', label: 'Course withdrawal for severe violations' },
    ],
  },
];

export default function PolicyBuilderPage() {
  const { selections, updateSelection, progress, isComplete, generatePolicyText, copyPolicy } = usePolicyBuilder();

  return (
    <>
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
          Educator Toolkit
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
          AI Policy Generator
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl">
          Build a customized AI use policy for your course in minutes. Select options from each category, preview your policy live, then copy or download it for your syllabus.
        </p>
      </div>

      <Separator className="mb-10" />

      <Card className="border-card-border mb-8" data-testid="card-progress">
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-foreground">Policy progress</span>
                <span className="text-sm text-muted-foreground" data-testid="text-progress">
                  {progress.completed} of {progress.total} sections complete
                </span>
              </div>
              <Progress value={progress.percentage} className="h-2" data-testid="progress-bar" />
            </div>
            <div className="flex gap-2 shrink-0">
              <ExportDialog policyText={generatePolicyText()} isDisabled={!isComplete} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {sections.map((section) => (
            <PolicySection
              key={section.key}
              title={section.title}
              icon={section.icon}
              options={section.options}
              selectedValues={selections[section.key]}
              onSelectionChange={(value, checked) => updateSelection(section.key, value, checked)}
              sectionKey={section.key}
            />
          ))}
        </div>
        <div className="lg:col-span-1">
          <PolicyPreview
            policyText={generatePolicyText()}
            onCopy={copyPolicy}
            isComplete={isComplete}
          />
        </div>
      </div>
    </>
  );
}
