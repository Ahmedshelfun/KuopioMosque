import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Home, Phone, Mail, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/hooks/useLanguage";
import { getDirection } from "@/lib/i18n";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { 
  slideDown, 
  slideUp, 
  fadeIn, 
  staggerChildren 
} from "@/hooks/useAnimations";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, t } = useLanguage();
  const dir = getDirection(language);
  const isMobile = useIsMobile();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when changing to desktop view
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent scrolling when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <motion.header 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className={`sticky top-0 z-40 bg-white transition-all duration-300 ${
        scrolled ? "shadow-md" : ""
      }`} 
      dir={dir}
    >
      {/* Top Bar with Contact and Language Switcher */}
      <motion.div 
        variants={slideDown}
        className={`bg-primary text-white py-2 transition-all duration-300 ${
          scrolled ? "py-1" : ""
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="tel:+358405455805" className="text-sm flex items-center gap-2 hover:text-white/80 transition-colors">
              <Phone size={14} />
              <span className="hidden xs:inline">+358 40 545 5805</span>
            </a>
            <a
              href="mailto:kuopioic@gmail.com"
              className="text-sm hidden sm:flex items-center gap-2 hover:text-white/80 transition-colors"
            >
              <Mail size={14} />
              <span>kuopioic@gmail.com</span>
            </a>
          </div>

          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      </motion.div>

      {/* Main Navigation */}
      <motion.div 
        variants={slideDown}
        className={`container mx-auto py-4 transition-all duration-300 ${
          scrolled ? "py-2" : ""
        }`}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <motion.div 
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                <Home className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-gradient">Kuopio Mosque</h1>
                <p className="text-xs text-muted-foreground">
                  Islamic Center of Kuopio
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <motion.nav 
            variants={staggerChildren}
            className="hidden md:flex items-center gap-1 lg:gap-6"
          >
            <NavItem href="#home" label={t("nav.home")} isActive={true} />
            <NavItem href="#prayer-times" label={t("nav.prayer_times")} />
            <NavItem href="#about" label={t("nav.about")} />
            <NavItem href="#events" label={t("nav.events")} />
            <NavItem href="#news" label={t("nav.news")} />
            <NavItem href="#contact" label={t("nav.contact")} />
            
            <motion.a
              href="#donate"
              className="font-medium text-white bg-primary px-4 py-1.5 rounded-md transition-all hover:bg-primary/90 hover:shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("nav.donate")}
            </motion.a>
          </motion.nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-primary p-1 rounded-md"
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-primary" />
            ) : (
              <Menu size={24} className="text-primary" />
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu md:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-8">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <Home className="text-white text-xl" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-gradient">Kuopio Mosque</h1>
                      <p className="text-xs text-muted-foreground">
                        Islamic Center of Kuopio
                      </p>
                    </div>
                  </div>
                </Link>
                <button
                  className="text-primary p-1 rounded-md"
                  onClick={toggleMobileMenu}
                >
                  <X size={24} />
                </button>
              </div>
              
              <motion.div 
                className="flex flex-col space-y-4 mt-4"
                variants={staggerChildren}
                initial="hidden"
                animate="visible"
              >
                <MobileNavItem href="#home" label={t("nav.home")} isActive={true} onClick={() => setIsMobileMenuOpen(false)} />
                <MobileNavItem href="#prayer-times" label={t("nav.prayer_times")} onClick={() => setIsMobileMenuOpen(false)} />
                <MobileNavItem href="#about" label={t("nav.about")} onClick={() => setIsMobileMenuOpen(false)} />
                <MobileNavItem href="#events" label={t("nav.events")} onClick={() => setIsMobileMenuOpen(false)} />
                <MobileNavItem href="#news" label={t("nav.news")} onClick={() => setIsMobileMenuOpen(false)} />
                <MobileNavItem href="#contact" label={t("nav.contact")} onClick={() => setIsMobileMenuOpen(false)} />
              </motion.div>
              
              <motion.div 
                className="mt-auto mb-8"
                variants={slideUp}
                initial="hidden"
                animate="visible"
              >
                <a
                  href="#donate"
                  className="w-full font-medium text-white bg-primary py-3 rounded-md flex items-center justify-center gap-2 hover:bg-primary/90"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("nav.donate")}
                  <ChevronDown className="h-4 w-4" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// Desktop Nav Item with animation
function NavItem({ href, label, isActive = false }: { href: string; label: string; isActive?: boolean }) {
  return (
    <motion.a
      href={href}
      className={`relative font-medium py-2 px-3 rounded-md transition-all hover:bg-primary/10 ${
        isActive ? "text-primary" : "text-foreground"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-primary w-full"
          layoutId="navbar-underline"
        />
      )}
    </motion.a>
  );
}

// Mobile Nav Item with animation
function MobileNavItem({ 
  href, 
  label, 
  isActive = false, 
  onClick 
}: { 
  href: string; 
  label: string; 
  isActive?: boolean; 
  onClick: () => void 
}) {
  return (
    <motion.a
      href={href}
      className={`text-lg font-medium py-3 px-2 border-b border-border ${
        isActive ? "text-primary" : "text-foreground"
      }`}
      onClick={onClick}
      variants={slideUp}
      whileTap={{ scale: 0.98 }}
    >
      {label}
    </motion.a>
  );
}
