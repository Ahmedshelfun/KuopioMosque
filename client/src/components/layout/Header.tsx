import { useState } from "react";
import { Link } from "wouter";
import { Home } from "lucide-react";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/hooks/useLanguage";
import { getDirection } from "@/lib/i18n";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, t } = useLanguage();
  const dir = getDirection(language);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="relative bg-white shadow-md" dir={dir}>
      {/* Top Bar with Contact and Language Switcher */}
      <div className="bg-primary text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href="tel:+358501234567" className="text-sm flex items-center">
              <i className="fas fa-phone mr-2"></i>
              <span>+358 50 123 4567</span>
            </a>
            <a
              href="mailto:info@kuopiomosque.fi"
              className="text-sm hidden sm:flex items-center"
            >
              <i className="fas fa-envelope mr-2"></i>
              <span>info@kuopiomosque.fi</span>
            </a>
          </div>

          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <Home className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">Kuopio Mosque</h1>
              <p className="text-xs text-neutral-dark">
                Islamic Center of Kuopio
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <a
              href="#home"
              className="font-medium text-primary border-b-2 border-primary"
            >
              {t("nav.home")}
            </a>
            <a
              href="#prayer-times"
              className="font-medium hover:text-primary transition"
            >
              {t("nav.prayer_times")}
            </a>
            <a
              href="#about"
              className="font-medium hover:text-primary transition"
            >
              {t("nav.about")}
            </a>
            <a
              href="#events"
              className="font-medium hover:text-primary transition"
            >
              {t("nav.events")}
            </a>
            <a
              href="#news"
              className="font-medium hover:text-primary transition"
            >
              {t("nav.news")}
            </a>
            <a
              href="#contact"
              className="font-medium hover:text-primary transition"
            >
              {t("nav.contact")}
            </a>
            <a
              href="#donate"
              className="font-medium text-white bg-secondary-light px-4 py-1 rounded-md hover:bg-secondary transition"
            >
              {t("nav.donate")}
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-neutral-darkest"
            onClick={toggleMobileMenu}
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:hidden bg-white absolute w-full z-50 border-t border-neutral py-4 shadow-lg`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-3">
          <a
            href="#home"
            className="font-medium text-primary py-2 border-b border-neutral"
          >
            {t("nav.home")}
          </a>
          <a
            href="#prayer-times"
            className="font-medium py-2 border-b border-neutral"
          >
            {t("nav.prayer_times")}
          </a>
          <a
            href="#about"
            className="font-medium py-2 border-b border-neutral"
          >
            {t("nav.about")}
          </a>
          <a
            href="#events"
            className="font-medium py-2 border-b border-neutral"
          >
            {t("nav.events")}
          </a>
          <a
            href="#news"
            className="font-medium py-2 border-b border-neutral"
          >
            {t("nav.news")}
          </a>
          <a
            href="#contact"
            className="font-medium py-2 border-b border-neutral"
          >
            {t("nav.contact")}
          </a>
          <a
            href="#donate"
            className="font-medium text-white bg-secondary py-2 rounded-md text-center mt-2"
          >
            {t("nav.donate")}
          </a>
        </div>
      </div>
    </header>
  );
}
