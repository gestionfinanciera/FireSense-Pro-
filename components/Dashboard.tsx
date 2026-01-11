
import React from 'react';
import { Language, NewsItem } from '../types';
import { TRANSLATIONS, MOCK_NEWS } from '../constants';
import { getRelativeDate } from '../utils';

interface DashboardProps {
  language: Language;
  onBack: () => void;
  onNewsClick: (news: NewsItem) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ language, onBack, onNewsClick }) => {
  const text = TRANSLATIONS[language];
  const isArabic = language === 'ar';

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

  return (
    <div className={`min-h-screen flex flex-col bg-[#f3f4f6] pb-24`} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Top Header */}
      <div className="header-gradient pt-12 pb-6 px-6 rounded-b-[2rem] shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-center relative z-10">
          <button onClick={onBack} className="absolute left-0 text-white p-2">
            <span className="text-xl">👑</span>
          </button>
          <h1 className="text-white font-bold text-xl">FireSense Pro+</h1>
        </div>
      </div>

      {/* Noticias Section */}
      <section className="mt-6 px-6">
        <h2 className="text-xl font-black mb-4 text-gray-900 uppercase tracking-tight">{text.noticias}</h2>
        <div className="flex space-x-4 overflow-x-auto hide-scrollbar pb-2">
          {MOCK_NEWS.map((news) => (
            <button 
              key={news.id} 
              onClick={() => onNewsClick(news)}
              className="min-w-[85%] bg-white rounded-2xl shadow-sm border border-gray-100 p-3 flex text-left rtl:text-right"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                 <img src={news.imageUrl} alt="news" className="w-full h-full object-cover" />
              </div>
              <div className="ml-4 rtl:mr-4 rtl:ml-0 flex flex-col justify-center">
                <span className="text-sm font-black text-gray-800 leading-tight uppercase line-clamp-2">{news.title}</span>
                <span className="text-xs text-gray-400 mt-1 line-clamp-1">{news.excerpt}</span>
                <span className="text-[10px] text-gray-400 mt-2 flex items-center">
                  <span className="mr-1">🕒</span> {getRelativeDate(news.publishDate, language)}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Categorías Grid */}
      <section className="mt-8 px-6">
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-black mb-6 text-gray-900 uppercase tracking-tight">{text.categorias}</h2>
          <div className="grid grid-cols-4 gap-y-8 gap-x-2">
            {categories.map((cat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center text-2xl shadow-sm category-card`}>
                  {cat.icon}
                </div>
                <span className="text-[9px] font-black text-gray-800 mt-2 text-center uppercase leading-none px-1">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sensibilidades Section */}
      <section className="mt-8 px-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">{text.sensibilidades}</h2>
          <button className="text-gray-900 font-bold text-sm underline">{text.verTodas}</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {devices.map((device, i) => (
            <div key={i} className={`bg-white p-4 rounded-xl shadow-sm border border-gray-100 border-l-4 ${device.color} flex justify-between items-center transition-all active:scale-95`}>
              <span className="font-bold text-gray-800 text-sm truncate pr-2">{device.name}</span>
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center py-3 px-6 pb-6 z-50">
        <div className="flex flex-col items-center group">
          <div className="bg-red-50 p-2 rounded-2xl mb-1 group-hover:bg-red-100 transition-colors">
            <svg className="w-6 h-6 text-[#FF1E1E]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
          <span className="text-[10px] font-black text-gray-900 uppercase">{text.inicio}</span>
        </div>
        <div className="flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity">
          <div className="p-2 mb-1">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <span className="text-[10px] font-black text-gray-900 uppercase">{text.noticias}</span>
        </div>
        <div className="flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity">
          <div className="p-2 mb-1">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <span className="text-[10px] font-black text-gray-900 uppercase">{text.favoritos}</span>
        </div>
        <div className="flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity">
          <div className="p-2 mb-1">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            </svg>
          </div>
          <span className="text-[10px] font-black text-gray-900 uppercase">{text.ajustes}</span>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
