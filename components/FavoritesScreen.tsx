
import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface FavoritesScreenProps {
  language: Language;
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ language }) => {
  const text = TRANSLATIONS[language];
  const isArabic = language === 'ar';

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white animate-in fade-in duration-500" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Empty State Illustration */}
      <div className="relative mb-12 transform hover:scale-105 transition-transform duration-300">
        {/* Decorative Circles Background */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-50 rounded-full opacity-60"></div>
        <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-red-50 rounded-full opacity-40"></div>
        
        {/* Document SVG */}
        <div className="relative z-10 w-48 h-48 flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
             {/* Paper Shape */}
             <path d="M60 40 L140 40 Q150 40 150 50 L150 150 Q150 160 140 160 L60 160 Q50 160 50 150 L50 50 Q50 40 60 40" fill="#4ADE80" />
             <path d="M65 55 L135 55" stroke="white" strokeWidth="4" strokeLinecap="round" />
             <path d="M65 75 L135 75" stroke="white" strokeWidth="4" strokeLinecap="round" />
             <path d="M65 95 L110 95" stroke="white" strokeWidth="4" strokeLinecap="round" />
             <path d="M65 115 L110 115" stroke="white" strokeWidth="4" strokeLinecap="round" />
             
             {/* Magnifying Glass with Red X */}
             <circle cx="120" cy="110" r="35" fill="white" stroke="#333" strokeWidth="4" />
             <line x1="145" x2="165" y1="135" y2="155" stroke="#333" strokeWidth="8" strokeLinecap="round" />
             
             {/* Red X Mark */}
             <path d="M108 98 L132 122 M132 98 L108 122" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" />
             
             {/* Small Dots */}
             <circle cx="35" cy="120" r="4" fill="#4ADE80" />
             <circle cx="170" cy="65" r="5" fill="#4ADE80" />
          </svg>
        </div>
      </div>

      {/* Text Content */}
      <div className="text-center space-y-4 max-w-xs">
        <h3 className="text-xl font-black text-gray-800 tracking-tight uppercase">
          {text.noFavoritesTitle}
        </h3>
        <p className="text-gray-400 font-bold text-sm leading-relaxed">
          {text.noFavoritesDesc}
        </p>
      </div>
    </div>
  );
};

export default FavoritesScreen;
