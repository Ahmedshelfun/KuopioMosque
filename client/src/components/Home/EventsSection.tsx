import { useLanguage } from "@/hooks/useLanguage";
import { getDirection } from "@/lib/i18n";
import { motion } from "framer-motion";
import { fadeIn, staggerChildren } from "@/hooks/useAnimations";
import { Event } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Calendar, Clock, MapPin } from "lucide-react";

interface EventsSectionProps {
  featuredEvent: Event | null;
  events: Event[];
  isLoading: boolean;
}

export default function EventsSection({
  featuredEvent,
  events,
  isLoading,
}: EventsSectionProps) {
  const { language } = useLanguage();
  const direction = getDirection(language);
  
  return (
    <section className="py-16 bg-white dark:bg-gray-950" dir={direction}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-4">
            {language === 'ar' ? 'الفعاليات والأنشطة' : 'Events & Activities'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'انضم إلينا في فعالياتنا القادمة وأنشطتنا المجتمعية'
              : 'Join us for our upcoming events and community activities'}
          </p>
        </motion.div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div>
            {/* Featured Event */}
            {featuredEvent && (
              <motion.div
                className="bg-primary/5 rounded-xl overflow-hidden shadow-md mb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 md:p-8 flex flex-col">
                    <div className="flex items-center text-sm text-primary font-medium mb-2">
                      <span className="bg-primary/10 rounded-full px-3 py-1">
                        {language === 'ar' ? 'فعالية مميزة' : 'Featured Event'}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                      {featuredEvent.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {featuredEvent.description}
                    </p>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-primary me-2" />
                        <span>{featuredEvent.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-primary me-2" />
                        <span>{featuredEvent.timeRange}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-primary me-2" />
                        <span>{featuredEvent.type}</span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <Link href={`/events/${featuredEvent.id}`}>
                        <Button>
                          {language === 'ar' ? 'المزيد من التفاصيل' : 'More Details'}
                        </Button>
                      </Link>
                    </div>
                  </div>
                  {featuredEvent.imageUrl && (
                    <div className="h-full w-full">
                      <img
                        src={featuredEvent.imageUrl}
                        alt={featuredEvent.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            )}
            
            {/* Recent Events */}
            <h3 className="text-xl font-semibold mb-6">
              {language === 'ar' ? 'فعاليات قادمة' : 'Upcoming Events'}
            </h3>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {events.slice(0, 3).map((event) => (
                <motion.div
                  key={event.id}
                  className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden"
                  variants={fadeIn}
                >
                  {event.imageUrl && (
                    <div className="h-40 overflow-hidden">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center text-sm font-medium mb-2">
                      <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs">
                        {event.type}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{event.title}</h4>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-500 me-2" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-500 me-2" />
                        <span>{event.timeRange}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-500 me-2" />
                        <span>{event.type}</span>
                      </div>
                    </div>
                    <Link href={`/events/${event.id}`} className="text-primary font-medium text-sm hover:underline">
                      {language === 'ar' ? 'المزيد من التفاصيل' : 'More Details'}
                    </Link>
                  </div>
                </motion.div>
              ))}
              
              {events.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500">
                  <p>
                    {language === 'ar' 
                      ? 'لا توجد فعاليات قادمة حاليًا'
                      : 'No upcoming events at the moment'}
                  </p>
                </div>
              )}
            </motion.div>
            
            <div className="text-center">
              <Link href="/events">
                <Button variant="outline">
                  {language === 'ar' ? 'عرض جميع الفعاليات' : 'View All Events'}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}