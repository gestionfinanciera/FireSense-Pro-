
import React from 'react';
import { Language, SavedConfig } from '../types';
import { TRANSLATIONS } from '../constants';

interface FavoritesScreenProps {
  language: Language;
  savedConfigs: SavedConfig[];
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ language, savedConfigs }) => {
  const text = TRANSLATIONS[language];
  const isArabic = language === 'ar';

  if (savedConfigs.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white animate-in fade-in duration-500" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="relative mb-12 transform hover:scale-105 transition-transform duration-300">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-50 rounded-full opacity-60"></div>
          <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-red-50 rounded-full opacity-40"></div>
          <div className="relative z-10 w-48 h-48 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
               <path d="M60 40 L140 40 Q150 40 150 50 L150 150 Q150 160 140 160 L60 160 Q50 160 50 150 L50 50 Q50 40 60 40" fill="#4ADE80" />
               <path d="M65 55 L135 55" stroke="white" strokeWidth="4" strokeLinecap="round" />
               <path d="M65 75 L135 75" stroke="white" strokeWidth="4" strokeLinecap="round" />
               <path d="M65 95 L110 95" stroke="white" strokeWidth="4" strokeLinecap="round" />
               <path d="M65 115 L110 115" stroke="white" strokeWidth="4" strokeLinecap="round" />
               <circle cx="120" cy="110" r="35" fill="white" stroke="#333" strokeWidth="4" />
               <line x1="145" x2="165" y1="135" y2="155" stroke="#333" strokeWidth="8" strokeLinecap="round" />
               <path d="M108 98 L132 122 M132 98 L108 122" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <div className="text-center space-y-4 max-w-xs">
          <h3 className="text-xl font-black text-gray-800 tracking-tight uppercase">{text.noFavoritesTitle}</h3>
          <p className="text-gray-400 font-bold text-sm leading-relaxed">{text.noFavoritesDesc}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 animate-in fade-in duration-300" dir={isArabic ? 'rtl' : 'ltr'}>
      {savedConfigs.map((config) => (
        <div key={config.id} className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 overflow-hidden relative group">
           {/* Header de la config */}
           <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-black text-gray-900 uppercase leading-none mb-1">{config.name}</h3>
                <p className="text-[10px] text-[#FF1E1E] font-black uppercase tracking-widest">{config.device}</p>
              </div>
              <span className="text-[10px] text-gray-400 font-bold">{config.date}</span>
           </div>

           {/* Grid de valores compactos */}
           <div className="grid grid-cols-3 gap-3 mb-4">
              <ValueBox label="GEN" value={config.general} />
              <ValueBox label="RED" value={config.redDot} />
              <ValueBox label="2X" value={config.mira2x} />
              <ValueBox label="4X" value={config.mira4x} />
              <ValueBox label="AWP" value={config.sniper} />
              <ValueBox label="BTN" value={`${config.buttonSize}%`} />
           </div>

           {/* DPI Info footer */}
           <div className="flex items-center justify-between pt-3 border-t border-gray-50">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                DPI: <span className="text-gray-900">{config.dpi || 'N/A'}</span>
              </span>
              <button className="text-[#FF1E1E] text-xs font-black uppercase tracking-tighter hover:underline">
                {text.verTodas}
              </button>
           </div>
        </div>
      ))}
      <div className="h-20"></div>
    </div>
  );
};

const ValueBox: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="bg-gray-50 rounded-xl p-2 text-center border border-gray-100">
    <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">{label}</p>
    <p className="text-sm font-black text-gray-900">{value}</p>
  </div>
);

export default FavoritesScreen;
