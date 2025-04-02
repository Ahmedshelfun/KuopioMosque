import { useState } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube 
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { getDirection } from "@/lib/i18n";
import { ContactMessage } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function ContactSection() {
  const { language, t } = useLanguage();
  const dir = getDirection(language);
  const { toast } = useToast();
  
  const [contactForm, setContactForm] = useState<ContactMessage>({
    name: "",
    email: "",
    subject: t("contact.general"),
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/contact", contactForm);
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset form
      setContactForm({
        name: "",
        email: "",
        subject: t("contact.general"),
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-neutral-lightest" dir={dir}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-2">{t("contact.title")}</h2>
          <p className="text-neutral-dark">{t("contact.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold text-primary-dark mb-6">
              {t("contact.location")}
            </h3>

            {/* Map */}
            <div className="bg-white p-1 rounded-lg shadow-md mb-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14655.073546613684!2d27.6594664!3d62.8924767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4684b0eecb4aaa23%3A0xff38aee1d6b21818!2sKuopio%2C%20Finland!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mosque Location"
                className="rounded-lg"
              ></iframe>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mt-1 mr-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">{t("contact.address")}</h4>
                  <p className="text-neutral-darkest">
                    Kuopio Islamic Center
                    <br />
                    123 Example Street
                    <br />
                    70100 Kuopio, Finland
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-1 mr-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">{t("contact.phone")}</h4>
                  <p className="text-neutral-darkest">+358 50 123 4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-1 mr-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">{t("contact.email")}</h4>
                  <p className="text-neutral-darkest">info@kuopiomosque.fi</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-1 mr-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">{t("contact.hours")}</h4>
                  <p className="text-neutral-darkest">
                    Monday - Friday: 10:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 2:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-primary-dark mb-6">
              {t("contact.message")}
            </h3>

            <form className="bg-white rounded-lg shadow-md p-6" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-neutral-darkest mb-2 font-medium">
                  {t("contact.name")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="mb-4">
                <label className="block text-neutral-darkest mb-2 font-medium">
                  {t("contact.email_address")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="mb-4">
                <label className="block text-neutral-darkest mb-2 font-medium">
                  {t("contact.subject")}
                </label>
                <select
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>{t("contact.general")}</option>
                  <option>{t("contact.prayer_times")}</option>
                  <option>{t("contact.events")}</option>
                  <option>{t("contact.donations")}</option>
                  <option>{t("contact.volunteering")}</option>
                  <option>{t("contact.other")}</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-neutral-darkest mb-2 font-medium">
                  {t("contact.your_message")}
                </label>
                <textarea
                  rows={5}
                  name="message"
                  value={contactForm.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-primary text-white font-bold rounded-md hover:bg-primary-dark transition flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </>
                ) : (
                  t("contact.send")
                )}
              </button>
            </form>

            <div className="mt-8">
              <h4 className="font-bold mb-4">{t("contact.connect")}</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-dark transition"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-dark transition"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-dark transition"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-dark transition"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
