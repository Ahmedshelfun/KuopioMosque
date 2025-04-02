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
} from "@shared/schema";

// Import PgStorage implementation
import { PgStorage } from "./pg-storage";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Prayer times methods
  getPrayerTimesByDate(date: string): Promise<PrayerTime | undefined>;
  createPrayerTime(prayerTime: InsertPrayerTime): Promise<PrayerTime>;
  
  // Events methods
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  getFeaturedEvent(): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  // News methods
  getNews(): Promise<News[]>;
  getNewsItem(id: number): Promise<News | undefined>;
  createNewsItem(news: InsertNews): Promise<News>;
  
  // Contact methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private prayerTimes: Map<string, PrayerTime>; // Key is date string YYYY-MM-DD
  private events: Map<number, Event>;
  private newsItems: Map<number, News>;
  private contactMessages: Map<number, ContactMessage>;
  
  private currentUserId: number;
  private currentEventId: number;
  private currentNewsId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.prayerTimes = new Map();
    this.events = new Map();
    this.newsItems = new Map();
    this.contactMessages = new Map();
    
    this.currentUserId = 1;
    this.currentEventId = 1;
    this.currentNewsId = 1;
    this.currentContactId = 1;
    
    // Initialize with sample data
    this.initSampleData();
  }

  private initSampleData() {
    // Sample events
    const sampleEvents: InsertEvent[] = [
      {
        title: "Eid al-Adha Celebration",
        description: "Join us for the Eid al-Adha prayer and celebration. The event includes prayer service, a community feast, activities for children, and distribution of meat to the community.",
        date: "July 28, 2023",
        time_range: "9:00 AM - 2:00 PM",
        location: "Kuopio Islamic Center",
        type: "Featured",
        is_featured: true,
        image_url: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Quran Study Circle",
        description: "Weekly gathering to study and discuss Quranic verses and their meanings in today's context.",
        date: "Every Wednesday",
        time_range: "6:30 PM - 8:00 PM",
        location: "Kuopio Islamic Center",
        type: "Weekly",
        is_featured: false,
      },
      {
        title: "Finnish Language Class",
        description: "Free Finnish language classes for community members. All levels welcome.",
        date: "July 18, 2023",
        time_range: "5:00 PM - 6:30 PM",
        location: "Kuopio Islamic Center",
        type: "Bi-weekly",
        is_featured: false,
      },
      {
        title: "Youth Sports Day",
        description: "Sports activities for children and teenagers at the local park. Football, volleyball, and more.",
        date: "July 23, 2023",
        time_range: "10:00 AM - 3:00 PM",
        location: "City Park",
        type: "Special",
        is_featured: false,
      },
      {
        title: "Community Dinner",
        description: "Monthly community dinner featuring dishes from various Muslim cultures.",
        date: "July 30, 2023",
        time_range: "6:00 PM - 8:30 PM",
        location: "Kuopio Islamic Center",
        type: "Monthly",
        is_featured: false,
      },
    ];
    
    // Add events to store
    sampleEvents.forEach(event => this.createEvent(event));
    
    // Sample news
    const sampleNews: InsertNews[] = [
      {
        title: "Eid Prayer Announcement",
        content: "Eid al-Adha prayer will be held at the mosque on July 28, 2023, at 9:00 AM. Please arrive early as we expect a large attendance.",
        image_url: "https://images.unsplash.com/photo-1621352404112-58e2468993a0?auto=format&fit=crop&w=600&q=80",
        author: "Imam Ahmed",
      },
      {
        title: "Mosque Renovation Update",
        content: "The renovation of the prayer hall will be completed by mid-August. Thank you for your patience and continued support.",
        image_url: "https://images.unsplash.com/photo-1606766125414-73cf89d8bbf2?auto=format&fit=crop&w=600&q=80",
        author: "Construction Committee",
      },
      {
        title: "Donation Goal Reached",
        content: "Thanks to your generosity, we have reached our fundraising goal for the new children's education center. Construction will begin next month.",
        image_url: "https://images.unsplash.com/photo-1577896851887-663e75df029d?auto=format&fit=crop&w=600&q=80",
        author: "Fundraising Committee",
      },
    ];
    
    // Add news to store
    sampleNews.forEach(news => this.createNewsItem(news));
    
    // Sample prayer times for today
    const today = new Date();
    const prayerTime: InsertPrayerTime = {
      date: today.toISOString().split('T')[0],
      fajr_begins: "03:14",
      fajr_iqamah: "03:45",
      sunrise: "04:30",
      dhuhr_begins: "13:15",
      dhuhr_iqamah: "13:30",
      asr_begins: "17:45",
      asr_iqamah: "18:00",
      maghrib_begins: "22:10",
      maghrib_iqamah: "22:20",
      isha_begins: "23:45",
      isha_iqamah: "00:00",
      jummah_khutbah: "13:15",
      jummah_iqamah: "13:30",
    };
    
    this.createPrayerTime(prayerTime);
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Prayer times methods
  async getPrayerTimesByDate(date: string): Promise<PrayerTime | undefined> {
    return this.prayerTimes.get(date);
  }
  
  async createPrayerTime(prayerTime: InsertPrayerTime): Promise<PrayerTime> {
    const dateStr = prayerTime.date.toString();
    const id = this.prayerTimes.size + 1;
    const newPrayerTime: PrayerTime = { ...prayerTime, id };
    this.prayerTimes.set(dateStr, newPrayerTime);
    return newPrayerTime;
  }
  
  // Events methods
  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values())
      .filter(event => !event.is_featured)
      .sort((a, b) => b.id - a.id);
  }
  
  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }
  
  async getFeaturedEvent(): Promise<Event | undefined> {
    return Array.from(this.events.values()).find(event => event.is_featured);
  }
  
  async createEvent(event: InsertEvent): Promise<Event> {
    const id = this.currentEventId++;
    const created_at = new Date();
    const newEvent: Event = { ...event, id, created_at };
    this.events.set(id, newEvent);
    return newEvent;
  }
  
  // News methods
  async getNews(): Promise<News[]> {
    return Array.from(this.newsItems.values())
      .sort((a, b) => b.id - a.id);
  }
  
  async getNewsItem(id: number): Promise<News | undefined> {
    return this.newsItems.get(id);
  }
  
  async createNewsItem(news: InsertNews): Promise<News> {
    const id = this.currentNewsId++;
    const created_at = new Date();
    const newNews: News = { ...news, id, created_at };
    this.newsItems.set(id, newNews);
    return newNews;
  }
  
  // Contact methods
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactId++;
    const created_at = new Date();
    const newMessage: ContactMessage = { ...message, id, created_at };
    this.contactMessages.set(id, newMessage);
    return newMessage;
  }
}

// Initialize storage with PostgreSQL implementation
export const storage = new PgStorage();
