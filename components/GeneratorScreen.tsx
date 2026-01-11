
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface GeneratorScreenProps {
  language: Language;
  onBack: () => void;
}

const GeneratorScreen: React.FC<GeneratorScreenProps> = ({ language, onBack }) => {
  const text = TRANSLATIONS[language];
  const isArabic = language === 'ar';
  
  const [deviceModel, setDeviceModel] = useState('Detecting...');
  const [dpi, setDpi] = useState(382);
  const [resolution, setResolution] = useState('720 x 1600');
  const [screenSize, setScreenSize] = useState('6.5');
  const [sensitivities, setSensitivities] = useState({
    general: 0,
    redDot: 0,
    mira2x: 0,
    mira4x: 0,
    sniper: 0,
    cam360: 0
  });
  const [buttonSize, setButtonSize] = useState(0);
  const [dpiEnabled, setDpiEnabled] = useState(false);
  const [coins, setCoins] = useState(2);

  const detectDevice = () => {
    const ua = navigator.userAgent;
    let model = "Generic Android";
    
    if (ua.match(/Samsung/i)) model = "Samsung Galaxy Pro";
    if (ua.match(/Motorola/i)) model = "Motorola Moto G";
    if (ua.match(/Xiaomi/i)) model = "Xiaomi Redmi Note";
    if (ua.match(/iPhone/i)) model = "iPhone 15 Pro Max";
    if (ua.match(/Huawei/i)) model = "Huawei P40";
    
    // Fallback detection using a common pattern in userAgent
    const match = ua.match(/\(([^;]+);/);
    if (match && match[1]) {
       model = match[1].split('Build/')[0].trim();
    }

    setDeviceModel(model);
    setResolution(`${window.screen.width} x ${window.screen.height}`);
  };

  const generateSens = () => {
    setSensitivities({
      general: Math.floor(Math.random() * (100 - 85 + 1)) + 85,
      redDot: Math.floor(Math.random() * (100 - 70 + 1)) + 70,
      mira2x: Math.floor(Math.random() * (100 - 80 + 1)) + 80,
      mira4x: Math.floor(Math.random() * (100 - 80 + 1)) + 80,
      sniper: Math.floor(Math.random() * (60 - 40 + 1)) + 40,
      cam360: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
    });
    setButtonSize(Math.floor(Math.random() * (65 - 45 + 1)) + 45);
    setDpi(Math.floor(Math.random() * (900 - 360 + 1)) + 360);
  };

  useEffect(() => {
    detectDevice();
    generateSens();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col animate-in fade-in duration-300" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="header-gradient pt-12 pb-6 px-6 shadow-md flex items-center sticky top-0 z-20">
        <button onClick={onBack} className="text-white p-2 mr-4 rtl:mr-0 rtl:ml-4 active:scale-90 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-white font-black text-xl tracking-tight uppercase truncate flex-1 text-center pr-10 rtl:pr-0 rtl:pl-10">
          {deviceModel}
        </h1>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* Screen Info */}
        <div className="text-center space-y-1">
          <p className="text-gray-600 font-bold">
            {text.genUsingDpi.replace('{dpi}', dpi.toString())}
          </p>
          <p className="text-gray-400 font-medium text-sm">
            {text.genScreen.replace('{res}', `${screenSize}, ${resolution} píxeles`)}
          </p>
        </div>

        {/* Sensitivity Card */}
        <div className="bg-[#FF1E1E] rounded-2xl p-6 shadow-[0_10px_30px_rgba(255,30,30,0.3)] text-white space-y-4">
          <SensitivityRow label={text.genGeneral} value={sensitivities.general} />
          <SensitivityRow label={text.genRedDot} value={sensitivities.redDot} />
          <SensitivityRow label={text.gen2x} value={sensitivities.mira2x} />
          <SensitivityRow label={text.gen4x} value={sensitivities.mira4x} />
          <SensitivityRow label={text.genSniper} value={sensitivities.sniper} />
          <SensitivityRow label={text.gen360} value={sensitivities.cam360} last />
        </div>

        {/* Button Size */}
        <div className="bg-[#5c21ff] rounded-2xl p-4 flex items-center justify-center space-x-3 rtl:space-x-reverse text-white shadow-lg shadow-purple-200">
           <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
           </div>
           <span className="font-black uppercase tracking-widest">{text.genButton}: {buttonSize}</span>
        </div>

        {/* DPI Toggle Area */}
        <div className="flex flex-col items-center space-y-4 py-4">
           <div className="flex items-center space-x-6 rtl:space-x-reverse">
              <span className="font-black text-gray-500 uppercase tracking-widest">{text.genDpi}</span>
              <button 
                onClick={() => setDpiEnabled(!dpiEnabled)}
                className={`w-14 h-7 rounded-full relative transition-colors duration-300 ${dpiEnabled ? 'bg-[#FF1E1E]' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 ${dpiEnabled ? 'left-8' : 'left-1'}`}></div>
              </button>
           </div>
           
           <div className="text-gray-800 font-black">
              {text.genCoins}: {coins}
           </div>
        </div>
      </main>

      {/* Footer Actions */}
      <footer className="bg-white border-t border-gray-100 flex items-center h-20 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <button onClick={generateSens} className="flex-1 flex flex-col items-center justify-center group active:bg-gray-50 h-full">
           <div className="mb-1 text-gray-400 group-active:text-[#FF1E1E]">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
             </svg>
           </div>
           <span className="text-[10px] font-black text-gray-400 group-active:text-gray-900">{text.genRegenerate}</span>
        </button>
        
        <div className="w-px h-10 bg-gray-100"></div>
        
        <button className="flex-1 flex flex-col items-center justify-center group active:bg-gray-50 h-full">
           <div className="mb-1 text-gray-400 group-active:text-[#FF1E1E]">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
             </svg>
           </div>
           <span className="text-[10px] font-black text-gray-400 group-active:text-gray-900">{text.genSave}</span>
        </button>
        
        <div className="w-px h-10 bg-gray-100"></div>

        <button className="flex-1 flex flex-col items-center justify-center group active:bg-gray-50 h-full">
           <div className="mb-1 text-gray-400 group-active:text-[#FF1E1E]">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
           </div>
           <span className="text-[10px] font-black text-gray-400 group-active:text-gray-900 uppercase">{text.genCoins}</span>
        </button>
      </footer>
    </div>
  );
};

const SensitivityRow: React.FC<{ label: string; value: number; last?: boolean }> = ({ label, value, last }) => (
  <div className={`pb-4 ${!last ? 'border-b border-white/20' : ''}`}>
    <div className="flex justify-between items-center">
      <span className="font-bold text-md opacity-90">{label}</span>
      <span className="font-black text-lg">{value}</span>
    </div>
    <div className="w-full h-1 bg-white/20 rounded-full mt-2 overflow-hidden">
       <div className="h-full bg-white rounded-full" style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

export default GeneratorScreen;
