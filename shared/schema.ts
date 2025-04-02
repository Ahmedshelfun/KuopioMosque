import { pgTable, text, serial, timestamp, date, varchar, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema (from template)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Prayer Times schema
export const prayerTimes = pgTable("prayer_times", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(),
  fajr_begins: varchar("fajr_begins", { length: 5 }).notNull(),
  fajr_iqamah: varchar("fajr_iqamah", { length: 5 }),
  sunrise: varchar("sunrise", { length: 5 }).notNull(),
  dhuhr_begins: varchar("dhuhr_begins", { length: 5 }).notNull(),
  dhuhr_iqamah: varchar("dhuhr_iqamah", { length: 5 }),
  asr_begins: varchar("asr_begins", { length: 5 }).notNull(),
  asr_iqamah: varchar("asr_iqamah", { length: 5 }),
  maghrib_begins: varchar("maghrib_begins", { length: 5 }).notNull(),
  maghrib_iqamah: varchar("maghrib_iqamah", { length: 5 }),
  isha_begins: varchar("isha_begins", { length: 5 }).notNull(),
  isha_iqamah: varchar("isha_iqamah", { length: 5 }),
  next_prayer_name: varchar("next_prayer_name", { length: 10 }),
});

export const insertPrayerTimeSchema = createInsertSchema(prayerTimes).omit({
  id: true,
});

// Events schema
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: text("date").notNull(),
  time_range: text("time_range").notNull(),
  type: text("type").notNull(),
  is_featured: boolean("is_featured").default(false),
  image_url: text("image_url"),
  created_at: timestamp("created_at").defaultNow(),
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  created_at: true,
});

// News schema
export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  date: text("date").notNull(),
  image_url: text("image_url").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const insertNewsSchema = createInsertSchema(news).omit({
  id: true,
  created_at: true,
});

// Contact messages schema
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  created_at: true,
});

// Type definitions
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPrayerTime = z.infer<typeof insertPrayerTimeSchema>;
export type PrayerTime = typeof prayerTimes.$inferSelect;

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
