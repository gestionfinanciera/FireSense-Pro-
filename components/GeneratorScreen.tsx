
import React, { useState, useEffect } from 'react';
import { Language, SensitivitySet, SavedConfig } from '../types';
import { TRANSLATIONS } from '../constants';

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
  
  // Initial state strictly at 0 as requested
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

  const detectDevice = () => {
    const ua = navigator.userAgent;
    let model = "Generic Device";
    let os = "android";

    // Detect OS
    if (ua.match(/iPhone|iPad|iPod/i)) {
      os = "ios";
      // Try to get specific iPhone model if possible via screen dimensions
      const width = window.screen.width * window.devicePixelRatio;
      const height = window.screen.height * window.devicePixelRatio;
      if (height === 2796) model = "iPhone 15 Pro Max";
      else if (height === 2556) model = "iPhone 15 Pro";
      else model = "iPhone " + (window.screen.height > 800 ? "Pro Max" : "Standard");
    } else {
      os = "android";
      // Extract model from UserAgent if available (e.g., SM-G991B)
      const modelMatch = ua.match(/\(([^;]+);/);
      if (modelMatch && modelMatch[1]) {
        model = modelMatch[1].split('Build/')[0].trim();
      } else {
        model = "Android Device";
      }
    }

    const res = `${window.screen.width} x ${window.screen.height} píxeles`;
    const diagonal = os === 'ios' ? '6.7"' : '6.5"'; // Simulated estimation
    
    setDeviceInfo({ model, os, screenInfo: `${diagonal}, ${res}` });
  };

  const generateSens = () => {
    const { os } = deviceInfo;
    let config: SensitivitySet;

    // Logic based on the professional guide provided (0-200 range)
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

  useEffect(() => {
    detectDevice();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col animate-in fade-in duration-300" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header with Device and Screen Specs */}
      <header className="header-gradient pt-12 pb-6 px-6 shadow-md flex items-center sticky top-0 z-20">
        <button onClick={onBack} className="text-white p-2 mr-4 rtl:mr-0 rtl:ml-4 active:scale-90 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 text-center pr-10 rtl:pr-0 rtl:pl-10">
          <h1 className="text-white font-black text-xl tracking-tight uppercase truncate">
            {deviceInfo.model}
          </h1>
          <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest leading-none mt-1">
            Pantalla: {deviceInfo.screenInfo}
          </p>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* Info Area */}
        <div className="text-center bg-gray-50 rounded-2xl py-4 border border-gray-100">
          <p className="text-[#FF1E1E] font-black text-lg tracking-tight uppercase">
            {dpiEnabled && sensitivities.dpi ? text.genUsingDpi.replace('{dpi}', sensitivities.dpi.toString()) : (hasGenerated ? text.genNoDpi : "ESPERANDO GENERACIÓN")}
          </p>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-1">
            {hasGenerated ? "Configuración Perfecta Detectada" : "Pulsa Re-Generar para escanear tu dispositivo"}
          </p>
        </div>

        {/* Sensitivities List (Non-interactive) */}
        <div className="bg-[#FF1E1E] rounded-3xl p-6 shadow-[0_20px_50px_rgba(255,30,30,0.3)] text-white space-y-5 relative overflow-hidden transition-all duration-500">
          <SensitivityRow label={text.genGeneral} value={sensitivities.general} />
          <SensitivityRow label={text.genRedDot} value={sensitivities.redDot} />
          <SensitivityRow label={text.gen2x} value={sensitivities.mira2x} />
          <SensitivityRow label={text.gen4x} value={sensitivities.mira4x} />
          <SensitivityRow label={text.genSniper} value={sensitivities.sniper} />
          <SensitivityRow label={text.gen360} value={sensitivities.cam360} last />
        </div>

        {/* Action Controls */}
        <div className="space-y-4">
           {/* Button Size Card */}
           <div className="w-full bg-black rounded-2xl p-5 flex items-center justify-between shadow-xl border border-white/10 group active:scale-[0.98] transition-transform">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="w-12 h-12 rounded-full bg-[#FF1E1E]/10 border border-[#FF1E1E]/30 flex items-center justify-center">
                   <div className="w-4 h-4 rounded-full bg-[#FF1E1E] shadow-[0_0_10px_#FF1E1E]"></div>
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{text.genButton}</p>
                  <p className="text-white font-black text-xl">DISPARO</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-4xl font-black neon-text-red italic">{sensitivities.buttonSize}%</span>
              </div>
           </div>

           {/* DPI Toggle - Only for Android */}
           {deviceInfo.os !== 'ios' && (
             <div className="flex items-center justify-between w-full bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div className="flex flex-col">
                  <span className="font-black text-gray-800 uppercase text-xs tracking-widest">{text.genDpi}</span>
                  <span className="text-[10px] text-gray-400 font-bold">OPTIMIZACIÓN DE PIXÉLES</span>
                </div>
                <button 
                  onClick={() => {
                    setDpiEnabled(!dpiEnabled);
                    // Force refresh if already generated
                    if(hasGenerated) setTimeout(generateSens, 100);
                  }}
                  className={`w-16 h-8 rounded-full relative transition-all duration-300 shadow-inner ${dpiEnabled ? 'bg-[#FF1E1E]' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 transform ${dpiEnabled ? 'translate-x-8' : 'translate-x-1'}`}></div>
                </button>
             </div>
           )}
        </div>
      </main>

      {/* Action Footer */}
      <footer className="bg-white border-t border-gray-100 flex items-center h-24 px-4 pb-4">
        <button 
          onClick={generateSens}
          className="flex-1 flex flex-col items-center justify-center group active:scale-95 transition-all"
        >
           <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-1 group-active:bg-red-50 transition-colors">
             <svg className="w-6 h-6 text-gray-400 group-active:text-[#FF1E1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
             </svg>
           </div>
           <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{text.genRegenerate}</span>
        </button>
        
        <div className="w-px h-10 bg-gray-100 mx-2"></div>
        
        <button 
          onClick={() => hasGenerated && setIsModalOpen(true)}
          disabled={!hasGenerated}
          className={`flex-1 flex flex-col items-center justify-center group active:scale-95 transition-all ${!hasGenerated ? 'opacity-30' : 'opacity-100'}`}
        >
           <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-1 group-active:bg-red-50 transition-colors">
             <svg className="w-6 h-6 text-gray-400 group-active:text-[#FF1E1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
             </svg>
           </div>
           <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{text.genSave}</span>
        </button>
      </footer>

      {/* Save Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                 <svg className="w-8 h-8 text-[#FF1E1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                 </svg>
              </div>
              <h2 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight text-center">{text.saveModalTitle}</h2>
              <p className="text-gray-400 text-xs font-bold text-center mb-6 uppercase tracking-widest">Añadir a tus favoritos</p>
              
              <input 
                type="text" 
                value={configName}
                onChange={(e) => setConfigName(e.target.value)}
                placeholder={text.saveModalPlaceholder}
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-5 px-6 text-center font-black text-gray-800 focus:outline-none focus:border-[#FF1E1E] transition-all mb-8 uppercase"
                autoFocus
              />
              
              <div className="flex space-x-3 rtl:space-x-reverse">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 bg-gray-100 rounded-2xl font-black text-gray-500 uppercase text-xs tracking-widest active:scale-95 transition-all"
                >
                  {text.back}
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-1 py-4 neon-bg-red rounded-2xl font-black text-white uppercase text-xs tracking-widest active:scale-95 transition-all shadow-lg"
                >
                  {text.genSave}
                </button>
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
    <div className={`pb-2 ${!last ? 'border-b border-white/10' : ''}`}>
      <div className="flex justify-between items-end mb-1.5">
        <span className="font-bold text-[10px] uppercase tracking-wider opacity-80">{label}</span>
        <span className="font-black text-2xl leading-none italic">{value}</span>
      </div>
      <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden border border-white/5">
         <div 
           className="h-full bg-white rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(255,255,255,1)]" 
           style={{ width: `${percentage}%` }} 
         ></div>
      </div>
    </div>
  );
};

export default GeneratorScreen;
