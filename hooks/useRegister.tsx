/* eslint-disable @typescript-eslint/no-misused-promises */
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import auth from '@react-native-firebase/auth';

import { onFetchUser, selectUser } from '../store/user';
import { Toast } from '../utils/utils';

type FormValues = {
  userId?: string;
  password?: string;
  passwordConfirmation?: string;
  userName?: string;
  phoneCode?: string;
  phonePrefix?: string;
  phoneSuffix?: string;
  email?: string;
  refereeId: string;
  phoneVerification?: string;
  phoneValidated?: boolean;
};

const useRegister = () => {
  //console.log("ureg1");
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  //console.log("ureg2");
  const updateUserData = (form: FormValues) =>
    new Promise<boolean>(async (resolve, reject) => {
      try {
        const snapShot = await firestore()
          .collection('users')
          .where('uid', '==', user!.uid)
          .get();
        snapShot.forEach((doc) =>
          doc.ref.update({
            userName: user!.userName || form.userName,
            email: user!.email || form.email,
            phoneNumber:
              user!.phoneNumber ||
              form.phoneCode! + form.phonePrefix! + form.phoneSuffix!,
            refereeId: form.refereeId,
          }),
        );
        //console.log("ureg end");
        resolve(true);
      } catch (e) {
        reject(e);
        //console.log("ureg error");
      }
    });

  const createUserWithEmailAndPassword = async (form: FormValues) => {
    //console.log("pw id creat");
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
      phoneNumber: form.phoneCode! + form.phonePrefix! + form.phoneSuffix!,
      authProvider: 'LOCAL',
      refereeId: form.refereeId,
      questionnaire: {
        gender: 1,
        age: 0,
        skinAfterSkincare: 0,
        tZoneOil: 0,
        pimple: 0,
        dermatitis: 0,
        acne: 0,
        skinReaction: 0,
        concern: [0,1]
      },
      skinAge: 0,
    };

    //console.log("pw id creat2");
    await firestore().collection('users').doc(userData.email).set(userData);
    //console.log("pw id creat3 ");
    dispatch(onFetchUser(userData));
  };

  return useMutation((form: FormValues) => {
    if (user) {
      //console.log("isusertrue");
      return updateUserData(form);
    }
    //console.log("new user");
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const res = await functions().httpsCallable('verifyUserId')({
          userId: form.userId,
        });

        if (res.data === 'UserId available') {
          //console.log(res.data);
          await createUserWithEmailAndPassword(form);
          resolve(true);
        } else {
          Toast.show({
            text1: `${form.userId!}는 사용 가능한 아이디가 아닙니다.`,
          });
          reject(new Error('UserId not available'));
        }
      } catch (e) {
        if ((e as any).code === 'auth/email-already-in-use') {
          Toast.show({ text1: 'email-already-in-use' });
        }
        reject(e);
      }
    });
  });
};

export default useRegister;
