import { pgTable, text, serial, integer, timestamp, boolean, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ── Users ────────────────────────────────────────────────────────────────────
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  displayName: text("display_name").notNull(),
  role: text("role").notNull().default("member"), // 'admin' | 'member'
  bio: text("bio"),
  affiliation: text("affiliation"),
  researchInterests: text("research_interests"),
  websiteUrl: text("website_url"),
  linkedinUrl: text("linkedin_url"),
  scholarUrl: text("scholar_url"),
  profileImageUrl: text("profile_image_url"),
  isPublic: boolean("is_public").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const registerSchema = z.object({
  email: z.string().email("Valid email required"),
  username: z.string().min(3, "Min 3 characters").max(50),
  password: z.string().min(8, "Min 8 characters"),
  displayName: z.string().min(1, "Name required").max(100),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type InsertUser = {
  email: string;
  username: string;
  passwordHash: string;
  displayName: string;
};
export type User = typeof users.$inferSelect;

// ── Form Submissions ─────────────────────────────────────────────────────────
export const formSubmissions = pgTable("form_submissions", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'contact' | 'collaborate'
  name: text("name").notNull(),
  email: text("email").notNull(),
  organization: text("organization"),
  subject: text("subject"),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"), // 'new' | 'read' | 'archived'
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertSubmissionSchema = createInsertSchema(formSubmissions).pick({
  type: true,
  name: true,
  email: true,
  organization: true,
  subject: true,
  message: true,
});
export type InsertSubmission = z.infer<typeof insertSubmissionSchema>;
export type Submission = typeof formSubmissions.$inferSelect;

// ── Events ───────────────────────────────────────────────────────────────────
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  time: text("time"),
  location: text("location"),
  description: text("description").notNull(),
  type: text("type").notNull().default("seminar"),
  status: text("status").notNull().default("upcoming"), // 'upcoming' | 'past' | 'cancelled'
  rsvpEnabled: boolean("rsvp_enabled").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertEventSchema = createInsertSchema(events).omit({ id: true, createdAt: true });
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

// ── Event RSVPs ──────────────────────────────────────────────────────────────
export const eventRsvps = pgTable("event_rsvps", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").notNull().references(() => events.id, { onDelete: "cascade" }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => [unique().on(t.eventId, t.userId)]);

export type Rsvp = typeof eventRsvps.$inferSelect;

// ── Publications ─────────────────────────────────────────────────────────────
export const publications = pgTable("publications", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  authors: text("authors").notNull(),
  year: integer("year").notNull(),
  type: text("type").notNull().default("journal"), // 'journal' | 'conference' | 'book-chapter' | 'preprint' | 'report'
  venue: text("venue"),
  abstract: text("abstract"),
  url: text("url"),
  status: text("status").notNull().default("published"), // 'published' | 'draft'
  uploadedBy: integer("uploaded_by").references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertPublicationSchema = createInsertSchema(publications).omit({
  id: true,
  createdAt: true,
  uploadedBy: true,
});
export type InsertPublication = z.infer<typeof insertPublicationSchema>;
export type Publication = typeof publications.$inferSelect;

// ── Comments ─────────────────────────────────────────────────────────────────
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  contentType: text("content_type").notNull(), // 'event'
  contentId: integer("content_id").notNull(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  text: text("text").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertCommentSchema = createInsertSchema(comments).pick({
  contentType: true,
  contentId: true,
  text: true,
});
export type InsertComment = z.infer<typeof insertCommentSchema>;
export type Comment = typeof comments.$inferSelect;

// ── CMS Overrides ────────────────────────────────────────────────────────────
export const cmsOverrides = pgTable("cms_overrides", {
  id: serial("id").primaryKey(),
  section: text("section").notNull(),
  key: text("key").notNull(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  updatedBy: integer("updated_by").references(() => users.id),
}, (t) => [unique().on(t.section, t.key)]);

export type CmsOverride = typeof cmsOverrides.$inferSelect;
