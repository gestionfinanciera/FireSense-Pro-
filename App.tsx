
import React, { useState, useEffect } from 'react';
import { Language } from './types';
import LanguageSelector from './components/LanguageSelector';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<Language | null>(null);
  const [appReady, setAppReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial asset loading for that "fast" but premium feel
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLang(lang);
    setAppReady(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a]">
        <div className="w-16 h-16 border-4 border-[#00E5FF]/20 border-t-[#00E5FF] rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(0,229,255,0.4)]"></div>
        <h1 className="text-[#00E5FF] font-bold text-xl tracking-widest animate-pulse">FIRESENSE PRO+</h1>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#0a0a0a] text-white selection:bg-[#00E5FF] selection:text-black overflow-hidden`}>
      {!appReady ? (
        <LanguageSelector onConfirm={handleLanguageSelect} />
      ) : (
        <Dashboard language={selectedLang!} onBack={() => setAppReady(false)} />
      )}
    </div>
  );
};

export default App;
