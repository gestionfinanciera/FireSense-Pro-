
import React, { useState } from 'react';
import { Language } from '../types';
import { LANGUAGES, TRANSLATIONS } from '../constants';

interface LanguageSelectorProps {
  onConfirm: (lang: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onConfirm }) => {
  const [tempLang, setTempLang] = useState<Language>('es');
  
  const currentText = TRANSLATIONS[tempLang];

  return (
    <div className="flex flex-col min-h-screen px-6 py-12 md:max-w-md mx-auto relative bg-[#f9fafb]">
      <div className="flex-1 flex flex-col items-center justify-center text-center mb-12 relative z-10">
        <div className="mb-8 p-4 rounded-2xl bg-white shadow-lg border border-gray-100">
           <svg className="w-12 h-12 text-[#FF1E1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
           </svg>
        </div>
        <h1 className="text-3xl font-black mb-4 text-gray-900 tracking-tight uppercase">
          {currentText.title}
        </h1>
        <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-[280px]">
          {currentText.subtitle}
        </p>
      </div>

      <div className="space-y-3 mb-12 relative z-10">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.id}
            onClick={() => setTempLang(lang.id)}
            className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
              tempLang === lang.id 
                ? 'bg-red-50 border-2 border-[#FF1E1E] shadow-sm' 
                : 'bg-white border-2 border-transparent hover:bg-gray-50 shadow-sm'
            }`}
          >
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <span className="text-2xl">{lang.flag}</span>
              <span className={`font-bold text-md ${tempLang === lang.id ? 'text-[#FF1E1E]' : 'text-gray-700'}`}>
                {lang.name}
              </span>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
              tempLang === lang.id ? 'border-[#FF1E1E] bg-[#FF1E1E]' : 'border-gray-300'
            }`}>
              {tempLang === lang.id && (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={() => onConfirm(tempLang)}
        className="w-full neon-bg-red py-4 rounded-xl font-black text-lg text-white uppercase tracking-widest transition-all hover:brightness-110 active:scale-95 shadow-xl"
      >
        {currentText.selectButton}
      </button>
    </div>
  );
};

export default LanguageSelector;
