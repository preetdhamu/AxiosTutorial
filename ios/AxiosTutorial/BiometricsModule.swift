import Foundation
import LocalAuthentication
import React

@objc(BiometricsModule)
class BiometricsModule: NSObject {

  @objc
  func unlock(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let context = LAContext()
    var error: NSError?



    if context.canEvaluatePolicy(.deviceOwnerAuthentication, error: &error) {

      let reason = "Unlock using Biometrics"

      context.evaluatePolicy(.deviceOwnerAuthentication,
                             localizedReason: reason) { success, authError in

        DispatchQueue.main.async {
          if success {
            resolve(["success": true, "reason": "SUCCESS"])
          } else {
            resolve(["success": false, "reason": "FAILED"])
          }
        }
      }

    } else {
      resolve(["success": false, "reason": "NOT_AVAILABLE"])
      return
    }
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
