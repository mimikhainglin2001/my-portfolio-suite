import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { translations, TranslationKey, Language } from "@/i18n/translations";

interface LangCtx {
  lang: Language;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LangCtx | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    return (localStorage.getItem("lang") as Language) || "en";
  });

  useEffect(() => {
    document.documentElement.lang = lang === "mm" ? "my" : "en";
    document.documentElement.classList.toggle("lang-mm", lang === "mm");
    localStorage.setItem("lang", lang);
  }, [lang]);

  const toggleLang = () => setLang((l) => (l === "en" ? "mm" : "en"));
  const t = (key: TranslationKey) => translations[lang][key] ?? translations.en[key] ?? key;

  return <LanguageContext.Provider value={{ lang, toggleLang, t }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
};
