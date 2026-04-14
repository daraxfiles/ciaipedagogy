import { researchProgress } from "@/content/site";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

type Study = (typeof researchProgress.studies)[number];

// ── Phase step tracker ────────────────────────────────────────────────────────
function PhaseTracker({
  phases,
  stageIndex,
}: {
  phases: string[];
  stageIndex: number;
}) {
  return (
    <div role="list" aria-label="Research phases" className="flex items-center gap-0 w-full mt-5 mb-1">
      {phases.map((phase, i) => {
        const isCompleted = i < stageIndex;
        const isCurrent = i === stageIndex;
        const isFuture = i > stageIndex;

        return (
          <div
            key={phase}
            role="listitem"
            className="flex items-center flex-1 min-w-0"
            aria-label={`${phase}: ${isCompleted ? "completed" : isCurrent ? "current" : "upcoming"}`}
          >
            {/* Node */}
            <div className="relative flex flex-col items-center shrink-0">
              <div
                className={`h-2.5 w-2.5 rounded-full border-2 transition-colors ${
                  isCompleted
                    ? "bg-primary border-primary"
                    : isCurrent
                    ? "bg-background border-primary ring-2 ring-primary/30"
                    : "bg-background border-border"
                }`}
              />
              {/* Label below node — only on larger screens */}
              <span
                className={`absolute top-4 text-[9px] leading-tight text-center whitespace-nowrap font-medium hidden sm:block ${
                  isCompleted
                    ? "text-primary/70"
                    : isCurrent
                    ? "text-primary font-semibold"
                    : "text-muted-foreground/50"
                }`}
                style={{ width: "max-content", transform: "translateX(-50%)", left: "50%" }}
              >
                {phase}
              </span>
            </div>

            {/* Connector line (not after last) */}
            {i < phases.length - 1 && (
              <div
                className={`flex-1 h-px mx-0.5 ${
                  i < stageIndex ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Study card ────────────────────────────────────────────────────────────────
function StudyCard({ study }: { study: Study }) {
  const { phases } = researchProgress;

  const stageBadgeColor: Record<number, string> = {
    0: "bg-muted text-muted-foreground",
    1: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    2: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
    3: "bg-primary/10 text-primary",
    4: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  };

  return (
    <article
      className="rounded-xl border border-card-border bg-card p-6 flex flex-col"
      data-testid={`card-research-progress-${study.id}`}
    >
      {/* Study label */}
      <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-muted-foreground mb-3">
        {study.label}
      </p>

      {/* Title */}
      <h3 className="font-serif text-base sm:text-[1.05rem] font-bold text-foreground leading-snug mb-2.5">
        {study.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-muted-foreground mb-4">
        {study.description}
      </p>

      {/* Current stage badge */}
      <div className="mb-1">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
            stageBadgeColor[study.stageIndex] ?? "bg-muted text-muted-foreground"
          }`}
          aria-label={`Current stage: ${study.currentStage}`}
        >
          {study.currentStage}
        </span>
      </div>

      {/* Phase tracker */}
      <PhaseTracker phases={phases} stageIndex={study.stageIndex} />

      {/* Space for label text */}
      <div className="mt-6 mb-4" />

      {/* Detail bullets */}
      <ul className="space-y-1.5 mb-5">
        {study.details.map((detail, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
            <div className="mt-[0.4rem] h-1 w-1 rounded-full bg-primary/50 shrink-0" />
            <span className="leading-relaxed">{detail}</span>
          </li>
        ))}
      </ul>

      {/* Next step callout */}
      <div className="mt-auto rounded-lg bg-muted/50 border border-border/60 px-4 py-3">
        <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-0.5">
          Next Step
        </p>
        <p className="text-sm text-foreground font-medium">{study.nextStep}</p>
      </div>
    </article>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export function CurrentResearchProgress() {
  const { title, subtitle, stats, studies } = researchProgress;

  return (
    <section
      className="py-16 sm:py-20 border-t border-border"
      data-testid="section-research-progress"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">
              Active Research
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-3">
              {title}
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          </div>
          <Link
            href="/projects"
            className="hidden sm:flex items-center gap-1 text-xs font-medium text-primary hover:underline shrink-0"
          >
            All Projects <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Summary stats strip */}
        <div
          className="flex flex-wrap gap-3 sm:gap-4 mb-10 p-4 rounded-xl border border-border bg-muted/20"
          data-testid="stats-strip"
          role="region"
          aria-label="Research summary statistics"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex items-baseline gap-2 px-4 py-2.5 rounded-lg bg-background border border-border/60"
              data-testid={`stat-${i}`}
            >
              <span
                className={`font-bold text-foreground ${
                  stat.isNumber ? "text-xl sm:text-2xl font-serif" : "text-sm"
                }`}
                aria-label={`${stat.label}: ${stat.value}`}
              >
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Study cards grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          data-testid="studies-grid"
        >
          {studies.map((study) => (
            <StudyCard key={study.id} study={study} />
          ))}
        </div>
      </div>
    </section>
  );
}
