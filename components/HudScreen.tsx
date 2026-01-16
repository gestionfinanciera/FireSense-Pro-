
import React, { useState, useMemo } from 'react';
import { Language } from '../types';
import { HUD_DATA } from '../constants';
import Analytics from '../services/analytics';

interface HudScreenProps {
  language: Language;
  onBack: () => void;
}

const HudScreen: React.FC<HudScreenProps> = ({ language, onBack }) => {
  const [selectedFingerTab, setSelectedFingerTab] = useState(2);
  const isArabic = language === 'ar';

  const filteredHuds = useMemo(() => {
    return HUD_DATA.filter(hud => hud.fingers === selectedFingerTab);
  }, [selectedFingerTab]);

  const handleVideoClick = (videoUrl: string, title: string) => {
    Analytics.logAction('hud_video_click', 'hud_screen', title);
    window.open(videoUrl, '_blank');
  };

  const tabs = [2, 3, 4, 5];

  return (
    <div className="min-h-screen bg-white flex flex-col animate-in fade-in duration-300" dir={isArabic ? 'rtl' : 'ltr'}>
      <header className="header-gradient pt-12 pb-6 px-6 shadow-md flex items-center sticky top-0 z-20">
        <button onClick={onBack} className="text-white p-2 active:scale-90 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-white font-black text-xl tracking-tight uppercase flex-1 text-center pr-10 rtl:pr-0 rtl:pl-10">Custom Hud</h1>
      </header>

      {/* Tabs de Dedos al estilo de la imagen pero con rojo neón */}
      <div className="px-4 py-4 sticky top-[108px] bg-white z-10">
        <div className="flex border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFingerTab(tab)}
              className={`flex-1 py-3 text-lg font-bold transition-colors ${
                selectedFingerTab === tab 
                  ? 'bg-red-50 text-[#FF1E1E]' 
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              } ${tab !== 5 ? 'border-r border-gray-200' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 p-4 overflow-y-auto pb-32">
        <div className="grid grid-cols-2 gap-4">
          {filteredHuds.map((hud) => (
            <div 
              key={hud.id} 
              className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden group active:scale-95 transition-transform"
              onClick={() => handleVideoClick(hud.videoUrl, hud.title)}
            >
              <div className="relative aspect-video bg-gray-200">
                <img 
                  src={hud.thumbnailUrl} 
                  alt={hud.title} 
                  className="w-full h-full object-cover"
                />
                {/* Overlay de Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                  <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-[#FF1E1E] ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.333-5.89a1.5 1.5 0 000-2.538L6.3 2.841z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-3 text-center">
                <p className="text-[12px] font-black text-gray-800 uppercase leading-tight">{hud.title}</p>
              </div>
            </div>
          ))}
        </div>
        
        {filteredHuds.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="font-bold">Próximamente más HUDs...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HudScreen;
