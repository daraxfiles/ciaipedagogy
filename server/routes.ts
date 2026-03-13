import type { Express } from "express";
import { createServer, type Server } from "http";
import bcrypt from "bcryptjs";
import { db } from "./db";
import { storage } from "./storage";
import { requireAuth, requireAdmin } from "./auth-middleware";
import {
  formSubmissions,
  events,
  eventRsvps,
  publications,
  comments,
  cmsOverrides,
  insertSubmissionSchema,
  insertEventSchema,
  insertPublicationSchema,
  insertCommentSchema,
  registerSchema,
  loginSchema,
} from "@shared/schema";
import { eq, and, desc } from "drizzle-orm";

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {

  // ── Auth ───────────────────────────────────────────────────────────────────

  app.post("/api/auth/register", async (req, res) => {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.errors[0].message });
    }
    const { email, username, password, displayName } = parsed.data;

    const existing = await storage.getUserByEmail(email);
    if (existing) return res.status(409).json({ message: "Email already registered" });

    const existingName = await storage.getUserByUsername(username);
    if (existingName) return res.status(409).json({ message: "Username already taken" });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await storage.createUser({ email, username, passwordHash, displayName });

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

  app.post("/api/auth/login", async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const { email, password } = parsed.data;

    const user = await storage.getUserByEmail(email);
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ message: "Invalid email or password" });

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

  // ── Form Submissions ───────────────────────────────────────────────────────

  app.post("/api/submissions", async (req, res) => {
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

  // ── Comments ──────────────────────────────────────────────────────────────

  app.get("/api/comments/:contentType/:contentId", async (req, res) => {
    const { contentType, contentId } = req.params;
    const rows = await db
      .select({
        id: comments.id,
        text: comments.text,
        createdAt: comments.createdAt,
        userId: comments.userId,
        contentType: comments.contentType,
        contentId: comments.contentId,
      })
      .from(comments)
      .where(
        and(
          eq(comments.contentType, contentType),
          eq(comments.contentId, parseInt(contentId)),
        )
      )
      .orderBy(desc(comments.createdAt));
    return res.json(rows);
  });

  app.post("/api/comments", requireAuth, async (req, res) => {
    const parsed = insertCommentSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.errors[0].message });
    }
    const [comment] = await db
      .insert(comments)
      .values({ ...parsed.data, userId: req.session.userId! })
      .returning();
    return res.status(201).json(comment);
  });

  app.delete("/api/comments/:id", requireAuth, async (req, res) => {
    const id = parseInt(String(req.params.id));
    const userId = req.session.userId!;
    const role = req.session.role;

    const [comment] = await db.select().from(comments).where(eq(comments.id, id));
    if (!comment) return res.status(404).json({ message: "Not found" });

    if (comment.userId !== userId && role !== "admin") {
      return res.status(403).json({ message: "Not allowed" });
    }

    await db.delete(comments).where(eq(comments.id, id));
    return res.json({ message: "Deleted" });
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
