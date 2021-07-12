import { NativeModules } from 'react-native';

type KustomerReactNativeType = {
  multiply(a: number, b: number): Promise<number>;
};

const { KustomerReactNative } = NativeModules;

export default KustomerReactNative as KustomerReactNativeType;
