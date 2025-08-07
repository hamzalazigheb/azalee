'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const TranslationContext = createContext();

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr');
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    // Load translations dynamically
    const loadTranslations = async () => {
      try {
        const translationModule = await import(`../translations/${language}.js`);
        setTranslations(translationModule.default);
      } catch (error) {
        console.error(`Failed to load translations for ${language}:`, error);
        // Fallback to empty object if translations fail to load
        setTranslations({});
      }
    };

    loadTranslations();
  }, [language]);

  const t = (key, defaultValue = key) => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return defaultValue;
      }
    }
    
    return typeof value === 'string' ? value : defaultValue;
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    // Optionally store in localStorage
    localStorage.setItem('preferred-language', newLanguage);
  };

  // Load preferred language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && savedLanguage !== language) {
      setLanguage(savedLanguage);
    }
  }, []);

  const value = {
    language,
    t,
    changeLanguage,
    availableLanguages: ['fr', 'en']
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};