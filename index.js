/**
 * @format
 */
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { ModalProvider } from 'react-native-use-modal';
import Toast from 'react-native-toast-message';
import { onlineManager, QueryClient, QueryClientProvider } from 'react-query';
import NetInfo from '@react-native-community/netinfo';


import App from './App';
import { name as appName } from './app.json';
import configureStore from './store/configureStore';
import AppText from './components/AppText';



const queryClient = new QueryClient();

const store = configureStore();
const persistor = persistStore(store);

const toastConfig = {
  toast: ({ text1, props }) => (
    <View style={styles.toastContainer}>
      <AppText style={styles.toast}>{text1}</AppText>
    </View>
  ),
};

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(state.isConnected);
    if (!state.isConnected) {
      Toast.show({
        type: 'toast',
        text1: '인터넷 연결 상태를 확인하고 다시 시도해 주세요.',
        position: 'bottom',
        visibilityTime: 3000,
      });
    }
  });
});

const AppConfigure = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={styles.flex}>
          <BottomSheetModalProvider>
            <ModalProvider>
              <App />
              <Toast config={toastConfig} />
            </ModalProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  </QueryClientProvider>
);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  toastContainer: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  toast: {
    fontSize: 12,
    color: '#fff',
  },
});

AppRegistry.registerComponent(appName, () => AppConfigure);
