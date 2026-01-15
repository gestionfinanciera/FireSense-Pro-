
import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface SensitivityMenuProps {
  language: Language;
  onBack: () => void;
}

const SensitivityMenu: React.FC<SensitivityMenuProps> = ({ language, onBack }) => {
  const text = TRANSLATIONS[language];
  const isArabic = language === 'ar';

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col transition-colors duration-300" dir={isArabic ? 'rtl' : 'ltr'}>
      <header className="header-gradient pt-12 pb-6 px-6 shadow-md flex items-center sticky top-0 z-20">
        <button onClick={onBack} className="text-white p-2 mr-4 rtl:mr-0 rtl:ml-4 active:scale-90 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-white font-black text-xl tracking-tight uppercase">{text.sensibilidades}</h1>
      </header>

      <main className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all active:scale-95">
             <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#FF1E1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
             </div>
             <h3 className="font-black text-xs text-gray-900 mb-2 uppercase tracking-tight">{text.sensMenuDefault}</h3>
             <div className="h-px w-full bg-gray-100 mb-3"></div>
             <p className="text-[10px] text-gray-500 font-medium leading-relaxed">{text.sensMenuDefaultDesc}</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all active:scale-95">
             <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
             </div>
             <h3 className="font-black text-xs text-gray-900 mb-2 uppercase tracking-tight">{text.sensMenuPremium}</h3>
             <div className="h-px w-full bg-gray-100 mb-3"></div>
             <p className="text-[10px] text-gray-500 font-medium leading-relaxed">{text.sensMenuPremiumDesc}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all active:scale-95">
           <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 border-2 border-dashed border-gray-200">
              <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 011-1V4z" />
              </svg>
           </div>
           <h3 className="font-black text-sm text-gray-900 mb-2 uppercase tracking-tight">{text.sensMenuPlayers}</h3>
           <div className="h-px w-full bg-gray-100 mb-3"></div>
           <p className="text-xs text-gray-500 font-medium leading-relaxed px-4">{text.sensMenuPlayersDesc}</p>
        </div>
      </main>

      <footer className="mt-auto px-6 py-8 text-center">
         <p className="text-[#FF1E1E] font-black text-xs tracking-[0.2em] opacity-50 uppercase">FireSense Pro+</p>
      </footer>
    </div>
  );
};

export default SensitivityMenu;
