import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { useLanguage } from "@/hooks/useLanguage";
import { formatDate, getDirection } from "@/lib/i18n";
import { ChevronLeft, ChevronRight, Clock, Calendar, Smartphone, ArrowUp, AppleIcon, MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAnimationInView, slideUp, staggerChildren } from "@/hooks/useAnimations";
import { useIsMobile } from "@/hooks/useMediaQuery";

export default function PrayerTimeDisplay() {
  const { language, t } = useLanguage();
  const {
    prayerTimes,
    isLoading,
    currentDate,
    nextDay,
    previousDay,
    countdown,
  } = usePrayerTimes();
  const dir = getDirection(language);
  const animation = useAnimationInView({ once: true, amount: 0.2 });
  const isMobile = useIsMobile();

  // Loading state with animation
  if (isLoading) {
    return (
      <section id="prayer-times" className="section-padding bg-background/5" dir={dir}>
        <div className="container text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-gradient mb-2">{t("prayer.title")}</h2>
            <p className="text-muted-foreground">{t("prayer.subtitle")}</p>
          </motion.div>
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-full h-64 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <motion.section 
      id="prayer-times" 
      className="section-padding bg-background/5" 
      dir={dir}
      ref={animation.ref}
      initial="hidden"
      animate={animation.animate}
      variants={staggerChildren}
    >
      <div className="container">
        <motion.div variants={slideUp} className="text-center mb-12">
          <h2 className="text-gradient mb-3">{t("prayer.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("prayer.subtitle")}</p>
        </motion.div>

        <motion.div 
          variants={slideUp}
          className="max-w-4xl mx-auto bg-card rounded-xl shadow-lg overflow-hidden border border-border/40"
        >
          {/* Date Selection */}
          <div className="bg-primary text-primary-foreground p-4 sm:p-5 flex justify-between items-center">
            <motion.button
              className="hover:bg-primary-foreground/10 rounded-full p-2 transition-colors"
              onClick={previousDay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
            <motion.h3 
              className="text-lg sm:text-xl font-medium flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <Calendar className="h-5 w-5 hidden sm:inline" />
              {formatDate(currentDate, language)}
            </motion.h3>
            <motion.button
              className="hover:bg-primary-foreground/10 rounded-full p-2 transition-colors"
              onClick={nextDay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Prayer Times Table - Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">{t("prayer.prayer")}</th>
                  <th className="px-6 py-3 text-center font-medium text-muted-foreground">{t("prayer.begins")}</th>
                  <th className="px-6 py-3 text-center font-medium text-muted-foreground">{t("prayer.iqamah")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {prayerTimes?.prayers.map((prayer, index) => (
                  <motion.tr
                    key={index}
                    className={`hover:bg-muted/30 transition-colors ${
                      prayerTimes.nextPrayer.name === prayer.name
                        ? "bg-primary/10"
                        : ""
                    }`}
                    whileHover={{ backgroundColor: "rgba(var(--primary), 0.05)" }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td className="px-6 py-4 font-medium">
                      <div className="flex items-center gap-2">
                        {prayerTimes.nextPrayer.name === prayer.name && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-1.5 h-1.5 bg-primary rounded-full"
                          />
                        )}
                        {prayer.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">{prayer.begins}</td>
                    <td className="px-6 py-4 text-center">
                      {prayer.iqamah || "-"}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Prayer Times Cards - Mobile */}
          <div className="md:hidden divide-y divide-border">
            {prayerTimes?.prayers.map((prayer, index) => (
              <motion.div
                key={index}
                className={`p-4 ${
                  prayerTimes.nextPrayer.name === prayer.name
                    ? "bg-primary/10"
                    : ""
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {prayerTimes.nextPrayer.name === prayer.name && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-primary rounded-full"
                      />
                    )}
                    <span className="font-medium">{prayer.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="flex flex-col gap-1">
                      <div className="text-xs text-muted-foreground">{t("prayer.begins")}</div>
                      <div className="font-medium">{prayer.begins}</div>
                    </div>
                  </div>
                </div>
                {prayer.iqamah && (
                  <div className="mt-2 text-xs flex justify-end">
                    <span className="text-muted-foreground">{t("prayer.iqamah")}: </span>
                    <span className="font-medium ml-1">{prayer.iqamah}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Next Prayer Indication */}
          <motion.div 
            className="bg-primary/90 text-primary-foreground p-4 sm:p-5 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
            >
              <Clock className="h-5 w-5" />
              <p className="text-base sm:text-lg font-medium">
                {t("prayer.next")}: <span className="font-bold">{prayerTimes?.nextPrayer.name}</span>{" "}
                {t("prayer.in")}{" "}
                <span className="font-bold">{countdown}</span>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={slideUp}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">{t("prayer.app")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="#"
              className="bg-foreground text-background px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-sm hover:shadow-md transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <AppleIcon className="h-5 w-5" />
              <span>App Store</span>
            </motion.a>
            <motion.a
              href="#"
              className="bg-foreground text-background px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-sm hover:shadow-md transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Smartphone className="h-5 w-5" />
              <span>Google Play</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
