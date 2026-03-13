import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertEventSchema, insertPublicationSchema } from "@shared/schema";
import type { Submission, Event, Publication, Rsvp, User } from "@shared/schema";
import { z } from "zod";
import { Trash2, Pencil, Plus, ChevronDown, ChevronUp, Download, Users } from "lucide-react";

type AdminMember = Omit<User, "passwordHash">;

const statusColors: Record<string, string> = {
  new: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  read: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  archived: "bg-muted text-muted-foreground border-border",
};

// ── Submissions tab ──────────────────────────────────────────────────────────
function SubmissionsTab() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: submissions = [], isLoading } = useQuery<Submission[]>({
    queryKey: ["/api/submissions"],
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      await apiRequest("PATCH", `/api/submissions/${id}/status`, { status });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/submissions"] }),
  });

  if (isLoading) return <p className="text-sm text-muted-foreground py-8">Loading submissions...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl font-bold text-foreground">Form Submissions</h2>
        <Badge variant="secondary" className="no-default-active-elevate">{submissions.length} total</Badge>
      </div>
      {submissions.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">No submissions yet.</p>
      ) : (
        <div className="space-y-3">
          {submissions.map((s) => (
            <div
              key={s.id}
              className="rounded-lg border border-card-border bg-card p-4"
              data-testid={`row-submission-${s.id}`}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] no-default-active-elevate capitalize">
                    {s.type}
                  </Badge>
                  <Badge variant="outline" className={`text-[10px] no-default-active-elevate border ${statusColors[s.status] || ""}`}>
                    {s.status}
                  </Badge>
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0">
                  {new Date(s.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm font-semibold text-foreground">{s.name}</p>
              <p className="text-xs text-muted-foreground mb-1">{s.email}{s.organization ? ` · ${s.organization}` : ""}</p>
              {s.subject && <p className="text-xs font-medium text-foreground/70 mb-1">{s.subject}</p>}
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{s.message}</p>
              <div className="flex gap-2 mt-3">
                {["new", "read", "archived"].filter((st) => st !== s.status).map((st) => (
                  <Button
                    key={st}
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => updateStatus.mutate({ id: s.id, status: st })}
                    data-testid={`button-submission-${s.id}-${st}`}
                  >
                    Mark {st}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Event attendees sub-component ─────────────────────────────────────────────
function EventAttendeesPanel({ eventId }: { eventId: number }) {
  const { data: rsvps = [], isLoading } = useQuery<Rsvp[]>({
    queryKey: ["/api/events", eventId, "rsvps"],
    queryFn: async () => {
      const res = await fetch(`/api/events/${eventId}/rsvps`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load attendees");
      return res.json();
    },
  });

  if (isLoading) return <p className="text-xs text-muted-foreground py-2 px-4">Loading attendees...</p>;
  if (rsvps.length === 0) return <p className="text-xs text-muted-foreground py-2 px-4">No RSVPs yet.</p>;

  return (
    <div className="mt-2 rounded-md border border-border/50 bg-muted/30 divide-y divide-border/40">
      {rsvps.map((r) => (
        <div key={r.id} className="flex items-center justify-between px-4 py-2.5" data-testid={`row-attendee-${r.id}`}>
          <div>
            <p className="text-xs font-medium text-foreground">{r.name}</p>
            <p className="text-[10px] text-muted-foreground">{r.email}</p>
          </div>
          <p className="text-[10px] text-muted-foreground shrink-0">
            {new Date(r.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}

// ── Events tab ───────────────────────────────────────────────────────────────
const eventFormSchema = insertEventSchema.extend({
  rsvpEnabled: z.boolean().default(false),
});

function EventsTab() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);

  const { data: evts = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "", date: "", time: "", location: "", description: "",
      type: "seminar", status: "upcoming", rsvpEnabled: false,
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: z.infer<typeof eventFormSchema>) => {
      if (editing) {
        await apiRequest("PUT", `/api/events/${editing.id}`, data);
      } else {
        await apiRequest("POST", "/api/events", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({ title: editing ? "Event updated" : "Event created" });
      setDialogOpen(false);
      setEditing(null);
      form.reset();
    },
    onError: (err: any) => toast({ variant: "destructive", title: "Error", description: err.message }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => apiRequest("DELETE", `/api/events/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({ title: "Event deleted" });
    },
  });

  function openNew() {
    setEditing(null);
    form.reset({ title: "", date: "", time: "", location: "", description: "", type: "seminar", status: "upcoming", rsvpEnabled: false });
    setDialogOpen(true);
  }

  function openEdit(evt: Event) {
    setEditing(evt);
    form.reset({
      title: evt.title, date: evt.date, time: evt.time || "",
      location: evt.location || "", description: evt.description,
      type: evt.type, status: evt.status, rsvpEnabled: evt.rsvpEnabled,
    });
    setDialogOpen(true);
  }

  if (isLoading) return <p className="text-sm text-muted-foreground py-8">Loading events...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl font-bold text-foreground">Events</h2>
        <Button size="sm" onClick={openNew} data-testid="button-new-event">
          <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Event
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif">{editing ? "Edit Event" : "New Event"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((d) => saveMutation.mutate(d))} className="space-y-4 mt-2">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} data-testid="input-event-title" /></FormControl><FormMessage /></FormItem>
              )} />
              <div className="grid grid-cols-2 gap-3">
                <FormField control={form.control} name="date" render={({ field }) => (
                  <FormItem><FormLabel>Date</FormLabel><FormControl><Input placeholder="March 15, 2026" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="time" render={({ field }) => (
                  <FormItem><FormLabel>Time</FormLabel><FormControl><Input placeholder="2:00 PM" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="location" render={({ field }) => (
                <FormItem><FormLabel>Location</FormLabel><FormControl><Input placeholder="Room 204 / Zoom" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <div className="grid grid-cols-2 gap-3">
                <FormField control={form.control} name="type" render={({ field }) => (
                  <FormItem><FormLabel>Type</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        {["seminar", "workshop", "conference", "webinar"].map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select><FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="status" render={({ field }) => (
                  <FormItem><FormLabel>Status</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        {["upcoming", "past", "cancelled"].map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select><FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="rsvpEnabled"
                  checked={form.watch("rsvpEnabled")}
                  onChange={(e) => form.setValue("rsvpEnabled", e.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
                <label htmlFor="rsvpEnabled" className="text-sm font-medium">Enable RSVPs for this event</label>
              </div>
              <div className="flex gap-2 pt-2">
                <Button type="submit" disabled={saveMutation.isPending} data-testid="button-save-event">
                  {saveMutation.isPending ? "Saving..." : "Save Event"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {evts.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">No events yet. Add your first event.</p>
      ) : (
        <div className="space-y-2">
          {evts.map((evt) => (
            <div key={evt.id} data-testid={`row-event-${evt.id}`}>
              <div className="flex items-start justify-between gap-4 p-4 rounded-lg border border-card-border bg-card">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-semibold text-accent-foreground">{evt.date}</span>
                    <Badge variant="outline" className="text-[10px] no-default-active-elevate capitalize">{evt.status}</Badge>
                    {evt.rsvpEnabled && (
                      <Badge variant="outline" className="text-[10px] no-default-active-elevate border-emerald-500/30 text-emerald-700 dark:text-emerald-400">RSVPs on</Badge>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-foreground">{evt.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{evt.description}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  {evt.rsvpEnabled && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-xs text-muted-foreground gap-1"
                      onClick={() => setExpandedEvent(expandedEvent === evt.id ? null : evt.id)}
                      data-testid={`button-attendees-${evt.id}`}
                    >
                      <Users className="h-3.5 w-3.5" />
                      {expandedEvent === evt.id ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => openEdit(evt)} data-testid={`button-edit-event-${evt.id}`}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive" onClick={() => deleteMutation.mutate(evt.id)} data-testid={`button-delete-event-${evt.id}`}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              {expandedEvent === evt.id && (
                <div className="mx-2" data-testid={`panel-attendees-${evt.id}`}>
                  <div className="border-x border-b border-border/50 rounded-b-lg pt-1 pb-2 bg-muted/20">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 pt-2 pb-1">
                      Attendees
                    </p>
                    <EventAttendeesPanel eventId={evt.id} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Import Publication dialog ─────────────────────────────────────────────────
type ImportedPub = {
  title: string;
  authors: string;
  year: number;
  type: string;
  venue: string;
  abstract: string;
  url: string;
};

function ImportPublicationDialog({
  open,
  onClose,
  onImport,
}: {
  open: boolean;
  onClose: () => void;
  onImport: (data: ImportedPub) => void;
}) {
  const { toast } = useToast();
  const [mode, setMode] = useState<"doi" | "bibtex">("doi");
  const [doiInput, setDoiInput] = useState("");
  const [bibtexInput, setBibtexInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchDoi() {
    if (!doiInput.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/import/doi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ doi: doiInput.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "DOI lookup failed");
      onImport(data as ImportedPub);
      onClose();
      setDoiInput("");
    } catch (err: any) {
      toast({ variant: "destructive", title: "DOI lookup failed", description: err.message });
    } finally {
      setLoading(false);
    }
  }

  async function parseBibtex() {
    if (!bibtexInput.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/import/bibtex", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ bibtex: bibtexInput.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "BibTeX parse failed");
      onImport(data as ImportedPub);
      onClose();
      setBibtexInput("");
    } catch (err: any) {
      toast({ variant: "destructive", title: "BibTeX parse failed", description: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif">Import Publication</DialogTitle>
        </DialogHeader>

        <div className="flex gap-1 p-1 rounded-md bg-muted mb-4">
          <button
            type="button"
            onClick={() => setMode("doi")}
            className={`flex-1 text-xs font-medium py-1.5 rounded transition-colors ${mode === "doi" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            data-testid="button-mode-doi"
          >
            DOI Lookup
          </button>
          <button
            type="button"
            onClick={() => setMode("bibtex")}
            className={`flex-1 text-xs font-medium py-1.5 rounded transition-colors ${mode === "bibtex" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            data-testid="button-mode-bibtex"
          >
            BibTeX Paste
          </button>
        </div>

        {mode === "doi" ? (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">DOI or doi.org URL</label>
              <Input
                placeholder="10.1000/xyz123 or https://doi.org/..."
                value={doiInput}
                onChange={(e) => setDoiInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchDoi()}
                data-testid="input-doi"
              />
              <p className="text-[10px] text-muted-foreground">
                Fetches metadata from Crossref. Paste the DOI with or without the doi.org prefix.
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={fetchDoi} disabled={loading || !doiInput.trim()} data-testid="button-fetch-doi">
                {loading ? "Looking up..." : "Fetch Metadata"}
              </Button>
              <Button variant="outline" onClick={onClose} type="button">Cancel</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Paste BibTeX entry</label>
              <Textarea
                rows={8}
                placeholder={"@article{smith2024,\n  title = {Your Title},\n  author = {Smith, A. and Doe, B.},\n  year = {2024},\n  journal = {Journal Name}\n}"}
                value={bibtexInput}
                onChange={(e) => setBibtexInput(e.target.value)}
                className="font-mono text-xs"
                data-testid="input-bibtex"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={parseBibtex} disabled={loading || !bibtexInput.trim()} data-testid="button-parse-bibtex">
                {loading ? "Parsing..." : "Parse Entry"}
              </Button>
              <Button variant="outline" onClick={onClose} type="button">Cancel</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ── Publications tab ──────────────────────────────────────────────────────────
const pubFormSchema = insertPublicationSchema;

function PublicationsTab() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [editing, setEditing] = useState<Publication | null>(null);

  const { data: pubs = [], isLoading } = useQuery<Publication[]>({
    queryKey: ["/api/publications/all"],
  });

  const form = useForm<z.infer<typeof pubFormSchema>>({
    resolver: zodResolver(pubFormSchema),
    defaultValues: {
      title: "", authors: "", year: new Date().getFullYear(),
      type: "journal", venue: "", abstract: "", url: "", status: "published",
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: z.infer<typeof pubFormSchema>) => {
      if (editing) {
        await apiRequest("PUT", `/api/publications/${editing.id}`, data);
      } else {
        await apiRequest("POST", "/api/publications", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/publications"] });
      queryClient.invalidateQueries({ queryKey: ["/api/publications/all"] });
      toast({ title: editing ? "Publication updated" : "Publication added" });
      setDialogOpen(false);
      setEditing(null);
      form.reset();
    },
    onError: (err: any) => toast({ variant: "destructive", title: "Error", description: err.message }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => apiRequest("DELETE", `/api/publications/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/publications"] });
      queryClient.invalidateQueries({ queryKey: ["/api/publications/all"] });
      toast({ title: "Publication deleted" });
    },
  });

  function openNew() {
    setEditing(null);
    form.reset({ title: "", authors: "", year: new Date().getFullYear(), type: "journal", venue: "", abstract: "", url: "", status: "published" });
    setDialogOpen(true);
  }

  function openEdit(pub: Publication) {
    setEditing(pub);
    form.reset({ title: pub.title, authors: pub.authors, year: pub.year, type: pub.type, venue: pub.venue || "", abstract: pub.abstract || "", url: pub.url || "", status: pub.status });
    setDialogOpen(true);
  }

  function handleImport(data: { title: string; authors: string; year: number; type: string; venue: string; abstract: string; url: string }) {
    setEditing(null);
    form.reset({
      title: data.title,
      authors: data.authors,
      year: data.year,
      type: data.type || "journal",
      venue: data.venue || "",
      abstract: data.abstract || "",
      url: data.url || "",
      status: "published",
    });
    setDialogOpen(true);
    toast({ title: "Metadata imported", description: "Review and edit before saving." });
  }

  if (isLoading) return <p className="text-sm text-muted-foreground py-8">Loading publications...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl font-bold text-foreground">Publications</h2>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setImportOpen(true)} data-testid="button-import-publication">
            <Download className="h-3.5 w-3.5 mr-1.5" /> Import
          </Button>
          <Button size="sm" onClick={openNew} data-testid="button-new-publication">
            <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Publication
          </Button>
        </div>
      </div>

      <ImportPublicationDialog
        open={importOpen}
        onClose={() => setImportOpen(false)}
        onImport={handleImport}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif">{editing ? "Edit Publication" : "New Publication"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((d) => saveMutation.mutate(d))} className="space-y-4 mt-2">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} data-testid="input-pub-title" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="authors" render={({ field }) => (
                <FormItem><FormLabel>Authors</FormLabel><FormControl><Input placeholder="Smith, J., Doe, A." {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <div className="grid grid-cols-2 gap-3">
                <FormField control={form.control} name="year" render={({ field }) => (
                  <FormItem><FormLabel>Year</FormLabel><FormControl><Input type="number" {...field} onChange={(e) => field.onChange(+e.target.value)} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="type" render={({ field }) => (
                  <FormItem><FormLabel>Type</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        {["journal", "conference", "book-chapter", "preprint", "report"].map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select><FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="venue" render={({ field }) => (
                <FormItem><FormLabel>Venue / Journal</FormLabel><FormControl><Input placeholder="Journal of AI Education" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="abstract" render={({ field }) => (
                <FormItem><FormLabel>Abstract</FormLabel><FormControl><Textarea rows={3} {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="url" render={({ field }) => (
                <FormItem><FormLabel>URL / DOI</FormLabel><FormControl><Input placeholder="https://doi.org/..." {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem><FormLabel>Status</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select><FormMessage />
                </FormItem>
              )} />
              <div className="flex gap-2 pt-2">
                <Button type="submit" disabled={saveMutation.isPending} data-testid="button-save-publication">
                  {saveMutation.isPending ? "Saving..." : "Save"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {pubs.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">No publications yet.</p>
      ) : (
        <div className="space-y-3">
          {pubs.map((pub) => (
            <div key={pub.id} className="flex items-start justify-between gap-4 p-4 rounded-lg border border-card-border bg-card" data-testid={`row-pub-${pub.id}`}>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-[10px] no-default-active-elevate capitalize">{pub.type}</Badge>
                  <span className="text-xs text-muted-foreground">{pub.year}</span>
                  {pub.status === "draft" && <Badge variant="outline" className="text-[10px] no-default-active-elevate border-amber-500/30 text-amber-700">draft</Badge>}
                </div>
                <p className="text-sm font-semibold text-foreground line-clamp-1">{pub.title}</p>
                <p className="text-xs text-muted-foreground">{pub.authors}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => openEdit(pub)} data-testid={`button-edit-pub-${pub.id}`}>
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive" onClick={() => deleteMutation.mutate(pub.id)} data-testid={`button-delete-pub-${pub.id}`}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Members tab ───────────────────────────────────────────────────────────────
type MemberFormValues = {
  displayName: string;
  affiliation: string;
  bio: string;
  researchInterests: string;
  websiteUrl: string;
  linkedinUrl: string;
  scholarUrl: string;
  isPublic: boolean;
  role: "member" | "admin";
};

function MembersTab() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [editingMember, setEditingMember] = useState<AdminMember | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: members = [], isLoading } = useQuery<AdminMember[]>({
    queryKey: ["/api/admin/members"],
  });

  const memberForm = useForm<MemberFormValues>({
    defaultValues: {
      displayName: "",
      affiliation: "",
      bio: "",
      researchInterests: "",
      websiteUrl: "",
      linkedinUrl: "",
      scholarUrl: "",
      isPublic: false,
      role: "member",
    },
  });

  function openEdit(m: AdminMember) {
    setEditingMember(m);
    memberForm.reset({
      displayName: m.displayName || "",
      affiliation: m.affiliation || "",
      bio: m.bio || "",
      researchInterests: m.researchInterests || "",
      websiteUrl: m.websiteUrl || "",
      linkedinUrl: m.linkedinUrl || "",
      scholarUrl: m.scholarUrl || "",
      isPublic: m.isPublic ?? false,
      role: (m.role === "admin" ? "admin" : "member") as "member" | "admin",
    });
    setDialogOpen(true);
  }

  const saveMutation = useMutation({
    mutationFn: async (data: MemberFormValues) => {
      await apiRequest("PUT", `/api/admin/members/${editingMember!.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/members"] });
      queryClient.invalidateQueries({ queryKey: ["/api/members"] });
      toast({ title: "Member updated" });
      setDialogOpen(false);
    },
    onError: (err: any) => toast({ variant: "destructive", title: "Error", description: err.message }),
  });

  if (isLoading) return <p className="text-sm text-muted-foreground py-8">Loading members...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl font-bold text-foreground">Members</h2>
        <Badge variant="secondary" className="no-default-active-elevate">{members.length} total</Badge>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif">
              Edit Member — {editingMember?.username}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={memberForm.handleSubmit((d) => saveMutation.mutate(d))} className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Display Name</label>
                <Input {...memberForm.register("displayName")} data-testid="input-member-display-name" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Affiliation</label>
                <Input {...memberForm.register("affiliation")} data-testid="input-member-affiliation" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Bio</label>
              <Textarea rows={3} {...memberForm.register("bio")} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Research Interests</label>
              <Textarea rows={2} {...memberForm.register("researchInterests")} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Website URL</label>
                <Input type="url" {...memberForm.register("websiteUrl")} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">LinkedIn URL</label>
                <Input type="url" {...memberForm.register("linkedinUrl")} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Scholar URL</label>
                <Input type="url" {...memberForm.register("scholarUrl")} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Role</label>
                <select
                  {...memberForm.register("role")}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                  data-testid="select-member-role"
                >
                  <option value="member">member</option>
                  <option value="admin">admin</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border border-card-border bg-card">
              <Switch
                checked={memberForm.watch("isPublic")}
                onCheckedChange={(v) => memberForm.setValue("isPublic", v)}
                data-testid="switch-member-public"
              />
              <div>
                <p className="text-sm font-medium">Show in member directory</p>
                <p className="text-xs text-muted-foreground">Appears publicly on the People page</p>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button type="submit" disabled={saveMutation.isPending} data-testid="button-save-member">
                {saveMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {members.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">No members yet.</p>
      ) : (
        <div className="space-y-2">
          {members.map((m) => (
            <div
              key={m.id}
              className="flex items-center justify-between gap-4 p-4 rounded-lg border border-card-border bg-card"
              data-testid={`row-member-${m.id}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary font-serif">
                  {m.displayName.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{m.displayName}</p>
                  <p className="text-xs text-muted-foreground">@{m.username}</p>
                  {m.affiliation && (
                    <p className="text-xs text-muted-foreground/70 truncate">{m.affiliation}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge
                  variant="outline"
                  className={`text-[10px] no-default-active-elevate capitalize ${m.role === "admin" ? "border-primary/30 text-primary" : ""}`}
                >
                  {m.role}
                </Badge>
                {m.isPublic && (
                  <Badge variant="outline" className="text-[10px] no-default-active-elevate border-emerald-500/30 text-emerald-700 dark:text-emerald-400">
                    public
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => openEdit(m)}
                  data-testid={`button-edit-member-${m.id}`}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── CMS Content tab ───────────────────────────────────────────────────────────
const CMS_FIELDS = [
  { section: "hero", key: "headline", label: "Hero Headline", type: "textarea" },
  { section: "hero", key: "subheadline", label: "Hero Subheadline", type: "textarea" },
  { section: "about", key: "mission_text", label: "Mission Statement", type: "textarea" },
  { section: "research", key: "overview_text", label: "Research Overview Text", type: "textarea" },
  { section: "collaborate", key: "headline", label: "Collaborate Page Headline", type: "input" },
  { section: "contact", key: "description", label: "Contact Page Description", type: "textarea" },
];

function ContentTab() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [values, setValues] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const { data: cms = {} } = useQuery<Record<string, Record<string, string>>>({
    queryKey: ["/api/cms"],
  });

  useEffect(() => {
    const merged: Record<string, string> = {};
    for (const { section, key } of CMS_FIELDS) {
      merged[`${section}::${key}`] = cms[section]?.[key] || "";
    }
    setValues(merged);
  }, [cms]);

  const saveMutation = useMutation({
    mutationFn: async ({ section, key, value }: { section: string; key: string; value: string }) => {
      await apiRequest("PUT", `/api/cms/${section}/${key}`, { value });
    },
    onSuccess: (_d, vars) => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms"] });
      setSaved((prev) => ({ ...prev, [`${vars.section}::${vars.key}`]: true }));
      setTimeout(() => setSaved((prev) => ({ ...prev, [`${vars.section}::${vars.key}`]: false })), 2000);
    },
    onError: () => toast({ variant: "destructive", title: "Save failed" }),
  });

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-serif text-xl font-bold text-foreground">Site Content</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Override key text fields across the site. Leave blank to use the default content.
        </p>
      </div>
      <div className="space-y-6">
        {CMS_FIELDS.map(({ section, key, label, type }) => {
          const fieldKey = `${section}::${key}`;
          return (
            <div key={fieldKey} className="space-y-1.5" data-testid={`cms-field-${fieldKey}`}>
              <label className="text-sm font-medium text-foreground">{label}</label>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{section} / {key}</p>
              {type === "textarea" ? (
                <Textarea
                  rows={3}
                  value={values[fieldKey] || ""}
                  onChange={(e) => setValues((prev) => ({ ...prev, [fieldKey]: e.target.value }))}
                  data-testid={`input-cms-${fieldKey}`}
                />
              ) : (
                <Input
                  value={values[fieldKey] || ""}
                  onChange={(e) => setValues((prev) => ({ ...prev, [fieldKey]: e.target.value }))}
                  data-testid={`input-cms-${fieldKey}`}
                />
              )}
              <Button
                size="sm"
                variant={saved[fieldKey] ? "secondary" : "outline"}
                onClick={() => saveMutation.mutate({ section, key, value: values[fieldKey] || "" })}
                disabled={saveMutation.isPending}
                data-testid={`button-save-cms-${fieldKey}`}
              >
                {saved[fieldKey] ? "Saved!" : "Save"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Admin page ────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [, navigate] = useLocation();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!user) navigate("/login");
      else if (user.role !== "admin") navigate("/portal");
    }
  }, [user, isLoading]);

  if (isLoading || !user || user.role !== "admin") return null;

  return (
    <div className="space-y-0">
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
          Administration
        </p>
        <h1 className="font-serif text-4xl font-bold text-foreground mb-1">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">Manage submissions, events, publications, members, and site content.</p>
      </div>

      <Tabs defaultValue="submissions" data-testid="admin-tabs">
        <TabsList className="mb-8">
          <TabsTrigger value="submissions" data-testid="tab-submissions">Submissions</TabsTrigger>
          <TabsTrigger value="events" data-testid="tab-events">Events</TabsTrigger>
          <TabsTrigger value="publications" data-testid="tab-publications">Publications</TabsTrigger>
          <TabsTrigger value="members" data-testid="tab-members">Members</TabsTrigger>
          <TabsTrigger value="content" data-testid="tab-content">Content</TabsTrigger>
        </TabsList>
        <TabsContent value="submissions"><SubmissionsTab /></TabsContent>
        <TabsContent value="events"><EventsTab /></TabsContent>
        <TabsContent value="publications"><PublicationsTab /></TabsContent>
        <TabsContent value="members"><MembersTab /></TabsContent>
        <TabsContent value="content"><ContentTab /></TabsContent>
      </Tabs>
    </div>
  );
}
