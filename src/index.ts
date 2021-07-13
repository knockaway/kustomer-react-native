import { NativeModules } from 'react-native';

export declare type KustomerDisplayMode =
  | 'newChat'
  | 'activeChat'
  | 'chatHistory'
  | 'onlyChat'
  | 'knowledgeBase'
  | 'onlyKnowledgeBase'
  | 'default';

type KustomerReactNativeType = {
  show(option?: KustomerDisplayMode): void;
};

const { KustomerReactNative } = NativeModules;

/**
 * NativeModule _show is being remapped to show to allow empty param
 * The Native code mapping doesn't allow optional params so we weren't able to do KustomerReactNative.show() prior to this
 */
KustomerReactNative.show = (option?: KustomerDisplayMode) => {
  if (!option) {
    return KustomerReactNative._show('default');
  }
  return KustomerReactNative._show(option);
};
export default KustomerReactNative as KustomerReactNativeType;
