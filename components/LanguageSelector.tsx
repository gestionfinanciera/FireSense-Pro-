
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
    <div className="flex flex-col min-h-screen px-6 py-12 md:max-w-md mx-auto relative">
      {/* Decorative background blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#00E5FF]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="flex-1 flex flex-col items-center justify-center text-center mb-12 relative z-10">
        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-br from-[#00E5FF]/20 to-transparent border border-[#00E5FF]/30 shadow-[0_0_30px_rgba(0,229,255,0.15)]">
           <svg className="w-12 h-12 text-[#00E5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
           </svg>
        </div>
        <h1 className="text-3xl font-extrabold mb-4 neon-text-blue tracking-tight">
          {currentText.title}
        </h1>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-[280px]">
          {currentText.subtitle}
        </p>
      </div>

      <div className="space-y-4 mb-12 relative z-10">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.id}
            onClick={() => setTempLang(lang.id)}
            className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-300 group ${
              tempLang === lang.id 
                ? 'bg-gradient-to-r from-[#00E5FF]/20 to-transparent border-2 border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.2)]' 
                : 'glass-panel border-transparent hover:border-gray-700'
            }`}
          >
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <span className="text-2xl filter drop-shadow-md">{lang.flag}</span>
              <span className={`font-semibold text-lg transition-colors ${tempLang === lang.id ? 'text-[#00E5FF]' : 'text-gray-300'}`}>
                {lang.name}
              </span>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              tempLang === lang.id ? 'border-[#00E5FF] bg-[#00E5FF]/10' : 'border-gray-600'
            }`}>
              {tempLang === lang.id && (
                <div className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] animate-pulse"></div>
              )}
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={() => onConfirm(tempLang)}
        className="w-full neon-bg-blue py-5 rounded-2xl font-bold text-lg text-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] relative z-10 overflow-hidden"
      >
        <span className="relative z-10">{currentText.selectButton}</span>
        <div className="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-0 transition-transform duration-300"></div>
      </button>
    </div>
  );
};

export default LanguageSelector;
