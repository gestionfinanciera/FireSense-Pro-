
export type Language = 'es' | 'en' | 'pt' | 'ar';

export interface TranslationSet {
  title: string;
  subtitle: string;
  selectButton: string;
  welcome: string;
  dashboard: string;
  sensitivity: string;
  optimization: string;
  active: string;
  settings: string;
  status: string;
}

export interface LanguageOption {
  id: Language;
  name: string;
  flag: string;
}
