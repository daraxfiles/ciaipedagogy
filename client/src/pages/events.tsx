import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { siteConfig } from "@/content/site";
import { useAuth } from "@/hooks/use-auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import type { Event, Rsvp, Comment } from "@shared/schema";

const tagColors: Record<string, string> = {
  Essay: "bg-primary/10 text-primary border-primary/20",
  Commentary: "bg-accent/15 text-accent-foreground border-accent/20",
  Reflection: "bg-chart-3/10 text-chart-3 border-chart-3/20",
};

const typeColors: Record<string, string> = {
  seminar: "bg-primary/10 text-primary border-primary/20",
  workshop: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  conference: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  webinar: "bg-accent/15 text-accent-foreground border-accent/20",
};

// ── Comments on an event ──────────────────────────────────────────────────────
function EventComments({ eventId }: { eventId: number }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [text, setText] = useState("");

  const { data: comments = [] } = useQuery<Comment[]>({
    queryKey: ["/api/comments", "event", eventId],
    queryFn: async () => {
      const res = await fetch(`/api/comments/event/${eventId}`);
      return res.json();
    },
  });

  const addComment = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/comments", {
        contentType: "event",
        contentId: eventId,
        text,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/comments", "event", eventId] });
      setText("");
    },
    onError: () => toast({ variant: "destructive", title: "Failed to post comment" }),
  });

  const deleteComment = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/comments/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/comments", "event", eventId] });
    },
  });

  return (
    <div className="mt-4">
      <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
        Discussion ({comments.length})
      </p>
      <div className="space-y-2 mb-4">
        {comments.map((c) => (
          <div key={c.id} className="text-xs rounded-md border border-card-border bg-muted/30 p-3" data-testid={`comment-${c.id}`}>
            <p className="text-foreground leading-relaxed">{c.text}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-muted-foreground">{new Date(c.createdAt).toLocaleDateString()}</span>
              {user && (user.id === c.userId || user.role === "admin") && (
                <button
                  onClick={() => deleteComment.mutate(c.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                  data-testid={`button-delete-comment-${c.id}`}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-xs text-muted-foreground">No comments yet. Be the first to share a thought.</p>
        )}
      </div>
      {user ? (
        <div className="space-y-2">
          <Textarea
            rows={2}
            placeholder="Add a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="text-xs"
            data-testid={`input-comment-${eventId}`}
          />
          <Button
            size="sm"
            disabled={addComment.isPending || !text.trim()}
            onClick={() => addComment.mutate()}
            data-testid={`button-comment-submit-${eventId}`}
          >
            {addComment.isPending ? "Posting..." : "Post Comment"}
          </Button>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">
          <Link href="/login" className="text-primary hover:underline">Sign in</Link> to join the discussion.
        </p>
      )}
    </div>
  );
}

// ── RSVP button for a single event ───────────────────────────────────────────
function EventRsvpButton({ event }: { event: Event }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: myRsvps = [] } = useQuery<Rsvp[]>({
    queryKey: ["/api/rsvps/mine"],
    enabled: !!user,
  });

  const hasRsvp = myRsvps.some((r) => r.eventId === event.id);

  const rsvpMutation = useMutation({
    mutationFn: async () => {
      if (hasRsvp) {
        await apiRequest("DELETE", `/api/events/${event.id}/rsvp`);
      } else {
        await apiRequest("POST", `/api/events/${event.id}/rsvp`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/rsvps/mine"] });
      toast({ title: hasRsvp ? "RSVP cancelled" : "RSVP confirmed" });
    },
    onError: (err: any) => toast({ variant: "destructive", title: "Error", description: err.message.replace(/^\d+:\s*/, "") }),
  });

  if (!event.rsvpEnabled || event.status === "past") return null;

  if (!user) {
    return (
      <Link href="/login">
        <Button variant="outline" size="sm" className="text-xs">
          Sign in to RSVP
        </Button>
      </Link>
    );
  }

  return (
    <Button
      variant={hasRsvp ? "secondary" : "default"}
      size="sm"
      className="text-xs"
      onClick={() => rsvpMutation.mutate()}
      disabled={rsvpMutation.isPending}
      data-testid={`button-rsvp-${event.id}`}
    >
      {hasRsvp ? "Cancel RSVP" : "RSVP"}
    </Button>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function EventsPage() {
  const { events: staticEvents } = siteConfig;
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);

  const { data: dbEvents = [] } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const upcoming = dbEvents.filter((e) => e.status === "upcoming");
  const past = dbEvents.filter((e) => e.status === "past");

  return (
    <div className="space-y-0">

      {/* Page header */}
      <div className="mb-16">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Network Updates</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-5 max-w-3xl">
          {staticEvents.title}
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl">
          {staticEvents.intro}
        </p>
      </div>

      {/* DB-backed upcoming events */}
      <section data-testid="section-upcoming">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">On the Calendar</p>
          <h2 className="font-serif text-2xl font-bold text-foreground">Upcoming Events</h2>
        </div>
        {upcoming.length === 0 ? (
          <div className="grid sm:grid-cols-3 gap-5">
            {staticEvents.upcoming.map((event, i) => (
              <Card key={i} className="hover-elevate border-card-border" data-testid={`card-upcoming-static-${i}`}>
                <CardHeader>
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-accent-foreground">{event.date}</span>
                  </div>
                  <CardTitle className="font-serif text-base">{event.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed mt-2">{event.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {upcoming.map((evt) => {
              const isExpanded = expandedEvent === evt.id;
              return (
                <div key={evt.id} className="rounded-xl border border-card-border bg-card overflow-hidden" data-testid={`card-event-${evt.id}`}>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-accent-foreground">{evt.date}</span>
                        {evt.time && <span className="text-xs text-muted-foreground">{evt.time}</span>}
                        <Badge variant="outline" className={`text-[10px] no-default-active-elevate border capitalize ${typeColors[evt.type] || ""}`}>
                          {evt.type}
                        </Badge>
                        {evt.rsvpEnabled && (
                          <Badge variant="outline" className="text-[10px] no-default-active-elevate border-emerald-500/30 text-emerald-700 dark:text-emerald-400">
                            RSVP open
                          </Badge>
                        )}
                      </div>
                      <EventRsvpButton event={evt} />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-foreground mb-1">{evt.title}</h3>
                    {evt.location && <p className="text-xs text-muted-foreground mb-2">{evt.location}</p>}
                    <p className="text-sm text-muted-foreground leading-relaxed">{evt.description}</p>
                    <button
                      className="mt-3 text-xs font-medium text-primary hover:underline focus-visible:outline-none"
                      onClick={() => setExpandedEvent(isExpanded ? null : evt.id)}
                      data-testid={`button-toggle-discussion-${evt.id}`}
                    >
                      {isExpanded ? "Hide discussion" : "View discussion"}
                    </button>
                  </div>
                  {isExpanded && (
                    <div className="border-t border-card-border bg-muted/20 px-5 py-4">
                      <EventComments eventId={evt.id} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      <Separator className="my-14 sm:my-16" />

      {/* Insights — static from site.ts */}
      <section data-testid="section-insights">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Written Outputs</p>
          <h2 className="font-serif text-2xl font-bold text-foreground">Research Insights</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {staticEvents.insights.map((item, i) => (
            <Card key={i} className="hover-elevate border-card-border" data-testid={`card-insight-${i}`}>
              <CardHeader>
                <div className="flex gap-2 flex-wrap mb-3">
                  <Badge
                    variant="outline"
                    className={`text-[10px] no-default-active-elevate border ${tagColors[item.tag] || ""}`}
                  >
                    {item.tag}
                  </Badge>
                </div>
                <CardTitle className="font-serif text-base">{item.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed mt-2">{item.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-0">
                <p className="text-xs text-muted-foreground">{item.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Archive */}
      {(past.length > 0 || (staticEvents as any).archive?.length > 0) && (
        <>
          <Separator className="my-14 sm:my-16" />
          <section data-testid="section-archive">
            <div className="mb-8">
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Previous</p>
              <h2 className="font-serif text-2xl font-bold text-foreground">Event Archive</h2>
            </div>
            <div className="space-y-3">
              {past.map((evt) => (
                <div
                  key={evt.id}
                  className="flex items-start gap-4 py-3 border-b border-card-border last:border-0"
                  data-testid={`row-archive-${evt.id}`}
                >
                  <span className="text-xs text-muted-foreground shrink-0 mt-0.5 w-28">{evt.date}</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{evt.title}</p>
                    {evt.location && <p className="text-xs text-muted-foreground">{evt.location}</p>}
                  </div>
                </div>
              ))}
              {(staticEvents as any).archive?.map((item: any, i: number) => (
                <div
                  key={`static-${i}`}
                  className="flex items-start gap-4 py-3 border-b border-card-border last:border-0"
                  data-testid={`row-archive-static-${i}`}
                >
                  <span className="text-xs text-muted-foreground shrink-0 mt-0.5 w-28">{item.date}</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    {item.location && <p className="text-xs text-muted-foreground">{item.location}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
