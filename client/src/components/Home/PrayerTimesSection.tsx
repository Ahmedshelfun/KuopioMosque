import { useLanguage } from "@/hooks/useLanguage";
import { getDirection } from "@/lib/i18n";
import { motion } from "framer-motion";
import { fadeIn, staggerChildren } from "@/hooks/useAnimations";
import { PrayerTimesForDay } from "@/lib/types";
import { Clock } from "lucide-react";

interface PrayerTimesSectionProps {
  prayerTimes: PrayerTimesForDay | null;
  isLoading: boolean;
}

export default function PrayerTimesSection({ prayerTimes, isLoading }: PrayerTimesSectionProps) {
  const { language } = useLanguage();
  const direction = getDirection(language);
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900" dir={direction}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-4">
            {language === 'ar' ? 'أوقات الصلاة اليوم' : 'Today\'s Prayer Times'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'تحقق من أوقات الصلاة اليومية والإقامة لمسجد النور'
              : 'Check the daily prayer times and Iqamah for Al-Noor Mosque'}
          </p>
        </motion.div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div>
            {prayerTimes && (
              <div>
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={fadeIn}
                >
                  <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-4">
                    <Clock className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold text-primary">
                      {language === 'ar' ? 'الصلاة القادمة' : 'Next Prayer'}
                    </h3>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-2xl font-bold">
                      {prayerTimes.nextPrayer.name}
                    </p>
                    <p className="text-3xl font-bold mt-2 text-primary">
                      {prayerTimes.nextPrayer.countdown}
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4"
                  variants={staggerChildren}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  {prayerTimes.prayers.map((prayer, index) => (
                    <motion.div
                      key={prayer.name}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-center"
                      variants={fadeIn}
                    >
                      <h4 className="font-semibold text-lg mb-1">{prayer.name}</h4>
                      <p className="text-xl font-bold text-primary mb-1">{prayer.begins}</p>
                      {prayer.iqamah && (
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {language === 'ar' ? 'الإقامة' : 'Iqamah'}
                          </p>
                          <p className="text-base font-bold">{prayer.iqamah}</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}