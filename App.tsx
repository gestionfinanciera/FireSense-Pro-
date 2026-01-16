
import React, { useState, useEffect } from 'react';
import { Language, NewsItem, SavedConfig, DeviceSensitivity } from './types';
import LanguageSelector from './components/LanguageSelector';
import Dashboard from './components/Dashboard';
import NewsDetail from './components/NewsDetail';
import SensitivityMenu from './components/SensitivityMenu';
import PremiumScreen from './components/PremiumScreen';
import RaffleScreen from './components/RaffleScreen';
import GeneratorScreen from './components/GeneratorScreen';
import PetScreen from './components/PetScreen';
import HudScreen from './components/HudScreen';
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
  const [inHudScreen, setInHudScreen] = useState(false);
  
  const [savedConfigs, setSavedConfigs] = useState<SavedConfig[]>([]);
  const [communityConfigs, setCommunityConfigs] = useState<DeviceSensitivity[]>([]);

  useEffect(() => {
    try {
      Analytics.init();
      const timer = setTimeout(() => setIsLoading(false), 1200);
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

  const handlePublishConfig = (newDevice: DeviceSensitivity) => {
    Analytics.logAction('config_published', 'request_screen', newDevice.model);
    setCommunityConfigs(prev => [newDevice, ...prev]);
  };

  const handleCategoryClick = (category: string) => {
    const cat = category.toUpperCase();
    Analytics.logAction('category_click', 'dashboard', cat);
    if (cat === 'SENSIBILIDAD' || cat === 'SENSITIVITY' || cat === 'SENSIBILIDADE' || cat === 'حساسية') setInSensitivityMenu(true);
    else if (cat === 'SORTEOS' || cat === 'RAFFLES' || cat === 'سحوبات') setInRaffleScreen(true);
    else if (cat === 'GENERADOR' || cat === 'GENERATOR' || cat === 'GERADOR' || cat === 'مولد') setInGeneratorScreen(true);
    else if (cat === 'MASCOTA' || cat === 'PET' || cat === 'حيwan أليف') setInPetScreen(true);
    else if (cat === 'HUD') setInHudScreen(true);
  };

  if (isLoading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-16 h-16 border-4 border-red-50 border-t-[#FF1E1E] rounded-full animate-spin mb-4"></div>
      <h1 className="text-[#FF1E1E] font-black text-xl tracking-widest animate-pulse uppercase">FIRESENSE PRO+</h1>
    </div>
  );

  if (!appReady) return <LanguageSelector onConfirm={handleLanguageSelect} />;

  const commonProps = { language: selectedLang! };

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-gray-900 selection:bg-[#FF1E1E] selection:text-white overflow-x-hidden font-sans">
      {inPremiumScreen && <PremiumScreen {...commonProps} onBack={() => setInPremiumScreen(false)} />}
      {!inPremiumScreen && inRaffleScreen && <RaffleScreen {...commonProps} onBack={() => setInRaffleScreen(false)} />}
      {!inPremiumScreen && !inRaffleScreen && inPetScreen && <PetScreen {...commonProps} onBack={() => setInPetScreen(false)} />}
      {!inPremiumScreen && !inRaffleScreen && !inPetScreen && inHudScreen && <HudScreen {...commonProps} onBack={() => setInHudScreen(false)} />}
      {!inPremiumScreen && !inRaffleScreen && !inPetScreen && !inHudScreen && inGeneratorScreen && (
        <GeneratorScreen {...commonProps} onBack={() => setInGeneratorScreen(false)} onSaveConfig={c => setSavedConfigs([c, ...savedConfigs])} />
      )}
      {!inPremiumScreen && !inRaffleScreen && !inPetScreen && !inHudScreen && !inGeneratorScreen && currentNews && (
        <NewsDetail news={currentNews} {...commonProps} onBack={() => setCurrentNews(null)} />
      )}
      {!inPremiumScreen && !inRaffleScreen && !inPetScreen && !inHudScreen && !inGeneratorScreen && !currentNews && inSensitivityMenu && (
        <SensitivityMenu 
          {...commonProps} 
          communityConfigs={communityConfigs}
          onPublishConfig={handlePublishConfig}
          onBack={() => setInSensitivityMenu(false)} 
        />
      )}
      {!inPremiumScreen && !inRaffleScreen && !inPetScreen && !inHudScreen && !inGeneratorScreen && !currentNews && !inSensitivityMenu && (
        <Dashboard 
          {...commonProps} 
          onBack={() => setAppReady(false)} 
          onNewsClick={n => setCurrentNews(n)}
          onCategoryClick={handleCategoryClick}
          savedConfigs={savedConfigs}
          onDeleteConfig={id => setSavedConfigs(savedConfigs.filter(c => c.id !== id))}
          onPremiumClick={() => setInPremiumScreen(true)}
        />
      )}
    </div>
  );
};

export default App;
