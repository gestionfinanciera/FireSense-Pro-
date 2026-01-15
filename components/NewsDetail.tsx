
import React from 'react';
import { Language, NewsItem } from '../types';
import { TRANSLATIONS } from '../constants';
import { getRelativeDate } from '../utils';

interface NewsDetailProps {
  news: NewsItem;
  language: Language;
  onBack: () => void;
}

const NewsDetail: React.FC<NewsDetailProps> = ({ news, language, onBack }) => {
  const text = TRANSLATIONS[language];
  const isArabic = language === 'ar';

  return (
    <div className="min-h-screen bg-white transition-colors" dir={isArabic ? 'rtl' : 'ltr'}>
      <header className="header-gradient pt-12 pb-6 px-6 shadow-md flex items-center sticky top-0 z-20">
        <button onClick={onBack} className="text-white p-2 mr-4 rtl:mr-0 rtl:ml-4 active:scale-90 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-white font-black text-xl tracking-tight uppercase">{text.noticias}</h1>
      </header>

      {news.imageUrl && (
        <div className="w-full bg-gray-100 flex items-center justify-center overflow-hidden border-b border-gray-100">
           <img 
             src={news.imageUrl} 
             alt={news.title} 
             className="w-full h-auto object-contain max-h-[70vh]"
           />
        </div>
      )}

      <div className="px-6 py-8 bg-white relative z-10 transition-colors">
        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-6">
           <div className="w-8 h-1 bg-[#FF1E1E] rounded-full"></div>
           <span className="text-[10px] text-[#FF1E1E] font-black uppercase tracking-[0.2em]">Agenda Oficial</span>
        </div>
        
        <h2 className="text-2xl font-black text-gray-900 leading-tight mb-2 uppercase tracking-tight">
          {news.title}
        </h2>
        <p className="text-gray-500 text-sm font-bold mb-8 flex items-center">
          <span className="mr-1">📅</span> {getRelativeDate(news.publishDate, language)}
        </p>

        <div className="space-y-6">
          {news.content.map((paragraph, index) => (
            <p key={index} className="text-gray-700 text-lg leading-relaxed font-medium">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="h-24"></div>
    </div>
  );
};

export default NewsDetail;
