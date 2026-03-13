import { db } from "./db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";
import type { User, InsertUser } from "@shared/schema";

export interface ProfileUpdate {
  displayName?: string;
  bio?: string;
  affiliation?: string;
  researchInterests?: string;
  websiteUrl?: string;
  linkedinUrl?: string;
  scholarUrl?: string;
  profileImageUrl?: string;
  isPublic?: boolean;
}

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserRole(id: number, role: string): Promise<User | undefined>;
  updateUserProfile(id: number, data: ProfileUpdate): Promise<User | undefined>;
  getPublicMembers(): Promise<User[]>;
  getAllUsers(): Promise<User[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUserRole(id: number, role: string): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ role })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async updateUserProfile(id: number, data: ProfileUpdate): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async getPublicMembers(): Promise<User[]> {
    return db.select().from(users).where(eq(users.isPublic, true));
  }

  async getAllUsers(): Promise<User[]> {
    return db.select().from(users);
  }
}

export const storage = new DatabaseStorage();
