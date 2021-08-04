import {
  NativeModules,
  NativeEventEmitter,
  EmitterSubscription,
} from 'react-native';
import type { KustomerDisplayMode, KustomerChatListenerTypes } from './types';
import type { KustomerReactNativeInterface } from './interface';

const { KustomerReactNative } = NativeModules;
const KustomerEventEmitter = new NativeEventEmitter(KustomerReactNative);

// event names used to bridge events from native to JS
const SUPPORTED_EVENT_NAMES: { [key: string]: KustomerChatListenerTypes } = {
  ON_UNREAD_COUNT_CHANGE: 'onUnreadCountChange',
};
const supportedEventsArray = Object.values(SUPPORTED_EVENT_NAMES);

const isValidEventType = (type: KustomerChatListenerTypes) =>
  Object.values(SUPPORTED_EVENT_NAMES).find((value) => type === value);

const addEventListener = (
  type: KustomerChatListenerTypes,
  handler: Function
): EmitterSubscription | null => {
  if (!isValidEventType(type)) {
    console.warn(
      `KustomerReactNative only supports events: ${supportedEventsArray.join(
        ', '
      )}`
    );
    return null;
  }

  if (type === SUPPORTED_EVENT_NAMES.ON_UNREAD_COUNT_CHANGE) {
    return KustomerEventEmitter.addListener(
      SUPPORTED_EVENT_NAMES.ON_UNREAD_COUNT_CHANGE,
      (count) => {
        handler(count);
      }
    );
  }
  return null;
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
