import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';

import { onFetchUser, User } from '../store/user';

const useAuth = () => {
  const dispatch = useDispatch();

  const register = async ({
    user,
    refereeId,
    authProvider,
  }: {
    user: FirebaseAuthTypes.User;
    refereeId?: string;
    authProvider: string;
  }) => {
    //console.log("make userdata")
    var pn;
    if(user.phoneNumber==null){
      pn = "0000000000";
    }
    else{
      pn =user.phoneNumber;
    }
    var rID;
    if(refereeId==null){
      rID = "0000000000";
    }
    else{
      rID =refereeId;
    }
    var uname;
    if(user.displayName==null){
      uname = user.email
    }else{
      uname = user.displayName
    }
    var aage;
    if(user.age==null){
      aage = "미입력";
    }
    const userData = {
      uid: user.uid,
      userName: uname,
      email: user.email,
      phoneNumber: pn,
      authProvider: authProvider,
      refereeId: rID,
      age: aage,
    };
    
    //console.log("userdata save")
    //console.log(userData)
    await firestore().collection('users').add(userData);
    console.log("userdata dispatch")
    dispatch(onFetchUser(userData));
  };

  const login = async ({ user }: { user: FirebaseAuthTypes.User }) => {
    //console.log("userdata fb")
    const userData = await firestore()
      .collection('users')
      .where('uid', '==', user.uid)
      .limit(1)
      .get();
    userData.forEach((doc) => dispatch(onFetchUser(doc.data() as User)));
  };

  return { login, register };
};

export default useAuth;


