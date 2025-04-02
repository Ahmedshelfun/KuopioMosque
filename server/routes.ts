import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get("/api/prayer-times/:date", async (req, res) => {
    try {
      const date = req.params.date;
      
      // Validate date format (YYYY-MM-DD)
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json({
          message: "Invalid date format. Please use YYYY-MM-DD",
        });
      }
      
      const prayerTimeData = await storage.getPrayerTimesByDate(date);
      
      if (!prayerTimeData) {
        // Fallback to a default structure with reasonable times for Kuopio, Finland
        // In a real app, there would be a calculation based on location
        const dateObj = new Date(date);
        
        return res.json({
          date: dateObj,
          prayers: [
            { name: "Fajr", begins: "03:14", iqamah: "03:45" },
            { name: "Sunrise", begins: "04:30", iqamah: null },
            { name: "Dhuhr", begins: "13:15", iqamah: "13:30" },
            { name: "Asr", begins: "17:45", iqamah: "18:00" },
            { name: "Maghrib", begins: "22:10", iqamah: "22:20" },
            { name: "Isha", begins: "23:45", iqamah: "00:00" },
          ],
          nextPrayer: {
            name: "Isha",
            countdown: "02:35:10",
          },
        });
      }
      
      // Transform the database structure to the format the client expects
      const prayers = [
        { name: "Fajr", begins: prayerTimeData.fajr_begins, iqamah: prayerTimeData.fajr_iqamah },
        { name: "Sunrise", begins: prayerTimeData.sunrise, iqamah: null },
        { name: "Dhuhr", begins: prayerTimeData.dhuhr_begins, iqamah: prayerTimeData.dhuhr_iqamah },
        { name: "Asr", begins: prayerTimeData.asr_begins, iqamah: prayerTimeData.asr_iqamah },
        { name: "Maghrib", begins: prayerTimeData.maghrib_begins, iqamah: prayerTimeData.maghrib_iqamah },
        { name: "Isha", begins: prayerTimeData.isha_begins, iqamah: prayerTimeData.isha_iqamah },
      ];
      
      return res.json({
        date: new Date(date),
        prayers,
        nextPrayer: {
          name: prayerTimeData.next_prayer_name || "Isha",
          countdown: "02:35:10", // In a real app, this would be calculated dynamically
        },
      });
    } catch (error) {
      console.error("Error fetching prayer times:", error);
      res.status(500).json({ message: "Failed to fetch prayer times" });
    }
  });
  
  // Events endpoints
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getEvents();
      res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });
  
  app.get("/api/events/featured", async (req, res) => {
    try {
      const featuredEvent = await storage.getFeaturedEvent();
      
      if (!featuredEvent) {
        return res.status(404).json({ message: "No featured event found" });
      }
      
      res.json(featuredEvent);
    } catch (error) {
      console.error("Error fetching featured event:", error);
      res.status(500).json({ message: "Failed to fetch featured event" });
    }
  });
  
  app.get("/api/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid event ID" });
      }
      
      const event = await storage.getEvent(id);
      
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      
      res.json(event);
    } catch (error) {
      console.error("Error fetching event:", error);
      res.status(500).json({ message: "Failed to fetch event" });
    }
  });
  
  // News endpoints
  app.get("/api/news", async (req, res) => {
    try {
      const news = await storage.getNews();
      res.json(news);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });
  
  app.get("/api/news/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid news ID" });
      }
      
      const newsItem = await storage.getNewsItem(id);
      
      if (!newsItem) {
        return res.status(404).json({ message: "News item not found" });
      }
      
      res.json(newsItem);
    } catch (error) {
      console.error("Error fetching news item:", error);
      res.status(500).json({ message: "Failed to fetch news item" });
    }
  });
  
  // Contact endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactMessageSchema.parse(req.body);
      const result = await storage.createContactMessage(contactData);
      res.status(201).json(result);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
