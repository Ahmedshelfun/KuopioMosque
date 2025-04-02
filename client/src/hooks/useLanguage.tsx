import { createContext, useContext, useState, ReactNode } from "react";
import { Language } from "@/lib/types";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
});

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get the language from localStorage
    const savedLanguage = localStorage.getItem("language") as Language;
    return savedLanguage || "en";
  });

  // Simple translations object
  const translations: Record<string, Record<Language, string>> = {
    "nav.home": {
      en: "Home",
      fi: "Koti",
      ar: "الرئيسية",
    },
    "nav.prayer_times": {
      en: "Prayer Times",
      fi: "Rukousajat",
      ar: "أوقات الصلاة",
    },
    "nav.about": {
      en: "About",
      fi: "Tietoa",
      ar: "حول",
    },
    "nav.events": {
      en: "Events",
      fi: "Tapahtumat",
      ar: "الأحداث",
    },
    "nav.news": {
      en: "News",
      fi: "Uutiset",
      ar: "أخبار",
    },
    "nav.contact": {
      en: "Contact",
      fi: "Yhteystiedot",
      ar: "اتصل بنا",
    },
    "nav.donate": {
      en: "Donate",
      fi: "Lahjoita",
      ar: "تبرع",
    },
    "hero.welcome": {
      en: "Welcome to Kuopio Islamic Center",
      fi: "Tervetuloa Kuopion islamilaiseen keskukseen",
      ar: "مرحبًا بكم في المركز الإسلامي في كوبيو",
    },
    "hero.subtitle": {
      en: "A place of worship, learning, and community in the heart of Kuopio, Finland",
      fi: "Paikka palvonnalle, oppimiselle ja yhteisölle Kuopion sydämessä, Suomessa",
      ar: "مكان للعبادة والتعلم والمجتمع في قلب كوبيو، فنلندا",
    },
    "hero.prayer_times": {
      en: "Prayer Times",
      fi: "Rukousajat",
      ar: "أوقات الصلاة",
    },
    "hero.upcoming_events": {
      en: "Upcoming Events",
      fi: "Tulevat tapahtumat",
      ar: "الأحداث القادمة",
    },
    "prayer.title": {
      en: "Prayer Times",
      fi: "Rukousajat",
      ar: "أوقات الصلاة",
    },
    "prayer.subtitle": {
      en: "Accurate prayer times for Kuopio, Finland",
      fi: "Tarkat rukousajat Kuopiolle, Suomi",
      ar: "أوقات الصلاة الدقيقة لمدينة كوبيو، فنلندا",
    },
    "prayer.prayer": {
      en: "Prayer",
      fi: "Rukous",
      ar: "الصلاة",
    },
    "prayer.begins": {
      en: "Begins",
      fi: "Alkaa",
      ar: "تبدأ",
    },
    "prayer.iqamah": {
      en: "Iqamah",
      fi: "Iqamah",
      ar: "إقامة",
    },
    "prayer.next": {
      en: "Next Prayer",
      fi: "Seuraava rukous",
      ar: "الصلاة التالية",
    },
    "prayer.in": {
      en: "in",
      fi: "aikana",
      ar: "في",
    },
    "prayer.app": {
      en: "Download our mobile app to get prayer time notifications",
      fi: "Lataa mobiilisovelluksemme saadaksesi rukousajan ilmoitukset",
      ar: "قم بتنزيل تطبيق الجوال للحصول على إشعارات أوقات الصلاة",
    },
    "about.title": {
      en: "About Our Mosque",
      fi: "Tietoa moskeijastamme",
      ar: "حول مسجدنا",
    },
    "about.subtitle": {
      en: "Learn about the Islamic Center of Kuopio",
      fi: "Opi Kuopion islamilaisesta keskuksesta",
      ar: "تعرف على المركز الإسلامي في كوبيو",
    },
    "about.history_title": {
      en: "Our History & Mission",
      fi: "Historiamme ja tehtävämme",
      ar: "تاريخنا ورسالتنا",
    },
    "about.history_text1": {
      en: "The Islamic Center of Kuopio was established in 2005 to serve the growing Muslim community in Eastern Finland. What began as a small prayer space has grown into a vibrant community center that serves hundreds of families.",
      fi: "Kuopion islamilainen keskus perustettiin vuonna 2005 palvelemaan kasvavaa muslimiyhteisöä Itä-Suomessa. Se, mikä alkoi pienenä rukoustilana, on kasvanut eläväksi yhteisökeskukseksi, joka palvelee satoja perheitä.",
      ar: "تأسس المركز الإسلامي في كوبيو عام 2005 لخدمة المجتمع الإسلامي المتنامي في شرق فنلندا. ما بدأ كمساحة صغيرة للصلاة قد نما ليصبح مركزًا مجتمعيًا نابضًا بالحياة يخدم مئات العائلات.",
    },
    "about.history_text2": {
      en: "Our mission is to provide a welcoming place for worship, education, and community gathering while fostering understanding and dialogue with the broader Finnish society.",
      fi: "Tehtävämme on tarjota kutsuva paikka palvontaan, koulutukseen ja yhteisön kokoontumiseen samalla kun edistämme ymmärrystä ja vuoropuhelua laajemman suomalaisen yhteiskunnan kanssa.",
      ar: "مهمتنا هي توفير مكان ترحيبي للعبادة والتعليم والتجمع المجتمعي مع تعزيز التفاهم والحوار مع المجتمع الفنلندي الأوسع.",
    },
    "about.members": {
      en: "Community Members",
      fi: "Yhteisön jäsenet",
      ar: "أعضاء المجتمع",
    },
    "about.established": {
      en: "Year Established",
      fi: "Perustamisvuosi",
      ar: "سنة التأسيس",
    },
    "about.services": {
      en: "Our Services",
      fi: "Palvelumme",
      ar: "خدماتنا",
    },
    "about.activities": {
      en: "Community Activities",
      fi: "Yhteisön toiminta",
      ar: "أنشطة المجتمع",
    },
    "about.services_title": {
      en: "Services We Provide",
      fi: "Tarjoamamme palvelut",
      ar: "الخدمات التي نقدمها",
    },
    "service.prayers": {
      en: "Daily Prayers",
      fi: "Päivittäiset rukoukset",
      ar: "الصلوات اليومية",
    },
    "service.prayers_desc": {
      en: "All five daily prayers are held at the mosque with congregation.",
      fi: "Kaikki viisi päivittäistä rukousta pidetään moskeijassa seurakunnan kanssa.",
      ar: "تقام جميع الصلوات الخمس اليومية في المسجد مع الجماعة.",
    },
    "service.quran": {
      en: "Quran Classes",
      fi: "Koraani-oppitunnit",
      ar: "دروس القرآن",
    },
    "service.quran_desc": {
      en: "Weekly classes for children and adults to learn Quran recitation.",
      fi: "Viikoittaiset oppitunnit lapsille ja aikuisille Koraanin resitaation oppimiseen.",
      ar: "دروس أسبوعية للأطفال والكبار لتعلم تلاوة القرآن.",
    },
    "service.education": {
      en: "Islamic Education",
      fi: "Islamilainen koulutus",
      ar: "التعليم الإسلامي",
    },
    "service.education_desc": {
      en: "Regular lectures and workshops on Islamic teachings and practice.",
      fi: "Säännöllisiä luentoja ja työpajoja islamilaisista opetuksista ja käytännöistä.",
      ar: "محاضرات وورش عمل منتظمة حول التعاليم والممارسات الإسلامية.",
    },
    "service.support": {
      en: "Community Support",
      fi: "Yhteisön tuki",
      ar: "دعم المجتمع",
    },
    "service.support_desc": {
      en: "Assistance for newcomers, counseling, and social services.",
      fi: "Apua tulokkaille, neuvontaa ja sosiaalipalveluja.",
      ar: "مساعدة للوافدين الجدد، والمشورة، والخدمات الاجتماعية.",
    },
    "service.meals": {
      en: "Community Meals",
      fi: "Yhteisön ateriat",
      ar: "وجبات المجتمع",
    },
    "service.meals_desc": {
      en: "Regular iftar during Ramadan and other community gatherings.",
      fi: "Säännöllinen iftar Ramadanin aikana ja muita yhteisön kokoontumisia.",
      ar: "إفطار منتظم خلال رمضان وغيرها من التجمعات المجتمعية.",
    },
    "service.dialogue": {
      en: "Interfaith Dialogue",
      fi: "Uskontojen välinen vuoropuhelu",
      ar: "الحوار بين الأديان",
    },
    "service.dialogue_desc": {
      en: "Programs to foster understanding and cooperation with other faith communities.",
      fi: "Ohjelmia ymmärryksen ja yhteistyön edistämiseksi muiden uskontokuntien kanssa.",
      ar: "برامج لتعزيز التفاهم والتعاون مع المجتمعات الدينية الأخرى.",
    },
    "events.title": {
      en: "Events & Activities",
      fi: "Tapahtumat ja toiminta",
      ar: "الفعاليات والأنشطة",
    },
    "events.subtitle": {
      en: "Join us for upcoming events at the Islamic Center of Kuopio",
      fi: "Liity kanssamme tuleviin tapahtumiin Kuopion islamilaisessa keskuksessa",
      ar: "انضم إلينا للفعاليات القادمة في المركز الإسلامي في كوبيو",
    },
    "events.featured": {
      en: "Featured",
      fi: "Esillä",
      ar: "مميز",
    },
    "events.details": {
      en: "Event Details",
      fi: "Tapahtuman tiedot",
      ar: "تفاصيل الحدث",
    },
    "events.learn_more": {
      en: "Learn More",
      fi: "Lue lisää",
      ar: "اقرأ المزيد",
    },
    "events.view_calendar": {
      en: "View Full Calendar",
      fi: "Katso koko kalenteri",
      ar: "عرض التقويم الكامل",
    },
    "news.title": {
      en: "News & Announcements",
      fi: "Uutiset ja ilmoitukset",
      ar: "الأخبار والإعلانات",
    },
    "news.subtitle": {
      en: "Stay updated with the latest from our community",
      fi: "Pysy ajan tasalla yhteisömme viimeisimmistä tapahtumista",
      ar: "ابق على اطلاع بأحدث المستجدات من مجتمعنا",
    },
    "news.read_more": {
      en: "Read More",
      fi: "Lue lisää",
      ar: "اقرأ المزيد",
    },
    "news.newsletter": {
      en: "Subscribe to Our Newsletter",
      fi: "Tilaa uutiskirjeemme",
      ar: "اشترك في نشرتنا الإخبارية",
    },
    "news.newsletter_desc": {
      en: "Receive news, event updates, and announcements directly to your inbox",
      fi: "Vastaanota uutisia, tapahtumapäivityksiä ja ilmoituksia suoraan sähköpostiisi",
      ar: "تلقى الأخبار وتحديثات الأحداث والإعلانات مباشرة إلى صندوق الوارد الخاص بك",
    },
    "news.subscribe": {
      en: "Subscribe",
      fi: "Tilaa",
      ar: "اشترك",
    },
    "donate.title": {
      en: "Support Our Mosque",
      fi: "Tue moskeijaamme",
      ar: "ادعم مسجدنا",
    },
    "donate.subtitle": {
      en: "Your donations help us maintain and grow our community services",
      fi: "Lahjoituksesi auttavat meitä ylläpitämään ja kasvattamaan yhteisöpalvelujamme",
      ar: "تساعدنا تبرعاتك في الحفاظ على خدمات مجتمعنا وتنميتها",
    },
    "donate.where": {
      en: "Where Your Donation Goes",
      fi: "Mihin lahjoituksesi menevät",
      ar: "أين تذهب تبرعاتك",
    },
    "donate.maintenance": {
      en: "Mosque Maintenance",
      fi: "Moskeijan ylläpito",
      ar: "صيانة المسجد",
    },
    "donate.maintenance_desc": {
      en: "Funds for building upkeep, utilities, and necessary repairs",
      fi: "Varoja rakennuksen ylläpitoon, käyttöhyödykkeisiin ja tarvittaviin korjauksiin",
      ar: "أموال لصيانة المبنى والمرافق والإصلاحات الضرورية",
    },
    "donate.education": {
      en: "Educational Programs",
      fi: "Koulutusohjelmat",
      ar: "البرامج التعليمية",
    },
    "donate.education_desc": {
      en: "Supporting Quran classes, Islamic studies, and language courses",
      fi: "Koraani-luokkien, islamilaisten opintojen ja kielikurssien tukeminen",
      ar: "دعم فصول القرآن والدراسات الإسلامية ودورات اللغة",
    },
    "donate.community": {
      en: "Community Services",
      fi: "Yhteisöpalvelut",
      ar: "خدمات المجتمع",
    },
    "donate.community_desc": {
      en: "Assistance for families in need, new converts, and community events",
      fi: "Apua tarvitseville perheille, uusille käännynnäisille ja yhteisötapahtumille",
      ar: "مساعدة للعائلات المحتاجة والمتحولين الجدد وفعاليات المجتمع",
    },
    "donate.expansion": {
      en: "Expansion Projects",
      fi: "Laajennushankkeet",
      ar: "مشاريع التوسع",
    },
    "donate.expansion_desc": {
      en: "Funding for new facilities and expanding our services",
      fi: "Rahoitus uusille tiloille ja palvelujemme laajentamiselle",
      ar: "تمويل المرافق الجديدة وتوسيع خدماتنا",
    },
    "donate.goal": {
      en: "Current Funding Goal:",
      fi: "Nykyinen rahoitustavoite:",
      ar: "هدف التمويل الحالي:",
    },
    "donate.raised": {
      en: "raised",
      fi: "kerätty",
      ar: "تم جمعه",
    },
    "donate.goal_amount": {
      en: "Goal:",
      fi: "Tavoite:",
      ar: "الهدف:",
    },
    "donate.make": {
      en: "Make a Donation",
      fi: "Tee lahjoitus",
      ar: "تبرع",
    },
    "donate.select_amount": {
      en: "Select Amount",
      fi: "Valitse summa",
      ar: "اختر المبلغ",
    },
    "donate.custom": {
      en: "Custom",
      fi: "Mukautettu",
      ar: "مخصص",
    },
    "donate.type": {
      en: "Donation Type",
      fi: "Lahjoitustyyppi",
      ar: "نوع التبرع",
    },
    "donate.general": {
      en: "General Donation",
      fi: "Yleinen lahjoitus",
      ar: "تبرع عام",
    },
    "donate.expansion_project": {
      en: "Expansion Project",
      fi: "Laajennushanke",
      ar: "مشروع التوسع",
    },
    "donate.education_programs": {
      en: "Education Programs",
      fi: "Koulutusohjelmat",
      ar: "البرامج التعليمية",
    },
    "donate.community_services": {
      en: "Community Services",
      fi: "Yhteisöpalvelut",
      ar: "خدمات المجتمع",
    },
    "donate.zakat": {
      en: "Zakat",
      fi: "Zakat",
      ar: "زكاة",
    },
    "donate.sadaqah": {
      en: "Sadaqah",
      fi: "Sadaqah",
      ar: "صدقة",
    },
    "donate.frequency": {
      en: "Donation Frequency",
      fi: "Lahjoitustiheys",
      ar: "تكرار التبرع",
    },
    "donate.one_time": {
      en: "One-time",
      fi: "Kertaluonteinen",
      ar: "مرة واحدة",
    },
    "donate.monthly": {
      en: "Monthly",
      fi: "Kuukausittain",
      ar: "شهريًا",
    },
    "donate.proceed": {
      en: "Proceed to Donation",
      fi: "Siirry lahjoitukseen",
      ar: "المتابعة إلى التبرع",
    },
    "donate.other_ways": {
      en: "Other ways to donate:",
      fi: "Muita tapoja lahjoittaa:",
      ar: "طرق أخرى للتبرع:",
    },
    "donate.bank_transfer": {
      en: "Bank Transfer",
      fi: "Pankkisiirto",
      ar: "تحويل مصرفي",
    },
    "donate.cash": {
      en: "Cash Donation",
      fi: "Käteislahjoitus",
      ar: "تبرع نقدي",
    },
    "contact.title": {
      en: "Contact Us",
      fi: "Ota yhteyttä",
      ar: "اتصل بنا",
    },
    "contact.subtitle": {
      en: "Get in touch with the Islamic Center of Kuopio",
      fi: "Ota yhteyttä Kuopion islamilaiseen keskukseen",
      ar: "تواصل مع المركز الإسلامي في كوبيو",
    },
    "contact.location": {
      en: "Our Location",
      fi: "Sijaintimme",
      ar: "موقعنا",
    },
    "contact.address": {
      en: "Address",
      fi: "Osoite",
      ar: "العنوان",
    },
    "contact.phone": {
      en: "Phone",
      fi: "Puhelin",
      ar: "الهاتف",
    },
    "contact.email": {
      en: "Email",
      fi: "Sähköposti",
      ar: "البريد الإلكتروني",
    },
    "contact.hours": {
      en: "Office Hours",
      fi: "Aukioloajat",
      ar: "ساعات العمل",
    },
    "contact.message": {
      en: "Send Us a Message",
      fi: "Lähetä meille viesti",
      ar: "أرسل لنا رسالة",
    },
    "contact.name": {
      en: "Your Name",
      fi: "Nimesi",
      ar: "اسمك",
    },
    "contact.email_address": {
      en: "Email Address",
      fi: "Sähköpostiosoite",
      ar: "عنوان البريد الإلكتروني",
    },
    "contact.subject": {
      en: "Subject",
      fi: "Aihe",
      ar: "الموضوع",
    },
    "contact.general": {
      en: "General Inquiry",
      fi: "Yleinen kysely",
      ar: "استفسار عام",
    },
    "contact.prayer_times": {
      en: "Prayer Times",
      fi: "Rukousajat",
      ar: "أوقات الصلاة",
    },
    "contact.events": {
      en: "Events & Activities",
      fi: "Tapahtumat ja aktiviteetit",
      ar: "الفعاليات والأنشطة",
    },
    "contact.donations": {
      en: "Donations",
      fi: "Lahjoitukset",
      ar: "التبرعات",
    },
    "contact.volunteering": {
      en: "Volunteering",
      fi: "Vapaaehtoistyö",
      ar: "التطوع",
    },
    "contact.other": {
      en: "Other",
      fi: "Muu",
      ar: "أخرى",
    },
    "contact.your_message": {
      en: "Your Message",
      fi: "Viestisi",
      ar: "رسالتك",
    },
    "contact.send": {
      en: "Send Message",
      fi: "Lähetä viesti",
      ar: "إرسال الرسالة",
    },
    "contact.connect": {
      en: "Connect With Us",
      fi: "Yhdistä kanssamme",
      ar: "تواصل معنا",
    },
    "footer.rights": {
      en: "All rights reserved.",
      fi: "Kaikki oikeudet pidätetään.",
      ar: "جميع الحقوق محفوظة.",
    },
    "footer.privacy": {
      en: "Privacy Policy",
      fi: "Tietosuojakäytäntö",
      ar: "سياسة الخصوصية",
    },
    "footer.terms": {
      en: "Terms of Service",
      fi: "Käyttöehdot",
      ar: "شروط الخدمة",
    },
    "footer.sitemap": {
      en: "Sitemap",
      fi: "Sivukartta",
      ar: "خريطة الموقع",
    },
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const translate = (key: string): string => {
    if (!translations[key]) return key;
    return translations[key][language] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t: translate,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
