
import React from 'react';
import { Language } from '../types';

interface Pet {
  id: string;
  name: string;
  imageUrl: string;
  abilityName: string;
  description: string;
  abilityEffect: string;
}

interface PetDetailScreenProps {
  pet: Pet;
  language: Language;
  onBack: () => void;
}

const PetDetailScreen: React.FC<PetDetailScreenProps> = ({ pet, language, onBack }) => {
  const isArabic = language === 'ar';

  return (
    <div className="min-h-screen bg-white flex flex-col animate-in fade-in slide-in-from-right duration-300 transition-colors" dir={isArabic ? 'rtl' : 'ltr'}>
      <header className="header-gradient pt-12 pb-6 px-6 shadow-md flex items-center sticky top-0 z-20">
        <button onClick={onBack} className="text-white p-2 mr-4 rtl:mr-0 rtl:ml-4 active:scale-90 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-white font-black text-xl tracking-tight uppercase flex-1 text-center pr-10 rtl:pr-0 rtl:pl-10">
          {pet.name}
        </h1>
      </header>

      <main className="flex-1 p-6 space-y-8 overflow-y-auto">
        <div className="bg-white border-gray-100 shadow-[0_10px_30px_rgba(255,30,30,0.05)] rounded-[2.5rem] border p-6 flex items-center justify-center min-h-[250px] transition-colors">
           <img 
             src={pet.imageUrl} 
             alt={pet.name} 
             className="w-64 h-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.1)]"
           />
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            <span className="text-[#FF1E1E] mr-2">⚡</span>
            Habilidad: {pet.abilityName}
          </h2>
        </div>

        <div className="px-2">
          <p className="text-gray-500 text-lg leading-relaxed text-justify font-medium italic">
            {pet.description}
          </p>
        </div>

        <div className="space-y-4 px-4 border-l-4 border-[#FF1E1E] bg-red-50/30 py-4 rounded-r-2xl transition-colors">
           <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">
             Efecto
           </h3>
           <p className="text-gray-700 text-lg leading-relaxed font-normal">
             {pet.abilityEffect}
           </p>
        </div>
      </main>

      <div className="h-10"></div>
    </div>
  );
};

export default PetDetailScreen;
