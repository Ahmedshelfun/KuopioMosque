import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { useLanguage } from "@/hooks/useLanguage";
import { formatDate, getDirection } from "@/lib/i18n";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  if (isLoading) {
    return (
      <section id="prayer-times" className="py-16 bg-neutral-lightest" dir={dir}>
        <div className="container mx-auto px-4 text-center">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-2">{t("prayer.title")}</h2>
            <p className="text-neutral-dark">{t("prayer.subtitle")}</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="w-full h-64 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="prayer-times" className="py-16 bg-neutral-lightest" dir={dir}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-2">{t("prayer.title")}</h2>
          <p className="text-neutral-dark">{t("prayer.subtitle")}</p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {/* Date Selection */}
          <div className="bg-primary text-white p-4 flex justify-between items-center">
            <button
              className="hover:text-secondary-light transition"
              onClick={previousDay}
            >
              <ChevronLeft />
            </button>
            <h3 className="text-xl font-medium">
              {formatDate(currentDate, language)}
            </h3>
            <button
              className="hover:text-secondary-light transition"
              onClick={nextDay}
            >
              <ChevronRight />
            </button>
          </div>

          {/* Prayer Times Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-neutral-light">
                  <th className="px-6 py-3 text-left">{t("prayer.prayer")}</th>
                  <th className="px-6 py-3 text-center">{t("prayer.begins")}</th>
                  <th className="px-6 py-3 text-center">{t("prayer.iqamah")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral">
                {prayerTimes?.prayers.map((prayer, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-neutral-lightest ${
                      prayerTimes.nextPrayer.name === prayer.name
                        ? "bg-primary bg-opacity-10"
                        : ""
                    }`}
                  >
                    <td className="px-6 py-4 font-medium">{prayer.name}</td>
                    <td className="px-6 py-4 text-center">{prayer.begins}</td>
                    <td className="px-6 py-4 text-center">
                      {prayer.iqamah || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Next Prayer Indication */}
          <div className="bg-primary-light text-white p-4 text-center">
            <p className="text-lg">
              {t("prayer.next")}: <span className="font-bold">{prayerTimes?.nextPrayer.name}</span>{" "}
              {t("prayer.in")}{" "}
              <span className="font-bold">{countdown}</span>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-neutral-dark mb-2">{t("prayer.app")}</p>
          <div className="flex justify-center gap-4">
            <a
              href="#"
              className="bg-neutral-darkest text-white px-4 py-2 rounded-md flex items-center"
            >
              <i className="fab fa-apple mr-2"></i> App Store
            </a>
            <a
              href="#"
              className="bg-neutral-darkest text-white px-4 py-2 rounded-md flex items-center"
            >
              <i className="fab fa-google-play mr-2"></i> Google Play
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
