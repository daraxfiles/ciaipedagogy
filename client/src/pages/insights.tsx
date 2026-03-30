import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Send, User } from "lucide-react";
import type { InsightComment } from "@shared/schema";

const tagColor: Record<string, string> = {
  Essay:       "text-primary",
  Commentary:  "text-accent-foreground",
  Reflection:  "text-chart-3",
};

function readingTime(body: string[]): string {
  const words = body.join(" ").split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 238));
  return `${mins} min read`;
}

// ── Comment form ──────────────────────────────────────────────────────────────
function CommentForm({ postSlug, onSuccess }: { postSlug: string; onSuccess: () => void }) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  const mutation = useMutation({
    mutationFn: async () =>
      apiRequest("POST", "/api/insight-comments", {
        postSlug,
        name: name.trim(),
        email: email.trim() || undefined,
        content: content.trim(),
      }),
    onSuccess: () => {
      setName(""); setEmail(""); setContent("");
      onSuccess();
      toast({ title: "Response posted" });
    },
    onError: (err: any) =>
      toast({ variant: "destructive", title: "Could not post response", description: err.message?.replace(/^\d+:\s*/, "") }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { toast({ variant: "destructive", title: "Name required" }); return; }
    if (content.trim().length < 5) { toast({ variant: "destructive", title: "Response too short" }); return; }
    mutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3" data-testid={`form-comment-${postSlug}`}>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor={`name-${postSlug}`} className="text-xs text-muted-foreground">Name *</Label>
          <Input id={`name-${postSlug}`} value={name} onChange={(e) => setName(e.target.value)}
            placeholder="Your name" className="text-sm h-9 bg-background" required />
        </div>
        <div className="space-y-1">
          <Label htmlFor={`email-${postSlug}`} className="text-xs text-muted-foreground">Email (optional)</Label>
          <Input id={`email-${postSlug}`} type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com" className="text-sm h-9 bg-background" />
        </div>
      </div>
      <div className="space-y-1">
        <Label htmlFor={`content-${postSlug}`} className="text-xs text-muted-foreground">Your response *</Label>
        <Textarea id={`content-${postSlug}`} value={content} onChange={(e) => setContent(e.target.value)}
          placeholder="What are your thoughts?" rows={4} className="text-sm resize-none bg-background" required />
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" size="sm" disabled={mutation.isPending} data-testid={`button-comment-submit-${postSlug}`}>
          <Send className="h-3.5 w-3.5 mr-1.5" />
          {mutation.isPending ? "Posting…" : "Publish response"}
        </Button>
      </div>
    </form>
  );
}

// ── Responses section ─────────────────────────────────────────────────────────
function ResponsesSection({ postSlug }: { postSlug: string }) {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);

  const { data: comments = [], isLoading } = useQuery<InsightComment[]>({
    queryKey: ["/api/insight-comments", postSlug],
    queryFn: async () => {
      const res = await fetch(`/api/insight-comments?postSlug=${encodeURIComponent(postSlug)}`);
      if (!res.ok) throw new Error("Failed to load");
      return res.json();
    },
  });

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/insight-comments", postSlug] });
    setShowForm(false);
  };

  const fmt = (d: string | Date) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="mt-14" data-testid={`comments-${postSlug}`}>

      {/* Divider + heading */}
      <div className="border-t border-border pt-8 mb-6 flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-foreground">
          {comments.length > 0
            ? `${comments.length} Response${comments.length !== 1 ? "s" : ""}`
            : "Responses"}
        </p>
        {!showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="text-xs font-medium text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            data-testid={`button-add-comment-${postSlug}`}
          >
            Write a response
          </button>
        )}
      </div>

      {/* Existing responses */}
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : comments.length > 0 ? (
        <div className="space-y-6 mb-8">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3" data-testid={`comment-${c.id}`}>
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                <User className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap mb-1.5">
                  <span className="text-sm font-semibold text-foreground">{c.name}</span>
                  <span className="text-xs text-muted-foreground">{fmt(c.createdAt)}</span>
                </div>
                <p className="text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap">{c.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : !showForm ? (
        <p className="text-sm text-muted-foreground mb-6">No responses yet.</p>
      ) : null}

      {/* Inline form */}
      {showForm && (
        <div className="rounded-xl border border-border bg-card p-5 mb-4">
          <CommentForm postSlug={postSlug} onSuccess={handleSuccess} />
          <button type="button" onClick={() => setShowForm(false)}
            className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function InsightsPage() {
  const { insights } = siteConfig.events;
  const topRef = useRef<HTMLDivElement>(null);

  const scrollToPost = (slug: string) => {
    const el = document.getElementById(`post-${slug}`);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div ref={topRef} className="max-w-[680px] mx-auto">

      {/* Publication header */}
      <div className="border-b border-border pb-8 mb-12">
        <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-4">
          Critical Innovation &amp; AI Pedagogy
        </p>
        <h1 className="font-serif text-[2.6rem] sm:text-[3.2rem] font-bold text-foreground leading-[1.1] tracking-tight mb-4">
          Insights &amp; Commentary
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Research reflections, public scholarship, and critical commentary on AI, learning, and innovation.
        </p>

        {/* Table of contents */}
        <nav aria-label="In this collection" className="mt-8">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-3">
            In this collection
          </p>
          <ol className="space-y-2">
            {insights.map((item, i) => (
              <li key={item.slug} className="flex items-baseline gap-3">
                <span className="text-xs text-muted-foreground tabular-nums w-4 shrink-0">{i + 1}.</span>
                <button
                  type="button"
                  onClick={() => scrollToPost(item.slug)}
                  className={`text-sm text-left leading-snug transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded ${tagColor[item.tag] ?? "text-foreground/80"}`}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Articles */}
      <div>
        {insights.map((item, i) => (
          <article
            key={item.slug}
            id={`post-${item.slug}`}
            className="scroll-mt-24 pb-16"
            data-testid={`article-${item.slug}`}
          >
            {/* Category */}
            <p className={`text-[11px] font-semibold tracking-[0.15em] uppercase mb-4 ${tagColor[item.tag] ?? "text-muted-foreground"}`}>
              {item.tag}
            </p>

            {/* Title */}
            <h2 className="font-serif text-[2rem] sm:text-[2.4rem] font-bold text-foreground leading-[1.15] tracking-tight mb-4">
              {item.title}
            </h2>

            {/* Dek */}
            <p className="text-[1.15rem] leading-[1.6] text-muted-foreground font-normal mb-6">
              {item.excerpt}
            </p>

            {/* Byline */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-[11px] font-bold text-primary font-serif">CI</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground leading-none mb-1">CI&amp;AIP Network</p>
                <p className="text-xs text-muted-foreground">
                  {item.date}
                  <span className="mx-1.5">·</span>
                  {readingTime(item.body)}
                </p>
              </div>
            </div>

            {/* Thin rule */}
            <div className="border-t border-border mb-8" />

            {/* Body */}
            <div className="prose-article">
              {item.body.map((para, j) => (
                <p
                  key={j}
                  className="text-[1.0625rem] sm:text-[1.125rem] leading-[1.78] text-foreground/90 mb-6 last:mb-0"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Responses */}
            <ResponsesSection postSlug={item.slug} />

            {/* Inter-article spacer / divider */}
            {i < insights.length - 1 && (
              <div className="mt-6 border-t-2 border-dashed border-border/40 pt-2 pb-4">
                <button
                  type="button"
                  onClick={() => scrollToPost(insights[i + 1].slug)}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  Next: {insights[i + 1].title} →
                </button>
              </div>
            )}
          </article>
        ))}
      </div>

    </div>
  );
}
