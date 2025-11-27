package com.axiostutorial

import android.app.Activity
import androidx.fragment.app.FragmentActivity
import androidx.biometric.BiometricPrompt
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.*

class BiometricsModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "BiometricsModule"

    @ReactMethod
    fun unlock(promise: Promise) {

        val activity: Activity? = reactContext.currentActivity

        if (activity == null) {
            promise.resolve(makeResult(false, "NO_ACTIVITY"))
            // promise.resolve(false)
            return
        }

        // BiometricPrompt requires FragmentActivity
        val fragmentActivity = activity as? FragmentActivity
        if (fragmentActivity == null) {
            // promise.resolve(false)
            promise.resolve(makeResult(false, "NOT_FRAGMENT_ACTIVITY"))
            return
        }

        val executor = ContextCompat.getMainExecutor(activity)

        val promptInfo = BiometricPrompt.PromptInfo.Builder()
            .setTitle("Unlock App")
            .setSubtitle("Authenticate to continue")
            .setDeviceCredentialAllowed(true)  // Allow PIN/Pattern fallback
            .build()

        val biometricPrompt = BiometricPrompt(
            fragmentActivity,
            executor,
            object : BiometricPrompt.AuthenticationCallback() {

                override fun onAuthenticationSucceeded(
                    result: BiometricPrompt.AuthenticationResult
                ) {
                    promise.resolve(makeResult(true, "SUCCESS"))
                }

                override fun onAuthenticationError(
                    errorCode: Int,
                    errString: CharSequence
                ) {
                    promise.resolve(makeResult(false, "ERROR_$errorCode"))
                }

                override fun onAuthenticationFailed() {
                    promise.resolve(makeResult(false, "FAILED"))
                }
            }
        )

        biometricPrompt.authenticate(promptInfo)
    }

    private fun makeResult(success: Boolean, reason: String): WritableMap {
        val map = Arguments.createMap()
        map.putBoolean("success", success)
        map.putString("reason", reason)
        return map
    }
}
