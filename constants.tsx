
import { LanguageOption, Language, TranslationSet, NewsItem, Pet, HudItem, DeviceSensitivity } from './types';

export const RAFFLE_END_DATE = '15/03/2026';

// Generar una fecha de última actualización dentro de los últimos 60 días
const getRecentUpdateDate = () => {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * 45));
  return d.toISOString().split('T')[0];
};

export const PREDEFINED_SENSITIVITIES: DeviceSensitivity[] = [
  // APPLE (Valores hasta 200)
  { id: 'ap1', brand: 'Apple', model: 'iPhone 15 Pro Max', colorTag: '#FF1E1E', general: 198, redDot: 192, mira2x: 188, mira4x: 185, sniper: 150, cam360: 200, buttonSize: 45, dpi: null, lastUpdated: getRecentUpdateDate() },
  { id: 'ap2', brand: 'Apple', model: 'iPhone 14', colorTag: '#FF1E1E', general: 195, redDot: 190, mira2x: 185, mira4x: 180, sniper: 145, cam360: 195, buttonSize: 48, dpi: null, lastUpdated: getRecentUpdateDate() },
  { id: 'sa1', brand: 'Samsung', model: 'Galaxy S24 Ultra', colorTag: '#FF1E1E', general: 196, redDot: 185, mira2x: 180, mira4x: 175, sniper: 142, cam360: 195, buttonSize: 44, dpi: 600, lastUpdated: getRecentUpdateDate() },
  { id: 'sa2', brand: 'Samsung', model: 'Galaxy A54 5G', colorTag: '#FF1E1E', general: 192, redDot: 182, mira2x: 178, mira4x: 170, sniper: 138, cam360: 185, buttonSize: 50, dpi: 450, lastUpdated: getRecentUpdateDate() },
  { id: 'xi1', brand: 'Xiaomi', model: 'Poco X6 Pro', colorTag: '#FF1E1E', general: 194, redDot: 188, mira2x: 182, mira4x: 178, sniper: 140, cam360: 192, buttonSize: 47, dpi: 550, lastUpdated: getRecentUpdateDate() },
  // MODELOS CLÁSICOS (Valores hasta 200)
  { id: 'ex1', brand: '360', model: '360 F4s', colorTag: '#1E3A8A', general: 200, redDot: 195, mira2x: 190, mira4x: 185, sniper: 150, cam360: 200, buttonSize: 60, dpi: null, lastUpdated: getRecentUpdateDate() },
  { id: 'ex2', brand: '360', model: '360 N6', colorTag: '#166534', general: 198, redDot: 192, mira2x: 188, mira4x: 182, sniper: 148, cam360: 195, buttonSize: 58, dpi: null, lastUpdated: getRecentUpdateDate() },
  { id: 'ex6', brand: 'Acer', model: 'Acer Liquid Jade Z', colorTag: '#DC2626', general: 200, redDot: 200, mira2x: 195, mira4x: 190, sniper: 160, cam360: 200, buttonSize: 65, dpi: null, lastUpdated: getRecentUpdateDate() },
  { id: 'ex7', brand: 'Acer', model: 'Acer Liquid M220', colorTag: '#7C3AED', general: 200, redDot: 200, mira2x: 200, mira4x: 200, sniper: 170, cam360: 200, buttonSize: 70, dpi: null, lastUpdated: getRecentUpdateDate() },
];

export const HUD_DATA: HudItem[] = [
  { id: 'h1', fingers: 2, title: 'Custom hud 2 dedos', thumbnailUrl: 'https://i.postimg.cc/Twzq0mpN/Captura-desde-2026-01-16-12-23-20.png', videoUrl: 'https://youtu.be/wyj7-gGrDLU?si=c_gQJaVgYFXyKqN4' },
  { id: 'h2', fingers: 2, title: 'Custom hud 2 dedos', thumbnailUrl: 'https://i.postimg.cc/mgKDtSq0/Captura-desde-2026-01-16-12-26-55.png', videoUrl: 'https://youtu.be/3UBMDVixKOk?si=3ypKaUBAs06IRpHf' },
];

