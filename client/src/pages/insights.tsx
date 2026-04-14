import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Send, User, ExternalLink, ChevronRight, PenLine } from "lucide-react";
import type { InsightComment } from "@shared/schema";

const tagColor: Record<string, { text: string; bg: string }> = {
  Essay:      { text: "text-primary",             bg: "bg-primary/10" },
  Commentary: { text: "text-accent-foreground",   bg: "bg-accent/15" },
  Reflection: { text: "text-chart-3",             bg: "bg-chart-3/15" },
};

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
      <Button type="submit" size="sm" disabled={mutation.isPending} data-testid={`button-comment-submit-${postSlug}`}>
        <Send className="h-3.5 w-3.5 mr-1.5" />
        {mutation.isPending ? "Posting…" : "Publish response"}
      </Button>
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
    <div className="mt-10" data-testid={`comments-${postSlug}`}>
      <div className="border-t border-border pt-7 mb-5 flex items-center justify-between gap-4">
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

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : comments.length > 0 ? (
        <div className="space-y-5 mb-7">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3" data-testid={`comment-${c.id}`}>
              <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                <User className="h-3 w-3 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap mb-1">
                  <span className="text-sm font-semibold text-foreground">{c.name}</span>
                  <span className="text-xs text-muted-foreground">{fmt(c.createdAt)}</span>
                </div>
                <p className="text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap">{c.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : !showForm ? (
        <p className="text-sm text-muted-foreground mb-5">No responses yet.</p>
      ) : null}

      {showForm && (
        <div className="rounded-xl border border-border bg-card p-4 mb-4">
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
  const [selectedSlug, setSelectedSlug] = useState(insights[0]?.slug ?? "");

  const selected = insights.find((i) => i.slug === selectedSlug) ?? insights[0];
  const colors = tagColor[selected?.tag ?? ""] ?? { text: "text-muted-foreground", bg: "bg-muted" };

  return (
    <div>
      {/* ── Page header (full width) ───────────────────────────────────── */}
      <div className="border-b border-border pb-8 mb-10">
        <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-3">
          Critical Innovation &amp; AI Pedagogy
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-3">
          Insights &amp; Commentary
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
          Research reflections, public scholarship, and critical commentary on AI, learning, and innovation.
        </p>
      </div>

      {/* ── Two-column layout ──────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

        {/* LEFT: Sticky sidebar ─────────────────────────────────────────── */}
        <aside className="w-full lg:w-[260px] shrink-0 lg:sticky lg:top-24">

          {/* Mobile: horizontal scroll pill strip */}
          <div className="flex lg:hidden gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
            {insights.map((item) => {
              const isActive = item.slug === selectedSlug;
              const c = tagColor[item.tag] ?? { text: "text-muted-foreground", bg: "bg-muted" };
              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setSelectedSlug(item.slug)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap border ${
                    isActive
                      ? `${c.bg} ${c.text} border-transparent`
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                  data-testid={`sidebar-item-mobile-${item.slug}`}
                >
                  {item.title}
                </button>
              );
            })}
          </div>

          {/* Desktop: vertical list */}
          <nav aria-label="Insights navigation" className="hidden lg:block rounded-xl border border-border overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/30">
              <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-muted-foreground">
                In this collection
              </p>
            </div>
            <ul>
              {insights.map((item, i) => {
                const isActive = item.slug === selectedSlug;
                const c = tagColor[item.tag] ?? { text: "text-muted-foreground", bg: "bg-muted" };
                return (
                  <li key={item.slug} className={i < insights.length - 1 ? "border-b border-border" : ""}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSlug(item.slug);
                        if (item.blogUrl) {
                          window.open(item.blogUrl, "_blank", "noopener,noreferrer");
                        }
                      }}
                      className={`w-full text-left px-4 py-3.5 flex items-start justify-between gap-3 transition-colors group ${
                        isActive ? "bg-muted/60" : "hover:bg-muted/30"
                      }`}
                      data-testid={`sidebar-item-${item.slug}`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`text-[9px] font-bold tracking-[0.12em] uppercase ${c.text}`}>
                            {item.tag}
                          </span>
                        </div>
                        <p className={`text-sm font-medium leading-snug ${isActive ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"} transition-colors`}>
                          {item.title}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-1">{item.date}</p>
                      </div>
                      <ChevronRight className={`h-3.5 w-3.5 shrink-0 mt-1 transition-colors ${
                        isActive ? "text-foreground" : "text-muted-foreground/40 group-hover:text-muted-foreground"
                      }`} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* RIGHT: Article detail panel ──────────────────────────────────── */}
        {selected && (
          <article
            key={selected.slug}
            className="flex-1 min-w-0"
            data-testid={`article-${selected.slug}`}
          >
            {/* Category */}
            <p className={`text-[11px] font-bold tracking-[0.15em] uppercase mb-4 ${colors.text}`}>
              {selected.tag}
            </p>

            {/* Title */}
            <h2 className="font-serif text-[1.85rem] sm:text-[2.3rem] font-bold text-foreground leading-[1.15] tracking-tight mb-4">
              {selected.title}
            </h2>

            {/* Dek */}
            <p className="text-[1.05rem] sm:text-[1.1rem] leading-[1.65] text-muted-foreground mb-6">
              {selected.excerpt}
            </p>

            {/* Byline */}
            <div className="flex items-center gap-3 mb-7">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-primary font-serif">CI</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground leading-none mb-0.5">CI&amp;AIP Network</p>
                <p className="text-xs text-muted-foreground">{selected.date}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border mb-8" />

            {/* Body / blog link / coming soon */}
            {selected.body.length > 0 ? (
              <div>
                {selected.body.map((para, j) => (
                  <p key={j} className="text-[1.0625rem] leading-[1.78] text-foreground/90 mb-6 last:mb-0">
                    {para}
                  </p>
                ))}
              </div>
            ) : selected.blogUrl ? (
              <div className="rounded-xl border border-border bg-muted/20 px-6 py-8">
                <p className="text-sm text-muted-foreground mb-5">
                  This piece is published on the CI&amp;AIP blog. Click below to read the full article.
                </p>
                <a
                  href={selected.blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`link-read-blog-${selected.slug}`}
                >
                  <Button className="gap-2">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Read full article
                  </Button>
                </a>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border bg-muted/20 px-6 py-10 flex flex-col items-center text-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <PenLine className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">Full text coming soon</p>
                <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                  This piece is currently being written. Check back soon, or leave a response below — we read every one.
                </p>
              </div>
            )}

            {/* Responses */}
            <ResponsesSection postSlug={selected.slug} />
          </article>
        )}
      </div>
    </div>
  );
}
