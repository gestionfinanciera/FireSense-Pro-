
import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS, RAFFLE_END_DATE } from '../constants';

interface RaffleScreenProps {
  language: Language;
  onBack: () => void;
}

const RaffleScreen: React.FC<RaffleScreenProps> = ({ language, onBack }) => {
  const text = TRANSLATIONS[language];
  const isArabic = language === 'ar';
  const [id, setId] = useState('');

  return (
    <div className="min-h-screen bg-white flex flex-col animate-in fade-in duration-300" dir={isArabic ? 'rtl' : 'ltr'}>
      <header className="header-gradient pt-12 pb-6 px-6 shadow-md flex items-center sticky top-0 z-20">
        <button onClick={onBack} className="text-white p-2 active:scale-90 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-white font-black text-xl tracking-tight uppercase">SORTEOS</h1>
      </header>

      <main className="flex-1 p-6 flex flex-col items-center text-center">
        <h2 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight">{text.raffleRulesTitle}</h2>
        <p className="text-gray-500 font-medium leading-relaxed mb-8 max-w-xs">{text.raffleRulesDesc}</p>

        <div className="space-y-4 mb-8 text-gray-800 font-bold w-full max-w-xs text-left">
           <div className="bg-red-50 p-4 rounded-xl border border-red-100">1. {text.raffleStep1}</div>
           <div className="bg-red-50 p-4 rounded-xl border border-red-100">2. {text.raffleStep2}</div>
           <div className="bg-red-50 p-4 rounded-xl border border-red-100">3. {text.raffleStep3}</div>
        </div>

        <div className="w-full max-w-xs mb-4">
          <input 
            type="text" 
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder={text.raffleIdPlaceholder}
            className="w-full bg-white border border-gray-200 rounded-xl py-4 px-6 text-center font-bold outline-none focus:border-[#FF1E1E] transition-all"
          />
        </div>

        <button className="w-full max-w-xs bg-[#FF1E1E] py-4 rounded-xl font-black text-white uppercase tracking-widest mb-6 active:scale-95 shadow-lg">
          {text.raffleParticipate}
        </button>
        <p className="text-gray-400 font-bold uppercase text-xs">Finaliza: {RAFFLE_END_DATE}</p>
      </main>
    </div>
  );
};

export default RaffleScreen;