export const PETS: Pet[] = [
  { id: '1', name: 'Kactus', imageUrl: 'https://static.wikia.nocookie.net/freefire/images/5/5e/Kactus.png', abilityName: 'Autosuficiente', description: 'Kactus es un cactus animado con una personalidad tranquila y adaptable.', abilityEffect: 'Permite regenerar puntos de energía de forma gradual mientras el jugador permanece inmóvil.' },
];

export const LANGUAGES: LanguageOption[] = [
  { id: 'es', name: 'Español', flag: '🇪🇸' },
  { id: 'en', name: 'English', flag: '🇺🇸' },
  { id: 'pt', name: 'Português', flag: '🇧🇷' },
  { id: 'ar', name: 'Áرabe', flag: '🇦🇪' }
];

export const TRANSLATIONS: Record<Language, TranslationSet> = {
  es: {
    title: 'Elige tu idioma', subtitle: 'Selecciona tu idioma preferido para usar FireSense Pro+', selectButton: 'Seleccionar', noticias: 'Noticias', categorias: 'Categorías', sensibilidades: 'Sensibilidades', verTodas: 'Ver todas', inicio: 'Inicio', favoritos: 'Favoritos', ajustes: 'Ajustes', catSensibilidad: 'SENSIBILIDAD', catArmas: 'ARMAS', catHabilidades: 'HABILIDADES', catGenerador: 'GENERADOR', catHud: 'HUD', catMascota: 'MASCOTA', catPersonajes: 'PERSONAJES', catSorteos: 'SORTEOS', back: 'Volver', hace: 'Hace', dias: 'días', hoy: 'Hoy mismo', sensMenuDefault: 'SENSIBILIDADES', sensMenuDefaultDesc: 'Lista de sensibilidades predeterminada.', sensMenuPremium: 'PREMIUM', sensMenuPremiumDesc: 'Lista de sensibilidades PREMIUM.', sensMenuPlayers: 'SENSIBILIDADES DE JUGADORES', sensMenuPlayersDesc: 'Comparte tu sensibilidad con otros jugadores aquí.', searchPlaceholder: 'Buscar sensibilidad...', requestButton: 'Solicitar', nextUpdateInfo: 'Las sensibilidades se actualizan cada 2 meses automáticamente.', communityTitle: 'COMUNIDAD',
    requestTitle: 'Solicitar Configuración', requestSubtitle: '¿No encuentras tu sensibilidad? Solicítala o actualízala aquí.', requestBrandLabel: 'Marca', requestModelLabel: 'Modelo', requestInfo: 'Si tu dispositivo no está en la lista, por favor coméntanos la marca y modelo exacto (por ejemplo, Samsung Galaxy S21). Esto nos ayudará a añadirlo rápidamente.', requestComment: 'Comentar', requestUpdateOpt: 'Actualizar la sensibilidad', requestPublishOpt: 'Publicar la sensibilidad', requestSubmit: 'Solicitar',
    premiumTitle: 'EMPIEZA COMO UN PROFESIONAL', premiumSubtitle: 'Desbloquea todas las funciones', premiumLabel: 'PREMIUM', basicLabel: 'BÁSICO', featDarkMode: 'Modo Oscuro', featBasicSens: 'Sensibilidad Básica', featInsaneSens: 'Sensibilidad Insana', featUnlimitedGen: 'Generador Ilimitado', featExclusiveSkills: 'Habilidades Exclusivas', featNoAds: 'Sin anuncios', premiumPrice: 'Suscríbete por solo US$ 2,99 /Mensual', premiumBuy: 'COMPRA AHORA', premiumDisclaimer: 'La suscripción se renovará automáticamente. Puedes cancelar en cualquier momento.', raffleRulesTitle: 'Reglas del sorteo', raffleRulesDesc: 'Si deseas participar en los sorteos y ser uno de los ganadores, debes seguir los siguientes pasos.', raffleStep1: 'Debes tener un Ticket', raffleStep2: 'Ingresa tu ID del juego', raffleStep3: 'Síguenos en YouTube', raffleTicketLabel: 'Ticket: 0', raffleWatchAd: 'Ver anuncio x1 ticket', raffleYoutubeDesc: '¡Asegúrate de suscribirte a nuestro canal de YouTube para aumentar tus posibilidades de ganar en el sorteo!', raffleSubscribe: 'Suscríbete', raffleIdPlaceholder: 'Ingrese su ID', raffleParticipate: 'Participar', raffleEnds: 'Finaliza:', noFavoritesTitle: 'Aún no tienes favoritos', noFavoritesDesc: 'Agrega tus sensibilidades favoritas aquí para acceder a ellas rápidamente.', genUsingDpi: 'Configuración con {dpi} de DPI', genNoDpi: 'Configuración Sin DPI', genScreen: 'Pantalla: {res}', genGeneral: 'General', genRedDot: 'Mira de Punto Rojo', gen2x: 'Mira 2x', gen4x: 'Mira 4x', genSniper: 'Mira Francotirador', gen360: 'Cámara 360°', genButton: 'Botón', genDpi: 'DPI', genCoins: 'Monedas', genRegenerate: 'RE-GENERAR', genSave: 'GUARDAR', saveModalTitle: 'Guardar Configuración', saveModalPlaceholder: 'Nombre de tu config...'
  },
  en: {
    title: 'Choose language', subtitle: 'Select preferred language', selectButton: 'Select', noticias: 'News', categorias: 'Categories', sensibilidades: 'Sensitivities', verTodas: 'See all', inicio: 'Home', favoritos: 'Favorites', ajustes: 'Settings', catSensibilidad: 'SENSITIVITY', catArmas: 'WEAPONS', catHabilidades: 'SKILLS', catGenerador: 'GENERATOR', catHud: 'HUD', catMascota: 'PET', catPersonajes: 'CHARACTERS', catSorteos: 'RAFFLES', back: 'Back', hace: '', dias: 'days ago', hoy: 'Today', sensMenuDefault: 'SENSITIVITIES', sensMenuDefaultDesc: 'Default sensitivities.', sensMenuPremium: 'PREMIUM', sensMenuPremiumDesc: 'PREMIUM sensitivities.', sensMenuPlayers: 'COMMUNITY', sensMenuPlayersDesc: 'Share with others.', searchPlaceholder: 'Search...', requestButton: 'Request', nextUpdateInfo: 'Sensitivities update every 2 months.', communityTitle: 'COMMUNITY',
    requestTitle: 'Request Config', requestSubtitle: 'Request or update here.', requestBrandLabel: 'Brand', requestModelLabel: 'Model', requestInfo: 'Tell us the exact model.', requestComment: 'Comment', requestUpdateOpt: 'Update config', requestPublishOpt: 'Publish config', requestSubmit: 'Request',
    premiumTitle: 'START LIKE A PRO', premiumSubtitle: 'Unlock all features', premiumLabel: 'PREMIUM', basicLabel: 'BASIC', featDarkMode: 'Dark Mode', featBasicSens: 'Basic Sens', featInsaneSens: 'Insane Sens', featUnlimitedGen: 'Unlimited Gen', featExclusiveSkills: 'Skills', featNoAds: 'No Ads', premiumPrice: 'Only US$ 2.99 /Month', premiumBuy: 'BUY NOW', premiumDisclaimer: 'Auto-renews.', raffleRulesTitle: 'Raffle Rules', raffleRulesDesc: 'Follow these steps.', raffleStep1: 'Need Ticket', raffleStep2: 'Enter ID', raffleStep3: 'Subscribe', raffleTicketLabel: 'Ticket: 0', raffleWatchAd: 'Watch ad', raffleYoutubeDesc: 'Subscribe to win!', raffleSubscribe: 'Subscribe', raffleIdPlaceholder: 'Enter ID', raffleParticipate: 'Participate', raffleEnds: 'Ends:', noFavoritesTitle: 'No favorites', noFavoritesDesc: 'Add your favorites.', genUsingDpi: 'Config with {dpi} DPI', genNoDpi: 'No DPI Config', genScreen: 'Screen: {res}', genGeneral: 'General', genRedDot: 'Red Dot', gen2x: '2x', gen4x: '4x', genSniper: 'Sniper', gen360: '360°', genButton: 'Button', genDpi: 'DPI', genCoins: 'Coins', genRegenerate: 'REGENERATE', genSave: 'SAVE', saveModalTitle: 'Save Config', saveModalPlaceholder: 'Name it...'
  },
  pt: {
    title: 'Escolha o idioma', subtitle: 'Selecione o idioma', selectButton: 'Selecionar', noticias: 'Notícias', categorias: 'Categorias', sensibilidades: 'Sensibilidades', verTodas: 'Ver todas', inicio: 'Início', favoritos: 'Favoritos', ajustes: 'Ajustes', catSensibilidad: 'SENSIBILIDADE', catArmas: 'ARMAS', catHabilidades: 'HABILIDADES', catGenerador: 'GERADOR', catHud: 'HUD', catMascota: 'PET', catPersonajes: 'PERSONAGENS', catSorteos: 'SORTEIOS', back: 'Voltar', hace: 'Há', dias: 'dias', hoy: 'Hoje', sensMenuDefault: 'SENSIBILIDADES', sensMenuDefaultDesc: 'Lista padrão.', sensMenuPremium: 'PREMIUM', sensMenuPremiumDesc: 'Lista PREMIUM.', sensMenuPlayers: 'COMUNIDADE', sensMenuPlayersDesc: 'Compartilhe.', searchPlaceholder: 'Buscar...', requestButton: 'Solicitar', nextUpdateInfo: 'Atualizado a cada 2 meses.', communityTitle: 'COMUNIDADE',
    requestTitle: 'Solicitar Config', requestSubtitle: 'Solicite aquí.', requestBrandLabel: 'Marca', requestModelLabel: 'Modelo', requestInfo: 'Diga o modelo exato.', requestComment: 'Comentar', requestUpdateOpt: 'Atualizar', requestPublishOpt: 'Publicar', requestSubmit: 'Solicitar',
    premiumTitle: 'COMECE PRO', premiumSubtitle: 'Desbloqueie tudo', premiumLabel: 'PREMIUM', basicLabel: 'BÁSICO', featDarkMode: 'Modo Oscuro', featBasicSens: 'Sens Básica', featInsaneSens: 'Sens Insana', featUnlimitedGen: 'Gerador Ilimitado', featExclusiveSkills: 'Habilidades', featNoAds: 'Sem Ads', premiumPrice: 'US$ 2,99 /Mês', premiumBuy: 'COMPRE JÁ', premiumDisclaimer: 'Renovação auto.', raffleRulesTitle: 'Regras', raffleRulesDesc: 'Passos.', raffleStep1: 'Ticket', raffleStep2: 'ID Jogo', raffleStep3: 'YouTube', raffleTicketLabel: 'Ticket: 0', raffleWatchAd: 'Ver anúncio', raffleYoutubeDesc: 'Inscreva-se!', raffleSubscribe: 'Inscrever-se', raffleIdPlaceholder: 'ID', raffleParticipate: 'Participar', raffleEnds: 'Termina:', noFavoritesTitle: 'Sem favoritos', noFavoritesDesc: 'Adicione.', genUsingDpi: 'DPI {dpi}', genNoDpi: 'Sem DPI', genScreen: 'Tela: {res}', genGeneral: 'Geral', genRedDot: 'Red Dot', gen2x: '2x', gen4x: '4x', genSniper: 'Sniper', gen360: '360°', genButton: 'Botão', genDpi: 'DPI', genCoins: 'Coins', genRegenerate: 'GERAR', genSave: 'SALVAR', saveModalTitle: 'Salvar', saveModalPlaceholder: 'Nome...'
  },
  ar: {
    title: 'اختر اللغة', subtitle: 'اختر لغتك', selectButton: 'اختيار', noticias: 'أخبار', categorias: 'فئات', sensibilidades: 'الحساسية', verTodas: 'عرض الكل', inicio: 'البداية', favoritos: 'المفضلة', ajustes: 'إعدادات', catSensibilidad: 'حساسية', catArmas: 'أسلحة', catHabilidades: 'مهارات', catGenerador: 'مولد', catHud: 'HUD', catMascota: 'حيوان', catPersonajes: 'شخصيات', catSorteos: 'سحوبات', back: 'عودة', hace: 'قبل', dias: 'أيام', hoy: 'اليوم', sensMenuDefault: 'الحساسيات', sensMenuDefaultDesc: 'القائمة الافتراضية', sensMenuPremium: 'بريميوم', sensMenuPremiumDesc: 'قائمة التميز', sensMenuPlayers: 'المجتمع', sensMenuPlayersDesc: 'شارك مع الآخرين', searchPlaceholder: 'بحث...', requestButton: 'طلب', nextUpdateInfo: 'يتم التحديث كل شهرين.', communityTitle: 'المجتمع',
    requestTitle: 'طلب إعداد', requestSubtitle: 'اطلب هنا.', requestBrandLabel: 'ماركة', requestModelLabel: 'موديل', requestInfo: 'أخبرنا بالموديل الدقيق.', requestComment: 'تعليق', requestUpdateOpt: 'تحديث', requestPublishOpt: 'نشر', requestSubmit: 'طلب',
    premiumTitle: 'ابدأ كالمحترفين', premiumSubtitle: 'افتح المزايا', premiumLabel: 'مميز', basicLabel: 'أساسي', featDarkMode: 'داكن', featBasicSens: 'أساسي', featInsaneSens: 'جنوني', featUnlimitedGen: 'غير محدود', featExclusiveSkills: 'مهارات', featNoAds: 'بدون إعلانات', premiumPrice: '2.99 دولار', premiumBuy: 'اشتر الآن', premiumDisclaimer: 'تجديد تلقائي', raffleRulesTitle: 'قواعد', raffleRulesDesc: 'اتبع الخطوات.', raffleStep1: 'تذكرة', raffleStep2: 'المعرف', raffleStep3: 'يوتيوب', raffleTicketLabel: 'تذكرة: 0', raffleWatchAd: 'شاهد إعلان', raffleYoutubeDesc: 'اشترك!', raffleSubscribe: 'اشتراك', raffleIdPlaceholder: 'المعرف', raffleParticipate: 'مشاركة', raffleEnds: 'ينتهي:', noFavoritesTitle: 'لا يوجد مفضلات', noFavoritesDesc: 'أضف مفضلاتك.', genUsingDpi: 'DPI {dpi}', genNoDpi: 'بدون DPI', genScreen: 'الشاشة: {res}', genGeneral: 'عام', genRedDot: 'نقطة حمراء', gen2x: '2x', gen4x: '4x', genSniper: 'قناص', gen360: '360°', genButton: 'زر', genDpi: 'DPI', genCoins: 'عملات', genRegenerate: 'إعادة', genSave: 'حفظ', saveModalTitle: 'حفظ', saveModalPlaceholder: 'الاسم...'
  }
};

