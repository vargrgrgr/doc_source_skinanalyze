import { NaverLogin } from '@react-native-seoul/naver-login';
import { useCallback } from 'react';
import { Platform } from 'react-native';
import BuildConfig from 'react-native-config';
import functions from '@react-native-firebase/functions';
import auth from '@react-native-firebase/auth';

import useAuth from './useAuth';
import useLoading from './useLoading';

/* 네이버 로그인은 mac m1 시뮬레이터에서 
빌드가 안되지만 실제 ios와 안드로이드 기기에서는 적용됩니다.
yarn add @react-native-seoul/naver-login 을 활용합니다.
*/

const iosKeys = {
  kConsumerKey: BuildConfig.NaverkConsumerKey,
  kConsumerSecret: BuildConfig.NaverkConsumerSecret,
  kServiceAppName: '닥터리진',
  kServiceAppUrlScheme: 'doctorigin', // only for iOS
};

const androidKeys = {
  kConsumerKey: BuildConfig.NaverkConsumerKey,
  kConsumerSecret: BuildConfig.NaverkConsumerSecret,
  kServiceAppName: '닥터리진',
};

const initials = Platform.OS === 'ios' ? iosKeys : androidKeys;

const useNaverLogin = () => {
  const { onLoading, onLoadingEnd } = useLoading();
  const { register, login } = useAuth();

  const naverSignIn = useCallback(({ refereeId }: { refereeId?: string }) => {
    try {
      onLoading();
      NaverLogin.login(initials, async (err: any, token: string) => {
        if (err) {
          onLoadingEnd();
          return;
        }
        const naverAuth = await functions().httpsCallable('naverCustomAuth')({
          token,
        });
        const res = await auth().signInWithCustomToken(
          naverAuth.data.firebaseToken as string,
        );

        const user = res.user;
        const isNewUser = naverAuth.data.isNewUser;

        if (isNewUser) {
          await register({ user, refereeId, authProvider: 'NAVER' });
        } else {
          await login({ user });
        }
        onLoadingEnd();
      });
    } catch (e) {
      onLoadingEnd();
    }
  }, []);

  return naverSignIn;
};

export default useNaverLogin;
