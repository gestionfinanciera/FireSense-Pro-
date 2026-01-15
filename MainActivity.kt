
package com.firesense.pro

import android.os.Bundle
import android.util.Log
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.analytics.FirebaseAnalytics
import com.google.firebase.crashlytics.FirebaseCrashlytics
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.LoadAdError
import com.google.android.gms.ads.MobileAds
import com.google.android.gms.ads.interstitial.InterstitialAd
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback
import org.json.JSONObject

/**
 * FireSense Pro+ - MainActivity (Kotlin Professional Edition)
 * Puente nativo para Google Play Services, Firebase y AdMob
 */
class MainActivity : AppCompatActivity() {

    private lateinit var firebaseAnalytics: FirebaseAnalytics
    private var mInterstitialAd: InterstitialAd? = null
    private val TAG = "FireSenseNative"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        try {
            // 1. Inicializar SDKs de Google
            MobileAds.initialize(this) {}
            firebaseAnalytics = FirebaseAnalytics.getInstance(this)
            
            // 2. Reportar arranque de la App a Crashlytics
            FirebaseCrashlytics.getInstance().setCustomKey("app_version", "1.0.0")
            FirebaseCrashlytics.getInstance().log("App Principal Iniciada")

            // 3. Configurar WebView con interfaz profesional
            val myWebView: WebView = findViewById(R.id.webview)
            myWebView.settings.apply {
                javaScriptEnabled = true
                domStorageEnabled = true
                databaseEnabled = true
                loadWithOverviewMode = true
                useWideViewPort = true
            }
            
            // Inyectar el puente para JS
            myWebView.addJavascriptInterface(AndroidBridge(), "AndroidBridge")
            
            myWebView.webViewClient = object : WebViewClient() {
                override fun onPageFinished(view: WebView?, url: String?) {
                    super.onPageFinished(view, url)
                    Log.d(TAG, "Carga terminada: $url")
                }
            }
            
            // Cambiar por la URL real de despliegue
            myWebView.loadUrl("https://tu-app-firesense.web.app") 
            
            // 4. Precargar anuncios AdMob
            loadInterstitialAd()

        } catch (e: Exception) {
            FirebaseCrashlytics.getInstance().recordException(e)
            Log.e(TAG, "Error fatal en inicio nativo", e)
        }
    }

    /**
     * Puente Seguro para Javascript
     */
    inner class AndroidBridge {

        @JavascriptInterface
        fun logFirebaseEvent(name: String, paramsJson: String) {
            try {
                val bundle = Bundle()
                val json = JSONObject(paramsJson)
                val keys = json.keys()
                while (keys.hasNext()) {
                    val key = keys.next()
                    bundle.putString(key, json.getString(key))
                }
                firebaseAnalytics.logEvent(name, bundle)
                Log.d(TAG, "Firebase Event Logged: $name")
            } catch (e: Exception) {
                FirebaseCrashlytics.getInstance().recordException(e)
            }
        }

        @JavascriptInterface
        fun logCrashlyticsError(message: String) {
            FirebaseCrashlytics.getInstance().recordException(Exception(message))
            Log.w(TAG, "Error reportado desde JS: $message")
        }

        @JavascriptInterface
        fun showInterstitial() {
            runOnUiThread {
                if (mInterstitialAd != null) {
                    mInterstitialAd?.show(this@MainActivity)
                    loadInterstitialAd() // Recargar tras mostrar
                } else {
                    Log.d(TAG, "El anuncio aún no está listo")
                    loadInterstitialAd()
                }
            }
        }
    }

    private fun loadInterstitialAd() {
        // ID de prueba de Google: ca-app-pub-3940256099942544/1033173712
        val adRequest = AdRequest.Builder().build()
        InterstitialAd.load(this, "ca-app-pub-3940256099942544/1033173712", adRequest, 
            object : InterstitialAdLoadCallback() {
                override fun onAdFailedToLoad(adError: LoadAdError) {
                    Log.d(TAG, "AdMob Failed: ${adError.message}")
                    mInterstitialAd = null
                }
                override fun onAdLoaded(interstitialAd: InterstitialAd) {
                    Log.d(TAG, "AdMob Loaded Success")
                    mInterstitialAd = interstitialAd
                }
            })
    }

    override fun onBackPressed() {
        val myWebView: WebView = findViewById(R.id.webview)
        if (myWebView.canGoBack()) {
            myWebView.goBack()
        } else {
            super.onBackPressed()
        }
    }
}
