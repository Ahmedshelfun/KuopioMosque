import { Home } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { getDirection } from "@/lib/i18n";

export default function Footer() {
  const { language, t } = useLanguage();
  const dir = getDirection(language);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white pt-12 pb-6" dir={dir}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <Home className="text-primary text-lg" />
              </div>
              <div>
                <h4 className="text-lg font-bold">Kuopio Mosque</h4>
                <p className="text-xs opacity-75">Islamic Center of Kuopio</p>
              </div>
            </div>
            <p className="text-sm opacity-75 mb-4">
              A place of worship, learning, and community gathering in Kuopio, Finland.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-white opacity-75 hover:opacity-100">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white opacity-75 hover:opacity-100">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white opacity-75 hover:opacity-100">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white opacity-75 hover:opacity-100">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">{t("nav.home")}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-sm opacity-75 hover:opacity-100">
                  {t("nav.home")}
                </a>
              </li>
              <li>
                <a href="#prayer-times" className="text-sm opacity-75 hover:opacity-100">
                  {t("nav.prayer_times")}
                </a>
              </li>
              <li>
                <a href="#about" className="text-sm opacity-75 hover:opacity-100">
                  {t("nav.about")}
                </a>
              </li>
              <li>
                <a href="#services" className="text-sm opacity-75 hover:opacity-100">
                  {t("about.services")}
                </a>
              </li>
              <li>
                <a href="#events" className="text-sm opacity-75 hover:opacity-100">
                  {t("nav.events")}
                </a>
              </li>
              <li>
                <a href="#news" className="text-sm opacity-75 hover:opacity-100">
                  {t("nav.news")}
                </a>
              </li>
              <li>
                <a href="#donate" className="text-sm opacity-75 hover:opacity-100">
                  {t("nav.donate")}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm opacity-75 hover:opacity-100">
                  {t("nav.contact")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">{t("about.services")}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm opacity-75 hover:opacity-100">
                  {t("service.prayers")}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-75 hover:opacity-100">
                  Friday Prayer
                </a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-75 hover:opacity-100">
                  {t("service.quran")}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-75 hover:opacity-100">
                  {t("service.education")}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-75 hover:opacity-100">
                  Marriage Services
                </a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-75 hover:opacity-100">
                  Funeral Services
                </a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-75 hover:opacity-100">
                  Counseling
                </a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-75 hover:opacity-100">
                  {t("service.support")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">{t("contact.title")}</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 opacity-75"></i>
                <span className="text-sm opacity-75">
                  Petosenmutka
                  <br />
                  70820 Kuopio, Finland
                </span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-3 opacity-75"></i>
                <span className="text-sm opacity-75">+358 40 545 5805</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 opacity-75"></i>
                <span className="text-sm opacity-75">kuopioic@gmail.com</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-clock mr-3 opacity-75"></i>
                <span className="text-sm opacity-75">Office: Mon-Fri, 10AM-6PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white border-opacity-20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-75 mb-4 md:mb-0">
            &copy; {currentYear} Kuopio Islamic Center. {t("footer.rights")}
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-sm opacity-75 hover:opacity-100">
              {t("footer.privacy")}
            </a>
            <a href="#" className="text-sm opacity-75 hover:opacity-100">
              {t("footer.terms")}
            </a>
            <a href="#" className="text-sm opacity-75 hover:opacity-100">
              {t("footer.sitemap")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
