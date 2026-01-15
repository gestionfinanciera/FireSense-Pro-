
import React, { useState, useEffect } from 'react';
import { Language, NewsItem, SavedConfig } from './types';
import LanguageSelector from './components/LanguageSelector';
import Dashboard from './components/Dashboard';
import NewsDetail from './components/NewsDetail';
import SensitivityMenu from './components/SensitivityMenu';
import PremiumScreen from './components/PremiumScreen';
import RaffleScreen from './components/RaffleScreen';
import GeneratorScreen from './components/GeneratorScreen';
import PetScreen from './components/PetScreen';
import Analytics from './services/analytics';

const App: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<Language | null>(null);
  const [appReady, setAppReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentNews, setCurrentNews] = useState<NewsItem | null>(null);
  const [inSensitivityMenu, setInSensitivityMenu] = useState(false);
  const [inPremiumScreen, setInPremiumScreen] = useState(false);
  const [inRaffleScreen, setInRaffleScreen] = useState(false);
  const [inGeneratorScreen, setInGeneratorScreen] = useState(false);
  const [inPetScreen, setInPetScreen] = useState(false);
  
  const [savedConfigs, setSavedConfigs] = useState<SavedConfig[]>([]);

  useEffect(() => {
    try {
      Analytics.init();
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1200);
      return () => clearTimeout(timer);
    } catch (e) {
      Analytics.logError("Error in App initialization: " + (e as Error).message);
    }
  }, []);

  const handleLanguageSelect = (lang: Language) => {
    Analytics.logAction('language_selected', 'onboarding', lang);
    setSelectedLang(lang);
    setAppReady(true);
  };

  const handleNewsSelect = (news: NewsItem) => {
    Analytics.logScreenView('NewsDetail: ' + news.title);
    setCurrentNews(news);
  };

  const handleSaveConfig = (config: SavedConfig) => {
    Analytics.logAction('config_saved', 'generator', config.name);
    setSavedConfigs(prev => [config, ...prev]);
  };

  const handleDeleteConfig = (id: string) => {
    Analytics.logAction('config_deleted', 'favorites', id);
    setSavedConfigs(prev => prev.filter(config => config.id !== id));
  };

  const handleCategoryClick = (category: string) => {
    const cat = category.toUpperCase();
    Analytics.logAction('category_click', 'dashboard', cat);
    
    if (cat === 'SENSIBILIDAD' || cat === 'SENSITIVITY' || cat === 'SENSIBILIDADE' || cat === 'حساسية') {
      setInSensitivityMenu(true);
    } else if (cat === 'SORTEOS' || cat === 'RAFFLES' || cat === 'سحوبات') {
      setInRaffleScreen(true);
    } else if (cat === 'GENERADOR' || cat === 'GENERATOR' || cat === 'GERADOR' || cat === 'مولد') {
      setInGeneratorScreen(true);
    } else if (cat === 'MASCOTA' || cat === 'PET' || cat === 'حيwan أليف') {
      setInPetScreen(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-16 h-16 border-4 border-red-50 border-t-[#FF1E1E] rounded-full animate-spin mb-4"></div>
        <h1 className="text-[#FF1E1E] font-black text-xl tracking-widest animate-pulse uppercase">FIRESENSE PRO+</h1>
      </div>
    );
  }

  if (!appReady) {
    return <LanguageSelector onConfirm={handleLanguageSelect} />;
  }

  const commonProps = {
    language: selectedLang!
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-gray-900 selection:bg-[#FF1E1E] selection:text-white overflow-x-hidden font-sans">
      {inPremiumScreen && <PremiumScreen {...commonProps} onBack={() => setInPremiumScreen(false)} />}
      {!inPremiumScreen && inRaffleScreen && <RaffleScreen {...commonProps} onBack={() => setInRaffleScreen(false)} />}
      {!inPremiumScreen && !inRaffleScreen && inPetScreen && <PetScreen {...commonProps} onBack={() => setInPetScreen(false)} />}
      {!inPremiumScreen && !inRaffleScreen && !inPetScreen && inGeneratorScreen && (
        <GeneratorScreen 
          {...commonProps} 
          onBack={() => setInGeneratorScreen(false)} 
          onSaveConfig={handleSaveConfig}
        />
      )}
      {!inPremiumScreen && !inRaffleScreen && !inPetScreen && !inGeneratorScreen && currentNews && (
        <NewsDetail news={currentNews} {...commonProps} onBack={() => setCurrentNews(null)} />
      )}
      {!inPremiumScreen && !inRaffleScreen && !inPetScreen && !inGeneratorScreen && !currentNews && inSensitivityMenu && (
        <SensitivityMenu {...commonProps} onBack={() => setInSensitivityMenu(false)} />
      )}
      {!inPremiumScreen && !inRaffleScreen && !inPetScreen && !inGeneratorScreen && !currentNews && !inSensitivityMenu && (
        <Dashboard 
          {...commonProps} 
          onBack={() => setAppReady(false)} 
          onNewsClick={handleNewsSelect}
          onCategoryClick={handleCategoryClick}
          savedConfigs={savedConfigs}
          onDeleteConfig={handleDeleteConfig}
          onPremiumClick={() => {
            Analytics.logAction('premium_click', 'dashboard');
            setInPremiumScreen(true);
          }}
        />
      )}
    </div>
  );
};

export default App;
