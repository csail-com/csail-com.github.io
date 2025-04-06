"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import en from "../../../public/lang/en.json";
import ko from "../../../public/lang/ko.json";

type Language = "ko" | "en";
type TranslationType = typeof ko;

interface LanguageContextType {
  language: Language;
  translations: TranslationType;
  setLanguage: (lang: Language) => void;
}

const defaultLanguage: Language = "ko";
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [translations, setTranslations] = useState<TranslationType>(ko);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") as Language;
    if (
      storedLanguage &&
      (storedLanguage === "ko" || storedLanguage === "en")
    ) {
      setLanguageState(storedLanguage);
      setTranslations(storedLanguage === "ko" ? ko : en);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setTranslations(lang === "ko" ? ko : en);
    localStorage.setItem("language", lang);

    // 언어 변경 시 페이지 맨 위로 스크롤
    window.scrollTo(0, 0);
  };

  return (
    <LanguageContext.Provider value={{ language, translations, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default function useLanguage() {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}
