import { useEffect, useState } from "react";
import HeroSection from "@/components/Home/HeroSection";
import PrayerTimesSection from "@/components/Home/PrayerTimesSection";
import EventsSection from "@/components/Home/EventsSection";
import NewsSection from "@/components/Home/NewsSection";
import ServicesSection from "@/components/Home/ServicesSection";
import { PrayerTimesForDay, Event, NewsItem } from "@/lib/types";

export default function HomePage() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesForDay | null>(null);
  const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState({
    prayerTimes: true,
    featuredEvent: true,
    events: true,
    news: true,
  });

  useEffect(() => {
    // Fetch prayer times
    fetch("/api/prayer-times")
      .then((res) => res.json())
      .then((data) => {
        setPrayerTimes(data);
        setIsLoading((prev) => ({ ...prev, prayerTimes: false }));
      })
      .catch((error) => {
        console.error("Error fetching prayer times:", error);
        setIsLoading((prev) => ({ ...prev, prayerTimes: false }));
      });

    // Fetch featured event
    fetch("/api/events/featured")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedEvent(data);
        setIsLoading((prev) => ({ ...prev, featuredEvent: false }));
      })
      .catch((error) => {
        console.error("Error fetching featured event:", error);
        setIsLoading((prev) => ({ ...prev, featuredEvent: false }));
      });

    // Fetch events
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setIsLoading((prev) => ({ ...prev, events: false }));
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setIsLoading((prev) => ({ ...prev, events: false }));
      });

    // Fetch news
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setIsLoading((prev) => ({ ...prev, news: false }));
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setIsLoading((prev) => ({ ...prev, news: false }));
      });
  }, []);

  return (
    <div>
      <HeroSection />
      
      <PrayerTimesSection
        prayerTimes={prayerTimes}
        isLoading={isLoading.prayerTimes}
      />
      
      <EventsSection
        featuredEvent={featuredEvent}
        events={events}
        isLoading={isLoading.events || isLoading.featuredEvent}
      />
      
      <ServicesSection />
      
      <NewsSection
        news={news}
        isLoading={isLoading.news}
      />
    </div>
  );
}