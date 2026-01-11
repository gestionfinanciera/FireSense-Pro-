
import React, { useState, useEffect } from 'react';
import { Language, NewsItem } from './types';
import LanguageSelector from './components/LanguageSelector';
import Dashboard from './components/Dashboard';
import NewsDetail from './components/NewsDetail';
import SensitivityMenu from './components/SensitivityMenu';
import PremiumScreen from './components/PremiumScreen';
import RaffleScreen from './components/RaffleScreen';
import GeneratorScreen from './components/GeneratorScreen';

const App: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<Language | null>(null);
  const [appReady, setAppReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentNews, setCurrentNews] = useState<NewsItem | null>(null);
  const [inSensitivityMenu, setInSensitivityMenu] = useState(false);
  const [inPremiumScreen, setInPremiumScreen] = useState(false);
  const [inRaffleScreen, setInRaffleScreen] = useState(false);
  const [inGeneratorScreen, setInGeneratorScreen] = useState(false);

  useEffect(() => {
    // Simulate initial asset loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLang(lang);
    setAppReady(true);
  };

  const handleNewsSelect = (news: NewsItem) => {
    setCurrentNews(news);
  };

  const handleCategoryClick = (category: string) => {
    const cat = category.toUpperCase();
    if (cat === 'SENSIBILIDAD' || cat === 'SENSITIVITY' || cat === 'SENSIBILIDADE' || cat === 'حساسية') {
      setInSensitivityMenu(true);
    } else if (cat === 'SORTEOS' || cat === 'RAFFLES' || cat === 'سحوبات') {
      setInRaffleScreen(true);
    } else if (cat === 'GENERADOR' || cat === 'GENERATOR' || cat === 'GERADOR' || cat === 'مولد') {
      setInGeneratorScreen(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-16 h-16 border-4 border-red-100 border-t-[#FF1E1E] rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(255,30,30,0.1)]"></div>
        <h1 className="text-[#FF1E1E] font-black text-xl tracking-widest animate-pulse">FIRESENSE PRO+</h1>
      </div>
    );
  }

  if (!appReady) {
    return <LanguageSelector onConfirm={handleLanguageSelect} />;
  }

  if (inPremiumScreen) {
    return <PremiumScreen language={selectedLang!} onBack={() => setInPremiumScreen(false)} />;
  }

  if (inRaffleScreen) {
    return <RaffleScreen language={selectedLang!} onBack={() => setInRaffleScreen(false)} />;
  }

  if (inGeneratorScreen) {
    return <GeneratorScreen language={selectedLang!} onBack={() => setInGeneratorScreen(false)} />;
  }

  if (currentNews) {
    return <NewsDetail news={currentNews} language={selectedLang!} onBack={() => setCurrentNews(null)} />;
  }

  if (inSensitivityMenu) {
    return <SensitivityMenu language={selectedLang!} onBack={() => setInSensitivityMenu(false)} />;
  }

  return (
    <div className={`min-h-screen bg-[#f3f4f6] text-gray-900 selection:bg-[#FF1E1E] selection:text-white overflow-x-hidden`}>
      <Dashboard 
        language={selectedLang!} 
        onBack={() => setAppReady(false)} 
        onNewsClick={handleNewsSelect}
        onCategoryClick={handleCategoryClick}
        onPremiumClick={() => setInPremiumScreen(true)}
      />
    </div>
  );
};

export default App;
