
import { LanguageOption, Language, TranslationSet } from './types';

export const LANGUAGES: LanguageOption[] = [
  { id: 'es', name: 'Español', flag: '🇪🇸' },
  { id: 'en', name: 'English', flag: '🇺🇸' },
  { id: 'pt', name: 'Português', flag: '🇧🇷' },
  { id: 'ar', name: 'Árabe', flag: '🇦🇪' }
];

export const TRANSLATIONS: Record<Language, TranslationSet> = {
  es: {
    title: 'Elige tu idioma',
    subtitle: 'Selecciona tu idioma preferido para usar FireSense Pro+',
    selectButton: 'Seleccionar',
    welcome: 'Bienvenido a FireSense Pro+',
    dashboard: 'Panel de Control',
    sensitivity: 'Sensibilidad',
    optimization: 'Optimización',
    active: 'Activo',
    settings: 'Ajustes',
    status: 'Estado del Sistema'
  },
  en: {
    title: 'Choose your language',
    subtitle: 'Select your preferred language to use FireSense Pro+',
    selectButton: 'Select',
    welcome: 'Welcome to FireSense Pro+',
    dashboard: 'Dashboard',
    sensitivity: 'Sensitivity',
    optimization: 'Optimization',
    active: 'Active',
    settings: 'Settings',
    status: 'System Status'
  },
  pt: {
    title: 'Escolha seu idioma',
    subtitle: 'Selecione seu idioma preferido para usar FireSense Pro+',
    selectButton: 'Selecionar',
    welcome: 'Bem-vindo ao FireSense Pro+',
    dashboard: 'Painel de Controle',
    sensitivity: 'Sensibilidade',
    optimization: 'Otimização',
    active: 'Ativo',
    settings: 'Configurações',
    status: 'Status do Sistema'
  },
  ar: {
    title: 'اختر لغتك',
    subtitle: 'اختر لغتك المفضلة لاستخدام FireSense Pro+',
    selectButton: 'يختار',
    welcome: 'مرحبًا بك في FireSense Pro+',
    dashboard: 'لوحة القيادة',
    sensitivity: 'حساسية',
    optimization: 'تحسين',
    active: 'نشيط',
    settings: 'إعدادات',
    status: 'حالة النظام'
  }
};
