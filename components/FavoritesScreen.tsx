
import React from 'react';
import { Language, SavedConfig } from '../types';
import { TRANSLATIONS } from '../constants';

interface FavoritesScreenProps {
  language: Language;
  savedConfigs: SavedConfig[];
  onDeleteConfig: (id: string) => void;
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ language, savedConfigs, onDeleteConfig }) => {
  const text = TRANSLATIONS[language];
  const isArabic = language === 'ar';

  if (savedConfigs.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white animate-in fade-in duration-500" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="relative mb-12 transform hover:scale-105 transition-transform duration-300">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-red-50 rounded-full opacity-60"></div>
          <div className="relative z-10 w-48 h-48 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
               <path d="M60 40 L140 40 Q150 40 150 50 L150 150 Q150 160 140 160 L60 160 Q50 160 50 150 L50 50 Q50 40 60 40" fill="#4ADE80" />
               <circle cx="120" cy="110" r="35" fill="white" stroke="#FF1E1E" strokeWidth="4" />
               <path d="M108 98 L132 122 M132 98 L108 122" stroke="#FF1E1E" strokeWidth="6" strokeLinecap="round" />
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
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 animate-in fade-in duration-300 bg-white" dir={isArabic ? 'rtl' : 'ltr'}>
      {savedConfigs.map((config) => (
        <div key={config.id} className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 overflow-hidden relative group">
           <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-black text-gray-900 uppercase leading-none mb-1">{config.name}</h3>
                <p className="text-[10px] text-[#FF1E1E] font-black uppercase tracking-widest">{config.device}</p>
              </div>
              <button onClick={() => onDeleteConfig(config.id)} className="text-red-500 p-1 active:scale-90">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
           </div>

           <div className="grid grid-cols-3 gap-3 mb-4">
              <ValueBox label="GEN" value={config.general} />
              <ValueBox label="RED" value={config.redDot} />
              <ValueBox label="2X" value={config.mira2x} />
              <ValueBox label="4X" value={config.mira4x} />
              <ValueBox label="AWP" value={config.sniper} />
              <ValueBox label="BTN" value={`${config.buttonSize}%`} />
           </div>

           <div className="flex items-center justify-between pt-3 border-t border-gray-50">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                DPI: <span className="text-gray-900">{config.dpi || 'N/A'}</span>
              </span>
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
