import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import KustomerReactNative from '@knockaway/kustomer-react-native';

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
  const { unreadCount } = useListenerExamples();

  return (
    <View style={styles.container}>
      <Text>{`Chat Available: ${isChatAvailable}`}</Text>
      <Text>{`Total unread messages: ${unreadCount}`}</Text>
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

const useListenerExamples = () => {
  const [unreadCount, setUnreadCount] = React.useState(0);

  React.useEffect(() => {
    // actively listens to unread count changes
    const unreadCountListener = KustomerReactNative.addEventListener(
      'onUnreadCountChange',
      (count) => {
        setUnreadCount(count);
      }
    );
    // gets the current count of unread messages once on init
    KustomerReactNative.getUnreadCount((count) => {
      setUnreadCount(count);
    });
    return () => {
      unreadCountListener.remove();
    };
  }, []);

  return {
    unreadCount,
  };
};
