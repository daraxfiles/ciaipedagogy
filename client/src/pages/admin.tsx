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
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertEventSchema, insertPublicationSchema } from "@shared/schema";
import type { Submission, Event, Publication } from "@shared/schema";
import { z } from "zod";
import { Trash2, Pencil, Plus } from "lucide-react";

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

// ── Events tab ───────────────────────────────────────────────────────────────
const eventFormSchema = insertEventSchema.extend({
  rsvpEnabled: z.boolean().default(false),
});

function EventsTab() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);

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
        <div className="space-y-3">
          {evts.map((evt) => (
            <div key={evt.id} className="flex items-start justify-between gap-4 p-4 rounded-lg border border-card-border bg-card" data-testid={`row-event-${evt.id}`}>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-accent-foreground">{evt.date}</span>
                  <Badge variant="outline" className="text-[10px] no-default-active-elevate capitalize">{evt.status}</Badge>
                  {evt.rsvpEnabled && <Badge variant="outline" className="text-[10px] no-default-active-elevate border-emerald-500/30 text-emerald-700 dark:text-emerald-400">RSVPs on</Badge>}
                </div>
                <p className="text-sm font-semibold text-foreground">{evt.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">{evt.description}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => openEdit(evt)} data-testid={`button-edit-event-${evt.id}`}>
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive" onClick={() => deleteMutation.mutate(evt.id)} data-testid={`button-delete-event-${evt.id}`}>
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

// ── Publications tab ──────────────────────────────────────────────────────────
const pubFormSchema = insertPublicationSchema;

function PublicationsTab() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
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

  if (isLoading) return <p className="text-sm text-muted-foreground py-8">Loading publications...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl font-bold text-foreground">Publications</h2>
        <Button size="sm" onClick={openNew} data-testid="button-new-publication">
          <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Publication
        </Button>
      </div>

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
        <p className="text-sm text-muted-foreground">Manage submissions, events, publications, and site content.</p>
      </div>

      <Tabs defaultValue="submissions" data-testid="admin-tabs">
        <TabsList className="mb-8">
          <TabsTrigger value="submissions" data-testid="tab-submissions">Submissions</TabsTrigger>
          <TabsTrigger value="events" data-testid="tab-events">Events</TabsTrigger>
          <TabsTrigger value="publications" data-testid="tab-publications">Publications</TabsTrigger>
          <TabsTrigger value="content" data-testid="tab-content">Content</TabsTrigger>
        </TabsList>
        <TabsContent value="submissions"><SubmissionsTab /></TabsContent>
        <TabsContent value="events"><EventsTab /></TabsContent>
        <TabsContent value="publications"><PublicationsTab /></TabsContent>
        <TabsContent value="content"><ContentTab /></TabsContent>
      </Tabs>
    </div>
  );
}
