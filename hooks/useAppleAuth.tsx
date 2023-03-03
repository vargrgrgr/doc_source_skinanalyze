import { useCallback } from 'react';
import { Platform } from 'react-native';
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';

import useAlert from './useAlert';
import useAuth from './useAuth';

const clientId = 'com.doctorigin.service';
const redirectUri = 'https://doctorigininter.cafe24.com/';

const useAppleAuth = () => {
  const alert = useAlert();
  const { register, login } = useAuth();

  const createUser = async ({
    identityToken,
    nonce,
    refereeId,
  }: {
    identityToken: string;
    nonce?: string;
    refereeId?: string;
  }) => {
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );
    console.log(appleCredential);
    const res = await auth().signInWithCredential(appleCredential);
    const user = res.user;
    console.log(user);
    const isNewUser = res.additionalUserInfo?.isNewUser;
    if (isNewUser) {
      await register({ user, refereeId, authProvider: 'APPLE' });
    } else {
      await login({ user });
    }
  };

  const appleSignIn = useCallback(
    async ({ refereeId }: { refereeId?: string }) => {
      if (Platform.OS === 'ios') {
        if (!appleAuth.isSupported) {
          await alert.show({
            message:
              '애플 계정 가입은 iOS 13 이상의 iOS 기기에서만 가능합니다.',
          });
          return;
        }
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        if (!appleAuthRequestResponse.identityToken) {
          throw new Error('Apple Sign-In failed - no identify token returned');
        }

        const { identityToken, nonce } = appleAuthRequestResponse;
        await createUser({ identityToken: identityToken, nonce, refereeId });
      } else {
        appleAuthAndroid.configure({
          clientId,
          redirectUri,
          scope: appleAuthAndroid.Scope.ALL,
          responseType: appleAuthAndroid.ResponseType.ALL,
        });
        try {
          const response = await appleAuthAndroid.signIn();
          if (response) {
            await createUser({
              identityToken: response.id_token!,
              nonce: response.nonce,
              refereeId,
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    [],
  );

  return appleSignIn;
};

export default useAppleAuth;
