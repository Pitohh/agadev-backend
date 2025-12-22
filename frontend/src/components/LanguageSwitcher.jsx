import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import clsx from 'clsx';

const LanguageSwitcher = ({ className }) => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={clsx(
        'flex items-center space-x-2 px-3 py-2 rounded-md',
        'text-blue-black hover:text-green-medium transition-colors',
        'hover:bg-beige-light/20',
        className
      )}
      aria-label="Change language"
    >
      <Globe size={18} />
      <span className="font-medium uppercase">
        {i18n.language === 'fr' ? 'EN' : 'FR'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
