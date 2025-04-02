import { Home, MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { getDirection } from "@/lib/i18n";
import { useAnimationInView, staggerChildren, slideUp } from "@/hooks/useAnimations";

export default function Footer() {
  const { language, t } = useLanguage();
  const dir = getDirection(language);
  const currentYear = new Date().getFullYear();
  const animation = useAnimationInView();

  return (
    <motion.footer 
      ref={animation.ref}
      initial="hidden"
      animate={animation.animate}
      variants={staggerChildren}
      className="bg-primary text-white pt-12 pb-6" 
      dir={dir}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About */}
          <motion.div variants={slideUp}>
            <div className="flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition-all group-hover:shadow-lg">
                <Home className="text-primary text-lg" />
              </div>
              <div>
                <h4 className="text-lg font-bold">Kuopio Mosque</h4>
                <p className="text-xs text-white/75">Islamic Center of Kuopio</p>
              </div>
            </div>
            <p className="text-sm text-white/75 mb-6 leading-relaxed">
              A place of worship, learning, and community gathering in Kuopio, Finland.
            </p>
            <div className="flex gap-4">
              <SocialLink icon={<Facebook size={18} />} />
              <SocialLink icon={<Twitter size={18} />} />
              <SocialLink icon={<Instagram size={18} />} />
              <SocialLink icon={<Youtube size={18} />} />
            </div>
          </motion.div>

          {/* Column 2: Navigation Links */}
          <motion.div variants={slideUp} className="mt-6 sm:mt-0">
            <h4 className="text-lg font-bold mb-4 relative inline-block">
              {t("nav.home")}
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-white/40 w-full"
                layoutId="footer-title-underline-1"
              />
            </h4>
            <ul className="grid grid-cols-1 gap-2">
              <FooterLink href="#home" label={t("nav.home")} />
              <FooterLink href="#prayer-times" label={t("nav.prayer_times")} />
              <FooterLink href="#about" label={t("nav.about")} />
              <FooterLink href="#services" label={t("about.services")} />
              <FooterLink href="#events" label={t("nav.events")} />
              <FooterLink href="#news" label={t("nav.news")} />
              <FooterLink href="#donate" label={t("nav.donate")} />
              <FooterLink href="#contact" label={t("nav.contact")} />
            </ul>
          </motion.div>

          {/* Column 3: Services */}
          <motion.div variants={slideUp} className="mt-6 lg:mt-0">
            <h4 className="text-lg font-bold mb-4 relative inline-block">
              {t("about.services")}
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-white/40 w-full"
                layoutId="footer-title-underline-2"
              />
            </h4>
            <ul className="grid grid-cols-1 gap-2">
              <FooterLink href="#" label={t("service.prayers")} />
              <FooterLink href="#" label="Friday Prayer" />
              <FooterLink href="#" label={t("service.quran")} />
              <FooterLink href="#" label={t("service.education")} />
              <FooterLink href="#" label="Marriage Services" />
              <FooterLink href="#" label="Funeral Services" />
              <FooterLink href="#" label="Counseling" />
              <FooterLink href="#" label={t("service.support")} />
            </ul>
          </motion.div>

          {/* Column 4: Contact Information */}
          <motion.div variants={slideUp} className="mt-6 lg:mt-0">
            <h4 className="text-lg font-bold mb-4 relative inline-block">
              {t("contact.title")}
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-white/40 w-full"
                layoutId="footer-title-underline-3"
              />
            </h4>
            <ul className="flex flex-col gap-4">
              <ContactItem 
                icon={<MapPin size={16} />} 
                content={
                  <span>
                    Petosenmutka
                    <br />
                    70820 Kuopio, Finland
                  </span>
                }
              />
              <ContactItem 
                icon={<Phone size={16} />} 
                content="+358 40 545 5805"
                href="tel:+358405455805"
              />
              <ContactItem 
                icon={<Mail size={16} />} 
                content="kuopioic@gmail.com"
                href="mailto:kuopioic@gmail.com"
              />
              <ContactItem 
                icon={<Clock size={16} />} 
                content="Office: Mon-Fri, 10AM-6PM"
              />
            </ul>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div 
          variants={slideUp}
          className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-sm text-white/75 mb-4 md:mb-0 text-center md:text-left">
            &copy; {currentYear} Kuopio Islamic Center. {t("footer.rights")}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-white/75 hover:text-white transition-colors">
              {t("footer.privacy")}
            </a>
            <a href="#" className="text-sm text-white/75 hover:text-white transition-colors">
              {t("footer.terms")}
            </a>
            <a href="#" className="text-sm text-white/75 hover:text-white transition-colors">
              {t("footer.sitemap")}
            </a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}

// Helper component for footer links
function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <motion.a 
        href={href} 
        className="text-sm text-white/75 hover:text-white transition-colors inline-block py-1"
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {label}
      </motion.a>
    </li>
  );
}

// Helper component for contact items
function ContactItem({ 
  icon, 
  content,
  href
}: { 
  icon: React.ReactNode; 
  content: React.ReactNode;
  href?: string;
}) {
  const innerContent = (
    <div className="flex items-start gap-3">
      <div className="text-white/60 mt-0.5">{icon}</div>
      <span className="text-sm text-white/75">{content}</span>
    </div>
  );

  if (href) {
    return (
      <li>
        <motion.a 
          href={href}
          className="hover:text-white transition-colors"
          whileHover={{ x: 3 }}
        >
          {innerContent}
        </motion.a>
      </li>
    );
  }

  return <li>{innerContent}</li>;
}

// Helper component for social links
function SocialLink({ icon }: { icon: React.ReactNode }) {
  return (
    <motion.a 
      href="#" 
      className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/75 hover:text-white hover:bg-white/20 transition-all"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.a>
  );
}
