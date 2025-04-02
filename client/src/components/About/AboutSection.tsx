import { useLanguage } from "@/hooks/useLanguage";
import { getDirection } from "@/lib/i18n";
import { 
  BookOpen, 
  GraduationCap, 
  Heart, 
  Utensils, 
  Users,
  School
} from "lucide-react";

export default function AboutSection() {
  const { language, t } = useLanguage();
  const dir = getDirection(language);

  const services = [
    {
      icon: <School className="text-white text-xl" />,
      title: "service.prayers",
      description: "service.prayers_desc",
    },
    {
      icon: <BookOpen className="text-white text-xl" />,
      title: "service.quran",
      description: "service.quran_desc",
    },
    {
      icon: <GraduationCap className="text-white text-xl" />,
      title: "service.education",
      description: "service.education_desc",
    },
    {
      icon: <Heart className="text-white text-xl" />,
      title: "service.support",
      description: "service.support_desc",
    },
    {
      icon: <Utensils className="text-white text-xl" />,
      title: "service.meals",
      description: "service.meals_desc",
    },
    {
      icon: <Users className="text-white text-xl" />,
      title: "service.dialogue",
      description: "service.dialogue_desc",
    },
  ];

  return (
    <section id="about" className="py-16 bg-white" dir={dir}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-2">{t("about.title")}</h2>
          <p className="text-neutral-dark">{t("about.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=800&q=80"
              alt="Kuopio Mosque interior"
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-primary-dark mb-4">
              {t("about.history_title")}
            </h3>
            <p className="mb-4 text-neutral-darkest">
              {t("about.history_text1")}
            </p>
            <p className="mb-6 text-neutral-darkest">
              {t("about.history_text2")}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-neutral-lightest p-4 rounded-lg text-center">
                <div className="text-primary text-3xl font-bold mb-2">350+</div>
                <p className="text-neutral-dark">{t("about.members")}</p>
              </div>
              <div className="bg-neutral-lightest p-4 rounded-lg text-center">
                <div className="text-primary text-3xl font-bold mb-2">2005</div>
                <p className="text-neutral-dark">{t("about.established")}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#services"
                className="px-6 py-3 bg-primary text-white font-bold rounded-md text-center hover:bg-primary-dark transition"
              >
                {t("about.services")}
              </a>
              <a
                href="#community"
                className="px-6 py-3 border border-primary text-primary font-bold rounded-md text-center hover:bg-primary hover:text-white transition"
              >
                {t("about.activities")}
              </a>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div id="services" className="mt-16">
          <h3 className="text-2xl font-bold text-primary-dark mb-8 text-center">
            {t("about.services_title")}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-neutral-lightest p-6 rounded-lg">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold mb-2">{t(service.title)}</h4>
                <p className="text-neutral-dark">{t(service.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
