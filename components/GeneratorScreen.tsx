
import React, { useState, useEffect } from 'react';
import { Language, SensitivitySet, SavedConfig } from '../types';
import { TRANSLATIONS } from '../constants';
import Analytics from '../services/analytics';

interface GeneratorScreenProps {
  language: Language;
  onBack: () => void;
  onSaveConfig: (config: SavedConfig) => void;
}

const GeneratorScreen: React.FC<GeneratorScreenProps> = ({ language, onBack, onSaveConfig }) => {
  const text = TRANSLATIONS[language];
  const isArabic = language === 'ar';
  
  const [deviceInfo, setDeviceInfo] = useState({ model: 'Detecting...', os: 'android', screenInfo: '' });
  const [dpiEnabled, setDpiEnabled] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  
  const [sensitivities, setSensitivities] = useState<SensitivitySet>({
    general: 0,
    redDot: 0,
    mira2x: 0,
    mira4x: 0,
    sniper: 0,
    cam360: 0,
    buttonSize: 0,
    dpi: null
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [configName, setConfigName] = useState('');

  useEffect(() => {
    detectDevice();
    Analytics.logScreenView('GeneratorScreen');
  }, []);

  const detectDevice = () => {
    try {
      const ua = navigator.userAgent;
      let model = "Generic Device";
      let os = "android";

      if (ua.match(/iPhone|iPad|iPod/i)) {
        os = "ios";
        const height = window.screen.height * window.devicePixelRatio;
        if (height === 2796) model = "iPhone 15 Pro Max";
        else if (height === 2556) model = "iPhone 15 Pro";
        else model = "iPhone " + (window.screen.height > 800 ? "Pro Max" : "Standard");
      } else {
        os = "android";
        const modelMatch = ua.match(/\(([^;]+);/);
        if (modelMatch && modelMatch[1]) {
          model = modelMatch[1].split('Build/')[0].trim();
        } else {
          model = "Android Device";
        }
      }

      const res = `${window.screen.width} x ${window.screen.height} píxeles`;
      const diagonal = os === 'ios' ? '6.7"' : '6.5"'; 
      setDeviceInfo({ model, os, screenInfo: `${diagonal}, ${res}` });
    } catch (e) {
      Analytics.logError("Error detecting device: " + (e as Error).message);
    }
  };

  const generateSens = () => {
    try {
      Analytics.logSensitivityGenerated(deviceInfo.model, dpiEnabled);
      const { os } = deviceInfo;
      let config: SensitivitySet;
      
      if (os === 'ios') {
        config = {
          general: Math.floor(Math.random() * (145 - 130 + 1)) + 130,
          redDot: Math.floor(Math.random() * (135 - 120 + 1)) + 120,
          mira2x: Math.floor(Math.random() * (125 - 110 + 1)) + 110,
          mira4x: Math.floor(Math.random() * (110 - 95 + 1)) + 95,
          sniper: Math.floor(Math.random() * (90 - 75 + 1)) + 75,
          cam360: Math.floor(Math.random() * (160 - 140 + 1)) + 140,
          buttonSize: 55,
          dpi: null
        };
      } else if (dpiEnabled) {
        config = {
          general: Math.floor(Math.random() * (170 - 150 + 1)) + 150,
          redDot: Math.floor(Math.random() * (160 - 140 + 1)) + 140,
          mira2x: Math.floor(Math.random() * (145 - 130 + 1)) + 130,
          mira4x: Math.floor(Math.random() * (130 - 115 + 1)) + 115,
          sniper: Math.floor(Math.random() * (100 - 85 + 1)) + 85,
          cam360: Math.floor(Math.random() * (180 - 160 + 1)) + 160,
          buttonSize: Math.floor(Math.random() * (48 - 45 + 1)) + 45,
          dpi: Math.floor(Math.random() * (800 - 520 + 1)) + 520
        };
      } else {
        config = {
          general: Math.floor(Math.random() * (135 - 120 + 1)) + 120,
          redDot: Math.floor(Math.random() * (125 - 110 + 1)) + 110,
          mira2x: Math.floor(Math.random() * (115 - 100 + 1)) + 100,
          mira4x: Math.floor(Math.random() * (105 - 90 + 1)) + 90,
          sniper: Math.floor(Math.random() * (85 - 70 + 1)) + 70,
          cam360: Math.floor(Math.random() * (150 - 130 + 1)) + 130,
          buttonSize: Math.floor(Math.random() * (55 - 50 + 1)) + 50,
          dpi: null
        };
      }
      setSensitivities(config);
      setHasGenerated(true);

      // Opcional: Mostrar anuncio cada vez que genera para monetizar
      // Analytics.requestInterstitial();
    } catch (e) {
      Analytics.logError("Error generating sensitivity: " + (e as Error).message);
    }
  };

  const handleSave = () => {
    if (!configName.trim() || !hasGenerated) return;
    const newConfig: SavedConfig = {
      ...sensitivities,
      id: Date.now().toString(),
      name: configName,
      device: deviceInfo.model,
      date: new Date().toLocaleDateString()
    };
    onSaveConfig(newConfig);
    setIsModalOpen(false);
    setConfigName('');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col animate-in fade-in duration-300" dir={isArabic ? 'rtl' : 'ltr'}>
      <header className="header-gradient pt-12 pb-6 px-6 shadow-md flex items-center sticky top-0 z-20">
        <button onClick={onBack} className="text-white p-2 mr-4 active:scale-90 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 text-center pr-10 rtl:pr-0 rtl:pl-10">
          <h1 className="text-white font-black text-xl tracking-tight uppercase truncate">{deviceInfo.model}</h1>
          <p className="text-white/80 text-[10px] font-bold uppercase mt-1">Pantalla: {deviceInfo.screenInfo}</p>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        <div className="text-center bg-gray-50 rounded-2xl py-4 border border-gray-100">
          <p className="text-[#FF1E1E] font-black text-lg tracking-tight uppercase">
            {dpiEnabled && sensitivities.dpi ? text.genUsingDpi.replace('{dpi}', sensitivities.dpi.toString()) : (hasGenerated ? text.genNoDpi : "ESPERANDO GENERACIÓN")}
          </p>
        </div>

        <div className="bg-[#FF1E1E] rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(255,30,30,0.3)] text-white space-y-5">
          <SensitivityRow label={text.genGeneral} value={sensitivities.general} />
          <SensitivityRow label={text.genRedDot} value={sensitivities.redDot} />
          <SensitivityRow label={text.gen2x} value={sensitivities.mira2x} />
          <SensitivityRow label={text.gen4x} value={sensitivities.mira4x} />
          <SensitivityRow label={text.genSniper} value={sensitivities.sniper} />
          <SensitivityRow label={text.gen360} value={sensitivities.cam360} last />
        </div>

        <div className="space-y-4">
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
                <span className="text-4xl font-black text-[#FF1E1E] italic">{sensitivities.buttonSize}%</span>
              </div>
           </div>

           {deviceInfo.os !== 'ios' && (
             <div className="flex items-center justify-between w-full bg-gray-50 p-5 rounded-[2rem] border border-gray-100">
                <div className="flex flex-col">
                  <span className="font-black uppercase text-xs text-gray-800">{text.genDpi}</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Optimización</span>
                </div>
                <button 
                  onClick={() => {
                    setDpiEnabled(!dpiEnabled);
                    if(hasGenerated) setTimeout(generateSens, 100);
                  }}
                  className={`w-14 h-7 rounded-full relative transition-all duration-300 ${dpiEnabled ? 'bg-[#FF1E1E]' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all ${dpiEnabled ? 'translate-x-7' : 'translate-x-1'}`}></div>
                </button>
             </div>
           )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-50 flex items-center h-44 px-4 pb-24">
        <button onClick={generateSens} className="flex-1 flex flex-col items-center group active:scale-95 transition-all">
           <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-1 group-active:bg-red-50 transition-colors">
             <svg className="w-6 h-6 text-gray-400 group-active:text-[#FF1E1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
             </svg>
           </div>
           <span className="text-[10px] font-black text-gray-400 uppercase">{text.genRegenerate}</span>
        </button>
        <div className="w-px h-10 bg-gray-100 mx-2"></div>
        <button onClick={() => hasGenerated && setIsModalOpen(true)} disabled={!hasGenerated} className={`flex-1 flex flex-col items-center group active:scale-95 transition-all ${!hasGenerated ? 'opacity-30' : 'opacity-100'}`}>
           <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-1 group-active:bg-red-50 transition-colors">
             <svg className="w-6 h-6 text-gray-400 group-active:text-[#FF1E1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
             </svg>
           </div>
           <span className="text-[10px] font-black text-gray-400 uppercase">{text.genSave}</span>
        </button>
      </footer>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/30 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white border-gray-100 w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in duration-300 border">
              <h2 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-tight text-center">{text.saveModalTitle}</h2>
              <input 
                type="text" 
                value={configName}
                onChange={(e) => setConfigName(e.target.value)}
                placeholder={text.saveModalPlaceholder}
                className="w-full bg-gray-50 border-gray-100 text-gray-800 border-2 rounded-2xl py-4 px-6 text-center font-black focus:border-[#FF1E1E] transition-all mb-8 uppercase outline-none"
              />
              <div className="flex space-x-3 rtl:space-x-reverse">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black uppercase text-xs tracking-widest">VOLVER</button>
                <button onClick={handleSave} className="flex-1 py-4 bg-[#FF1E1E] rounded-2xl font-black text-white uppercase text-xs tracking-widest shadow-lg">GUARDAR</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const SensitivityRow: React.FC<{ label: string; value: number; last?: boolean }> = ({ label, value, last }) => {
  const percentage = (value / 200) * 100;
  return (
    <div className={`pb-2 ${!last ? 'border-b border-white/20' : ''}`}>
      <div className="flex justify-between items-end mb-1.5">
        <span className="font-bold text-[10px] uppercase opacity-90">{label}</span>
        <span className="font-black text-2xl italic">{value}</span>
      </div>
      <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
         <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default GeneratorScreen;
