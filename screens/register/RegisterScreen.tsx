import React, { useCallback, useLayoutEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BackHandler, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackHeaderProps } from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import auth from '@react-native-firebase/auth';
import colors from '../../utils/colors';
import { onFetchUser, onLogout, selectUser } from '../../store/user';
import { paddingHorizontal } from '../../utils/utils';
import { RegisterScreenNavigationProp } from '../../navigators/navigation.types';
import useRegister from '../../hooks/useRegister';
import useToastErrors from '../../hooks/useToastErrors';
import AppText from '../../components/AppText';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Header from '../../components/Header';
import PhoneForm from '../../components/PhoneForm';
import RegisterNotice from './components/RegisterNotice';
import TextField from '../../components/TextField';

type FormValues = {
  userId?: string;
  password?: string;
  passwordConfirmation?: string;
  userName?: string;
  phoneCode?: string;
  phonePrefix?: string;
  phoneSuffix?: string;
  age?: string,
  email?: string;
  refereeId: string;
  phoneVerification?: string;
  phoneValidated?: boolean;
};

const useCustomNavigationHandler = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useLayoutEffect(() => {
    const backAction = () => {
      if (user) {
        dispatch(onLogout());
        setTimeout(() => navigation.replace('Login'), 0);
      } else {
        navigation.goBack();
      }
    };

    const getHeader = (props: StackHeaderProps) => (
      <Header {...props} customGoBack={backAction} />
    );
    navigation.setOptions({ header: getHeader });
  }, [navigation, user]);

  const useCustomBackHandler = useCallback(() => {
    const backAction = () => {
      if (user) {
        dispatch(onLogout());
        setTimeout(() => navigation.replace('Login'), 0);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
    };
  }, [user]);

  useFocusEffect(useCustomBackHandler);
};

const RegisterScreen = () => {
  useCustomNavigationHandler();
  const dispatch = useDispatch();
  const methods = useForm<FormValues>();
  useToastErrors(methods);
  const password = methods.watch('password');
  const register = useRegister();
  const user = useSelector(selectUser);

  const onSubmit = (form: FormValues) => {
    console.log("mutate");
    register.mutate(form, {
      onSuccess: () => {
        console.log("success");
        const { userName, phoneCode, phonePrefix, phoneSuffix, email } = form;
        if (user) {
          console.log(email)
          dispatch(
            onFetchUser({
              uid: user.uid,
              userName: user.userName || userName,
              email: user.email || email,
              age: user.age,
              phoneNumber:
                user.phoneNumber || phoneCode! + phonePrefix! + phoneSuffix!,
              authProvider: user.authProvider,
            }),
          );
        }
      },
    });
  };
  const onSubmit2 = async (form: FormValues) => {
    console.log("pw id creat");
    const res = await auth().createUserWithEmailAndPassword(
      form.email!,
      form.password!,
    );
    const user = res.user;
    const userData = {
      userId: form.userId,
      uid: user.uid,
      userName: form.userName,
      email: form.email,
      age: form.age,
      phoneNumber: form.phoneCode! + form.phonePrefix! + form.phoneSuffix!,
      authProvider: 'LOCAL',
      refereeId: form.refereeId,
    };
    console.log("pw id creat2");
    
    await firestore().collection('users').doc(userData.email).set(userData);
    console.log("pw id creat3 ");
    dispatch(onFetchUser(userData));
  };

  return (
    <Container contentContainerStyle={styles.contentContainer} scrollEnabled>
      <FormProvider {...methods}>
        {!user && (
          <>
            <View style={styles.fieldContainer}>
              <AppText style={styles.fieldLabel}>?????????</AppText>
              <TextField
                style={styles.textField}
                name="userId"
                required="????????? ?????? ???????????????."
                rules={{
                  minLength: { value: 4, message: '???????????? ?????? ????????????.' },
                  pattern: {
                    value: /^[A-Za-z][a-zA-Z0-9]*$/,
                    message:
                      '??????/??????????????? ??????????????????, ????????? ?????? ?????? ???????????? ???????????? ???????????? ????????? ??? ????????????.',
                  },
                }}
                placeholder="??????, ?????? 4~12???"
                maxLength={12}
              />
            </View>
            <View style={styles.fieldContainer}>
              <AppText style={styles.fieldLabel}>????????????</AppText>
              <TextField
                style={styles.textField}
                name="password"
                required="???????????? ?????? ???????????????."
                placeholder="???????????? 8??? ??????"
                rules={{
                  minLength: { value: 8, message: '??????????????? ?????? ????????????.' },
                }}
                secureTextEntry
              />
            </View>
            <View style={styles.fieldContainer}>
              <AppText style={styles.fieldLabel}>{'????????????\n??????'}</AppText>
              <TextField
                style={styles.textField}
                name="passwordConfirmation"
                required="??????????????? ???????????? ????????????."
                placeholder="???????????? ??????"
                secureTextEntry
                rules={{
                  validate: (value: string | undefined) => value === password || '???????????? ??????',
                }}
              />
            </View>
          </>
        )}
        {!user?.userName && (
          <View style={styles.fieldContainer}>
            <AppText style={styles.fieldLabel}>??????</AppText>
            <TextField
              style={styles.textField}
              name="userName"
              required="?????? ?????? ???????????????."
              placeholder="????????? ??????????????????."
              autoCapitalize="sentences"
            />
          </View>
        )}
        {!user?.phoneNumber && (
          <View style={styles.fieldContainer}>
            <AppText style={styles.fieldLabel}>?????????</AppText>
            <PhoneForm style={styles.textField} />
          </View>
        )}
        {!user?.email && (
          <View style={styles.fieldContainer}>
            <AppText style={styles.fieldLabel}>?????????</AppText>
            <TextField
              style={styles.textField}
              name="email"
              keyboardType="email-address"
              required="????????? ?????? ???????????????."
              placeholder="example@doctorigin.com"
              rules={{
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '????????? ????????? ???????????? ????????????.',
                },
              }}
            />
          </View>
        )}
                {!user?.age && (
          <View style={styles.fieldContainer}>
            <AppText style={styles.fieldLabel}>??????</AppText>
            <TextField
              style={styles.textField}
              name="age"
              keyboardType="decimal-pad"
              required="?????? ?????? ???????????????."
              placeholder="????????? ??????????????????."
              rules={{
                pattern: {
                  value: /^[0-9]/,
                  message: '????????? ???????????? ????????????.',
                },
              }}
            />
          </View>
        )}
        {!user?.refereeId && (
          <>
            <AppText style={styles.referredLabel}>????????? ?????????</AppText>
            <TextField
              name="refereeId"
              placeholder="????????? ???????????? ??????????????????."
            />
          </>
        )}
        <RegisterNotice />
        <Button style={styles.button} onPress={methods.handleSubmit
          (onSubmit2)}>
          ????????????
        </Button>
      </FormProvider>
    </Container>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: paddingHorizontal,
    paddingTop: 30,
  },
  textField: {
    flex: 1,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fieldLabel: {
    width: 72,
    color: colors.textSecondary,
  },
  referredLabel: {
    marginTop: 30,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default RegisterScreen;
