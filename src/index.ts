import { NativeModules } from 'react-native';
import type { KustomerDisplayMode, PromiseResult } from './types';

interface KustomerReactNativeType {
  /**
   * Opens Kustomer Chat UI
   *
   * @remarks
   * Both: 'onlyChat'| 'onlyKnowledgeBase'| 'default'
   *
   * iOS only: 'newChat' | 'activeChat' | 'chatHistory' | 'knowledgeBase' - https://developer.kustomer.com/chat-sdk/v2-iOS/docs/open-chat-ui
   *
   * Android only: 'chatAndKnowledgeBase' - https://developer.kustomer.com/chat-sdk/v2-Android/docs/open-chat-ui
   */
  show(option?: KustomerDisplayMode): void;
  /**
   * Checks if Chat is available
   *
   * @returns {PromiseResult<Boolean>} Array of 2 items [data, error] where the first index is the result and second index is any error coming from the native side
   */
  isChatAvailable(): Promise<PromiseResult<Boolean>>;
}

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
