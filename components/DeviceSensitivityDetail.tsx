
import React from 'react';
import { Language, DeviceSensitivity } from '../types';
import { TRANSLATIONS } from '../constants';

interface DeviceSensitivityDetailProps {
  language: Language;
  device: DeviceSensitivity;
  onBack: () => void;
}

const DeviceSensitivityDetail: React.FC<DeviceSensitivityDetailProps> = ({ language, device, onBack }) => {
  const text = TRANSLATIONS[language];
  const isArabic = language === 'ar';

  return (
    <div className="min-h-screen bg-white flex flex-col animate-in fade-in slide-in-from-right duration-300" dir={isArabic ? 'rtl' : 'ltr'}>
      <header className="header-gradient pt-12 pb-6 px-6 shadow-md flex items-center sticky top-0 z-20">
        <button onClick={onBack} className="text-white p-2 mr-4 active:scale-90 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 text-center pr-10 rtl:pr-0 rtl:pl-10">
          <h1 className="text-white font-black text-xl tracking-tight uppercase truncate">{device.model}</h1>
          <p className="text-white/80 text-[10px] font-bold uppercase mt-1">{device.brand} Config</p>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        <div className="text-center bg-gray-50 rounded-2xl py-4 border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2">
             <span className="text-[8px] bg-[#FF1E1E] text-white px-2 py-0.5 rounded font-black uppercase">Scale 200</span>
          </div>
          <p className="text-[#FF1E1E] font-black text-lg tracking-tight uppercase">
            {device.dpi ? text.genUsingDpi.replace('{dpi}', device.dpi.toString()) : text.genNoDpi}
          </p>
        </div>

        <div className="bg-[#FF1E1E] rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(255,30,30,0.3)] text-white space-y-5">
          <SensitivityRow label={text.genGeneral} value={device.general} />
          <SensitivityRow label={text.genRedDot} value={device.redDot} />
          <SensitivityRow label={text.gen2x} value={device.mira2x} />
          <SensitivityRow label={text.gen4x} value={device.mira4x} />
          <SensitivityRow label={text.genSniper} value={device.sniper} />
          <SensitivityRow label={text.gen360} value={device.cam360} last />
        </div>

        <div className="bg-white border-red-50 rounded-[2rem] p-6 flex items-center justify-between shadow-xl shadow-red-100/50 border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
               <div className="w-4 h-4 rounded-full bg-[#FF1E1E] shadow-[0_0_10px_#FF1E1E]"></div>
            </div>
            <div>
              <p className="text-gray-400 text-[10px] font-black uppercase leading-none mb-1">{text.genButton}</p>
              <p className="text-gray-900 font-black text-xl italic uppercase">Disparo</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-4xl font-black text-[#FF1E1E] italic">{device.buttonSize}%</span>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-2xl text-center">
           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
             Sugerencia: Cambiar cada 2 meses para mejor respuesta.
           </span>
        </div>
      </main>

      <footer className="h-20"></footer>
    </div>
  );
};

const SensitivityRow: React.FC<{ label: string; value: number; last?: boolean }> = ({ label, value, last }) => {
  // Escala hasta 200 ahora
  const percentage = (value / 200) * 100;
  return (
    <div className={`pb-2 ${!last ? 'border-b border-white/20' : ''}`}>
      <div className="flex justify-between items-end mb-1.5">
        <span className="font-bold text-[10px] uppercase opacity-90">{label}</span>
        <span className="font-black text-2xl italic">{value}</span>
      </div>
      <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
         <div className="h-full bg-white rounded-full transition-all duration-1000 shadow-[0_0_8px_white]" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default DeviceSensitivityDetail;
