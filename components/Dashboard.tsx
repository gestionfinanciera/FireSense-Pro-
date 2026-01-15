
import React, { useState, useMemo, useEffect } from 'react';
import { Language, NewsItem, SavedConfig } from '../types';
import { TRANSLATIONS, getNewsByLanguage } from '../constants';
import { getRelativeDate } from '../utils';
import FavoritesScreen from './FavoritesScreen';
import Analytics from '../services/analytics';

interface DashboardProps {
  language: Language;
  onBack: () => void;
  onNewsClick: (news: NewsItem) => void;
  savedConfigs: SavedConfig[];
  onDeleteConfig: (id: string) => void;
  onCategoryClick?: (category: string) => void;
  onPremiumClick?: () => void;
}

type Tab = 'inicio' | 'noticias' | 'favoritos' | 'ajustes';

const Dashboard: React.FC<DashboardProps> = ({ 
  language, onBack, onNewsClick, savedConfigs, onDeleteConfig, 
  onCategoryClick, onPremiumClick
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('inicio');
  const text = TRANSLATIONS[language];
  const isArabic = language === 'ar';

  const localizedNews = useMemo(() => getNewsByLanguage(language), [language]);

  useEffect(() => {
    Analytics.logScreenView('DashboardTab: ' + activeTab);
  }, [activeTab]);

  const categories = [
    { name: text.catSensibilidad, icon: '🔧', color: 'bg-red-50 text-red-600' },
    { name: text.catArmas, icon: '🔫', color: 'bg-purple-50 text-purple-600' },
    { name: text.catHabilidades, icon: '👊', color: 'bg-orange-50 text-orange-600' },
    { name: text.catGenerador, icon: '♻️', color: 'bg-green-50 text-green-600' },
    { name: text.catHud, icon: '🎯', color: 'bg-pink-50 text-pink-600' },
    { name: text.catMascota, icon: '🐾', color: 'bg-lime-50 text-lime-600' },
    { name: text.catPersonajes, icon: '🎭', color: 'bg-cyan-50 text-cyan-600' },
    { name: text.catSorteos, icon: '🎡', color: 'bg-indigo-50 text-indigo-600' },
  ];

  const devices = [
    { name: 'Vivo V5', color: 'border-l-blue-500' },
    { name: 'Motorola Mot...', color: 'border-l-blue-500' },
    { name: 'Tcl Plex', color: 'border-l-purple-500' },
    { name: 'Oukitel Wp5...', color: 'border-l-purple-500' },
  ];

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'noticias': return text.noticias;
      case 'favoritos': return text.favoritos;
      case 'ajustes': return text.ajustes;
      default: return 'FireSense Pro+';
    }
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'favoritos':
        return <FavoritesScreen language={language} savedConfigs={savedConfigs} onDeleteConfig={onDeleteConfig} />;
      case 'ajustes':
        return (
          <div className="flex-1 overflow-y-auto bg-white pb-32 animate-in fade-in duration-300">
            <div className="flex flex-col">
              <button onClick={onPremiumClick} className="flex flex-col items-start p-6 border-b border-gray-50 active:bg-gray-50 transition-colors text-left rtl:text-right">
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">PREMIUM</h3>
                <p className="text-xs text-gray-500 font-medium mt-1">Accede a lo mejor: sin anuncios, más funciones.</p>
              </button>
              <button onClick={onBack} className="flex flex-col items-start p-6 border-b border-gray-50 active:bg-gray-50 transition-colors text-left rtl:text-right">
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">IDIOMA</h3>
                <p className="text-xs text-gray-500 font-medium mt-1">Selecciona el idioma de la aplicación</p>
              </button>
              <div className="flex flex-col items-start p-6 border-b border-gray-50 active:bg-gray-50 transition-colors">
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">NOTIFICACIÓN</h3>
                <p className="text-xs text-gray-500 font-medium mt-1">Suscríbete para estar al tanto de las novedades</p>
              </div>
            </div>
          </div>
        );
      case 'noticias':
        return (
          <div className="flex-1 overflow-y-auto bg-white pb-32 animate-in fade-in duration-300">
             {localizedNews.map((news) => (
                <button 
                  key={news.id}
                  onClick={() => onNewsClick(news)}
                  className="w-full flex overflow-hidden text-left rtl:text-right active:bg-gray-50 transition-colors border-b border-gray-100 p-4"
                >
                  <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                    <img src={news.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 pl-4 rtl:pl-0 rtl:pr-4 flex flex-col justify-center">
                    <h4 className="text-[13px] font-black text-gray-900 uppercase leading-tight mb-1">📕 {news.title}</h4>
                    <p className="text-[11px] text-gray-500 font-medium line-clamp-2">{news.excerpt}</p>
                  </div>
                </button>
              ))}
          </div>
        );
      case 'inicio':
      default:
        return (
          <div className="animate-in fade-in duration-300 bg-white min-h-full">
            <section className="mt-6 px-4">
              <h2 className="text-2xl font-black mb-4 text-gray-900 tracking-tight">{text.noticias}</h2>
              <div className="flex space-x-4 overflow-x-auto hide-scrollbar pb-4">
                {localizedNews.map((news) => (
                  <button 
                    key={news.id} 
                    onClick={() => onNewsClick(news)}
                    className="min-w-[80%] bg-white rounded-2xl shadow-sm border border-gray-100 flex overflow-hidden p-3 items-center active:scale-95 transition-transform"
                  >
                    <div className="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                      <img src={news.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-3 rtl:ml-0 rtl:mr-3">
                      <h4 className="text-[12px] font-black text-gray-900 leading-tight">📕 {news.title}</h4>
                      <p className="text-[10px] text-gray-400 mt-1 font-bold uppercase tracking-widest">{getRelativeDate(news.publishDate, language)}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="mt-4 px-4">
              <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-red-100/50 border border-red-50">
                <h2 className="text-xl font-black mb-6 text-gray-900 tracking-tight">{text.categorias}</h2>
                <div className="grid grid-cols-4 gap-y-8 gap-x-2">
                  {categories.map((cat, i) => (
                    <button key={i} onClick={() => onCategoryClick?.(cat.name)} className="flex flex-col items-center group">
                      <div className={`w-12 h-12 rounded-2xl ${cat.color} flex items-center justify-center text-xl shadow-sm transition-all group-active:scale-90`}>
                        {cat.icon}
                      </div>
                      <span className="text-[9px] font-black text-gray-700 mt-2 text-center uppercase tracking-tighter">
                        {cat.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-8 px-4 mb-40">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-4">{text.sensibilidades}</h2>
              <div className="grid grid-cols-2 gap-3">
                {devices.map((device, i) => (
                  <div key={i} className={`bg-white p-4 rounded-xl border border-gray-100 border-l-4 ${device.color} flex justify-between items-center active:scale-95 transition-all`}>
                    <span className="font-black text-gray-800 text-[12px] truncate">{device.name}</span>
                    <svg className="w-4 h-4 text-[#FF1E1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="header-gradient pt-12 pb-6 px-6 rounded-b-[2rem] shadow-lg relative overflow-hidden z-30">
        <div className="flex items-center justify-center relative z-10 w-full">
          {activeTab === 'inicio' && (
            <button onClick={onPremiumClick} className="absolute left-0 text-white p-2 transition-transform active:scale-90">
              <span className="text-2xl drop-shadow-md">👑</span>
            </button>
          )}
          <h1 className="text-white font-black text-xl tracking-tight uppercase drop-shadow-sm">
            {getHeaderTitle()}
          </h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden relative">
        {renderContent()}
      </div>

      <div className="fixed bottom-6 left-4 right-4 z-50">
        <nav className="bg-white/95 backdrop-blur-xl border border-red-50 rounded-[2.5rem] flex justify-around items-center py-2 px-2 shadow-[0_15px_40px_rgba(255,30,30,0.18)]">
          <NavItem active={activeTab === 'inicio'} onClick={() => setActiveTab('inicio')} icon="home" label={text.inicio} />
          <NavItem active={activeTab === 'noticias'} onClick={() => setActiveTab('noticias')} icon="news" label={text.noticias} />
          <NavItem active={activeTab === 'favoritos'} onClick={() => setActiveTab('favoritos')} icon="heart" label={text.favoritos} />
          <NavItem active={activeTab === 'ajustes'} onClick={() => setActiveTab('ajustes')} icon="settings" label={text.ajustes} />
        </nav>
      </div>
    </div>
  );
};

const NavItem = ({ active, onClick, icon, label }: any) => {
  const iconPaths: any = {
    home: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
    news: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />,
    heart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
    settings: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
  };

  return (
    <button onClick={onClick} className="flex flex-col items-center justify-center flex-1 transition-all h-14 relative group">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${active ? 'bg-[#FF1E1E] scale-110 shadow-[0_4px_15px_rgba(255,30,30,0.4)]' : 'bg-transparent'}`}>
        <svg 
          className={`w-6 h-6 transition-all duration-300 ${active ? 'text-white' : 'text-gray-400'}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {iconPaths[icon]}
        </svg>
      </div>
      <span className={`text-[9px] font-black uppercase mt-1 transition-all duration-300 ${active ? 'text-[#FF1E1E] opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
        {label}
      </span>
    </button>
  );
};

export default Dashboard;
