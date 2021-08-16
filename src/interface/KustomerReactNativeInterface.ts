import type { EmitterSubscription } from 'react-native';
import type {
  KustomerDisplayMode,
  PromiseResult,
  KustomerChatListenerTypes,
  ChatListenerCallback,
} from '../types';

export interface KustomerReactNativeInterface {
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

  /**
   * get the most recent count of unread messages from the Kustomer servers as an Int.
   */
  getUnreadCount(callback: Function): void;

  /**
   * Attaches a listener to native Kustomer events
   * iOS ref: https://developer.kustomer.com/chat-sdk/v2-iOS/docs/api-protocols-kuschatlistener
   *
   * IMPORTANT: Be sure to remove subscription on cleanup
   * @example
   * const unreadCountListener = KustomerReactNative.addEventListener('onUnreadCountChange', handler);
   * unreadCountListener.remove() // call this on cleanup
   * @param {KustomerChatListenerTypes} type
   * @param {Function} handler
   *
   * @returns {EmitterSubscription}
   */
  addEventListener<T extends KustomerChatListenerTypes>(
    type: T,
    handler: ChatListenerCallback<T>
  ): EmitterSubscription | null;
}
