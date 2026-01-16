
import React, { useState, useMemo } from 'react';
import { Language, DeviceSensitivity } from '../types';
import { TRANSLATIONS, PREDEFINED_SENSITIVITIES } from '../constants';

interface DeviceListScreenProps {
  language: Language;
  onBack: () => void;
  onSelectDevice: (device: DeviceSensitivity) => void;
  onRequest: () => void;
  isCommunity?: boolean;
  communityConfigs?: DeviceSensitivity[];
}

const DeviceListScreen: React.FC<DeviceListScreenProps> = ({ 
  language, onBack, onSelectDevice, onRequest, isCommunity, communityConfigs = [] 
}) => {
  const text = TRANSLATIONS[language];
  const isArabic = language === 'ar';
  const [searchQuery, setSearchQuery] = useState('');

  const devicesToShow = isCommunity ? communityConfigs : PREDEFINED_SENSITIVITIES;

  const filteredDevices = useMemo(() => {
    return devicesToShow.filter(device => 
      device.model.toLowerCase().includes(searchQuery.toLowerCase()) || 
      device.brand.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => a.model.localeCompare(b.model));
  }, [searchQuery, devicesToShow]);

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col animate-in fade-in duration-300 relative" dir={isArabic ? 'rtl' : 'ltr'}>
      <header className="header-gradient pt-12 pb-6 px-6 shadow-md flex items-center sticky top-0 z-20">
        <button onClick={onBack} className="text-white p-2 active:scale-90 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-white font-black text-xl tracking-tight uppercase flex-1 text-center pr-10 rtl:pr-0 rtl:pl-10">
          {isCommunity ? text.communityTitle : text.sensibilidades}
        </h1>
      </header>

      <div className="px-4 py-4 sticky top-[108px] bg-[#f3f4f6] z-10">
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#FF1E1E]">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={text.searchPlaceholder}
            className="w-full bg-[#E5E7EB] border-transparent rounded-xl py-4 pl-12 pr-6 text-gray-700 font-bold outline-none focus:bg-white focus:ring-2 focus:ring-[#FF1E1E]/20 transition-all placeholder:text-gray-500 shadow-sm"
          />
        </div>
      </div>

      <main className="flex-1 p-4 overflow-y-auto pb-32">
        <div className="space-y-3">
          {filteredDevices.map((device) => (
            <button 
              key={device.id} 
              onClick={() => onSelectDevice(device)}
              className="w-full bg-white rounded-lg shadow-sm flex items-center overflow-hidden active:scale-[0.98] transition-all border border-gray-100 group"
            >
              <div className="w-1.5 self-stretch" style={{ backgroundColor: device.colorTag || '#FF1E1E' }}></div>
              <div className="flex-1 py-4 px-5 text-left rtl:text-right flex flex-col">
                <span className="text-gray-800 font-bold text-lg tracking-tight group-hover:text-[#FF1E1E] transition-colors">
                  {device.model}
                </span>
                <div className="flex items-center mt-1 space-x-2 rtl:space-x-reverse">
                   <span className="text-[9px] font-black bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                     Actualizado
                   </span>
                   {device.isCommunity && (
                     <span className="text-[9px] font-black bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                       Comunidad
                     </span>
                   )}
                </div>
              </div>
              <div className="px-4 text-gray-300 group-hover:text-[#FF1E1E] transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
          
          {filteredDevices.length === 0 && (
            <div className="text-center py-20 px-8">
               <p className="text-gray-400 font-bold uppercase text-xs tracking-widest leading-relaxed">
                 {isCommunity ? "No hay configuraciones compartidas aún." : "No se encontró el modelo."}
               </p>
            </div>
          )}
        </div>
      </main>

      <button 
        onClick={onRequest}
        className="fixed bottom-28 right-6 neon-bg-red px-6 py-3.5 rounded-2xl flex items-center space-x-3 rtl:space-x-reverse shadow-2xl active:scale-90 transition-transform z-40"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
        </svg>
        <span className="text-white font-black text-sm uppercase tracking-widest">
          {text.requestButton}
        </span>
      </button>
    </div>
  );
};

export default DeviceListScreen;
