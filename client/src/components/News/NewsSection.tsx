import { useQuery } from "@tanstack/react-query";
import { NewsItem } from "@/lib/types";
import { Clock, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { getDirection } from "@/lib/i18n";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function NewsSection() {
  const { language, t } = useLanguage();
  const dir = getDirection(language);
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const { data: newsItems, isLoading } = useQuery<NewsItem[]>({
    queryKey: ['/api/news'],
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would submit to an API
    toast({
      title: "Thank you for subscribing!",
      description: "You will now receive our newsletter",
    });
    
    setEmail("");
  };

  if (isLoading) {
    return (
      <section id="news" className="py-16 bg-white" dir={dir}>
        <div className="container mx-auto px-4 text-center">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-2">{t("news.title")}</h2>
            <p className="text-neutral-dark">{t("news.subtitle")}</p>
          </div>
          <div className="w-full h-64 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="py-16 bg-white" dir={dir}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-2">{t("news.title")}</h2>
          <p className="text-neutral-dark">{t("news.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {newsItems?.map((item) => (
            <div
              key={item.id}
              className="bg-neutral-lightest rounded-lg overflow-hidden"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <div className="flex items-center text-neutral-dark text-sm mb-3">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-xl font-bold text-primary-dark mb-3">
                  {item.title}
                </h3>
                <p className="text-neutral-darkest mb-4 text-sm">
                  {item.content}
                </p>
                <a
                  href="#"
                  className="text-primary hover:underline text-sm font-medium flex items-center"
                >
                  {t("news.read_more")} <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Subscribe to Newsletter */}
        <div className="mt-12 bg-primary-light bg-opacity-10 rounded-lg p-8 max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-primary-dark mb-2">
              {t("news.newsletter")}
            </h3>
            <p className="text-neutral-dark">{t("news.newsletter_desc")}</p>
          </div>

          <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white font-bold rounded-md hover:bg-primary-dark transition"
            >
              {t("news.subscribe")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
