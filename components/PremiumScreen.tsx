
import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface PremiumScreenProps {
  language: Language;
  onBack: () => void;
}

const PremiumScreen: React.FC<PremiumScreenProps> = ({ language, onBack }) => {
  const text = TRANSLATIONS[language];
  const isArabic = language === 'ar';

  const features = [
    { name: text.featDarkMode, premium: true, basic: true, icon: '🌟' },
    { name: text.featBasicSens, premium: true, basic: true, icon: '⚙️' },
    { name: text.featInsaneSens, premium: true, basic: false, icon: '🔥' },
    { name: text.featUnlimitedGen, premium: true, basic: false, icon: '♾️' },
    { name: text.featExclusiveSkills, premium: true, basic: false, icon: '⚡' },
    { name: text.featNoAds, premium: true, basic: false, icon: '🚫' },
  ];

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col relative animate-in fade-in slide-in-from-bottom-4 duration-300" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header with Close Button */}
      <div className="absolute top-12 right-6 z-30">
        <button onClick={onBack} className="p-2 text-gray-400 hover:text-gray-900 active:scale-90 transition-transform">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <main className="flex-1 flex flex-col items-center px-6 pt-24">
        {/* Crown Icon */}
        <div className="mb-8 relative">
           <div className="absolute inset-0 blur-xl bg-[#FF1E1E] opacity-20 rounded-full"></div>
           <svg className="w-20 h-20 text-[#FF1E1E] relative drop-shadow-[0_0_8px_rgba(255,30,30,0.5)]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
           </svg>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-2xl font-black text-gray-900 text-center mb-2 tracking-tighter uppercase leading-none px-4">
          {text.premiumTitle}
        </h1>
        <p className="text-gray-400 font-bold mb-12 uppercase text-sm tracking-wider">
          {text.premiumSubtitle}
        </p>

        {/* Comparison Table */}
        <div className="w-full max-w-sm mb-12">
          <div className="flex justify-end mb-4 pr-2 space-x-6 rtl:space-x-reverse">
            <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">{text.premiumLabel}</span>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{text.basicLabel}</span>
          </div>

          <div className="space-y-4">
            {features.map((feat, i) => (
              <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center">
                  <span className="mr-3 rtl:ml-3 rtl:mr-0 text-gray-400">{feat.icon}</span>
                  <span className="text-sm font-bold text-gray-600">{feat.name}</span>
                </div>
                <div className="flex space-x-10 rtl:space-x-reverse items-center pr-2">
                  <div className="text-[#FF1E1E]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className={feat.basic ? 'text-gray-400' : 'text-gray-200'}>
                    {feat.basic ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <div className="w-4 h-1 bg-gray-200 rounded-full mx-auto"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer / Buy Area */}
      <footer className="px-6 pb-12 flex flex-col items-center">
        <p className="text-gray-500 font-bold text-sm mb-6 text-center">
          {text.premiumPrice}
        </p>

        <button className="w-full max-w-sm neon-bg-red py-4 rounded-2xl font-black text-white uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-xl mb-6">
          {text.premiumBuy}
        </button>

        <p className="text-[10px] text-gray-400 text-center max-w-[250px] font-medium leading-relaxed">
          {text.premiumDisclaimer}
        </p>
      </footer>
    </div>
  );
};

export default PremiumScreen;
