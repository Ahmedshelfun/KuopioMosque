import { PgStorage } from "./pg-storage";
import { format } from "date-fns";
import { InsertPrayerTime, InsertEvent, InsertNews, InsertUser } from "@shared/schema";

export async function initSampleData() {
  const storage = new PgStorage();
  
  // Create a sample user if none exists
  const existingUser = await storage.getUserByUsername("admin");
  if (!existingUser) {
    const user: InsertUser = {
      username: "admin",
      password: "password", // in a real app, this would be hashed
      name: "Admin User",
      email: "admin@example.com",
      role: "admin"
    };
    await storage.createUser(user);
    console.log("Created sample user");
  }

  // Create sample prayer times for today if none exists
  const today = format(new Date(), "yyyy-MM-dd");
  const existingPrayerTime = await storage.getPrayerTimesByDate(today);
  if (!existingPrayerTime) {
    const prayerTime: InsertPrayerTime = {
      date: today,
      fajr_begins: "05:30",
      fajr_iqamah: "06:00",
      sunrise: "06:45",
      dhuhr_begins: "12:30",
      dhuhr_iqamah: "13:00",
      asr_begins: "16:00",
      asr_iqamah: "16:30",
      maghrib_begins: "19:30",
      maghrib_iqamah: "19:50",
      isha_begins: "21:00",
      isha_iqamah: "21:30",
      jummah_khutbah: "13:30",
      jummah_iqamah: "14:00"
    };
    await storage.createPrayerTime(prayerTime);
    console.log("Created sample prayer times for today");
  }

  // Create sample featured event if none exists
  const existingFeaturedEvent = await storage.getFeaturedEvent();
  if (!existingFeaturedEvent) {
    const featuredEvent: InsertEvent = {
      title: "Eid al-Adha Celebration",
      description: "Join us for the blessed celebration of Eid al-Adha with prayers, feast, and community activities.",
      date: "2023-06-28",
      time_range: "08:00 - 15:00",
      location: "Kuopio Islamic Center, Petosenmutka, 70820 Kuopio",
      image_url: "https://images.unsplash.com/photo-1564121211835-e88c852648ab",
      type: "Featured",
      is_featured: true
    };
    await storage.createEvent(featuredEvent);
    console.log("Created sample featured event");
  }

  // Create sample regular events if none exist
  const existingEvents = await storage.getEvents();
  if (!existingEvents || existingEvents.length === 0) {
    const events: InsertEvent[] = [
      {
        title: "Community Dinner",
        description: "Monthly community dinner and socializing event",
        date: "2023-06-15",
        time_range: "18:00 - 20:00",
        location: "Kuopio Islamic Center, Petosenmutka, 70820 Kuopio",
        image_url: "https://images.unsplash.com/photo-1590846083693-f23fcf4d4f11",
        type: "Monthly",
        is_featured: false
      },
      {
        title: "Qur'an Study Circle",
        description: "Weekly Qur'an study and tafsir session",
        date: "2023-06-10",
        time_range: "19:00 - 20:30",
        location: "Kuopio Islamic Center, Petosenmutka, 70820 Kuopio",
        image_url: "https://images.unsplash.com/photo-1609599006353-921d5c9e94d3",
        type: "Weekly",
        is_featured: false
      },
      {
        title: "Children's Islamic School",
        description: "Weekly Islamic studies for children aged 5-12",
        date: "2023-06-11",
        time_range: "10:00 - 12:00",
        location: "Kuopio Islamic Center, Petosenmutka, 70820 Kuopio",
        image_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
        type: "Weekly",
        is_featured: false
      }
    ];
    
    for (const event of events) {
      await storage.createEvent(event);
    }
    console.log("Created sample events");
  }

  // Create sample news if none exist
  const existingNews = await storage.getNews();
  if (!existingNews || existingNews.length === 0) {
    const newsItems: InsertNews[] = [
      {
        title: "Donation Goal Reached",
        content: "Thanks to the generous contribution of our community members, we have reached our fundraising goal for the mosque expansion project.",
        image_url: "https://images.unsplash.com/photo-1593113598332-cd288d649433",
        author: "Admin"
      },
      {
        title: "New Imam Appointed",
        content: "We are pleased to announce the appointment of our new Imam who will be joining us next month.",
        image_url: "https://images.unsplash.com/photo-1606800052052-a08af7148866",
        author: "Admin"
      },
      {
        title: "Ramadan Schedule",
        content: "The Ramadan schedule for this year has been published. Please check the prayer times section for details.",
        image_url: "https://images.unsplash.com/photo-1543608664-954680e3be23",
        author: "Admin"
      }
    ];
    
    for (const newsItem of newsItems) {
      await storage.createNewsItem(newsItem);
    }
    console.log("Created sample news");
  }
}