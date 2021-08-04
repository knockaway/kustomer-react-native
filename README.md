# kustomer-react-native

react-native wrapper for the native Kustomer SDKs V2

## Example App

- run `npm run bootstrap`
- Navigate to the `/example` folder
- **For iOS:**
  - Modify `KustomerConfig.swift` and replace add in your Kustomer API key in place of `<api key>`
- run `npm run ios` or `npm run android`

## Requirements

- React-Native 0.60+ for Autolinking
- iOS: Minimum build target version of iOS 11
- Xcode: Xcode 12

## Installation

```sh
npm install @knockaway/kustomer-react-native
```

OR
Add the following to your `package.json` dependencies

```json
"kustomer-react-native": "git+https://github.com/knockaway/kustomer-react-native.git#master",
```

### Android Setup

#### Gradle Setup

- Refer to [Kustomer's setup for gradle](https://developer.kustomer.com/chat-sdk/v2-Android/docs/installation#install-with-gradle)

#### Initializing the SDK

- Refer to [Kustomer's instructions on how to initialize the SDK](https://developer.kustomer.com/chat-sdk/v2-Android/docs/installation#initialize-the-chat-android-sdk). Add this initilization code to your `onCreate` method inside the `MainApplication` file.

```java
    @Override
    public void onCreate() {
      super.onCreate();
      Kustomer.Companion.init(this, KUSTOMER_API_SDK_KEY, null, result -> {
          Log.i(getClass().getSimpleName(),"Kustomer is initialized: " + result.getDataOrNull());
          return Unit.INSTANCE;
      });
    }
```

_NOTE: Kustomer's V2 SDK is written in Kotlin._
<br />
<br />
<br />

### iOS Setup

#### Cocoapods

You can optionally add the following to your `Podfile` with a specific version 2.x.x:
`pod 'Kustomer', :git => 'https://github.com/kustomer/kustomer-ios.git', :tag => '2.4.3'`

Otherwise it will default to install SDK version `2.4.3`

#### Objective-C

- Your react-native project is most likely in `Objective-C` in which case we will need to setup a translation layer from Swift to Objective-C for initializing the SDK
- Create the following swift file inside your iOS xcode project

```swift
//  KustomerConfig.swift

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
    // add options if you need it
    options.language = .fr
    options.businessScheduleId = "1234"
    options.hideNewConversationButtonInClosedChat = true

    let apiKey = "<your api key here>"

    _ = Kustomer.configure(apiKey: apiKey, options: options, launchOptions: launchOptions as? [UIApplication.LaunchOptionsKey : Any])
  }
}
```

- You can then call this `configure` method inside `AppDelegate.m`

```objective-c
#import "YourAppName-Swift.h"

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // ... other stuff

  [KustomerConfig configureWithLaunchOptions:launchOptions];
  return YES;
}
```

### Swift

- If your react-native project is somehow in `Swift`, you can follow the [Kustomer guide](https://developer.kustomer.com/chat-sdk/v2-iOS/docs/configuration#kustomeroptions-class-reference) for initializing the SDK

# Usage

```js
import KustomerReactNative from '@knockaway/kustomer-react-native';

// open the Kustomer default chat
KustomerReactNative.show();
```

## Methods
### show()
`KustomerReactNative.show()`
<br />
Opens Kustomer Chat UI

**Parameters:**

| Name     | Type     | Required | Description                                                 |
| -------- | -------- | -------- | ----------------------------------------------------------- |
| option   | String   | No       | See below                                                   |

Possible option string:
* `default` (default)
* `onlyChat`
* `onlyKnowledgeBase`

#### iOS Only
* `newChat` 
* `activeChat` 
* `chatHistory` 
* `knowledgeBase`

#### Android only
* `chatAndKnowledgeBase`

### isChatAvailable()
`KustomerReactNative.isChatAvailable()`
<br />
Checks if Chat is available.
**Returns:**
Returns an array with `success` and `error` item: `[Boolean, String | Object]`

**Example:**
```JS
const [isAvailable, error] = await KustomerReactNative.isChatAvailable();
if (error) {
  // do something with error
} else {
  console.log({isAvailable})
}
```

### getUnreadCount()
`KustomerReactNative.getUnreadCount(callback)`
<br />
get the most recent count of unread messages from the Kustomer servers as an Int.

**Parameters:**

| Name     | Type     | Required | Description                                                 |
| -------- | -------- | -------- | ----------------------------------------------------------- |
| callback | function | Yes      | Function which receive a Number                             |

**Example:**
```JS
KustomerReactNative.getUnreadCount((count) => {
  console.log({count})
});
```

### addEventListener()
`KustomerReactNative.addEventListener(type, handler)`
<br />
Attaches a listener to certain native Kustomer events

**Parameters:**

| Name     | Type     | Required | Description                                                 |
| -------- | -------- | -------- | ----------------------------------------------------------- |
| type     | string   | Yes      | See below                                                   |
| handler  | function | Yes      | See below                                                   |

Supported values: 
* type: `onUnreadCountChange`
  * handler: Function which receive a Number

**Example:**
```js
const listener = KustomerReactNative.addEventListener('onUnreadCountChange', (count) => {
  console.log({count})
});
```
**IMPORTANT:**
call `.remove()` on the listener object on cleanup to prevent memory leaks.

`listener.remove()`

**Example:**
```JS
const listener = KustomerReactNative.addEventListener('onUnreadCountChange', (count) => {
  console.log({count})
});

// remove the listener
listener.remove()
```

## Push Notification
### iOS
* Update your `KustomerConfig.swift` file with the following
```swift
@objc func didRegisterForRemoteNotifications(deviceToken: Data) {
  Kustomer.didRegisterForRemoteNotifications(deviceToken: deviceToken)
}
  
@objc func didFailToRegisterForRemoteNotifications(error: Error) {
  Kustomer.didFailToRegisterForRemoteNotifications(error: error)
}
```
- Following the guide [here](https://developer.kustomer.com/chat-sdk/v2-iOS/docs/push-notifications)
 

### Android
## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
