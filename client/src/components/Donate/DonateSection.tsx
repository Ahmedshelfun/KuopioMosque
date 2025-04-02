import { useState } from "react";
import { 
  Home, 
  BookOpen, 
  Heart, 
  Building, 
  Banknote, 
  Coins 
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { getDirection } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";

export default function DonateSection() {
  const { language, t } = useLanguage();
  const dir = getDirection(language);
  const { toast } = useToast();
  
  const [amount, setAmount] = useState<string>("");
  const [donationType, setDonationType] = useState("General Donation");
  const [frequency, setFrequency] = useState("one-time");

  const handleAmountSelect = (selectedAmount: string) => {
    setAmount(selectedAmount);
  };

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount) {
      toast({
        title: "Error",
        description: "Please select a donation amount",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would submit to a payment processor
    toast({
      title: "Thank you for your donation!",
      description: `Your ${frequency} donation of €${amount} will help support our community.`,
    });
  };

  return (
    <section id="donate" className="py-16 bg-secondary bg-opacity-10" dir={dir}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-2">{t("donate.title")}</h2>
          <p className="text-neutral-dark">{t("donate.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold text-primary-dark mb-4">
              {t("donate.where")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mt-1 mr-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white">
                  <Home className="h-3 w-3" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">{t("donate.maintenance")}</h4>
                  <p className="text-sm text-neutral-darkest">
                    {t("donate.maintenance_desc")}
                  </p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="mt-1 mr-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white">
                  <BookOpen className="h-3 w-3" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">{t("donate.education")}</h4>
                  <p className="text-sm text-neutral-darkest">
                    {t("donate.education_desc")}
                  </p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="mt-1 mr-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white">
                  <Heart className="h-3 w-3" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">{t("donate.community")}</h4>
                  <p className="text-sm text-neutral-darkest">
                    {t("donate.community_desc")}
                  </p>
                </div>
              </li>

              <li className="flex items-start">
                <div className="mt-1 mr-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white">
                  <Building className="h-3 w-3" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">{t("donate.expansion")}</h4>
                  <p className="text-sm text-neutral-darkest">
                    {t("donate.expansion_desc")}
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-8">
              <h4 className="font-bold mb-2">{t("donate.goal")}:</h4>
              <div className="w-full bg-neutral rounded-full h-4">
                <div
                  className="bg-primary h-4 rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span>€32,500 {t("donate.raised")}</span>
                <span>{t("donate.goal_amount")} €50,000</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-primary-dark mb-4">
              {t("donate.make")}
            </h3>

            <form onSubmit={handleDonationSubmit}>
              <div className="mb-4">
                <label className="block text-neutral-darkest mb-2 font-medium">
                  {t("donate.select_amount")}
                </label>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {["10", "25", "50", "100", "250"].map((value) => (
                    <button
                      key={value}
                      type="button"
                      className={`py-2 border-2 ${
                        amount === value
                          ? "border-primary-light bg-primary-light text-white"
                          : "border-primary text-primary hover:bg-primary hover:text-white"
                      } rounded-md font-bold transition`}
                      onClick={() => handleAmountSelect(value)}
                    >
                      €{value}
                    </button>
                  ))}
                  <button
                    type="button"
                    className={`py-2 border-2 rounded-md font-bold ${
                      !["10", "25", "50", "100", "250"].includes(amount)
                        ? "border-primary-light bg-primary-light text-white"
                        : "border-primary text-primary hover:bg-primary hover:text-white"
                    }`}
                    onClick={() => setAmount("custom")}
                  >
                    {t("donate.custom")}
                  </button>
                </div>

                {amount === "custom" && (
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    min="1"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                )}

                <div className="mb-4">
                  <label className="block text-neutral-darkest mb-2 font-medium">
                    {t("donate.type")}
                  </label>
                  <select
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={donationType}
                    onChange={(e) => setDonationType(e.target.value)}
                  >
                    <option>{t("donate.general")}</option>
                    <option>{t("donate.expansion_project")}</option>
                    <option>{t("donate.education_programs")}</option>
                    <option>{t("donate.community_services")}</option>
                    <option>{t("donate.zakat")}</option>
                    <option>{t("donate.sadaqah")}</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-neutral-darkest mb-2 font-medium">
                    {t("donate.frequency")}
                  </label>
                  <div className="flex">
                    <button
                      type="button"
                      className={`flex-1 py-2 border-2 border-primary ${
                        frequency === "one-time"
                          ? "bg-primary text-white"
                          : "text-primary hover:bg-primary hover:text-white"
                      } rounded-l-md transition`}
                      onClick={() => setFrequency("one-time")}
                    >
                      {t("donate.one_time")}
                    </button>
                    <button
                      type="button"
                      className={`flex-1 py-2 border-2 border-primary ${
                        frequency === "monthly"
                          ? "bg-primary text-white"
                          : "text-primary hover:bg-primary hover:text-white"
                      } rounded-r-md transition`}
                      onClick={() => setFrequency("monthly")}
                    >
                      {t("donate.monthly")}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-secondary text-white font-bold rounded-md hover:bg-secondary-dark transition mt-4 flex items-center justify-center"
                >
                  {t("donate.proceed")} <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-neutral text-center">
              <p className="text-sm text-neutral-dark mb-4">{t("donate.other_ways")}:</p>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="#"
                  className="py-2 border border-neutral-dark rounded-md text-sm text-neutral-darkest hover:bg-neutral-light transition flex items-center justify-center"
                >
                  <Banknote className="mr-2 h-4 w-4" /> {t("donate.bank_transfer")}
                </a>
                <a
                  href="#"
                  className="py-2 border border-neutral-dark rounded-md text-sm text-neutral-darkest hover:bg-neutral-light transition flex items-center justify-center"
                >
                  <Coins className="mr-2 h-4 w-4" /> {t("donate.cash")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
