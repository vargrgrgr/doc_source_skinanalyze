import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import {
  AppStateStatus,
  LogBox,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import firebase from '@react-native-firebase/app';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import RNBootSplash from 'react-native-bootsplash';
import { ModalResultType } from 'react-native-use-modal';
import RNExitApp from 'react-native-exit-app';
import NetInfo from '@react-native-community/netinfo';
import { focusManager } from 'react-query';
// import useAppState from 'react-native-appstate-hook';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import colors from './utils/colors';
import AppNavigator from './navigators/AppNavigator';
import useSimpleModal from './hooks/useSimpleModal';

//import {initializeApp} from '@react-native-firebase/app'
import functions from '@react-native-firebase/functions';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

LogBox.ignoreLogs([
  'EventEmitter.removeListener',
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

GoogleSignin.configure({
  webClientId: '907950154184-7qc2q3kn5nic3mo0livubq8fg3dn4s55.apps.googleusercontent.com'
  //907950154184-7qc2q3kn5nic3mo0livubq8fg3dn4s55.apps.googleusercontent.com
  // scopes: ['https://www.googleapis.com/auth/user.phonenumbers.read'],
});

//console.log("gconfig")

firebase.initializeApp

/*
if (__DEV__) {
  // If you are running on a physical device, replace http://localhost with the local ip of your PC. (http://192.168.x.x)
  functions().useFunctionsEmulator('http://172.30.1.51:5001');
  firestore().useEmulator('172.30.1.51',8080);
  auth().useEmulator('http://172.30.1.51:9099');
}
*/

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};

// const onAppStateChange = (status: AppStateStatus) => {
//   focusManager.setFocused(status === 'active');
// };

const App = () => {
  const simpleModal = useSimpleModal({
    cancelOnBackButtonPress: false,
    cancelOnBackdropPress: false,
  });
  // useAppState({
  //   onChange: onAppStateChange,
  // });

  const hideSplash = () => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    } else if (Platform.OS === 'ios') {
      RNBootSplash.hide({ fade: true });
    }
  };

  const onOfflineNetwork = async () => {
    const res = await simpleModal.show({
      cancelText: '종료',
      confirmText: '재시도',
      message: '인터넷 연결 상태를 확인하고\n다시 시도해 주세요.',
      textStyle: styles.textStyle,
    });

    if (res.type === ModalResultType.CANCEL) {
      RNExitApp.exitApp();
    } else {
      onNavigatorReady();
    }
  };

  const onNavigatorReady = () => {
    NetInfo.fetch().then(async (state) => {
      if (state.isConnected) {
        hideSplash();
      } else {
        onOfflineNetwork();
      }
    });
  };

  return (
    <>
      <StatusBar
        animated
        backgroundColor={colors.background}
        barStyle="dark-content"
      />
      <NavigationContainer onReady={onNavigatorReady} theme={Theme}>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    textAlign: 'center',
  },
});

export default App;
