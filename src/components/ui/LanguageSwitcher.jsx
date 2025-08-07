'use client';
import React from 'react';
import { useTranslation } from '../../contexts/TranslationContext';

const LanguageSwitcher = ({ className = '' }) => {
  const { language, changeLanguage, availableLanguages } = useTranslation();

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
  };

  const getLanguageDisplayName = (lang) => {
    const displayNames = {
      fr: 'Français',
      en: 'English'
    };
    return displayNames[lang] || lang;
  };

  const getLanguageFlag = (lang) => {
    const flags = {
      fr: '🇫🇷',
      en: '🇺🇸'
    };
    return flags[lang] || '🌐';
  };

  return (
    <div className={`language-switcher ${className}`}>
      <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm border p-2">
        {availableLanguages.map((lang) => (
          <button
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={`
              flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium transition-all duration-200
              ${language === lang 
                ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              }
            `}
            aria-label={`Switch to ${getLanguageDisplayName(lang)}`}
          >
            <span className="text-sm">{getLanguageFlag(lang)}</span>
            <span className="hidden sm:inline">{getLanguageDisplayName(lang)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;