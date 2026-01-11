
import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface DashboardProps {
  language: Language;
  onBack: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ language, onBack }) => {
  const text = TRANSLATIONS[language];
  const isArabic = language === 'ar';

  return (
    <div className={`min-h-screen flex flex-col p-6 bg-[#0a0a0a] ${isArabic ? 'text-right' : 'text-left'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-[#00E5FF] font-black text-2xl tracking-tighter">FIRESENSE PRO+</h2>
          <p className="text-gray-500 text-xs font-medium uppercase tracking-widest">{text.active} v2.4.0</p>
        </div>
        <button 
          onClick={onBack}
          className="p-3 rounded-xl glass-panel hover:bg-white/5 transition-colors border-[#00E5FF]/20"
        >
           <svg className="w-6 h-6 text-[#00E5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
           </svg>
        </button>
      </header>

      {/* Hero / Main Status */}
      <section className="glass-panel p-8 rounded-[2rem] border-[#00E5FF]/20 mb-8 overflow-hidden relative">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00E5FF]/20 rounded-full blur-[40px]"></div>
        <h1 className="text-3xl font-extrabold mb-2">{text.welcome}</h1>
        <p className="text-gray-400 mb-6">{text.dashboard}</p>
        
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full w-4/5 neon-bg-blue rounded-full"></div>
          </div>
          <span className="text-[#00E5FF] font-bold text-sm">80% Optimized</span>
        </div>
      </section>

      {/* Action Cards */}
      <div className="grid grid-cols-2 gap-4 flex-1">
        <div className="glass-panel p-6 rounded-3xl border-[#00E5FF]/10 flex flex-col justify-between hover:border-[#00E5FF]/40 transition-all cursor-pointer group">
          <div className="w-12 h-12 rounded-2xl bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF] mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">{text.sensitivity}</h3>
            <p className="text-gray-500 text-xs">Ajustes pro tácticos</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border-[#00E5FF]/10 flex flex-col justify-between hover:border-[#00E5FF]/40 transition-all cursor-pointer group">
          <div className="w-12 h-12 rounded-2xl bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF] mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">{text.optimization}</h3>
            <p className="text-gray-500 text-xs">Limpieza de caché RAM</p>
          </div>
        </div>
      </div>

      {/* Bottom Nav Simulation */}
      <nav className="mt-8 py-4 px-8 glass-panel rounded-full flex justify-between items-center border-[#00E5FF]/10">
        <button className="text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
        </button>
        <button className="text-gray-500 hover:text-[#00E5FF] transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        </button>
        <button className="text-gray-500 hover:text-[#00E5FF] transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        </button>
      </nav>
    </div>
  );
};

export default Dashboard;
