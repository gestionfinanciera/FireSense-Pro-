
import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS, RAFFLE_END_DATE } from '../constants';

interface RaffleScreenProps {
  language: Language;
  onBack: () => void;
  darkMode: boolean;
}

const RaffleScreen: React.FC<RaffleScreenProps> = ({ language, onBack, darkMode }) => {
  const text = TRANSLATIONS[language];
  const isArabic = language === 'ar';
  const [id, setId] = useState('');

  const youtubeUrl = "https://www.youtube.com/@ArgGabrielFFYT";

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-white'} flex flex-col transition-colors`} dir={isArabic ? 'rtl' : 'ltr'}>
      <header className="header-gradient pt-12 pb-6 px-6 shadow-md flex items-center sticky top-0 z-20">
        <button onClick={onBack} className="text-white p-2 mr-4 rtl:mr-0 rtl:ml-4 active:scale-90 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-white font-black text-xl tracking-tight uppercase">{text.catSorteos}</h1>
      </header>

      <main className="flex-1 p-6 flex flex-col items-center text-center">
        <h2 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 uppercase tracking-tight`}>
          {text.raffleRulesTitle}
        </h2>

        <p className="text-gray-500 font-medium leading-relaxed mb-8 max-w-xs">
          {text.raffleRulesDesc}
        </p>

        <div className={`space-y-2 mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-800'} font-bold`}>
          <p>1. {text.raffleStep1}</p>
          <p>2. {text.raffleStep2}</p>
          <p>3. {text.raffleStep3}</p>
        </div>

        <div className={`${darkMode ? 'bg-zinc-900 border-white/5' : 'bg-gray-100 border-gray-200'} px-6 py-2 rounded-lg border flex items-center space-x-2 rtl:space-x-reverse mb-4`}>
           <svg className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-900'}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
           </svg>
           <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{text.raffleTicketLabel}</span>
        </div>

        <button className="w-full max-w-xs border-2 border-[#FF1E1E] text-[#FF1E1E] py-3 rounded-xl font-black uppercase tracking-widest mb-10 active:scale-95 transition-all">
          {text.raffleWatchAd}
        </button>

        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-800'} font-bold px-4 mb-6 leading-relaxed`}>
          {text.raffleYoutubeDesc}
        </p>

        <a 
          href={youtubeUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full max-w-xs border-2 border-[#FF1E1E] text-[#FF1E1E] py-3 rounded-xl font-black uppercase tracking-widest flex items-center justify-center space-x-3 rtl:space-x-reverse mb-12 active:scale-95 transition-all"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
          </svg>
          <span>{text.raffleSubscribe}</span>
        </a>

        <div className="w-full max-w-xs mb-4">
          <input 
            type="text" 
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder={text.raffleIdPlaceholder}
            className={`w-full ${darkMode ? 'bg-zinc-900 border-white/5 text-white' : 'bg-white border-gray-300 text-gray-700'} border rounded-xl py-4 px-6 text-center font-bold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF1E1E]/20`}
          />
        </div>

        <button className="w-full max-w-xs neon-bg-red py-4 rounded-xl font-black text-white uppercase tracking-widest mb-6 active:scale-95 transition-all shadow-lg">
          {text.raffleParticipate}
        </button>

        <p className="text-gray-500 font-bold uppercase text-sm tracking-wider">
          {text.raffleEnds} {RAFFLE_END_DATE}
        </p>
      </main>

      <div className="h-10"></div>
    </div>
  );
};

export default RaffleScreen;
