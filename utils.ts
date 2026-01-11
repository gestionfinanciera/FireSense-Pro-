
import { Language, TranslationSet } from './types';
import { TRANSLATIONS } from './constants';

export const getRelativeDate = (dateString: string, lang: Language): string => {
  const text = TRANSLATIONS[lang];
  const publishDate = new Date(dateString);
  const today = new Date();
  
  // Resetear horas para comparar solo días
  publishDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  const diffTime = Math.abs(today.getTime() - publishDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return text.hoy;
  
  // Para Árabe (RTL) o formatos específicos podrías ajustar aquí
  if (lang === 'ar') {
    return `منذ ${diffDays} أيام`;
  }
  
  return `${text.hace} ${diffDays} ${text.dias}`;
};
