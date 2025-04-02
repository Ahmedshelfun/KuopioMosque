import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2 text-sm">
      <button
        className={cn("transition-all", language === "en" ? "font-bold" : "")}
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
      <span>|</span>
      <button
        className={cn("transition-all", language === "fi" ? "font-bold" : "")}
        onClick={() => setLanguage("fi")}
      >
        FI
      </button>
      <span>|</span>
      <button
        className={cn(
          "transition-all font-arabic",
          language === "ar" ? "font-bold" : ""
        )}
        onClick={() => setLanguage("ar")}
      >
        العربية
      </button>
    </div>
  );
}
