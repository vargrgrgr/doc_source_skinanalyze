import { useCallback } from 'react';
import { login as kakaoLogin } from '@react-native-seoul/kakao-login';
import functions from '@react-native-firebase/functions';
import auth from '@react-native-firebase/auth';

import useAuth from './useAuth';
import useLoading from './useLoading';

const useKakaoLogin = () => {
  const { onLoading, onLoadingEnd } = useLoading();
  const { register, login } = useAuth();

  const kakaoSignIn = useCallback(
    async ({ refereeId }: { refereeId?: string }) => {
      try {
        onLoading();
        console.log("kakao login start")
        const kakaoToken = await kakaoLogin();
        console.log("auth start")
        const kakaoAuth = await functions().httpsCallable('kakaoCustomAuth')({
          token: kakaoToken.accessToken,
        });
        console.log("auth1")
        const res = await auth().signInWithCustomToken(
          kakaoAuth.data.firebaseToken as string,
        );
        console.log("auth end")
        const user = res.user;
        const isNewUser = kakaoAuth.data.isNewUser;
        console.log("is new user")
        if (isNewUser) {
          await register({ user, refereeId, authProvider: 'KAKAO' });
          console.log("new")
        } else {
          await login({ user });
          console.log("exist")
        }
        onLoadingEnd();
        console.log("loadend")
      } catch (e) {
        console.log(e);
        onLoadingEnd();
      }
    },
    [],
  );

  return kakaoSignIn;
};

export default useKakaoLogin;
