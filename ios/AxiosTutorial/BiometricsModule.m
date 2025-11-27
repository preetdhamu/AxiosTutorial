#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(BiometricsModule, NSObject)

RCT_EXTERN_METHOD(
  unlock: (RCTPromiseResolveBlock)resolve
  rejecter: (RCTPromiseRejectBlock)reject
)

@end
