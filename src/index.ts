import { NativeModules, NativeEventEmitter } from 'react-native';
import type { KustomerDisplayMode, KustomerChatListenerTypes } from './types';
import type { KustomerReactNativeInterface } from './interface';

const { KustomerReactNative } = NativeModules;
const KustomerEventEmitter = new NativeEventEmitter(KustomerReactNative);
const _eventHandlers = new Map();
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
) => {
  if (!isValidEventType(type)) {
    console.warn(
      `KustomerReactNative only supports events: ${supportedEventsArray.join(
        ', '
      )}`
    );
    return;
  }
  let listener;

  if (type === SUPPORTED_EVENT_NAMES.ON_UNREAD_COUNT_CHANGE) {
    listener = KustomerEventEmitter.addListener(
      SUPPORTED_EVENT_NAMES.ON_UNREAD_COUNT_CHANGE,
      (count) => {
        handler(count);
      }
    );
  }
  _eventHandlers.set(type, listener);
};
KustomerReactNative.addEventListener = addEventListener;

const removeEventListener = (type: KustomerChatListenerTypes) => {
  if (!isValidEventType(type)) {
    console.warn(
      `KustomerReactNative only supports events: ${supportedEventsArray.join(
        ', '
      )}`
    );
    return;
  }

  const listener = _eventHandlers.get(type);
  if (!listener) {
    return;
  }
  // remove from nativeEventEmitter
  listener.remove();
  _eventHandlers.delete(type);
};
KustomerReactNative.removeEventListener = removeEventListener;

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
