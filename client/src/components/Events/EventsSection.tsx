import { useQuery } from "@tanstack/react-query";
import { Event } from "@/lib/types";
import { CalendarIcon, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { getDirection } from "@/lib/i18n";

export default function EventsSection() {
  const { language, t } = useLanguage();
  const dir = getDirection(language);

  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ['/api/events'],
  });

  const { data: featuredEvent } = useQuery<Event>({
    queryKey: ['/api/events/featured'],
  });

  if (isLoading) {
    return (
      <section id="events" className="py-16 bg-neutral-lightest" dir={dir}>
        <div className="container mx-auto px-4 text-center">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-2">{t("events.title")}</h2>
            <p className="text-neutral-dark">{t("events.subtitle")}</p>
          </div>
          <div className="w-full h-64 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="py-16 bg-neutral-lightest" dir={dir}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-2">{t("events.title")}</h2>
          <p className="text-neutral-dark">{t("events.subtitle")}</p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Featured Event */}
          {featuredEvent && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={featuredEvent.imageUrl || "https://images.unsplash.com/photo-1604594849809-dfedbc827105?auto=format&fit=crop&w=600&q=80"}
                    alt={featuredEvent.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-primary-dark">
                      {featuredEvent.title}
                    </h3>
                    <div className="bg-secondary-light text-primary-dark px-3 py-1 rounded-full text-sm font-bold">
                      {t("events.featured")}
                    </div>
                  </div>
                  <div className="flex items-center mb-4 text-neutral-dark">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>
                      {featuredEvent.date} | {featuredEvent.timeRange}
                    </span>
                  </div>
                  <p className="mb-4 text-neutral-darkest">
                    {featuredEvent.description}
                  </p>
                  <a
                    href="#"
                    className="inline-block px-6 py-2 bg-primary text-white font-bold rounded-md hover:bg-primary-dark transition"
                  >
                    {t("events.details")}
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Upcoming Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events?.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-primary-dark">
                      {event.title}
                    </h3>
                    <div className="bg-neutral-light text-neutral-dark px-3 py-1 rounded-full text-sm">
                      {event.type}
                    </div>
                  </div>
                  <div className="flex items-center mb-3 text-neutral-dark">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>
                      {event.date} | {event.timeRange}
                    </span>
                  </div>
                  <p className="mb-4 text-sm text-neutral-darkest">
                    {event.description}
                  </p>
                  <a
                    href="#"
                    className="text-primary hover:underline text-sm font-medium flex items-center"
                  >
                    {t("events.learn_more")} <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* View All Events Button */}
          <div className="mt-10 text-center">
            <a
              href="#calendar"
              className="px-6 py-3 border-2 border-primary text-primary font-bold rounded-md hover:bg-primary hover:text-white transition inline-flex items-center"
            >
              {t("events.view_calendar")} <CalendarIcon className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
