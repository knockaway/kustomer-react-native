import { NativeModules } from 'react-native';

declare type KustomerDisplayModeiOS =
  | 'newChat'
  | 'activeChat'
  | 'chatHistory'
  | 'knowledgeBase';

declare type KustomerDisplayModeAndroid = 'chatAndKnowledgeBase';

export declare type KustomerDisplayMode =
  | KustomerDisplayModeiOS
  | KustomerDisplayModeAndroid
  | 'onlyChat'
  | 'onlyKnowledgeBase'
  | 'default';

type KustomerReactNativeType = {
  /**
   * Both: 'onlyChat'| 'onlyKnowledgeBase'| 'default'
   *
   * iOS only: 'newChat' | 'activeChat' | 'chatHistory' | 'knowledgeBase' - https://developer.kustomer.com/chat-sdk/v2-iOS/docs/open-chat-ui
   *
   * Android only: 'chatKB' - https://developer.kustomer.com/chat-sdk/v2-Android/docs/open-chat-ui
   */
  show(option?: KustomerDisplayMode): void;
};

const { KustomerReactNative } = NativeModules;

/**
 * NativeModule '_show' is being remapped to 'show' to allow empty param
 * The Native code mapping doesn't allow optional params so we weren't able to do KustomerReactNative.show() prior to this
 */
KustomerReactNative.show = (option?: KustomerDisplayMode) => {
  if (!option) {
    return KustomerReactNative._show('default');
  }
  return KustomerReactNative._show(option);
};
export default KustomerReactNative as KustomerReactNativeType;
