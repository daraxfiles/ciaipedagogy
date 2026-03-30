import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { siteConfig } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, ChevronUp, Send, User } from "lucide-react";
import type { InsightComment } from "@shared/schema";

const tagColors: Record<string, string> = {
  Essay: "bg-primary/10 text-primary border-primary/20",
  Commentary: "bg-accent/15 text-accent-foreground border-accent/20",
  Reflection: "bg-chart-3/10 text-chart-3 border-chart-3/20",
};

// ── Comment form ──────────────────────────────────────────────────────────────
function CommentForm({ postSlug, onSuccess }: { postSlug: string; onSuccess: () => void }) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/insight-comments", { postSlug, name: name.trim(), email: email.trim() || undefined, content: content.trim() });
    },
    onSuccess: () => {
      setName("");
      setEmail("");
      setContent("");
      onSuccess();
      toast({ title: "Comment posted", description: "Your comment has been added." });
    },
    onError: (err: any) => {
      toast({ variant: "destructive", title: "Could not post comment", description: err.message?.replace(/^\d+:\s*/, "") ?? "Please try again." });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { toast({ variant: "destructive", title: "Name required" }); return; }
    if (content.trim().length < 5) { toast({ variant: "destructive", title: "Comment too short", description: "Please write at least a few words." }); return; }
    mutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3" data-testid={`form-comment-${postSlug}`}>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor={`name-${postSlug}`} className="text-xs">Name <span aria-hidden="true" className="text-muted-foreground">*</span></Label>
          <Input
            id={`name-${postSlug}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="text-sm h-9"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`email-${postSlug}`} className="text-xs">Email <span className="text-muted-foreground font-normal">(optional)</span></Label>
          <Input
            id={`email-${postSlug}`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="text-sm h-9"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor={`content-${postSlug}`} className="text-xs">Comment <span aria-hidden="true" className="text-muted-foreground">*</span></Label>
        <Textarea
          id={`content-${postSlug}`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts, questions, or reflections..."
          rows={4}
          className="text-sm resize-none"
          required
        />
      </div>
      <Button type="submit" size="sm" disabled={mutation.isPending} data-testid={`button-comment-submit-${postSlug}`}>
        <Send className="h-3.5 w-3.5 mr-1.5" />
        {mutation.isPending ? "Posting..." : "Post Comment"}
      </Button>
    </form>
  );
}

// ── Comments section ──────────────────────────────────────────────────────────
function CommentsSection({ postSlug }: { postSlug: string }) {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);

  const { data: comments = [], isLoading } = useQuery<InsightComment[]>({
    queryKey: [`/api/insight-comments`, postSlug],
    queryFn: async () => {
      const res = await fetch(`/api/insight-comments?postSlug=${encodeURIComponent(postSlug)}`);
      if (!res.ok) throw new Error("Failed to load comments");
      return res.json();
    },
  });

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [`/api/insight-comments`, postSlug] });
    setShowForm(false);
  };

  const formatDate = (d: string | Date) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="mt-10" data-testid={`comments-${postSlug}`}>
      <div className="flex items-center gap-2 mb-5">
        <MessageSquare className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-foreground">
          {comments.length === 0 ? "Discussion" : `${comments.length} Comment${comments.length !== 1 ? "s" : ""}`}
        </h3>
      </div>

      {/* Existing comments */}
      {isLoading ? (
        <p className="text-xs text-muted-foreground py-2">Loading comments...</p>
      ) : comments.length > 0 ? (
        <div className="space-y-4 mb-6">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3" data-testid={`comment-${c.id}`}>
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted mt-0.5">
                <User className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap mb-1">
                  <span className="text-sm font-semibold text-foreground">{c.name}</span>
                  <span className="text-xs text-muted-foreground">{formatDate(c.createdAt)}</span>
                </div>
                <p className="text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap">{c.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground mb-5">No comments yet. Be the first to share your thoughts.</p>
      )}

      {/* Toggle form */}
      {!showForm ? (
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => setShowForm(true)}
          data-testid={`button-add-comment-${postSlug}`}
        >
          <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
          Add a comment
        </Button>
      ) : (
        <div className="rounded-xl border border-card-border bg-card/50 p-5">
          <CommentForm postSlug={postSlug} onSuccess={handleSuccess} />
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
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

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPost = (slug: string) => {
    const el = document.getElementById(`post-${slug}`);
    if (el) {
      const offset = 96;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div ref={topRef}>

      {/* Page header */}
      <div className="mb-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
          Written Outputs
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-5 max-w-3xl">
          Insights &amp; Commentary
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl">
          Research reflections, public scholarship, and critical commentary on AI, learning, and innovation.
        </p>
      </div>

      {/* Jump nav */}
      <nav aria-label="Jump to post" className="mb-14 p-5 rounded-xl border border-card-border bg-card/50">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">In this collection</p>
        <ol className="space-y-1.5">
          {insights.map((item, i) => (
            <li key={item.slug} className="flex items-start gap-2.5">
              <span className="text-xs text-muted-foreground mt-0.5 w-5 shrink-0 text-right">{i + 1}.</span>
              <button
                type="button"
                onClick={() => scrollToPost(item.slug)}
                className="text-sm text-left text-foreground/80 hover:text-primary transition-colors leading-snug focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              >
                {item.title}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      {/* All posts */}
      <div className="space-y-0">
        {insights.map((item, i) => (
          <div key={item.slug}>
            <article
              id={`post-${item.slug}`}
              className="max-w-2xl py-12 scroll-mt-24"
              data-testid={`article-${item.slug}`}
            >
              {/* Post meta */}
              <div className="flex items-center gap-3 mb-5">
                <Badge
                  variant="outline"
                  className={`text-[10px] no-default-active-elevate border ${tagColors[item.tag] ?? ""}`}
                >
                  {item.tag}
                </Badge>
                <span className="text-xs text-muted-foreground">{item.date}</span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">
                {item.title}
              </h2>

              {/* Dek / excerpt */}
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-8">
                {item.excerpt}
              </p>

              {/* Body */}
              <div className="space-y-5 text-base leading-[1.8] text-foreground/90">
                {item.body.map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
              </div>

              {/* Comments */}
              <CommentsSection postSlug={item.slug} />

              {/* Back to top */}
              <div className="mt-8">
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  aria-label="Back to top"
                >
                  <ChevronUp className="h-3.5 w-3.5" />
                  Back to top
                </button>
              </div>
            </article>

            {i < insights.length - 1 && <Separator />}
          </div>
        ))}
      </div>

    </div>
  );
}
