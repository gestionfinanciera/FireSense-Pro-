
import React, { useState, useMemo } from 'react';
import { Language, NewsItem, SavedConfig } from '../types';
import { TRANSLATIONS, getNewsByLanguage } from '../constants';
import { getRelativeDate } from '../utils';
import FavoritesScreen from './FavoritesScreen';

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

const Dashboard: React.FC<DashboardProps> = ({ language, onBack, onNewsClick, savedConfigs, onDeleteConfig, onCategoryClick, onPremiumClick }) => {
  const [activeTab, setActiveTab] = useState<Tab>('inicio');
  const text = TRANSLATIONS[language];
  const isArabic = language === 'ar';

  const localizedNews = useMemo(() => getNewsByLanguage(language), [language]);

  const categories = [
    { name: text.catSensibilidad, icon: '🔧', color: 'bg-red-100 text-red-500' },
    { name: text.catArmas, icon: '🔫', color: 'bg-purple-100 text-purple-500' },
    { name: text.catHabilidades, icon: '👊', color: 'bg-orange-100 text-orange-500' },
    { name: text.catGenerador, icon: '♻️', color: 'bg-green-100 text-green-500' },
    { name: text.catHud, icon: '🎯', color: 'bg-pink-100 text-pink-500' },
    { name: text.catMascota, icon: '🐾', color: 'bg-lime-100 text-lime-500' },
    { name: text.catPersonajes, icon: '🎭', color: 'bg-cyan-100 text-cyan-500' },
    { name: text.catSorteos, icon: '🎡', color: 'bg-indigo-100 text-indigo-500' },
  ];

  const devices = [
    { name: 'Vivo V5', color: 'border-l-blue-500' },
    { name: 'Motorola Mot...', color: 'border-l-blue-500' },
    { name: 'Tcl Plex', color: 'border-l-purple-500' },
    { name: 'Oukitel Wp5...', color: 'border-l-purple-500' },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'favoritos':
        return <FavoritesScreen language={language} savedConfigs={savedConfigs} onDeleteConfig={onDeleteConfig} />;
      case 'noticias':
        // DISEÑO TIPO LISTA DE NOTICIAS (Segunda imagen del usuario)
        const featuredNews = localizedNews[0];
        const otherNews = localizedNews.slice(1);
        
        return (
          <div className="flex-1 overflow-y-auto bg-white pb-24 animate-in fade-in duration-300">
            {/* Noticia Destacada Grande Arriba */}
            {featuredNews && (
              <div className="border-b border-gray-100">
                <button 
                  onClick={() => onNewsClick(featuredNews)}
                  className="w-full text-left rtl:text-right"
                >
                  <div className="w-full aspect-[16/9] bg-gray-100">
                    <img src={featuredNews.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-black text-gray-900 leading-tight mb-2 uppercase flex items-center">
                      <span className="mr-2">📕</span> {featuredNews.title} <span className="ml-2">📕</span>
                    </h3>
                    <p className="text-gray-500 text-[13px] font-medium line-clamp-2 leading-relaxed mb-3">
                       {featuredNews.excerpt}
                    </p>
                    <div className="flex items-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                       <span className="mr-1">🕒</span> {getRelativeDate(featuredNews.publishDate, language)}
                    </div>
                  </div>
                </button>
              </div>
            )}

            {/* Resto de Noticias en Lista con Miniatura */}
            <div className="px-4 py-4 space-y-4">
              {otherNews.map((news) => (
                <button 
                  key={news.id}
                  onClick={() => onNewsClick(news)}
                  className="w-full flex overflow-hidden text-left rtl:text-right active:bg-gray-50 transition-colors border-b border-gray-100 pb-4"
                >
                  <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                    <img src={news.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 pl-4 rtl:pl-0 rtl:pr-4 flex flex-col justify-center">
                    <h4 className="text-[13px] font-black text-gray-900 uppercase leading-tight mb-1 line-clamp-2">
                       📕 {news.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 font-medium line-clamp-2 leading-snug">
                       {news.excerpt}
                    </p>
                    <div className="text-[10px] text-gray-400 mt-1 font-bold">
                       ...
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case 'inicio':
      default:
        return (
          <div className="animate-in fade-in duration-300">
            {/* Dashboard Noticias (Primera imagen del usuario) */}
            <section className="mt-6 px-4">
              <h2 className="text-2xl font-black mb-4 text-gray-900 tracking-tight">{text.noticias}</h2>
              <div className="flex space-x-4 overflow-x-auto hide-scrollbar pb-4 px-1">
                {localizedNews.map((news) => (
                  <button 
                    key={news.id} 
                    onClick={() => onNewsClick(news)}
                    className="min-w-[85%] bg-white rounded-2xl shadow-md border border-gray-100 flex overflow-hidden text-left rtl:text-right p-2.5 items-center active:scale-[0.98] transition-transform"
                  >
                    <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                      <img src={news.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 ml-3 rtl:ml-0 rtl:mr-3 flex flex-col justify-between h-20">
                      <h4 className="text-[13px] font-black text-gray-900 leading-tight line-clamp-2">
                         📕 {news.title} 📕
                      </h4>
                      <p className="text-[11px] text-gray-500 font-medium line-clamp-1 opacity-80">
                         {news.excerpt}
                      </p>
                      <div className="flex items-center text-[10px] text-gray-400 font-bold">
                        <span className="mr-1">🕒</span> {getRelativeDate(news.publishDate, language)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Sección Categorías (Primera imagen del usuario) */}
            <section className="mt-4 px-4">
              <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100">
                <h2 className="text-2xl font-black mb-8 text-gray-900 tracking-tight">{text.categorias}</h2>
                <div className="grid grid-cols-4 gap-y-10 gap-x-2">
                  {categories.map((cat, i) => (
                    <button 
                      key={i} 
                      onClick={() => onCategoryClick?.(cat.name)}
                      className="flex flex-col items-center"
                    >
                      <div className={`w-14 h-14 rounded-2xl ${cat.color.split(' ')[0]} flex items-center justify-center text-2xl shadow-sm transition-transform active:scale-90`}>
                        {cat.icon}
                      </div>
                      <span className="text-[9px] font-black text-gray-800 mt-3 text-center uppercase tracking-tighter leading-none w-full px-1">
                        {cat.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Sección Sensibilidades (Primera imagen del usuario) */}
            <section className="mt-8 px-4 mb-24">
              <div className="flex justify-between items-end mb-4 px-2">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">{text.sensibilidades}</h2>
                <button className="text-gray-900 font-black text-sm">{text.verTodas}</button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {devices.map((device, i) => (
                  <div key={i} className={`bg-white p-5 rounded-2xl shadow-sm border border-gray-100 border-l-4 ${device.color} flex justify-between items-center active:scale-95 transition-all`}>
                    <span className="font-black text-gray-800 text-[13px] truncate pr-2">{device.name}</span>
                    <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    <div className={`min-h-screen flex flex-col bg-white pb-24`} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header Dinámico estilo Imagen enviada (Morado) */}
      <div className="header-gradient pt-12 pb-6 px-6 rounded-b-[1.5rem] shadow-lg relative overflow-hidden z-30">
        <div className="flex items-center justify-center relative z-10 w-full">
          <button onClick={onPremiumClick} className="absolute left-0 text-white p-2 transition-transform active:scale-90">
            <span className="text-2xl">👑</span>
          </button>
          <h1 className="text-white font-black text-xl tracking-tight uppercase">
            {activeTab === 'noticias' ? 'Noticias' : 'FireSense Pro+'}
          </h1>
        </div>
      </div>

      {renderContent()}

      {/* Bottom Navigation (Morado cuando está activo) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-50 flex justify-around items-center py-3 px-2 pb-6 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => setActiveTab('inicio')}
          className={`flex flex-col items-center flex-1 transition-all ${activeTab === 'inicio' ? 'opacity-100' : 'opacity-40'}`}
        >
          <div className={`${activeTab === 'inicio' ? 'bg-purple-50' : ''} p-2 px-6 rounded-2xl mb-1 transition-colors`}>
            <svg className={`w-6 h-6 ${activeTab === 'inicio' ? 'text-purple-600' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
          <span className="text-[11px] font-black text-gray-900 uppercase tracking-tighter">{text.inicio}</span>
        </button>

        <button 
          onClick={() => setActiveTab('noticias')}
          className={`flex flex-col items-center flex-1 transition-all ${activeTab === 'noticias' ? 'opacity-100' : 'opacity-40'}`}
        >
          <div className={`${activeTab === 'noticias' ? 'bg-purple-50' : ''} p-2 px-6 rounded-2xl mb-1`}>
            <svg className={`w-6 h-6 ${activeTab === 'noticias' ? 'text-purple-600' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <span className="text-[11px] font-black text-gray-900 uppercase tracking-tighter">{text.noticias}</span>
        </button>

        <button 
          onClick={() => setActiveTab('favoritos')}
          className={`flex flex-col items-center flex-1 transition-all ${activeTab === 'favoritos' ? 'opacity-100' : 'opacity-40'}`}
        >
          <div className={`${activeTab === 'favoritos' ? 'bg-purple-50' : ''} p-2 px-6 rounded-2xl mb-1`}>
            <svg className={`w-6 h-6 ${activeTab === 'favoritos' ? 'text-purple-600' : 'text-gray-600'}`} fill={activeTab === 'favoritos' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <span className="text-[11px] font-black text-gray-900 uppercase tracking-tighter">{text.favoritos}</span>
        </button>

        <button 
          onClick={() => setActiveTab('ajustes')}
          className={`flex flex-col items-center flex-1 transition-all ${activeTab === 'ajustes' ? 'opacity-100' : 'opacity-40'}`}
        >
          <div className={`${activeTab === 'ajustes' ? 'bg-purple-50' : ''} p-2 px-6 rounded-2xl mb-1`}>
            <svg className={`w-6 h-6 ${activeTab === 'ajustes' ? 'text-purple-600' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            </svg>
          </div>
          <span className="text-[11px] font-black text-gray-900 uppercase tracking-tighter">{text.ajustes}</span>
        </button>
      </nav>
    </div>
  );
};

export default Dashboard;