/**
 * FireSense Pro+ - Localized News Data
 * Centralized repository for news items in multiple languages.
 */
export const NEWS_DATA: Record<Language, NewsItem[]> = {
  es: [
    { id: '1', title: 'Nueva Actualización 2026', excerpt: 'Descubre las nuevas funciones de optimización.', content: ['Hemos trabajado duro para traerte la mejor experiencia.', 'Ahora FireSense Pro+ es más rápido que nunca.'], publishDate: new Date().toISOString(), imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=500' },
    { id: '2', title: 'Evento San Valentín', excerpt: 'Nuevas skins exclusivas disponibles.', content: ['No te pierdas el evento especial de febrero.'], publishDate: new Date().toISOString(), imageUrl: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=500' },
  ],
  en: [
    { id: '1', title: 'New Update 2026', excerpt: 'Discover the new optimization features.', content: ['We have worked hard to bring you the best experience.', 'Now FireSense Pro+ is faster than ever.'], publishDate: new Date().toISOString(), imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=500' },
    { id: '2', title: 'Valentine\'s Event', excerpt: 'New exclusive skins available.', content: ['Don\'t miss the special February event.'], publishDate: new Date().toISOString(), imageUrl: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=500' },
  ],
  pt: [
    { id: '1', title: 'Nova Atualização 2026', excerpt: 'Descubra os novos recursos de otimização.', content: ['Trabalhamos muito para trazer a você a melhor experiência.', 'Agora o FireSense Pro+ está mais rápido do que nunca.'], publishDate: new Date().toISOString(), imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=500' },
  ],
  ar: [
    { id: '1', title: 'تحديث جديد 2026', excerpt: 'اكتشف ميزات التحسين الجديدة.', content: ['لقد عملنا بجد لنقدم لك أفضل تجربة.'], publishDate: new Date().toISOString(), imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=500' },
  ]
};

/**
 * Returns news items for the specified language.
 * Falls back to Spanish if the language is not found.
 */
export const getNewsByLanguage = (lang: Language): NewsItem[] => {
  return NEWS_DATA[lang] || NEWS_DATA['es'];
};
