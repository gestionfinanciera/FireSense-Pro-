
export type Language = 'es' | 'en' | 'pt' | 'ar';

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  publishDate: string;
  imageUrl: string;
}

export interface TranslationSet {
  title: string;
  subtitle: string;
  selectButton: string;
  noticias: string;
  categorias: string;
  sensibilidades: string;
  verTodas: string;
  inicio: string;
  favoritos: string;
  ajustes: string;
  catSensibilidad: string;
  catArmas: string;
  catHabilidades: string;
  catGenerador: string;
  catHud: string;
  catMascota: string;
  catPersonajes: string;
  catSorteos: string;
  back: string;
  hace: string;
  dias: string;
  hoy: string;
  sensMenuPremium: string;
  sensMenuPremiumDesc: string;
  sensMenuDefault: string;
  sensMenuDefaultDesc: string;
  sensMenuPlayers: string;
  sensMenuPlayersDesc: string;
  // Premium Screen
  premiumTitle: string;
  premiumSubtitle: string;
  premiumLabel: string;
  basicLabel: string;
  featDarkMode: string;
  featBasicSens: string;
  featInsaneSens: string;
  featUnlimitedGen: string;
  featExclusiveSkills: string;
  featNoAds: string;
  premiumPrice: string;
  premiumBuy: string;
  premiumDisclaimer: string;
}

export interface LanguageOption {
  id: Language;
  name: string;
  flag: string;
}
