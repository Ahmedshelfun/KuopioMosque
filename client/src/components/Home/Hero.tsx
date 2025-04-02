import { useLanguage } from "@/hooks/useLanguage";
import { getDirection } from "@/lib/i18n";

export default function Hero() {
  const { language, t } = useLanguage();
  const dir = getDirection(language);

  return (
    <section 
      id="home" 
      className="bg-primary-dark bg-opacity-70 text-white" 
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay"
      }}
      dir={dir}
    >
      <div className="container mx-auto px-4 py-16 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            {t("hero.welcome")}
          </h1>
          <p className="text-lg md:text-xl mb-8">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#prayer-times"
              className="px-6 py-3 bg-white text-primary font-bold rounded-md hover:bg-neutral-lightest transition"
            >
              {t("hero.prayer_times")}
            </a>
            <a
              href="#events"
              className="px-6 py-3 bg-secondary text-white font-bold rounded-md hover:bg-secondary-dark transition"
            >
              {t("hero.upcoming_events")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
