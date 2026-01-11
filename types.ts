
export type Language = 'es' | 'en' | 'pt' | 'ar';

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  publishDate: string; // Formato YYYY-MM-DD
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
  // Sensitivity Menu
  sensMenuPremium: string;
  sensMenuPremiumDesc: string;
  sensMenuDefault: string;
  sensMenuDefaultDesc: string;
  sensMenuPlayers: string;
  sensMenuPlayersDesc: string;
}

export interface LanguageOption {
  id: Language;
  name: string;
  flag: string;
}
