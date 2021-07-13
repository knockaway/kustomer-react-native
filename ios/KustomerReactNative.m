#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(KustomerReactNative, NSObject)

+ (BOOL) requiresMainQueueSetup {
  return YES;
}

RCT_EXTERN_METHOD(_show:withOption(NSString *)option)

@end
