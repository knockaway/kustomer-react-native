import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import KustomerReactNative from 'kustomer-react-native';

export default function App() {
  const [isChatAvailable, setIsChatAvailable] = React.useState(false);

  React.useEffect(() => {
    const isAvailableAsync = async () => {
      const [isAvailable, error] = await KustomerReactNative.isChatAvailable();
      console.log({ isAvailable, error });
      setIsChatAvailable(isAvailable);
    };

    isAvailableAsync();
  }, []);
  return (
    <View style={styles.container}>
      <Text>{`Chat Available: ${isChatAvailable}`}</Text>
      <Button
        title="Open Kustomer Chat"
        onPress={() => {
          KustomerReactNative.show('onlyChat');
        }}
      />
      <Button
        title="Open Kustomer Knowledgebase"
        onPress={() => {
          KustomerReactNative.show('onlyKnowledgeBase');
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
