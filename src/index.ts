import {
  NativeModules,
  NativeEventEmitter,
  EmitterSubscription,
} from 'react-native';
import type {
  KustomerDisplayMode,
  KustomerChatListenerTypes,
  ChatListenerCallback,
} from './types';
import type { KustomerReactNativeInterface } from './interface';

const { KustomerReactNative } = NativeModules;
const KustomerEventEmitter = new NativeEventEmitter(KustomerReactNative);

// event names used to bridge events from native to JS
const SUPPORTED_EVENT_NAMES: { [key: string]: KustomerChatListenerTypes } = {
  ON_UNREAD_COUNT_CHANGE: 'onUnreadCountChange',
  ON_CONVERSATION_ENDED: 'onConversationEnded',
  ON_CONVERSATION_CREATED: 'onConversationCreated',
};
const supportedEventsArray = Object.values(SUPPORTED_EVENT_NAMES);

/**
 * @param type
 * @returns {Boolean} - whether the given event type is valid
 */
const isValidEventType = (type: KustomerChatListenerTypes) =>
  Object.values(SUPPORTED_EVENT_NAMES).find((value) => type === value);

/**
 * Listen to specific Kustomer chat events
 *
 * @param type - name of listener type to observe
 * @param handler - callback method
 * @returns {EmitterSubscription | null}
 */
const addEventListener = <T extends KustomerChatListenerTypes>(
  type: T,
  handler: ChatListenerCallback<T>
): EmitterSubscription | null => {
  if (!isValidEventType(type)) {
    console.warn(
      `KustomerReactNative only supports events: ${supportedEventsArray.join(
        ', '
      )}`
    );
    return null;
  }

  switch (type) {
    case SUPPORTED_EVENT_NAMES.ON_UNREAD_COUNT_CHANGE:
      return KustomerEventEmitter.addListener(
        SUPPORTED_EVENT_NAMES.ON_UNREAD_COUNT_CHANGE,
        (count) => {
          handler(count);
        }
      );
    case SUPPORTED_EVENT_NAMES.ON_CONVERSATION_CREATED:
      return KustomerEventEmitter.addListener(
        SUPPORTED_EVENT_NAMES.ON_CONVERSATION_CREATED,
        (params) => {
          handler(params);
        }
      );
    default:
      return null;
  }
};
KustomerReactNative.addEventListener = addEventListener;

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

export default KustomerReactNative as KustomerReactNativeInterface;
