#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(KustomerReactNative, RCTEventEmitter)

+ (BOOL) requiresMainQueueSetup {
  return YES;
}

RCT_EXTERN_METHOD(_show:withOption(NSString *)option)
RCT_EXTERN_METHOD(isChatAvailable:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getUnreadCount:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(requestAuthorizationForPush)

@end
