
import React, { useState } from 'react';
import { Language, Pet } from '../types';
import { PETS } from '../constants';
import PetDetailScreen from './PetDetailScreen';

interface PetScreenProps {
  language: Language;
  onBack: () => void;
  darkMode: boolean;
}

const PetScreen: React.FC<PetScreenProps> = ({ language, onBack, darkMode }) => {
  const isArabic = language === 'ar';
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  if (selectedPet) {
    return (
      <PetDetailScreen 
        pet={selectedPet} 
        language={language} 
        onBack={() => setSelectedPet(null)} 
        darkMode={darkMode}
      />
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-[#f3f4f6]'} flex flex-col animate-in fade-in duration-300 transition-colors`} dir={isArabic ? 'rtl' : 'ltr'}>
      <header className="header-gradient pt-12 pb-6 px-6 shadow-md flex items-center sticky top-0 z-20">
        <button onClick={onBack} className="text-white p-2 mr-4 rtl:mr-0 rtl:ml-4 active:scale-90 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-white font-black text-xl tracking-tight uppercase flex-1 text-center pr-10 rtl:pr-0 rtl:pl-10">
          Mascota
        </h1>
      </header>

      <main className="p-4 grid grid-cols-3 gap-3">
        {PETS.map((pet) => (
          <button 
            key={pet.id} 
            onClick={() => setSelectedPet(pet)}
            className={`${darkMode ? 'bg-zinc-900 border-white/10' : 'bg-white border-gray-200'} rounded-lg border overflow-hidden flex flex-col shadow-sm transition-all hover:border-[#FF1E1E]/50 active:scale-95 text-left rtl:text-right`}
          >
            <div className="flex-1 p-2 flex items-center justify-center min-h-[100px]">
              <img 
                src={pet.imageUrl} 
                alt={pet.name} 
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
            <div className="bg-[#FF1E1E] py-2 px-1 text-center shadow-[0_-2px_10px_rgba(255,30,30,0.2)]">
              <span className="text-white text-[10px] font-black uppercase truncate block px-1 tracking-tighter">
                {pet.name}
              </span>
            </div>
          </button>
        ))}
      </main>
      
      <div className="h-10"></div>
    </div>
  );
};

export default PetScreen;
