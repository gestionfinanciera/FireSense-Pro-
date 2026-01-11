
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
    <div className="min-h-screen bg-white" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="header-gradient pt-12 pb-6 px-6 shadow-md flex items-center sticky top-0 z-20">
        <button onClick={onBack} className="text-white p-2 mr-4 rtl:mr-0 rtl:ml-4 active:scale-90 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-white font-black text-xl tracking-tight uppercase">{text.noticias}</h1>
      </header>

      {/* Main Image - Ahora se muestra completa */}
      <div className="w-full relative bg-gray-100 flex justify-center items-start">
        <img 
          src={news.imageUrl} 
          alt={news.title} 
          className="w-full h-auto block shadow-sm"
        />
      </div>

      {/* Content */}
      <div className="px-6 py-8 bg-white relative z-10 rounded-t-[2rem] -mt-6">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
        <h2 className="text-2xl font-black text-gray-900 leading-tight mb-2 uppercase tracking-tight">
          {news.title}
        </h2>
        <p className="text-gray-400 text-sm font-bold mb-8">
          {getRelativeDate(news.publishDate, language)}
        </p>

        <div className="space-y-6">
          {news.content.map((paragraph, index) => (
            <p key={index} className="text-gray-700 text-lg leading-relaxed font-medium">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Extra spacing for bottom nav safety */}
      <div className="h-20"></div>
    </div>
  );
};

export default NewsDetail;
