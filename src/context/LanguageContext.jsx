import React, { createContext, useContext, useState } from 'react';
import { translations } from '../content/translations';

const LanguageContext = createContext({
  language: 'pt',
  setLanguage: () => {},
  t: translations.pt,
});

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_lang');
      if (saved === 'en' || saved === 'pt') return saved;
    } catch (e) {
      // ignore
    }
    return 'pt';
  });

  const setLanguage = (lang) => {
    if (lang === 'pt' || lang === 'en') {
      setLanguageState(lang);
      try {
        localStorage.setItem('portfolio_lang', lang);
      } catch (e) {
        // ignore
      }
    }
  };

  const t = translations[language] || translations.pt;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
