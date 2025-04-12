import { useLanguage } from "@/hooks/useLanguage";
import { getDirection } from "@/lib/i18n";
import { motion } from "framer-motion";
import { fadeIn, staggerChildren } from "@/hooks/useAnimations";
import { NewsItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Calendar } from "lucide-react";

interface NewsSectionProps {
  news: NewsItem[];
  isLoading: boolean;
}

export default function NewsSection({ news, isLoading }: NewsSectionProps) {
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
            {language === 'ar' ? 'أخبار المسجد' : 'Mosque News'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'آخر الأخبار والتحديثات من مسجد النور'
              : 'Latest news and updates from Al-Noor Mosque'}
          </p>
        </motion.div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {news.slice(0, 3).map((newsItem) => (
                <motion.div
                  key={newsItem.id}
                  className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden"
                  variants={fadeIn}
                >
                  {newsItem.imageUrl && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={newsItem.imageUrl}
                        alt={newsItem.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Calendar className="h-4 w-4 me-1" />
                      <span>{newsItem.date}</span>
                    </div>
                    <h4 className="text-lg font-semibold mb-3">{newsItem.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {newsItem.content}
                    </p>
                    <Link href={`/news/${newsItem.id}`} className="text-primary font-medium text-sm hover:underline">
                      {language === 'ar' ? 'قراءة المزيد' : 'Read More'}
                    </Link>
                  </div>
                </motion.div>
              ))}
              
              {news.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500">
                  <p>
                    {language === 'ar' 
                      ? 'لا توجد أخبار حاليًا'
                      : 'No news at the moment'}
                  </p>
                </div>
              )}
            </motion.div>
            
            <div className="text-center">
              <Link href="/news">
                <Button variant="outline">
                  {language === 'ar' ? 'عرض جميع الأخبار' : 'View All News'}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}