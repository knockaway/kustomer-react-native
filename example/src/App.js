import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import KustomerReactNative from 'kustomer-react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Testing Kustomer:</Text>
      <Button
        title="Open Kustomer Chat"
        onPress={() => {
          KustomerReactNative.show();
        }}
      />
      <Button
        title="Open Kustomer Knowledgebase"
        onPress={() => {
          KustomerReactNative.show('knowledgeBase');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
