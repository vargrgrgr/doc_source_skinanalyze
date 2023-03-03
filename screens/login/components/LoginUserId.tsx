/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import functions from '@react-native-firebase/functions';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';

import { LoginScreenNavigationProp } from '../../../navigators/navigation.types';
import { onFetchUser, User } from '../../../store/user';
import { Toast } from '../../../utils/utils';
import AppText from '../../../components/AppText';
import Button from '../../../components/Button';
import TextField from '../../../components/TextField';
import TouchableRipple from '../../../components/TouchableRipple';
import useLoading from '../../../hooks/useLoading';

type FormValues = {
  userId: string;
  password: string;
  refereeId: string;
};

const mismatchError =
  '일치하는 회원 정보가 없거나 비밀번호가 일치하지 않습니다.';

const useLogin = () => {
  const dispatch = useDispatch();
  const { onLoading, onLoadingEnd } = useLoading();

  const signIn = async (email: string, password: string) => {
    const signInRes = await auth().signInWithEmailAndPassword(email, password);
    console.log(signInRes.user.uid);
    console.log("email pass");
    const userData = await firestore()
      .collection('users')
      .where('uid', '==', signInRes.user.uid)
      .limit(1)
      .get();
      console.log("email pass2");
    userData.forEach((doc) => dispatch(onFetchUser(doc.data() as User)));
  };

  return useMutation(({ userId, password }: FormValues) => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        onLoading();
        const res = await functions().httpsCallable('getEmailFromUserId')({
          userId,
        });
        if (res.data.email) {
          await signIn(res.data.email as string, password);
          resolve(true);
        } else {
          Toast.show({ text1: mismatchError });
          reject('User not found');
        }
        onLoadingEnd();
      } catch (e) {
        if ((e as any).code === 'auth/wrong-password') {
          Toast.show({ text1: mismatchError });
        }
        reject(e);
        onLoadingEnd();
      }
    });
  });
};

const LoginUserId = () => {
  console.log("loginuid");
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { handleSubmit } = useFormContext();
  const login = useLogin();

  const goToFindUserIdScreen = () => navigation.push('FindUserId');
  const goToFindPasswordScreen = () => navigation.push('FindPassword');
  const goToRegisterScreen = () => navigation.push('Register');

  const onLogin = (form: FormValues) => {
    login.mutate(form);
  };

  return (
    <>
      <View style={styles.container}>
        <TextField
          style={styles.input}
          name="userId"
          required="아이디 값이 빈값입니다."
          placeholder="아이디를 입력해주세요."
        />
        <TextField
          style={styles.input}
          name="password"
          required="비밀번호 값이 빈값입니다."
          placeholder="비밀번호를 입력해주세요."
          secureTextEntry
        />
      </View>
      <Button onPress={handleSubmit(onLogin)}>로그인</Button>
      <View style={styles.linksContainer}>
        <TouchableRipple onPress={goToFindUserIdScreen}>
          <AppText>아이디찾기</AppText>
        </TouchableRipple>
        <AppText style={styles.separator}>|</AppText>
        <TouchableRipple onPress={goToFindPasswordScreen}>
          <AppText>비밀번호찾기</AppText>
        </TouchableRipple>
        <AppText style={styles.separator}>|</AppText>
        <TouchableRipple onPress={goToRegisterScreen}>
          <AppText>회원가입</AppText>
        </TouchableRipple>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  linksContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  separator: {
    paddingHorizontal: 4,
    height: 18,
    marginBottom: 4,
  },
});

export default LoginUserId;
