import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useFormContext } from 'react-hook-form';

import colors from '../../../utils/colors';
import useAppleAuth from '../../../hooks/useAppleAuth';
import useGoogleSignin from '../../../hooks/useGoogleSignin';
import useKakaoLogin from '../../../hooks/useKakaoLogin';
import useNaverLogin from '../../../hooks/useNaverLogin';
import AppleIcon from '../../../assets/icons/apple-login.svg';
import GoogleIcon from '../../../assets/icons/google-login.svg';
import KakaoIcon from '../../../assets/icons/kakao-login.svg';
import NaverIcon from '../../../assets/icons/naver-login.svg';
import TextDemiLight from '../../../components/TextDemiLight';
import TouchableRipple from '../../../components/TouchableRipple';

const LoginSns = () => {
  const { getValues } = useFormContext<{ refereeId: string }>();
  const googleSignIn = useGoogleSignin();
  const appleSignIn = useAppleAuth();
  const kakaoSignIn = useKakaoLogin();
  const naverSignIn = useNaverLogin();

  const onLogin = (
    signIn: ({ refereeId }: { refereeId?: string }) => Promise<void>,
  ) => {
    signIn(getValues()).catch(() => {});
  };

  return (
    <>
      <TextDemiLight style={styles.snsDesc}>
      </TextDemiLight>
      <View style={styles.snsContainer}>
        <TouchableRipple
          style={styles.margin}
        >
          <NaverIcon />
        </TouchableRipple>
        <TouchableRipple
          style={styles.margin}
          onPress={() => onLogin(kakaoSignIn)}
        >
          <KakaoIcon />
        </TouchableRipple>
        <TouchableRipple
          style={styles.margin}
          onPress={() => onLogin(googleSignIn)}
        >
          <GoogleIcon />
        </TouchableRipple>
        <TouchableRipple >
          <AppleIcon />
        </TouchableRipple>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  snsDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  snsContainer: {
    flexDirection: 'row',
    marginBottom: 40,
    justifyContent: 'center',
  },
  margin: {
    marginRight: 20,
  },
});

export default LoginSns;
