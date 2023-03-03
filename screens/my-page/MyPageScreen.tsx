import React from 'react';
import { StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user';
import Container from '../../components/Container';
import Hr from '../../components/Hr';
import { onFetchUser, User } from '../../store/user';
import MyPageHeader from './components/MyPageHeader';
import MyPageNav from './components/MyPageNav';
import MyPageStats from './components/MyPageStats';
import MyPageWeather from './components/MyPageWeather';
import {NativeModules} from 'react-native';
var PermissionFile = NativeModules.PermissionFile;
const mockedUser = {
  uid: '0',
  userId: 'doctorigin',
  userName: '홍길동',
  phoneNumber: '01012341234',
  email: 'example@doctorigin.com',
  questionnaire: {
    gender: 1 as 1 | 2,
    age: 1,
    skinAfterSkincare: 1,
    tZoneOil: 1,
    pimple: 1,
    dermatitis: 1,
    acne: 1,
    skinReaction: 1,
    concern: [0, 1],
  },
  authProvider: 'local',
  skinAge: 25,
  testData: {
    oil: 10,
    wrinkle: 20,
    pigment: 50,
    trouble: 30,
    pore: 70,
    flush: 30,
  },
};

var lUser = {
  uid: '0',
  userId: 'doctorigin',
  userName: '홍길동',
  phoneNumber: '01012341234',
  email: 'example@doctorigin.com',
  questionnaire: {
    gender: 1 as 1 | 2,
    age: 1,
    skinAfterSkincare: 1,
    tZoneOil: 1,
    pimple: 1,
    dermatitis: 1,
    acne: 1,
    skinReaction: 1,
    concern: [0, 1],
  },
  authProvider: 'local',
  skinAge: 25,
  testData: {
    oil: 10,
    wrinkle: 20,
    pigment: 50,
    trouble: 30,
    pore: 70,
    flush: 30,
  },
};

const useFetchUser = () => {
  const dispatch = useDispatch();
  const loggeduser = useSelector(selectUser);
  lUser.uid = loggeduser?.uid || '0';
  lUser.userId = loggeduser?.userId || '0';
  lUser.userName = loggeduser?.userName || '0';
  lUser.phoneNumber = loggeduser?.phoneNumber || '0';
  lUser.questionnaire.gender = loggeduser?.questionnaire?.gender || 1;
  lUser.questionnaire.age = loggeduser?.questionnaire?.age || 1;
  lUser.questionnaire.skinAfterSkincare = loggeduser?.questionnaire?.skinAfterSkincare || 1;
  lUser.questionnaire.tZoneOil = loggeduser?.questionnaire?.tZoneOil || 1;
  lUser.questionnaire.pimple = loggeduser?.questionnaire?.pimple || 1;
  lUser.questionnaire.dermatitis = loggeduser?.questionnaire?.dermatitis || 1;
  lUser.questionnaire.acne = loggeduser?.questionnaire?.acne || 1;
  lUser.questionnaire.skinReaction = loggeduser?.questionnaire?.skinReaction || 1;
  lUser.questionnaire.concern = loggeduser?.questionnaire?.concern || [0.1];
  lUser.authProvider = loggeduser?.authProvider || 'local';
  lUser.skinAge = loggeduser?.skinAge || 0;
  lUser.testData.oil = loggeduser?.testData?.oil || 0;
  lUser.testData.wrinkle = loggeduser?.testData?.wrinkle || 0;
  lUser.testData.pigment = loggeduser?.testData?.pigment || 0;
  lUser.testData.trouble = loggeduser?.testData?.trouble || 0;
  lUser.testData.pore = loggeduser?.testData?.pore || 0;
  lUser.testData.flush = loggeduser?.testData?.flush || 0;
  //console.log(loggeduser)
  //console.log("1")
  //console.log(lUser)
  return useQuery('fetchUser', async () => {
    const { data } = await new Promise<{ data: User }>((resolve) => {
      setTimeout(() => {
        resolve({data: lUser});
      }, 500);
    });
    dispatch(onFetchUser(data));
    return data;
  });
};

export async function requestStoragePermission() 
{
  console.log("requestStoragePermission")
  if (Platform.Version >= 30) {
    console.log(Platform.Version)
    await PermissionFile.checkAndGrantPermission(
      (err: any) => {
        console.log(err)
        alert(
          'Sorry, Access not granted'
        );
      },
      (res: any) => {
        console.log("granted: "+res)
        if (res) {
          console.log(res)
        }
      },)
  } else {
    console.log("not v30")
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
        if (granted) {
          console.log("READ_EXTERNAL_STORAGE permission granted")
          //alert("EXTERNAL_STORAGE permission granted");
        } else {
            console.log("READ_EXTERNAL_STORAGE permission denied")
            alert("READ_EXTERNAL_STORAGE permission denied");
        }
    const granted2 = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
        if (granted2) {
          console.log("WRITE_EXTERNAL_STORAGE permission granted")
          //alert("EXTERNAL_STORAGE permission granted");
        } else {
            console.log("WRITE_EXTERNAL_STORAGE permission denied")
            alert("WRITE_EXTERNAL_STORAGE permission denied");
        }
  }
}

const MyPageScreen = () => {
  //useFetchUser();
  requestStoragePermission();
  const chkquestion = useSelector(selectUser);
  console.log(chkquestion?.questionnaire || "questionnaire is null")
  //      <MyPageStats />
  return (
    <Container contentContainerStyle={styles.contentContainer} scrollEnabled>
      <MyPageHeader />
      <MyPageStats />
      <Hr big />
      <MyPageWeather />
      <Hr big />
      <MyPageNav />
    </Container>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 40,
    paddingBottom: 10,
  },
});

export default MyPageScreen;
