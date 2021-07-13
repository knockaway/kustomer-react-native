//
//  KustomerConfig.swift
//  KustomerReactNativeExample
//
//  Created by Daniel Yo on 7/12/21.
//

import Foundation
import KustomerChat
import UIKit

/**
 Setup initial config on app launch
 reference: https://developer.kustomer.com/chat-sdk/v2-iOS/docs/use-the-sdk-with-objective-c#translation-layer-implementation
 */
@objc public class KustomerConfig: NSObject {

  @objc class func configure(withLaunchOptions launchOptions:NSDictionary) {
    
    // customize your Options here
    // reference for Kustomer Options - https://developer.kustomer.com/chat-sdk/v2-iOS/docs/configuration#kustomeroptions-class-reference
    let options = KustomerOptions()
    options.language = .fr
    options.businessScheduleId = "1234"
    options.hideNewConversationButtonInClosedChat = true

    let apiKey = "<api key>"
    
    _ = Kustomer.configure(apiKey: apiKey, options: options, launchOptions: launchOptions as? [UIApplication.LaunchOptionsKey : Any])
  }
}
