import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useCallback } from 'react';
import auth from '@react-native-firebase/auth';

import useLoading from './useLoading';
import useAuth from './useAuth';

const useGoogleSignin = () => {
  const { onLoading, onLoadingEnd } = useLoading();
  const { register, login } = useAuth();
  //console.log("gsign use auth")

  const googleSignIn = useCallback(
    async ({ refereeId }: { refereeId?: string }) => {
      try {
        onLoading();
        //console.log("try1 ");
        await GoogleSignin.hasPlayServices();
        //console.log("try2 ");
        const userinfo = await GoogleSignin.signIn();
        //console.log(userinfo);
        //console.log("try3");
        const googleCredential = auth.GoogleAuthProvider.credential(userinfo.idToken);
        //console.log(googleCredential.token);
        //console.log("try4");
        const res = await auth().signInWithCredential(googleCredential);
        //console.log(res.user.uid);
        //console.log("googlecred");
        const user = res.user;
        const isNewUser = res.additionalUserInfo?.isNewUser;
        //console.log(isNewUser)
        if (isNewUser) {
          //console.log("newuser reg start")
          await register({ user, refereeId, authProvider: 'GOOGLE' });
          //console.log("newuser reg end")
        } else {
          await login({ user });
          //console.log("log")
        }
        onLoadingEnd();
      } catch (error: any) {
        onLoadingEnd();
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
      }
    },
    [],
  );

  return googleSignIn;
};

export default useGoogleSignin;
