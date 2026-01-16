
export type Language = 'es' | 'en' | 'pt' | 'ar';

export interface SensitivitySet {
  general: number;
  redDot: number;
  mira2x: number;
  mira4x: number;
  sniper: number;
  cam360: number;
  buttonSize: number;
  dpi: number | null;
}

export interface DeviceSensitivity extends SensitivitySet {
  id: string;
  brand: string;
  model: string;
  colorTag: string;
  lastUpdated?: string;
  isCommunity?: boolean;
}

export interface SavedConfig extends SensitivitySet {
  id: string;
  name: string;
  device: string;
  date: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  publishDate: string;
  imageUrl: string;
}

export interface Pet {
  id: string;
  name: string;
  imageUrl: string;
  abilityName: string;
  description: string;
  abilityEffect: string;
}

export interface HudItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  fingers: number;
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
  searchPlaceholder: string;
  requestButton: string;
  nextUpdateInfo: string;
  communityTitle: string;
  // Request Config Screen
  requestTitle: string;
  requestSubtitle: string;
  requestBrandLabel: string;
  requestModelLabel: string;
  requestInfo: string;
  requestComment: string;
  requestUpdateOpt: string;
  requestPublishOpt: string;
  requestSubmit: string;
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
  // Raffle Screen
  raffleRulesTitle: string;
  raffleRulesDesc: string;
  raffleStep1: string;
  raffleStep2: string;
  raffleStep3: string;
  raffleTicketLabel: string;
  raffleWatchAd: string;
  raffleYoutubeDesc: string;
  raffleSubscribe: string;
  raffleIdPlaceholder: string;
  raffleParticipate: string;
  raffleEnds: string;
  // Favorites Screen
  noFavoritesTitle: string;
  noFavoritesDesc: string;
  // Generator Screen
  genUsingDpi: string;
  genNoDpi: string;
  genScreen: string;
  genGeneral: string;
  genRedDot: string;
  gen2x: string;
  gen4x: string;
  genSniper: string;
  gen360: string;
  genButton: string;
  genDpi: string;
  genCoins: string;
  genRegenerate: string;
  genSave: string;
  saveModalTitle: string;
  saveModalPlaceholder: string;
}

export interface LanguageOption {
  id: Language;
  name: string;
  flag: string;
}
