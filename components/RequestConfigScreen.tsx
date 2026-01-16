
import React, { useState } from 'react';
import { Language, DeviceSensitivity } from '../types';
import { TRANSLATIONS } from '../constants';
import Analytics from '../services/analytics';

interface RequestConfigScreenProps {
  language: Language;
  onBack: () => void;
  onPublish: (device: DeviceSensitivity) => void;
}

const RequestConfigScreen: React.FC<RequestConfigScreenProps> = ({ language, onBack, onPublish }) => {
  const text = TRANSLATIONS[language];
  const isArabic = language === 'ar';
  
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [option, setOption] = useState<'update' | 'publish'>('update');

  const handleSubmit = () => {
    if (!brand || !model) {
      alert(language === 'es' ? 'Por favor completa la Marca y el Modelo.' : 'Please complete Brand and Model.');
      return;
    }

    if (option === 'publish') {
      // Simular generación de valores para la publicación
      const communityDevice: DeviceSensitivity = {
        id: 'comm-' + Date.now(),
        brand: brand,
        model: model,
        colorTag: '#FF1E1E',
        general: 200,
        redDot: 195,
        mira2x: 188,
        mira4x: 180,
        sniper: 150,
        cam360: 200,
        buttonSize: 55,
        dpi: 600,
        isCommunity: true,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      onPublish(communityDevice);
      alert(language === 'es' ? '¡Tu sensibilidad ha sido publicada en la sección de Comunidad!' : 'Your sensitivity has been published in the Community section!');
    } else {
      Analytics.logAction('request_config_submit', 'request_screen', `${brand} ${model}`);
      alert(language === 'es' 
        ? `¡Gracias! Tu solicitud para ${brand} ${model} ha sido enviada.` 
        : `Thank you! Your request for ${brand} ${model} has been sent.`);
    }
    onBack();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300" dir={isArabic ? 'rtl' : 'ltr'}>
      <header className="header-gradient pt-12 pb-6 px-6 shadow-md flex items-center sticky top-0 z-20">
        <button onClick={onBack} className="text-white p-2 mr-4 active:scale-90 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-white font-black text-xl tracking-tight uppercase flex-1 text-center pr-10 rtl:pr-0 rtl:pl-10">
          {text.requestTitle}
        </h1>
      </header>

      <main className="flex-1 p-6 space-y-8 overflow-y-auto">
        <p className="text-gray-800 font-medium text-lg text-center px-4 leading-relaxed">
          {text.requestSubtitle}
        </p>

        <div className="space-y-4">
          <div className="relative">
            <select 
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg py-4 px-6 appearance-none font-bold text-gray-700 focus:border-[#FF1E1E] focus:ring-2 focus:ring-[#FF1E1E]/10 outline-none transition-all"
            >
              <option value="" disabled>{text.requestBrandLabel}</option>
              <option value="Samsung">Samsung</option>
              <option value="iPhone">iPhone</option>
              <option value="Xiaomi">Xiaomi</option>
              <option value="Motorola">Motorola</option>
              <option value="Huawei">Huawei</option>
              <option value="Acer">Acer</option>
              <option value="Otros">Otros</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>

          <div className="relative">
            <input 
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder={text.requestModelLabel}
              className="w-full bg-white border border-gray-300 rounded-lg py-4 px-6 font-bold text-gray-700 focus:border-[#FF1E1E] focus:ring-2 focus:ring-[#FF1E1E]/10 outline-none transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
           <p className="text-gray-900 font-black text-sm leading-relaxed text-center italic">
             {text.requestInfo}
           </p>
        </div>

        <div className="flex justify-center">
           <button 
             onClick={() => alert('Función de comentarios próximamente.')}
             className="neon-bg-red px-10 py-3 rounded-xl text-white font-black uppercase text-sm tracking-widest active:scale-95 transition-transform shadow-lg shadow-red-500/30"
           >
             {text.requestComment}
           </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
           <label className="flex items-center space-x-4 rtl:space-x-reverse cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input type="radio" checked={option === 'update'} onChange={() => setOption('update')} className="w-7 h-7 border-2 border-gray-300 rounded-full appearance-none checked:border-[#FF1E1E] transition-all" />
                {option === 'update' && <div className="absolute w-4 h-4 bg-[#FF1E1E] rounded-full shadow-[0_0_8px_#FF1E1E]"></div>}
              </div>
              <span className={`font-black text-sm uppercase ${option === 'update' ? 'text-[#FF1E1E]' : 'text-gray-800'}`}>{text.requestUpdateOpt}</span>
           </label>
           <label className="flex items-center space-x-4 rtl:space-x-reverse cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input type="radio" checked={option === 'publish'} onChange={() => setOption('publish')} className="w-7 h-7 border-2 border-gray-300 rounded-full appearance-none checked:border-[#FF1E1E] transition-all" />
                {option === 'publish' && <div className="absolute w-4 h-4 bg-[#FF1E1E] rounded-full shadow-[0_0_8px_#FF1E1E]"></div>}
              </div>
              <span className={`font-black text-sm uppercase ${option === 'publish' ? 'text-[#FF1E1E]' : 'text-gray-800'}`}>{text.requestPublishOpt}</span>
           </label>
        </div>

        <div className="flex justify-center pb-12">
          <button 
            onClick={handleSubmit}
            className="neon-bg-red w-full max-w-xs py-5 rounded-2xl flex items-center justify-center space-x-4 rtl:space-x-reverse shadow-2xl active:scale-95 transition-all group"
          >
             <span className="text-white font-black text-lg uppercase tracking-[0.2em]">{text.requestSubmit}</span>
             <svg className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" /></svg>
          </button>
        </div>
      </main>
    </div>
  );
};

export default RequestConfigScreen;
