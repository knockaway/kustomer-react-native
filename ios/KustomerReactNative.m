#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(KustomerReactNative, NSObject)

+ (BOOL) requiresMainQueueSetup {
  return YES;
}

RCT_EXTERN_METHOD(_show:withOption(NSString *)option)
RCT_EXTERN_METHOD(isChatAvailable:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

@end
