import { useLanguage } from "@/hooks/useLanguage";
import { getDirection } from "@/lib/i18n";
import { motion } from "framer-motion";
import { fadeIn, slideUp } from "@/hooks/useAnimations";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HeroSection() {
  const { language, t } = useLanguage();
  const direction = getDirection(language);
  
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center" dir={direction}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary leading-tight">
              {language === 'ar' 
                ? 'مرحبًا بكم في مسجد النور بكوبيو' 
                : 'Welcome to Al-Noor Mosque Kuopio'}
            </h1>
            <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
              {language === 'ar'
                ? 'المركز الإسلامي للمسلمين في كوبيو وشرق فنلندا'
                : 'Islamic center for Muslims in Kuopio and Eastern Finland'}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/prayer-times">
                <Button size="lg">
                  {language === 'ar' ? 'أوقات الصلاة' : 'Prayer Times'}
                </Button>
              </Link>
              <Link href="/events">
                <Button variant="outline" size="lg">
                  {language === 'ar' ? 'الفعاليات القادمة' : 'Upcoming Events'}
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            className="relative"
            initial="hidden"
            animate="visible"
            variants={slideUp}
          >
            <div className="w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/mosque-exterior.jpg"
                alt={language === 'ar' ? 'مسجد النور' : 'Al-Noor Mosque'}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}