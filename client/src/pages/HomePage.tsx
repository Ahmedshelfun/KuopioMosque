import Hero from "@/components/Home/Hero";
import PrayerTimeDisplay from "@/components/PrayerTimes/PrayerTimeDisplay";
import AboutSection from "@/components/About/AboutSection";
import EventsSection from "@/components/Events/EventsSection";
import NewsSection from "@/components/News/NewsSection";
import DonateSection from "@/components/Donate/DonateSection";
import ContactSection from "@/components/Contact/ContactSection";
import { useLanguage } from "@/hooks/useLanguage";
import { getDirection, getFontFamily } from "@/lib/i18n";

export default function HomePage() {
  const { language } = useLanguage();
  const dir = getDirection(language);
  const fontFamily = getFontFamily(language);

  return (
    <div className={fontFamily} dir={dir}>
      <Hero />
      <PrayerTimeDisplay />
      <AboutSection />
      <EventsSection />
      <NewsSection />
      <DonateSection />
      <ContactSection />
    </div>
  );
}
