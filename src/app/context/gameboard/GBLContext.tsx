"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface ILanguageContext {
  gameboardLanguage: string;
  setGameboardLanguage: (lang: string) => void;
}

const LanguageContext = createContext<ILanguageContext | undefined>(undefined);

export const GBLanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [gameboardLanguage, setGameboardLanguage] = useState<string>("se");

  return (
    <LanguageContext.Provider
      value={{ gameboardLanguage, setGameboardLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a `<LanguageProvider>`");
  }
  return context;
};
