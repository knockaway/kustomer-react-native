import { NativeModules, NativeEventEmitter } from 'react-native';
import type { KustomerDisplayMode, KustomerChatListenerTypes } from './types';
import type { KustomerReactNativeInterface } from './interface';

const { KustomerReactNative } = NativeModules;
const KustomerEventEmitter = new NativeEventEmitter(KustomerReactNative);
const _eventHandlers = new Map();
const ON_UNREAD_COUNT_CHANGE = 'onUnreadCountChange';

const addEventListener = (
  type: KustomerChatListenerTypes,
  handler: Function
) => {
  if (type !== 'onUnreadCountChange') {
    console.warn(
      'KustomerReactNative only supports `onUnreadCountChange` events'
    );
    return;
  }
  let listener;

  if (type === 'onUnreadCountChange') {
    listener = KustomerEventEmitter.addListener(
      ON_UNREAD_COUNT_CHANGE,
      (count) => {
        handler(count);
      }
    );
  }
  _eventHandlers.set(type, listener);
};
KustomerReactNative.addEventListener = addEventListener;

const removeEventListener = (type: KustomerChatListenerTypes) => {
  if (type !== 'onUnreadCountChange') {
    console.warn(
      'KustomerReactNative only supports `onUnreadCountChange` events'
    );
    return;
  }

  const listener = _eventHandlers.get(type);
  if (!listener) {
    return;
  }
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
