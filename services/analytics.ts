
import { NativeBridge } from './NativeBridge';

/**
 * FireSense Pro+ - Unified Analytics Service
 * Canaliza todos los eventos de la UI hacia la capa nativa Kotlin
 */
export const Analytics = {
  init: () => {
    NativeBridge.logEvent('app_initialized');
  },

  logScreenView: (screenName: string) => {
    NativeBridge.logEvent('screen_view', { screen_name: screenName });
  },

  logAction: (action: string, category: string, label?: string) => {
    NativeBridge.logEvent('user_action', { action, category, label });
  },

  logSensitivityGenerated: (device: string, dpi: boolean) => {
    NativeBridge.logEvent('sensitivity_generated', { device, uses_dpi: dpi });
  },

  logError: (message: string, isFatal: boolean = false) => {
    NativeBridge.reportError(`[UI-ERROR][${isFatal ? 'FATAL' : 'NON-FATAL'}]: ${message}`);
  },

  requestInterstitial: () => {
    NativeBridge.showInterstitial();
  }
};

export default Analytics;
