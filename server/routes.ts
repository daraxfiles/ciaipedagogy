import type { Express } from "express";
import { createServer, type Server } from "http";
import bcrypt from "bcryptjs";
import { z } from "zod";
import rateLimit from "express-rate-limit";
import { db } from "./db";
import { storage } from "./storage";
import { requireAuth, requireAdmin } from "./auth-middleware";
import {
  formSubmissions,
  events,
  eventRsvps,
  publications,
  cmsOverrides,
  users,
  insertSubmissionSchema,
  insertEventSchema,
  insertPublicationSchema,
  loginSchema,
} from "@shared/schema";
import { eq, and, desc } from "drizzle-orm";

// ── BibTeX parser ─────────────────────────────────────────────────────────────
function parseBibtex(raw: string): Record<string, string> | null {
  const typeMatch = raw.match(/@(\w+)\s*\{/i);
  if (!typeMatch) return null;
  const entryType = typeMatch[1].toLowerCase();

  const fields: Record<string, string> = { _type: entryType };
  const fieldRegex = /(\w+)\s*=\s*[\{"']?([\s\S]*?)[\}"']?\s*(?:,\s*(?=\w+\s*=)|(?=\}))/g;
  let m: RegExpExecArray | null;
  const inner = raw.slice(raw.indexOf("{") + 1);
  const stripped = inner.replace(/^\s*[\w:-]+\s*,\s*/, ""); // strip citekey
  const fieldMatch = /(\w+)\s*=\s*(?:\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}|"([^"]*)"|(\d+))/g;
  while ((m = fieldMatch.exec(stripped)) !== null) {
    const key = m[1].toLowerCase();
    const value = (m[2] ?? m[3] ?? m[4] ?? "").replace(/\s+/g, " ").trim();
    fields[key] = value;
  }
  return fields;
}

function bibtexTypeToPublication(t: string): string {
  const map: Record<string, string> = {
    article: "journal",
    inproceedings: "conference",
    proceedings: "conference",
    incollection: "book-chapter",
    techreport: "report",
    misc: "preprint",
    unpublished: "preprint",
  };
  return map[t] || "journal";
}

// ── DOI → Crossref mapper ─────────────────────────────────────────────────────
function crossrefTypeToPublication(t: string): string {
  const map: Record<string, string> = {
    "journal-article": "journal",
    "proceedings-article": "conference",
    "book-chapter": "book-chapter",
    "posted-content": "preprint",
    report: "report",
  };
  return map[t] || "journal";
}

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {

  // ── Rate limiters ──────────────────────────────────────────────────────────

  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many attempts. Please try again in 15 minutes." },
  });

  const formLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many submissions. Please try again later." },
  });

  // ── Auth ───────────────────────────────────────────────────────────────────

  app.post("/api/auth/register", authLimiter, async (req, res) => {
    const schema = z.object({
      username: z.string().min(3, "Username must be at least 3 characters").max(50),
      password: z.string().min(8, "Password must be at least 8 characters"),
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.errors[0].message });
    }
    const { username, password } = parsed.data;

    const existingName = await storage.getUserByUsername(username);
    if (existingName) return res.status(409).json({ message: "Username already taken" });

    const email = `${username}@network.local`;
    const existingEmail = await storage.getUserByEmail(email);
    if (existingEmail) return res.status(409).json({ message: "Username already taken" });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await storage.createUser({ email, username, passwordHash, displayName: username });

    req.session.userId = user.id;
    req.session.role = user.role;
    req.session.displayName = user.displayName;
    req.session.email = user.email;

    return res.status(201).json({
      id: user.id,
      email: user.email,
      username: user.username,
      displayName: user.displayName,
      role: user.role,
    });
  });

  app.post("/api/auth/login", authLimiter, async (req, res) => {
    const schema = z.object({
      email: z.string().min(1, "Required"),
      password: z.string().min(1),
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const { email: identifier, password } = parsed.data;

    let user = await storage.getUserByEmail(identifier);
    if (!user && !identifier.includes("@")) {
      user = await storage.getUserByUsername(identifier);
    }
    if (!user) return res.status(401).json({ message: "Invalid username or password" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ message: "Invalid username or password" });

    req.session.userId = user.id;
    req.session.role = user.role;
    req.session.displayName = user.displayName;
    req.session.email = user.email;

    return res.json({
      id: user.id,
      email: user.email,
      username: user.username,
      displayName: user.displayName,
      role: user.role,
    });
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy(() => {});
    res.clearCookie("connect.sid");
    return res.json({ message: "Logged out" });
  });

  app.get("/api/auth/me", (req, res) => {
    if (!req.session?.userId) return res.json(null);
    return res.json({
      id: req.session.userId,
      role: req.session.role,
      displayName: req.session.displayName,
      email: req.session.email,
    });
  });

  // ── Member Directory (public) ──────────────────────────────────────────────

  app.get("/api/members", async (_req, res) => {
    const members = await storage.getPublicMembers();
    const safe = members.map(({ passwordHash: _, ...m }) => m);
    return res.json(safe);
  });

  app.get("/api/members/:username", async (req, res) => {
    const user = await storage.getUserByUsername(req.params.username);
    if (!user || !user.isPublic) return res.status(404).json({ message: "Member not found" });
    const { passwordHash: _, ...safe } = user;
    return res.json(safe);
  });

  // ── Profile (authenticated user edits own profile) ─────────────────────────

  app.get("/api/profile", requireAuth, async (req, res) => {
    const user = await storage.getUser(req.session.userId!);
    if (!user) return res.status(404).json({ message: "User not found" });
    const { passwordHash: _, ...safe } = user;
    return res.json(safe);
  });

  app.put("/api/profile", requireAuth, async (req, res) => {
    const schema = z.object({
      displayName: z.string().min(1).max(100).optional(),
      bio: z.string().max(1000).optional(),
      affiliation: z.string().max(200).optional(),
      researchInterests: z.string().max(500).optional(),
      websiteUrl: z.string().url().optional().or(z.literal("")),
      linkedinUrl: z.string().url().optional().or(z.literal("")),
      scholarUrl: z.string().url().optional().or(z.literal("")),
      profileImageUrl: z.string().url().optional().or(z.literal("")),
      isPublic: z.boolean().optional(),
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.errors[0].message });
    }
    const updated = await storage.updateUserProfile(req.session.userId!, parsed.data);
    if (!updated) return res.status(404).json({ message: "User not found" });

    // Keep session displayName in sync
    if (parsed.data.displayName) {
      req.session.displayName = parsed.data.displayName;
    }

    const { passwordHash: _, ...safe } = updated;
    return res.json(safe);
  });

  // ── Admin — Members ────────────────────────────────────────────────────────

  app.get("/api/admin/members", requireAdmin, async (_req, res) => {
    const all = await storage.getAllUsers();
    const safe = all.map(({ passwordHash: _, ...u }) => u);
    return res.json(safe);
  });

  app.put("/api/admin/members/:id", requireAdmin, async (req, res) => {
    const id = parseInt(String(req.params.id));
    const schema = z.object({
      displayName: z.string().min(1).max(100).optional(),
      bio: z.string().max(1000).optional(),
      affiliation: z.string().max(200).optional(),
      researchInterests: z.string().max(500).optional(),
      websiteUrl: z.string().url().optional().or(z.literal("")),
      linkedinUrl: z.string().url().optional().or(z.literal("")),
      scholarUrl: z.string().url().optional().or(z.literal("")),
      profileImageUrl: z.string().url().optional().or(z.literal("")),
      isPublic: z.boolean().optional(),
      role: z.enum(["member", "admin"]).optional(),
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.errors[0].message });
    }
    const { role, ...profileData } = parsed.data;
    let updated = await storage.updateUserProfile(id, profileData);
    if (role && updated) {
      updated = await storage.updateUserRole(id, role) ?? updated;
    }
    if (!updated) return res.status(404).json({ message: "User not found" });
    const { passwordHash: _, ...safe } = updated;
    return res.json(safe);
  });

  // ── Admin — Import (DOI / BibTeX) ──────────────────────────────────────────

  app.post("/api/admin/import/doi", requireAdmin, async (req, res) => {
    const { doi } = req.body;
    if (!doi || typeof doi !== "string") {
      return res.status(400).json({ message: "DOI is required" });
    }
    const clean = doi.replace(/^https?:\/\/doi\.org\//i, "").trim();
    if (!clean) return res.status(400).json({ message: "Invalid DOI" });

    try {
      const response = await fetch(`https://api.crossref.org/works/${encodeURIComponent(clean)}`, {
        headers: { "User-Agent": "CriticalAIPedagogy/1.0 (mailto:admin@example.com)" },
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) {
        return res.status(404).json({ message: `DOI not found (Crossref returned ${response.status})` });
      }
      const data: any = await response.json();
      const msg = data.message;

      const authors = (msg.author || [])
        .map((a: any) => [a.family, a.given].filter(Boolean).join(", "))
        .join("; ");

      const year = msg.published?.["date-parts"]?.[0]?.[0]
        ?? msg["published-print"]?.["date-parts"]?.[0]?.[0]
        ?? msg["published-online"]?.["date-parts"]?.[0]?.[0]
        ?? new Date().getFullYear();

      const title = Array.isArray(msg.title) ? msg.title[0] : (msg.title ?? "");
      const venue = Array.isArray(msg["container-title"]) ? msg["container-title"][0] : (msg["container-title"] ?? "");
      const abstract = (msg.abstract ?? "").replace(/<[^>]*>/g, "").trim();
      const url = msg.URL ?? `https://doi.org/${clean}`;
      const type = crossrefTypeToPublication(msg.type ?? "");

      return res.json({ title, authors, year, type, venue, abstract, url });
    } catch (err: any) {
      if (err?.name === "TimeoutError") {
        return res.status(504).json({ message: "Crossref request timed out. Please try again." });
      }
      return res.status(500).json({ message: "Failed to fetch DOI metadata" });
    }
  });

  app.post("/api/admin/import/bibtex", requireAdmin, async (req, res) => {
    const { bibtex } = req.body;
    if (!bibtex || typeof bibtex !== "string") {
      return res.status(400).json({ message: "BibTeX input is required" });
    }
    const fields = parseBibtex(bibtex);
    if (!fields) {
      return res.status(400).json({ message: "Could not parse BibTeX entry. Make sure it starts with @type{..." });
    }

    const entryType = fields._type ?? "article";
    const type = bibtexTypeToPublication(entryType);

    const title = fields.title ?? "";
    const rawAuthors = fields.author ?? fields.authors ?? "";
    const authors = rawAuthors.replace(/\s+and\s+/gi, "; ");
    const year = parseInt(fields.year ?? String(new Date().getFullYear())) || new Date().getFullYear();
    const venue = fields.journal ?? fields.booktitle ?? fields.publisher ?? "";
    const abstract = fields.abstract ?? "";
    const doi = fields.doi ?? "";
    const url = fields.url ?? (doi ? `https://doi.org/${doi}` : "");

    if (!title) return res.status(400).json({ message: "Could not extract title from BibTeX" });

    return res.json({ title, authors, year, type, venue, abstract, url });
  });

  // ── Form Submissions ───────────────────────────────────────────────────────

  app.post("/api/submissions", formLimiter, async (req, res) => {
    if (req.body.website) {
      return res.status(201).json({ ok: true });
    }
    const parsed = insertSubmissionSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.errors[0].message });
    }
    const [sub] = await db.insert(formSubmissions).values(parsed.data).returning();
    return res.status(201).json(sub);
  });

  app.get("/api/submissions", requireAdmin, async (_req, res) => {
    const subs = await db
      .select()
      .from(formSubmissions)
      .orderBy(desc(formSubmissions.createdAt));
    return res.json(subs);
  });

  app.patch("/api/submissions/:id/status", requireAdmin, async (req, res) => {
    const id = parseInt(String(req.params.id));
    const { status } = req.body;
    if (!["new", "read", "archived"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const [sub] = await db
      .update(formSubmissions)
      .set({ status })
      .where(eq(formSubmissions.id, id))
      .returning();
    return res.json(sub);
  });

  // ── Events ────────────────────────────────────────────────────────────────

  app.get("/api/events", async (_req, res) => {
    const evts = await db.select().from(events).orderBy(desc(events.createdAt));
    return res.json(evts);
  });

  app.post("/api/events", requireAdmin, async (req, res) => {
    const parsed = insertEventSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.errors[0].message });
    }
    const [evt] = await db.insert(events).values(parsed.data).returning();
    return res.status(201).json(evt);
  });

  app.put("/api/events/:id", requireAdmin, async (req, res) => {
    const id = parseInt(String(req.params.id));
    const parsed = insertEventSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.errors[0].message });
    }
    const [evt] = await db
      .update(events)
      .set(parsed.data)
      .where(eq(events.id, id))
      .returning();
    return res.json(evt);
  });

  app.delete("/api/events/:id", requireAdmin, async (req, res) => {
    const id = parseInt(String(req.params.id));
    await db.delete(events).where(eq(events.id, id));
    return res.json({ message: "Deleted" });
  });

  // ── Event RSVPs ───────────────────────────────────────────────────────────

  app.post("/api/events/:id/rsvp", requireAuth, async (req, res) => {
    const eventId = parseInt(String(req.params.id));
    const userId = req.session.userId!;

    const [evt] = await db.select().from(events).where(eq(events.id, eventId));
    if (!evt) return res.status(404).json({ message: "Event not found" });
    if (!evt.rsvpEnabled) return res.status(400).json({ message: "RSVPs not enabled for this event" });

    const user = await storage.getUser(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    try {
      const [rsvp] = await db.insert(eventRsvps).values({
        eventId,
        userId,
        name: user.displayName,
        email: user.email,
      }).returning();
      return res.status(201).json(rsvp);
    } catch {
      return res.status(409).json({ message: "Already RSVPed to this event" });
    }
  });

  app.delete("/api/events/:id/rsvp", requireAuth, async (req, res) => {
    const eventId = parseInt(String(req.params.id));
    const userId = req.session.userId!;
    await db.delete(eventRsvps).where(
      and(eq(eventRsvps.eventId, eventId), eq(eventRsvps.userId, userId))
    );
    return res.json({ message: "RSVP cancelled" });
  });

  app.get("/api/events/:id/rsvps", requireAdmin, async (req, res) => {
    const eventId = parseInt(String(req.params.id));
    const rsvps = await db.select().from(eventRsvps).where(eq(eventRsvps.eventId, eventId));
    return res.json(rsvps);
  });

  app.get("/api/rsvps/mine", requireAuth, async (req, res) => {
    const userId = req.session.userId!;
    const myRsvps = await db.select().from(eventRsvps).where(eq(eventRsvps.userId, userId));
    return res.json(myRsvps);
  });

  // ── Publications ──────────────────────────────────────────────────────────

  app.get("/api/publications", async (_req, res) => {
    const pubs = await db
      .select()
      .from(publications)
      .where(eq(publications.status, "published"))
      .orderBy(desc(publications.year), desc(publications.createdAt));
    return res.json(pubs);
  });

  app.get("/api/publications/all", requireAdmin, async (_req, res) => {
    const pubs = await db.select().from(publications).orderBy(desc(publications.createdAt));
    return res.json(pubs);
  });

  app.post("/api/publications", requireAdmin, async (req, res) => {
    const parsed = insertPublicationSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.errors[0].message });
    }
    const [pub] = await db
      .insert(publications)
      .values({ ...parsed.data, uploadedBy: req.session.userId })
      .returning();
    return res.status(201).json(pub);
  });

  app.put("/api/publications/:id", requireAdmin, async (req, res) => {
    const id = parseInt(String(req.params.id));
    const parsed = insertPublicationSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.errors[0].message });
    }
    const [pub] = await db
      .update(publications)
      .set(parsed.data)
      .where(eq(publications.id, id))
      .returning();
    return res.json(pub);
  });

  app.delete("/api/publications/:id", requireAdmin, async (req, res) => {
    const id = parseInt(String(req.params.id));
    await db.delete(publications).where(eq(publications.id, id));
    return res.json({ message: "Deleted" });
  });

  // ── Comments — disabled for launch ───────────────────────────────────────
  app.get("/api/comments/:contentType/:contentId", (_req, res) => {
    return res.status(410).json({ message: "Comments are not enabled." });
  });
  app.post("/api/comments", (_req, res) => {
    return res.status(410).json({ message: "Comments are not enabled." });
  });
  app.delete("/api/comments/:id", (_req, res) => {
    return res.status(410).json({ message: "Comments are not enabled." });
  });

  // ── CMS Overrides ─────────────────────────────────────────────────────────

  app.get("/api/cms", async (_req, res) => {
    const overrides = await db.select().from(cmsOverrides);
    const result: Record<string, Record<string, string>> = {};
    for (const row of overrides) {
      if (!result[row.section]) result[row.section] = {};
      result[row.section][row.key] = row.value;
    }
    return res.json(result);
  });

  app.put("/api/cms/:section/:key", requireAdmin, async (req, res) => {
    const section = String(req.params.section);
    const key = String(req.params.key);
    const { value } = req.body;
    if (typeof value !== "string") {
      return res.status(400).json({ message: "Value must be a string" });
    }
    const existing = await db
      .select()
      .from(cmsOverrides)
      .where(and(eq(cmsOverrides.section, section), eq(cmsOverrides.key, key)));
    let override;
    if (existing.length > 0) {
      const [updated] = await db
        .update(cmsOverrides)
        .set({ value, updatedAt: new Date(), updatedBy: req.session.userId })
        .where(and(eq(cmsOverrides.section, section), eq(cmsOverrides.key, key)))
        .returning();
      override = updated;
    } else {
      const [inserted] = await db
        .insert(cmsOverrides)
        .values({ section, key, value, updatedBy: req.session.userId })
        .returning();
      override = inserted;
    }
    return res.json(override);
  });

  app.delete("/api/cms/:section/:key", requireAdmin, async (req, res) => {
    const section = String(req.params.section);
    const key = String(req.params.key);
    await db
      .delete(cmsOverrides)
      .where(and(eq(cmsOverrides.section, section), eq(cmsOverrides.key, key)));
    return res.json({ message: "Deleted" });
  });

  return httpServer;
}
