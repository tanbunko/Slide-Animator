import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  odooUid: integer("odoo_uid"),
  database: text("database"),
  lastLogin: timestamp("last_login").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  lastLogin: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Login request schema
export const loginSchema = z.object({
  url: z.string().url(),
  database: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(1),
});

export type LoginRequest = z.infer<typeof loginSchema>;
