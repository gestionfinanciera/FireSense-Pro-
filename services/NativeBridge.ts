
/**
 * FireSense Pro+ - Native Bridge
 * Interfaz de comunicación entre el WebView (JS) y la App Nativa (Kotlin)
 */

declare global {
  interface Window {
    AndroidBridge?: {
      logFirebaseEvent: (name: string, params: string) => void;
      logCrashlyticsError: (message: string) => void;
      showAdMobBanner: (show: boolean) => void;
      showInterstitial: () => void;
    };
  }
}

export const NativeBridge = {
  // Enviar evento a Firebase Analytics
  logEvent: (name: string, params: object = {}) => {
    if (window.AndroidBridge) {
      window.AndroidBridge.logFirebaseEvent(name, JSON.stringify(params));
    } else {
      console.log(`[Web-Sim] Firebase Event: ${name}`, params);
    }
  },

  // Enviar error a Firebase Crashlytics
  reportError: (message: string) => {
    if (window.AndroidBridge) {
      window.AndroidBridge.logCrashlyticsError(message);
    } else {
      console.error(`[Web-Sim] Crashlytics Error: ${message}`);
    }
  },

  // Control de Anuncios AdMob
  showInterstitial: () => {
    if (window.AndroidBridge) {
      window.AndroidBridge.showInterstitial();
    } else {
      console.log("[Web-Sim] AdMob Interstitial Requested");
    }
  }
};
