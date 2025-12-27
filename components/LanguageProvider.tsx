'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Lang, getCopy } from '@/lib/i18n';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (path: string) => string | string[] | any;
}

// Default context value for SSR
const defaultContext: LanguageContextType = {
  lang: 'de',
  setLang: () => {},
  t: (path: string) => {
    const keys = path.split('.');
    let value: any = getCopy('de');
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return path;
      }
    }
    return value;
  },
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('de');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get language from localStorage or default to 'de'
    const savedLang = localStorage.getItem('lang') as Lang;
    if (savedLang === 'de' || savedLang === 'en') {
      setLangState(savedLang);
    }
    setMounted(true);
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = (path: string): any => {
    const keys = path.split('.');
    let value: any = getCopy(lang);
    
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return path; // Return path if not found
      }
    }
    
    return value;
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

