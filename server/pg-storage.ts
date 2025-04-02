import { eq, desc } from "drizzle-orm";
import { db } from "./db";
import {
  User,
  InsertUser,
  PrayerTime,
  InsertPrayerTime,
  Event,
  InsertEvent,
  News,
  InsertNews,
  ContactMessage,
  InsertContactMessage,
  users,
  prayerTimes,
  events,
  news,
  contactMessages,
} from "@shared/schema";
import { IStorage } from "./storage";

export class PgStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  // Prayer times methods
  async getPrayerTimesByDate(date: string): Promise<PrayerTime | undefined> {
    const result = await db.select().from(prayerTimes).where(eq(prayerTimes.date, date));
    return result[0];
  }

  async createPrayerTime(prayerTime: InsertPrayerTime): Promise<PrayerTime> {
    const result = await db.insert(prayerTimes).values(prayerTime).returning();
    return result[0];
  }

  // Events methods
  async getEvents(): Promise<Event[]> {
    return await db
      .select()
      .from(events)
      .where(eq(events.is_featured, false))
      .orderBy(desc(events.id));
  }

  async getEvent(id: number): Promise<Event | undefined> {
    const result = await db.select().from(events).where(eq(events.id, id));
    return result[0];
  }

  async getFeaturedEvent(): Promise<Event | undefined> {
    const result = await db.select().from(events).where(eq(events.is_featured, true));
    return result[0];
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const result = await db.insert(events).values(event).returning();
    return result[0];
  }

  // News methods
  async getNews(): Promise<News[]> {
    return await db.select().from(news).orderBy(desc(news.id));
  }

  async getNewsItem(id: number): Promise<News | undefined> {
    const result = await db.select().from(news).where(eq(news.id, id));
    return result[0];
  }

  async createNewsItem(newsItem: InsertNews): Promise<News> {
    const result = await db.insert(news).values(newsItem).returning();
    return result[0];
  }

  // Contact methods
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const result = await db.insert(contactMessages).values(message).returning();
    return result[0];
  }
}