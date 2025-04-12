import { useLanguage } from "@/hooks/useLanguage";
import { getDirection } from "@/lib/i18n";
import { motion } from "framer-motion";
import { fadeIn } from "@/hooks/useAnimations";
import { 
  BookOpen, 
  GraduationCap, 
  Heart, 
  Users, 
  Leaf, 
  Utensils 
} from "lucide-react";

export default function ServicesSection() {
  const { language } = useLanguage();
  const direction = getDirection(language);
  
  const services = [
    {
      title: language === "ar" ? "القرآن والتعليم الإسلامي" : "Quran & Islamic Education",
      description: language === "ar" 
        ? "دروس القرآن وتعليم أساسيات الإسلام للأطفال والبالغين"
        : "Quran lessons and teaching Islamic basics for children and adults",
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      title: language === "ar" ? "المناسبات الاجتماعية" : "Social Gatherings",
      description: language === "ar" 
        ? "اجتماعات وأنشطة لربط المجتمع الإسلامي في كوبيو"
        : "Meetings and activities to connect the Islamic community in Kuopio",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: language === "ar" ? "الدعم الخيري" : "Charity Support",
      description: language === "ar" 
        ? "مبادرات جمع التبرعات ودعم المحتاجين في المجتمع"
        : "Fundraising initiatives and supporting those in need in the community",
      icon: <Heart className="w-6 h-6" />,
    },
    {
      title: language === "ar" ? "التعليم والتوجيه" : "Education & Guidance",
      description: language === "ar" 
        ? "دروس ومحاضرات في مختلف جوانب الإسلام والحياة الإسلامية"
        : "Lectures and seminars on various aspects of Islam and Islamic living",
      icon: <GraduationCap className="w-6 h-6" />,
    },
    {
      title: language === "ar" ? "الإفطار الرمضاني" : "Ramadan Iftars",
      description: language === "ar" 
        ? "إفطارات جماعية خلال شهر رمضان المبارك"
        : "Community iftars during the blessed month of Ramadan",
      icon: <Utensils className="w-6 h-6" />,
    },
    {
      title: language === "ar" ? "الحفاظ على البيئة" : "Environmental Initiatives",
      description: language === "ar" 
        ? "أنشطة للحفاظ على البيئة بما يتوافق مع تعاليم الإسلام"
        : "Activities to preserve the environment in line with Islamic teachings",
      icon: <Leaf className="w-6 h-6" />,
    },
  ];
  
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-gray-900 dark:to-gray-950" dir={direction}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-4">
            {language === 'ar' ? 'خدماتنا' : 'Our Services'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'اكتشف كيف يخدم مسجد النور المجتمع الإسلامي في كوبيو'
              : 'Discover how Al-Noor Mosque serves the Islamic community in Kuopio'}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ 
  title, 
  description, 
  icon,
  index
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  index: number;
}) {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeIn}
      transition={{ delay: index * 0.1 }}
    >
      <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </motion.div>
  );
}